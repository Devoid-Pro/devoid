# Devoid — SPA Architecture

The site is a vanilla JS Single Page Application. There is no framework, no bundler, no npm. Everything runs as native ES Modules in the browser.

---

## How It Works

1. Every URL (including `/writings`, `/writing/5`) is served the same `index.html` by Vercel's catch-all rewrite in `vercel.json`.
2. `index.html` loads `app.js` as a module.
3. `app.js` reads `window.location.pathname`, matches a route, and calls that page's `render()` function.
4. `render()` sets `appEl.innerHTML` and calls `updateHead()` to update the page title, meta tags, and JSON-LD.
5. Link clicks on `[data-link]` anchors are intercepted by an event listener in `app.js` — `history.pushState` + `router()` instead of a full page load.
6. `popstate` (browser back/forward) also triggers `router()`.

---

## app.js — The Router

```
app.js
  ├── window.__devoidSlowConn   — set at startup from navigator.connection
  ├── dismissLoader()           — fades out #page-loader after first render
  ├── updateHead(meta)          — updates <title>, meta, og:, twitter:, JSON-LD
  ├── setMeta() / setCanonical()— helpers for updateHead
  ├── routes[]                  — array of { path, render, pattern, keys }
  ├── router()                  — matches pathname, calls render(), handles 404
  ├── openMobileMenu()          — shows #mobile-menu overlay, locks body scroll
  ├── closeMobileMenu()         — hides #mobile-menu, restores scroll
  └── click listener            — handles hamburger, close btn, data-link anchors
```

### Route table

```js
var routes = [
  { path: '/',            render: renderHome        },
  { path: '/writings',   render: renderWritings    },
  { path: '/writing/:id', render: renderWritingItem },
];
```

`:id` is a dynamic segment. The router compiles each path to a RegExp and extracts named params into a `params` object passed to `render()`.

### updateHead(meta)

Called by every page render function. Accepts:

```js
{
  title:       'Page title',
  description: 'Meta description',
  canonical:   'https://devoid.pro/path',
  ogType:      'website' | 'article',
  ogUrl:       'https://devoid.pro/path',
  ogTitle:     'OG title',
  ogImage:     'https://devoid.pro/ass/devoid_pro_logo.png',
  jsonLd:      JSON.stringify({ '@context': '...', '@graph': [...] })
}
```

It upserts (creates or updates) each `<meta>`, `<link rel="canonical">`, and a `<script id="ld-json" type="application/ld+json">` in `<head>`. Never duplicates tags.

---

## Page Modules

Each page is an ES module in `pages/`. All export a single `render` function:

```js
export function render(appEl, params, updateHead) {
  appEl.innerHTML = `...`;  // set the full page HTML
  updateHead({ title: '...', ... });
  // any post-render DOM work (fetch, event listeners, progressive img reveal)
}
```

- `appEl` — the `<div id="app">` element. Always set its `innerHTML` first.
- `params` — object with route params (e.g. `{ id: '1' }` for `/writing/1`; `{}` for routes with no params).
- `updateHead` — the function from `app.js`. Always call it after setting innerHTML.

**Never** read `window.location` inside a page module — get the id from `params`.

---

## Component Modules

### `components/nav.js`

```js
export function createNav(isDark = false, activePage = null) → string
```

- `isDark = true` — dark/hero variant: `text-off-white`, logo uses `mix-blend-mode: screen`, no `border-b` on wrapper.
- `isDark = false` — light variant: `text-off-black`, logo uses `filter: invert(1); mix-blend-mode: multiply`, `border-b border-c-300`.
- `activePage = 'writings'` — adds `aria-current="page"` to the Writings link.
- Returns an HTML string — call inside a template literal: `${createNav(false, 'writings')}`.
- Includes the `#mobile-menu` overlay HTML (hidden by default). The open/close logic is in `app.js`.
- All internal links use `data-link` attribute so `app.js` intercepts them.
- Logo src: `/ass/devoid_pro_logo.png` (absolute path — see Rule 10 in `rules.md`).

### `components/footer.js`

```js
export function createFooter() → string
```

- Identical on all pages. Returns an HTML string.
- Social icon paths: `/ass/social/linkedin.svg`, `/ass/social/x.svg`, `/ass/social/insta.svg` (absolute).
- Email icon: inline SVG `fill="currentColor"` — no external library.
- External social links are regular `<a target="_blank">` — not `data-link`.

