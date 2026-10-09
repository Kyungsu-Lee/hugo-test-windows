+++
title = 'List of Params in hugo.toml config file'
date = 2026-02-19T00:00:00Z
draft = false
authors = ['Sugam Pokharel']
toc = true
[build]
  list="never"
+++

This page lists all parameters currently present in the theme `hugo.toml` and what they do. Some major parameters and their workings have already been described in more detail [here](../09-Params-and-Customization/)

## Root-level params

{{<table headers="Parameter|Description|Example" caption="Root-level Hugo parameters">}}
baseURL|Base URL used when generating absolute links.|`https://example.org/`
languageCode|Default language code for the site.|`en-US`
title|Global site title shown in headers and metadata.|`My New Hugo Site`
readingSpeed|Words-per-minute value used to calculate `.ReadingTime`.|`212`
{{</table>}}

## Taxonomies (`[taxonomies]`)

{{<table headers="Parameter|Description|Example" caption="Taxonomy mapping">}}
tag|Singular key mapped to plural taxonomy URL for tags.|`tag = "tags"`
category|Singular key mapped to plural taxonomy URL for categories.|`category = "categories"`
author|Singular key mapped to plural taxonomy URL for authors.|`author = "authors"`
{{</table>}}

## Menu item params (`[[menus.main]]`)

The `[[menus.main]]` block is repeated for each menu item.

{{<table headers="Parameter|Description|Example" caption="Menu item fields">}}
name|Text shown in the menu.|`name = 'Home'`
pageRef|Internal content path reference used for local links.|`pageRef = '/posts'`
url|External URL for menu items linking outside the site.|`url = 'https://www.google.com/'`
weight|Sort order in menu; lower values appear first.|`weight = 20`
identifier|Unique ID used to attach child items for dropdowns.|`identifier = 'about'`
parent|Identifier of parent menu item for nested dropdown entries.|`parent = 'about'`
params.target|Optional link target such as `_blank` for new tab.|`params={target="_blank"}`
{{</table>}}

## Permalink params (`[permalinks]`)

{{<table headers="Parameter|Description|Example" caption="Permalink patterns">}}
posts|URL pattern for content in `posts` section.|`/:year/:month/:slug/`
substack|URL pattern for content in `substack` section.|`/:year/:month/:slug/`
docs|URL pattern for content in `docs` section.|`/:year/:month/:slug/`
{{</table>}}

## Module version params (`[module.hugoVersion]`)

{{<table headers="Parameter|Description|Example" caption="Hugo version constraints">}}
extended|Whether extended Hugo build is required by module metadata.|`false`
min|Minimum Hugo version required by this theme.|`0.146.0`
{{</table>}}

## Goldmark renderer params (`[markup.goldmark.renderer]`)

{{<table headers="Parameter|Description|Example" caption="Goldmark renderer">}}
unsafe|Allows raw HTML rendering inside Markdown content.|`true`
{{</table>}}

## Related content params (`[related]`)

{{<table headers="Parameter|Description|Example" caption="Related-content engine">}}
includeNewer|Allow newer posts to be included in related suggestions.|`true`
threshold|Minimum relevance score for a page to be considered related.|`80`
toLower|Normalize terms to lowercase for matching.|`true`
{{</table>}}

## Related index params (`[[related.indices]]`)

The `[[related.indices]]` block is repeated for each index rule.

{{<table headers="Parameter|Description|Example" caption="Related index fields">}}
name|Taxonomy or field used for related matching.|`tags`, `categories`, `date`
weight|Relative importance of this index in score calculation.|`100`
pattern|Date format pattern used when `name = "date"`.|`2006`
{{</table>}}

## General params (`[params]`)

{{<table headers="Parameter|Description|Example" caption="General theme params">}}
paginationSize|Number of items shown per paginated list page.|`6`
summaryLength|Maximum summary length used in cards and lists.|`180`
{{</table>}}

## Feature toggles (`[params.features]`)

{{<table headers="Parameter|Description|Example" caption="Feature flags">}}
enableSearch|Shows or hides site search UI and behavior.|`false`
enableBackToTop|Shows or hides back-to-top button on pages.|`true`
enablePagination|Enables pagination on list pages.|`true`
enableThemeToggle|Shows or hides light/dark toggle button.|`true`
enableMath|Allows MathJax on pages that request math rendering.|`true`
enableBreadcrumbs|Shows or hides breadcrumb trail.|`true`
enableRelatedPosts|Shows or hides related posts section.|`true`
fixedThemeWhenToggleOff|Theme forced when toggle is disabled (`light` or `dark`).|`light`
{{</table>}}

