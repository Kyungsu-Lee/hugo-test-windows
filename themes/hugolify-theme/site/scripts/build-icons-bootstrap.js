#!/usr/bin/env node

/**
 * Bootstrap Icons Subset Build Script
 * 
 * This script optimizes the delivery of Bootstrap Icons by creating a custom font subset
 * containing only the icons actually used in the project.
 * 
 * It performs the following operations:
 * 
 * 1. Runs 'hugo mod vendor' to ensure all modules are available
 * 2. Checks and installs required dependencies (bootstrap-icons, subset-font, js-yaml)
 * 3. Scans multiple sources to extract used icon names:
 *    - Markdown and HTML files in /content
 *    - SASS files in /assets/sass and Hugo modules
 *    - HTML template files in /layouts
 *    - Social menu data in /data/menu/social.yml
 * 4. Extracts unicode mappings from the official Bootstrap Icons CSS
 * 5. Generates optimized WOFF2 and WOFF font subsets in /static/assets/fonts
 * 6. Generates a SASS map in /assets/scss/bootstrap-icons/bootstrap-icons.scss
 * 
 * Usage: node scripts/build-icons-bootstrap.js
 */
 
import fs from "fs";
import path from "path";
import glob from "glob";
import { execSync } from "child_process";

const BOOTSTRAP_ICONS_PATH = "node_modules/bootstrap-icons/icons";
const BOOTSTRAP_ICONS_FONT_DIR = "node_modules/bootstrap-icons/font/fonts";
const FONT_OUTPUT_DIR = "static/assets/fonts/bootstrap-icons";
const SCSS_OUTPUT_PATH = "assets/scss/bootstrap-icons/bootstrap-icons.scss";
const HUGOLIFY_MODULES_BASE = "_vendor/github.com/hugolify";

// Utility function for logging with emojis
function log(emoji, message) {
  console.log(`${emoji} ${message}`);
}

// Run hugo mod vendor
function runHugoModVendor() {
  try {
    log("📦", "Running hugo mod vendor...");
    execSync("hugo mod vendor", { stdio: "inherit" });
    log("✅", "hugo mod vendor completed");
  } catch (err) {
    console.error("❌ Failed to run hugo mod vendor:", err.message);
    process.exit(1);
  }
}

// Install bootstrap-icons package
function installBootstrapIcons() {
  try {
    log("📦", "Installing bootstrap-icons...");
    execSync("yarn add -D bootstrap-icons", { stdio: "inherit" });
    log("✅", "bootstrap-icons installed");
  } catch (err) {
    console.error("❌ Failed to install bootstrap-icons:", err.message);
    process.exit(1);
  }
}

// Get all Hugolify modules
function getHugolifyModules() {
  if (!fs.existsSync(HUGOLIFY_MODULES_BASE)) {
    return [];
  }

  try {
    const modules = [];
    const items = fs.readdirSync(HUGOLIFY_MODULES_BASE);
    
    items.forEach((item) => {
      const modulePath = path.join(HUGOLIFY_MODULES_BASE, item);
      if (fs.statSync(modulePath).isDirectory()) {
        modules.push(modulePath);
      }
    });
    
    if (modules.length > 0) {
      log("📦", `Found ${modules.length} Hugo modules: ${items.join(", ")}`);
    }
    
    return modules;
  } catch (err) {
    console.warn(`⚠️ Could not read Hugo modules: ${err.message}`);
    return [];
  }
}

// Check if bootstrap-icons is installed
function checkBootstrapIcons() {
  if (!fs.existsSync(BOOTSTRAP_ICONS_PATH)) {
    log("❌", "bootstrap-icons not found. Installing...");
    installBootstrapIcons();
  }
}

// Check if package is installed
function ensurePackageInstalled(pkg) {
  const packageJsonPath = "package.json";
  if (!fs.existsSync(packageJsonPath)) return;

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
  const hasPkg = (packageJson.dependencies && packageJson.dependencies[pkg]) ||
                 (packageJson.devDependencies && packageJson.devDependencies[pkg]);

  if (!hasPkg) {
    log("📦", `Installing ${pkg}...`);
    try {
      execSync(`yarn add -D ${pkg}`, { stdio: "inherit" });
      log("✅", `${pkg} installed`);
    } catch (err) {
      console.error(`❌ Failed to install ${pkg}:`, err.message);
      process.exit(1);
    }
  }
}


