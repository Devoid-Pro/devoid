# Devoid — Critical Rules

Read this before writing any code for this project. These rules have been learned through real mistakes.

---

## 1. Tailwind is Pre-Compiled — DO NOT Use Arbitrary Classes

`styles.css` was compiled once from the original source. **Only classes that already exist in that file will work.**

If you write a Tailwind class that was never in the original source, it silently does nothing — no error, just invisible/broken styling.

### Known safe classes (confirmed in source)

Layout: `flex`, `flex-col`, `flex-row`, `flex-1`, `items-center`, `items-start`, `justify-center`, `justify-end`, `hidden`, `inline-block`, `inline-flex`, `grow`, `shrink-0`, `overflow-hidden`, `relative`, `absolute`, `z-10`

Sizing: `w-full`, `h-full`, `min-h-screen`, `max-w-[1172px]`, `max-w-[1204px]`, `2xl:max-w-[1440px]`, `h-12`, `w-12`, `size-6`, `size-2.5`, `size-[18px]`

Spacing: `px-3`, `px-4`, `px-6`, `py-1`, `pt-4`, `pt-16`, `pb-20`, `gap-1`, `gap-2`, `gap-3`, `gap-4`, `gap-6`, `gap-8`, `gap-12`, `gap-16`, `gap-28`

Typography: `font-sans`, `font-serif`, `font-inter`, `font-light`, `font-[450]`, `antialiased`, `text-xs`, `text-sm`, `text-base`, `text-xl`, `text-5xl`, `text-6xl`, `text-8xl`, `text-center`, `text-left`, `leading-relaxed`, `tracking-tight`

Colours: `bg-off-white`, `bg-c-800`, `text-off-white`, `text-off-black`, `text-c-50`, `text-c-100`, `text-c-400`, `text-c-500`, `text-c-900`, `border-c-300`, `opacity-45`, `opacity-75`

Borders/Radius: `border-l`, `border-r`, `border-t`, `border-b`, `rounded-sm`, `rounded-md`, `rounded-[9px]`, `rounded-[11px]`, `rounded-[14px]`

Responsive: `lg:flex`, `lg:hidden`, `lg:h-[88px]`, `lg:flex-row`, `lg:px-6`, `lg:text-left`, `lg:gap-6`, `xl:p-0`, `2xl:max-w-[1440px]`

Interaction: `transition-opacity`, `hover:opacity-70`, `hover:opacity-75`, `active:opacity-100`, `cursor-pointer`, `focus-visible:outline-none`

Fill: `fill-current`

### Known BAD classes (NOT compiled — will silently fail)

- `w-1/5` — gives zero width, borders become invisible ← burned us once
- `w-3/5`, `w-2/5`, `ml-[20%]`, `mr-[20%]` — likely not compiled
- `bg-[#F2EEE8]`, `bg-[#FFFEFC17]` — arbitrary bg colours not in source
- `text-c-700` — not confirmed in devoid's styles.css

### Rule: Use inline styles for anything not in the safe list above

```html
<!-- WRONG — w-1/5 not compiled, border invisible -->
<div class="w-1/5 border-r border-c-300"></div>

<!-- CORRECT — inline style for the width -->
<div style="width: 20%; border-right: 1px solid #eae5de;"></div>
```

---

## 2. Border System — Name Every Line

All interior/content pages use a named 4-border system. Never add random borders — place them in this system.

```text
|a          |c      content      |d          |b|
```

| Name | Description | How to implement |
| --- | --- | --- |
| a | Outer left edge | `border-l border-c-300` on the page wrapper |
| b | Outer right edge | `border-r border-c-300` on the page wrapper |
| c | Left content boundary (20% from left, or 10% on writings page) | `.post-c-line` / `.blog-c-line` CSS class |
| d | Right content boundary (20% from right, or 10% on writings page) | `.post-d-line` / `.blog-d-line` CSS class |

**All body content must be between c and d.** Use `margin-left: 20%; margin-right: 20%` on content wrappers (inline style — Tailwind `ml-[20%]` is not compiled).

---

## 3. Logo Treatment Depends on Background

Logo file: `/ass/devoid_pro_logo.png` (PNG, not JPG)

The `createNav(isDark)` component handles this automatically. Only set it manually if building something outside of `createNav`.

**On dark/hero backgrounds:**

```html
style="mix-blend-mode: screen; height: 36px; width: auto"
```

**On light/off-white backgrounds:**

```html
style="height: 36px; width: auto; filter: invert(1); mix-blend-mode: multiply;"
```

---

