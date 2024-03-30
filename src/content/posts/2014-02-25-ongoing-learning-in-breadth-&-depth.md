---
layout: post
title: "Ongoing Learning in Breadth & Depth"
categories: tech
tags: engineering programming javascript
---

To those overwhelmed by all the programming languages and tools you can learn,
changing daily, I'd like to offer some peace of mind. In [my previous
article][Don’t Learn to Code, Learn to Program Instead - But Come Back In 10
Years], I questioned the rampant, disconnected proliferation of code. I don't
know why it is stuck the way it is. I dream of a revolution that cleans it up,
but I don't know how. Nevertheless, I have some tips on what you can do now
in your ongoing learning of programming tools.

First, a frustrating, inspiring anecdote.

I gave a talk at the [Ember-SC meetup] comparing 6 different JavaScript build
tools, and glossing over several more. The final slide rated each tool on
6 factors.

<div className="mt-4">
  <script async className="speakerdeck-embed" data-slide="41" data-id="724a7e007bd6013119ba66337b7b74ec" data-ratio="1.77469670710572" src="//speakerdeck.com/assets/embed.js"></script>
</div>

It’s highly opinionated, no doubt, but it stands out as a more rigorous
visualization than you normally see, for such a low-level software bake-off.

It impressed the audience. Those who were about to switch build tools said
they’d use it as a springboard for their own research.

To me though, in the wake of my previous article, it was tough to dig in,
analyze so many tools, visualize them, and remain objective without exploding
and criticizing the whole situation. In the same way I questioned the myriad
jQuery and Wordpress plugins in my previous article, why are there this many
competing build tools?

They’re expensive to learn and compare. A few hours playing with each hardly
gives me a sense of their long-term consequences. I can’t give each months of
my time. I have things to do.

Figuring out the slide’s 6 unscientific criteria for rating and then actually
investigating was an exercise in itself. Just to make some sense of the
landscape, probably only to me. Why are bake-offs so individual, so hard, and
still not definitive?

This was considerable effort for what amounts to a necessary evil. My customers
don’t care what build tool I use. So I’d rather be programming my app.

Perhaps JavaScript programmers all want to make their mark on the community. Or
they aren’t talking to each other. Or they’re truly dissatisfied with all the
existing options.[^1] [^2] Or some decades-old idea [being rewritten in
JavaScript is inevitable][The Principle of Least Power]. I don’t know.

### What I Learned About Bake-Offs

I’ll save for a later article analyzing why the JavaScript ecosystem is this
way. In the meantime, let me suggest how to deal with a deluge of programming
possibilities.

1. Establish criteria for what is important to your team.
    * The tool helping you and not getting in your way is most important, but
      this is the most difficult to measure at a glance. So you’ll need other
      criteria to identify cost and risk.
2. Find what tools exist and which fit your criteria, from discussion with real
   users and code snippets.
3. Choose one.

Don’t even go as deep as my build tool evaluation. I regret it some. I enjoyed
the learning, but spent days preparing for what I hoped to be a high quality
presentation by lying to myself that I was being comprehensive and objective.
Really the bake-off was just packaging up my own bias and self-selected Google
search results.

Besides, evaluating each candidate in depth might never end, if you keep an eye
on the firehose of new tech on Hacker News.

“3 steps? That’s it?” you gasp. “What if I get stuck with the wrong tool?”

Much more effort and you risk analysis paralysis.

I can't think of a technology company that was killed by its choice of tech. I
can think of plenty that were killed by failing to get things done. There is an
overlap there, but programmers put too much emphasis on it. With a small
candidate set and just a little upfront research, a “bad” choice will matter
less than you think. So choose.

Don’t worry about this now, but yes: down the road, if your tools get in your
way more than they serve you, ditch them. You might worry now that the tool
will take root in your organization and be hard to excise. If it gets to that
point, you’ll be far along, and your enterprise will have bigger problems than
a lone e.g. build tool you chose all those years ago.

The bad news about this formula is it's still more art than science. The good
news is you can start feeling better now.

### To Those On The Cutting Edge

A more general note from my [Credo]:

> * Ongoing learning.
>   * Breadth: don't judge books by their covers. Yet accept you can't learn
>     everything.
>   * Depth: [don't be zealous about the technologies you do study
>     deeply](http://prog21.dadgum.com/128.html). You sound like a dick, and
>     blind yourself to complementary tech and better solutions.

Tech forums like Hacker News encourage a 5-second attention span for cutting
edge development tools. Shamefully, this is how a couple build tools made it
into my “top 6.” Do not fall prey to this. You’ll end up like [this
commenter](http://www.zemanta.com/blog/i-bet-you-over-engineered-your-startup/#comment-685047168).

> … I can't keep up, I just finished learning backbone.js and now I've found
> out on HN that it's old news, and I should use ember.js, cross that, it has
> opinions, I should use Meteor, no, AngularJS, no, Tower.js (on node.js), and
> for html templates I need handlebars, no mustache, wait, DoT.js is better,
> hang on, why do I need an HTML parser inside the browser? isn't that what the
> browser for? so no HTML templates? ok, DOM snippets, fine, Web Components you
> say? W3C are in the game too? you mean write REGULAR JavaScript like the
> Google guys? yuck, oh, I just should write it with CofeeScript and it will
> look ok, not Coffee? Coco? LiveScript?  DART? GWT? ok, let me just go back to
> Ruby on Rails, oh it doesn't scale? …

It goes on. The deluge the commenter raises is real; programming is definitely
in a pickle. But we can still accomplish things right now.

If you're too up-to-date with cutting edge solutions, that attitude is not
getting anything done. The Paradox of Choice can even be depressing.[^3]

So do not stress too much that you can’t keep up. In reality, it’s better to
just pick one tool, develop competence with it, and maintain a light awareness
of other things going on. Most tools will not utterly pigeonhole you. They
will grant you experience that applies beyond their walls.

Don’t get too comfortable either. Maintain an attitude of wondering if there’s
a better way, up to but *not including* the stress you’re doing things wrong.
There’s a difference between self-improvement and self-doubt. Accept you can’t
learn everything. Enjoy what you do learn. Don’t be zealous about it. It’s a
balance.

### Footnotes

[^1]: I admire the bold aim of [this build tool][Broccoli: First Beta Release]
     to displace every other build tool from my presentation. Take it with a
     grain of salt though, or else it's a depressing reminder you previously
     picked the wrong tool.

[^2]: For great humor: [Task Runners and Builders: Just Because You Can Does That Mean You Should?]

[^3]: For a light, software-oriented intro to the Paradox of Choice, see
      Spolsky's [Choices = Headaches].

[Don’t Learn to Code, Learn to Program Instead - But Come Back In 10 Years]: /posts/dont-learn-to-code-learn-to-program-but-come-back-in-10-years/
[Ember-SC meetup]: http://www.meetup.com/Ember-SC/events/159041272/
[The Principle of Least Power]: http://www.codinghorror.com/blog/2007/07/the-principle-of-least-power.html
[Credo]: /posts/credo/
[Broccoli: First Beta Release]: http://www.solitr.com/blog/2014/02/broccoli-first-release/
[Task Runners and Builders: Just Because You Can Does That Mean You Should?]: https://medium.com/cool-code-pal/d8eeefdc4395
[Choices = Headaches]: http://www.joelonsoftware.com/items/2006/11/21.html
