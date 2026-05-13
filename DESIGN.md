# Devoid Design System

## Stack

- Pure static HTML + compiled Tailwind CSS (`styles.css`, 62.6 KB)
- No build tool, no framework, no npm
- **Critical:** only classes used in the original compiled source are available. Any Tailwind class not in `styles.css` compiles to zero/nothing — use inline styles as a fallback for anything non-standard (e.g. `w-1/5` is NOT compiled).

---

## Colour Palette

All colours are Tailwind custom tokens defined in the compiled `styles.css`.

| Token | Hex | Usage |
|---|---|---|
| `off-white` | `#f7f4f0` | Page background, hero text |
| `off-black` | `#140e00` | Body text on light pages |
| `c-50` | (near white) | Hero headings, hero sub-text |
| `c-100` | — | Button text (light) |
| `c-300` | `#eae5de` | **All border lines** |
| `c-400` | — | Muted body text |
| `c-500` | — | Footer legal text |
| `c-800` | — | CTA button background |
| `c-900` | — | Footer link text (at 45% opacity) |

### Theme colour
```html
<meta name="theme-color" content="#f7f4f0" />
```

---

## Typography

- **Primary font:** Inter (Google Fonts, weights 300/400/500/600/700)
- **Serif accent:** Martina Plantijn (loaded via compiled CSS class `martinaplantjin_e395065c-module__V_tPSa__variable`)
- **Body class on `<body>`:**
  ```
  inter_5972bc34-module__OU16Qa__className martinaplantjin_e395065c-module__V_tPSa__variable bg-off-white font-sans antialiased
  ```
- Nav/links use `font-[450]` (custom weight between regular and medium)
- Headings use `font-serif font-light` with `tracking-[-3.5px]`

---

## Logo

File: `./ass/devoid_pro_logo.jpg`  
Size rendered: 40×40 px, `rounded-sm`

### On dark / hero backgrounds (index.html)
```html
<img src="./ass/devoid_pro_logo.jpg" alt="Devoid" class="inline-block rounded-sm"
  style="mix-blend-mode: screen; height: 40px; width: 40px" />
```
`mix-blend-mode: screen` makes the dark background of the JPG vanish against a dark hero image.

### On light / off-white backgrounds (blog.html, all interior pages)
```html
<img src="./ass/devoid_pro_logo.jpg" alt="Devoid" class="inline-block rounded-sm"
  style="height: 40px; width: 40px; filter: invert(1); mix-blend-mode: multiply;" />
```
`filter: invert(1)` flips white mark → black, dark bg → white.  
`mix-blend-mode: multiply` then makes the white areas vanish against the off-white page background.

---

## Border System (interior / content pages)

Every interior page uses four named vertical lines. **No horizontal lines** between sections or cards (except deliberately placed ones like the nav bottom border).

```
|a                    |c         content         |d                    |b|
```

| Border | Position | Implementation |
|---|---|---|
| **a** | Outer left | `border-l border-c-300` on the page wrapper |
| **b** | Outer right | `border-r border-c-300` on the page wrapper |
| **c** | 20% from left | Absolutely-positioned 1 px `<div>` — see below |
| **d** | 20% from right (= 80% from left) | Absolutely-positioned 1 px `<div>` — see below |

### Page wrapper (provides a + b borders)
```html
<div class="flex w-full max-w-[1204px] 2xl:max-w-[1440px] flex-col">
  <div class="flex-1 border-l border-r border-c-300">
    <!-- nav + body content here -->
  </div>
  <footer>...</footer>
</div>
```

### c and d lines — use inline styles (w-1/5 is NOT compiled)
```html
<div style="position: relative; ...">
  <!-- c border: 20% from left -->
  <div style="position: absolute; top: 0; bottom: 0; left: 20%; width: 1px; background: #eae5de;"></div>
  <!-- d border: 20% from right -->
  <div style="position: absolute; top: 0; bottom: 0; right: 20%; width: 1px; background: #eae5de;"></div>
</div>
```

**All body content on every page must live between c and d.** Use a content wrapper with `margin-left: 20%; margin-right: 20%` (inline style — Tailwind `ml-[20%]` may not be compiled) nested inside the relative container that holds the c/d lines.

---

## Navigation

Same structure on every page. Centered at `max-w-[1172px]`, height `88px` on desktop.

