+++
title = 'Posts'
date = 2026-02-19T00:00:00Z
draft = false
authors = ['Sugam Pokharel']
toc = true
summary="Posts are the main point of any hugo blog. In the contents folder, there is a subfolder called posts. You should create your posts inside it. You can just create a markdown file inside this posts folder and it works just fine. I would however advise against it. Inside the posts folder, create a folder and name it whatever you want. Now inside it create an index.md file."
subtitle="This is a subtitle"
[build]
  list="never"
+++

## Posts location

Posts are the main point of any hugo blog. In the contents folder, there is a subfolder called posts. You should create your posts inside it. You can just create a markdown file inside this posts folder and it works just fine. I would however advise against it. Inside the posts folder, create a folder and name it whatever you want. Now inside it create an index.md file. I advise this mainly for two reasons. The first is that it groups the post itself with other files that may be referenced in the post (for example images or pdfs). The second is that it is easier to manage than a jumbled mass of markdown files especially if the number of posts is sizeable. That said it is upto you to decide and either way works. 

Before looking into the posts themselves in detail, let us see how the folder or filename affect the url. For example, if you create a md file called 'my-new-blog-post.md', the url of this post will be ```your-hugo-site-domain.com/posts/my-new-blog-post```. Similarly, if you create a folder called 'my newest blog post', create an index.md file inside it and write your text there, this post will have the url ```your-hugo-site-domain.com/posts/my-newest-blog-post```. So, the url of your post depends upon the name of your markdown file or the folder depending upon the method that you chose. This is the default but the url can be changed manually as we shall see later.

## Frontmatter

In hugo, you write your posts in markdown which is preceeded by a separate block containing various metadata at the beginning of the file. This is called frontmatter. **Sugo** accepts most of the basic frontmatter params that are used in Hugo as well as some custom ones. For a basic post, you can use the following params in the fronmatter.
{{<codeblock lang="toml">}}
+++
title="My Post Title"
authors=["John Doe", "Jane Doe"]
date="2026-02-19T00:00:00Z"
categories=["Category-1", "Category-2"]
tags=["tag-1", "tag-2"]
draft=false
+++
{{</codeblock>}}

These params in the frontmatter work exactly as their names would suggest. The 'title' sets the title of the post, the 'authors' set the authors and so on. If the draft is set to true, the post is not published. 

This minimal frontmatter works fine for many usages but the user wants, and sometimes needs, to have a bit more control over the post. To do this, many other params can be used in the frontmatter. The following is an example of a maximal frontmatter.

{{<codeblock lang="toml">}}
+++
title = "Dummy Lorem Post "
subtitle = "Synthetic editorial sample for shortcode testing"
description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit for demo post 01."
summary = "Lorem ipsum summary for dummy post  with shortcode coverage and Wikimedia figures."
slug = "dummy-lorem-post"
aliases = ["/posts/lorem-dummy-01/", "/archive/lorem-dummy-01/"]
date = 2026-01-01T08:00:00-05:00
lastmod = 2026-01-02T15:30:00-05:00
publishDate = 2026-01-01T08:00:00-05:00
expiryDate = 2099-12-31T23:59:59-05:00
draft = false
featured = true
toc = true
math = true
breadcrumbs = true
authors = ["Alice Editor", "Bob Curator"]
categories = ["culture", "lorem"]
tags = ["lorem", "ipsum", "dolor", "amet", "dummy", "issue-01", "edition-1"]
series = ["Lorem Dispatches", "Synthetic Magazine"]
keywords = ["lorem ipsum", "dummy content", "shortcode showcase", "hugo theme", "wikimedia images"]
weight = 1
canonicalURL = "https://example.org/posts/dummy-lorem-post-01/"
license = "CC BY-SA 4.0"
[cover]
  image="https://upload.wikimedia.org/wikipedia/commons/8/88/Plains_zebras_%28Equus_quagga%29_Maputo.jpg"
+++
{{</codeblock>}}


## Frontmatter Params Summary

{{<table headers="Parameter|Description|Remarks" caption="Hugo Frontmatter Configuration">}}

title|The main heading of the post.|Required for SEO and page rendering.

subtitle|A secondary heading or tagline.|Sits below the main title; theme-specific.

description|Brief summary for HTML meta tags.|Crucial for SEO and social media snippets.

summary|Text used for post cards/list views.|If omitted, Hugo auto-generates this from content.

slug|The specific URL tail.|Overrides the filename for the final URL.

aliases|List of old URLs to redirect from.|Prevents broken links during content migration.

date|Primary creation timestamp.|Used for chronological sorting.

lastmod|Last modified timestamp.|Helps search engines identify updated content.

publishDate|Visibility trigger date.|Content remains hidden until this date is reached.

expiryDate|Content expiration date.|Set to 2099 to ensure permanent visibility.

draft|Boolean status for publication.|Set to false to make the post live.

featured|Custom "Hero" post flag.|Selects the featured post.

toc|Table of Contents toggle.|Controls whether the TOC sidebar is generated. It is true by default.

math|LaTeX/MathJax support toggle.|Triggers the loading of mathematical rendering scripts.

breadcrumbs|Navigation path toggle.|Shows the "Home > Category > Post" trail. It is true by default.

authors|List of content creators.|Used to link to specific author profile pages.

categories|High-level content grouping.|Primary Hugo taxonomy.

tags|Granular content descriptors.|Secondary Hugo taxonomy for discovery.

series|Grouped content identifier.|Used to link related posts (e.g., Part 1, Part 2).

keywords|SEO meta keywords.|This is mainly used for generating related posts below any post. 

weight|Ordering priority.|Lower numbers (1) float to the top of lists.

canonicalURL|The "official" version of the link.|Prevents SEO penalties for duplicate content.

license|Usage rights for the post.|Displays the CC BY-SA 4.0 attribution.

[cover] image|The featured image URL.|Can be image in the post folder or an online image url.

{{</table>}}

The frontmatter params are mostly self-evident but somethings to keep in mind are:

### Slug
As stated earlier, the URL of any post is automatically generated from the folder or filename. This can however be changed by using the slug param. If you do use slug, it is better to use dashes than just a block of text. So, use 'this-is-my-first-post' rather than 'thisismyfirstpost' for better clarity and ease of use.

### Cover Image
If you add an image to your post, it is automatically selected as the cover image. If there are two or more images in your post, the first image will be automatically be selected as the cover image. If you want to disable cover image for the post, you can do so by using this in the frontmatter:

{{<codeblock lang="toml">}}
+++
cover = false
+++
{{</codeblock>}}


### Summary

You can provide a summary of your post in the frontmatter. If you do not include any summary param in the frontmatter, the summary will be automatically generated from the beginning part of your post. These summary will then be display wherever your post is displayed as a card (for example, in homepage or in posts page). The length of the summary can be set up in *hugo.toml* file. If your manual summary exceeds that length, it will be truncated automatically. 

