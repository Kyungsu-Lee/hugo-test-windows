+++
title = 'Collapse'
date = 2026-02-19T00:00:00Z
draft = false
authors = ['Sugam Pokharel']
toc = true
[build]
  list="never"
+++

The `collapse` shortcode creates a `<details>` block. Use `title` and optional `open="true"`. The block is closed by default. 

## Shortcode Example

{{< codeblock lang="html" >}}
{{</* collapse title="Advanced Note" open="false" */>}}
This text is hidden until expanded.
{{</* /collapse */>}}
{{< /codeblock >}}

## Actual Use

{{< collapse title="Advanced Note" >}}
This text is hidden until expanded.
{{< /collapse >}}

{{< collapse title="Open by default" open="true" >}}
This section starts expanded.
{{< /collapse >}}
