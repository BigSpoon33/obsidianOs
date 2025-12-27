---
title: "Generative Ancient Cartography"
source: "https://www.reddit.com/r/creativecoding/comments/1p6ldgi/generative_ancient_cartography/"
author:
  - "[[benstrauss]]"
published: 2025-11-25
created: 2025-12-26
description:
tags:
  - "clippings"
---
I’ve always loved the look of old hand drawn maps, so I tried building a generative system that creates its own little ancient cities from scratch. The algorithm lays out city blocks, streets, rivers, courtyards, temples, palaces, plazas, parks, and even bridges, all in this dusty parchment aesthetic.

Each map fully generates itself with a left-to-right reveal. Buildings “pop” into place with elastic easing, the river draws itself as an ink stroke, the cobblestone streets pave in, and the whole thing finishes with a layer of weathering and ink stains. It feels like watching an old cartographer sketch a city into existence.

You can regenerate as many versions as you want since everything is deterministic but driven by randomness.

**Tech bits:**

• Procedural block subdivision system that determines zones and building types

• Organic river generation with meandering, forking, and variable widths

• Cobblestone street rendering using a repeated canvas texture

• Pop-in animation per block with seeded randomness

• Hand-drawn wobble effect on temples, palaces, bridges, and outlines

• Parchment, paper grain, cobble, and stain textures generated at runtime

• Full deterministic regeneration on click

• Built this inside **Juno**, which has been great for creative coding lately. The live preview alongside a full editor makes iterating on stuff like this way smoother than the default p5.js editor setup.

**Live demo in comments.**

---

## Comments

> **benstrauss** • [6 points](https://reddit.com/r/creativecoding/comments/1p6ldgi/comment/nqr30pg/) •
> 
> Live demo: [https://juno.transient.xyz/recipe/e8ef6ca8-2604-415b-a8ed-f8e2feb7728b/preview](https://juno.transient.xyz/recipe/e8ef6ca8-2604-415b-a8ed-f8e2feb7728b/preview)
> 
> > **nuflark** • [4 points](https://reddit.com/r/creativecoding/comments/1p6ldgi/comment/nqs8p7t/) •
> > 
> > Really nice!! This is so fun to refresh and see the new ones generate.
> > 
> > > **benstrauss** • [2 points](https://reddit.com/r/creativecoding/comments/1p6ldgi/comment/nqtvynn/) •
> > > 
> > > Ya it is! Could probably add some more params for additional variety. Maybe I will

> **Resquid** • [2 points](https://reddit.com/r/creativecoding/comments/1p6ldgi/comment/nqt1yuk/) •
> 
> I love it!
> 
> > **benstrauss** • [1 points](https://reddit.com/r/creativecoding/comments/1p6ldgi/comment/nqtvwdc/) •
> > 
> > Thanks!
> > 
> > > **exclaim\_bot** • [1 points](https://reddit.com/r/creativecoding/comments/1p6ldgi/comment/nqtvxes/) •
> > > 
> > > > Thanks!
> > > 
> > > You're welcome!

> **inigid** • [1 points](https://reddit.com/r/creativecoding/comments/1p6ldgi/comment/nr3hru0/) •
> 
> This is so awesome. I was messing about making a game today that has cave systems, and I need to do the same thing.
> 
> Right now it is using perlin noise, but I like your river generation and then pave around method a lot better.
> 
> Really beautiful!
> 
> > **benstrauss** • [1 points](https://reddit.com/r/creativecoding/comments/1p6ldgi/comment/nr82pgy/) •
> > 
> > Thank you! Look forward to seeing your cave game maybe one day posted in this sub Reddit!

> **KennyVaden** • [1 points](https://reddit.com/r/creativecoding/comments/1p6ldgi/comment/nrt0ree/) •
> 
> Really cool idea! Might be a fun touch to also have the farms pop up and expand outward from the water, with a touch of randomization.