```html
<div class="w-full border-b border-c-300">
  <header class="z-10 mx-auto flex w-full max-w-[1172px] flex-row items-center gap-8 font-[450] px-3 lg:h-[88px] xl:p-0 pt-4
                 text-off-white  ← hero/dark pages
                 text-off-black  ← light/interior pages">

    <!-- Logo (see Logo section for correct style per background) -->
    <a href="./index.html"><img ... /></a>

    <!-- Desktop nav link with arrow icon -->
    <a class="group relative hidden items-center gap-1 rounded-md text-center text-sm
              transition-opacity hover:opacity-70 active:opacity-100 lg:flex"
       href="./blog.html">
      Blogs
      <svg viewBox="0 0 10 9" class="inline-block fill-current size-2.5 opacity-0 transition-opacity group-hover:opacity-100" ...>
        <path d="M5.52614 8.72409L4.75519 7.96238L7.66357 5.05399H0.249512V3.94604H7.66357L4.75519 1.04689L5.52614 0.27594L9.75022 4.50002L5.52614 8.72409Z"></path>
      </svg>
    </a>

    <!-- Mobile hamburger (ml-auto pushes to right) -->
    <button class="... ml-auto lg:hidden" type="button" aria-label="Open mobile menu">
      <svg viewBox="0 0 24 24" ...>[two-bar hamburger paths]</svg>
    </button>
  </header>
</div>
```

The `border-b border-c-300` on the outer `<div>` draws the horizontal line under the nav spanning from a to b.

---

## Footer

Identical on all pages. The footer's inner div carries `border-l border-r border-c-300` which continues the a/b lines. Add `border-t border-c-300` to visually separate footer from body.

```html
<footer class="relative flex h-full w-full grow flex-col">
  <div class="relative flex h-full grow flex-col overflow-hidden px-4 text-center
              lg:flex-row lg:px-6 lg:text-left
              border-c-300 border-r border-l border-t">

    <!-- Left column: copyright, legal, description -->
    <div class="flex w-full flex-1 flex-col gap-16 pt-16 pb-20 lg:gap-6">
      <!-- Mobile-only: nav links + social icons -->
      <!-- Legal: © Devoid, Terms & Privacy, Support -->
      <!-- Two-paragraph company description (text-c-500 text-xs) -->
    </div>

    <!-- Right column (desktop only): "We're hiring" + social icons -->
    <div class="hidden w-full flex-1 items-start justify-end gap-8 pt-16 pb-20 lg:flex">
      ...
    </div>

  </div>
</footer>
```

### Social icons
Located in `./ass/social/`: `linkedin.svg`, `x.svg`, `insta.svg`, `tiktok.svg`, `youtube.svg`  
Rendered at `size-6` mobile / `size-[18px]` desktop.

---

## Assets

```
ass/
  devoid_pro_logo.jpg   — logo (JPG with dark background)
  devoid_hero_bg.jpg    — landing page hero background
  social/
    linkedin.svg
    x.svg
    insta.svg
    tiktok.svg
    youtube.svg
```

---

## SEO Template (per page)

```html
<title>Page Title — Devoid</title>
<meta name="description" content="..." />
<meta name="author" content="Devoid" />
<meta name="robots" content="index, follow" />
<link rel="canonical" href="https://devoid.pro/page.html" />

<meta property="og:type" content="website" />
<meta property="og:site_name" content="Devoid" />
<meta property="og:url" content="https://devoid.pro/page.html" />
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://devoid.pro/ass/devoid_pro_logo.jpg" />
<meta property="og:image:alt" content="Devoid logo" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="https://devoid.pro/ass/devoid_pro_logo.jpg" />
```

JSON-LD: always include the `Organization` node (`@id: https://devoid.pro/#organization`). Add page-specific types (WebSite, Blog, BlogPosting, etc.) as needed.

---

## Page Template (interior / light background)

```html
<body class="inter_5972bc34-module__OU16Qa__className martinaplantjin_e395065c-module__V_tPSa__variable bg-off-white font-sans antialiased">
  <div class="flex min-h-screen flex-col items-center bg-off-white text-off-black">
    <div class="flex w-full max-w-[1204px] 2xl:max-w-[1440px] flex-col">

      <div class="flex-1 border-l border-r border-c-300">  <!-- a + b borders -->

        <!-- NAV (with border-b for underline) -->

        <!-- BODY CONTENT (with c + d lines via absolute positioning) -->

      </div>

      <!-- FOOTER -->

    </div>
  </div>
</body>
```
