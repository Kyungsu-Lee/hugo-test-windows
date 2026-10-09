## ADDED Requirements

### Requirement: Theme tests run without parent site content
The theme SHALL provide a local regression test command that runs from a clean checkout of the theme repository without requiring the parent blog repository.

#### Scenario: Local test command runs from theme root
- **WHEN** `scripts/test-theme.sh` is run from the theme repository
- **THEN** it builds only theme-owned fixtures and the bundled example site
- **AND** it does not read content from a parent consuming site

### Requirement: Example site build is warning-clean
The regression tests SHALL build the bundled example site with Hugo warnings treated as failures.

#### Scenario: Example site build succeeds
- **WHEN** the regression test command builds `exampleSite`
- **THEN** Hugo exits successfully
- **AND** Hugo warnings fail the test run

### Requirement: Compatibility regressions are guarded statically
The regression tests SHALL fail when obsolete or unsafe template patterns return in theme-owned files.

#### Scenario: Deprecated template patterns return
- **WHEN** a theme template uses old `partials/` partial paths, deprecated language code APIs, deprecated site collection APIs, deprecated image EXIF access, direct image transforms outside the guarded helper, or a literal partial reference without a matching partial file
- **THEN** the regression test command fails and prints the matching file locations

### Requirement: Rendered output is sanity checked
The regression tests SHALL check rendered HTML for the behaviors fixed by current compatibility work.

#### Scenario: Rendered output is inspected
- **WHEN** the example site build completes
- **THEN** generated HTML contains no merge conflict markers
- **AND** English and Russian footer content are present
- **AND** gallery pages contain generated image outputs

### Requirement: Focused fixtures cover edge behavior
The regression tests SHALL include small generated fixture sites for edge behavior not fully covered by the example site.

#### Scenario: Footer fallback is tested
- **WHEN** a localized site has no footer page for a non-default language but has an English footer page
- **THEN** the non-default language output contains the English footer content

#### Scenario: Shared gallery images are tested
- **WHEN** translated gallery pages share the same image resource
- **THEN** both language outputs reference generated gallery image output successfully

#### Scenario: Malformed images do not abort the build
- **WHEN** a gallery contains an image resource that Hugo cannot transform
- **THEN** the build exits successfully
- **AND** the build log contains a warning for the skipped image transform

### Requirement: CI runs theme tests on supported Hugo versions
The theme SHALL provide GitHub Actions automation that runs the local regression test command against supported Hugo versions.

#### Scenario: CI matrix runs
- **WHEN** GitHub Actions runs for the theme repository
- **THEN** it checks out the theme repository
- **AND** installs Hugo Extended for each configured matrix version
- **AND** runs `scripts/test-theme.sh`
