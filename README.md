# Bitsify

Node.js based mp3 streaming service, and with a gorgeous minimal interface

![Bitsify](https://cdn.pbrd.co/images/GCDAq5r.png)

Can serve files in your music directory anywhere on your pc, over lan!!

## Setup

1) clone the repo `git clone https://github.com/praneetmehta/Bitsify.git`
2) run `npm install` to install the project dependencies,  and finally
3) create a folder named symlink in the public directory.

#### Now open routes/index.js and on line 3 modify testFolder variable to your music directory's absoulte path. That's it.
#### all done!!

run node app in the root directory of the app and open localhost:3000  (3000 is the default port used, you may change it if you want)on your browser.

and Stream songs over your network ;)

## Features
#### 1) Beautfiul minmal interface

![Beautiful minimal interface](https://cdn.pbrd.co/images/GCDyULP.png)

#### 2) Support for searching songs on the fly

![Search songs on the fly](https://cdn.pbrd.co/images/GCDBoDp.png)

#### 3) Support for fetching youtube videos for currently playing song in a draggable floating player.

![Floating youtube window support](https://cdn.pbrd.co/images/GCDCAB4.gif)

#### 4) Sharable Playlist Support

#### 5) Ultra responsive design.

## Future Plans
1) Create a mobile UI (something like a native android music player application)
2) Clean the code. Too much hardcoded segments right now.
3) Peer-to-peer streaming and sharing support
4) Much More...


The application is quiet responsive as i have used flexboxes everywhere.

mail me at praneet.mehta@gmail.com for any issues.
