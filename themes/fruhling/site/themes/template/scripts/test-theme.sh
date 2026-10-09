#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
THEME_ROOT=$(cd -- "$SCRIPT_DIR/.." && pwd)
THEME_PARENT=$(dirname -- "$THEME_ROOT")
TMP_DIR=$(mktemp -d)

cleanup() {
    rm -rf "$TMP_DIR"
}
trap cleanup EXIT

fail() {
    printf 'ERROR: %s\n' "$*" >&2
    exit 1
}

require_command() {
    command -v "$1" >/dev/null 2>&1 || fail "Required command not found: $1"
}

run_hugo() {
    local log_file=$1
    shift

    if ! hugo "$@" >"$log_file" 2>&1; then
        cat "$log_file" >&2
        return 1
    fi
}

assert_file_contains() {
    local file=$1
    local text=$2

    if ! grep -Fq -- "$text" "$file"; then
        fail "Expected $file to contain: $text"
    fi
}

assert_no_file_contains_regex() {
    local path=$1
    local pattern=$2
    local description=$3
    local matches="$TMP_DIR/matches.txt"

    if rg -n "$pattern" "$path" >"$matches"; then
        printf 'Unexpected %s:\n' "$description" >&2
        cat "$matches" >&2
        exit 1
    fi
}

assert_no_html_contains_regex() {
    local path=$1
    local pattern=$2
    local description=$3
    local matches="$TMP_DIR/html-matches.txt"

    if rg -n -g '*.html' "$pattern" "$path" >"$matches"; then
        printf 'Unexpected %s:\n' "$description" >&2
        cat "$matches" >&2
        exit 1
    fi
}

assert_static_partials_exist() {
    local missing="$TMP_DIR/missing-partials.txt"
    local partial_name
    local direct_path
    local html_path

    : >"$missing"

    while IFS= read -r partial_name; do
        direct_path="$THEME_ROOT/layouts/_partials/$partial_name"
        html_path="$direct_path.html"

        if [[ ! -f "$direct_path" && ! -f "$html_path" ]]; then
            printf '%s\n' "$partial_name" >>"$missing"
        fi
    done < <(
        rg -No 'partial(Cached)?[[:space:]]+"[^"]+"' "$THEME_ROOT/layouts" \
            | sed -E 's/.*partial(Cached)?[[:space:]]+"([^"]+)".*/\2/' \
            | sort -u
    )

    if [[ -s "$missing" ]]; then
        printf 'Missing partial templates:\n' >&2
        cat "$missing" >&2
        exit 1
    fi
}

write_fixture_config() {
    local site_dir=$1

    cat >"$site_dir/hugo.toml" <<'EOF'
baseURL = "https://example.org/"
title = "Fruhling fixture"
theme = "fruhling"
defaultContentLanguage = "en"
disableKinds = ["rss", "sitemap", "taxonomy", "term"]

[markup.goldmark.renderer]
unsafe = true

[params]
robots_txt_disallow_all = false
remark_enabled = false

[languages]
  [languages.en]
    title = "Fruhling fixture"
    locale = "en-US"
    weight = 1
  [languages.ru]
    title = "Fruhling fixture RU"
    locale = "ru-RU"
    weight = 2
EOF
}

write_fixture_home_pages() {
    local site_dir=$1

    mkdir -p "$site_dir/content"
    cat >"$site_dir/content/_index.en.md" <<'EOF'
---
title: "Home"
---
EOF
    cat >"$site_dir/content/_index.ru.md" <<'EOF'
---
title: "Home RU"
---
EOF
}

build_example_site() {
    local out_dir="$TMP_DIR/example-site"
    local log_file="$TMP_DIR/example-site.log"

    run_hugo "$log_file" \
        --source "$THEME_ROOT/exampleSite" \
        --themesDir "$THEME_PARENT" \
        --destination "$out_dir" \
        --cacheDir "$TMP_DIR/cache-example" \
        --gc \
        --minify \
        --panicOnWarning

    assert_no_html_contains_regex "$out_dir" '<<<<<<<|>>>>>>>|Updated upstream|Stashed changes' "merge conflict marker in generated HTML"

    assert_file_contains "$out_dir/index.html" "Contact e-mail"
    assert_file_contains "$out_dir/ru/index.html" "/ru/about"

    if grep -Eq '<p>[[:space:]]*<p>|</p>[[:space:]]*</p>' "$out_dir/index.html" "$out_dir/ru/index.html"; then
        fail "Footer output contains nested paragraph markup"
    fi

    assert_file_contains "$out_dir/gallery/2023/diving/index.html" "_hu_"
    assert_file_contains "$out_dir/ru/gallery/2023/diving/index.html" "_hu_"
}

