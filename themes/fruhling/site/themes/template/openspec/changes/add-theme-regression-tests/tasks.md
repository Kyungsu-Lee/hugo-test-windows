## 1. Test Entry Point

- [x] 1.1 Add `scripts/test-theme.sh` as the theme-local regression test command.
- [x] 1.2 Make the script independent from the parent blog repository.

## 2. Static Regression Guards

- [x] 2.1 Fail if old `partials/` partial names return.
- [x] 2.2 Fail if deprecated language, site collection, or image metadata APIs return.
- [x] 2.3 Fail if direct image transforms return outside the guarded helper.
- [x] 2.4 Fail if a literal partial reference has no matching file under `layouts/_partials`.

## 3. Rendered Output Checks

- [x] 3.1 Build `exampleSite` with supported Hugo and warnings treated as failures.
- [x] 3.2 Verify generated HTML contains no merge conflict markers.
- [x] 3.3 Verify English and Russian footer content render.
- [x] 3.4 Verify gallery pages render image outputs.

## 4. Focused Fixtures

- [x] 4.1 Add a generated footer fallback fixture.
- [x] 4.2 Add a generated shared multilingual gallery image fixture.
- [x] 4.3 Add a generated malformed image fixture proving image transform failures warn and do not abort the build.

## 5. CI Automation

- [x] 5.1 Add a GitHub Actions workflow that runs from the theme repository.
- [x] 5.2 Run tests against the minimum supported Hugo version.
- [x] 5.3 Run tests against a pinned current Hugo version.
- [x] 5.4 Run tests against the latest Hugo version.

## 6. Verification

- [x] 6.1 Run `scripts/test-theme.sh` locally.
- [x] 6.2 Run `openspec validate add-theme-regression-tests --strict`.
