# Hugo Twitter Style

A Hugo theme that renders a blog like a current X/Twitter profile page. Posts are shown as timeline items with title, description, tags, and action icons. Clicking a post opens the full article.

![Hugo Twitter Style screenshot](https://raw.githubusercontent.com/Kyure-A/hugo-twitter-style/master/images/screenshot.jpg)

## Preview

```sh
npm test
```

The preview server runs at `http://127.0.0.1:1313/`.
If `hugo` is already available, the script uses it directly. Otherwise it falls back to `nix-shell -p hugo`.

## Profile

Set profile values in `hugo.toml`.

```toml
[params]
displayName = "Twitter Style Blog"
username = "twitter_style"
verified = true
bio = "Your profile bio."
location = "Tokyo"
website = "https://example.com/"
joined = "June 2026"
following = 42
followers = 1313
profileButtonText = "Edit profile"
profileButtonUrl = "/index.xml"
```

If `data/twitter.json` exists, `following_count` and `followers_count` override the manual `params` values.

## Free X Count Option

X API access is not required. For a free, official follower-count display, enable X's Follow Button widget:

```toml
[params]
xUsername = "your_x_handle"
xFollowButton = true
```

This lets X render the follow button and follower count client-side. X does not expose following count through that widget, so the theme keeps `following` as a manual value or reads it from `data/twitter.json`.

Sidebar suggestions can also be enriched without the X API:

```toml
[params]
enableXDynamic = true
```

```json
{
  "name": "Hugo",
  "handle": "gohugoio",
  "xUsername": "gohugoio",
  "url": "https://x.com/gohugoio"
}
```

This uses X's syndication JSONP endpoint for `name` and `followers_count`, and Unavatar for the avatar. The free syndication payload does not include `following_count`, so following count remains manual data.

For a more stable live follower count, use X's official follow button inside a suggestion:

```json
{
  "name": "Hugo",
  "xUsername": "gohugoio",
  "xFollowButton": true,
  "url": "https://x.com/gohugoio"
}
```

The official widget can show follower count, but it still does not expose following count.

If you want full profile data from an unofficial proxy, configure a URL template:

```toml
[params]
enableXDynamic = true
xProfileProxy = "https://api.fxtwitter.com/{username}"
```

The proxy should return JSON shaped like this:

```json
{
  "name": "Hugo",
  "screen_name": "gohugoio",
  "followers_count": 123456,
  "following_count": 12,
  "profile_image_url": "https://..."
}
```

When the proxy is configured, the theme uses it first and falls back to the free syndication/Unavatar behavior if the request fails. If both live sources fail, the rendered counts fall back to `0 Following` and `0 Followers`.
The bundled `exampleSite` uses FxTwitter's user endpoint by default; copy `.env.example` if you want to keep the same value documented for your own local setup.

## Sidebar Links

Configure the right column in `data/sidebar.json`. `suggestions` is intended for mutual links or recommended accounts. `trends` is for arbitrary links or notices.

```json
{
  "suggestionsTitle": "You might like",
  "suggestions": [
    {
      "name": "Hugo",
      "handle": "GoHugoIO",
      "note": "Mutual link",
      "url": "https://gohugo.io/"
    }
  ],
  "trendsTitle": "What’s happening",
  "trends": [
    {
      "meta": "Blog · Trending",
      "title": "Hugo Themes",
      "url": "https://themes.gohugo.io/"
    }
  ]
}
```

## Navigation

The left navigation defaults to meaningful blog links: Home, Explore, Articles, Profile, and RSS. Override it in `data/navigation.json`.

```json
{
  "items": [
    { "label": "Home", "icon": "home", "url": "/" },
    { "label": "Articles", "icon": "article", "url": "/posts/" }
  ]
}
```
