## ADDED Requirements

### Requirement: Footer content renders for the active language
The theme SHALL render footer content from the `footer` content page matching the active site language when that page exists.

#### Scenario: English footer renders
- **WHEN** the English example-site homepage is built
- **THEN** the generated footer contains the English footer content from `content/footer/index.en.md`

#### Scenario: Russian footer renders
- **WHEN** the Russian example-site homepage is built
- **THEN** the generated footer contains the Russian footer content from `content/footer/index.ru.md`

### Requirement: Footer falls back to English
The theme SHALL render the English footer content when the active language does not have a matching footer page and English footer content exists.

#### Scenario: Missing localized footer uses English
- **WHEN** a language without a localized footer page is built
- **THEN** the generated footer contains the English footer content

### Requirement: Footer output preserves Markdown rendering
The theme SHALL render footer Markdown as Hugo-rendered HTML without adding invalid nested paragraph markup.

#### Scenario: Footer paragraph markup is valid
- **WHEN** footer Markdown content renders as a paragraph
- **THEN** the generated footer does not wrap that paragraph in an additional `<p>` element
