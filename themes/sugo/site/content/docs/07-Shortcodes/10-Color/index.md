+++
title = 'Color'
date = 2026-02-19T00:00:00Z
draft = false
authors = ['Sugam Pokharel']
toc = true
[build]
  list="never"
+++

The `color` shortcode styles text with separate light/dark colors. These will be used in the light and dark modes respectively. If you fill out only one of these fields, color will be changed only for that mode. 

## Shortcode Example

{{< codeblock lang="md" >}}
{{</* color light="#7b2d26" dark="#e7bf78" */>}}
This text uses different colors in light and dark modes.
{{</* /color */>}}
{{< /codeblock >}}

## Actual Use

{{< color light="#7b2d26" dark="#e7bf78" >}}
This text uses different colors in light and dark modes.
{{< /color >}}


{{< color dark="#e7bf78" >}}
This text has a different color only in the dark mode. 
{{< /color >}}