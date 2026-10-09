+++
title = "Customizing Yassi: Colors, Fonts, and More"
date = 2024-01-30
summary = "Learn how to personalize the theme to match your brand and style preferences"
tags = ["tutorial", "customization", "css"]
categories = ["Documentation"]
+++

While Yassi looks great out of the box, you might want to customize it to match your personal brand or style preferences. The theme is built with customization in mind using CSS variables.

## Color Customization

All colors in Yassi are defined as CSS variables, making them easy to override. Create a file at `assets/css/custom.css` in your site root (not in the theme):

```css
:root {
  --link-color: #47b1db;
  --bg-primary: #ffffff;
  --bg-secondary: #f9f9f9;
  --text-primary: #111;
  --text-secondary: #333;
  --border-color: #e0e0e0;
}

[data-theme="dark"] {
  --link-color: #5fc9f0;
  --bg-primary: #1a1a1a;
  --bg-secondary: #242424;
  --text-primary: #e8e8e8;
  --text-secondary: #d1d1d1;
  --border-color: #3a3a3a;
}
```

Hugo will automatically include this file and your custom colors will override the defaults.

## Available Color Variables

Here are the main color variables you can customize:

- `--link-color` - Links and accent colors
- `--bg-primary` - Main background color
- `--bg-secondary` - Secondary background (cards, code blocks)
- `--bg-tertiary` - Tertiary background
- `--text-primary` - Primary text color
- `--text-secondary` - Secondary text color
- `--text-tertiary` - Tertiary text color (less emphasis)
- `--text-quaternary` - Quaternary text (metadata, captions)
- `--border-color` - Border colors
- `--border-light` - Lighter borders
- `--card-bg` - Card backgrounds
- `--code-bg` - Code block backgrounds
- `--code-text` - Inline code text color
- `--shadow-sm` - Small shadows
- `--shadow-md` - Medium shadows

## Typography

The theme uses the Mulish font family by default. You can override this by adding to your custom CSS:

```css
body {
  font-family: 'Your Font', system-ui, sans-serif;
}
```

Remember to load your custom font in your site's head if it's a web font.

## Layout Adjustments

You can also adjust layout dimensions:

```css
.content {
  max-width: 800px; /* Adjust content width */
}

.home-list-title {
  font-size: 22px; /* Adjust post title size */
}
```

## Adding Custom Styles

Any CSS you add to `assets/css/custom.css` will be included after the theme's styles, so you can override any styling you want.

## Tips for Customization

1. **Use browser DevTools** - Inspect elements to find the class names and current values
2. **Test both themes** - Make sure your customizations work in both light and dark modes
3. **Keep it subtle** - Small changes often have the biggest impact
4. **Back up first** - Keep a copy of your working configuration before making major changes

## Example: Brand Colors

Let's say your brand uses a specific color palette. Here's how you might apply it:

```css
:root {
  --link-color: #e74c3c;  /* Your brand red */
  --bg-primary: #ffffff;
  --text-primary: #2c3e50;  /* Your brand dark blue */
}

[data-theme="dark"] {
  --link-color: #ff6b6b;  /* Lighter red for dark mode */
  --bg-primary: #1a1a2e;  /* Dark blue-black */
  --text-primary: #eee;
}
```

This would give the theme a red accent with blue undertones, matching your brand while maintaining readability.

Happy customizing!
