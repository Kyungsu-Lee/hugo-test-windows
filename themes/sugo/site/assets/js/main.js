// just all js in one place too. 
console.log("This site is powered by Hugo using Sugo theme. Visit https://github.com/psugam/sugo for more details.")
// consts that arr used in multiple places.
const STORAGE_KEY = window.__MYTHEME_STORAGE_KEY__ || "mytheme-color-scheme";
const DEFAULT_THEME = window.__MYTHEME_DEFAULT_THEME__ === "dark" ? "dark" : "light";
const THEME_TOGGLE_ENABLED = window.__MYTHEME_THEME_TOGGLE_ENABLED__ !== false;
const FIXED_THEME = window.__MYTHEME_FIXED_THEME__ === "dark" ? "dark" : "light";
const root = document.documentElement;

// needs js. just to be safe
root.classList.remove("no-js");
root.classList.add("js-enabled");


// this is for flowchart stuff. we want to render them in the correct theme, but we don't want to load mermaid if it's not used on the page. so we load it on demand and re-render when theme changes. this is a bit of a hack but it works well enough without adding too much complexity.
let mermaidLoadPromise = null;
let mermaidRenderTimer = null;


// theme persistance 
function readStoredTheme() {
  if (!THEME_TOGGLE_ENABLED) {
    return null;
  }

  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch (error) {
    return null;
  }
}

function preferredTheme() {
  if (!THEME_TOGGLE_ENABLED) {
    return FIXED_THEME;
  }

  const stored = readStoredTheme();
  if (stored) {
    return stored;
  }
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return DEFAULT_THEME;
}

function updateThemeToggle(theme) {
  const toggle = document.querySelector("[data-theme-toggle]");
  const label = document.querySelector("[data-theme-label]");
  if (!toggle) {
    return;
  }

  // the aria block was giving some yellow flags in console. might need to check
  const labelDark = toggle.getAttribute("data-label-dark") || "Dark mode";
  const labelLight = toggle.getAttribute("data-label-light") || "Light mode";
  const ariaDark = toggle.getAttribute("data-aria-dark") || "Switch to dark mode";
  const ariaLight = toggle.getAttribute("data-aria-light") || "Switch to light mode";
  const nextAria = theme === "dark" ? ariaLight : ariaDark;

  toggle.setAttribute("aria-label", nextAria);
  toggle.setAttribute("title", nextAria);

  if (label) {
    label.textContent = theme === "dark" ? labelLight : labelDark;
  }
}

function updateColorShortcodes() {
  const theme = root.getAttribute("data-theme") || "light";
  document.querySelectorAll(".lit-color-text").forEach((element) => {
    const dark = element.getAttribute("data-dark");
    const light = element.getAttribute("data-light");

    if (theme === "dark" && dark) {
      element.style.color = dark;
    } else if (light) {
      element.style.color = light;
    }
  });
}

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  updateThemeToggle(theme);
  updateColorShortcodes();
  scheduleMermaidRender();
}

function setTheme(theme) {
  if (!THEME_TOGGLE_ENABLED) {
    return;
  }

  applyTheme(theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch (error) {
    // Ignore storage failures and keep the in-memory theme.
  }
}

function closeNavigation(navToggle, nav) {
  nav.classList.remove("is-open");
  navToggle.classList.remove("is-active");
  navToggle.setAttribute("aria-expanded", "false");
}

function initThemeToggle() {
  applyTheme(preferredTheme());

  if (!THEME_TOGGLE_ENABLED) {
    return;
  }

  const toggle = document.querySelector("[data-theme-toggle]");
  if (!toggle) {
    return;
  }

  toggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "light";
    setTheme(current === "dark" ? "light" : "dark");
  });
}

