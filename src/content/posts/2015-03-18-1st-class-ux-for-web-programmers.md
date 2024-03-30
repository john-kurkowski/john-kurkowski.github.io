---
layout: post
title: '1st Class UX for Web Programmers'
categories: tech
tags: engineering usability
description:
  On the web, your users are no longer a secondary engineering concern. A
  thick-client framework, like Ember.js, makes UX 1st class.
---

import googleChromeDinosaur from './google-chrome-dinosaur.png'

Programmers often talk about their tools making functions 1st class, or objects
1st class. What about making UX 1st class?

### The UX Trend

[EmberConf](http://emberconf.com) is a conference about the JavaScript
thick-client framework, [Ember.js](http://emberjs.com). In 2015, of the
conference's 16 talks, there were 5 talks centered around UX & design.

1. [Designing for Ember Apps](https://www.youtube.com/watch?v=ijiNbF2Wu0E&list=PLE7tQUdRKcyacwiUPs0CjPYt6tJub4xXU&index=3)
2. [Ambitious UX for Ambitious Apps](https://www.youtube.com/watch?v=TlU0m18Pr-Y&list=PLE7tQUdRKcyacwiUPs0CjPYt6tJub4xXU&index=6)
3. [Fault Tolerant UX](https://www.youtube.com/watch?v=s2awUFvA-0I&list=PLE7tQUdRKcyacwiUPs0CjPYt6tJub4xXU&index=18)
4. [Interaction Design with Ember 2.0 and Polymer](https://www.youtube.com/watch?v=Z8NDAiOZ8SE&list=PLE7tQUdRKcyacwiUPs0CjPYt6tJub4xXU&index=12)
5. [Physical Design](https://www.youtube.com/watch?v=p8aF-7-_cE8&list=PLE7tQUdRKcyacwiUPs0CjPYt6tJub4xXU&index=15)

A conference about Ember.js is not a general conference. It’s about a
programming framework. Why all the talks about UX? I don’t think it’s a
coincidence.

Individually, these talks build their case with specific design patterns and app
features. Together, they make a general point. On the web, your users are no
longer a secondary engineering concern. A thick-client framework like Ember.js
makes UX 1st class.

### Design Is How It Works

"What? But I’m not a designer!" replies the unenlightened programmer.

A couple of these talks
[quote Steve Jobs about why Apple was so ahead in the design game](http://www.nytimes.com/2003/11/30/magazine/30IPOD.html).

> "Most people make the mistake of thinking design is what it looks like …
> That's not what we think design is. It's not just what it looks like and feels
> like. Design is how it works."

At one point or another, we’ve all been the unenlightened programmer about this.
We often get so much joy from crafting invisible machines, we forget about the
user, that our code affects them.

Let’s say you do care though. Let’s say you’re about to ship your Rails page for
persisting a user form. It warns the user about invalid entries. You’ve coded it
to be bulletproof. Nothing invalid gets into the database.

The project manager wonders, "Can we warn them of invalid entries before they
hit submit? An ounce of prevention is worth a pound of cure. Also, what happens
if they submit as their connection drops? They’ll probably get a browser network
error page and worry they lost all their typing."

<figure>
  <img src={googleChromeDinosaur} width="61%" height="auto" alt="Google Chrome's network error screen"/>
</figure>

"Oh, yeah, it’d be nice to handle those more elegantly!" you say. "But it’s too
late. I’d have to duplicate some of my code & tests on the client. That’s a
totally different language. And we weren’t prepared for the maintenance."

In this traditional web development, the client code is a secondary concern.
Therefore your user is a secondary concern.

This form is just a small example of how to achieve a nice UX. It goes without
saying that smartphone use is on the rise. So you know the modern, robust
experience users expect. Think offline sync, drag ’n drop, and transitions
giving a spatial sense where the user is.

What can we learn from, “Design is how it works?"

In the earlier example, the server backed the developer into a UX corner. I
argue it wouldn't have happened if the codebase was more client oriented.

Ember.js lets you develop web apps that run in the same place that clients see
and interact with them. If you build things the framework's way, you get some
compelling UX features for free.

- Data binding, so users see changes immediately
- Deep linking, so users can share bookmarks and pick up where they left off
- AJAX hooks, so you’re never encouraged to fully reload the user's browser

The 5 talks above go on to show how easy Ember.js makes it to add more.

- Skeleton UI (moving beyond loading spinners)
- Growls
- Drag ’n drop (encapsulating the complex HTML drag event API)
- Polymer components
- Concurrent editing
- Offline editing
- Undo/redo
- Animations between routes

Before you say there’s a jQuery plugin for several of these, not so fast. Does
it play with your existing app architecture? Its data flow? Is it maintainable?
Is it isolated as you want it to be? Is it easily removed? Or is it glued on?
Have you ever been really happy with `n` extra jQuery plugins on your page?

The wonders of maintainability with an opinionated framework like Ember.js are
worth a separate article. As app developers get more serious about maintainable
code, which previously only existed on the server, let maintainability not trade
for UX. The more code you move into a thick client, the more any programmer in
your codebase can focus on user concerns.

Elsewhere on this blog, I bill myself as a full-stack programmer. For the last
couple years, I’ve been working more exclusively on the front-end. Thanks to a
thick-client framework like Ember.js, I have the same, maintainable programming
power I had on the server. Only now my code lives in a place where I can always
be delighting users.
