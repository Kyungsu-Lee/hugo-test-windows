# Theme Screenshots

This directory must contain two images before submitting to the Hugo Themes gallery:

- **`screenshot.png`** — 1500×1000 px — full-page screenshot of the theme demo
- **`tn.png`** — 900×600 px — thumbnail used in the gallery grid

## How to generate them

1. Build the exampleSite:

   ```bash
   cd exampleSite
   hugo server --themesDir ../..
   ```

2. Open `http://localhost:1313` in a browser
3. Take a full-page screenshot at 1500×1000 and save as `images/screenshot.png`
4. Resize to 900×600 and save as `images/tn.png`

Both files must be committed to the repository before submitting a PR to [gohugoio/hugoThemes](https://github.com/gohugoio/hugoThemes).