## 4. Nav and Footer Are Reusable Components

**Do not write nav or footer HTML by hand.** Import and call the component functions:

```js
import { createNav }    from '../components/nav.js';
import { createFooter } from '../components/footer.js';

// In the template literal:
${createNav(isDark, activePage)}
${createFooter()}
```

- `createNav(true, null)` — dark hero variant (home page)
- `createNav(false, 'writings')` — light variant, Writings link active
- `createNav(false, null)` — light variant, no active link (post detail page)
- `createFooter()` — identical on all pages, no arguments

The mobile menu overlay (`#mobile-menu`) is included in `createNav()`. Its open/close behaviour is wired in `app.js` — do not add separate event listeners for it.

---

## 5. New Pages — Checklist

When creating a new page:

1. Create `pages/your-page.js` with `export function render(appEl, params, updateHead)`.
2. Set `appEl.innerHTML` with the full page HTML using the skeleton from `design-system.md`.
3. Use `${createNav(isDark, activePage)}` and `${createFooter()}` inside the template.
4. Call `updateHead({...})` — see `seo-sitemap.md` for the correct fields.
5. Add the route to `app.js` routes array and import the render function.
6. Add the URL to `sitemap.xml`.
7. All internal links must use `data-link` attribute — `app.js` intercepts them.
8. All asset paths must be root-relative (`/ass/...`) — see Rule 10.

---

## 6. No Build Tool — No npm — No Framework

Do not run `npm install`, `npx tailwind`, or anything that could regenerate `styles.css`. The compiled file is the source of truth.

The site uses native ES Modules (`type="module"`). No bundler is needed — the browser handles imports directly. Do not add `package.json` or any tooling.

For site-wide custom CSS that cannot go in `styles.css`, use `custom.css`. It is loaded from `index.html` after `styles.css`.

---

## 7. Blog Data Comes from blogs.json

`pages/writings.js` and `pages/writing-item.js` both fetch `/blogs.json` (absolute path) at runtime. To add a new post, add an entry to `blogs.json` only.

`imageUrl` in `blogs.json` must be a root-relative absolute path: `/ass/blog-bg/blog-N.png`. Do NOT use `./ass/...` — see Rule 10.

`fetch()` requires an HTTP server — does not work as a `file://` URL. Use `npx serve .` for local dev.

---

## 8. Footer Must Always Sit at the Bottom of the Viewport

Even when the main content is short, the footer must not float mid-page.

### 3-level flex column (required on all interior pages)

```js
// In the page module's template literal:
`<div class="flex min-h-screen flex-col items-center bg-off-white text-off-black">
  <div class="flex-1 flex w-full max-w-[1204px] 2xl:max-w-[1440px] flex-col">
    <div class="flex-1 border-l border-r border-c-300">
      <!-- nav + page body -->
    </div>
    ${createFooter()}
  </div>
</div>`
```

The critical class is `flex-1` on the `max-w-[1204px]` div. Without it the footer rises up.

---

## 9. No Country or Region Mentions — Anywhere

**Do not name any country, city, or region in any user-facing text, metadata, or structured data.**

This includes: Sri Lanka, USA, Colombo, Silicon Valley, offshore, nearshore, or any geography.

Devoid is global-to-global. See `rules.md` Rule 9 original for the full approved/banned framing list.

---

## 10. Asset Paths Must Be Root-Relative (Absolute)

**All asset paths and fetch calls inside JS modules must start with `/`, not `./`.**

```js
// WRONG — breaks at /writing/1 (resolves to /writing/ass/...)
fetch('./blogs.json')
src="./ass/devoid_pro_logo.png"

// CORRECT — always resolves to the site root
fetch('/blogs.json')
src="/ass/devoid_pro_logo.png"
```

**Why:** At the route `/writing/1`, a relative path `./` resolves relative to `/writing/`, not to `/`. So `./ass/x.png` becomes `/writing/ass/x.png` → 404.

**Exception:** Paths in `index.html` `<head>` static tags (e.g. `./styles.css`, `./ass/devoid_mini_logo.jpg`) are safe because `index.html` always loads from the root document, regardless of which SPA route the user is on.

---

## 11. All Internal Links Must Use data-link

Any `<a>` tag that navigates between SPA routes must have the `data-link` attribute. Without it, the browser does a full page reload instead of a client-side navigation.

```html
<!-- WRONG — full page reload -->
<a href="/writings">Writings</a>

<!-- CORRECT — intercepted by app.js event delegation -->
<a href="/writings" data-link>Writings</a>
```

External links (`target="_blank"`) do not need `data-link`.
