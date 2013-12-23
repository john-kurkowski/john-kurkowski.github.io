---
layout: post
title:  "Good Ideas From Mobile Design That Are Good Everywhere"
categories: tech
tags: engineering usability
---

[Google PageSpeed][PageSpeed Insights] was already a great suite of tools for
analysis and automatic enforcement of your web page's speed. Now it is
pioneering **User Experience** and **Mobile** reports, where they warn you
e.g. if your buttons are too small for users’ fingers, or if your plugins won’t
work on their device.

<figure><a href="/images/posts/pagespeed_insights.png"><img src="/images/posts/pagespeed_insights.png" width="50%" height="50%" alt="PageSpeed Insights - screenshot"/></a></figure>

Perhaps these high-level, easy-to-implement tips are the mobile era's addendum
to Nielsen's [10 Usability Heuristics].

Also notice the handy preview of what it looks like on mobile. Not
revolutionary, but when you don’t already have [an expansive device lab][Etsy's
Device Lab], the preview and tips are a nice link to send to your boss and
remind that you're alienating smartphone customers.

Go ahead, send your boss the link to [your web page's analysis][PageSpeed
Insights - johnkurkowski.com].

### We Haven't Had Time For That

If PageSpeed Insights gives you bad marks for Mobile, this is the point the web
site owner gets defensive.

“Oh, we haven’t optimized for mobile yet...”

This attitude incorrectly assumes desktop and mobile are completely separate
efforts. I don’t think mobile always needs to be. Because a) users will put up
with more than you think, and b) good ideas that come out of mobile design are
good for desktop too. Kill 2 birds with 1 stone.

You can start with PageSpeed's report. I don't advocate an absolute need to
stop the presses and switch to mobile-first, or responsive design.[^1]

### Why This Is Important

I think I'm preaching to the choir that mobile user bases are sizeable, and
your development resources are finite.

If you've deliberately chosen against any mobile user experience, is it because
you're trapped in a mindset of, why would anyone use the web differently than
me? Do you think, the only place anyone would use my site from would be a
hardware setup identical to mine? Think again.

It's rare, but sometimes it happens you're too proud and won't settle for
anything less than a dedicated mobile experience.

In all these cases, your *users will* actually settle for a lot less. And all
you'll do is frustrate them, and bring down your brand. From [Don't Make Me
Think], the primer on web usability:

> ... you'd be surprised at how long some people will tough it out at sites
> that frustrate them. Many people who encounter problems with a site tend to
> blame themselves and not the site.
>
> The fact is, your site may not hae been that easy to find in the first place
> and visitors may not know of an alternative. The prospect of starting over
> isn't always that attractive.
>
> And there's also the "I've waited ten minutes for this bus already, so I may
> as well hang in a little longer" phenomenon. Besides, who's to say that the
> competition will be any less frustrating?

At the very least, you alienate people whose only option is a smartphone, or
who don't want to get up from their couch, or who are on the go.[^2]

* * *

### The Good Ideas

You should check out PageSpeed's experimental User Experience report's advice
by running it against your own site. I'll expand on some of its tips here. Then
I'll mix in *what I wish* was in the report.

#### 1. Size Tap Targets Appropriately ([link][Size Tap Targets Appropriately])

Pour your blood & sweat into making a web page, and you'll internalize its
flow. You constantly test its dark corners, probably moreso than your users.
Doing this testing, you get adept at navigating to all your content's links.
All this practice with your own content, let alone your life as a web
developer, has refined your motor skills for operating a mouse to select small
targets. Your users may not have this same expertise. And the situation is only
worse on mobile, with the variability of device and human finger sizes.

Solution: big click targets, and make them look clickable (like a button).
They're more visible and easier to click on.

PageSpeed's recommendation here talks about the millimeter margins between
elements on a mobile device. Millimeters? Hell, big click targets are a good
idea even when we're talking much larger than millimeters.

Further reading:

