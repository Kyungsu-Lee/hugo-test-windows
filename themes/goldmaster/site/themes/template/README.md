# Goldmaster Hugo Theme

[![Built with Hugo](https://img.shields.io/badge/Built%20with-Hugo-blue?logo=hugo)](https://gohugo.io/)
[![View on GitLab](https://img.shields.io/badge/View%20on-GitLab-orange?logo=gitlab)](https://gitlab.com/goldmaster/goldmaster)
[![GitLab Issues](https://img.shields.io/gitlab/issues/open/71404595?label=Issues)](https://gitlab.com/goldmaster/goldmaster/-/issues)
[![GitLab Stars](https://img.shields.io/gitlab/stars/71404595?label=Stars)](https://gitlab.com/goldmaster/goldmaster)
[![GitLab Merge Requests](https://img.shields.io/gitlab/merge-requests/open/71404595?label=Merge%20Requests)](https://gitlab.com/goldmaster/goldmaster/-/merge_requests)
[![Licence: MIT](https://img.shields.io/badge/Licence-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Follow me on Mastodon](https://img.shields.io/mastodon/follow/808468?domain=mastodon.social&amp;label=Follow)](https://mastodon.social/@Goldmaster)
[![Follow @Goldmaster.site](https://img.shields.io/badge/follow-@Goldmaster.site-whitesmoke?style=social&amp;logo=bluesky)](https://bsky.app/profile/goldmaster.site)
[![Subscribe on YouTube](https://img.shields.io/youtube/channel/subscribers/UC35fsKHvM-YmfReY-sE5usQ?label=Subscribe)](https://www.youtube.com/channel/UC35fsKHvM-YmfReY-sE5usQ?sub_confirmation=1)

A clean, responsive, and feature-rich Hugo theme designed for music artists, DJs, developers, and creators. It offers multiple layouts for different content types like news, discography, and project portfolios.

![screenshot](https://gitlab.com/goldmaster/goldmaster/-/raw/main/images/screenshot.png)

## ⚠️ Disclaimer & Important Notes

> This is a personal project created to solve a specific need. Important considerations:
>
> - **Best Effort Support:** Issues will be addressed on a best-effort basis; fixes are not guaranteed.
> - **Contributions Welcome:** Developers with experience are encouraged to submit merge requests to improve the theme.

## 🚀 Features

- **Fully Responsive:** Looks great on desktops, tablets, and mobile devices.
- **Dark Mode:** Automatic dark mode that respects the visitor's system preference.
- **Multiple Content Layouts:** Homepage grid, News/Blog microblogging-style layout, filterable Discography grid using MusicBrainz data, two-level Side Projects structure, and grid-based Photo Galleries with lightbox.
- **Breadcrumb Navigation:** Automatically generated for navigation through nested content.
- **Customisable:** Navigation, footer links, and styles can be easily customised.
- **SEO Friendly:** Generates a sitemap and RSS feeds automatically.
- **Clean Code:** Well-structured and commented HTML and CSS for easy customisation.
- **Custom 404 Page:** Customised "Not Found" page with [Wayback Archive](https://wayback.archive.org) integration.
- **Add To Any:** Enables sharing of blog posts and music releases on social media and other services.
- **Automatic rel="me" Support:** Automatically adds verification attributes to federated social media links (Mastodon, Flipboard, Tumblr, etc.) when URLs are configured in `hugo.toml`, enabling seamless [domain verification](https://joinmastodon.org/verification) and [Author Attribution](https://blog.joinmastodon.org/2024/07/highlighting-journalism-on-mastodon).


## 📑 Table of Contents

- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [How It Works](#-how-it-works)
- [Usage](#-usage)
- [API](#-api)
- [Acknowledgements and Support](#-acknowledgements-and-support)
- [Contributing](#-contributing)
- [Licence](#-licence)

## 📋 Prerequisites

- [Hugo](https://gohugo.io)
  - **Windows:** `winget install Hugo.Hugo.Extended`
  - **Linux:** `sudo apt install hugo` or `sudo dnf install hugo`
- A basic understanding of Hugo's content structure
- [Node.js](https://nodejs.org) (for running the discography script)
  - **Windows:** `winget install OpenJS.NodeJS`
  - **Linux:** `sudo apt install nodejs` or `sudo dnf install nodejs`
- MusicBrainz artist ID (optional, for discography feature)

## 📥 Installation

1.  **Add the theme:** Inside the Hugo site's root directory, run:
   ```sh
   git clone https://gitlab.com/goldmaster/goldmaster.git themes/goldmaster
   ```

2.  **Configure Hugo:** Add the theme to the site's `hugo.toml` configuration file, by adding the following line.

    **`hugo.toml`**
    ```toml
    theme = "goldmaster"
    ```

## ⚙️ Configuration

### Basic Configuration

Set up the basic information for the site in the `hugo.toml` file:

```toml
# hugo.toml
baseURL = "https://EXAMPLE.COM"
languageCode = "en-gb"
title = "WEBSITE NAME"
theme = "goldmaster"

[params]
  description = "A DISCRIPTION OF THE WEBSITE."
  author = "NAME"

# Define the sections to be displayed on the homepage grid
mainSections = ["news", "discography", "side-projects"]

[taxonomies]
  category = "CATEGORIES"
  tag = "TAGS"
```

### Navigation Menu

Navigation links are configured in `hugo.toml` using Hugo's built-in menu system.

**Example `hugo.toml` configuration:**
```toml
# In the hugo.toml file

[[menu.main]]
  name = "News"
  url = "/news/"
  weight = 10

[[menu.main]]
  name = "SUBDOMAIN"
  url = "HTTPS://SUBDOMAIN.EXAMPLE.COM"
  weight = 20
```

- **`name`**: The text that appears in the menu.
- **`url`**: The destination path. For internal pages, use a relative path like `/news/`. External links or subdomains **must** use the full URL, including `https://`.
- **`weight`**: A number that determines the order of the links (lower numbers appear first).

### Footer Links

The footer is split into two columns: `Music` and `Socials`. Two separate menus in `hugo.toml` are configured for this: `footer_music` and `footer_socials`.
**Example `hugo.toml` configuration:**
```toml
# In the hugo.toml file

# --- Footer Music Links ---
[[menu.footer_music]]
  name = "Spotify"
  url = "https://play.spotify.com/artist/SPOTIFY-ARTIST-ID"
  weight = 10
  [menu.footer_music.params]
    icon = "images/music/spotify.svg"

# --- Footer Socials Links ---
[[menu.footer_socials]]
  name = "mastodon"
  url = "https://mastodon.social/@USERNAME"
  weight = 10
  [menu.footer_socials.params]
    icon = "images/socials/mastodon.svg"
    rel = "me"
```

### Analytics (GoatCounter)

Privacy-friendly analytics are enabled by adding to `hugo.toml`:

```toml
[params.goatcounter]
  code = "YOUR-CODE-HERE"
```

The tracking script is added only when a code is provided.

### Add To Any Configuration

Create an `add-to-any.config.json` file in the website root to configure sharing buttons:

```json
{
  "buttons": ["mastodon", "signal", "email", "bluesky", "telegram", "reddit"],
  "use_page_title_and_url": true,
  "num_services": 10
}
```

**Configuration Options:**
- **`buttons`**: Array of service codes to display
- **`use_page_title_and_url`**: Automatically use page title and URL for sharing
- **`email_to_address`**: Default email address for email sharing
- **`num_services`**: Number of services to show initially (default: 8)
- **`show_menu_on_click`**: Show menu only after clicking share button
- **`no_script`**: Use basic HTML links instead of JavaScript

Available services are listed on the [AddToAny services page](https://www.addtoany.com/services).

## 🔧 How It Works

This theme combines Hugo's static site generation with external data sources (MusicBrainz, Archive.org) to create a comprehensive artist and creator portfolio. The architecture includes:

- **Hugo Templates:** Responsive layouts built with semantic HTML and CSS for different content types
- **Data Integration:** JavaScript helper scripts fetch release data from MusicBrainz and cover art from Archive.org
- **Navigation System:** Breadcrumbs, menus, and footer links configurable through TOML
- **Content Organisation:** Multiple sections (news, discography, projects, photos) with their own layout templates
- **Dark Mode:** CSS media queries detect and respect user's system preference
- **Customisation:** Override any template by copying it to your site's `layouts/` directory while keeping your changes separate from the theme

Run `hugo server` to test locally, which renders all content into a `/public` directory. This directory can be uploaded to the web server's `public_html` folder.

## ▶️ Usage

### News

Create markdown files inside `content/news/`:

**Example:** `content/news/POST-TITLE-NO-SPACES.md`
```markdown
---
title: "POST TITLE"
date: 2024-01-15T10:00:00+00:00
draft: false
description: "A SHORT SUMMARY OF THIS POST."
---

THIS IS THE CONTENT OF THIS POST.
```

### Terms Page

If you want the footer "Terms" link to appear, create a `terms.md` file in the site content root.

**Example:** `content/terms.md`
```markdown
---
title: "Terms"
date: 2024-08-31
---

Add your terms, privacy notice, or legal information here.
```

The footer will automatically show a link to `/terms/` when this file exists.

### Discography

The discography page is automatically generated from a data file using the **MusicBrainz API** for metadata and the **Archive.org API** for cover art.

**Setup Steps:**

1. **Find the MusicBrainz Artist ID:** Go to [MusicBrainz.org](https://musicbrainz.org), search for the artist name, and navigate to the artist page. The URL format is `https://musicbrainz.org/artist/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`. Copy the ID from the URL.

2.  **Create `discography.config.json`:** In the folder with `hugo.toml`, create a configuration file:
    ```json
    {
      "artist_id": "ARTIST_ID_HERE",
      "user_agent": "USER_AGENT_NAME/1.0 ( EMAIL@DOMAIN.com )",
      "release_types": "album|ep|single|dj-mix"
    }
    ```

3.  **Run the script:** Open a command prompt or terminal and navigate to the project's root directory. Then, run the script using Node.js:
    ```sh
    node themes/goldmaster/static/js/fetch-discography.js
    ```
    This script fetches release data from the **MusicBrainz API** and cover art from the **Archive.org API**, then creates or updates the `static/data/discography.json` file.

### Side Projects

Side projects are configured similarly to the discography. Categories are created as subdirectories under `content/side-projects/`.

```
content/side-projects/
├── website/
│   └── project-a.md
└── cgi/
    └── project-b.md
```

### Photo Galleries

Galleries are created by adding subdirectories to `content/photos/`. Each subdirectory represents a gallery, with individual photos as markdown files:

```
content/
└── photos/
    └── my-first-gallery/
        ├── photo-1.md
        └── photo-2.md
```

Photos stored outside the website can be linked by editing the markdown files with direct image links.

### Overriding Theme Files

It is possible to override any theme file by creating a file with the same name in the same location within the site's root directory. For example, to change the header, copy `themes/goldmaster/layouts/partials/header.html` to `layouts/partials/header.html` and edit it.

This is the recommended way to make changes, as it keeps site customisations separate from the theme and makes it easier to update the theme in the future simply by running [`git clone`](https://gitlab.com/Goldmaster/goldmaster#installation) again.

## 🔌 API

This theme utilises the **MusicBrainz API** and **Archive.org API**. While the included script implements polite rate-limiting, please respect these free community resources by running the fetch script only when adding new releases or at most once per week.

## 🙏 Acknowledgements and Support

This theme is proudly built with [Hugo](https://gohugo.io) and relies on data from the communities at [MusicBrainz](https://musicbrainz.org) and the [Internet Archive](https://archive.org).

Those using this theme are encouraged to support these essential open-source and non-profit projects:

- 💸 **[Donate to MetaBrainz, the team behind Musicbrainz](https://metabrainz.org/donate)**
- 💸 **[Donate to the Internet Archive](https://archive.org/donate)**

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Merge Request

## 📄 Licence

This theme is released under the [MIT Licence](https://opensource.org/licenses/MIT).