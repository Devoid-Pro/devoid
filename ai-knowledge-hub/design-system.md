# Devoid — Design System

---

## Colour Palette

All colours are custom Tailwind tokens compiled into `styles.css`.

| Token | Hex | Role |
| --- | --- | --- |
| `off-white` | `#f7f4f0` | Page background |
| `off-black` | `#140e00` | Primary body text on light pages |
| `c-50` | near white | Hero headings, hero sub-text |
| `c-100` | — | Button text (light) |
| `c-300` | `#eae5de` | **All border lines** — use this hex for inline-style borders too |
| `c-400` | — | Muted text |
| `c-500` | — | Secondary body text, footer legal |
| `c-800` | — | CTA button background |
| `c-900` | — | Footer links (always at `opacity-45`) |

**Button background colour** (not a Tailwind token — always inline style): `#F2EEE8`
**Muted date/label text colour** (inline style): `#9a8f82`
**Writing card button text colour** (inline style): `#4a4035`

---

## Typography

- **Primary font:** Inter, weights 300/400/500/600/700 — loaded from Google Fonts
- **Serif accent:** Martina Plantijn — loaded via compiled CSS class, use `font-serif` Tailwind class
- **Body `<body>` class:** `inter_5972bc34-module__OU16Qa__className martinaplantjin_e395065c-module__V_tPSa__variable bg-off-white font-sans antialiased`
- Nav/links: `font-[450]` (custom weight between regular and medium)
- Page headings: `font-serif font-light` with negative letter-spacing
- Tracking on writing cards: `letter-spacing: -1px` (inline style)

---

## Logo

File: `/ass/devoid_pro_logo.png` | Render height: `36px` | Width: `auto`

The `createNav(isDark)` component sets the correct style automatically. Only use these directly if building outside `createNav`.

### Dark/hero background (home page)

```html
<img src="/ass/devoid_pro_logo.png" alt="Devoid" class="inline-block"
  style="mix-blend-mode: screen; height: 36px; width: auto" />
```

### Light/off-white background (writings + all interior pages)

```html
<img src="/ass/devoid_pro_logo.png" alt="Devoid" class="inline-block"
  style="height: 36px; width: auto; filter: invert(1); mix-blend-mode: multiply;" />
```

**Note:** The logo is a PNG (not JPG). The favicon (`/ass/devoid_mini_logo.jpg`) is a separate file.

---

## Border System

```text
|a          |c         content         |d          |b|
```

| Border | Position | Implementation |
| --- | --- | --- |
| a | Outer left | `border-l border-c-300` on page wrapper |
| b | Outer right | `border-r border-c-300` on page wrapper |
| c | 20% from left (10% on /writings) | `.post-c-line` or `.blog-c-line` CSS class |
| d | 20% from right (10% on /writings) | `.post-d-line` or `.blog-d-line` CSS class |

All body content must sit between c and d. Use `margin-left: 20%; margin-right: 20%` on the content wrapper (inline style — Tailwind `ml-[20%]` is not compiled).

**Exception:** `/writings` uses 10% for c/d and content margins — narrower gutters, wider content zone.

No horizontal lines between cards or sections unless deliberately placed (nav underline, footer top).

---

## Navigation Component

Use `createNav(isDark, activePage)` from `components/nav.js`. Never write nav HTML by hand.

```js
import { createNav } from '../components/nav.js';

// In template literal:
${createNav(true, null)}       // dark hero (home page)
${createNav(false, 'writings')} // light, Writings active
${createNav(false, null)}      // light, no active link
```

The component renders:

- Logo linking to `/` with `data-link`
- "Writings" link to `/writings` with `data-link` (hidden on mobile, visible lg+)
- Hamburger button (`#nav-hamburger`) — visible on mobile only
- Full-screen mobile menu overlay (`#mobile-menu`) — hidden by default, wired in `app.js`

Desktop nav height: `lg:h-[88px]`. Centred at `max-w-[1172px]`.

---

## Footer Component

Use `createFooter()` from `components/footer.js`. Never write footer HTML by hand.

```js
import { createFooter } from '../components/footer.js';

// In template literal:
${createFooter()}
```