* [Fitts's Law]
* [The Opposite of Fitts's Law] - what about things we *don't* want users to
  click on?

#### 2. Avoid Plugins ([link][Avoid Plugins])

Adobe Flash: don't use it.

As an example, I can't complain enough about *restaurant* web sites neglecting
their on-the-go audience. It's such a prevalent use-case. Among a group of
friends pondering what to eat, I want to answer: what's on the menu, is the
restaurant open right now, how do I get to the restaurant?

Instead I get a Flash intro---one more download to wait for and link to click
past---and a Flash site standing in my way. These break standard operating
system scrolling, copy & paste, screen readers, and more. Flash is also
completely unusable on iOS, a sizable and [spendy][Mobile shoppers] portion of
mobile users.

We've known Flash has been [bad for usability for 10 years][Flash]. You
overestimate needing to visually and aurally woo potential customers. How about
making it possible for them to get to your restaurant instead? How about a
linkable menu, a clickable phone number?  Integration with familiar services
that will do your job better than you can, like a link to Google Maps for
directions, or OpenTable for instant reservations? Much easier than hiring a
Flash artist consultancy to counterfeit all that, and then maintain their work.

I focus on restaurants because they've been frustrating me a long time.
Breaking basic operating system usability and wasting user time are no-nos for
everyone, though. Reconsider your desire to be stylish and unique. Being usable
is a lost art that packs a superior ROI.

#### 3. Configure the Viewport ([link][Configure the Viewport] & [link][Size Content to Viewport])

Just do it. It's a few lines of code at most.

Although it is far from the greatest upset if your users have to pinch and zoom
and pan to reach certain corners of your site. If it's the only way to get what
they want, again, they'll put up with it.

The greater upset is violating the other design guidelines in this article and
making those corners inaccessible entirely!

#### 4. Use Legible Font Sizes ([link][Use Legible Font Sizes])

Don't make your users' job harder then it has to be. Let them read your
content.

"But there's so much I want to say! Bigger font sizes mean less room!" you cry.
If you follow the next tip, this shouldn't be a problem.

* * *

### My (Stolen) Ideas

Here's what I would love to see added to the User Experience report.

#### 5. Remove Half Your Text, Then Remove Half Of What's Left

Maybe Google PageSpeed can't tell you what to write. But I can. The answer
is *less*.

People don't read. They scan for the information they're looking for. They
don't want to think. So there's no time for people to read instructions, or
internalize the specifics of your web site. There are a million other web sites
they have to keep up with. Stop thinking your text is so special.

Solution: listen again to Don't Make Me Think. Write your text, then, before
publishing ...

> Get rid of half the words on each page, then get rid of half of what’s left.

I'd say your users will notice and thank you. They won't. What they will do is
be able to consume your site and determine what they need to know, rather than
get lost and frustrated.

#### 6. Avoid Modes: Hovers, Modals

One day I hope the User Experience report could automatically include these
points from my [Credo], because I see them violated again and again:

<blockquote>
  <ul>
    <li>
      <p>“Show the data.” – <a href="http://www.edwardtufte.com/tufte/">Edward Tufte</a></p>

      <ul>
        <li>Avoid implementing interfaces that hide their data, especially across
  different input devices and accessibility issues.</li>
      </ul>
    </li>
    <li>
      <p>Avoid interaction &amp; modes.</p>

      <ul>
        <li><a href="http://worrydream.com/MagicInk/#most_software_is_information_software">Most software is information
  software</a>
  and should minimize interaction &amp; modes.</li>
      </ul>
    </li>
  </ul>
</blockquote>

Let me explain what I was getting at.

When presented with the problem of too-much-content-not-enough-space, some web
site owners think, "I know, I'll use a tooltip hover" or "a modal dialog."
These are antipatterns, plain and simple.  They a) hide what ought to be
apparent to the user, making them think, and b) convert the fundamental
human-computer task, 99% of the time to read and learn, into *interacting* with
the computer in order to read and learn.

