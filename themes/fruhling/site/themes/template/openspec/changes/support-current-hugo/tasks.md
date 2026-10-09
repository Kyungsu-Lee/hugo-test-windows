## 1. OpenSpec Scope

- [x] 1.1 Keep OpenSpec artifacts rooted in `themes/fruhling`.

## 2. Hugo Partial Compatibility

- [x] 2.1 Move theme partial templates from `layouts/partials` to `layouts/_partials`.
- [x] 2.2 Update all partial and partialCached calls to remove the redundant `partials/` prefix.
- [x] 2.3 Confirm no old partial path references remain in theme templates.

## 3. Rendering Fixes

- [x] 3.1 Resolve Open Graph conflict-marker leakage while preserving facebook admin metadata behavior.
- [x] 3.2 Update footer lookup to render localized footer content with English fallback and valid paragraph markup.
- [x] 3.3 Guard theme image transformations so malformed images warn and skip instead of aborting the build.

## 4. Current Hugo Deprecations

- [x] 4.1 Replace deprecated language code configuration and template usage with current locale APIs.
- [x] 4.2 Replace deprecated image EXIF access with current image metadata access.
- [x] 4.3 Update theme metadata if the practical supported Hugo minimum version changes.

## 5. Verification

- [x] 5.1 Build the example site with Hugo 0.163.3.
- [x] 5.2 Verify generated HTML contains no conflict markers or stale partial lookup output.
- [x] 5.3 Verify English and Russian footer content render in the example site.
- [x] 5.4 Run OpenSpec validation for the change.
- [x] 5.5 Run a parent blog integration build if disk space allows.

Note: A parent blog `hugo --gc --minify` integration run completed successfully with Hugo 0.163.3 after clearing stale generated cache entries for `DSC01135`. It emitted only the parent blog's own deprecated `languageCode` config warning.