---

## Mobile Menu

The hamburger button (`#nav-hamburger`) and mobile menu overlay (`#mobile-menu`) are rendered by `createNav()`. The behaviour is wired in `app.js` using event delegation on `document`:

- Click on `#nav-hamburger` → `openMobileMenu()` — sets `#mobile-menu` to `display:flex`, locks `document.body` scroll.
- Click on `#nav-menu-close` → `closeMobileMenu()` — hides menu, restores scroll.
- Click on any `[data-link]` → `closeMobileMenu()` then navigates.
- Menu is automatically reset (hidden) on every route change because `createNav()` is re-called and produces fresh HTML via `innerHTML`.

---

## Page Loading Flow

1. Browser requests any URL → Vercel returns `index.html`.
2. `index.html` renders `#page-loader` (themed off-white screen with logo + progress bar).
3. `app.js` module loads, calls `router()`.
4. `router()` calls `render()` on the matched page module.
5. `render()` sets `appEl.innerHTML` (synchronous).
6. `dismissLoader()` is called — fades out `#page-loader` over 400ms, then removes it from DOM.
7. For subsequent navigations, `router()` applies a `page-enter` CSS animation (fade + translateY) to `#app`.

---

## Performance Layer

### Service Worker (`sw.js`)

Registered from `index.html` on `load`. Scope: `/` (entire site).

| Asset type | Strategy | Effect |
| --- | --- | --- |
| Images (`.jpg`, `.png`, `.svg`) | Cache-first + background revalidate | Instant from cache; silently refreshes in background |
| JS, CSS, JSON | Stale-while-revalidate | Instant cached response; new version quietly fetched |
| Navigation requests | Network → cache fallback | Works offline (serves cached `index.html`) |

Precached on install: `index.html`, `app.js`, `styles.css`, `custom.css`, `blogs.json`, all images in `/ass/`.

Cache name: `devoid-v1`. When assets change significantly, bump the version to force a clean install.

### Network-aware hero image (`pages/home.js`)

`window.__devoidSlowConn` is set by `app.js` at startup from `navigator.connection.effectiveType` and `saveData`.

- **Slow connection** (`slow-2g`, `2g`, or `saveData: true`) — the 1 MB hero JPEG is skipped entirely. A matching warm CSS gradient (`linear-gradient(150deg, #1a100a → #3d2a18)`) fills its place.
- **Fast connection** — the hero `<img>` renders with `opacity: 0` initially; a `load` event listener sets `opacity: 1` with a 0.6s CSS transition (progressive reveal).

### Blur-up images

Blog card images (`writings.js`) and post hero image (`writing-item.js`) render with `filter: blur(6–8px) + scale(1.03)` immediately after innerHTML is set. A `load` event clears both properties (with a CSS transition), producing a smooth sharpen. If the service worker serves from cache, `img.complete` is already true and the effect clears instantly.

### Skeleton loaders (`writings.js`)

Two `.blog-card` skeleton rows (`.sk-line` shimmer elements reusing the same grid layout as real cards) are injected into `#blog-list` immediately on render, before the `fetch('/blogs.json')` resolves. When real data arrives, `list.innerHTML = ''` clears them and real cards are appended.

### Resource hints (`index.html`)

```html
<link rel="preload" as="image" href="/ass/devoid_pro_logo.png" />
<link rel="prefetch" href="/blogs.json" />
```

Logo is preloaded (used on all pages). `blogs.json` is prefetched at idle time so the writings page is instant after home.

---

## Adding a New Page

1. Create `pages/your-page.js` — export `render(appEl, params, updateHead)`.
2. Add a route to `routes[]` in `app.js`.
3. Import the render function at the top of `app.js`.
4. Add the URL to `sitemap.xml`.
5. See `design-system.md` for the correct page skeleton.
6. See `seo-sitemap.md` for the correct `updateHead()` call.

---

## Vercel Routing

`vercel.json`:
```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

Vercel serves real static files (CSS, JS, images, JSON, `sw.js`) directly. The rewrite only fires for paths that don't map to a real file — so all SPA routes like `/writings` or `/writing/1` get `index.html`.

The service worker at `/sw.js` is a real file, so it is served correctly with the right scope.
