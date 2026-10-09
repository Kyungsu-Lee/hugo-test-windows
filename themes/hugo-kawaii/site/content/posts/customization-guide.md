---
title: "Complete Customization Guide"
date: 2024-01-10T09:15:00Z
description: "Learn how to customize every aspect of your Kawaii theme"
tags: ["tutorial", "customization", "hugo"]
---

The **Kawaii** theme is designed to be highly customizable while maintaining its beautiful aesthetics. This guide will walk you through all the ways you can make the theme truly yours.

## Configuration Options

### Basic Site Settings

```toml
# hugo.toml
baseURL = "https://yoursite.com"
languageCode = "en-us"
title = "Your Amazing Site"
theme = "kawaii"

[params]
  description = "Your site description"
  author = "Your Name"
```

### Theme-Specific Settings

```toml
[params]
  # Enable/disable features
  theme_toggle = true      # Dark mode toggle
  search = true           # Search functionality
  
  # Favicon
  favicon = "/favicon.ico"
  
  # Hero section
  hero_cta = "Get Started"
  hero_cta_link = "/getting-started"
```

## Color Customization

### Using CSS Variables

The easiest way to customize colors is by overriding CSS variables:

```css
/* assets/css/custom.css */
:root {
  --kawaii-primary: #your-color;
  --kawaii-secondary: #your-color;
  --kawaii-accent: #your-color;
}
```

### Common Color Overrides

```css
/* Brand colors */
:root {
  --kawaii-primary: #e91e63;        /* Pink to custom */
  --kawaii-secondary: #3f51b5;      /* Blue to custom */
  --kawaii-accent: #009688;         /* Teal to custom */
}

/* Background colors */
:root {
  --kawaii-bg-primary: #ffffff;     /* Main background */
  --kawaii-bg-secondary: #f8f9fa;   /* Secondary background */
}
```

## Typography Customization

### Changing Fonts

```css
/* Custom fonts */
:root {
  --kawaii-font-family: 'Your Font', sans-serif;
  --kawaii-font-mono: 'Your Mono Font', monospace;
}

/* Import your fonts */
@import url('https://fonts.googleapis.com/css2?family=Your+Font:wght@300;400;500;600;700&display=swap');
```

### Typography Scale

```css
/* Customize heading sizes */
h1 { font-size: 3rem; }      /* Default: 2.5rem */
h2 { font-size: 2.25rem; }   /* Default: 2rem */
h3 { font-size: 1.75rem; }   /* Default: 1.5rem */
```

## Layout Customization

### Homepage Sections

Configure featured sections in your `hugo.toml`:

```toml
[[params.featured_sections]]
  title = "Your Feature"
  description = "Feature description"
  icon = "🚀"
  link = "/your-link"
```

### Navigation Menu

```toml
[menu]
  [[menu.main]]
    name = "Home"
    url = "/"
    weight = 10
  
  [[menu.main]]
    name = "Blog"
    url = "/blog"
    weight = 20
```

## Social Links

```toml
[[params.social]]
  name = "github"
  url = "https://github.com/yourusername"

[[params.social]]
  name = "twitter"
  url = "https://twitter.com/yourusername"

[[params.social]]
  name = "linkedin"
  url = "https://linkedin.com/in/yourusername"
```

## Advanced Customization

### Custom Layouts

Create custom layouts by copying theme files to your site:

```bash
# Copy and modify layouts
cp themes/kawaii/layouts/_default/single.html layouts/_default/
```

### Custom Partials

Add custom functionality with partials:

```html
<!-- layouts/partials/custom-header.html -->
<div class="my-custom-header">
  <!-- Your custom content -->
</div>
```

### Custom CSS

Add your own styles:

```css
/* assets/css/custom.css */
.my-custom-class {
  /* Your styles */
}

/* Override existing styles */
.kawaii-post-card {
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
}
```

### Custom JavaScript

Add custom functionality:

```javascript
// assets/js/custom.js
document.addEventListener('DOMContentLoaded', function() {
  // Your custom JavaScript
});
```

## Content Customization

### Post Front Matter

Enhance your posts with custom front matter:

```yaml
---
title: "Your Post Title"
date: 2024-01-15T10:00:00Z
description: "Post description"
tags: ["tag1", "tag2"]
featured_image: "/images/featured.jpg"
author: "Author Name"
---
```

### Custom Shortcodes

Create reusable content components:

```html
<!-- layouts/shortcodes/callout.html -->
<div class="kawaii-callout kawaii-callout-{{ .Get 0 }}">
  {{ .Inner | markdownify }}
</div>
```

Use in content:
```markdown
{{/* callout "info" */}}
This is an info callout!
{{/* /callout */}}
```

## Performance Optimization

### Image Optimization

```html
<!-- Use Hugo's image processing -->
{{ $image := .Page.Resources.GetMatch "featured.jpg" }}
{{ $processed := $image.Resize "800x" }}
<img src="{{ $processed.RelPermalink }}" alt="{{ .Title }}">
```

### CSS/JS Minification

```toml
# hugo.toml
[minify]
  disableCSS = false
  disableJS = false
  disableHTML = false
```

## Deployment Configuration

### Netlify

```toml
# netlify.toml
[build]
  command = "hugo --minify"
  publish = "public"

[build.environment]
  HUGO_VERSION = "0.120.0"
```

### Vercel

```json
{
  "build": {
    "env": {
      "HUGO_VERSION": "0.120.0"
    }
  },
  "scripts": {
    "build": "hugo --minify"
  }
}
```

## Troubleshooting

### Common Issues

1. **CSS not loading**: Check file paths and Hugo version
2. **JavaScript errors**: Ensure jQuery isn't conflicting
3. **Images not displaying**: Verify image paths and formats

### Debug Mode

Enable Hugo's debug mode:

```bash
hugo server --debug --verbose
```

## Getting Help

- **Documentation**: Check the theme docs
- **GitHub Issues**: Report bugs and feature requests
- **Community**: Join our Discord server
- **Examples**: Browse the example site code

---

*Remember: The best customization respects the theme's design principles while making it uniquely yours!*