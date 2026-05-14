# Devoid — AI Knowledge Hub

This directory is the single source of truth for any AI agent working on this project.
Read the relevant doc before touching any file.

---

## What is Devoid?

`devoid.pro` — a talent company that connects companies with elite engineers, PMs, QA, DevOps, and UI/UX designers on demand. Devoid fills engineering skill gaps globally, without friction. No specific country or region is referenced in any user-facing content — see Rule 9 in `rules.md`.

---

## Tech Stack

- **Vanilla JS SPA** — Single Page Application using the History API (`pushState` / `popstate`). No React, no Vue, no framework, no bundler, no npm.
- **ES Modules** — `type="module"` imports. All page and component files use `export`/`import`.
- **Tailwind CSS** is **pre-compiled** into `styles.css` (frozen) — see `rules.md` Rule 1 for the critical constraint this creates.
- **Custom CSS** in `custom.css` — append here for anything not in `styles.css`.
- **Service Worker** (`sw.js`) — caches all assets for offline/fast-repeat loads.
- Hosted at `https://devoid.pro` on **Vercel** with a catch-all rewrite in `vercel.json`.

---

## File Structure

```text
devoid/
  index.html              ← Minimal SPA shell (head + <div id="app"> + <script src="app.js">)
  app.js                  ← Router, updateHead(), link interception, mobile menu wiring
  sw.js                   ← Service Worker (cache-first images, stale-while-revalidate JS/CSS/JSON)
  vercel.json             ← Catch-all rewrite — routes every non-asset path to index.html
  blogs.json              ← Blog post data — add new posts here only
  styles.css              ← Pre-compiled Tailwind — DO NOT modify or regenerate
  custom.css              ← Site-wide custom CSS — append here
  robots.txt              ← Allows all, points to sitemap
  sitemap.xml             ← Updated to clean paths (no .html)
  DESIGN.md               ← Design system reference
  components/
    nav.js                ← createNav(isDark, activePage) → HTML string
    footer.js             ← createFooter() → HTML string
  pages/
    home.js               ← Landing page — export function render(appEl, params, updateHead)
    writings.js           ← Writings listing — export function render(...)
    writing-item.js       ← Post detail — export function render(...)
  ass/
    devoid_pro_logo.png   ← Logo (PNG)
    devoid_mini_logo.jpg  ← Favicon
    devoid_hero_bg.jpg    ← Hero background image
    blog-bg/
      blog-1.png          ← Blog images go here, named blog-N.png
    social/
      linkedin.svg, x.svg, insta.svg, tiktok.svg, youtube.svg, email.svg
  ai-knowledge-hub/       ← You are here
```

---

## URL Routes

| URL | Page module | Notes |
| --- | --- | --- |
| `/` | `pages/home.js` | Landing page, dark hero |
| `/writings` | `pages/writings.js` | Blog listing |
| `/writing/:id` | `pages/writing-item.js` | Post detail — `:id` is the integer blog id |

Legacy `.html` URLs (e.g. `/writings.html`) are silently redirected to clean paths by `app.js`.

---

## Which Doc to Read for Which Task

| Task | Read |
| --- | --- |
| Adding a new writing/blog post | `pages/writings.md` |
| Editing writing content / detail page layout | `pages/writing-item.md` |
| Creating a new page | `architecture.md` + `design-system.md` + `rules.md` |
| Changing colours, fonts, borders | `design-system.md` + `rules.md` |
| Changing the nav or footer | `design-system.md` (nav/footer sections) + `components/nav.js` |
| SEO changes, sitemap | `seo-sitemap.md` |
| Logo treatment | `design-system.md` (Logo section) |
| Any styling decision | `rules.md` first |
| Understanding routing, page modules, head updates | `architecture.md` |
| Service worker / caching / performance | `architecture.md` (Performance section) |
