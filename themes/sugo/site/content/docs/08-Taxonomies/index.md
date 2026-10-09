+++
title = 'Taxonomies'
date = 2026-02-19T00:00:00Z
draft = false
authors = ['Sugam Pokharel']
toc = true
[build]
  list="never"
+++

Sugo is configured with three taxonomies by default:

{{<codeblock lang="toml">}}
[taxonomies]
tag = "tags"
category = "categories"
author = "authors"
{{</codeblock>}}

These taxonomies are fine for most cases but you may want some custom taxonomies. In order to do so, just add them in the same format as the tag or category taxonomies.

{{<codeblock lang="toml">}}
[taxonomies]
# these are the default taxonomies
tag = "tags"
category = "categories"
author = "authors"
# these are the custom ones
topic="topics"
language="languages"
project="projects"
{{</codeblock>}}

So any new taxonomy should be in the format of ```singular= "plural"```

## Use in front matter

{{<codeblock lang="toml">}}
+++
tags= ["history", "latin"]
categories= ["Ancient Rome"]
authors= ["Sugam Pokharel"]
+++
{{</codeblock>}}

## Pages for Taxonomies

Hugo automatically creates pages for taxonomies. So, if you have tags taxonomy set up in the *hugo.toml* as we did in the example above. You can go to /tags to see all the tags that you have used in the hugo site or /tags/tag-name to see all the posts that have the tag called 'tag-name'.

Sometimes you may want to add a bit of information before the taxonomy. For example, let us consider that we want to add ``` You can find all the tags here ``` in the tags page an ``` This page contains all the posts associated with tag-name.```. We can do so by creating folders and files with the following structure.

In *\content\tags\_index.md*, add the following:
{{<codeblock lang="markdown">}}
+++
title="Tags"
+++
 
You can find all the tags here
{{</codeblock>}}

In *\content\tags\tag-name\_index.md*, add the following:
{{<codeblock lang="markdown">}}
+++
title="Tag Name"
+++
 
This page contains all the posts associated with tag-name
{{</codeblock>}}


