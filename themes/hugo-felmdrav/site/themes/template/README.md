# Felmdrav - A Hugo Theme

Felmdrav is a clean and minimalistic Hugo theme, built on the
[Bootstrap v5](https://getbootstrap.com/) CSS framework.

Felmdrav originates from **Tikva**, a theme originally developed by the author for **Grav CMS** and later ported to **Hugo**.
The Hugo version of Tikva was based on **Bootstrap 4** and selectively incorporated concepts from a parallel Bootstrap-based **WordPress** implementation of the same theme.

The Tikva theme for Hugo remains available but is now considered **deprecated**.

When migrating the Hugo theme from Bootstrap 4 to **Bootstrap 5**, it became clear that the required changes would not be backward-compatible. In addition to the framework upgrade, several structural improvements were introduced, including a more flexible grid system, configurable sidebars, updated icon handling, and additional content blocks.

To clearly distinguish this modernized Hugo theme from its predecessor, the project was renamed to **Felmdrav**, which is now the **Bootstrap 5–based successor of Tikva for Hugo**.

## Philosophy

Felmdrav aims to stay:

* minimal in structure
* explicit in configuration
* easy to reason about
* flexible without becoming complex

Most layout behavior is controlled through clear configuration options, avoiding hidden defaults or implicit logic wherever possible.

## Features

* Responsive, mobile-first design based on **Bootstrap 5**
* Flexible **grid system** using Bootstrap’s 12-column layout
* Configurable **sidebars** with global defaults and per-page overrides
* Support for **one-, two- and three-column layouts**
* Integration of **Bootstrap Icons** (no Font Awesome dependency)
* Multiple built-in visual styles, including selected **Bootswatch** themes
* Reusable **content blocks** (e.g. hero sections, feature/icon blocks)
* Context-aware **content listing system** with recursive sections, sorting, and aggregation via front matter
* Customizable typography settings, including **Google Fonts** support
* Flexible footer and optional subfooter areas
* Optional analytics integration (Google Analytics, Matomo)
* Support for custom CSS and JavaScript via placeholder partials


Felmdrav requires Hugo ≥ 0.146.0, as it is based on the new directory and template structure introduced in recent Hugo versions.


## Demo

A live demo of the theme, based on the included `exampleSite`, is available here:

[https://geschke.github.io/hugo-felmdrav/](https://geschke.github.io/hugo-felmdrav/).


## Quick Start

### Install the theme

Inside the `themes` directory of your Hugo site, clone the repository:

```bash
cd themes
git clone https://github.com/geschke/hugo-felmdrav.git
```

Alternatively, you can add the theme as a Git submodule:

```bash
git submodule add https://github.com/geschke/hugo-felmdrav themes/hugo-felmdrav
```

Then reference the theme in your site configuration:

```toml
theme = "hugo-felmdrav"
```

### Run the example site

The repository includes a fully configured `exampleSite` which demonstrates
the available features of the theme.

From the repository root, run:

```bash
hugo server \
  --source exampleSite \
  --themesDir .. \
  --theme hugo-felmdrav
```

Then open:

```
http://localhost:1313/
```


## Documentation

Detailed documentation is available in the /docs directory:

- [Configuration](docs/configuration.md)
- [Layout & Sidebars](docs/layout-and-sidebars.md)
- [Footer & Subfooter (Sections)](docs/footer-and-subfooter.md)
- [Content Blocks](docs/blocks/README.md)
- [Content Lists](docs/content-lists.md)
- [Typography](docs/typography.md)
- [Image Processing](docs/images.md)
- [Analytics](docs/analytics.md)
- [Menus & Taxonomies](docs/menus-and-taxonomies.md)
- [Migration from Tikva](docs/migration-from-tikva.md)



## License

Open sourced under the [MIT license](./LICENSE.md).

## Contributing

If you find a bug or have an idea for a feature, feel free to use the [issue tracker](https://github.com/geschke/hugo-felmdrav/issues) to let me know.

## Thanks to / Used third-party components

* The [Bootstrap](https://getbootstrap.com) project, which is licensed under the MIT license
* [Bootstrap Icons](https://icons.getbootstrap.com/)
* Thomas Park and the contributors of the [Bootswatch](https://bootswatch.com/) project
* Image render hook from [hugo-theme-bootstrap](https://github.com/razonyang/hugo-theme-bootstrap) by Razon Yang
