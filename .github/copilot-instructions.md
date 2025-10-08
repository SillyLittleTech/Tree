<!--
Guidance for AI coding agents working on the KR_Tree repository.
Keep this focused, actionable and specific to the repository layout and patterns.
-->

# KR_Tree — Copilot instructions

Short, actionable notes for an AI assistant editing this repository (static site).

- Big picture
  - This is a small static site with two main sub-projects:
    - `/grow/` — a Link-Tree style static page (HTML + `style.css` + `script.js`). Theme toggling is implemented with `data-theme` on `<html>` and persisted in `localStorage` (see `/grow/script.js`).
    - `/magic/` — a Cloudflare Pages-style redirect bundle. Redirects are declared in `/magic/_redirects`. Cloudflare Pages will consume `/magic` as the site output directory and process `_redirects`.
  - Root `index.html` is a simple landing page that links into the two folders. There is no build system, package.json, or server-side code.

- Workflows & deploy notes
  - Local development: files are static — open `index.html` or the files in `/grow/` and `/magic/` in a browser or serve the repo directory with a static server (e.g. `python3 -m http.server 8000`) to test navigation.
  - Deployment target: Cloudflare Pages. The README instructs using `/magic` as the build output directory so Cloudflare will process `_redirects` automatically. There is no site generator.
  - Testing redirects: `_redirects` is only honored by Cloudflare Pages; `magic/index.html` provides examples you can open locally but will not reproduce server redirects.

- Patterns & conventions to follow
  - Keep edits minimal and static: most content lives directly in HTML. To add or remove a link in the link-tree, edit `/grow/index.html` and preserve the `.link-button` markup and spacing.
    - Example: add an anchor like `<a href="https://example.com" class="link-button"><span class="link-title">Example</span></a>` inside the `.links` container.
  - Theme handling: toggle logic uses `data-theme` on `<html>` and CSS variables in `/grow/style.css`. If you change variable names, update both CSS and the JavaScript that reads/writes `data-theme`.
  - Redirect format: follow the Cloudflare-style `_redirects` format already in `/magic/_redirects`: `/CODE https://destination-url.com 301` (source, destination, optional status). Preserve exact spacing/newlines.
  - Inline SVGs are used for icons — prefer editing or replacing those inline elements rather than introducing external icon libraries.

- Files to check when making changes
  - `/grow/index.html`, `/grow/script.js`, `/grow/style.css` — link tree UI, theme, styles.
  - `/magic/_redirects`, `/magic/index.html` — redirects and redirect listing.
  - `index.html` (root) — main landing page that references the two sections.
  - `README.md` — contains deploy notes (Cloudflare Pages) and should be updated if deploy workflow changes.

- Safety / gotchas
  - There is no automated test or build step — changes go live on commit + Cloudflare deploy. Double-check `_redirects` formatting and HTML syntax before pushing.
  - For redirect edits, Cloudflare will be the source of truth; do not rely on local behavior to validate redirects.

If any of the above assumptions are wrong or you want this to cover additional workflows (CI, tests, or a new build pipeline), tell me which area to expand and I will iterate.