function initNavigationToggle() {
  const navToggle = document.querySelector("[data-nav-toggle]");
  const nav = document.getElementById("primary-navigation");

  if (!navToggle || !nav) {
    return;
  }

  nav.querySelectorAll(".menu-item--has-children").forEach((item) => {
    if (!(item instanceof HTMLElement)) {
      return;
    }

    const toggle = item.querySelector(":scope > [data-submenu-toggle]");
    if (!(toggle instanceof HTMLButtonElement)) {
      return;
    }

    const setExpanded = (expanded) => {
      item.classList.toggle("is-open", expanded);
      toggle.setAttribute("aria-expanded", String(expanded));
    };

    const initiallyExpanded = item.classList.contains("menu-item--expanded");
    setExpanded(initiallyExpanded);
    item.classList.remove("menu-item--expanded");

    toggle.addEventListener("click", (event) => {
      event.preventDefault();

      if (window.innerWidth > 860) {
        return;
      }

      setExpanded(!item.classList.contains("is-open"));
    });
  });

  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.classList.toggle("is-active", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (event) => {
    if (window.innerWidth > 860) {
      return;
    }

    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    if (!nav.contains(target) && !navToggle.contains(target)) {
      closeNavigation(navToggle, nav);
    }
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 860) {
        closeNavigation(navToggle, nav);
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) {
      closeNavigation(navToggle, nav);
    }
  });
}
// handles toc. it comes on top on smaller screens. 
function initTableOfContents() {
  const compactMediaQuery = window.matchMedia("(max-width: 980px)");

  document.querySelectorAll("[data-toc]").forEach((toc) => {
    if (toc.dataset.tocReady === "true") {
      return;
    }

    const toggle = toc.querySelector("[data-toc-toggle]");
    const panel = toc.querySelector("[data-toc-panel]");
    if (!(toggle instanceof HTMLButtonElement) || !(panel instanceof HTMLElement)) {
      return;
    }

    let userToggled = false;
    const applyState = (collapsed) => {
      toc.classList.toggle("is-collapsed", collapsed);
      toggle.setAttribute("aria-expanded", String(!collapsed));
      panel.hidden = collapsed;
    };

    applyState(compactMediaQuery.matches);

    toggle.addEventListener("click", () => {
      userToggled = true;
      const collapsed = toc.classList.contains("is-collapsed");
      applyState(!collapsed);
    });

    const onViewportChange = () => {
      if (!userToggled) {
        applyState(compactMediaQuery.matches);
      }
    };

    if (compactMediaQuery.addEventListener) {
      compactMediaQuery.addEventListener("change", onViewportChange);
    } else {
      compactMediaQuery.addListener(onViewportChange);
    }

    toc.dataset.tocReady = "true";
  });
}

function initTabs() {
  document.querySelectorAll("[data-lit-tabs]").forEach((group) => {
    if (group.dataset.litTabsReady === "true") {
      return;
    }

    const buttons = Array.from(group.querySelectorAll("[data-lit-tab-target]"));
    const panels = Array.from(group.querySelectorAll(".lit-tabs__panel"));

    const activate = (targetId) => {
      buttons.forEach((button) => {
        const active = button.getAttribute("data-lit-tab-target") === targetId;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-selected", String(active));
      });

      panels.forEach((panel) => {
        panel.hidden = panel.id !== targetId;
      });
    };

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.getAttribute("data-lit-tab-target");
        if (target) {
          activate(target);
        }
      });
    });

    if (buttons.length > 0) {
      const firstTarget = buttons[0].getAttribute("data-lit-tab-target");
      if (firstTarget) {
        activate(firstTarget);
      }
    }

    group.dataset.litTabsReady = "true";
  });
}

function initAccordions() {
  document.querySelectorAll("[data-lit-accordion]").forEach((group) => {
    if (group.dataset.litAccordionReady === "true") {
      return;
    }

    const buttons = Array.from(group.querySelectorAll("[data-lit-accordion-target]"));

    const closeAll = () => {
      buttons.forEach((button) => {
        const panelId = button.getAttribute("data-lit-accordion-target");
        if (!panelId) {
          return;
        }

        const panel = document.getElementById(panelId);
        if (!panel) {
          return;
        }

        panel.hidden = true;
        button.classList.remove("is-active");
        button.setAttribute("aria-expanded", "false");
      });
    };

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const panelId = button.getAttribute("data-lit-accordion-target");
        if (!panelId) {
          return;
        }

        const panel = document.getElementById(panelId);
        if (!panel) {
          return;
        }

        const shouldOpen = panel.hidden;
        closeAll();

        if (shouldOpen) {
          panel.hidden = false;
          button.classList.add("is-active");
          button.setAttribute("aria-expanded", "true");
        }
      });
    });

    closeAll();
    group.dataset.litAccordionReady = "true";
  });
}

