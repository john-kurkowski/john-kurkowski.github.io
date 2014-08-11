---
layout: post
title: "Paint By Types"
categories: tech
tags: engineering programming fp haskell
---

In the debate between static vs. dynamic types, it recently clicked with me how
powerful static types can be to catch programmer errors. More surprisingly,
they also self-document better and can _guide a program's architecture_. All it
took was following [UPenn's CIS 194 - Introduction to Haskell].

All my experience had been with weak type systems, where I was constantly
fighting the types to little benefit. Things still routinely exploded at
runtime. The fixes always felt like whack-a-mole. All guidance in building the
program came from frameworks and convention. Anything those didn't cover became
a developer free-for-all.

### Predictability

I was skeptical that types could offer any revolutionary benefit. But [Week 5's
lecture][CIS 194 Week 5] offered a particular, brief exercise demonstrating the
potential.

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

{% highlight java %}
public static <A> foo(A arg1, A arg2) {
  // go nuts!
}
{% endhighlight %}

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
put another way: `a -> a -> a` must behave uniformly for any type `a`.

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

When reading a more real world type signature, you stand a much greater chance
to reason about what the function does, without reading its source or testing
it. How about a real function from Haskell's standard includes?

{% highlight haskell %}
fst :: (a, b) -> a
{% endhighlight %}

Similar to the previous exercise, this time there's only 1 possible
implementation.

The answer: given a tuple of any 2 types `a` and `b`, `fst` returns the tuple's
first element. Very handy when unzipping zipped sequences.

Enough polymorphic types. How about more concrete types? Here is a sampling of
type signatures from [Real World Haskell, Ch. 22], which discusses building a
CRUD app for podcasts.

{% highlight haskell %}
prepDB          :: IConnection conn => conn -> IO ()
addPodcast      :: IConnection conn => conn -> Podcast -> IO Podcast
updatePodcast   :: IConnection conn => conn -> Podcast -> IO ()
getPodcasts     :: IConnection conn => conn -> IO [Podcast]
getPodcast      :: IConnection conn => conn -> Integer -> IO (Maybe Podcast)
{% endhighlight %}

It's beyond the scope to explain all the syntax bits here. Nevertheless, I hope
you appreciate the straightforward types. Every function demands a database
connection. Some also take a `Podcast`. Some return zero or more `Podcast`
instances. They all deal with IO. They all embrace the constraints of our first
exercise.

I don't think a Java comparison is fair.

Here's the typical Java version.

{% highlight java %}
public interface PodcastManager {
    public IConnection getConn();
    public void setConn(IConnection conn);

    public void prepDB();
    public Podcast addPodcast(Podcast podcast);
    public void updatePodcast(Podcast podcast);
    public List<Podcast> getPodcasts();
    public Podcast getPodcast();
}
{% endhighlight %}

The difference in approach:

<blockquote class="twitter-tweet" lang="en"><p>OO makes code understandable by encapsulating moving parts. FP makes code understandable by minimizing moving parts.</p>&mdash; Michael Feathers (@mfeathers) <a href="https://twitter.com/mfeathers/statuses/29581296216">November 3, 2010</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

The Java version does not require the `conn` parameter per method. It will
supposedly be encapsulated by the class. Assuming `conn` gets autowired in by
some Spring or Guice magic, or the caller otherwise remembers to set it. If you
don't call methods in the right order though: runtime sadness. Java also
doesn't broadcast whether a method performs IO or optionally returns a result
(hello, `NullPointerException`).

Although I'm only beginning to learn Haskell, I personally have much greater
confidence in its explicitness here, catching the errors of mystery
encapsulation, DI, and careful call-ordering of the Java interface. And I have
far more experience with Java.

### A Note On Self-Documentation

Code is read more often then it is written. Of course it is preferable to not
have to read it at all.

Imagine coming across a door and its doorknob. What if you had to bust out a
100-page manual to turn it? Or take apart the doorknob to learn the same thing?
It would be absurd. Doorknobs are usually intuitive. Yet functions in most
programming languages are not.

I'm not going to excuse Haskell's symbol for `fst`. The symbol could just as
well be a complicated acronym, as it is a shortening of "first." It alone is
insufficient to indicate what the function does. I did have to interpret its
type signature to know what I was going to get. But once I interpreted that
much, I had a pretty good idea, without reading its documentation. Just like I
have a _pretty_ good idea how to deal with a doorknob on sight.

It is not always possible to communicate everything in a type signature, so do
employ comments and documentation where it's unavoidable. I just bring up that
types might placate the "working software over comprehensive documentation"
that so many lazy programmers are prone to. Types give you at least a little
documentation for free. Yell "RTFS!" a little less.

A novel suggestion for Haskell learners is, when searching for a desired
function, e.g. in the standard library, instead of describing how you want the
function to work, enter your desired type signature instead.

### Guiding A Program's Architecture

The expressiveness of types in determining what you want, rather than how to do
it, becomes such a boon that many Haskell programmers define all their types
first, and fill in the implementations later. A top-down approach.

Contrary to interface-driven development in other languages, this actually
gives you early indicators whether the interface itself works. A lot of bad
assumptions get caught by the compiler when writing the types, as well as when
implementing them.

With the predictability of types, defining these types first works beyond
interfaces, guiding the entire flow of a program. Think of a programmer's
typical design, balancing upfront design vs. diving into implementation. At
some point, they can't imagine the whole system in their head, they _have_ to
sneak a peek how something actually behaves by trying it in a REPL or small
prototype. Because they want to see something immediately, they take a
bottom-up approach. The upshot is this will unearth unforeseen issues. The
downside is, coding is expensive. There will be inevitable backtracks and
copy+pastes to fix mistaken assumptions. The chance it will work as-is after
the prototype stage is slim. Having types first, on the other hand, is in many
cases good enough to know what each component must do ???

Finally, when you're able to run the program for the first time, there's a
higher rate that it "just works." That's overly simplistic, of course. Types do
not protect you from logic bugs. Even so, it feels like most of the hard work
is over. Oh, that hard work we're used to, from lower level languages and
weaker type systems, that we assumed was a necessary evil of the job. Now
eliminated.

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

Think of how much time you spend at runtime on those uninteresting problems.

[Meditations on learning Haskell] offers several more perspectives. I think
one quote sums it up.

> I’m terrible at programming. I’m a bad programmer and not very bright.
> Haskell covers for my dumb ass.

I liken all this to fly-by-wire, where automated systems will automatically
stabilize an aircraft on behalf of a human pilot, and prevent the human from
forcing the system into a catastrophic state. I also liken it to paint by
numbers. Both analogies involve guides for imperfect humans. Though they ignore
the fully creative aspect. Haskell honors the promise of programming, that you
can create anything you can imagine. But with its strong type system, the
compiler will give you feedback early and often if your imagination was flawed.

[UPenn's CIS 194 - Introduction to Haskell]: http://www.seas.upenn.edu/~cis194/lectures.html
[CIS 194 Week 5]: http://www.seas.upenn.edu/~cis194/lectures/05-type-classes.html
[Real World Haskell, Ch. 22]: http://book.realworldhaskell.org/read/extended-example-web-client-programming.html
[A Comparison Between Perl and Haskell]: https://ocharles.org.uk/blog/posts/2013-07-26-a-comparison-between-perl-and-haskell.html
[Meditations on learning Haskell]: http://bitemyapp.com/posts/2014-04-29-meditations-on-learning-haskell.html
