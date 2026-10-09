+++
title = 'Figure (Hugo-Compatible Usage)'
date = 2026-02-19T00:00:00Z
draft = false
authors = ['Sugam Pokharel']
toc = true
[build]
  list="never"
+++

Sugo provides a custom `figure` shortcode implementation, but it remains compatible with common Hugo figure-style usage.

If you only need image + caption, this simpler pattern works well.

## Shortcode Example

{{< codeblock lang="md" >}}
{{</* figure src="/android-chrome-512x512.png" title="App Icon" caption="Simple figure usage" */>}}
{{< /codeblock >}}

## Actual Use

{{< figure src="/android-chrome-512x512.png" title="App Icon" caption="Simple figure usage" >}}
