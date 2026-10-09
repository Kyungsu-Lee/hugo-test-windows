+++
title = 'Add or Edit Shortcodes'
date = 2026-02-19T00:00:00Z
draft = false
authors = ['Sugam Pokharel']
toc = true
[build]
  list="never"
+++

**Sugo** theme comes with many shortcodes by default but sometimes you may want to modify some shortcode behaviour or even to add a new shortcode of your own. Changing the themes shotcodes may lead to error. Instead do the following. To modify a shortcode that comes built-in with the *Sugo* theme (or Hugo itself), you should mirror the theme's structure in your root directory.

1. Identify the shortcode name in `themes/sugo/layouts/shortcodes/`.
2. Create a matching file in your project root: `layouts/shortcodes/[name].html`.
3. Add your custom HTML and Go template logic.

{{< table headers="Action|Path to Edit|Result" caption="Overriding Logic" >}}
Modify Theme Shortcode|layouts/shortcodes/notice.html|Overrides the theme's version
Modify Hugo Internal|layouts/shortcodes/youtube.html|Overrides the default Hugo YouTube embed
{{< /table >}}
---

## Adding New Shortcodes

You can create custom components (like buttons, alerts, or specialized galleries) by adding new files to your local layouts folder.

- **File Location:** Create `.html` files in `layouts/shortcodes/`.
- **Naming:** Use lowercase names and hyphens (e.g., `custom-button.html`).
- **Accessing Parameters:** Use `.Get 0` for positional parameters or `.Get "name"` for named parameters.

### Example: Creating a "Warning" Alert
Create `layouts/shortcodes/alert.html`:
{{<codeblock lang="html">}}
<div class="custom-alert {{ .Get "type" }}">
  {{ .Inner | markdownify }}
</div>
{{</codeblock>}}