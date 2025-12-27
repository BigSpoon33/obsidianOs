---
title: "Nomad MK2: Open Source Pocket-sized offline media server"
source: "https://www.reddit.com/r/selfhosted/comments/1p92gdc/nomad_mk2_open_source_pocketsized_offline_media/"
author:
  - "[[JcorpTech]]"
published: 2025-11-28
created: 2025-12-26
description:
tags:
  - "clippings"
---
**Howdy!**

I’m excited to officially announce the **Nomad MK2**, a pocket-sized offline media server built on the ESP32-S3. It’s fully self-hosted and offline, serving **Movies, Shows, Books, Music, Images, and Files** over its own Wi-Fi hotspot, no internet required.

**What’s new in the MK2:**

- Faster, more robust media indexing
- Resume playback across sessions
- Dark mode for the web interface
- Admin console for real-time control and monitoring
- Improved multi-user streaming and reliability

**Open Source & Self-Hosted:**  
Nomad is fully open-source. Every part of its interface and server code is yours to inspect, tweak, and improve. I’m not a professional developer, so suggestions and contributions are always welcome!

**Coming soon: Gallion**  
I’m also working on the next-gen version, **Gallion**, which will run in Docker/node.js and add features like:

- Game emulation
- Comic book and Webtoon reading
- ZIM archive support
- Even more powerful and unique self-hosted features that can run on a variety of devices, including Raspberry Pi

**Links:**