Remember you're constantly testing your own site, navigating to all its dark
corners. You may even become proud of this interactivity. But interactivity to
your users is a *cost*, physical & mental (they'd rather just read, and not
interact).

Physical because the user has to exercise their mouse skills to invoke these
*data-hiding* design decisions, tooltips & dialogs. Mental because they have to
know to do it, and how their situation changes when they do. This is the
abstract problem with *modes*.[^3]

WHY YOU ALREADY KNOW MODES ARE ANNOYING (HOPEFULLY THEY'RE SOUNDING MORE AND MORE LIKE A DESIGNER'S COP-OUT)

BRINGING IT BACK TO TOOLTIPS & DIALOGS

MOBILE IS ONLY BRINGING THE PROBLEM WITH THESE CLOSER TO THE FOREFRONT - IMPOSSIBILITY AND OFTEN CSS IMPLEMENTATION

#### 7. Avoid Modes: Inner Scrolls

ABOVE THE FOLD / INNER SCROLL

#### 8. No, Really, Show the Data

Photo gallery sites aside, I wonder if PageSpeed could issue a warning for *too
little content*. Probably not, but when presented with the problem of
too-much-content-not-enough-space, some web site owners forget they could get
rid of a vacuous graphic, carousel, or Flash intro, making space for solving
user problems instead.

Finally, if you're hiding data *on purpose* out of fear of information
overload, remember, "[there's no such thing as information overload, only bad
design][Tufte-isms]."

### Footnotes

[^1]: I believe you should investigate mobile-first, responsive design, et. al.,
      and adopt them if they fit your needs and resources. On the extreme, a
      tailored experience on every device is best. But it’s understandable to
      be too overwhelmed to consider these, and seek the most user experience
      bang for your buck.

[^2]: [Here's one surprising
      account](http://the-pastry-box-project.net/karen-mcgrane/2013-august-7/)
      of mobile experience taking over where you might not expect, in applying
      for jobs.

[^3]: In [A Personal History of Modeless Text Editing and Cut/Copy-Paste],
      Larry Tesler says a mode is "a state of the user interface that lasts
      for a period of time, is not associated with any particular object, and
      has no role other than to place an interpretation on operator input."
      So, modes only burden the user. The advice to avoid them continues the
      usability theme of Don't Make Me Think.

[PageSpeed Insights]: http://developers.google.com/speed/pagespeed/insights/
[PageSpeed Insights - johnkurkowski.com]: http://developers.google.com/speed/pagespeed/insights/?url=http%3A%2F%2Fjohnkurkowski.com
[10 Usability Heuristics]: http://www.nngroup.com/articles/ten-usability-heuristics/
[Etsy's Device Lab]: http://codeascraft.com/2013/08/09/mobile-device-lab/
[Don't Make Me Think]: http://www.sensible.com/dmmt.html
[Size Tap Targets Appropriately]: https://developers.google.com/speed/docs/insights/SizeTapTargetsAppropriately
[Fitts's Law]: http://www.particletree.com/features/visualizing-fittss-law/
[The Opposite of Fitts's Law]: http://www.codinghorror.com/blog/2010/03/the-opposite-of-fitts-law.html
[Avoid Plugins]: https://developers.google.com/speed/docs/insights/AvoidPlugins
[Mobile shoppers]: http://www.cnn.com/2013/12/06/tech/mobile/ios-android-mobile-shopping/
[Flash]: http://www.nngroup.com/articles/flash-99-percent-bad/
[Configure the Viewport]: https://developers.google.com/speed/docs/insights/ConfigureViewport
[Size Content to Viewport]: https://developers.google.com/speed/docs/insights/SizeContentToViewport
[Use Legible Font Sizes]: https://developers.google.com/speed/docs/insights/UseLegibleFontSizes
[Credo]: {% post_url 2013-10-16-credo %}
[Tufte-isms]: http://spectrum.ieee.org/at-work/innovation/tufteisms
[A Personal History of Modeless Text Editing and Cut/Copy-Paste]: http://dl.acm.org/authorize?6716500
