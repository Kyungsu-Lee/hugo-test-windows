# Hugo Theme Tokyo Terminal

![./images/Screenshot.png](https://github.com/rehan-hk/hugo-tokyo-night-terminal-theme/blob/main/images/screenshot.png)
![./images/Screenshot2.png](https://github.com/rehan-hk/hugo-tokyo-night-terminal-theme/blob/main/images/Screenshot2.png)
![./images/Screenshot3.png](https://github.com/rehan-hk/hugo-tokyo-night-terminal-theme/blob/main/images/Screenshot3.png)
![./images/Screenshot4.png](https://github.com/rehan-hk/hugo-tokyo-night-terminal-theme/blob/main/images/Screenshot4.png)
A minimal, terminal theme designed to look exactly like a retro terminal environment, utilizing the **Tokyo Night** color palette and **JetBrains Mono Nerd Font**.

## Features
- ASCII art.
- Pure Tokyo Night syntax highlighting.
- Blinking cursor animation on the homepage.
- 100% generic and configurable.

## Installation

1. Inside your Hugo project, run:
```bash
git submodule add https://github.com/rehan-hk/hugo-tokyo-night-terminal-theme.git themes/hugo-theme-tokyo-terminal
```

2. Update your `hugo.toml` to use the theme:
```toml
theme = "hugo-theme-tokyo-terminal"
```

## Configuration

Add your custom terminal prompt and social links to your `hugo.toml`:

```toml
[params]
  prompt = "rehan@dev:~$"
  
  [[params.social]]
    name = "github"
    url = "https://github.com/rehan-hk"
  [[params.social]]
    name = "linkedin"
    url = "https://linkedin.com/in/rehan-hk"
```

## License
MIT License.
