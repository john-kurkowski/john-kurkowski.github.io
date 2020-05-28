---
layout: post
title:  "Don’t Learn to Code, Learn to Program—But Come Back in 10 Years"
categories: tech
tags: engineering programming
---

I want to discuss why programming and coding are not the same, and why I can no
longer support the Learn to Code movement. I can no longer tell my friends to
learn coding. Although I'm passionate about it, it's too arcane and insular for
mainstream practice. Come back when programming gets its act together.

It pains me to say so, because there is a creator’s high in producing complex,
invisible machines made of little more than thought. I want to share it.
Programming is a notion **to extend human capability**, by offloading
humanly-infeasible work onto a machine. It is the promise of an **amplified
knowledge worker**. This would be worthy to learn.

Yet we barely have programming today. All we seem to have is coding. It is less
of an extension of human capability than it is a brittle hack.

> If builders built buildings the way programmers wrote programs, then the
> first woodpecker that came along would destroy civilization.
>
> -- Gerald M. Weinberg, The Psychology of Computer Programming (1971)

Coding is a pure text, watered-down implementation of programming. Nowhere near
an intuitive, hands on experience like painting or crafting. You can't see what
you're doing. You hardly know what others are doing; there are far more ways to
write a program than there are established ways to build a house, for example.
To oversimplify, the inclusion or omission of a text character **in
ever-changing code, not necessarily your own code** can make all the difference
if your company’s website stays up today, or the button on your nuclear missile
is secure. This is unintuitive and error prone. It’s mile-high Jenga and the
rest of the world piled on their own custom blocks while you weren't looking.

To ameliorate this, there are human engineering techniques, but they treat the
symptoms, not the root cause. [Coding's accessibility to humans has stagnated
in the past few decades][The Future of Programming] (a video that should be
required monthly watching for programmers). I don’t mean accessibility to just
outsiders. It is a large mess that hardcore coders themselves
can hardly keep up with and predict. Sometimes, I take a step back from mashing
together 2 things that were never meant to work together---for the 100th time
today---and wonder how anything ever gets done. What cool thing was I trying to
build before I got sidetracked with this tedious mashing?

What progress has been made? Programming ideas from *several decades ago* are
only coming to mainstream, begrudging acceptance now. For example, functional
programming wasn't just a weird academic toy from the mid 1900s; it has a
certain provable foundation, and evident speed & maintenance advantages. A
relief from the unintuitive, unscalable, unfounded snake oils like OOP, markup,
APIs, or the triumvirate of HTML/CSS/JS. As if these technologies are the best
we can do.

Speaking of the technologies we seem to be stuck with, much of the programming
community's discussion is heated debates about today's text-based languages:
what order of operations do you prefer, number of special keywords, maximum
textual expressiveness in as little space as possible. All mere incremental
improvements to the programming ecosystem. And boy do these coders like to
debate. They take pride in mastering the most **arcane** of interfaces, tweaks,
and underlying low-level architectures. As part of discussing and mastering
these arcane details, they proliferate them. For the layman to then paint with
their brush, they get more bits of information than they would ever want to
know. Sadly, the more they can hold in their head at once, the better.

Take this proud tweet for example. Someone figured out the correct cocktail
recipe to be a web developer.

<blockquote class="twitter-tweet"><p>Everything you need to win at web development: <a href="https://twitter.com/nodejs">@nodejs</a> <a href="https://twitter.com/MongoDB">@MongoDB</a> <a href="https://twitter.com/gruntjs">@gruntjs</a> <a href="https://twitter.com/bower">@bower</a> <a href="https://twitter.com/angularjs">@angularjs</a> <a href="https://twitter.com/jquery">@jquery</a> <a href="https://twitter.com/twbootstrap">@twbootstrap</a> <a href="https://twitter.com/fontawesome">@fontawesome</a> <a href="https://twitter.com/livereload">@livereload</a></p>&mdash; Justin Klemm (@justinklemm) <a href="https://twitter.com/justinklemm/statuses/396324049754009600">November 1, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

How is anybody supposed to discover & master 9 disparate technologies? Switch
between them? Bake them off against all their alternatives?

Can't I just make a website?

The proliferation isn't just for hardcore web developers. Smashing Magazine and
its ilk target more casual designers, with articles like *30 New jQuery Plugins
Worth Taking a Look At,* *25 Social Media Plugins For WordPress*, and *22 Best
Responsive CSS Frameworks for Web Design.* What kind of situation are we in
that popularizes unwieldy lists of *code* like this?

Meanwhile there are few souls looking to evolve text code into something more
humanly **intuitive**. For example something you can touch, you don’t have to
read, or that tells you what the computer is thinking, so you don’t have to
think like a computer yourself.

