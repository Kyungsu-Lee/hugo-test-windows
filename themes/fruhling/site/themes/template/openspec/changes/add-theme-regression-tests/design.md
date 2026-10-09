## Context

The theme must be testable from a clean checkout of `romka/fruhling`. Tests cannot depend on the parent `romkaeu` repository, its content, or its generated resource cache.

## Decisions

1. Use a shell script as the single local test entry point.
   This keeps the theme dependency-free and works in GitHub Actions without introducing a language-specific test runner.

2. Build `exampleSite` with `--panicOnWarning`.
   The example site is the theme's primary fixture. Treating warnings as failures catches Hugo deprecations and template warnings early.

3. Generate focused fixture sites in a temporary directory.
   Footer fallback and malformed image handling are easier to prove with tiny purpose-built sites than by expanding the example site.

4. Keep OpenSpec validation separate from the normal test script.
   Theme users and GitHub Actions should not need the OpenSpec CLI just to validate the theme. Maintainers can run OpenSpec validation locally.

5. Test Hugo version compatibility in CI.
   CI should run against the theme minimum supported Hugo version, a pinned current version, and the latest available Hugo release.

## Risks

- The `latest` Hugo CI job can fail when Hugo introduces a breaking change. That is intentional; the pinned current and minimum-version jobs distinguish upstream drift from regressions against declared support.
- The script uses `ripgrep` for static assertions. CI installs it when missing; local failures report the missing dependency clearly.
