+++
title = 'Installation'
date = "2026-02-19T00:00:00Z"
slug="01-Installation"
draft = false
authors = ['Sugam Pokharel']
toc = true
[build]
  list="never"
+++

This guide walks you through installing the **Sugo** theme for Hugo.

Repository: [github.com/psugam/sugo](https://github.com/psugam/sugo)

## Prerequisites

Before installing Sugo, make sure you have:

{{<table headers="Requirement|Minimum Version" caption="System Requirements">}}
Hugo Extended|0.146.0+
Git|2.0+
Node.js|18.0+
npm|9.0+
{{</table>}}

### Verify installation

{{<codeblock lang="bash">}}
hugo version
{{</codeblock>}}

Expected format:

{{<codeblock lang="text">}}
hugo v0.146.0+extended ...
{{</codeblock>}}

Make sure this is the **Extended** Hugo build.

{{<codeblock lang="bash">}}
git --version
node --version
npm --version
{{</codeblock>}}

## Installation methods

### Option A: Git submodule (recommended)

#### 1. Initialize git

{{<codeblock lang="bash">}}
cd your-hugo-site
git init
{{</codeblock>}}

#### 2. Add theme submodule

{{<codeblock lang="bash">}}
git submodule add https://github.com/psugam/sugo themes/sugo
{{</codeblock>}}

#### 3. Copy starter content/config

{{<codeblock lang="bash">}}
cp -r themes/sugo/content ./
cp -r themes/sugo/hugo.toml ./
{{</codeblock>}}

{{<admonition type="warning" title="Important">}}
If your site already has conflicting `content` or config values, merge carefully instead of blindly replacing files.
{{</admonition>}}

#### 4. Set theme name

In your root `hugo.toml`:

{{<codeblock lang="toml">}}
theme = "sugo"
{{</codeblock>}}

#### 5. Run locally

{{<codeblock lang="bash">}}
npm install
npm run dev
{{</codeblock>}}

### Option B: Manual download

1. Download ZIP from [github.com/psugam/sugo](https://github.com/psugam/sugo)
2. Extract it
3. Move it to `themes/sugo`

{{<codeblock lang="bash">}}
mv sugo-main your-hugo-site/themes/sugo
{{</codeblock>}}

Then follow the same config and run steps above.

## Updating the theme

### Submodule update

{{<codeblock lang="bash">}}
git submodule update --remote --merge
{{</codeblock>}}

### Manual update

1. Download latest release/source
2. Replace `themes/sugo`
3. Review changes before deploy

## Next steps

- [Homepage](../02-Homepage/)
- [Params and Customization](../09-Params-and-Customization/)
- [Search](../11-Search/)