What are coders doing then? They can’t constantly debate or think about how to
take revolutionary leaps forward; nothing might get done today. Besides, what
would it mean to give up the tools they invested so much in? So I think they
suck it up, remember their pride in knowing how to do what they do, and they
write another line of code. As if another line of code were a net win for the
world.

Jeff Atwood’s [Please Don’t Learn To Code][Please Don't Learn To Code] is the
most pragmatic anti-Learn to Code movement piece.

> You should be learning to write as little code as possible. Ideally none …
> Software developers tend to be software addicts who think their job is to
> write code. But it’s not. Their job is to solve problems.

My amendment to Atwood’s article is, the coding culture he describes is majorly
responsible for programming’s stagnation. And because the best programming
teachers come from the programming industry, we get an **insular** cycle of
this-is-the-way-I-learned-to-program-so-will-you. So the apprentice furiously
practices their rite of passage, writing another line of code. In text.

I am part of the problem. After this, sure, I will go to my job and *try* to delete
lines of code or weasel out of writing them. More than likely though I'll
shortsightedly inflict added lines of code on my team. Yet another band-aid
around other code we wrote. Yet another path of logic to maintain. Then I'll go
tweet about what's wrong with the programming language du jour. Because text is
what the Unix gods gave us. Because such-and-such software engineering
principle. Because getting the job done. Because it feels good. Without fully
stopping to think if there a drastically better way.

In this article, I have been disparaging of programmer culture, similarly to
rants against any culture stuck in its ways (I'm not stuck in traffic, I *am*
traffic). Still, I think programmers are smart enough to overcome the problem,
if we identify it.

I don't want to conclude without any solution in sight either. So I ask you
programmers [to note the things programming makes you waste your time on][We're
not even trying], compared to what you should've been accomplishing. You
probably internalize the frustrations as, "Oh well, it's the only way to do
things. Part of the job." Take a step back to analyze instead. Maybe there's an
opportunity in disguise for making programming easier & fun.

Imagine that [black triangle][The Black Triangle] moment, but, instead of a
brief moment after days of schlepping data around and senseless debugging,
experiencing that joy of programming *all the time*.

I'll note some projects that bring some hope to modern programming.

* [Light Table][Wired - Light Table] - IDE that shows the result of executing
  source code, inline.
* [NoFlo][NoFlo] - visual, flow-based programming. (It's interesting to note
  visual programming is often thought of as "for kids." I prefer to think of it
  as for humans.)

Look to these as role models. Then I challenge you to aim higher. These projects
are also taking ideas from decades ago. Put down your text code. In 2014, how
would *you* like to program?

Until visual or touch programming---*something*---gains traction, I have to
answer curious knowledge workers. My friends ask if they should follow one of
these Learn to Code websites. Either they are curious about what I do or
they hear it’s a lucrative career. If you understand it and you have fun, I
won't stop you. I don’t feel as strongly as Atwood, who says you’ll be a net
loss to the world.

But I can’t recommend coding casually either, because it is an arcane and
insular art. It is ridiculously hostile to the layman. You have to be a
masochist more than anything. First to get good and then to endure. Coding is
not yet the great promise of programming, extending human capability. I love
what computers have done for me and what they can do for people. But come back
in 10 years when the promise of programming hopefully bears fruit, when
programming becomes accessible, when coding is a thing of the past.

<blockquote class="twitter-tweet"><p>&quot;Programming for the masses&quot; won&#39;t be successful if people have to change to suit programming. Programming should change to suit the people.</p>&mdash; Chris Granger (@ibdknox) <a href="https://twitter.com/ibdknox/statuses/396372478982750208">November 1, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p>To be clear, I don&#39;t want to bring &quot;code&quot; or &quot;writing software&quot; to the masses at all. That&#39;s scary, arcane nonsense that I want to disappear</p>&mdash; Chris Granger (@ibdknox) <a href="https://twitter.com/ibdknox/statuses/396378696086339584">November 1, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

[The Future of Programming]: http://vimeo.com/71278954
[Wired - Light Table]: http://www.wired.com/wiredenterprise/2014/01/light-table/
[NoFlo]: http://noflojs.org/
[Please Don't Learn To Code]: http://www.codinghorror.com/blog/2012/05/please-dont-learn-to-code.html
[We're not even trying]: http://scattered-thoughts.net/blog/2014/01/27/were-not-even-trying/?utm_medium=twitter&utm_source=dlvr.it
[The Black Triangle]: http://rampantgames.com/blog/2004/10/black-triangle.html