## UI params: Header and Theme (`[params.ui]`)

{{<table headers="Parameter|Description|Example" caption="Header and theme UI labels">}}
titleSeparator|Separator used in `<title>` between page title and site title.|` | `
skipLinkText|Accessible skip-link text for keyboard users.|`Skip to main content`
primaryNavAriaLabel|ARIA label for primary navigation.|`Primary`
brandKicker|Small kicker text above main site title.|`Literary Journal`
navToggleText|Text label for mobile menu toggle.|`Menu`
navToggleAriaLabel|ARIA label for navigation toggle button.|`Toggle navigation`
themeStorageKey|LocalStorage key used to persist selected theme.|`mytheme-color-scheme`
themeDefault|Default theme when no user preference exists.|`light`
themeToggleLabelDarkMode|Toggle text when action is switching to dark mode.|`Dark`
themeToggleLabelLightMode|Toggle text when action is switching to light mode.|`Light`
themeToggleAriaToDark|ARIA label when toggle will switch to dark.|`Switch to dark mode`
themeToggleAriaToLight|ARIA label when toggle will switch to light.|`Switch to light mode`
{{</table>}}

## UI params: Search (`[params.ui]`)

{{<table headers="Parameter|Description|Example" caption="Search UI labels">}}
searchToggleText|Text label on header search button.|`Search`
searchToggleAriaLabel|ARIA label for opening search dialog.|`Open search`
searchDialogTitle|Heading and ARIA label used in search dialog.|`Search`
searchCloseLabel|Text and ARIA label for closing search dialog.|`Close search`
searchPlaceholder|Placeholder text inside search input.|`Search posts`
searchNoResultsText|Text shown when zero results are found.|`No results found`
searchEmptyPrompt|Hint text shown before typing search terms.|`Search by title, subtitle...`
searchLoadFailedText|Fallback message if Pagefind assets/index are missing.|`Search index is not available...`
searchLoadingText|Temporary text while search UI initializes.|`Loading search...`
searchResultLabel|Singular label used in result count.|`result`
searchResultsLabel|Plural label used in result count.|`results`
{{</table>}}

## UI params: Breadcrumb, Archive, Related, Back to Top (`[params.ui]`)

{{<table headers="Parameter|Description|Example" caption="Navigation and utility UI labels">}}
breadcrumbAriaLabel|ARIA label for breadcrumb navigation.|`Breadcrumb`
breadcrumbHomeLabel|Label for home item in breadcrumb trail.|`Home`
breadcrumbSeparator|Character/string used between breadcrumb items.|`/`
breadcrumbCurrentFallback|Fallback label for current page breadcrumb.|`Current page`
archiveEyebrow|Eyebrow text shown above archive heading.|`Archive`
archiveHeading|Main archive page heading text.|`All writing`
archiveCountSuffix|Suffix after yearly archive post count.|`articles`
archiveEmptyMessage|Message shown when archive has no entries.|`No entries available...`
relatedHeading|Section heading for related posts.|`Related writing`
relatedCta|Call-to-action text in related post cards.|`Read article`
backToTopAriaLabel|ARIA label for back-to-top button.|`Go to top`
backToTopTitle|Title attribute text for back-to-top button.|`Go to top`
backToTopIcon|Icon or symbol text shown inside back-to-top button.|`?`
backToTopShowOffset|Scroll offset before back-to-top appears.|`520`
{{</table>}}

## UI params: Fonts, Home, Lists, Pagination, TOC (`[params.ui]`)

{{<table headers="Parameter|Description|Example" caption="Layout, typography, and content UI labels">}}
fontPreconnectPrimary|First preconnect URL for web font performance.|`https://fonts.googleapis.com`
fontPreconnectSecondary|Second preconnect URL for font asset host.|`https://fonts.gstatic.com`
fontStylesheetHref|Font stylesheet URL loaded by theme.|`https://fonts.googleapis.com/css2?...`
mathJaxScript|MathJax script URL used for math-enabled pages.|`https://cdn.jsdelivr.net/...`
homeEditorHeading|Heading for editor intro block on home page.|`From the Editor`
homeFeaturedEyebrow|Eyebrow label above featured post block.|`Featured Story`
homeFeaturedCta|CTA text for featured post button/link.|`Read featured story`
homeLatestEyebrow|Eyebrow label above latest posts area.|`Latest Writing`
homeLatestHeading|Heading for latest posts section.|`Recent Articles`
sectionEyebrow|Eyebrow label for section list pages.|`Collection`
taxonomyEyebrow|Eyebrow label for taxonomy list pages.|`Browse`
articleCardCta|CTA label used in article cards.|`Read more...`
paginationAriaLabel|ARIA label for pagination navigation.|`Pagination`
paginationPrevLabel|Text label for previous-page pagination link.|`Previous`
paginationNextLabel|Text label for next-page pagination link.|`Next`
tocHeading|Table of contents section heading text.|`Table of Contents`
tocStartLevel|Minimum heading level included in TOC.|`2`
tocEndLevel|Maximum heading level included in TOC.|`4`
tocOrdered|Whether TOC should render as ordered list.|`false`
{{</table>}}