function showSlide(slideshow, nextIndex) {
  const slides = Array.from(slideshow.querySelectorAll(".lit-slideshow__slide"));
  if (slides.length === 0) {
    return;
  }

  let index = nextIndex;
  if (index >= slides.length) {
    index = 0;
  }
  if (index < 0) {
    index = slides.length - 1;
  }

  slides.forEach((slide, slideIndex) => {
    slide.hidden = slideIndex !== index;
  });

  slideshow.dataset.litSlideIndex = String(index);
}

function initSlideshows() {
  document.querySelectorAll("[data-lit-slideshow]").forEach((slideshow) => {
    if (slideshow.dataset.litSlideshowReady === "true") {
      return;
    }

    const slides = Array.from(slideshow.querySelectorAll(".lit-slideshow__slide"));
    const prev = slideshow.querySelector("[data-lit-slide-prev]");
    const next = slideshow.querySelector("[data-lit-slide-next]");

    if (slides.length <= 1) {
      if (prev) {
        prev.hidden = true;
      }
      if (next) {
        next.hidden = true;
      }
    }

    showSlide(slideshow, 0);

    if (prev) {
      prev.addEventListener("click", () => {
        const current = Number(slideshow.dataset.litSlideIndex || "0");
        showSlide(slideshow, current - 1);
      });
    }

    if (next) {
      next.addEventListener("click", () => {
        const current = Number(slideshow.dataset.litSlideIndex || "0");
        showSlide(slideshow, current + 1);
      });
    }

    slideshow.dataset.litSlideshowReady = "true";
  });
}

function extractCodeText(wrapper) {
  const codeTable = wrapper.querySelector("table");
  if (codeTable) {
    const rows = Array.from(codeTable.querySelectorAll("tr"));
    return rows
      .map((row) => {
        const cells = row.querySelectorAll("td");
        return cells.length > 1 ? cells[1].innerText : cells[0].innerText;
      })
      .join("\n")
      .trim();
  }

  const code = wrapper.querySelector("code");
  if (!code) {
    return "";
  }

  return code.innerText.trim();
}

function initCodeCopy() {
  document.addEventListener("click", async (event) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    const button = target.closest("[data-copy-code]");
    if (!(button instanceof HTMLButtonElement)) {
      return;
    }

    const wrapper = button.closest(".lit-codeblock");
    if (!(wrapper instanceof HTMLElement)) {
      return;
    }

    const text = extractCodeText(wrapper);
    if (!text) {
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      const original = button.getAttribute("data-copy-default") || button.textContent || "Copy";
      const copiedLabel = button.getAttribute("data-copy-success") || "Copied";
      button.textContent = copiedLabel;
      window.setTimeout(() => {
        button.textContent = original;
      }, 1200);
    } catch (error) {
      const original = button.getAttribute("data-copy-default") || "Copy";
      const failedLabel = button.getAttribute("data-copy-fail") || "Failed";
      button.textContent = failedLabel;
      window.setTimeout(() => {
        button.textContent = original;
      }, 1200);
    }
  });
}


