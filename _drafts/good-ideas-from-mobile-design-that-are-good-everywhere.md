---
layout: post
title:  "Good Ideas From Mobile Design That Are Good Everywhere"
categories: tech
tags: engineering usability
---

I liken mobile web design to designing for handicaps, in that good ideas in designing
for handicapped users benefit un-handicapped users alike. For example,

1. Writing text for screen readers for the blind---rather than embedding text
   in images---lets seeing people find, copy, & zoom the text too.
2. Leaving an extra pause between presentation slides lets interpreters keep up
   with the material and lets native speakers absorb the material better. No
   one has to multitask between reading the slide & listening to the presenter.

I think the same killing 2 birds with 1 stone applies to designing for mobile
devices.

[Google PageSpeed][PageSpeed Insights] got me thinking about this, as it
recently added **User Experience** and **Mobile** reports, where they warn you
e.g. if your buttons are *too small* for users’ fingers, or if your *plugins*
won’t work on their mobile device.

<figure><a href="/images/posts/pagespeed_insights.png"><img src="/images/posts/pagespeed_insights.png" width="50%" height="50%" alt="PageSpeed Insights - screenshot"/></a></figure>

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
efforts. I don’t think mobile always needs to be. Because **a)** users will put up
with more than you think, and **b)** good ideas that come out of mobile design are
good for desktop too. Kill 2 birds with 1 stone.

I don't advocate an absolute need to stop the presses and switch to
mobile-first, or responsive design. I believe you should separately investigate
and adopt them if they fit your needs and resources. On the extreme, a tailored
experience on every device is best. But it’s understandable to be too
overwhelmed to consider these, and seek the most user experience bang for your
buck.  You can start with PageSpeed's report.

### Why This Is Important

I think I'm preaching to the choir that mobile user bases are sizeable, and
your development resources are finite.

If you've deliberately chosen against any mobile user experience, is it because
you're trapped in a mindset of, why would anyone use the web differently than
me? Do you think, the only place from which anyone would use my site would be a
hardware setup identical to mine? Or only from a single device? Think again.

Sometimes you're too proud and won't settle for anything less than a dedicated
mobile experience.

In all these cases, your users *will* actually settle for a lot less. All
you'll do is frustrate them, and bring down your brand. From [Don't Make Me
Think], the primer on web usability:

> ... you'd be surprised at how long some people will tough it out at sites
> that frustrate them. Many people who encounter problems with a site tend to
> blame themselves and not the site.
>
> The fact is, your site may not have been that easy to find in the first place
> and visitors may not know of an alternative. The prospect of starting over
> isn't always that attractive.
>
> And there's also the "I've waited ten minutes for this bus already, so I may
> as well hang in a little longer" phenomenon. Besides, who's to say that the
> competition will be any less frustrating?

At the very least, you alienate people whose only option is a smartphone, or
who don't want to get up from their couch, or who are on the go.[^1]

So how about those 2 birds with 1 stone? Keep the following ideas in mind, and
help both customers. Stop making excuses to your mobile audience.

* * *

### The Good Ideas

You should check out PageSpeed's experimental User Experience report's advice
by running it against your own site. I'll expand on some of its tips here. Then
I'll mix in what *I wish* was in the report.

#### 1. Size Tap Targets Appropriately ([link][Size Tap Targets Appropriately])

Pour your blood & sweat into making a web page, and you'll internalize its
flow. You constantly test its dark corners, probably more than your users.
Doing this testing, you get adept at navigating to all your content's links.
All this practice with your own content, let alone your life as a web
developer, has refined your **motor skills** for operating a mouse to select
small targets. Your users may not have this same expertise. The situation is
only worse on mobile, with the variability of device and human finger sizes.

**Solution:** big click targets, and make them look clickable (like a button).
They're more visible and easier to click on.

PageSpeed's recommendation here talks about the minimum *millimeter* margins
between elements on a mobile device. Millimeters? Hell, big click targets are a
good idea even when we're talking much larger than millimeters. Go big.

Further reading:

