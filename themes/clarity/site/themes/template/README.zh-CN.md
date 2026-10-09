# Clarity

[English](README.md) | 简体中文

**Clarity** 是一个现代化、响应式、简洁且专注内容的 [Hugo](https://gohugo.io/) 主题，支持自动暗色模式和 CSS 自定义属性.

> **基于 [Mainroad](https://github.com/Vimux/Mainroad)** 由 [Vimux](https://github.com/vimux) 开发
> Clarity 是一个现代化的分支版本，添加了暗色模式支持、CSS 自定义属性，并移除了旧版浏览器支持。

**[在线演示](https://iron6909.github.io/clarity/)** • **[文档](https://iron6909.github.io/clarity/docs/)**

![screenshot](https://raw.githubusercontent.com/iron6909/clarity/main/images/screenshot.png)

**特性：**

+ 响应式设计
+ **自动暗色模式**支持（通过 `prefers-color-scheme`）
+ **CSS 自定义属性**支持运行时主题定制
+ 主菜单和次级菜单
+ 可配置的侧边栏小部件
+ 多语言翻译支持（超过 15 种语言）
+ 可通过 `config.toml` 配置主题设置（侧边栏位置、作者信息框、文章导航、强调色等）
+ Hugo 内置模板支持（Open Graph、Schema、Twitter Cards、Disqus、Google Analytics）
+ 现代浏览器兼容性
  + *桌面端：Chrome 88+、Firefox 78+、Safari 14+、Edge 88+*
  + *移动端：现代 Android 浏览器、Safari (iOS 14+)、Chrome Mobile*
+ 自定义 Google 字体支持、MathJax、目录、SVG 图标等更多功能…

## 安装

*开始之前，请确保你已经[安装了 Hugo](https://gohugo.io/getting-started/quick-start/#step-1-install-hugo) 并[创建了新站点](https://gohugo.io/getting-started/quick-start/#step-2-create-a-new-site)。完成后，你就可以安装 **Clarity** 了。*

从项目根目录运行：

```bash
git clone https://github.com/iron6909/clarity.git themes/clarity
```

或者，如果你不打算做重大修改但想跟踪和更新主题，可以通过以下命令将其添加为 git 子模块：

```bash
git submodule add https://github.com/iron6909/clarity.git themes/clarity
```

接下来，打开 Hugo 站点根目录的 `config.toml`，确保主题选项设置为 `clarity`：

```toml
theme = "clarity"
```

## 配置

### Config.toml 示例

```toml
baseurl = "/"
title = "Clarity"
languageCode = "zh-cn"
paginate = "10" # 每页文章数量
theme = "clarity"
disqusShortname = "" # 已弃用！请使用 .Services.Disqus.Shortname
googleAnalytics = "" # 已弃用！请使用 .Services.googleAnalytics.ID

[services.disqus]
  shortname = "" # 输入你的 Disqus shortname 以启用评论

[services.googleAnalytics]
  ID = "" # 输入你的跟踪 ID 以启用 Google Analytics

[Params]
  description = "张三的个人博客" # 网站描述，用于 meta description
  copyright = "张三" # 页脚版权持有者，否则将使用网站标题
  opengraph = true # 启用 OpenGraph
  schema = true # 启用 Schema
  twitter_cards = true # 启用 Twitter Cards
  readmore = false # 在列表页显示"阅读更多"按钮
  authorbox = true # 在页面底部显示作者信息框
  toc = true # 启用目录
  pager = true # 在页面底部显示分页导航（上一篇/下一篇链接）
  post_meta = ["author", "date", "categories", "translations"] # 文章元信息顺序
  mainSections = ["post", "blog", "news"] # 指定在首页和"最近文章"小部件中显示的分区页面
  dateformat = "2006-01-02" # 更改日期格式
  mathjax = true # 启用 MathJax
  mathjaxPath = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.6/MathJax.js" # 指定 MathJax 路径
  mathjaxConfig = "TeX-AMS-MML_HTMLorMML" # 指定 MathJax 配置
  googleFontsLink = "https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700" # 加载 Google 字体
  customCSS = ["css/custom.css"] # 包含自定义 CSS 文件
  customJS = ["js/custom.js"] # 包含自定义 JS 文件

[Params.author]
  name = "张三"
  bio = "张三的真实身份不详。也许他是一位成功的博主或作家。没人知道。"
  avatar = "img/avatar.png"

  # 已弃用的参数
  subtitle = "" # 已弃用，请使用 .Site.Params.logo.subtitle
  highlightColor = "" # 已弃用，请使用 .Site.Params.style.vars.highlightColor

[Params.style.vars]
  highlightColor = "#2563EB" # 覆盖强调色（默认：#2563EB）

  # 覆盖字体系列设置
  # 如有必要，请注意这些参数中不同的引号或转义符号
  fontFamilyPrimary = "'Open Sans', Helvetica, Arial, sans-serif"
  # 负责 pre、code、kbd 和 samp 标签字体的次要字体系列
  fontFamilySecondary = "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"

[Params.logo]
  image = "img/placeholder.png" # Logo 图片。相对于"static"的路径
  title = "Clarity" # Logo 标题，否则将使用网站标题
  subtitle = "又一个网站" # Logo 副标题

[Params.thumbnail]
  visibility = ["list", "post"] # 控制缩略图可见性

[Params.sidebar]
  home = "right" # 配置首页布局
  list = "left"  # 配置列表页布局
  single = false # 配置单页布局
  # 按给定顺序启用小部件
  widgets = ["search", "recent", "categories", "taglist", "social", "languages"]

[Params.widgets]
  recent_num = 5 # 设置"最近文章"小部件中的文章数量
  categories_counter = false # 在"分类"小部件中为每个分类启用计数器
  tags_counter = false # 在"标签"小部件中为每个标签启用计数器

[Params.widgets.social]
  cached = false # 如果为 true 则激活缓存
  # 启用社交小部件的各个部分
  facebook = "username"
  twitter = "username"
  instagram = "username"
  linkedin = "username"
  telegram = "username"
  github = "username"
  gitlab = "username"
  bitbucket = "username"
  email = "example@example.com"

# 自定义社交链接
[[Params.widgets.social.custom]]
  title = "Youtube"
  url = "https://youtube.com/user/username"
  icon = "youtube.svg" # 可选。相对于"layouts/partials"的路径
  rel = "noopener noreferrer" # 设置为 false 以移除 rel 属性

[[Params.widgets.social.custom]]
  title = "我的主页"
  url = "https://example.com"

[Params.widgets.search]
  cached = false # 如果为 true 则激活缓存
  url = "https://google.com/search"
  [Params.widgets.search.input]
    name = "sitesearch"
    pre = ""
```

**请勿直接复制示例配置**。仅使用你需要的参数。

有关所有可用标准配置设置的更多信息，请阅读 [Hugo 所有配置设置](https://gohugo.io/getting-started/configuration/#all-configuration-settings)。

### Front Matter 示例

```yaml
---
# 通用定义的参数
title: "示例文章标题"
date: "2017-08-21"
description: "示例文章描述"
categories:
  - "分类 1"
  - "分类 2"
tags:
  - "测试"
  - "另一个测试"
menu: main # 可选，将页面添加到菜单。选项：main、side、footer

# 主题定义的参数
thumbnail: "img/placeholder.png" # 缩略图
lead: "示例引言 - 在标题附近突出显示" # 引言文本
comments: false # 为特定页面启用 Disqus 评论
authorbox: true # 为特定页面启用作者信息框
pager: true # 为特定页面启用分页导航（上一篇/下一篇）
toc: true # 为特定页面启用目录
mathjax: true # 为特定页面启用 MathJax
sidebar: "right" # 为每个页面启用侧边栏（在右侧）
widgets: # 按给定顺序为每个页面启用侧边栏小部件
  - "search"
  - "recent"
  - "taglist"
---
```

有关所有可用标准 front matter 变量的更多信息，请阅读 [Hugo Front Matter](https://gohugo.io/content-management/front-matter)。

## 暗色模式

主题自动支持系统级暗色模式偏好。当用户的操作系统设置为暗色模式时，网站会自动切换到暗色配色方案。

暗色模式使用精心设计的配色方案，确保：
- 符合 WCAG AA+ 对比度标准
- 保持与亮色模式相同的视觉层次
- 强调色在深色背景上保持可读性

所有颜色通过 CSS 自定义属性定义，为未来的运行时主题切换功能提供基础。

## 文档

详细文档请访问 [`docs/`](docs/) 目录：

- **[快速开始指南](docs/QUICK-START.md)** - 5 分钟快速上手
- **[发布指南](docs/PUBLISHING-GUIDE.md)** - 完整的主题发布指南
- **[发布清单](docs/RELEASE-CHECKLIST.md)** - 发布前检查清单
- **[设计系统](docs/DESIGN-SYSTEM.md)** - 设计原则和定制指南

## 致谢

Clarity 基于 [Vimux](https://github.com/vimux) 开发的 [Mainroad](https://github.com/Vimux/Mainroad) 主题。

### 与 Mainroad 的主要区别

- ✨ 通过 `prefers-color-scheme` 添加了自动暗色模式支持
- 🎨 将所有颜色转换为 CSS 自定义属性
- 🚀 移除了旧版浏览器支持（IE8-11、Safari 6-8）
- 🧹 移除了过时的浏览器前缀（-webkit-、-ms-、-o-）
- 📱 更新浏览器支持至现代浏览器（2020+）
- 🎯 使用标准属性现代化 CSS

## 贡献

发现了 bug 或有新功能的想法？欢迎使用 [issue tracker](https://github.com/iron6909/clarity/issues) 告诉我。或者直接提交 [pull request](https://github.com/iron6909/clarity/pulls)。

## 许可证

本主题基于 [GPLv2 许可证](https://github.com/iron6909/clarity/blob/master/LICENSE.md)发布。

原 Mainroad 主题：版权所有 (C) Vimux - [GPLv2 许可证](https://github.com/Vimux/Mainroad/blob/master/LICENSE.md)