- GitHub: [https://github.com/Jstudner/jcorp-nomad](https://github.com/Jstudner/jcorp-nomad)
- Instructables guide: [https://www.instructables.com/Jcorp-Nomad-Mini-WIFI-Media-Server/](https://www.instructables.com/Jcorp-Nomad-Mini-WIFI-Media-Server/)
- Ko-Fi: [https://ko-fi.com/jcorptech](https://ko-fi.com/jcorptech)
- Pre-Builts (but seriously, DIY is recommended 😉): [https://nomad.jcorptech.net/](https://nomad.jcorptech.net/)

Whether you’re looking for a fun DIY project, a portable media server, or a fully offline self-hosted solution, **Nomad MK2** has you covered.

I’d love to hear your feedback, feature suggestions, or just see who else is into tiny self-hosted setups like this! Feel Free to ask any questions you may have!

![r/selfhosted - Nomad MK2: Open Source Pocket-sized offline media server](https://preview.redd.it/nomad-mk2-open-source-pocket-sized-offline-media-server-v0-l1k24v33k14g1.png?width=640&crop=smart&auto=webp&s=461d30ea7ef02c788a6f5f9d9b5a8dac37efd11e)

---

## Comments

> **\[deleted\]** • [0 points](https://reddit.com/) •
> 
> The trick I am employing is to rencode file before hand. I am working on software kinda like radarr for doing this automaticly, but for now files can be rencoded to fit. it depends on your use case though. The main reason gallion is even a thing though is just so I can get rid of the 4gb support, originaly physical device size was my main goal, but now that its stable I am working on more capable versions. Also keep in mind this thing cant even dream of doing transcodes, it relies on compatible files being handled by the browser. Not perfect for everybody but its nice to have when traveling.
> 
> > **JcorpTech** • [20 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nr9m761/) •
> > 
> > The trick I am employing is to rencode file before hand. I am working on software kinda like radarr for doing this automaticly, but for now files can be rencoded to fit. it depends on your use case though. The main reason gallion is even a thing though is just so I can get rid of the 4gb support, originaly physical device size was my main goal, but now that its stable I am working on more capable versions. Also keep in mind this thing cant even dream of doing transcodes, it relies on compatible files being handled by the browser. Not perfect for everybody but its nice to have when traveling.
> > 
> > > **tbird951** • [14 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nra4t68/) •
> > > 
> > > Look into tdarr. I have a similar travel streaming box running jellyifn. I pick media before hand and drop into a folder on my NAS. Tdarr converts compresses etc and then right before trip i copy the output folder to the portable.
> > > 
> > > > **JcorpTech** • [1 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nrad4v1/) •
> > > > 
> > > > oh that would be sick, I already use a few of the arr softwares, but didnt realize there was one specificly for that, I will have to check it out, been using a handbrake cli script lol

> **MaStr83** • [59 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nr9dd77/) •
> 
> Ah, Next piratebox clone
> 
> > **JcorpTech** • [39 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nr9duco/) •
> > 
> > Yea pretty much lol, found out about that when working on mk1. Even adding a chat page to gallion haha.
> > 
> > > **MaStr83** • [\-65 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nr9j779/) •
> > > 
> > > Give credits :) .Unfortunately, I took the webpage down a few weeks ago
> > > 
> > > > **Major\_Kyle** • [3 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nrkdvat/) •
> > > > 
> > > > The fuck do you mean?
> > > > 
> > > > > **MaStr83** • [4 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nrkk0w4/) •
> > > > > 
> > > > > I only meant , that it would be nice to add to the project page of Nomad: this device is like the former piratebox or „follows the the similar idea of..“- that could help to find people searching for piratebox (in memory of that project) this opportunity.
> > > > > 
> > > > > When I shut the door of the piratebox project, I tried to create lists of alternatives, but the feedback was kind of lacking. Now, I unsubscribed piratebox.cc a few weeks ago and can’t add a notice on the website anymore.
> > > > > 
> > > > > Nothing big, nothing else. I understand that the most users misunderstood my comment and downvoted it.
> > > > > 
> > > > > > **Dry\_Regret7094** • [1 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/ns79obm/) •
> > > > > > 
> > > > > > > I understand that the most users misunderstood my comment and downvoted it.
> > > > > > 
> > > > > > No, there wasn't any misunderstanding.
> > > > > > 
> > > > > > > Give credits.
> > > > > > 
> > > > > > This was very clear.

> **cowcorner18** • [8 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nr9dyjt/) •
> 
> What can the maximum size of my movie be?
> 
> > **JcorpTech** • [17 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nr9eez4/) •
> > 
> > Depends a lot on the encoding, It can handle 2 streams of 1080p 30fps as mp4 without issue as is though. The main restraint is that being ESP32 its limited to fat32 SD card formting, so 4GB max size. I have an encoding guide for getting files to work optimaly though. (also Gallion will just fix this with 4k support and no fat32 limitations)
> > 
> > > **didnt\_readit** • [2 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/ns1uxsn/) •
> > > 
> > > The ESP32 can definitely support exFAT its just not enabled by default.
> > > 
> > > I found this about enabling it if you’re using IDF:
> > > 
> > > “exFAT is supported in IDF through FatFS library, but the support is disabled by default. You can try changing #define FF\_FS\_EXFAT 0 in ffconf.h from 0 to 1, and then rebuild the application."
> > > 
> > > Or if you’re using the Arduino libraries, look up the SdFat-ESP32 library.
> > > 
> > > > **JcorpTech** • [1 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/ns866jq/) •
> > > > 
> > > > To keep it simple I wanted to stick to Arduino IDE (makes the tutorial way nicer for getting people setup), however I never could get the exfat setting to work, even with the long file names and the other requirements for that. My plan now is to try sdfat, as it should work, I have tried in the past without luck but it would be huge to have purely for the ease of not having to format cards.

> **ValuableHelicopter35** • [7 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nr9trrc/) •
> 
> So everything runs off the USB? This is interesting but the 2gb limit sucks. Good work tho. This is interesting.
> 
> > **JcorpTech** • [7 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nr9uz9n/) •
> > 
> > Thanks for checking it out! In my use I have been able to get most standard things to work within the 4gb confines, but that being said I am still working on the chonked version to support people who need 4k and all the fancy bits, keep an eye out, should have an early version up soon!
> > 
> > > **ValuableHelicopter35** • [6 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nr9w38l/) •
> > > 
> > > Autocorrect did me in. I was talking about the 2tb Max storage limit. The 4gb file size is fine for me. I don't need super high quality video for the most part as I'm okay with 1080 unless it's vr then I like 4k.
> > > 
> > > > **JcorpTech** • [3 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nr9wi7p/) •
> > > > 
> > > > AH! yes that is a tricky one, Gallion is the big one, its mostly software (will run in docker) but I am developing it on an orange pi RV2, which has two nvme slots, aswell as full speed usb, so that should give you as much storage as you could ever want (also can connect to like networked storage too). As I said, keep an eye out I am excited to get it up since so many people are interested.

> **Fantastic\_Peanut\_764** • [26 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nr9et2p/) •
> 
> but why not just storing the files and playing with desktop usual apps?
> 
> anyways, congrats! :)
> 
> > **JcorpTech** • [64 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nr9f5pq/) •
> > 
> > The main apeal is that this is tiny and works wirelessly. You can have it in the car and have 8 people on 8 phones/laptops/tablets watching and doing different stuff, without needing wifi or any downloads. Just makes life a lil easier.
> > 
> > > **IMasterCheeksI** • [12 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nr9swrx/) •
> > > 
> > > That’s dope
> > > 
> > > **nobodyisfreakinghome** • [7 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nra2hx5/) •
> > > 
> > > I use a nanopi and glinet router for travel. May have to look into this.
> > > 
> > > > **JcorpTech** • [4 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nra2zim/) •
> > > > 
> > > > let me know how it goes! its not perfect, but unbelivably portable lol.

> **RokeetStonks** • [10 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nr9tkvg/) •
> 
> This is one the the best projects i have used in a long time.
> 
> I have set up 4 of them on my home. My kids have thier own private ( very low cost, even lower powered ) media servers. It gives a great interface for them to use. Each one has content tailored just to them. They are all portable obviously and device agnostic which is great!
> 
> Im actually working on cross comparability on several esp boards to bring costs down and im pretty close to working out how to get a standard hdd to work with them.
> 
> Just dont have alot of time these days. I will get there though.
> 
> Great to see V2 is out! I will have to try and update one of my boards with it.
> 
> Cant upvote enough.
> 
> Also wondering if it would be possible to tether them? So like two in range could share information.
> 
> > **JcorpTech** • [3 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nr9vykx/) •
> > 
> > Glad to hear its working out so well for you! Really awesome use! I love hearing from yall about it doing its job lmao! Keep me posted on the compatibility, I have been trying to get a headless version that is super super minimal so I can have it for a larger veriety of boards, but it has certainly been tricky. It would be crazy cool if you could get a HDD to work with them, I am not sure exactly what you have tried thus far but if you open an issue on github I am happy to take a peak and offer what insight I can. As far as tethering goes I realy hadnt even considered that anyone would use more than one, I will definalty take a crack at it, should not only be doable but in theory quite easy since each device can handle its own index, and stream between them so you only need to connect to one. Ill keep you posted if I have any luck there!
> > 
> > Thank you for the support!!!
> > 
> > > **RokeetStonks** • [4 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nraj250/) •
> > > 
> > > No probs man. Its such a great project.
> > > 
> > > So with the HDD I'm taking an analog hardware approach. Basically daisy chaining 3 adaptors to get the esp to treat the hdd as an sd card.
> > > 
> > > So i have a mico sd male to micro sd male cable. From there i have a micro sd to usb C female, and lastly standard usb c hdd enclosure with a usb c male to male with external power support. Thr esp sees the drive but only sometimes. I think it has to do with the external power im using. I am continuing to test. I had the cables laying around already, so not sure of cost if i needed to buy them all again. Might be easier to code a method in but my pin configuration on my esp board is a little hard to wrap my head around.
> > > 
> > > > **JcorpTech** • [2 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nralx2h/) •
> > > > 
> > > > dang thats a really neat way to do it, I was going to say you could likely use the USB OTG mode to have it read from the host device its plugged into, but using the SD card slot would be nice. its likely the drive needs to be fat32 formated (insane but doable), or that you need a different power method, as the drive proably pulls more power than nomad lol. Either way very cool stuff!

> **bubblegumpuma** • [5 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nraec8d/) •
> 
> Watching this project develop has been super cool. It's the kind of silly idea I'll think of while looking at the specs of modern microcontrollers, but never actually get the drive to implement.

> **Academic\_Mix\_5477** • [4 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nr9oiot/) •
> 
> Why do the docs say they recommend up to a 64 GB FAT32 micro SD card, can I not go past that?  Great project by the way
> 
> > **JcorpTech** • [3 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nr9q84f/) •
> > 
> > Oh... yea they aint suposed to say that lmao, It should work with up to 2TB, but ive tested up to 512gb. If you do get a 2tb card let me know, happy to make any changes if you hit bugs (im in college full time and those things are pricy so uhhhh sorry about that lol, works on paper as all good things do).
> > 
> > **redundant78** • [4 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nr9smuq/) •
> > 
> > You can definitely go bigger than 64GB, but FAT32 has a 4GB single file size limit - the recommendation is probably for compatibility since exFAT might cause issues with the ESP32 filesystem libraries.
> > 
> > **JcorpTech** • [1 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nr9qkzi/) •
> > 
> > Just checked it, what site said "up to"? Instructibles has at least.
> > 
> > > **Academic\_Mix\_5477** • [2 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nra2fjg/) •
> > > 
> > > In the Readme, hardware requirements, it technically says recommended but I was curious why it’s not recommended to go past 64gb
> > > 
> > > > **JcorpTech** • [2 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nra2v2s/) •
> > > > 
> > > > oh yea I gotcha, its just a good starting point. some people only want a few items and could get away with less, but 64gb is generaly where you can have like 50 movies and a few shows just fine, its a decent size is all.

> **TikTak9k1** • [3 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nr9rkoq/) •
> 
> Good thing I was looking at the github because I figured that the install process seemed undoable for average joe. But it looks like its pretty straight forward and cheap. I might give it a go just for fun, I also recently started transcoding my files anyway to stream from my share through vpn, but this is more preferable.
> 
> > **JcorpTech** • [3 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nr9tabc/) •
> > 
> > Yea I might need to make it a bit more clear how easy this is suposed to be. No soldering or anything was a limitation I set at the start. That being said keep me posted, I am allways happy to answer any questions you have while setting it up! Enjoy!
> > 
> > > **TikTak9k1** • [2 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nra0gtx/) •
> > > 
> > > Thanks :) I mostly got interested because I didn't know ESP32s could be used for this type of thing. It's a really cool showcase, so I just ordered one to check it out.
> > > 
> > > > **JcorpTech** • [1 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nra114x/) •
> > > > 
> > > > Enjoy! I hope you can get tons of use out of it!

> **mrjfilippo** • [3 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nrb8gjp/) •
> 
> Keep posting updates about the project, super neat. Looking forward to the next version.
> 
> > **JcorpTech** • [1 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nrb8ktt/) •
> > 
> > I will!! Love working on this thing, and love the support I get from yall!

> **AZ07GSXR** • [3 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nri4nqt/) •
> 
> Looking forward to the raspberry pi version 💯 Need 4k without limits

> **Open\_Resolution\_1969** • [2 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nr9uq1z/) •
> 
> can you run some sort of a torrent client on it?
> 
> > **JcorpTech** • [5 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nr9vbz0/) •
> > 
> > its not so much intended to connect to the internet, in this case you load it with media and it runs fully offline. the apeal is being able to take it traveling and not have to worry about pre-loading media onto several devices. makes sharing it easier.

> **Legitimate-Pumpkin** • [2 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nr9zeyp/) •
> 
> I don’t grasp the full extent of what it is but sounds so cool! Thanks

> **Stooovie** • [2 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nra58cm/) •
> 
> Amazing, immediately ordered the board. Looking forward to trying it out.
> 
> Do I power it from a powerbank or...?
> 
> > **JcorpTech** • [2 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nradcjh/) •
> > 
> > Enjoy! hope you can get some good use out of it. I carry a battery for it, just a small one I got for like $20 on amazon ages ago, but you could also just get like a usbc to usba cable and run it off your phone, its 5v so pretty much anything can power it. Let me know if you have any issues with setup!

> **Balgerion** • [2 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nraflvn/) •
> 
> Love you !

> **bazfum** • [2 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nrcda61/) •
> 
> Needs to support the LillyGo T-Dongle, that’s the perfect form factor already.
> 
> > **JcorpTech** • [2 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nrcz5wa/) •
> > 
> > I spent a long time trying, and at some point I'll make a super light weight 1 stream version, but the dongle just didn't have enough ram, actually got that before I tried the waveshare board.
> > 
> > It's my goal to make like a "lite" version that will have better luck running on other hardware, sadly you kinda need the top specs of the esp32s3 world for it ATM lol.

> **Dossi96** • [2 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nrevwis/) •
> 
> I am quiet impressed that an esp32 can handle any sort of media streaming meanwhile I had to stream json responses on an esp8266 because they were exceeding the memory limit. Did not know the performance difference was soo big 😅
> 
> > **JcorpTech** • [2 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nrey32h/) •
> > 
> > the S3 is actualy quite juiced, I still have to do a bunch of goofy things (clears the memory so damn often) but its just barely functional. I had tried on several chips before this to get similar results, but its definatly not meant for high throughput lol. There are a few varients out there, but in general the board I am using for this is about as high spec as you can get for the S3, anything less than 16mb of ram and its just not gonna work. At some point in the future I do plan to take another crack at making a lite version that supports other boards though. keep an eye out and thanks for checking out my project!
> > 
> > > **Dossi96** • [2 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nrgb37h/) •
> > > 
> > > Do you have a link for the particular board you used? Would like to check that out ✌️
> > > 
> > > > **JcorpTech** • [1 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nrgeywn/) •
> > > > 
> > > > The exact link is on GitHub and the instructible, but this is the board: [https://www.waveshare.com/wiki/ESP32-S3-LCD-1.47](https://www.waveshare.com/wiki/ESP32-S3-LCD-1.47)
> > > > 
> > > > It's got some quirks, but overall about as powerful as you can get the s3

> **FrenchTaint** • [2 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nrs3tpz/) •
> 
> Fat32 is the killer here for me. Otherwise, I'd be 100% onboard.
> 
> > **JcorpTech** • [1 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nrs4kfq/) •
> > 
> > Technicaly you can get it to work, but even if you did the veiwing experiance isnt going to be great (low network throughput), thats the main reason I havent cared too much for it. that being said check out Gallion, its a work in progress, but basicly just Nomad with 4k support and exfat. Gonna be a bit before I have a full release, but should run on any old raspberry pi or similar aswell.
> > 
> > Thanks for checking out the project!
> > 
> > > **FrenchTaint** • [2 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nrsp53v/) •
> > > 
> > > Not really - a 2 hour DVD is 5.5GB. Not asking for 20GB.
> > > 
> > > > **JcorpTech** • [1 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nrspi02/) •
> > > > 
> > > > depends on the encoding. as I go over in the instructible I have a encoding guide that will get anything on here. Quality options aswell (you can get 1080p30fps, dont recomend it but its doable). that being said I still do plan to get gallion working so you can just drag and drop your existing files, no rencoding needed.
> > > > 
> > > > > **FrenchTaint** • [2 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nrsqllx/) •
> > > > > 
> > > > > Yeah. I’m going to rip discs to MKV and change the container to MP4 without re-encoding with FFMPEG.
> > > > > 
> > > > > > **JcorpTech** • [1 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nrsr5p4/) •
> > > > > > 
> > > > > > fair enough. at some point soon I am going to release a manager app for nomad. I have the script done, but I am working on a webui for it, idea is to have it work like tadarr and rencode files in the background making copys and letting you pick items from your library, then encode, fetch the images, format everything all that. but either way best of luck with your media project!

> **Character\_End\_9178** • [3 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nr9j4jb/) •
> 
> Amazing, great to keep in a backpack and take with you to places with no internet.
> 
> > **JcorpTech** • [2 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nr9jwjd/) •
> > 
> > Me and my friends have been using one for camping lol, literaly what this started as.

> **TonyCR1975** • [1 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nr9pgoq/) •
> 
> Silicon Valley reinvented the bus.

> **newbaba** • [1 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nr9klw3/) •
> 
> Would that work as an NAS with any changes? 
> 
> > **JcorpTech** • [3 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nr9kx17/) •
> > 
> > It has a filebrowser in the admin panel, that lets you upload, download, and edit files on the SD card, so technicaly speaking yes it will do that, but its definatly not the fastest thing in the world lol. You could certainly modify it to connect to a network, but again the file transfer speed is gonna suck for most uses.
> > 
> > > **newbaba** • [2 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nrbbq0v/) •
> > > 
> > > Speed, yes. 
> > > 
> > > I suspect it is comparable to internet speeds where I live 😭
> > > 
> > > > **JcorpTech** • [1 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nrbcj5h/) •
> > > > 
> > > > well, fair enough then. if you build one keep me posted, if you have any good ideas for improving it in that use case I would be happy to add them!
> > > > 
> > > > > **newbaba** • [2 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nrbd2w4/) •
> > > > > 
> > > > > So, I could use a faster USB storage and hope 5-10 Mbps?
> > > > > 
> > > > > Will update. 
> > > > > 
> > > > > > **JcorpTech** • [1 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nrbe8nq/) •
> > > > > > 
> > > > > > yea sadly USB on the esp32 is pretty slow in itself, I recomend just pulling the SD card so you can get full USB 2.0 speeds, the device itself serves media fast if you can download it first to the SD card. its good for the movies since it just needs to send a steady stream of tiny chunks.

> **kY2iB3yH0mN8wI2h** • [\-6 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nr9uy1l/) •
> 
> So it’s a dumb usb stick with WiFi? Any device it will connect to will be superior

> **\[deleted\]** • [\-22 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nr9cfii/) •
> 
> Honestly would be great, I am pretty sure most phones have everything you would need to host media like this, Im not a huge AI guy, but you are more than welcome to take a crack at it. Either way would love to see it!
> 
> > **JcorpTech** • [8 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nr9e2vd/) •
> > 
> > Honestly would be great, I am pretty sure most phones have everything you would need to host media like this, Im not a huge AI guy, but you are more than welcome to take a crack at it. Either way would love to see it!
> > 
> > > **\[deleted\]** • [1 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nr9l651/) •
> > > 
> > > Should be fine, pretty much everything supports captive portal, and even if it doesnt you can just connect and go to the IP (though that way less cool lol)
> > > 
> > > > **JcorpTech** • [1 points](https://reddit.com/r/selfhosted/comments/1p92gdc/comment/nr9ljcr/) •
> > > > 
> > > > Should be fine, pretty much everything supports captive portal, and even if it doesnt you can just connect and go to the IP (though that way less cool lol)