// show footnotes when hovering over references. One thing that is a bit tricky is the size of the popup. sometime large parts of it are empty. might need to check that. 
function initFootnoteHoverPopups() {
  const refs = Array.from(document.querySelectorAll("a.footnote-ref"));
  if (refs.length === 0) {
    return;
  }

  const popup = document.createElement("div");
  popup.className = "footnote-tooltip";
  popup.hidden = true;
  document.body.appendChild(popup);

  let activeRef = null;

  const hidePopup = () => {
    popup.hidden = true;
    popup.textContent = "";
    activeRef = null;
  };

  const positionPopup = (ref) => {
    const rect = ref.getBoundingClientRect();
    popup.style.top = "0px";
    popup.style.left = "0px";
    popup.hidden = false;

    const popupRect = popup.getBoundingClientRect();
    const spacing = 10;
    let top = rect.top - popupRect.height - spacing;
    if (top < spacing) {
      top = rect.bottom + spacing;
    }

    let left = rect.left + rect.width / 2 - popupRect.width / 2;
    if (left < spacing) {
      left = spacing;
    }
    if (left + popupRect.width > window.innerWidth - spacing) {
      left = window.innerWidth - popupRect.width - spacing;
    }

    popup.style.top = `${Math.round(top + window.scrollY)}px`;
    popup.style.left = `${Math.round(left + window.scrollX)}px`;
  };

  const showPopup = (ref) => {
    const href = ref.getAttribute("href");
    if (!href || !href.startsWith("#")) {
      return;
    }

    const noteId = decodeURIComponent(href.slice(1));
    const note = document.getElementById(noteId);
    if (!note) {
      return;
    }

    const clone = note.cloneNode(true);
    clone.querySelectorAll(".footnote-backref").forEach((node) => node.remove());

    const text = clone.textContent ? clone.textContent.replace(/\s+/g, " ").trim() : "";
    if (!text) {
      return;
    }

    popup.textContent = text;
    popup.hidden = false;
    activeRef = ref;
    positionPopup(ref);
  };

  refs.forEach((ref) => {
    ref.addEventListener("mouseenter", () => showPopup(ref));
    ref.addEventListener("mouseleave", hidePopup);
    ref.addEventListener("focus", () => showPopup(ref));
    ref.addEventListener("blur", hidePopup);
  });

  window.addEventListener(
    "scroll",
    () => {
      if (activeRef && !popup.hidden) {
        positionPopup(activeRef);
      }
    },
    { passive: true }
  );

  window.addEventListener("resize", () => {
    if (activeRef && !popup.hidden) {
      positionPopup(activeRef);
    }
  });
}


// making an image larger than 100% still doesn't work. just breaks stuff up. check later.
function initWideArticleImages() {
  const articleBodies = Array.from(document.querySelectorAll(".article-page__body--wide-media, .article-page__body--with-toc"));
  if (articleBodies.length === 0) {
    return;
  }

  const compactMediaQuery = window.matchMedia("(max-width: 980px)");
  let resizeTimer = null;

  const clearWideImage = (image) => {
    image.classList.remove("is-wide-media");
    image.style.removeProperty("--wide-image-width");
  };

  const hasHorizontalOverflow = () => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
  };

  const applyWideSizing = (body, image) => {
    clearWideImage(image);

    const bodyRect = body.getBoundingClientRect();
    if (bodyRect.width <= 0) {
      return;
    }

    const siteMain = document.querySelector(".site-main");
    const boundsRect = siteMain instanceof HTMLElement ? siteMain.getBoundingClientRect() : null;
    const leftBound = boundsRect ? boundsRect.left : 0;
    const rightBound = boundsRect ? boundsRect.right : window.innerWidth;
    const availableLeft = Math.max(0, bodyRect.left - leftBound);
    const availableRight = Math.max(0, rightBound - bodyRect.right);
    const symmetricExtra = Math.max(0, Math.min(availableLeft, availableRight));

    const baseWidth = Math.floor(bodyRect.width);
    const naturalWidth = Math.floor(image.naturalWidth || baseWidth);
    const maxAllowedWidth = Math.floor(baseWidth + symmetricExtra * 2);
    const targetWidth = Math.min(naturalWidth, maxAllowedWidth);

    if (targetWidth <= baseWidth + 2) {
      return;
    }

    image.style.setProperty("--wide-image-width", `${targetWidth}px`);
    image.classList.add("is-wide-media");

    if (hasHorizontalOverflow()) {
      clearWideImage(image);
    }
  };

  const updateWideImages = () => {
    const allowWithToc = compactMediaQuery.matches;

    articleBodies.forEach((body) => {
      const isWithTocBody = body.classList.contains("article-page__body--with-toc");
      const canExpandInBody = !isWithTocBody || allowWithToc;
      const targets = Array.from(body.querySelectorAll(":scope > p > img:only-child, :scope > p > a:only-child > img:only-child, :scope > figure > img:only-child, :scope > figure > a:only-child > img:only-child"));

      targets.forEach((image) => {
        if (!(image instanceof HTMLImageElement)) {
          return;
        }

        if (image.dataset.noWideMedia === "true") {
          clearWideImage(image);
          return;
        }

        if (!canExpandInBody) {
          clearWideImage(image);
          return;
        }

        if (!image.complete || image.naturalWidth === 0) {
          if (image.dataset.wideMediaBound !== "true") {
            image.addEventListener("load", () => updateWideImages(), { once: true });
            image.dataset.wideMediaBound = "true";
          }
          return;
        }

        applyWideSizing(body, image);
      });
    });
  };

  const scheduleUpdate = () => {
    if (resizeTimer) {
      window.clearTimeout(resizeTimer);
    }
    resizeTimer = window.setTimeout(updateWideImages, 80);
  };

  updateWideImages();
  window.addEventListener("resize", scheduleUpdate);
  window.addEventListener("load", scheduleUpdate);
  if (compactMediaQuery.addEventListener) {
    compactMediaQuery.addEventListener("change", scheduleUpdate);
  } else {
    compactMediaQuery.addListener(scheduleUpdate);
  }
}

