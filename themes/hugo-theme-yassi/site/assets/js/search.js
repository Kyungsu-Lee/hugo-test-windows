// Search functionality using Fuse.js
document.addEventListener('DOMContentLoaded', function () {
    const searchToggle = document.getElementById('search-toggle');
    const searchModal = document.getElementById('search-modal');
    const searchClose = document.getElementById('search-close');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchOverlay = searchModal?.querySelector('.search-modal-overlay');

    if (!searchModal || !searchToggle) return;

    let fuse = null;
    let searchData = [];

    // Load search index
    async function loadSearchIndex() {
        try {
            const response = await fetch('/index.json');
            searchData = await response.json();
            
            // Initialize Fuse.js
            const options = {
                keys: [
                    { name: 'title', weight: 0.4 },
                    { name: 'content', weight: 0.3 },
                    { name: 'summary', weight: 0.2 },
                    { name: 'section', weight: 0.1 }
                ],
                includeScore: true,
                includeMatches: true,
                threshold: 0.4,
                minMatchCharLength: 2,
                ignoreLocation: true
            };
            
            fuse = new Fuse(searchData, options);
        } catch (error) {
            console.error('Failed to load search index:', error);
        }
    }

    // Open search modal
    function openSearch() {
        searchModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => searchInput.focus(), 100);
        
        // Load search index if not already loaded
        if (!fuse) {
            loadSearchIndex();
        }
    }

    // Close search modal
    function closeSearch() {
        searchModal.classList.remove('active');
        document.body.style.overflow = '';
        searchInput.value = '';
        showEmptyState();
    }

    // Show empty state
    function showEmptyState() {
        searchResults.innerHTML = `
            <div class="search-empty">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                </svg>
                <p>Start typing to search...</p>
            </div>
        `;
    }

    // Show no results state
    function showNoResults(query) {
        searchResults.innerHTML = `
            <div class="search-no-results">
                <p>No results found for "<strong>${escapeHtml(query)}</strong>"</p>
                <p class="search-no-results-hint">Try different keywords or check your spelling</p>
            </div>
        `;
    }

    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Truncate text
    function truncate(text, length = 150) {
        if (!text || text.length <= length) return text;
        return text.substring(0, length) + '...';
    }

    // Get section badge class
    function getSectionClass(section) {
        const sectionLower = section.toLowerCase();
        if (sectionLower === 'projects') return 'search-result-badge-project';
        if (sectionLower === 'posts') return 'search-result-badge-post';
        return 'search-result-badge-default';
    }

    // Perform search
    function performSearch(query) {
        if (!fuse || query.trim().length < 2) {
            showEmptyState();
            return;
        }

        const results = fuse.search(query);
        
        if (results.length === 0) {
            showNoResults(query);
            return;
        }

        // Display results
        const resultsHtml = results.slice(0, 10).map(result => {
            const item = result.item;
            const score = result.score;
            const excerpt = item.summary || truncate(item.content);
            const sectionClass = getSectionClass(item.section);
            
            return `
                <a href="${item.permalink}" class="search-result-item">
                    <div class="search-result-header">
                        <span class="search-result-title">${escapeHtml(item.title)}</span>
                        <span class="search-result-badge ${sectionClass}">${escapeHtml(item.section)}</span>
                    </div>
                    ${excerpt ? `<p class="search-result-excerpt">${escapeHtml(excerpt)}</p>` : ''}
                    ${item.date ? `<span class="search-result-date">${item.date}</span>` : ''}
                </a>
            `;
        }).join('');

        searchResults.innerHTML = resultsHtml;
    }

    // Event listeners
    searchToggle.addEventListener('click', openSearch);
    searchClose.addEventListener('click', closeSearch);
    searchOverlay.addEventListener('click', closeSearch);

    // Search input
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(e.target.value);
        }, 300);
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Open search with / or Cmd/Ctrl + K
        if ((e.key === '/' || (e.key === 'k' && (e.metaKey || e.ctrlKey))) && !searchModal.classList.contains('active')) {
            e.preventDefault();
            openSearch();
        }
        
        // Close search with Escape
        if (e.key === 'Escape' && searchModal.classList.contains('active')) {
            closeSearch();
        }
    });

    // Navigate results with arrow keys
    searchResults.addEventListener('keydown', (e) => {
        const items = searchResults.querySelectorAll('.search-result-item');
        const activeElement = document.activeElement;
        const currentIndex = Array.from(items).indexOf(activeElement);

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
            items[nextIndex]?.focus();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
            items[prevIndex]?.focus();
        }
    });
});