// Extract Bootstrap Icons unicode mapping from the official font CSS
function getBootstrapIconsUnicodeMap() {
  const fontCssPath = "node_modules/bootstrap-icons/font/bootstrap-icons.css";
  const unicodeMap = new Map();

  if (!fs.existsSync(fontCssPath)) {
    log("⚠️", "Bootstrap Icons CSS not found. Cannot create subset.");
    process.exit(1);
  }

  try {
    const css = fs.readFileSync(fontCssPath, "utf-8");
    // Match patterns like: .bi-arrow-right::before { content: "\f138"; }
    const matches = css.matchAll(/\.bi-([\w-]+)::before\s*{\s*content:\s*"\\([\da-f]+)"/gi);
    
    for (const match of matches) {
      const iconName = match[1];
      const unicode = match[2];
      unicodeMap.set(iconName, unicode.toUpperCase());
    }
    
    log("📋", `Loaded ${unicodeMap.size} unicode mappings from Bootstrap Icons`);
  } catch (err) {
    log("⚠️", `Could not read Bootstrap Icons CSS: ${err.message}`);
    process.exit(1);
  }

  return unicodeMap;
}

// 1. Extract icons from content files (MD/HTML)
function extractIconsFromContent() {
  const contentDirs = ["content"];
  const icons = new Set();

  contentDirs.forEach((dir) => {
    const files = glob.sync(`${dir}/**/*.{md,html}`, { nodir: true });
    
    files.forEach((file) => {
      try {
        const content = fs.readFileSync(file, "utf-8");
        const matches = content.match(/icon:\s*([\w-]+)/g) || [];
        matches.forEach((m) => {
          const name = m.split(":")[1].trim();
          // Validate icon name for security
          if (/^[\w-]+$/.test(name)) {
            icons.add(name);
          }
        });
      } catch (err) {
        console.warn(`⚠️ Could not read file ${file}:`, err.message);
      }
    });
  });

  return icons;
}

// 2. Extract icons from SASS files
function extractIconsFromSass() {
  const sassDirs = ["assets/sass", "assets/scss"];
  
  // Add Hugolify modules SASS if they exist
  const modules = getHugolifyModules();
  modules.forEach((modulePath) => {
    const moduleSassPath = path.join(modulePath, "assets/sass");
    if (fs.existsSync(moduleSassPath)) {
      sassDirs.push(moduleSassPath);
    }
  });

  const icons = new Set();

  sassDirs.forEach((dir) => {
    if (!fs.existsSync(dir)) return;
    
    const files = glob.sync(`${dir}/**/*.sass`, { nodir: true });
    
    files.forEach((file) => {
      try {
        const content = fs.readFileSync(file, "utf-8");
        const matches = content.match(/icon\(["']([\w-]+)["']\)/g) || [];
        matches.forEach((m) => {
          const match = m.match(/icon\(["']([\w-]+)["']\)/);
          if (match && match[1]) {
            const name = match[1];
            // Validate icon name for security
            if (/^[\w-]+$/.test(name)) {
              icons.add(name);
            }
          }
        });
      } catch (err) {
        console.warn(`⚠️ Could not read file ${file}:`, err.message);
      }
    });
  });

  return icons;
}

// 3. Extract icons from layouts
function extractIconsFromLayouts() {
  const layoutDirs = ["layouts"];
  const icons = new Set();

  layoutDirs.forEach((dir) => {
    if (!fs.existsSync(dir)) return;
    
    const files = glob.sync(`${dir}/**/*.html`, { nodir: true });
    
    files.forEach((file) => {
      try {
        const content = fs.readFileSync(file, "utf-8");
        
        // Match patterns like: icon "arrow-right"
        const iconMatches = content.match(/icon\s+["']([\w-]+)["']/g) || [];
        iconMatches.forEach((m) => {
          const match = m.match(/icon\s+["']([\w-]+)["']/);
          if (match && match[1]) {
            icons.add(match[1]);
          }
        });

        // Match patterns like: .icon = "arrow-right"
        const assignMatches = content.match(/\.icon\s*=\s*["']([\w-]+)["']/g) || [];
        assignMatches.forEach((m) => {
          const match = m.match(/\.icon\s*=\s*["']([\w-]+)["']/);
          if (match && match[1]) {
            icons.add(match[1]);
          }
        });
      } catch (err) {
        console.warn(`⚠️ Could not read file ${file}:`, err.message);
      }
    });
  });

  return icons;
}

// 4. Extract icons form social menu
async function extractIconsFromSocialData() {
  const { default: yaml } = await import("js-yaml");
  const socialFilePath = "data/menu/social.yml";
  const icons = new Set();

  if (!fs.existsSync(socialFilePath)) {
    log("⚠️", "social.yml not found");
    return icons;
  }

  try {
    const content = fs.readFileSync(socialFilePath, "utf-8");
    const data = yaml.load(content);

    if (!data || typeof data !== "object") {
      log("⚠️", "Malformed social.yml file");
      return icons;
    }

    // Tracing all root keys
    Object.keys(data).forEach((key) => {
      const node = data[key];

      // Simple case : key = "links"
      if (key === "links" && Array.isArray(node)) {
        node.forEach((link) => {
          if (link.title && typeof link.title === "string") {
            const iconName = link.title.toLowerCase().trim();
            if (/^[\w-]+$/.test(iconName)) icons.add(iconName);
          }
        });
      }

      // Multilingue case : key = "fr", "en", …
      else if (node && typeof node === "object" && Array.isArray(node.links)) {
        node.links.forEach((link) => {
          if (link.title && typeof link.title === "string") {
            const iconName = link.title.toLowerCase().trim();
            if (/^[\w-]+$/.test(iconName)) icons.add(iconName);
          }
        });
      }
    });

    log("📱", `Found ${icons.size} icons in social.yml`);
  } catch (err) {
    console.warn(`⚠️ Error reading file social.yml: ${err.message}`);
  }

  return icons;
}

// Create font subset using subset-font library
async function createFontSubset(iconNames, unicodeMap) {
  // Dynamic import of subset-font
  const { default: subsetFont } = await import("subset-font");
  
  if (!fs.existsSync(FONT_OUTPUT_DIR)) {
    fs.mkdirSync(FONT_OUTPUT_DIR, { recursive: true });
  }

  // Get unicode codepoints for the icons we need
  const codepoints = [];
  const notFoundIcons = [];
  const iconMap = new Map(); // Store icon name -> unicode mapping

  iconNames.forEach((iconName) => {
    if (unicodeMap.has(iconName)) {
      const unicode = unicodeMap.get(iconName);
      const codepoint = parseInt(unicode, 16);
      codepoints.push(codepoint);
      iconMap.set(iconName, unicode);
      log("🔤", `${iconName} -> \\${unicode}`);
    } else {
      notFoundIcons.push(iconName);
    }
  });

  if (notFoundIcons.length > 0) {
    console.warn(`⚠️ Icons not found in unicode map: ${notFoundIcons.join(", ")}`);
  }

  if (codepoints.length === 0) {
    log("⚠️", "No valid icons to include in subset");
    return null;
  }

  log("📋", `Creating subset with ${codepoints.length} glyphs...`);

  // Find source font file (prefer WOFF2)
  const woff2SourcePath = path.join(BOOTSTRAP_ICONS_FONT_DIR, "bootstrap-icons.woff2");
  const woffSourcePath = path.join(BOOTSTRAP_ICONS_FONT_DIR, "bootstrap-icons.woff");

  let sourceFont = null;
  let sourceFormat = null;

  if (fs.existsSync(woff2SourcePath)) {
    sourceFont = woff2SourcePath;
    sourceFormat = "woff2";
  } else if (fs.existsSync(woffSourcePath)) {
    sourceFont = woffSourcePath;
    sourceFormat = "woff";
  } else {
    log("❌", "No Bootstrap Icons font files found");
    process.exit(1);
  }

  try {
    log("🔨", `Creating font subset from ${sourceFormat.toUpperCase()}...`);

    // Read source font
    const fontBuffer = fs.readFileSync(sourceFont);

    // Create text string from codepoints for subset-font
    const text = String.fromCodePoint(...codepoints);

    // Generate WOFF2 subset
    log("🔨", "Generating WOFF2...");
    const woff2Buffer = await subsetFont(fontBuffer, text, {
      targetFormat: "woff2",
    });
    const woff2OutputPath = path.join(FONT_OUTPUT_DIR, "bootstrap-icons.woff2");
    fs.writeFileSync(woff2OutputPath, woff2Buffer);
    log("✅", `WOFF2 generated: ${woff2OutputPath}`);

    // Generate WOFF subset
    log("🔨", "Generating WOFF...");
    const woffBuffer = await subsetFont(fontBuffer, text, {
      targetFormat: "woff",
    });
    const woffOutputPath = path.join(FONT_OUTPUT_DIR, "bootstrap-icons.woff");
    fs.writeFileSync(woffOutputPath, woffBuffer);
    log("✅", `WOFF generated: ${woffOutputPath}`);

    return iconMap;

  } catch (err) {
    console.error("❌ Failed to create font subset:", err.message);
    console.error(err.stack);
    process.exit(1);
  }
}

// Generate SCSS file with Bootstrap Icons map
function generateIconsSCSS(iconMap) {
  const scssDir = path.dirname(SCSS_OUTPUT_PATH);
  
  if (!fs.existsSync(scssDir)) {
    fs.mkdirSync(scssDir, { recursive: true });
  }

  // Generate $bootstrap-icons-map
  let scss = `// Auto-generated Bootstrap Icons map
// This file is generated by build-icons-bootstrap.js
// Do not edit manually

$bootstrap-icons-map: (
`;

  // Add each icon to the map
  const sortedIcons = Array.from(iconMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  
  sortedIcons.forEach(([iconName, unicode], index) => {
    const isLast = index === sortedIcons.length - 1;
    scss += `  "${iconName}": "\\${unicode.toLowerCase()}"${isLast ? '' : ','}\n`;
  });

  scss += `);\n`;

  fs.writeFileSync(SCSS_OUTPUT_PATH, scss);
  log("✅", `SCSS generated: ${SCSS_OUTPUT_PATH}`);
}

// Main function
async function main() {
  try {
    log("🚀", "Starting icon font subset generation...");

    // Vendor Hugo modules
    runHugoModVendor();

    // Check dependencies
    checkBootstrapIcons();
    ensurePackageInstalled("subset-font");
    ensurePackageInstalled("js-yaml");


    // Load unicode mapping from Bootstrap Icons
    const unicodeMap = getBootstrapIconsUnicodeMap();

    // Extract icons from all sources
    log("🔍", "Extracting icons from content...");
    const iconsFromContent = extractIconsFromContent();
    log("📄", `Found ${iconsFromContent.size} icons in content`);

    log("🔍", "Extracting icons from SASS...");
    const iconsFromSass = extractIconsFromSass();
    log("🎨", `Found ${iconsFromSass.size} icons in SASS`);

    log("🔍", "Extracting icons from layouts...");
    const iconsFromLayouts = extractIconsFromLayouts();
    log("📐", `Found ${iconsFromLayouts.size} icons in layouts`);

    log("🔍", "Extracting icons from social menu...");
    const iconsFromSocial = await extractIconsFromSocialData();
    log("📋", `Found ${iconsFromSocial.size} icons in social menu`);

    // Combine all icons
    const allIcons = new Set([
      ...iconsFromContent, 
      ...iconsFromSass, 
      ...iconsFromLayouts, 
      ...iconsFromSocial
    ]);

    if (allIcons.size === 0) {
      log("⚠️", "No icons found. Exiting...");
      return;
    }

    log("📊", `Total unique icons: ${allIcons.size}`);
    console.log(`   Icons: ${Array.from(allIcons).sort().join(", ")}\n`);

    // Create font subset
    const iconMap = await createFontSubset(allIcons, unicodeMap);

    if (iconMap) {
      // Generate SCSS with icon map
      generateIconsSCSS(iconMap);
    }

    log("✨", "Done!");
  } catch (err) {
    console.error("❌ Error:", err.message);
    console.error(err.stack);
    process.exit(1);
  }
}

// Run the script
main();