# cryptoflow

A simple, fast, Hugo theme that can be used for fintech website.

![./images/screenshot.jpg](https://github.com/anastasiiaxfr/cryptoflow/blob/main/images/screenshot.jpg)

Welcome to cryptoflow (*perspective*). Stay a while! Cryptoflow is a minimal [Hugo](https://gohugo.io/) theme. 


![./images/postsgrab.png](https://github.com/anastasiiaxfr/cryptoflow/blob/main/images/3.jpg)

![./images/writingsgrab.png](https://github.com/anastasiiaxfr/cryptoflow/blob/main/images/2.jpg)

![./images/photosgrab.png](https://github.com/anastasiiaxfr/cryptoflow/blob/main/images/1.jpg)


[Here](https://lp-15-10-241.netlify.app/) is a link to my personal website which uses the same theme. 





## Installation

Before starting, make sure you have installed [Hugo](https://gohugo.io/installation/) and [Go](https://go.dev/doc/install). To check that both of these are installed, 

```bash
$ go version
```
```bash
$ hugo version
```

### Cloning

You can also clone this theme's repository into your own hugo site by doing the following, 

```bash 
 $ git clone https://github.com/anastasiiaxfr/cryptoflow 
```

To update the theme: 

```bash
$ git pull
```

## Usage 


This theme uses [KaTeX](https://katex.org/) for mathematics typesetting. 

## Adding Content

### Set-Up 

Ensure that your ```content``` folder has the following structure: 

```bash 
content/[lang]
├───blog
├───policy
└───terms 
``` 

### Posts 

To add a post, simply create a new markdown file ```blog-title.md``` in the ```blog``` folder. 


Add a markdown file ```blog-title.md```. It's front matter should look like: 
```markdown
---
title: "Your Blog Title"
description: "Your Blog Description"
---
Content
``` 

### Site Logo

To replace the logo of the website put your image/svg file into into the `icons` directory of your website static directory. Then in your `hugo.toml` file uncomment the `logo` line and put the path to your logo.

## Almost Done

To see your site live, use Hugo's built-in local server by running: 

```bash
$ hugo server
```
and navigate to  http://localhost:1313.

## Contributing

All bug reports and pull requests are welcome under https://github.com/anastasiiaxfr/cryptoflow.

## License

The theme is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

