## Context

The theme currently keeps partial templates in `layouts/partials` and often calls them with names such as `partials/shared/head.html`. Hugo 0.146 and newer treat this prefix as superfluous and current Hugo 0.163.3 fails to resolve these partials. Pull request `romka/fruhling#6` fixes the main lookup issue by moving partials to `layouts/_partials` and dropping the prefix, but it also contains unresolved conflict marker text in `opengraph.html`.

Issue `romka/fruhling#1` reports that example-site footer content does not render. Current footer lookup uses filesystem checks and absolute content paths, which is brittle across example sites and multilingual builds.

## Goals / Non-Goals

**Goals:**

- Make the theme example site build with Hugo 0.163.3.
- Keep partial lookup compatible with Hugo 0.146+ by using `layouts/_partials` and prefix-free partial names.
- Remove conflict marker leakage from Open Graph output.
- Render localized footer content in the example site for English and Russian.
- Reduce current Hugo deprecation warnings that are directly caused by theme/example code.

**Non-Goals:**

- Redesign the theme layout, CSS, JavaScript, or gallery UX.
- Add new runtime dependencies.
- Guarantee compatibility with every historical Hugo release before the existing `min_version`.
- Fully optimize the parent blog's large image build.

## Decisions

1. Use Hugo's current partial convention.

   Move theme partials from `layouts/partials` to `layouts/_partials` and update all `partial` and `partialCached` calls to omit the `partials/` prefix. This follows Hugo's current lookup behavior and matches the direction of PR #6.

2. Keep compatibility helpers as partials.

   Retain the small dispatcher partials for full-width and one-third-width posts after moving them. They keep list templates simple and are already part of the current theme structure.

3. Resolve `opengraph.html` manually instead of merging PR #6 verbatim.

   PR #6 builds but emits raw conflict-marker text into generated HTML. The implementation must preserve the intended `params.social.facebook_admin` behavior and remove all marker text.

4. Prefer page lookup over filesystem probing for the footer.

   Footer content is Hugo content, so lookup should use page APIs first. The footer partial will try the current language's footer page and fall back to English. It should render `.Content` without wrapping it in an extra paragraph, because Markdown content already produces paragraph markup.

5. Treat deprecation warnings as part of compatibility.

   The example config should use `locale` instead of deprecated `languageCode`, base layout should use `.Site.Language.Locale`, and image metadata reads should move from `.Exif` to `.Meta.Exif` where possible.

## Risks / Trade-offs

- Older Hugo versions may not support `layouts/_partials` or newer image metadata APIs in the same way. Mitigation: update `theme.toml` minimum version if verification shows the practical support floor has moved.
- Parent blog integration is image-heavy and can exhaust small temporary filesystems. Mitigation: run integration builds into a workspace-local or other large destination, not `/tmp`.
- Footer page lookup can differ for headless multilingual content. Mitigation: verify both English and Russian example-site output and use fallback behavior.
