+++
title = 'Cards'
date = 2026-02-19T00:00:00Z
draft = false
authors = ['Sugam Pokharel']
toc = true
[build]
  list="never"
+++

The `cards` shortcode renders a grid of content cards. Cards are separated using `<!--card-->` and each card supports `title:` and `content:`. The content of the cards can be written in normal markdown and it will be rendered correctly. You can even embed other shortcodes within the content. 

## Shortcode Example

{{< codeblock lang="md" >}}
{{</* cards */>}}
title: First Card
content:
This is card one.
<!--card-->
content:
This card has no title, so default title is used.
{{</* /cards */>}}
{{< /codeblock >}}

## Actual Use

{{< cards >}}
title: First Card
content:
This is card one.
<!--card-->
content:
This card has no title, so default title is used.
{{< /cards >}}

