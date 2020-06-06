---
title: 'Compressing images'
---

As this site is now hosted on Github Pages, there is a limit of 1 GB of total storage size. Realistically it would take a looong time for me to reach that limit, but it's good practice to compress your stuff properly anyway. Fetching an 800kb image as part of the site load is annoying.

I am using these to compress images:

- [ffmpeg](https://ffmpeg.org/) for JPG compression
- [pngquant](https://pngquant.org/) for downsizing PNG color palettes of screencaps
- [ImageMagick](https://imagemagick.org/) for miscellaneous image tasks

[This article on Gitlab](https://about.gitlab.com/blog/2020/01/30/simple-trick-for-smaller-screenshots/) is an interesting read.

I wrote a short script to automate compressing images for an article, but it still needs some work. I used counting colors as means of detecting graphics that will compress well using the color palette downsizing, but it doesn't seem to work well in all cases.

<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2FPawelAdamczuk%2Fscripts%2Fblob%2Fmaster%2Fcompress-images.sh&style=github&showBorder=on&showLineNumbers=on&showFileMeta=on"></script>

A couple of notes:

- `shopt -s nullglob` makes bash not freak out when it doesn't find any files matching given glob pattern
- using `zopflipng` gives ~10% storage saving tops, which on this scale is not worth spending several seconds to compress each image
- `scale=w=min(iw\,800):h=-2` downcales image to 800 width if it's wider and preserves aspect ratio by downscaling height but making it an even number

![Do I?](/assetss/2020-06-06-compressing-images/1.jpg)
