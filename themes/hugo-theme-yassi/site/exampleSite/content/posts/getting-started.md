+++
title = "Getting Started with Yassi Theme"
date = 2024-01-15
summary = "Learn how to set up and customize the Yassi theme for your Hugo site"
tags = ["tutorial", "hugo", "setup"]
categories = ["Documentation"]
+++

Welcome to Yassi! This post will guide you through the basic setup and configuration of the theme.

## Installation

Installing Yassi is straightforward. Add it as a submodule to your Hugo site:

```bash
git submodule add https://github.com/yourusername/yassi.git themes/yassi
```

Then update your `hugo.toml`:

```toml
theme = "yassi"
```

## Basic Configuration

The theme offers several configuration options in your `hugo.toml` file:

### Cover Image

Set your profile or brand image:

```toml
[params]
  CoverImage = "/images/avatar.png"
  CoverImageWidth = 150
```

### Project Display Mode

Choose between carousel or grid layout for your featured projects:

```toml
[params]
  useProjectCarousel = true  # false for grid mode
```

### Social Media

Add your social media links:

```toml
[params.social]
  github = "https://github.com/yourusername"
  twitter = "https://twitter.com/yourusername"
  linkedin = "https://linkedin.com/in/yourusername"
```

## Creating Content

### Blog Posts

Create posts in `content/posts/`:

```toml
+++
title = "My Post"
date = 2024-01-15
summary = "A brief description"
tags = ["tag1", "tag2"]
categories = ["category"]
+++

Your content here...
```

### Projects

Create projects in `content/projects/`:

```toml
+++
title = "My Project"
date = 2024-01-15
summary = "Project description"
featured = true
weight = 1
project_url = "https://example.com"
+++

Project details...
```

## Next Steps

- Explore the dark mode toggle in the navigation
- Try both carousel and grid layouts for projects
- Check out the word cloud views for tags and categories
- Customize the colors using CSS variables

Happy blogging!
