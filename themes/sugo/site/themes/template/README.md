# SUGO
**Sugo** is a Hugo theme for building clean, content-focused websites. It is basic enough but comes with a host of custom shortcodes. For complete documentation, see [here](https://sugo-docs.pokharelsugam19.workers.dev/docs)



## Requirements

- [Hugo](https://gohugo.io/) (latest version recommended)
- Git

---

## Installation

There are three ways to install SUGO. For full installation instructions, refer to the [Installation documentation](https://sugo-docs.pokharelsugam19.workers.dev/docs/01-Installation/).

### Option 1: Git Submodule

```bash
git submodule add https://github.com/psugam/sugo.git themes/sugo
```

Then set the theme in your `hugo.toml`:

```toml
theme = "sugo"
```

### Option 2: Git Clone

```bash
cd themes
git clone https://github.com/psugam/sugo.git
```

Then set the theme in your `hugo.toml`:

```toml
theme = "sugo"
```

### Option 3: Hugo Module

Initialize your site as a Hugo module:

```bash
hugo mod init github.com/your-username/your-site
```

Then add the following to your `hugo.toml`:

```toml
[module]
  [[module.imports]]
    path = "github.com/psugam/sugo"
```


---

## Getting Started

After installing the theme, copy the contents of `themes/sugo/exampleSite/` to the root of your Hugo site to get a working starting configuration. Then run the development server:

```bash
hugo server -D
```

Visit `http://localhost:1313` to preview your site.

---


## License

This project is open source. See the [LICENSE](LICENSE) file for details.