Identical on all pages. Key classes on the inner div: `border-c-300 border-r border-l border-t` (continues a/b borders and adds top separator).

Two-column layout: left (legal text + mobile social icons), right desktop-only (We're hiring + icons).

Social icons: `/ass/social/linkedin.svg`, `/ass/social/x.svg`, `/ass/social/insta.svg` (absolute paths).
Email icon: inline SVG `fill="currentColor"` — no library.
Mobile size: `size-6` | Desktop size: `size-[18px]`

---

## "Read the Announcement" Button

Used on writing cards. Inline style required for background (not a compiled Tailwind class).

```html
<a class="blog-card-btn group relative inline-flex items-center gap-1 rounded-sm px-3 py-1 text-sm transition-opacity hover:opacity-70 active:opacity-100"
   style="background:#F2EEE8;color:#4a4035;" href="/writing/1" data-link>
  Read the announcement
  <svg viewBox="0 0 10 9" class="inline-block fill-current size-2.5" ...>
    <path d="M5.52614 8.72409..."></path>
  </svg>
</a>
```

Link format: `/writing/[id]` with `data-link`. Not `writing-item.html?id=N`.

---

## Page Skeleton (interior / light background)

All interior pages follow this JS module pattern:

```js
import { createNav }    from '../components/nav.js';
import { createFooter } from '../components/footer.js';

export function render(appEl, params, updateHead) {
  appEl.innerHTML = `
    <div class="flex min-h-screen flex-col items-center bg-off-white text-off-black">
      <div class="flex-1 flex w-full max-w-[1204px] 2xl:max-w-[1440px] flex-col">

        <div class="flex-1 border-l border-r border-c-300">

          ${createNav(false, null)}

          <div style="position: relative;">
            <div class="post-c-line"></div>
            <div class="post-d-line"></div>
            <div style="margin-left:20%;margin-right:20%;padding:80px 40px 60px;">
              <!-- PAGE CONTENT HERE -->
            </div>
          </div>

        </div>

        ${createFooter()}

      </div>
    </div>
  `;

  updateHead({ title: '...', description: '...', canonical: '...', ... });
}
```

The `/writings` route uses `.blog-c-line` / `.blog-d-line` and 10% margins instead of 20%.

---

## Page Loader

`index.html` renders `#page-loader` (off-white overlay, logo breathing animation, sweeping progress bar at bottom) while JS loads. `app.js` calls `dismissLoader()` after the first route renders — it fades out over 400ms then is removed from DOM.

CSS classes in `custom.css`: `#page-loader`, `#page-loader.hidden`, `#loader-logo`, `#loader-progress`, `#loader-progress-fill`. Keyframes: `loader-breathe`, `loader-sweep`.

---

## Page Transition

After every route change (except the initial load), `app.js` adds the class `page-enter` to `#app`. The CSS in `custom.css` applies:

```css
@keyframes page-fade-in {
  from { opacity: 0; transform: translateY(7px); }
  to   { opacity: 1; transform: translateY(0);   }
}
#app.page-enter { animation: page-fade-in 0.22s ease forwards; }
```

---

## Skeleton Loaders

Used on `/writings` while `blogs.json` fetches. `.sk-line` elements reuse the existing `.blog-card` grid. CSS in `custom.css`:

```css
.sk-line {
  background: linear-gradient(90deg, #eae5de 25%, #f0ece6 50%, #eae5de 75%);
  background-size: 200% 100%;
  animation: sk-shimmer 1.4s ease-in-out infinite;
  border-radius: 3px;
  height: 12px;
}
```

---

## Assets

```text
ass/
  devoid_pro_logo.png     — logo (PNG) — use with invert+multiply on light, screen on dark
  devoid_mini_logo.jpg    — favicon only
  devoid_hero_bg.jpg      — home page hero background (1204×881)
  blog-bg/
    blog-1.png            — first writing post image
    blog-N.png            — add more here, reference in blogs.json with /ass/blog-bg/blog-N.png
  social/
    linkedin.svg, x.svg, insta.svg, tiktok.svg, youtube.svg, email.svg
```

All asset paths in JS modules must be root-relative: `/ass/...` not `./ass/...` — see Rule 10 in `rules.md`.
