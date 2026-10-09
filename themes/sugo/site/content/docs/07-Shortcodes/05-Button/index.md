+++
title = 'Button'
date = 2026-02-19T00:00:00Z
draft = false
authors = ['Sugam Pokharel']
toc = true
[build]
  list="never"
+++

The `button` shortcode creates a styled link button. Common params are `href`, `target`, `width`, `height`, and `class`.

## Shortcode Example

{{< codeblock lang="html" >}}
{{</* button href="/posts" target="_self" width="200" */>}}Browse Posts{{</* /button */>}}
{{</* button href="https://example.org" target="_blank" */>}}External Link{{</* /button */>}}
{{< /codeblock >}}

## Actual Use

{{< button href="/posts" target="_self" width="200" >}}Browse Posts{{< /button >}}

{{< button href="https://example.org" target="_blank" >}}External Link{{< /button >}}
