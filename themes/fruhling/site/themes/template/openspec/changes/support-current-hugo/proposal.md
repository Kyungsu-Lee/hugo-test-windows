## Why

Frühling currently fails to build with current Hugo releases because Hugo 0.146+ no longer resolves partial names with the redundant `partials/` prefix. The open footer issue and compatibility PR should be handled together so the theme builds, renders clean HTML, and keeps its example site useful as a regression fixture.

## What Changes

- Update theme partial organization and calls to work with current Hugo.
- Fix the footer rendering path so localized footer content appears in the generated pages.
- Remove raw conflict-marker leakage from Open Graph output.
- Update deprecated Hugo template/config usage that is now warned by Hugo 0.163.3 where it is inside the theme or example site.
- Keep the theme compatible with the existing example site and the parent blog integration site.

## Capabilities

### New Capabilities

- `hugo-theme-compatibility`: Requirements for building and rendering the theme on supported Hugo versions.
- `localized-footer`: Requirements for selecting and rendering footer content for multilingual sites.

### Modified Capabilities

- None.

## Impact

- Affected code: `layouts/**`, `exampleSite/config/**`, and theme metadata/docs as needed.
- Affected upstream items: GitHub issue `romka/fruhling#1` and pull request `romka/fruhling#6`.
- Verification: Hugo example-site build with Hugo 0.163.3, checks for footer content, checks for conflict markers, and a parent blog integration build where disk space allows.
