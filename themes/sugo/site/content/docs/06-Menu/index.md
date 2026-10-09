+++
title = 'Menu'
date = 2026-02-19T00:00:00Z
draft = false
authors = ['Sugam Pokharel']
toc = true
[build]
  list="never"
+++
## Generic Menu Configuration

**Sugo** only supports one menu - the navbar. This is managed through *hugo.toml* file.

In the *hugo.toml* configuration file there is a section dedicated to menus. You'll see somthing like this: 

{{<codeblock lang="toml">}}
# Example Menu Configuration
[menus]
[[menus.main]]
name = 'Home'
pageRef = '/'
weight = 10

[[menus.main]]
name = 'Posts'
pageRef = '/posts'
weight = 20

[[menus.main]]
name = 'Tags'
pageRef = '/tags'
weight = 30

[[menus.main]]
name = 'Categories'
pageRef = '/categories'
weight = 40

[[menus.main]]
name = 'Archive'
pageRef = '/archives'
weight = 50


[[menus.main]]
name = 'About'
pageRef = '/pages/about'
identifier = 'about'
weight = 60
params={target="_blank"}

[[menus.main]]
name = 'Privacy'
pageRef = '/pages/privacy'
parent = 'about'
weight = 10

{{</codeblock>}}

The configuration is pretty self-evident but let us clarify some things. 

## Weight
The menu items with lower weight appear before those with higher weight. 

## Referencing

*pageRef* only works for linking to anything that is present in the *\contents* folder. Let's assume that you have a folder called Reviews inside the *\content* folder that has many posts containing book review. If you want to add this to the menu at the very end, you can add something like this. 

{{<codeblock lang="toml">}}
[[menus.main]]
name = 'Reviews'
pageRef = '/reviews'
weight = 1000000
{{</codeblock>}}

### Referencing Pages
Referencing pages works on the same way as referencing folders. If you have a page called index.md in any folder, you can just use the folder name in the *pageRef* field. If the 

### Referencing External Links

If you want to link to an external url, the config given above will not work. If you just add 'https://google.com' to pageRef, the menu item will not actually link to Google. To link to external urls, you should use *url* instead of *pageRef*. 

{{<codeblock lang="toml">}}
[[menus.main]]
name = 'Google'
url = 'https://google.com'
weight = 1000000
{{</codeblock>}}

## Creating Drop Downs
In order to create a drop down menu, add an identifier to the menu item and reference it in the children as the *parent*. The following is an example configuration:

{{<codeblock lang="toml">}}
[[menus.main]]
name = 'About'
pageRef = '/pages/about'
identifier = 'about'
weight = 60

[[menus.main]]
name = 'FAQS'
pageRef = '/pages/faq'
parent = 'about'
weight = 10

[[menus.main]]
name='Privacy'
pageRef = '/pages/privacy'
parent = 'about'
weight = 20
{{</codeblock>}}

Here the privacy and faq pages appear as dropdowns to the about page.

## Open in a New Page

If you want the menu reference to open in a new page when clicked, just add this params to the menu item:

{{<codeblock lang="toml">}}[[menus.main]]
name = 'Reviews'
pageRef = '/reviews'
weight = 1000000
params={target="_blank"}
{{</codeblock>}}