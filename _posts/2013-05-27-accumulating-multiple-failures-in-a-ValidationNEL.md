---
layout: post
title:  "Accumulating More Than One Failure In A ValidationNEL"
categories: tech
tags: scala
---
This is an adaptation of an internal blog post I made for
[Gravity](http://gravity.com) engineers. To preface, Gravity likes to use 2 very
predictable patterns throughout its Scala codebase, which is very important for
a TIMTOWTDI language like Scala.

1. The **for-comprehension:** it expresses so much of Gravity's business logic,
   so it is valuable to see its familiar syntax over and over.
2. **ValidationNEL:** it captures success and failure states better than
   traditional imperative means.

But what does it mean for the for-compehensions to interact with ValidationNEL?

(Note at the time this was written, the post targeted ValidationNEL in [Scalaz
6](https://github.com/scalaz/scalaz/tree/v6.0.4). Since then, [Scalaz
7](https://github.com/scalaz/scalaz/tree/v7.0.0) has been released. There may be
differences in the examples.)

* * *

Beyond ValidationNEL distinguishing success and failure cases, its other sell is
accumulation of failures. I think it's superior to throwing a single exception.
From [one Validation
tutorial](http://www.lunatech-research.com/archives/2012/03/02/validation-scala):

> Methods using exceptions automatically combine, but unfortunately not in the
> way you would like: any failure will immediately be reported, and it will be
> the only failure reported. It is of course possible to combine exceptions in
> other ways, but that means riddling your program with try-catch blocks around
> every sub step, which clutters the code beyond recognition.

However in Gravity's typical usage of ValidationNELs, they don't accumulate
failures; they tend to produce exactly one failure, if any. This post will
explain why, what use-case it fulfills, and the magic to actually accumulate
failures, if that's what you want.

Of its 2 use-cases for ValidationNELs,

1.  Fail-fast: pass the success of each step of a computation into the next,
until a step fails
2.  Fail-slow: several things can go wrong, and all can be reported up front
(e.g. missing fields in a shopping checkout form)

Gravity tends toward #1. This is the easiest way to use ValidationNEL, since you
can use familiar syntax: the **for-comprehension**. However this tends to only
ever produce one failure.

Let's get one thing out of the way: if this is the case, why use a ValidationNEL
over a Validation at all? ValidationNEL is preferable throughout the codebase
regardless of how many potential failures can occur because it plays nicer with
type inference. If you accidentally mix e.g. `Validation[String, Int]` with
`ValidationNEL[String, Int]` you'll get a `Validation[Object, Int]`. D'oh. It's
also future-proof if you later decide to yield additional failures. On the flip
side, you must accept the wart of running `NonEmptyList.list.contains` to handle
specific errors; perhaps write a custom extractor.

So why are we practically restricted to one failure? A for-comprehenion is often
sugar for calls to `flatMap`[<sup>1</sup>](#1). This could also be called
fail-fast. Let's review `flatMap` behavior.

```scala
def evenNumber(n: Int) = if (n % 2 == 0) Some(n) else None

// an example for-comprehension …
for {
  num <- List(1, 2, 3)
  evenNum <- evenNumber(num)
} yield evenNum

// … which desugars to …
List(1, 2, 3) flatMap (evenNumber)
```

For empty collections, `flatMap` is a no-op.

```scala
// evenNumber won't get called at all (what args could it possibly be called with?)
for {
  num <- List.empty[Int] // comprehension doesn't get past this
  evenNum <- evenNumber(num)
  doubleEven <- evenNumber(evenNum * 2)
} yield doubleEven
```

So when `flatMap`ping over a series of Validations, as soon as one of them is a
`Failure`, you won't reach the others.

```scala
val sumV: ValidationNEL[String, Int] = for {
  a <- 42.successNel[String]
  b <- "Boo".failNel[Int]
  c <- "Wah wah".failNel[Int] // by defn of flatMap, can't get here
} yield a + b + c
// sumV == Failure(NonEmptyList(Boo))
```

So how do you accumulate failures, fail-slow?

### Fail-Slow: The Short Answer

The short answer is in the general Applicative Builder operator `|@|`.

The Applicative Builder operator `|@|` takes Validations (and other Applicative
Functors) and a handler that accepts the combined result as a tuple. In the case
of Validations, the hander is called if all inputs are Successes. If any of the
inputs is a Failure, the handler is not called, while `|@|` accumulates the
Failures for you.

For example, if you build 3 ValidationNELs together with Success types Int,
String, and Double respectively and Failure type String, you must then provide a
handler `(Int, String, Double) => T`. The handler will be invoked iff all 3
Validations are Successes. The return type of this whole operation will be
`ValidationNEL[String, T]`.

(I suppose `T` could even be a nested `ValidationNEL[E, A]`, so you'd get back
`ValidationNEL[String, ValidationNEL[E, A]]`.)

Let's see `|@|` in action. Note the `NonEmptyList` of length 2 at the end.

```scala
val yes = 3.14.successNel[String]
val doh = "Error".failNel[Double]

def addTwo(x: Double, y: Double) = x + y

(yes |@| yes)(addTwo) // Success(6.28)
(no |@| no)(addTwo)   // Failure(NonEmptyList(Error, Error))

// or shorthand
(yes |@| yes){_ + _} // Success(6.28)
(yes |@| doh){_ + _} // Failure(NonEmptyList(Error))
(doh |@| yes){_ + _} // Failure(NonEmptyList(Error))
(doh |@| doh){_ + _} // Failure(NonEmptyList(Error, Error))
```

`|@|` is the most general way to deal with ValidationNELs. There are also more
specific operators for shorthand accumulation, if you can make certain
restrictions on the Success and Failure types.

If you wanted to sum their Success values, like in the above example, you could
use this fun method, `>>*<<`. It appends Successes to each other or Failures to
each other, favoring Success rather than failing fast. Note, for appending to be
possible, the Success type and Failure type must both be Semigroups, such as
numbers, strings, and NonEmptyLists, among others.

```scala
yes >>*<< yes // Success(6.28)
yes >>*<< doh // Success(3.14)
doh >>*<< yes // Success(3.14)
doh >>*<< doh // Failure(NonEmptyList(Error, Error))
```

Scalaz 7 introduces findSuccess, which short-circuits, returning first success,
otherwise appending failures. Unlike `>>*<<`, only the Failure type must be a
Semigroup.

```scala
yes findSuccess yes // Success(3.14)
yes findSuccess doh // Success(3.14)
doh findSuccess yes // Success(3.14)
doh findSuccess doh // Failure(NonEmptyList(Error, Error))
```

Finally, for favoring Failure, Scalaz 7 introduces `+++`. Both Success and
Failure must be Semigroups again.

```scala
yes +++ yes // Success(6.28)
yes +++ doh // Failure(NonEmptyList(Error))
doh +++ yes // Failure(NonEmptyList(Error))
doh +++ doh // Failure(NonEmptyList(Error, Error))
```

The alternative to learning these typeclasses and their operators is
constructing a mutable buffer and side-effectfully accumulating failures
yourself.

```scala
var sum = 0.0
val fails = collection.mutable.ArrayBuffer[String]()
yes fold (fails ++= _.list, sum += _)
doh fold (fails ++= _.list, sum += _)
if (fails.isEmpty) {
  sum.successNel
} else {
  NonEmptyList(fails.head, fails.tail: _*).fail
}
// Failure(NonEmptyList(Error))
```

Awkward, no?

So, I've shown you how to accumulate a handful of Validations. If you're
interested in accumulating errors for N Validations, still fail-slow, check out
more examples in [A Tale of 3 Nightclubs](https://gist.github.com/970717). Take
a look for calls to `sequence` which essentially inverts a sequence of
Validations into a Validation of a sequence: `Seq[ValidationNEL[E, A] =>
ValidationNEL[E, Seq[A]]`. It's beyond my current ability to explain the type
lambda on `sequence` though, so good luck.

You can stop here with your newfound Validation knowledge if you like.
Otherwise, onto the more theoretical digression.

### Validation As Monad? Validation As Applicative Functor?

Back to `|@|`. Why another operator? Why this promise of Validations playing
nicely with for-comprehensions—syntax we already know—and yet we can't get
failure accumulation? Because of Scalaz's definition of Validation as a monad.
Though very convenient for much of Gravity's business logic, Validation defining
`flatMap` is an accident. Validation is primarily an *applicative functor*.

It's beyond this post's scope to fully explain the utility of monad and
applicative functor typeclasses, so I'll just say that monads and Scala
for-comprehensions go hand in hand. When I said Gravity expresses so much of its
business logic in for-comprehensions, that means our business logic is monadic.
If you've written a for-comprehension, or directly called `flatMap`, you've used
a monad.

But Validation, being an applicative functor, has more power than `map` and
`flatMap`, that a for-comprehension can't harness. Borrowing from [this intro to
monadic
design](http://softwarejockey.wordpress.com/2012/04/30/a-taste-of-monadic-design/),
&#8220;&#8230; unlike a monad, an applicative functor can carry forward results
of previous computations.&#8221; Sounds like the accumulation we need.

Unfortunately there's no native Scala syntax for applicatives. You have to use
the funny Scalaz `|@|` operator and its kin.

I didn't realize that Validation isn't supposed to be a monad until
[Validation.flatMap was removed in a Scalaz 7
milestone](https://github.com/scalaz/scalaz/commit/061e23de4848e3f97595d5a9ba1920c8827ffe41).
The community has since brought it back for backwards-compatibility, so
Validation will continue to be targetable by for-comprehensions. But now you
know: it can viewed as a monad and an applicative functor, and they behave
differently (if you like to think in terms of these typeclasses, you know
Validation is similar to Either. Think of Scalaz's `flatMap`-carrying Validation
as a right-biased Either monad, as its `flatMap` would only deal with its
right-side/success). For more Validation potential though, use it as an
applicative functor with `|@|` and company.

<small><sup id="1">1</sup>For-comprehensions compile to flatMap, map, filter,
and/or foreach calls. That's it.</small>
