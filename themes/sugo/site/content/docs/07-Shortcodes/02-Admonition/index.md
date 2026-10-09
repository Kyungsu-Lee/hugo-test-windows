+++
title = 'Admonition'
date = 2026-02-19T00:00:00Z
draft = false
authors = ['Sugam Pokharel']
toc = true
[build]
  list="never"
+++

The `admonition` shortcode renders callout boxes. Supported `type` values are `note`, `tip`, `info`, `warning`, and `danger`.

## Shortcode Example

{{< codeblock lang="html" >}}
{{</* admonition type="warning" title="Important" */>}}
Always run `npm run build` so Pagefind index is generated.
{{</* /admonition */>}}
{{< /codeblock >}}

## Actual Use

### Warning

{{< admonition type="warning" title="Important" >}}
Always run `npm run build` so Pagefind index is generated.
{{< /admonition >}}

### Tip

{{< admonition type="tip" title="Tip" >}}
Use post bundles so images and markdown stay together.
{{< /admonition >}}


### Info
{{< admonition type="info" title="Info">}}
This is an info type admonition.
{{< /admonition >}}


### Danger

{{< admonition type="danger" title="Danger">}}
This is a danger type admonition.
{{< /admonition >}}

### Note

{{< admonition type="note" title="Note">}}
This is a note type admonition.
{{< /admonition >}}