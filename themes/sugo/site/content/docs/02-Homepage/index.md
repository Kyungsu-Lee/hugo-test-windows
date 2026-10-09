+++
title = 'Homepage'
date = 2026-02-19T00:00:00Z
draft = false
authors = ['Sugam Pokharel']
toc = true
[build]
  list="never"
+++

If you installed the theme correctly as described [here](../01-Installation/), you will see a homepage similar to the images below. Of course the posts may vary but let us disregard them for now. 

{{< slideshow 
caption="How the homepage probably looks" 
image1="homepage-image-1.png" caption1="Homepage 1" 
image2="homepage-image-2.png" caption2="Homepage 2" 
image3="homepage-image-3.png" caption3="Homepage 3" 
slidewidth="100%" >}}

Much of how the homepage (and all other pages) can be customized with the help of params. These params are in *hugo.toml* at the root of your folder. In the *hugo.toml* file, you will see many params. Most of them have descripive names that tell you exactly what they do. Many of these params, especially those related to typography and colours, work together and changing only some of them without caution may lead to the whole site looking off. So, do not change the params unless you know exactly what the params do and are sure you want it. 

We'll focus on the navbar menu later. Let us handle the general look of the site first.

The header at the top of the website depends upon the title param.
At the top of your *hugo.toml* you'll find the following params. Enter the title that you wish. 
{{<codeblock lang="toml">}}
title="John Doe Blog" # Or whatever you want
theme="sugo" # Choosing the sugo theme. Will not work otherwise
baseURL="https://example.com"
{{</codeblock>}}

The baseURL is the homepage link of the website when hosted. We'll look into it when [here](../13-Deployment/).

Now the title of the site is set. Just above the title, there is a subtitle that says "LITERARY JOURNAL" in default. You can change it by editing the brandKicker param in *hugo.toml*.
{{<codeblock lang="toml">}}
[params.ui]
brandKicker="A PERSONAL BLOG"
{{</codeblock>}}

Before the featured post, you see a section called "From the Editor". If you want to change that title, change the following param in *hugo.toml" 

{{<codeblock lang="toml">}}
[params.ui]
homeEditorHeading = "From the Blogging Genius"
{{</codeblock>}}

To change the text of the message that appears below that heading, go to the ```_index.md``` file of the contents folder. Anything that you write there will appear as the message. To totally remove the message section, just set the homeEditorHeading param to empty and the whole block will disappear. 