function initBackToTop() {
  const button = document.querySelector("[data-back-to-top]");
  if (!(button instanceof HTMLButtonElement)) {
    return;
  }

  const articleBody = document.querySelector(".article-page__body");
  if (!(articleBody instanceof HTMLElement)) {
    return;
  }

  const configuredOffset = Number(button.getAttribute("data-show-offset") || "520");
  const showOffset = Number.isFinite(configuredOffset) && configuredOffset > 0 ? configuredOffset : 520;

  const updateVisibility = () => {
    const currentY = window.scrollY || window.pageYOffset || 0;
    const articleBodyTop = articleBody.getBoundingClientRect().top + currentY;
    const contentDepthThreshold = articleBodyTop + Math.min(360, articleBody.offsetHeight * 0.18);
    const triggerPoint = Math.max(showOffset, contentDepthThreshold);
    const shouldShow = currentY > triggerPoint;

    button.classList.toggle("is-visible", shouldShow);
  };

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", updateVisibility, { passive: true });
  window.addEventListener("resize", updateVisibility);
  updateVisibility();
}

let pagefindUiLoadPromise = null;

function loadExternalScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

function ensurePagefindUiAssets() {
  if (pagefindUiLoadPromise) {
    return pagefindUiLoadPromise;
  }

  pagefindUiLoadPromise = new Promise((resolve, reject) => {
    const existingLink = document.getElementById("pagefind-ui-css");
    if (!existingLink) {
      const cssLink = document.createElement("link");
      cssLink.id = "pagefind-ui-css";
      cssLink.rel = "stylesheet";
      cssLink.href = "/pagefind/pagefind-ui.css";
      document.head.appendChild(cssLink);
    }

    if (window.PagefindUI) {
      resolve();
      return;
    }

    loadExternalScript("/pagefind/pagefind-ui.js")
      .then(resolve)
      .catch(reject);
  });

  return pagefindUiLoadPromise;
}

