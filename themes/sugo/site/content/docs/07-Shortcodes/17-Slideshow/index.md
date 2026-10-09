+++
title = 'Slideshow'
date = 2026-02-19T00:00:00Z
draft = false
authors = ['Sugam Pokharel']
toc = true
[build]
  list="never"
+++

The `slideshow` shortcode creates a slider from numbered image params (`image1`, `image2`, ...) and optional `captionN`.

Common params are `slidewidth`, `caption`, and optional `id`.

## Shortcode Example

{{< codeblock lang="md" >}}
{{</* slideshow
slidewidth="100%"
caption="Simple slideshow"
image1="/android-chrome-192x192.png"
caption1="First slide"
image2="/android-chrome-512x512.png"
caption2="Second slide"
*/>}}
{{< /codeblock >}}

## Actual Use

{{< slideshow
slidewidth="100%"
caption="Simple slideshow"
image1="https://upload.wikimedia.org/wikipedia/commons/5/57/%D0%A1%D0%BA%D0%B5%D0%BB%D1%96_%D0%94%D0%B5%D0%BC%D0%B5%D1%80%D0%B4%D0%B6%D1%96.jpg"
caption1="First slide"
image2="https://upload.wikimedia.org/wikipedia/commons/8/82/%D0%9D%D0%B0%D0%B9%D0%BA%D1%80%D0%B0%D1%89%D1%96_%D0%BC%D0%B8%D1%82%D1%96_%D0%B6%D0%B8%D1%82%D1%82%D1%8F.jpg"
caption2="Second slide"
image3="https://upload.wikimedia.org/wikipedia/commons/8/86/Eurasian_blue_tit_Lancashire.jpg"
caption3="Third Slide"
>}}
