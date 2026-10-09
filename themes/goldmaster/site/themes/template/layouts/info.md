- **Partials** are reusable pieces (like header, menu, footer) that you include on every page (or wherever you want).
- **_default** contains templates that define the layout for different types of pages (like single posts, lists, etc.).

- A template in `_default/` (like `single.html` or `list.html`) uses `baseof.html` as a wrapper.
- `baseof.html` includes partials (header, footer, etc.) so those show up on every page.
- The main content area changes depending on which template is used.

The 404.html file **must** be placed directly in the `layouts` folder (not in `_default` or `partials`) because:

- Hugo looks for 404.html specifically when generating the 404 error page.
- If you put it in `layouts/_default/` or `layouts/partials/`, Hugo will **not** find it and your 404 page won’t work.

**Summary:**  
- 404.html → Special location for the 404 error page (required by Hugo)
- `layouts/_default/` → Default templates for regular content pages
- `layouts/partials/` → Reusable components (header, footer, menu, etc.)