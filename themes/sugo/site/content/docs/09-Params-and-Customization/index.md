+++
title = 'Params and Customization'
date = 2026-02-19T00:00:00Z
draft = false
authors = ['Sugam Pokharel']
toc = true
[build]
  list="never"
+++

The *hugo.toml* configuration contains many, many params and much of the site is confugred there. It is impractical to describe all of them in detail. A list of all of params and their workings will be found [here](../13-List-of-Params). We'll just discuss the major features here.

## Major Features

The *hugo.toml* has a special section called [params.features]. This handles the major features that govern the overall look of the site.
{{<codeblock lang="toml">}}

[params.features]
  enableSearch = true
  enableBackToTop = true
  enablePagination = true
  enableThemeToggle = true
  enableMath = true
  enableBreadcrumbs = true
  enableRelatedPosts = true
  fixedThemeWhenToggleOff = "light"
{{</codeblock>}}

These params work exactly as their names suggest. If, for example, *enableSearch* is set to 'false', the search box in the site will disappear. If *enableThemeToggle* is set to 'false', the dark-light mode toggle will not appear. And so on for all the params. 

If *enableThemeToggle* is set to true, the value of *fixedThemeWhenToggleOff* will not matter. If *enableThemeToggle* is set to false, the color schee of the site depends upon the value of the *fixedThemeWhenToggleOff* param. That is to say, the site will appear permanently in light mode if it is set to 'light' and in dark mode if it is set to 'dark'.

## Summary and Pagination

In the [params] section of the *hugo.toml*, there are the following two variables.
{{<codeblock lang="toml">}}
[params]
paginationSize = 6
summaryLength = 180
{{</codeblock>}}

Pagination Size refers to the number of posts that you see in a single page before you need to go to the next to view further posts. The paginationSize variable governs the pagination in both the homepage and other list pages where posts appear (eg: \posts). 

The summaryLength governs how much summary will be displayed in the card of posts. Keep in mind that the value of summaryLength needs to be characters and not words. 

