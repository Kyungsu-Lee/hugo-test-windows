## ADDED Requirements

### Requirement: Theme builds on current Hugo
The theme SHALL build its example site successfully with Hugo 0.163.3 or newer within the supported Hugo version range.

#### Scenario: Example site build succeeds
- **WHEN** the example site is built with the current Hugo binary
- **THEN** the build exits successfully
- **AND** pages are generated for all configured languages

### Requirement: Theme uses current partial lookup
The theme SHALL use partial names and partial directories that current Hugo resolves without `partials/` prefix warnings or lookup failures.

#### Scenario: Partial lookup is compatible
- **WHEN** the example site is built with current Hugo
- **THEN** the build output contains no warnings about superfluous `partials/` prefixes
- **AND** no template fails because a partial cannot be found

### Requirement: Generated HTML contains no merge conflict markers
The theme SHALL NOT emit raw merge conflict markers or conflict resolution labels into generated HTML.

#### Scenario: Open Graph output is clean
- **WHEN** the example site is built
- **THEN** generated HTML files contain no `<<<<<<<`, `=======`, `>>>>>>>`, `Updated upstream`, or `Stashed changes` text

### Requirement: Current Hugo deprecations are addressed in theme-owned code
Theme-owned templates and the example site configuration SHALL avoid Hugo APIs that are deprecated in Hugo 0.163.3 when a current replacement exists.

#### Scenario: Compatibility warnings are reduced
- **WHEN** the example site is built with Hugo 0.163.3
- **THEN** the build output contains no deprecation warnings caused by `languageCode`, `.Site.LanguageCode`, `.Language.LanguageCode`, or `Image.Exif` usage in theme-owned files

### Requirement: Image processing failures are isolated
The theme SHALL isolate image transformation failures so one malformed or unsupported image resource does not abort rendering of the entire site.

#### Scenario: Gallery contains a malformed image
- **WHEN** Hugo fails to transform an image resource while rendering a gallery, story, embedded gallery, photomosaic, Open Graph image, or image shortcode
- **THEN** the theme emits a warning for that failed transform
- **AND** skips the affected image output
- **AND** continues rendering the rest of the site