## UI params: Article, Footer, and Shortcodes (`[params.ui]`)

{{<table headers="Parameter|Description|Example" caption="Article, footer, and shortcode UI labels">}}
articleFallbackType|Fallback label when content type is unavailable.|`Article`
articleByLabel|Label before article author names.|`By`
articlePublishedLabel|Label before publish date.|`Published`
articleUpdatedLabel|Label before updated date.|`Updated`
articleReadingTimeLabel|Label before reading-time value.|`Reading time`
articleMinReadLabel|Unit label for reading time.|`min read`
articlePostNavAriaLabel|ARIA label for previous/next post navigation.|`Post navigation`
articlePrevLabel|Label for previous post link.|`Previous`
articleNextLabel|Label for next post link.|`Next`
articleShareHeading|Heading text for share section.|`Share this article`
articleShareAriaLabel|ARIA label for share section.|`Share this article`
articleCommentsHeading|Heading text for comments section.|`Comments`
articleCommentsAriaLabel|ARIA label for comments section.|`Comments`
articleCommentsEnableJsLabel|Noscript message for comments providers needing JS.|`Please enable JavaScript...`
footerTagline|Footer tagline text.|`Essays, criticism...`
footerCopyright|Footer copyright template text (`{year}` is replaced).|`Copyright {year}...`
shortcodeCollapseTitle|Default title for collapse shortcode.|`Click to expand`
shortcodeCardsDefaultTitle|Default card title for cards shortcode.|`Card`
shortcodeTabsDefaultTitle|Default title for tabs shortcode.|`Tab`
shortcodeAccordionDefaultTitle|Default section title for accordion shortcode.|`Section`
shortcodeTableCaptionPrefix|Prefix text used in table shortcode captions.|`Table:`
shortcodeSocialLinksHeading|Heading used by social-links shortcode.|`Social Media Links`
shortcodeSlideshowPrevLabel|Label for previous-slide button.|`Previous slide`
shortcodeSlideshowNextLabel|Label for next-slide button.|`Next slide`
shortcodeCodeCopyLabel|Button label before code is copied.|`Copy`
shortcodeCodeCopiedLabel|Button label after successful code copy.|`Copied`
shortcodeCodeFailedLabel|Button label when code copy fails.|`Failed`
{{</table>}}

## Taxonomy label params (`[params.ui.taxonomyLabels]`)

{{<table headers="Parameter|Description|Example" caption="Displayed taxonomy names">}}
categories|Label text used for categories taxonomy.|`Categories`
tags|Label text used for tags taxonomy.|`Tags`
authors|Label text used for authors taxonomy.|`Authors`
{{</table>}}

## Archive behavior params (`[params.archive]`)

{{<table headers="Parameter|Description|Example" caption="Archive settings">}}
sections|Sections included in archive listing.|`["posts"]`
groupBy|Date format token used for archive grouping.|`2006`
showYearCount|Show or hide yearly post counts.|`true`
{{</table>}}

## Related-post display params (`[params.related]`)

{{<table headers="Parameter|Description|Example" caption="Related-post display settings">}}
count|Maximum related posts displayed per article.|`3`
sameSectionOnly|Restrict related posts to same section when true.|`true`
summaryLength|Maximum summary length in related cards.|`145`
showSummary|Show or hide summary text in related cards.|`true`
{{</table>}}

## Share params (`[params.share]`)

{{<table headers="Parameter|Description|Example" caption="Share network settings">}}
networks|Ordered list of social networks shown in share bar.|`["x", "facebook", ...]`
{{</table>}}

## Comment provider params (`[params.comments]`)

{{<table headers="Parameter|Description|Example" caption="Comment system toggle">}}
enabled|Globally enable or disable comments rendering.|`false`
provider|Active provider key (`giscus` or `disqus`).|`giscus`
{{</table>}}

## Giscus params (`[params.comments.giscus]`)

