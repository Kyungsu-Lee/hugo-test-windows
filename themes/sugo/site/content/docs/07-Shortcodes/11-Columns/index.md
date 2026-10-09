+++
title = 'Columns'
date = 2026-02-19T00:00:00Z
draft = false
authors = ['Sugam Pokharel']
toc = true
[build]
  list="never"
+++

The `columns` shortcode creates responsive columns. Separate columns with `<!--col-->`. Visually it may look similar to the cards but `columns` is more versatile. For example, if you add a footnote within a card, it will not work but if you add a footnote within columns, it will work. 

## Shortcode Example

{{< codeblock lang="html" >}}
{{</* columns */>}}
### Left Column
Left content.

<!--col-->

### Right Column
Right content.
{{</* /columns */>}}
{{< /codeblock >}}

## Actual Use

{{< columns >}}
### Left Column
Left content.

<!--col-->

### Right Column
Right content.
{{< /columns >}}
