## Why

Frühling is a standalone Hugo theme and should have its own regression checks independent from any consuming blog. Recent compatibility fixes touched partial lookup, multilingual footer rendering, language metadata, image metadata, and image transform error handling. These should be covered by a repeatable theme-local test command and CI.

## What Changes

- Add a theme-local test script that builds the bundled example site and performs regression assertions.
- Add generated fixture-site checks for footer fallback, shared multilingual gallery images, and guarded image transform failures.
- Add GitHub Actions automation that runs the theme tests from a clean theme checkout against supported Hugo versions.

## Capabilities

### New Capabilities

- `theme-regression-testing`: Requirements for local and CI regression coverage for the theme.

### Modified Capabilities

- None.

## Impact

- Affected code: `scripts/**`, `.github/workflows/**`, and OpenSpec change artifacts.
- Verification: local `scripts/test-theme.sh`, OpenSpec validation, and GitHub Actions matrix builds.
- Out of scope: parent `romkaeu` blog builds and content-specific integration testing.
