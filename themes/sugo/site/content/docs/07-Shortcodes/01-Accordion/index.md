+++
title = 'Accordion'
date = 2026-02-19T00:00:00Z
draft = false
authors = ['Sugam Pokharel']
toc = true
[build]
  list="never"
+++

The `accordion` shortcode creates expandable sections. Each section is split with `<!--accordion-->` and can define `title:` and `content:`.

## Shortcode Example

{{< codeblock lang="html" >}}
{{</* accordion caption="Accordion demo" */>}}
title: Installation
content:
Install Hugo Extended and run `npm install`.
<!--accordion-->
title: Build
content:
Run `npm run build` before deployment.
{{</* /accordion */>}}
{{< /codeblock >}}

## Actual Use

{{< accordion caption="Accordion demo" >}}
title: Installation
content:
Install Hugo Extended and run `npm install`.
<!--accordion-->
title: Build
content:
Run `npm run build` before deployment.
{{< /accordion >}}
