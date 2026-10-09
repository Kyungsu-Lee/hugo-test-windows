# Kopi Hugo Theme

Kopi is a Hugo theme with a two-column magazine layout, system-driven dark mode, Turbo-based page navigation, and Mermaid diagram support. It compiles SCSS with Dart Sass, so it requires the **Extended** build of Hugo.

[![Deploy Demo to GitHub Pages](https://github.com/bect/kopi/actions/workflows/deploy.yml/badge.svg)](https://github.com/bect/kopi/actions/workflows/deploy.yml)

**[Live Demo](https://bect.github.io/kopi/)**

[![Theme Screenshot](https://raw.githubusercontent.com/bect/kopi/main/images/screenshot.png)](https://bect.github.io/kopi/)

## Requirements

Hugo **Extended** version `0.157.0` or higher.

## Installation

Choose one of the three setup routes below.

### 1. New Hugo blog

Start a site from scratch and add the theme as a submodule:

```bash
hugo new site your-blog
cd your-blog
git init
git submodule add https://github.com/bect/kopi.git themes/kopi
echo "theme: 'kopi'" >> hugo.yaml
hugo server -D
```

### 2. Existing Hugo blog

Add the theme to a site you already have:

```bash
git submodule add https://github.com/bect/kopi.git themes/kopi
```

Then set the theme in `hugo.yaml`:

```yaml
theme: 'kopi'
```

### 3. Deploy to GitHub Pages instantly

The theme ships a ready-to-use deployment workflow at
`exampleSite/.github/workflows/deploy.yml`. Copy it into your repo and push —
no local theme setup required.

```bash
# inside your site's repository
mkdir -p .github/workflows
cp /path/to/kopi/exampleSite/.github/workflows/deploy.yml .github/workflows/
git add .github/workflows/deploy.yml
git push
```

Then complete the setup in GitHub:

1. Push the site's repository to GitHub (your site lives at the repo root).
2. In **Settings → Pages**, set *Build and deployment* → *Source* to **GitHub Actions**.
3. Push a commit to `main` (or run the workflow manually from the **Actions** tab).

The workflow makes these fallbacks so a bare site always builds with Kopi:

- If `themes/kopi` is not present (or not added as a submodule), the workflow
  clones `https://github.com/bect/kopi.git` into `themes/kopi`.
- If no `theme` is configured, or `theme` points to any other theme, the
  workflow forces `theme: 'kopi'` in `hugo.yaml`/`config.yaml`/`config.toml`
  (or creates `hugo.yaml` if no config file exists).

## Configuration

Add the following to your site's `hugo.yaml`. See `exampleSite/hugo.yaml` for a full example.

```yaml
baseURL: 'https://example.com/'
languageCode: 'en-US'
title: 'Your Site Title'
theme: 'kopi'

params:
  subtitle: 'Your site subtitle or tagline'
  author:
    name: "Your Name"
    bio: "A short bio about yourself."
    link: "#" # Link to your profile or about page
    role: "Your Role"

menus:
  main:
    - name: 'Home'
      pageRef: '/'
      weight: 10
    - name: 'About'
      url: '/about'
      weight: 20

mediaTypes:
  application/radio+json:
    suffixes:
      - json

outputFormats:
  RADIO:
    mediaType: application/radio+json
    baseName: radio
    isPlainText: true
    notAlternative: true

outputs:
  home:
    - HTML
    - RSS
    - JSON
    - RADIO
```

## Radio Widget

The radio widget is controlled by your site's `hugo.yaml`.

- **Enable**: add `RADIO` to the `outputs` list for the home page (shown in the configuration above).
- **Disable**: remove `RADIO` from the `outputs` list:

  ```yaml
  outputs:
    home:
      - HTML
      - RSS
      - JSON
  ```

**Customize the playlist**: edit `/data/radio.yaml` using this format per station:

```yaml
- title: "Station Name"
  description: "A short description of the station."
  stream_url: "https://stream.url/here"
  location: "City, Country"
  website_url: "https://station-website.com"
```

## License

This theme is licensed under the **MIT License**. See the LICENSE file for more details.

## Acknowledgements

- Turbo.js for the fast navigation.
- Mermaid.js for diagram rendering.