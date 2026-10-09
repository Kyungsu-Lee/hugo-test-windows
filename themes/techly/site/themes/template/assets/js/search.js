document.addEventListener("DOMContentLoaded", function () {
  var config = document.getElementById("search-config");
  if (!config) {
    return;
  }

  var indexUrl = config.dataset.indexUrl;
  var searchUrl = config.dataset.searchUrl;
  var indexCache = null;
  var debounceTimer = null;

  function escapeHtml(text) {
    var el = document.createElement("div");
    el.textContent = text;
    return el.innerHTML;
  }

  function escapeRegExp(string) {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
  }

  function getQueryParam() {
    return new URLSearchParams(window.location.search).get("q") || "";
  }

  function loadIndex() {
    if (indexCache) {
      return Promise.resolve(indexCache);
    }

    return fetch(indexUrl)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Search index unavailable");
        }

        return response.json();
      })
      .then(function (pages) {
        indexCache = pages.map(function (page) {
          return {
            title: page.title || "",
            summary: page.summary || "",
            content: page.content || "",
            permalink: page.permalink || "",
            date: page.date || "",
          };
        });

        return indexCache;
      });
  }

  function buildPreview(text, terms, limit) {
    var lowerText = text.toLowerCase();
    var matchIndex = -1;
    var matchTerm = "";

    terms.forEach(function (term) {
      var index = lowerText.indexOf(term);
      if (index !== -1 && (matchIndex === -1 || index < matchIndex)) {
        matchIndex = index;
        matchTerm = term;
      }
    });

    if (matchIndex === -1) {
      return escapeHtml(text.slice(0, limit).trim()) + (text.length > limit ? "…" : "");
    }

    var start = Math.max(0, matchIndex - 40);
    var end = Math.min(text.length, matchIndex + matchTerm.length + 80);
    var snippet = text.slice(start, end).trim();
    var highlighted = snippet.replace(
      new RegExp("(" + terms.map(escapeRegExp).join("|") + ")", "gi"),
      "<mark>$1</mark>"
    );

    return (start > 0 ? "…" : "") + highlighted + (end < text.length ? "…" : "");
  }

  function searchPages(pages, query) {
    var terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) {
      return [];
    }

    return pages
      .map(function (page) {
        var title = page.title.toLowerCase();
        var body = (page.summary + " " + page.content).toLowerCase();
        var score = 0;

        terms.forEach(function (term) {
          if (title.indexOf(term) !== -1) {
            score += 10;
          }

          if (body.indexOf(term) !== -1) {
            score += 1;
          }
        });

        if (score === 0) {
          return null;
        }

        var highlightedTitle = page.title.replace(
          new RegExp("(" + terms.map(escapeRegExp).join("|") + ")", "gi"),
          "<mark>$1</mark>"
        );

        return {
          item: page,
          score: score,
          highlightedTitle: highlightedTitle,
          preview: buildPreview(page.summary || page.content, terms, 140),
        };
      })
      .filter(Boolean)
      .sort(function (a, b) {
        return b.score - a.score;
      });
  }

  function renderFullResult(result) {
    var item = result.item;
    var dateMarkup = item.date
      ? '<time class="search-result-date" datetime="' + escapeHtml(item.date) + '">' + escapeHtml(item.date) + "</time>"
      : "";

    return (
      '<article class="search-result">' +
      dateMarkup +
      '<h2 class="search-result-title"><a href="' +
      escapeHtml(item.permalink) +
      '">' +
      result.highlightedTitle +
      "</a></h2>" +
      (result.preview ? '<p class="search-result-summary">' + result.preview + "</p>" : "") +
      "</article>"
    );
  }

  function renderSuggestion(result) {
    return (
      '<a class="search-suggestion" role="option" href="' +
      escapeHtml(result.item.permalink) +
      '">' +
      '<span class="search-suggestion-title">' +
      result.highlightedTitle +
      "</span>" +
      (result.preview ? '<span class="search-suggestion-preview">' + result.preview + "</span>" : "") +
      "</a>"
    );
  }

  function initSearchPage() {
    var input = document.getElementById("search-input");
    var statusEl = document.getElementById("search-status");
    var resultsEl = document.getElementById("search-results");

    if (!input || !statusEl || !resultsEl) {
      return;
    }

    function renderResults(results, searchQuery) {
      if (!searchQuery.trim()) {
        statusEl.textContent = "Enter a search term to find articles.";
        resultsEl.innerHTML = "";
        return;
      }

      if (!results.length) {
        statusEl.textContent = 'No results for "' + searchQuery + '".';
        resultsEl.innerHTML = "";
        return;
      }

      var label = results.length === 1 ? "result" : "results";
      statusEl.textContent = results.length + " " + label + ' for "' + searchQuery + '"';
      resultsEl.innerHTML = results.map(renderFullResult).join("");
    }

    function runSearch(searchQuery, updateUrl) {
      var trimmed = searchQuery.trim();
      var navInput = document.getElementById("nav-search-input");

      input.value = trimmed;

      if (navInput) {
        navInput.value = trimmed;
      }

      if (updateUrl) {
        var nextUrl = searchUrl + (trimmed ? "?q=" + encodeURIComponent(trimmed) : "");
        window.history.replaceState(null, "", nextUrl);
      }

      if (!trimmed) {
        renderResults([], "");
        return;
      }

      statusEl.textContent = "Searching…";
      resultsEl.innerHTML = "";

      loadIndex()
        .then(function (pages) {
          renderResults(searchPages(pages, trimmed), trimmed);
        })
        .catch(function () {
          statusEl.textContent = "Search is temporarily unavailable. Please try again later.";
          resultsEl.innerHTML = "";
        });
    }

    input.closest("form").addEventListener("submit", function (event) {
      event.preventDefault();
      runSearch(input.value, true);
    });

    input.addEventListener("input", function () {
      window.clearTimeout(debounceTimer);
      debounceTimer = window.setTimeout(function () {
        runSearch(input.value, true);
      }, 200);
    });

    runSearch(getQueryParam(), false);

    if (getQueryParam()) {
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    }
  }

  function initNavSearch() {
    var input = document.getElementById("nav-search-input");
    var suggestions = document.getElementById("nav-search-suggestions");

    if (!input || !suggestions) {
      return;
    }

    function hideSuggestions() {
      suggestions.hidden = true;
      suggestions.innerHTML = "";
      input.setAttribute("aria-expanded", "false");
    }

    function showSuggestions(results) {
      if (!results.length) {
        hideSuggestions();
        return;
      }

      var limited = results.slice(0, 5);
      var viewAll =
        '<a class="search-suggestion search-suggestion--all" role="option" href="' +
        escapeHtml(searchUrl + "?q=" + encodeURIComponent(input.value.trim())) +
        '">View all results</a>';

      suggestions.innerHTML = limited.map(renderSuggestion).join("") + viewAll;
      suggestions.hidden = false;
      input.setAttribute("aria-expanded", "true");
    }

    input.closest("form").addEventListener("submit", function (event) {
      var trimmed = input.value.trim();
      if (!trimmed) {
        event.preventDefault();
        window.location.href = searchUrl;
        return;
      }

      event.preventDefault();
      window.location.href = searchUrl + "?q=" + encodeURIComponent(trimmed);
    });

    input.addEventListener("input", function () {
      var trimmed = input.value.trim();

      window.clearTimeout(debounceTimer);
      debounceTimer = window.setTimeout(function () {
        if (!trimmed) {
          hideSuggestions();
          return;
        }

        loadIndex()
          .then(function (pages) {
            showSuggestions(searchPages(pages, trimmed));
          })
          .catch(function () {
            hideSuggestions();
          });
      }, 200);
    });

    input.addEventListener("focus", function () {
      if (input.value.trim() && suggestions.innerHTML) {
        suggestions.hidden = false;
        input.setAttribute("aria-expanded", "true");
      }
    });

    document.addEventListener("click", function (event) {
      if (!input.closest(".search-form-wrap").contains(event.target)) {
        hideSuggestions();
      }
    });

    input.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        hideSuggestions();
      }
    });
  }

  initSearchPage();
  initNavSearch();
});
