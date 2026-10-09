# Yassi Theme Example Site

This is an example site demonstrating the Yassi Hugo theme. It showcases all the key features including the timeline blog layout, dark mode, project carousel, and more.

## Running the Example Site

To view this example site locally:

1. Make sure you have Hugo installed (version 0.100.0 or later)

2. Navigate to the exampleSite directory:

```bash
cd themes/yassi/exampleSite
```

3. Run Hugo server with the theme:

```bash
hugo server --themesDir ../.. --buildFuture
```

4. Open your browser to `http://localhost:1313`

### Troubleshooting

If you don't see any content:

- Make sure you're in the `exampleSite` directory when running the command
- Try running `hugo --themesDir ../..` first to build the site, then check the `public/` directory
- Clear your browser cache
- Make sure the theme path is correct (the command above should work from exampleSite)

## What's Included

### Content

- **Home Page** - Introduction with featured projects carousel
- **About Page** - Theme information and features
- **Blog Posts** - 4 example posts demonstrating the timeline layout
- **Projects** - 5 example projects (3 featured, 2 regular)

### Configuration

The `hugo.toml` file includes all the main configuration options:

- Site metadata
- Theme parameters (carousel mode, social links)
- Menu configuration
- Taxonomy setup

### Features Demonstrated

1. **Timeline Blog Layout** - See the chronological post display with interactive dots
2. **Dark Mode** - Toggle between light and dark themes (top right)
3. **Featured Projects** - Carousel showing 3 featured projects on home page
4. **Word Cloud Taxonomies** - Visit `/tags/` or `/categories/` to see word clouds
5. **Responsive Design** - Resize your browser to see mobile adaptations
6. **Social Links** - Example social media icons in the home page
7. **Category Badges** - Posts display categories as badges

## Customizing for Your Site

Use this example as a starting point:

1. Copy the structure to your own site
2. Modify `hugo.toml` with your information
3. Replace the example content with your own
4. Add your own images to `static/images/`
5. Customize colors in `assets/css/custom.css` (optional)

## Image Placeholders

This example doesn't include actual images. To add them:

1. Place images in `static/images/`
2. Add `main_image` parameter to post/project front matter:

```toml
main_image = "/images/my-image.jpg"
```

## Need Help?

Refer to the main theme README for detailed documentation on all configuration options and features.
