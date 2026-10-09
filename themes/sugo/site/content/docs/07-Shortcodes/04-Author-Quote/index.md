+++
title = 'Author-Quote'
date = 2026-02-19T00:00:00Z
draft = false
authors = ['Sugam Pokharel']
toc = true
[build]
  list="never"
+++

The `author-quote` shortcode renders a styled quote with optional attribution.

## Shortcode Example

{{< codeblock lang="html" >}}
{{</* author-quote author="Rabindranath Tagore" source="Stray Birds" */>}}
Clouds come floating into my life.
{{</* /author-quote */>}}
{{< /codeblock >}}

## Actual Use

{{< author-quote author="Rabindranath Tagore" source="Stray Birds" >}}
Clouds come floating into my life, no longer to carry rain or usher storm, but to add color to my sunset sky.
{{< /author-quote >}}

{{< author-quote author="Rabindranath Tagore" >}}
You can omit the source.
{{< /author-quote >}}



{{< author-quote >}}
You can even omit both the author and the source.
{{< /author-quote >}}
