---
title: "Writing with a Table of Contents"
date: 2024-02-10 09:00:00
draft: false
summary: "Long-form posts can benefit from a table of contents. Here's how to enable it."
tags:
  - writing
  - features
toc: true
---

For longer posts, Shizuka supports an optional table of contents. Enable it with `toc: true` in your front matter.

## Headings and structure

Good long-form writing benefits from clear structure. Use `##` and `###` headings to create sections that readers can navigate.

The TOC is generated automatically from your headings (H2 through H4 by default).

## Code blocks

Shizuka includes syntax highlighting via Hugo's built-in highlighter:

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, Shizuka!")
}
```

```css
:root {
  --color-text: #1a1a1a;
  --color-bg: #fafaf8;
}
```

## Blockquotes

> The art of being wise is the art of knowing what to overlook.
> — William James

## Lists

Unordered lists work naturally:

- Clean typography
- Minimal chrome
- Fast load times
- No JavaScript frameworks

And ordered lists too:

1. Install the theme
2. Configure `hugo.toml`
3. Write your first post
4. Publish

## Conclusion

Long-form content is a first-class citizen in Shizuka. Use the TOC, headings, and semantic markup to give readers a smooth reading experience.
