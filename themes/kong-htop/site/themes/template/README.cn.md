# Kong-Htop

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Hugo](https://img.shields.io/badge/Hugo-0.101.0+-179BD7?style=flat&logo=hugo)](https://gohugo.io)

**[English](./README.md) | [简体中文](./README.cn.md)**

> 一个优雅现代的 Hugo 主题，采用毛玻璃设计，基于 Poison 主题深度定制。

![Kong-Htop Theme](https://cdn.jsdelivr.net/gh/yezihack/assets/b/20251022154715.png)

## ✨ 特性

- 🎨 **毛玻璃设计** - 现代化的玻璃质感 UI 风格
- 🌓 **深色模式** - 自动切换主题，深度适配
- 📱 **完全响应式** - 完美支持桌面、平板、手机
- 🔍 **本地搜索** - 快速全文搜索，基于 JSON
- 🏷️ **标签云** - 动态标签可视化，悬停效果
- 📝 **时间线视图** - 按年份组织文章
- 🎲 **随机文章** - 随机发现内容
- ⚡ **高性能** - GPU 加速动画，优化的 CSS
- 📖 **KaTeX 支持** - 精美的数学公式
- 💬 **代码增强** - 一键复制，行号显示

## 🚀 快速开始

### 1. 安装主题

```bash
# 作为 Git 子模块添加（推荐）
git submodule add https://github.com/yezihack/kong-htop.git themes/kong-htop

# 或直接克隆
git clone https://github.com/yezihack/kong-htop.git themes/kong-htop
```

### 2. 配置

复制示例配置：

```bash
cp themes/kong-htop/exampleSite/hugo.toml ./
```

编辑 `hugo.toml`，填写您的站点信息：

```toml
baseURL = 'https://your-domain.com/'
title = "您的博客"
theme = "kong-htop"

[Author]
name = "您的名字"

[params]
    brand = "您的博客"
    description = "博客描述"
```

### 3. 创建内容

```bash
# 创建第一篇文章
hugo new posts/hello-world.md

# 创建关于页面
hugo new about/_index.md
```

### 4. 预览

```bash
hugo server
```

访问 `http://localhost:1313` 🎉

## 📝 撰写文章

创建文章：

```bash
hugo new posts/my-post.md
```

前置元数据示例：

```yaml
---
title: "文章标题"
date: 2024-01-15
description: "简短描述"
tags: ["标签1", "标签2"]
categories: ["分类"]
---

您的内容...
```

## 🎨 自定义

### 颜色

编辑 `hugo.toml`：

```toml
[params]
    # 浅色模式
    link_color = "#268bd2"
    text_color = "#222"
    
    # 深色模式
    link_color_dark = "#268bd2"
    text_color_dark = "#eee"
```

### 菜单

```toml
[params]
    menu = [
        {Name = "首页", URL = "/", HasChildren = false},
        {Name = "文章", URL = "/posts/", Pre = "最新", HasChildren = true, Limit = 5},
        {Name = "关于", URL = "/about/", HasChildren = false},
    ]
```

### 社交链接

```toml
[params]
    github_url = "https://github.com/username"
    twitter_url = "https://twitter.com/handle"
```

### 访客统计（可选）

启用不蒜子访客统计（默认关闭）：

```toml
[params]
    busuanzi_enable = true  # 启用页面访问量和访客数统计
```

## 📁 项目结构

```
your-site/
├── content/
│   ├── posts/          # 博客文章
│   └── about/          # 关于页面
├── static/
│   └── images/         # 图片
├── themes/
│   └── kong-htop/      # 本主题
└── hugo.toml           # 配置文件
```

## 🌍 多语言支持

示例站点包含 7 种语言的文章：

- 🇬🇧 英语, 🇨🇳 中文, 🇯🇵 日语, 🇰🇷 韩语
- 🇩🇪 德语, 🇫🇷 法语, 🇪🇸 西班牙语

查看 `exampleSite/content/posts/` 获取示例。

## 🔧 高级功能

### 搜索功能

搜索自动启用。只需创建：

```markdown
---
title: "搜索"
slug: "search"
outputs: ["html", "json"]
---
```

保存为 `content/search/_index.md`。

### 数学公式

使用 KaTeX 渲染数学公式:

```markdown
行内: $E = mc^2$

块级:
$$
\int_{a}^{b} f(x) dx
$$
```

### 代码块

语法高亮带复制按钮：

````markdown
```go
package main

func main() {
    println("你好！")
}
```
````

## 🚢 部署

构建站点：

```bash
hugo --minify
```

将 `public/` 文件夹部署到：
- **GitHub Pages**
- **Netlify**
- **Vercel**
- **您的服务器**

## 📖 文档

- 📚 [示例站点](exampleSite/) - 实时演示配置
- 🌐 [多语言文章](exampleSite/content/posts/) - 7 种语言示例
- ⚙️ [完整配置](exampleSite/hugo.toml) - 所有可用选项

## 🤝 贡献

欢迎提交问题和拉取请求！

## 📄 许可证

GPL-3.0 许可证。基于 [Poison](https://github.com/lukeorth/poison) 主题。

## 🙏 致谢

- [Poison 主题](https://github.com/lukeorth/poison) 作者 Luke Orth
- [Hyde](https://github.com/mdo/hyde) 设计灵感
- Hugo 社区

## 💬 支持

- 📖 [Hugo 文档](https://gohugo.io/documentation/)
- 🐛 [GitHub Issues](https://github.com/yezihack/kong-htop/issues)
- 💡 [讨论区](https://github.com/yezihack/kong-htop/discussions)

---

**创建者**: [Yezihack](https://github.com/yezihack)  
**版本**: 1.0.0
