+++
title = 'Comment System'
date = 2026-02-19T00:00:00Z
draft = false
authors = ['Sugam Pokharel']
toc = true
[build]
  list="never"
+++

Sugo supports two comment providers: `giscus` and `disqus`.

## Enable comments globally

Comments are disabled by default. In your root *hugo.toml*, set:

{{<codeblock lang="toml">}}
[params.comments]
enabled = true
provider = "giscus" # "giscus" or "disqus"
{{</codeblock>}}

If `enabled = false`, comments are off site-wide unless you explicitly enable them in a page frontmatter (shown later).

## Giscus setup

To use Giscus, you need a GitHub repository with Discussions enabled, and you need the values from [giscus.app](https://giscus.app/).

In *hugo.toml*:

{{<codeblock lang="toml">}}
[params.comments]
enabled = true
provider = "giscus"

[params.comments.giscus]
repo = "owner/repo"
repoId = "R_XXXXXXXXXXXXXXXX"
category = "General"
categoryId = "DIC_XXXXXXXXXXXXXX"
mapping = "pathname"
strict = "0"
reactionsEnabled = "1"
emitMetadata = "0"
inputPosition = "bottom"
theme = "preferred_color_scheme"
lang = "en"
loading = "lazy"
{{</codeblock>}}

The four required values are:
- `repo`
- `repoId`
- `category`
- `categoryId`

If any of these four are missing, Sugo will not render the Giscus block.

## Disqus setup

In *hugo.toml*:

{{<codeblock lang="toml">}}
[params.comments]
enabled = true
provider = "disqus"

[params.comments.disqus]
shortname = "your-disqus-shortname"
{{</codeblock>}}

If `shortname` is empty, Sugo will not render the Disqus block.

## Per-page override

You can disable comments on a specific post even if comments are enabled globally:

{{<codeblock lang="toml">}}
+++
title = "My Post"
comments = false
+++
{{</codeblock>}}

You can also enable comments on a specific post even if global comments are disabled:

{{<codeblock lang="toml">}}
+++
title = "My Post"
comments = true
+++
{{</codeblock>}}

Accepted truthy values in frontmatter are: `true`, `1`, `yes`, `on`.

## Where comments appear

Sugo renders comments in article-style pages (for example posts). Comments are not rendered for pages marked as:

{{<codeblock lang="toml">}}
+++
type = "page"
+++
{{</codeblock>}}

and not rendered for content inside the `content/pages` section.