* [Fitts's Law]
* [The Opposite of Fitts's Law] - what about things we *don't* want users to
  click on?

#### 2. Avoid Plugins ([link][Avoid Plugins])

Adobe Flash: don't use it.

Google cites its security flaws, crashes, and battery drain. I say it's too
easy for web designers to build unusable things with it.

As an example, I can't complain enough about *restaurant* web sites neglecting
their on-the-go audience. They have such a prevalent use-case. Among a group of
friends pondering what to eat, I want to answer: what's on the menu, is the
restaurant open right now, how do I get to the restaurant? Let me get out my
phone.

Instead I'm greeted with a Flash intro---one more download to wait for and link
to click past---and a Flash site standing in my way. Using raw Flash (and not a
higher level toolkit like Flex), the web designer amateur breaks standard
operating system scrolling, copy & paste, screen readers, and more. We've known
Flash has been [bad for usability for 10 years][Flash]. Flash is also
completely unusable on iOS, a sizable and [spendy][Mobile shoppers] portion of
mobile users.

Flash *can* be accessible. But for some reason its ecosystem makes it easy to
skip that part, and proceed directly to visually and aurally wooing potential
customers.

Shouldn't you invest in people getting to your restaurant instead? How about a
linkable text menu, a clickable phone number?  Integration with familiar
services that will do your job better than you can, like a link to Google Maps
for directions, or OpenTable for instant reservations? Much easier than hiring
a Flash artist consultancy to counterfeit all that, and then maintain their
work.

I focus on restaurants because they've been frustrating me a long time.
Breaking basic operating system usability and wasting user time are no-nos for
*everyone*, though. Reconsider your desire to be stylish and unique. Being
usable is a lost art that packs a superior ROI.

#### 3. Configure the Viewport ([link][Configure the Viewport] & [link][Size Content to Viewport])

Sure, do it. It's a few lines of code at most.

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

Then on **mobile**, a wall of text is like trying to read a novel through a
keyhole.

**Solution:** listen again to Don't Make Me Think. Write your text, then, before
publishing ...

> Get rid of half the words on each page, then get rid of half of what’s left.

I'd say your users will notice and thank you. They won't. What they will do is
be able to consume your site and determine what they need to know, rather than
get lost and frustrated.

#### 6. Avoid Interaction & Modes: Hovers, Modals

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
site owners think, "I know, I'll use a tooltip hover" or "a modal dialog." It
is an antipattern to leap to these as your first line of defense. At best, they
are an Easter egg-level progressive enhancement. More typically, they **a)**
hide what ought to be apparent to the user, forcing them to think, and **b)**
convert the fundamental human-computer task, 99% of the time to read and learn,
into *interacting* with the computer in order to read and learn.

Remember you constantly test your own site, navigating to all its dark corners?
You may even become proud of this interactivity. But interactivity to your
users is a *cost*, physical & mental.

Physical because the user has to exercise their mouse skills to invoke these
*data-hiding* design decisions. Mental because they have to *know to do it*, how
their situation changes when they do, and remember what they were doing
beforehand. This is the problem with **modes**, temporary, sometimes
imperceivable states in your software, where things suddenly behave differently
than what the user is accustomed to. Or another task the user must context
switch to and address, before returning to their original one. Like clicking the
X on your "Like Us On Facebook" popup.

The dubious nature of modes is another paper in itself. Let's just say, every
time you add a mode, you dump work on the user. You have failed your user.

Getting back to hovers and dialogs. Both of these require modes, which are
bad for the aforementioned reasons. On mobile, the story is only worse.

On **mobile**, hovering means a higher number of clicks or it is outright
impossible (i.e. on touch screens). So hover-invoked things like tooltips are
inaccessible to mobile users, in most hover implementations.

On **mobile**, dialogs add further to an already strained cognitive load, with the
tyranny of single-purpose apps the user must multitask between. A dialog is yet
another. Also, in many web modal dialog implementations, they resist the user
actually zooming, reading, and dismissing them (i.e. the more you zoom in, the
more the dialog goes off screen).

By choosing these techniques, you have chosen to cripple mobile users. Nobody
on the desktop likes them either.

**Solution:** interaction & modes are costly to users, so avoid them. Instead,

