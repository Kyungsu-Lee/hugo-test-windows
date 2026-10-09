+++
title = 'Deployment'
date = 2026-02-19T00:00:00Z
draft = false
authors = ['Sugam Pokharel']
toc = true
[build]
  list="never"
+++

If you already have experience hosting hugo static sites on the internet, you can skip this documentation. If you don't, I'd advise following these steps correctly. Deployments often leads to stupid errors that one feels shouldn't occur but often do. 

*Sugo* theme uses **pagefind** which a node package to index the files and make the search function work. If you don't want the search feature, the deployment process is a bit easier.

We will discuss how to deploy your site in [Github pages](#github-pages), [Vercel](#vercel), [Netlify](#netlify) and [Cloudeflare Pages](#cloudflare-pages).

## Github Pages

1. Go to your github repository **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Go to **Actions**→ **New Workflow** and search for hugo. Github automatically generates a hugo.yml at `your-hugo-site/.github/workflows/hugo.yml`
4. If you have disabled the search option for your hugo blog. Leave the hugo yml as it is. However, keep in mind that there is a `HUGO_VERSION` env in hugo.yml. Update its value to the same value as in your *hugo.toml* which is probably 0.146.0. 
5. If you have enabled the search option for your hugo blog. Replace the hugo.yml with the following:

{{<codeblock lang="yml">}}
# Sample workflow for building and deploying a Hugo site to GitHub Pages
name: Deploy Hugo site to Pages

on:
  push:
    branches: ["master"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

defaults:
  run:
    shell: bash

jobs:
  build:
    runs-on: ubuntu-latest
    env:
      HUGO_VERSION: 0.146.0
    steps:
      - name: Install Hugo CLI
        run: |
          wget -O ${{ runner.temp }}/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb \
          && sudo dpkg -i ${{ runner.temp }}/hugo.deb

      - name: Install Dart Sass
        run: sudo snap install dart-sass

      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: recursive

      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v5

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install Node.js dependencies
        run: npm ci

      - name: Build with Hugo
        env:
          HUGO_CACHEDIR: ${{ runner.temp }}/hugo_cache
          HUGO_ENVIRONMENT: production
        run: |
          hugo --gc --minify \
            --baseURL "${{ steps.pages.outputs.base_url }}/"

      - name: Build search index with Pagefind
        run: npx -y pagefind --site public --output-path public/pagefind

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4

{{</codeblock>}}
6. Now when you go to the `Actions` section of your github repo, your hugo site is probably building. If it is not, you can build manually. 
Note: You may sometimes encounter errors in deployment if there is no `package-lock.json` file in your repo. If there is no such file, just enter ```npm install``` and it will appear automatically. 

## Vercel

Vercel does have a hugo preset but it is recommended that you add a little `vercel.json` at the root of your site.
{{<codeblock lang="json">}}
{
    "builds": [
        {
            "src": "package.json",
            "use": "@vercel/static-build",
            "config": {
                "distDir": "public"
            }
        }
    ],
    "framework": null,
    "buildCommand": "npm run build",
    "outputDirectory": "public",
    "cleanUrls": true,
    "trailingSlash": false,
    "ignoreCommand": "git diff --quiet HEAD^ HEAD ./"
}
{{</codeblock>}}

As you can see, the `vercel.json` refers to the `package.json` file. You have already encountered it if you followed this guide or set up the search feature. If you haven't, it is as the root of the *Sugo* theme. Move it thence to the root of your hugo site. It should look something like this:

{{<codeblock lang="json">}}
{
  "name": "mytheme-site",
  "private": true,
  "scripts": {
    "dev": "hugo server --disableFastRender",
    "build:hugo": "hugo --gc --minify",
    "build:search": "npx -y pagefind --site public --output-path public/pagefind",
    "build": "hugo --gc --minify && npx -y pagefind --site public --output-path public/pagefind"
  },
  "devDependencies": {
    "hugo-extended": "^0.146.0"
  }
}
{{</codeblock>}}

1. **Via Vercel Dashboard**:
   - Import your Git repository
   - Vercel auto-detects configuration
   - Click **Deploy**

2. **Via CLI**:
   {{<codeblock lang="bash" >}}
   npm i -g vercel
   vercel
   {{</codeblock >}}

## Netlify

Netlify offers continuous deployment with built-in form handling and serverless functions.


Create `netlify.toml` in your project root:

{{<codeblock lang="toml" >}}
[build]
  publish = "public"
  command = "hugo --minify && npx pagefind --site public --output-path public/pagefind"

[build.environment]
  HUGO_VERSION = "0.146.0"
  NODE_VERSION = "20"

[[redirects]]
  from = "/pagefind/*"
  to = "/pagefind/:splat"
  status = 200
{{</codeblock >}}

Deploy: 

1. **Via Netlify Dashboard**:
   - Connect your Git repository
   - Build settings are auto-detected from `netlify.toml`
   - Click **Deploy site**

2. **Via CLI**:
   {{<codeblock lang="bash" >}}
   npm i -g netlify-cli
   netlify deploy --prod
   {{</codeblock >}}

## Cloudflare Pages
 
 Cloudeflare pages noawadays require a wrangler command. Just using the build command will lead to errors. If you want to host your site on cloudeflare pages, add a `wrangler.jsonc` at the root of your site.

{{<codeblock lang="jsonc" >}}
{
  "name": "my-check-site", # or whatever you want
  "compatibility_date": "2026-02-22",
  "assets": {
    "directory": "./public",
    "not_found_handling": "404-page" # the custom 404 page will not work if this is not included
}
}
{{</codeblock>}}

1. **Connect Repository**:
   - Go to Cloudflare Dashboard → **Pages**
   - Click **Create a project**
   - Connect your Git repository

2. **Build Settings**:
   - **Framework preset**: None
   - **Build command**: `npm run build`
   - **Wrangler command**: `npx wrangler deploy`
   - **Build output directory**: `public`
   - **Environment variables**:
     - `HUGO_VERSION`: `0.146.0`
     - `NODE_VERSION`: `20`

Deploy

- Push to your repository's main branch
- Cloudflare Pages automatically builds and deploys
