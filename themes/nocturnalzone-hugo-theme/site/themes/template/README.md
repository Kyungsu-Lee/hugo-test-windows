# NocturnalZone — Hugo Theme

A Hugo theme for quiet journals, technical notes, and editorial writing — dark, restrained, and unhurried.

![NocturnalZone screenshot](https://raw.githubusercontent.com/noxyzone/nocturnalzone-hugo-theme/main/images/screenshot.png)

## Features

- calm editorial layout for journals, notes, and essays
- prominent home intro with restrained typography
- article lists with understated metadata and concise summaries
- optional thumbnail support for list pages
- dark palette with generous spacing and minimal chrome

## Requirements

- Hugo `0.147.7` or later

## Installation

Place the theme in your site's `themes` directory as `nocturnalzone`.
The repository name is `nocturnalzone-hugo-theme`, but it should be installed as `nocturnalzone`.

```bash
git clone https://github.com/noxyzone/nocturnalzone-hugo-theme themes/nocturnalzone
```

Then enable it in your Hugo config:

```toml
theme = 'nocturnalzone'
```

## Configuration

Optional navigation menu:

```toml
[menus]
[[menus.main]]
name = 'Home'
pageRef = '/'
weight = 10

[[menus.main]]
name = 'Posts'
pageRef = '/posts'
weight = 20
```

## Example Site

Run the bundled example site from the repository root:

```bash
hugo --source exampleSite --themesDir ../.. --theme nocturnalzone-hugo-theme server
```

See [exampleSite/hugo.toml](https://github.com/noxyzone/nocturnalzone-hugo-theme/blob/main/exampleSite/hugo.toml) for a working configuration and menu setup.

## Demo

Live demo: [NocturnalZone](https://www.nocturnalzone.com/)

## License

Released under the [MIT License](https://github.com/noxyzone/nocturnalzone-hugo-theme/blob/main/LICENSE).
