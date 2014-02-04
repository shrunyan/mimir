
# Mímir: [Pronunciation](http://www.forvo.com/word/m%C3%ADmir/)
_Markdown note taking web app_


## Tech Stack:

- [Backbone.js](http://backbonejs.org) This is the underlining framework which organizes all the client side code for this application.
- [Underscore.js](http://underscorejs.org/) Backbone has a hard dependency on Underscorejs
- [Zepto.js](http://zeptojs.com/) This library is used for DOM access. Like jQuery but a lot lighter.
- [Dropbox](https://www.dropbox.com/developers) Used for saving notes as files and giving cross device access.

## Setup

1. Install dev dependencies

	$ npm install

2. Build application

	$ grunt

3. Server `/build` directory



## Coming Features:

- Load lasted edited
- Dropbox saving/loading
- Markdown Viewer
- ~~If note list title noted changed, replace original title~~
- HTML export?
- PDF export?
- ~~create apple mobile web app capable~~
- ~~https://github.com/jakiestfu/Snap.js~~
- ~~http://maker.github.io/ratchet/~~



## Misc Resources to look at
- https://github.com/bergie/hallo
- https://github.com/evilstreak/markdown-js
- https://github.com/chjj/marked/
- https://github.com/arturadib/strapdown
- http://www.html5rocks.com/en/features/storage
- http://headjs.com/
- https://github.com/tholman/zenpen


### DataBinding

- http://rivetsjs.com/
- https://github.com/theironcook/Backbone.ModelBinder



## Relase Notes/Versions

### v 0.2.0
- Adding [Grunt](http://gruntjs.com) build system

### v 0.1.0
- Initial build.



## The MIT License (MIT)

Copyright (c) 2013 Stuart Runyan

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
