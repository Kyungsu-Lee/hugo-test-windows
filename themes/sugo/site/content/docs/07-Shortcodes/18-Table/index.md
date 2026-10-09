+++
title = 'Table'
date = 2026-02-19T00:00:00Z
draft = false
authors = ['Sugam Pokharel']
toc = true
[build]
  list="never"
+++

The `table` shortcode builds styled tables from row lines separated by `|`.

You can pass `headers="A|B|C"` and optional `caption`.

## Shortcode Example

{{< codeblock lang="md" >}}
{{</* table headers="Shortcode|Purpose|Difficulty" caption="Shortcode overview" */>}}
figure|Image with caption|Easy
tabs|Tabbed blocks|Medium
accordion|Expandable sections|Medium
{{</* /table */>}}
{{< /codeblock >}}

## Actual Use

{{< table headers="Shortcode|Purpose|Difficulty" caption="Shortcode overview" >}}
figure|Image with caption|Easy
tabs|Tabbed blocks|Medium
accordion|Expandable sections|Medium
{{< /table >}}
