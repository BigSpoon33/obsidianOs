---
title: "Thought I wasn't gonna use bases but I made some sorta useful tables on it :3"
source: "https://www.reddit.com/r/ObsidianMD/comments/1pd2n8z/thought_i_wasnt_gonna_use_bases_but_i_made_some/"
author:
  - "[[EN_R1]]"
published: 2025-12-03
created: 2025-12-26
description:
tags:
  - "clippings"
---
---

## Comments

> **EN\_R1** • [8 points](https://reddit.com/r/ObsidianMD/comments/1pd2n8z/comment/ns204ws/) •
> 
> The icons formula i made it like this:
> 
> if(file.path.contains("youtube"),image("ico\_youtube.png"),
> if(file.path.contains("Game Development"),image("ico\_godot.png"),
> if(file.path.contains("Programming Languages"),image("ico\_VSCode.png"),
> if(file.path.contains("20 - Main"),image("ico\_whiteboard.png"),
> if(file.path.contains("23 - Obsidian"),image("obsidian-icon.png"),
> if(file.path.contains("10-19"),image("elol.png"),
> if(file.path.contains("90-99"),image("ico\_plugin.png"),false
> )))))))
> 
> and the "Edited/Created" rows:
> 
> (now() - file.mtime) + " ago"
> 
> (now() - file.ctime) + " ago"
> 
> > **Several-Ad1237** • [2 points](https://reddit.com/r/ObsidianMD/comments/1pd2n8z/comment/ns2lf6k/) •
> > 
> > Thanks for the inspiration and formula! This is very useful ❤️
> > 
> > **lonelysoul7** • [1 points](https://reddit.com/r/ObsidianMD/comments/1pd2n8z/comment/ns3tq0b/) •
> > 
> > That's great! How wonderful it is — I was going to ask for icons formula, and here it is. Thank you!

> **TheKingofHellZoro** • [2 points](https://reddit.com/r/ObsidianMD/comments/1pd2n8z/comment/ns46fh8/) •
> 
> How'd you set up the hover mechanics?
> 
> > **EN\_R1** • [2 points](https://reddit.com/r/ObsidianMD/comments/1pd2n8z/comment/ns5hg72/) •
> > 
> > with a css snippet file
> > 
> > /\* row hover indicator color \*/
> > .bases-tr:hover .bases-td,
> > .bases-td:hover {
> >     background-color: rgba(200,101,10, 0.15);
> > }
> > /\* indicator to show editable cells \*/
> > /\* credits: https://stackoverflow.com/a/61913549 \*/
> > .bases-td .multi-select-container::before {
> >     content: "";
> >     position: absolute;
> > 
> >     inset: -10px;
> >     opacity: 0;
> > 
> >     pointer-events: none;
> >     z-index: -1;
> >     /\* thickness \*/
> >     --border-thickness: 3px;
> >     /\* color \*/
> >     --border-color: rgba(161, 161, 161, 0.514);
> >     /\* corner length \*/
> >     --corn: 10px;
> > 
> >     border: var(--border-thickness) solid transparent;
> >     background:
> >         conic-gradient(from 90deg at top var(--border-thickness) left var(--border-thickness), #0000 90deg, var(--border-color) 0) 0 0 / var(--corn) var(--corn) border-box no-repeat,
> >         conic-gradient(from 180deg at top var(--border-thickness) right var(--border-thickness), #0000 90deg, var(--border-color) 0) 100% 0 / var(--corn) var(--corn) border-box no-repeat,
> >         conic-gradient(from 0deg at bottom var(--border-thickness) left var(--border-thickness), #0000 90deg, var(--border-color) 0) 0 100% / var(--corn) var(--corn) border-box no-repeat,
> >         conic-gradient(from -90deg at bottom var(--border-thickness) right var(--border-thickness), #0000 90deg, var(--border-color) 0) 100% 100% / var(--corn) var(--corn) border-box no-repeat;
> > }
> > 
> > might not display properly depending on the theme youre using idk

> **Nshx-** • [1 points](https://reddit.com/r/ObsidianMD/comments/1pd2n8z/comment/ns5pekf/) •
> 
> wau....

> **Unygon** • [1 points](https://reddit.com/r/ObsidianMD/comments/1pd2n8z/comment/ntex4px/) •
> 
> I've been looking for something like this!!!! How are you able to get a preview of a video in your bases??
> 
> I'm trying to make a collection of locally uploaded videos in bases card view but have not been able to get bases to show anything
> 
> > **EN\_R1** • [1 points](https://reddit.com/r/ObsidianMD/comments/1pd2n8z/comment/ntqhmyx/) •
> > 
> > Those are gifs actually
> > 
> > if(file.ext.containsAny("png","jpg","gif"),
> > link(file,image(file)),
> > link(file,file.name))