function initSiteSearch() {
  const searchLayer = document.querySelector("[data-site-search]");
  const openButton = document.querySelector("[data-search-open]");
  if (!(searchLayer instanceof HTMLElement) || !(openButton instanceof HTMLButtonElement)) {
    return;
  }

  const searchPanel = searchLayer.querySelector(".site-search__panel");
  const searchMount = searchLayer.querySelector("[data-search-root]");
  const closeButtons = Array.from(searchLayer.querySelectorAll("[data-search-close]"));
  if (!(searchPanel instanceof HTMLElement) || !(searchMount instanceof HTMLElement)) {
    return;
  }

  let initialized = false;
  let initializing = false;

  const loadingLabel = searchMount.getAttribute("data-loading-label") || "Loading search...";
  const loadFailed = searchMount.getAttribute("data-load-failed") || "Search is unavailable.";

  const closeSearch = () => {
    if (document.activeElement instanceof HTMLElement && searchLayer.contains(document.activeElement)) {
      document.activeElement.blur();
    }

    searchLayer.hidden = true;
    document.body.classList.remove("is-search-open");
    openButton.setAttribute("aria-expanded", "false");
    openButton.focus();
  };

  const initializeSearch = async () => {
    if (initialized || initializing) {
      return;
    }

    initializing = true;
    searchMount.innerHTML = `<p class="site-search__status">${loadingLabel}</p>`;

    try {
      await ensurePagefindUiAssets();
      if (!window.PagefindUI) {
        throw new Error("PagefindUI is not available.");
      }

      searchMount.innerHTML = "";
      const resultLabel = searchMount.getAttribute("data-result-label") || "result";
      const resultsLabel = searchMount.getAttribute("data-results-label") || "results";
      const noResultsLabel = searchMount.getAttribute("data-no-results") || "No results found";
      const placeholder = searchMount.getAttribute("data-placeholder") || "Search posts";

      // Pagefind indexes page body by default. We include frontmatter terms in page meta tags.
      new window.PagefindUI({
        element: "#site-search-root",
        showImages: false,
        showSubResults: true,
        resetStyles: false,
        excerptLength: 20,
        translations: {
          placeholder,
          zero_results: noResultsLabel,
          one_result: `[COUNT] ${resultLabel}`,
          many_results: `[COUNT] ${resultsLabel}`,
        },
      });

      initialized = true;
    } catch (error) {
      searchMount.innerHTML = `<p class="site-search__error">${loadFailed}</p>`;
    } finally {
      initializing = false;
    }
  };

  const openSearch = async () => {
    searchLayer.hidden = false;
    document.body.classList.add("is-search-open");
    openButton.setAttribute("aria-expanded", "true");
    await initializeSearch();
    window.setTimeout(() => {
      const input = searchLayer.querySelector(".pagefind-ui__search-input");
      if (input instanceof HTMLInputElement) {
        input.focus();
      }
    }, 40);
  };

  openButton.addEventListener("click", openSearch);
  closeButtons.forEach((button) => {
    button.addEventListener("click", closeSearch);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !searchLayer.hidden) {
      closeSearch();
    }
  });
}

function loadMermaid() {
  if (window.mermaid) {
    return Promise.resolve(window.mermaid);
  }

  if (mermaidLoadPromise) {
    return mermaidLoadPromise;
  }

  mermaidLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js";
    script.async = true;
    script.onload = () => {
      if (window.mermaid) {
        resolve(window.mermaid);
      } else {
        reject(new Error("Mermaid failed to initialize."));
      }
    };
    script.onerror = () => reject(new Error("Failed to load Mermaid."));
    document.head.appendChild(script);
  });

  return mermaidLoadPromise;
}

async function renderMermaid() {
  const mermaidBlocks = document.querySelectorAll(".mermaid");
  if (mermaidBlocks.length === 0) {
    return;
  }

  try {
    const mermaid = await loadMermaid();
    const theme = (root.getAttribute("data-theme") || "light") === "dark" ? "dark" : "default";

    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "loose",
      theme,
    });

    mermaidBlocks.forEach((block) => {
      block.removeAttribute("data-processed");
    });

    await mermaid.run({ querySelector: ".mermaid" });
  } catch (error) {
    // Mermaid is optional. Ignore failures silently.
  }
}

function scheduleMermaidRender() {
  if (mermaidRenderTimer) {
    window.clearTimeout(mermaidRenderTimer);
  }

  mermaidRenderTimer = window.setTimeout(() => {
    renderMermaid();
  }, 120);
}

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initNavigationToggle();
  initTableOfContents();
  initWideArticleImages();
  initSiteSearch();
  initBackToTop();
  initTabs();
  initAccordions();
  initSlideshows();
  initCodeCopy();
  initFootnoteHoverPopups();
  updateColorShortcodes();
  scheduleMermaidRender();
});