run_static_checks() {
    local matches="$TMP_DIR/direct-image-transforms.txt"

    assert_no_file_contains_regex "$THEME_ROOT/layouts" 'partial(Cached)?[[:space:]]+"partials/' "old partial lookup path"
    assert_static_partials_exist
    assert_no_file_contains_regex "$THEME_ROOT/layouts" '\.Exif\b|Tags\.Orientation' "deprecated image metadata API"
    assert_no_file_contains_regex "$THEME_ROOT/layouts" '\.Site\.LanguageCode|\.Language\.LanguageCode' "deprecated language template API"
    assert_no_file_contains_regex "$THEME_ROOT/layouts" '\.Site\.Sites|\.Page\.Sites' "deprecated site collection API"
    assert_no_file_contains_regex "$THEME_ROOT/exampleSite/config" '\blanguageCode\b|\blanguagecode\b' "deprecated language config key"

    rg -n -g '*.html' '\.(Fit|Fill|Resize)[[:space:]]' "$THEME_ROOT/layouts" >"$matches" || true
    if grep -v '/layouts/_partials/_funcs/process-image.html:' "$matches" | grep -q .; then
        printf 'Unexpected direct image transforms outside guarded helper:\n' >&2
        grep -v '/layouts/_partials/_funcs/process-image.html:' "$matches" >&2
        exit 1
    fi
}

build_footer_fallback_fixture() {
    local site_dir="$TMP_DIR/footer-fallback"
    local out_dir="$TMP_DIR/footer-fallback-public"
    local log_file="$TMP_DIR/footer-fallback.log"

    mkdir -p "$site_dir/content/footer"
    write_fixture_config "$site_dir"
    write_fixture_home_pages "$site_dir"
    cat >"$site_dir/content/footer/index.en.md" <<'EOF'
---
title: "Footer"
draft: false
type: footer
headless: true
---
Fallback footer marker.
EOF

    run_hugo "$log_file" \
        --source "$site_dir" \
        --themesDir "$THEME_PARENT" \
        --destination "$out_dir" \
        --cacheDir "$TMP_DIR/cache-footer-fallback" \
        --minify

    assert_file_contains "$out_dir/ru/index.html" "Fallback footer marker"
}

build_shared_gallery_fixture() {
    local site_dir="$TMP_DIR/shared-gallery"
    local out_dir="$TMP_DIR/shared-gallery-public"
    local log_file="$TMP_DIR/shared-gallery.log"
    local source_image="$THEME_ROOT/exampleSite/content/gallery/2023/diving/OIG.0bGU8muNip8a2Kg5_YcX.jpg"

    mkdir -p "$site_dir/content/gallery/shared-photo"
    write_fixture_config "$site_dir"
    write_fixture_home_pages "$site_dir"
    cp "$source_image" "$site_dir/content/gallery/shared-photo/photo.jpg"
    cat >"$site_dir/content/gallery/shared-photo/index.en.md" <<'EOF'
---
title: "Shared photo"
type: gallery
---
photo.jpg;Shared photo;Shared gallery image
EOF
    cat >"$site_dir/content/gallery/shared-photo/index.ru.md" <<'EOF'
---
title: "Shared photo RU"
type: gallery
---
photo.jpg;Shared photo RU;Shared gallery image RU
EOF

    run_hugo "$log_file" \
        --source "$site_dir" \
        --themesDir "$THEME_PARENT" \
        --destination "$out_dir" \
        --cacheDir "$TMP_DIR/cache-shared-gallery" \
        --minify \
        --panicOnWarning

    assert_file_contains "$out_dir/gallery/shared-photo/index.html" "/gallery/shared-photo/photo_hu"
    assert_file_contains "$out_dir/ru/gallery/shared-photo/index.html" "/gallery/shared-photo/photo_hu"
}

build_malformed_image_fixture() {
    local site_dir="$TMP_DIR/malformed-image"
    local out_dir="$TMP_DIR/malformed-image-public"
    local log_file="$TMP_DIR/malformed-image.log"

    mkdir -p "$site_dir/content/gallery/bad-photo"
    write_fixture_config "$site_dir"
    write_fixture_home_pages "$site_dir"
    printf 'not a jpeg\n' >"$site_dir/content/gallery/bad-photo/not-a-jpeg.jpg"
    cat >"$site_dir/content/gallery/bad-photo/index.en.md" <<'EOF'
---
title: "Bad photo"
type: gallery
---
not-a-jpeg.jpg;Bad photo;This image cannot be transformed
EOF

    run_hugo "$log_file" \
        --source "$site_dir" \
        --themesDir "$THEME_PARENT" \
        --destination "$out_dir" \
        --cacheDir "$TMP_DIR/cache-malformed-image" \
        --minify

    assert_file_contains "$log_file" "Skipping image transform"
    test -f "$out_dir/gallery/bad-photo/index.html" || fail "Malformed image fixture did not render its gallery page"
}

main() {
    cd "$THEME_ROOT"

    require_command hugo
    require_command rg

    printf 'Using %s\n' "$(hugo version)"

    run_static_checks
    build_example_site
    build_footer_fallback_fixture
    build_shared_gallery_fixture
    build_malformed_image_fixture

    printf 'Theme regression tests passed.\n'
}

main "$@"
