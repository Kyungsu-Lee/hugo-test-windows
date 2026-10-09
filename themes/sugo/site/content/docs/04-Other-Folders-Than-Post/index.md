+++
title = 'Creating Articles in Folders other than \posts'
date = 2026-02-19T00:00:00Z
draft = false
authors = ['Sugam Pokharel']
toc = true
[build]
  list="never"
+++

You are not constrained by Hugo to create articles ( I'll just use article rather than post instead to minimize the confusion but they're the same thing) in the \posts folder inside the \content folder. You can create an article just in the root of the \content folder or in any subfolder inside it. The frontmatter configuration remains the same as usual. 

For example, if you create ```\content\folder-A\folder-B\article-name\index.md```, the url of your post will be ```your-hugo-site-domain.com/folder-A/folder-B/article-name``` 

Any article created outside the posts folder will also naturally not be displayed in the posts list page. that you can access through your navbar. If you want to add the other folders to the navbar so as to be readily accessible, it is possible to do so and can be learnt [here](../06-Menu/)