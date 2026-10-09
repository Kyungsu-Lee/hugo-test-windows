---
title: "Configuring Your Site"
date: 2023-12-05 07:00:00
draft: false
summary: "A quick guide to the main configuration options available in Shizuka."
tags:
  - configuration
  - getting-started
categories:
  - meta
---

All configuration lives in `hugo.toml` (or `config.toml`). Here are the key parameters for Shizuka.

## Required params

```toml
[params]
  description = "Your site description"
  author      = "Your Name"
  dateFormat  = "January 2, 2006"
```

## Optional params

```toml
[params]
  tagline  = "A short tagline shown in the footer"
  github   = "https://github.com/yourusername"
  website  = "https://yourwebsite.com"
  ogImage  = "/images/og-default.png"
  rssLimit = 20
```

## Menu

Define your navigation links:

```toml
[menu]
  [[menu.main]]
    name   = "Blog"
    url    = "/posts/"
    weight = 1
  [[menu.main]]
    name   = "Archive"
    url    = "/archive/"
    weight = 2
  [[menu.main]]
    name   = "About"
    url    = "/about/"
    weight = 3
```

## Language

Set your language code and i18n will auto-load the matching translation file:

```toml
languageCode = "en"   # or "it" for Italian
```

## Pagination

```toml
paginate = 5
```

That's all you need to get started. Add your content to `content/posts/` and run `hugo server`.