* *Show the data* or descriptions in context. If it's not important enough to
  show in context, delete it (#5).
* Use direct & consistent text & symbology, so the user knows what they're
  getting into without having to read.
* In the case of dialogs that gather user input, let users do it as part of
  their existing flow, not on your terms by interrupting them with something
  they won't read anyway.
* If you absolutely must give the middle finger to your users by introducing a
  mode or interaction, pick implementations that work on touch screens.

#### 7. Avoid Interaction & Modes: Inner Scrolls

After web designers learn the importance of above-the-fold content ("users
don't wanna scroll; they'll hit that Back button in n seconds instead") they
can take the guideline too far, focusing on cramming content. They ensure all
their site's widgets are above the fold by giving them their own, inner
scrollbars, i.e. areas that scroll independently of the main browser window.

I've worked with several designers with this tendency. The work was not made
public, so I'll just have to point to the most prominent inner scroll example
(admittedly a far-from-terrible use of inner scrolls). In Gmail's New Compose,
you can scroll the text of the email you're composing independently of
scrolling your list of inbox messages.

<figure><a href="/images/posts/gmails-new-compose.png"><img src="/images/posts/gmails-new-compose.png" width="50%" height="50%" alt="Gmail's New Compose - screenshot"/></a></figure>

On the plus side, this facilitates comparison. This is a valuable part of the
most common human-computer task of learning. It even gives some extra sense
where you are in the app, i.e. what data and operations are available right
now.

On the down side, it introduces extra interaction cost to get at the data
hidden within the scroll and it introduces a mode: the scroll only works when
in the scroll's mode, e.g. if the user's mouse happens to be hovering over the
inner scroll's area. The Gmail screenshot has only 1 inner scroll, but I've
seen 5 stacked screen edge to edge. To fit, the inner scroll areas must get
smaller and smaller. If you did the reading on [Fitts's Law], there's then a
proportional slowdown in being able to mouse over any individual scroll. So it
becomes costly to scroll if desired, and scrolling is often accidental
(scrolling an inner when you mean to scroll the outer, and vice-versa).

The inner scroll is only more finicky on **mobile** devices. More clicks for
the user to target the scroll they want to use. Or the scroll just doesn't
anticipate touch at all, and the data it hides is again completely
*inaccessible*.

It is less cost for the user to just scroll the whole window for their desired
data, because the user is more accustomed to scrolling that way, and without
dealing with modes.

**Solution:** let users scroll as they are accustomed.

* Below-the-fold content isn't the end of the world, as long as there is
  indication it's there.
* Facilitating side-by-side comparisons is good, it just isn't achieved so well
  by inner scrolls. If comparison is a major use case, design for it. Better
  than putting work on the user, to line up the scrolls just right.

#### 8. No, Really, Show the Data

I wonder if PageSpeed could issue a warning for *too little* content. It
already takes into account [the performance of your above-the-fold
content][Prioritize Visible Content]. Why not the above-the-fold data
density? The whole page's?

When presented with the problem of too-much-content-not-enough-space, some web
site owners forget they could free up screen real estate by removing

* a vacuous graphic
* a [carousel][Auto-Forwarding Carousels]
* the Flash intro (#2)

making space for solving the audience's problems instead.

Screen real estate is at a premium on *all* devices. Make every pixel count.

Finally, if you're hiding data *on purpose* out of fear of information
overload, remember, "[there's no such thing as information overload, only bad
design][Tufte-isms]."

### Conclusion

The common thread among these tips is that following them empowers users on all
devices. Doesn't matter whether you target mobile. Meanwhile disregarding the
tips hurts users on all devices. Sometimes it completely alienates them.

My approach might not beat a mobile-dedicated design, but it'll get you ready
for one. If you'd rather have that alienated audience than not, I believe you
can start saving them now. It is little extra cost over what you're already
building to avoid these design pitfalls.

### Footnotes

[^1]: [Here's one surprising
      account](http://the-pastry-box-project.net/karen-mcgrane/2013-august-7/)
      of mobile experience taking over where you might not expect, in applying
      for jobs.

[PageSpeed Insights]: http://developers.google.com/speed/pagespeed/insights/
[PageSpeed Insights - johnkurkowski.com]: http://developers.google.com/speed/pagespeed/insights/?url=http%3A%2F%2Fjohnkurkowski.com
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
[Prioritize Visible Content]: https://developers.google.com/speed/docs/insights/PrioritizeVisibleContent
[Auto-Forwarding Carousels]: http://www.nngroup.com/articles/auto-forwarding/
[Tufte-isms]: http://spectrum.ieee.org/at-work/innovation/tufteisms