{{<table headers="Parameter|Description|Example" caption="Giscus provider settings">}}
repo|GitHub repository in `owner/repo` format.|`owner/repo`
repoId|Giscus repository ID from giscus.app.|`R_xxx`
category|GitHub Discussions category name.|`General`
categoryId|Giscus category ID from giscus.app.|`DIC_xxx`
mapping|Rule for mapping page URL to discussion thread.|`pathname`
strict|Whether mapping should be strict.|`0`
reactionsEnabled|Enable GitHub reactions in discussion widget.|`1`
emitMetadata|Emit metadata to discussion thread.|`0`
inputPosition|Comment input position in widget.|`bottom`
theme|Giscus theme setting.|`preferred_color_scheme`
lang|Giscus UI language code.|`en`
loading|Widget loading behavior.|`lazy`
{{</table>}}

## Disqus params (`[params.comments.disqus]`)

{{<table headers="Parameter|Description|Example" caption="Disqus provider settings">}}
shortname|Disqus shortname used to load embed script.|`your-disqus-shortname`
{{</table>}}

## Design tokens (`[params.design]`)

{{<table headers="Parameter|Description|Example" caption="Global design tokens">}}
fontDisplay|Display/heading font-family stack.|`"Cormorant Garamond", ...`
fontBody|Body text font-family stack.|`"Libre Baskerville", ...`
fontUi|UI/control font-family stack.|`"DM Sans", ...`
radiusSm|Small border radius token.|`0.35rem`
radiusMd|Medium border radius token.|`0.7rem`
containerMax|Max width for wide layout container.|`1120px`
contentMax|Max width for main content area.|`1000px`
bodyOverlayOpacity|Opacity for body background overlay layers.|`0.35`
bodyOverlayLinear|Linear gradient layer used in page background.|`linear-gradient(...)`
bodyOverlayRadial|Radial gradient layer used in page background.|`radial-gradient(...)`
colorAdmonitionNote|Accent color for note admonitions.|`#4f7ca8`
colorAdmonitionTip|Accent color for tip admonitions.|`#3f8a5f`
colorAdmonitionInfo|Accent color for info admonitions.|`#2f7d99`
colorAdmonitionWarning|Accent color for warning admonitions.|`#b77b2e`
colorAdmonitionDanger|Accent color for danger admonitions.|`#a23b3b`
{{</table>}}

## Light theme palette (`[params.design.light]`)

{{<table headers="Parameter|Description|Example" caption="Light-mode color tokens">}}
colorBg|Background color token for light mode.|`#f2ece1`
colorSurface|Primary surface color in light mode.|`#fbf7f0`
colorSurfaceStrong|Stronger/elevated surface color in light mode.|`#f4ede1`
colorText|Primary text color in light mode.|`#1e1a16`
colorMuted|Muted text color in light mode.|`#6b6158`
colorAccent|Primary accent color in light mode.|`#7b2d26`
colorAccentSoft|Soft accent color used for highlights.|`#bc9a62`
colorBorder|Border color token in light mode.|`#d7ccbb`
shadowSoft|Soft box-shadow token in light mode.|`0 14px 30px ...`
{{</table>}}

## Dark theme palette (`[params.design.dark]`)

{{<table headers="Parameter|Description|Example" caption="Dark-mode color tokens">}}
colorBg|Background color token for dark mode.|`#151513`
colorSurface|Primary surface color in dark mode.|`#1d1d1a`
colorSurfaceStrong|Stronger/elevated surface color in dark mode.|`#262622`
colorText|Primary text color in dark mode.|`#f3ede3`
colorMuted|Muted text color in dark mode.|`#c2b7a8`
colorAccent|Primary accent color in dark mode.|`#d8926a`
colorAccentSoft|Soft accent color used for highlights.|`#e7bf78`
colorBorder|Border color token in dark mode.|`#3c3a34`
shadowSoft|Soft box-shadow token in dark mode.|`0 14px 28px ...`
{{</table>}}

## Math passthrough params (`[markup.goldmark. extensions.passthrough]`)

{{<table headers="Parameter|Description|Example" caption="Math passthrough settings">}}
enable|Enable passthrough delimiters for math content.|`true`
{{</table>}}

## Math delimiter params (`[markup.goldmark.extensions. passthrough.delimiters]`)

{{<table headers="Parameter|Description|Example" caption="Math delimiter lists">}}
block|Block-level math delimiters preserved by Goldmark.|`[["$$","$$"],["\\[","\\]"]]`
inline|Inline math delimiters preserved by Goldmark.|`[["$","$"],["\\(","\\)"]]`
{{</table>}}
