+++
title = 'Tabs'
date = 2026-02-19T00:00:00Z
draft = false
authors = ['Sugam Pokharel']
toc = true
[build]
  list="never"
+++

The `tabs` shortcode creates tabbed panels. Tabs are separated with `<!--tab-->` and each tab supports `title:` and `content:`.

## Shortcode Example

{{< codeblock lang="md" >}}
{{</* tabs */>}}
title: Markdown
content:
Use this tab for markdown notes.
<!--tab-->
title: HTML
content:
Use this tab for rendered snippets.
{{</* /tabs */>}}
{{< /codeblock >}}

## Actual Use

{{< tabs >}}
title: Markdown
content:
Use this tab for markdown notes.
<!--tab-->
title: HTML
content:
Use this tab for rendered snippets.
{{< /tabs >}}
