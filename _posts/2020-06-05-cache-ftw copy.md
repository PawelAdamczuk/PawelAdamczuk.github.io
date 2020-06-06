---
title: 'Cache FTW'
---

Recently I was migrating my posts off a site hosted on Azure. I had barely started and the old site started suddenly returning 403s. It turned out the temorary subscription I had been using was disabled. For various reasons it would be a huge hassle to re-enable it right now. And, obviously, I had no proper backup of the site. I guess I had figured "if it's in the cloud, it probably won't get lost". Sure enough, you can't export App engine's data from Azure after its subscription has expired. I searched through my external hard drive and my other laptop and didn't find a backup of the site.

Then I remembered that I had just went through both pages on the site a couple of minutes before. My posts are not long so they were visible in full, complete with the images.

![Nice...](/assets/2020-06-05-cache-ftw/1.png)

I didn't know Firefox had an interface to browse cache. You can access it by putting `about:cache` in the URL box.

![Nice.](/assets/2020-06-05-cache-ftw/2.png)

It says "expired", though... will it show me the content?

![Nice!](/assets/2020-06-05-cache-ftw/3.png)

Bingo!

So that's how I got my old articles back. Barring performance, it is the first time browser cache was a real help to me and not a nuisance.
