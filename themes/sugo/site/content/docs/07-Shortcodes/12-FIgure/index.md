+++
title = 'Figure'
date = 2026-02-19T00:00:00Z
draft = false
authors = ['Sugam Pokharel']
toc = true
[build]
  list="never"
+++

The `figure` shortcode renders images with optional caption, title, attribution, and link behavior.

Common params include `src`, `alt`, `caption`, `class`,`title`, `width`, `height`, `link`, and `target`. You can add 'center' or 'right' in the class field to align the figure that way. 

## Shortcode Example

{{< codeblock lang="md" >}}
{{</* figure src="/android-chrome-512x512.png" alt="Logo" caption="Theme icon" width="220" */>}}
{{</* figure src="/android-chrome-192x192.png" alt="Small icon" caption="Clickable image" link="/" target="_self" */>}}
{{< /codeblock >}}

## Actual Use

{{< figure src="/android-chrome-512x512.png" alt="Logo" caption="Theme icon" width="220" >}}

{{< figure src="/android-chrome-192x192.png" alt="Small icon" caption="Clickable image" link="/" target="_self" >}}

{{< figure src="/android-chrome-512x512.png" alt="Logo" class="center" caption="Center Align" width="220" >}}

{{< figure src="/android-chrome-512x512.png" alt="Logo" class="right" caption="Right Align" width="220" >}}