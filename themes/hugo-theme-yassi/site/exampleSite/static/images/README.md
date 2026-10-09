# Images Directory

Place your images here and reference them in your content front matter.

## Usage

For blog posts:

```toml
+++
title = "My Post"
main_image = "/images/post-cover.jpg"
+++
```

For projects:

```toml
+++
title = "My Project"
main_image = "/images/project-screenshot.png"
+++
```

For the cover image (avatar/logo):

In `hugo.toml`:

```toml
[params]
  CoverImage = "/images/avatar.png"
```

## Included Images

- `avatar.svg` - Default theme avatar (blue circle with "Y")

## Image Recommendations

- **Post covers**: 1200x630px (landscape)
- **Project images**: 800x600px or similar
- **Avatar/logo**: 300x300px (square)
- Format: JPG, PNG, or SVG
- Optimize images for web to reduce page load time

## Placeholder Services

If you need placeholder images for testing, consider:

- https://placeholder.com/
- https://picsum.photos/
- https://unsplash.com/

Example using a placeholder:

```toml
main_image = "https://picsum.photos/1200/630"
```
