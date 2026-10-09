+++
title = 'Poet'
date = 2026-02-19T00:00:00Z
draft = false
authors = ['Sugam Pokharel']
toc = true
[build]
  list="never"
+++

The `poet` shortcode is intended for verse/poetry-style text blocks. It preserves poem-style line flow while still supporting markdown features such as footnote references.

## Shortcode Example

{{< codeblock lang="md" >}}
{{</* poet */>}}
Two roads diverged in a yellow wood,
And sorry I could not travel both.
{{</* /poet */>}}
{{< /codeblock >}}

## Actual Use

{{< poet >}}
Two roads diverged in a yellow wood,
And sorry I could not travel both.[^1]
{{< /poet >}}

[^1]: Footnote text rendered at the page footnotes section.