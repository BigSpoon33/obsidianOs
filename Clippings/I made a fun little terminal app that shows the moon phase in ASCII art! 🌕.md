---
title: "I made a fun little terminal app that shows the moon phase in ASCII art! 🌕"
source: "https://www.reddit.com/r/commandline/comments/1pi0kt5/i_made_a_fun_little_terminal_app_that_shows_the/"
author:
  - "[[rockymarine]]"
published: 2025-12-08
created: 2025-12-26
description:
tags:
  - "clippings"
---
Just wanted to share ascii\_moon, a TUI app I built in Rust. It's basically a moon phase viewer for your terminal, inspired by [https://asciimoon.com](https://asciimoon.com/). You can check different dates, toggle lunar features.

Repo: [https://github.com/rockydd/ascii\_moon](https://github.com/rockydd/ascii_moon)

## Usage

### Interactive Mode

Run the application without arguments to launch the full-screen interactive TUI:

ascii\_moon
- the phase changes in real time
- you can use left/right to go forward or backward by one day
- `n` to go back to today

### Non-Interactive (Print) Mode

For scripting or MOTD (Message of the Day) use, you can print the moon directly to the console. Use the `--lines` flag to specify the height of the output.

ascii\_moon --lines 20

---

## Comments

> **TylerDurden0118** • [11 points](https://reddit.com/r/commandline/comments/1pi0kt5/comment/nt372zp/) •
> 
> If may I ask, from where do you get the lunar surface data?
> 
> > **rockymarine** • [17 points](https://reddit.com/r/commandline/comments/1pi0kt5/comment/nt4vmo6/) •
> > 
> > Hey, thanks for asking!
> > 
> > To answer it directly, the lunar surface is a large string of ASCII art that's hardcoded right into the program.
> > 
> > But the more interesting part is the origin of that string! The credit for that goes to the [https://github.com/Sean-93/asciimoon](https://github.com/Sean-93/asciimoon) project, which was a huge inspiration for my TUI version. They generated the ASCII art from a real NASA photo in 1992 (specifically, PIA00405 from the Galileo spacecraft) using an online converter.
> > 
> > I adapted their work for this terminal application.
> > 
> > **candidateforhumanity** • [4 points](https://reddit.com/r/commandline/comments/1pi0kt5/comment/nt84p06/) •
> > 
> > The moon always faces the earth with the same side, with negligible deviation (due to tidal lock, its rotation and translation periods are equal). The surface data necessary is a still photo.
> > 
> > > **TylerDurden0118** • [1 points](https://reddit.com/r/commandline/comments/1pi0kt5/comment/nt87gvb/) •
> > > 
> > > Yeah I m aware of it so you can't rotate the moon in this program?
> > > 
> > > > **rockymarine** • [2 points](https://reddit.com/r/commandline/comments/1pi0kt5/comment/nt9atso/) •
> > > > 
> > > > Hmm, maybe I can try to rotate it in the future. Thanks for the idea.

> **Liz\_Linux** • [9 points](https://reddit.com/r/commandline/comments/1pi0kt5/comment/nt3bhvo/) •
> 
> What the fuck? That is so cool, I love it!! 💕

> **MrGlacier** • [8 points](https://reddit.com/r/commandline/comments/1pi0kt5/comment/nt3yp3v/) •
> 
> Made with rust ❤️
> 
> > **skank-blanket** • [1 points](https://reddit.com/r/commandline/comments/1pi0kt5/comment/ntegxpx/) •
> > 
> > Fancy! I like your style!

> **betazed** • [4 points](https://reddit.com/r/commandline/comments/1pi0kt5/comment/nt5i07y/) •
> 
> This is really cool! It looks like a modernized version of [Phoon](https://www.acme.com/software/phoon/). One of Phoon's cool features is varying the size of the output in lines which makes it great for MOTD-type applications. Any thoughts about implementing something like that?
> 
> > **rockymarine** • [2 points](https://reddit.com/r/commandline/comments/1pi0kt5/comment/nt5ka82/) •
> > 
> > Cool, thanks for sharing this! Btw, my ascii\_moon is responsive to the terminal window size. So you mean to have an argument to specify the size? That’s a good idea. I will do it! Thanks for the suggestion!
> > 
> > **rockymarine** • [2 points](https://reddit.com/r/commandline/comments/1pi0kt5/comment/nt9bev9/) •
> > 
> > I have added an argument to specify the lines. It will then print the moon and quit. Ok to be used as MOTD.
> > 
> > ascii\_moon —lines 15
> > 
> > 🌒
> > 
> > **rockymarine** • [1 points](https://reddit.com/r/commandline/comments/1pi0kt5/comment/nt5nxc3/) •
> > 
> > I will add an argument to specify the size. And another argument to make it run as a MOTD instead of TUI.

> **AutoModerator** • [3 points](https://reddit.com/r/commandline/comments/1pi0kt5/comment/nt2n4x2/) •
> 
> **User**: [rockymarine](https://reddit.com/user/rockymarine), **Flair**: `Terminal User Interface`, [**Post Media Link**](https://i.redd.it/54amnwx2i46g1.gif), **Title**: [I made a fun little terminal app that shows the moon phase in ASCII art! 🌕](https://www.reddit.com/r/commandline/comments/1pi0kt5/i_made_a_fun_little_terminal_app_that_shows_the/)
> 
> Just wanted to share ascii\_moon, a TUI app I built in Rust. It's basically a moon phase viewer for your terminal, inspired by asciimoon.com. You can check different dates, toggle lunar features.
> 
> Repo: [https://github.com/rockydd/ascii\_moon](https://github.com/rockydd/ascii_moon) ([https://github.com/rockydd/ascii\_moon](https://github.com/rockydd/ascii_moon))
> 
> > Install (macOS): `sh brew tap rockydd/tap brew install ascii_moon`
> 
> *I am a bot, and this action was performed automatically. Please* [*contact the moderators of this subreddit*](https://www.reddit.com/message/compose/?to=/r/commandline) *if you have any questions or concerns.*

> **BackgroundEbb8633** • [3 points](https://reddit.com/r/commandline/comments/1pi0kt5/comment/nt5s6yv/) •
> 
> This is a phenomenal piece of work. You should be proud 😍
> 
> > **rockymarine** • [1 points](https://reddit.com/r/commandline/comments/1pi0kt5/comment/nt6293b/) •
> > 
> > Wow, thank you so much for the kind words! :)
> > 
> > **rockymarine** • [1 points](https://reddit.com/r/commandline/comments/1pi0kt5/comment/nt9b7uz/) •
> > 
> > I have added a argument to specify the lines. It will print the moon and quit. Ok to be used as MOTD.🌒
> > 
> > ascii\_moon —lines 15

> **Harvine77** • [2 points](https://reddit.com/r/commandline/comments/1pi0kt5/comment/ntbn358/) •
> 
> Hey glad you were inspired by my site!  Your version looks great
> 
> > **rockymarine** • [1 points](https://reddit.com/r/commandline/comments/1pi0kt5/comment/ntc4gpk/) •
> > 
> > Haha! I didn’t expect to meet you here! Thank you for your excellent work! 🤝

> **benhaube** • [2 points](https://reddit.com/r/commandline/comments/1pi0kt5/comment/ntgvo7d/) •
> 
> Neat! I built from source on Linux. You might want to add the command `sudo cp ascii_moon /usr/local/bin/` so you can run it from any directory like any other command.

> **JohnnyBillz** • [2 points](https://reddit.com/r/commandline/comments/1pi0kt5/comment/nvj87s1/) •
> 
> I love this! I’d like to do this for local tides.

> **meursault\_chillin** • [1 points](https://reddit.com/r/commandline/comments/1pi0kt5/comment/nt55dtc/) •
> 
> Works on Ubuntu's terminal?
> 
> > **rockymarine** • [2 points](https://reddit.com/r/commandline/comments/1pi0kt5/comment/nt5du9f/) •
> > 
> > I did build a Linux version. But looks like it’s not working. I will fix it and update you. Thanks for asking!
> > 
> > **rockymarine** • [2 points](https://reddit.com/r/commandline/comments/1pi0kt5/comment/nt5hxpc/) •
> > 
> > Actually, It should work if your Ubuntu is new with glibc 2.39. You can give it a try: [https://github.com/rockydd/ascii\_moon/releases](https://github.com/rockydd/ascii_moon/releases)
> > 
> > Or you can build it from source
> > 
> > git clone [https://github.com/rockydd/ascii\_moon.git](https://github.com/rockydd/ascii_moon.git) cd ascii\_moon cargo build --release ./target/release/ascii\_moon

> **jakecoolguy** • [1 points](https://reddit.com/r/commandline/comments/1pi0kt5/comment/ntc4gvl/) •
> 
> What would be the best way to set this as the welcome screen when starting your terminal?
> 
> I thought of adding it to the end of the .bashrc or .zshrc, but then you wouldn't have the prompt immediately
> 
> > **rockymarine** • [1 points](https://reddit.com/r/commandline/comments/1pi0kt5/comment/ntct2di/) •
> > 
> > Did you try the argument —lines 20? It will print the moon and quit. That’s just for MOTD.
> > 
> > > **jakecoolguy** • [1 points](https://reddit.com/r/commandline/comments/1pi0kt5/comment/ntulq8r/) •
> > > 
> > > Can’t believe I didn’t read that part looking back at the post body 😆