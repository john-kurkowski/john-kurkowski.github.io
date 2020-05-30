---
layout: post
title: "Paint By Types"
categories: tech
tags: engineering programming fp haskell
description:
  My introduction to Haskell has shown me the promise of types, enabling
  type-driven development. The type system self-documents better than any
  docstring or variable name ever did. It even guides your thinking and program
  architecture.
---

In the debate between static vs. dynamic types, I always knew static types
could catch programmer errors here and there. If a programming language does
the type system right though, types also self-document better and can even
guide a program's whole architecture. [UPenn's CIS 194 - Introduction to
Haskell] made this click for me.

All my experience had been with weak type systems, where I was constantly
fighting the types to little benefit. Things still routinely exploded at
runtime. The fixes always felt like whack-a-mole. All guidance in building the
program came from frameworks and convention. Anything those didn't cover became
a developer free-for-all. I was skeptical that types could offer any
revolutionary benefit.

### Predictability

[CIS 194's Week 5 lecture][CIS 194 Week 5] offered a particular, brief exercise
demonstrating the potential.

<blockquote>
  <p>Consider the type</p>

  <pre>
    a -> a -> a</pre>

  <p>Remember that <code>a</code> is a type variable which can stand for any
  type. What sorts of functions have this type?</p>
</blockquote>

This type signature reads: a function that takes 2 `a`s and returns an `a`.

To the functional programming transplant, coming from a type system with
generics like Java's, the type signature is too generic to say anything about
it. Here's the Java version.

```java
public static <A> foo(A arg1, A arg2) {
  // go nuts!
}
```

The function body could do anything. It could typecast the inputs, read a
database, write a database, `rm -rf /`, exit the application, ignore the
inputs, return `null`. Any or all of the above.

Haskell is built with a few restrictions that make it easy to divine the
function's possible behavior.

* There is no typecasting nor reflection of what `a` is. No Java `instanceof`.
* All IO is demarcated by the `IO` _type_.
* There is no `null`.

In concert, this function can't do IO, since all it can know is that it deals
with things of type `a`, not type `IO`. So it can't talk to a database or the
filesystem. And it will return a real value, as there is no `null`. All this
put another way: `a -> a -> a` must behave uniformly for any type `a`. This is
called [parametricity][Parametric polymorphism].

The answer to the exercise:

<blockquote>
  <p>So, what functions actually could have this type? Actually, there are only
  two!</p>

  <pre>
    f1 :: a -> a -> a
    f1 x y = x

    f2 :: a -> a -> a
    f2 x y = y</pre>
</blockquote>

In Haskell, a function implementing this signature can _only_ do 1 of 2 things.
It either returns the 1st argument, or returns the 2nd argument.

Take a moment to consider this predictability. Can your language enforce only 2
implementations for this type?

How about a real function from Haskell's standard includes?

```haskell
fst :: (a, b) -> a
```

Similar to the previous exercise, but this time there's only 1 possible
implementation.

The answer: given a tuple of any 2 types `a` and `b`, `fst` returns the tuple's
first element. Very handy when unzipping zipped sequences.

Although these types are elementary, I'm optimistic about the potential here.
These types are so generic _that_ they are constrained and simple. When reading
a more real world type signature, you stand a much greater chance to reason
about what the function does, without reading its source or testing it.

### A Note On Self-Documentation

Code is read more often then it is written. Of course it is preferable to not
have to read it at all.

Imagine coming across a door and its doorknob. What if you had to bust out a
100-page manual to learn to turn it? Or take apart the doorknob? It would be
absurd. Doorknobs are usually intuitive. Well, functions in most programming
languages are not as intuitive as doorknobs. Haskell's might be, though.

I'm not going to excuse Haskell's symbol for `fst`. It alone is insufficient to
know what the function does. I had to interpret its type signature to know what
I was going to get. But once I interpreted that much, I had a pretty good idea,
without reading its documentation. Just like I have a pretty good idea how to
deal with a doorknob on sight.

[Parametricity: Types Are Documentation] reinforces this, with more evidence
that naming alone isn't what its cracked up to be.

It is not always possible to communicate everything in a type signature, so do
employ comments and documentation where necessary. I just bring up that types
might placate the "working software over comprehensive documentation" that many
lazy programmers are prone to. Types give you at least a little documentation
for free. Yell "RTFS!" a little less.

A novel suggestion for Haskell learners is, when searching for a desired
function, e.g. in the standard library, instead of describing how you want the
function to work, enter _your desired type signature_ instead.

### Guiding A Program's Architecture

The expressiveness of types in determining what you want, rather than how to do
it, becomes such a boon that many Haskell programmers define all their types
first, and fill in the implementations later.

Contrary to interface-driven development in other languages, this actually
gives you early indicators whether the interface itself works. A lot of bad
assumptions get caught by the compiler when writing the types, as well as when
implementing them. Imagine that, a computer that lets you know when _your_
thinking isn't clear.

With the predictability of types saying and enforcing what a function is going
to do, defining types first works beyond mere interfaces; they guide
development of the entire program. Is this the part that's going to average a
list of numbers? Mark it with `[Int] -> Fractional`. Is this the part that will
read a user from the database, who might not exist? Mark it with `IO Maybe
User`. Is this the part that launches missiles? Mark it so with `IO
MissileLaunch`. The compiler will enforce that they all fit together, and that
your implementations stick to the contract.

Finally, when you're able to run the program for the first time, there's a
higher rate that it "just works." That's overly simplistic, of course, as types
do not protect you from logic bugs. Even so, it feels like most of the hard
work is over. Oh, that hard work we're used to, from lower level languages and
weaker type systems, that we assumed was a necessary evil of the job.

[A Comparison Between Perl and Haskell] tells one such story.

> Structuring my types took a while - in fact the entire project didn’t compile
> for about 4 hours … The lack of compilation doesn’t imply I’m not making
> progress - in those 4 hours I learnt more about my program, developing an
> understanding about how components fit together.
>
> …
>
> The problems at runtime [were] genuine problems, and the bugs that I find
> interesting to fix. I wasn’t spending time working out why something was
> null, or if a method call had the wrong arguments, because the compiler had
> already held my hand through that stage of programming.

Think of how much time you spend on those uninteresting yet fatal problems in
production.

[Meditations on Learning Haskell] offers several more perspectives and is worth
a read. I think one quote sets the tone.

> I’m terrible at programming. I’m a bad programmer and not very bright.
> Haskell covers for my dumb ass.

This is especially poignant given all the bashing Haskell gets for being ivory
tower, mathematician stuff. Rather, the language is helping people get real
stuff done, predictably and reliably.

I liken type-driven development to fly-by-wire, an automated system that
automatically stabilizes an aircraft on behalf of a human pilot, preventing
a catastrophic system state. As programming is a bit more creative, not so
mechanical, I also like the analogy of paint by numbers.

<figure>
  <img src="paint-by-numbers.jpg" width="61%" height="auto" alt="Paint By Numbers example"/>
  <figcaption>"I wonder what NPEs are going to happen today?" Worry not.</figcaption>
</figure>

Both analogies involve guides for imperfect humans, though they ignore the
fully creative aspect. Rather, Haskell honors the promise of programming: you
can create anything you can imagine. But with its strong type system, the
compiler will give you feedback early and often if your imagination was flawed!
Try painting in the lines, with types as your guide.

[UPenn's CIS 194 - Introduction to Haskell]: http://www.seas.upenn.edu/~cis194/lectures.html
[CIS 194 Week 5]: http://www.seas.upenn.edu/~cis194/lectures/05-type-classes.html
[Parametric polymorphism]: http://en.wikipedia.org/wiki/Parametric_polymorphism
[Parametricity: Types Are Documentation]: https://dl.dropboxusercontent.com/u/7810909/media/doc/parametricity.pdf
[A Comparison Between Perl and Haskell]: https://ocharles.org.uk/blog/posts/2013-07-26-a-comparison-between-perl-and-haskell.html
[Meditations on Learning Haskell]: http://bitemyapp.com/posts/2014-04-29-meditations-on-learning-haskell.html
