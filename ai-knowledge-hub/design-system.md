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
- **Serif accent:** Martina Plantijn — loaded via compiled CSS class only, use `font-serif` Tailwind class
- **Body `<body>` class:** `inter_5972bc34-module__OU16Qa__className martinaplantjin_e395065c-module__V_tPSa__variable bg-off-white font-sans antialiased`
- Nav/links: `font-[450]` (custom weight between regular and medium)
- Page headings: `font-serif font-light` with negative letter-spacing
- Tracking on writing cards: `letter-spacing: -1px` (inline style)

---

## Logo

File: `./ass/devoid_pro_logo.jpg` | Render size: 40×40 px | Corner: `rounded-sm`

### Dark/hero background (index.html)

```html
<img src="./ass/devoid_pro_logo.jpg" alt="Devoid" class="inline-block rounded-sm"
  style="mix-blend-mode: screen; height: 40px; width: 40px" />
```

### Light/off-white background (writings.html + all interior pages)

```html
<img src="./ass/devoid_pro_logo.jpg" alt="Devoid" class="inline-block rounded-sm"
  style="height: 40px; width: 40px; filter: invert(1); mix-blend-mode: multiply;" />
```

---

## Border System

```text
|a          |c         content         |d          |b|
```

| Border | Position | Tailwind / Inline |
| --- | --- | --- |
| a | Outer left | `border-l border-c-300` on page wrapper |
| b | Outer right | `border-r border-c-300` on page wrapper |
| c | 20% from left (10% on writings.html) | `position: absolute; left: 20%; width: 1px; background: #eae5de;` |
| d | 20% from right (10% on writings.html) | `position: absolute; right: 20%; width: 1px; background: #eae5de;` |

All body content must sit between c and d. Use `margin-left: 20%; margin-right: 20%` on the content wrapper (inline style — Tailwind `ml-[20%]` is not compiled).

**Exception:** `writings.html` uses 10% for c/d and content margins — narrower gutters, wider content zone.

No horizontal lines between cards or sections unless deliberately placed (nav underline, footer top).

---

## Navigation

Used on every page — identical structure. Centred at `max-w-[1172px]`, desktop height `88px`.

```html
<div class="w-full border-b border-c-300">
  <header class="z-10 mx-auto flex w-full max-w-[1172px] flex-row items-center gap-8 font-[450] text-off-black px-3 lg:h-[88px] xl:p-0 pt-4">

    <!-- Logo — use invert+multiply on light bg, screen on dark bg -->
    <a href="./index.html">
      <img src="./ass/devoid_pro_logo.jpg" alt="Devoid" class="inline-block rounded-sm"
        style="height: 40px; width: 40px; filter: invert(1); mix-blend-mode: multiply;" />
    </a>

    <!-- Active nav link (add aria-current="page" on current page) -->
    <a class="group relative hidden items-center gap-1 rounded-md text-center text-sm transition-opacity hover:opacity-70 active:opacity-100 lg:flex"
       href="./writings.html" aria-current="page">
      Writings
      <svg viewBox="0 0 10 9" class="inline-block fill-current size-2.5 opacity-0 transition-opacity group-hover:opacity-100"
           preserveAspectRatio="xMidYMid meet" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.52614 8.72409L4.75519 7.96238L7.66357 5.05399H0.249512V3.94604H7.66357L4.75519 1.04689L5.52614 0.27594L9.75022 4.50002L5.52614 8.72409Z"></path>
      </svg>
    </a>

    <!-- Mobile hamburger -->
    <button class="inline-flex items-center justify-center gap-1 text-[15px] cursor-pointer font-inter font-[450] leading-[11px] tracking-[-0.2px] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-off-black/5 h-12 w-12 rounded-full -mr-3 ml-auto lg:hidden text-off-black"
            type="button" aria-label="Open mobile menu">
      <svg viewBox="0 0 24 24" class="inline-block fill-current size-6" preserveAspectRatio="xMidYMid meet" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.5 15H1.5C1.22386 15 1 15.2239 1 15.5V16.5C1 16.7761 1.22386 17 1.5 17H22.5C22.7761 17 23 16.7761 23 16.5V15.5C23 15.2239 22.7761 15 22.5 15Z"></path>
        <path d="M22.5 7H1.5C1.22386 7 1 7.22386 1 7.5V8.5C1 8.77614 1.22386 9 1.5 9H22.5C22.7761 9 23 8.77614 23 8.5V7.5C23 7.22386 22.7761 7 22.5 7Z"></path>
      </svg>
    </button>

  </header>
</div>
```

**Note:** On dark/hero pages change `text-off-black` to `text-off-white` in both header and button classes.

---

## Footer

Identical on all pages. Copy from `writings.html` — do not rewrite from memory.

Key classes on the inner div: `border-c-300 border-r border-l border-t`  
This continues the a/b border lines and adds the top separator.

Two columns: left (legal text + mobile socials), right desktop-only (We're hiring + social icons).

Social icons in `./ass/social/`: `linkedin.svg`, `x.svg`, `insta.svg`, `tiktok.svg`, `youtube.svg`  
Mobile size: `size-6` | Desktop size: `size-[18px]`

---

## "Read the Announcement" Button

Used on writing cards. Inline style required for background (not a compiled Tailwind class).

```html
<a class="group relative inline-flex items-center gap-1 rounded-sm px-3 py-1 text-sm transition-opacity hover:opacity-70 active:opacity-100"
   style="background: #F2EEE8; color: #4a4035;" href="./writing-item.html?id=N">
  Read the announcement
  <svg viewBox="0 0 10 9" class="inline-block fill-current size-2.5" preserveAspectRatio="xMidYMid meet"
       aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.52614 8.72409L4.75519 7.96238L7.66357 5.05399H0.249512V3.94604H7.66357L4.75519 1.04689L5.52614 0.27594L9.75022 4.50002L5.52614 8.72409Z"></path>
  </svg>
</a>
```

---

## Page Skeleton (interior / light background)

```html
<!doctype html>
<html lang="en">
<head>
  <!-- [SEO head block — see seo-sitemap.md] -->
</head>
<body class="inter_5972bc34-module__OU16Qa__className martinaplantjin_e395065c-module__V_tPSa__variable bg-off-white font-sans antialiased">
  <div class="flex min-h-screen flex-col items-center bg-off-white text-off-black">
    <div class="flex-1 flex w-full max-w-[1204px] 2xl:max-w-[1440px] flex-col">

      <div class="flex-1 border-l border-r border-c-300">  <!-- a + b borders -->

        <!-- NAV (border-b border-c-300 on wrapper div) -->

        <!-- BODY: relative container for c + d lines -->
        <!-- NOTE: writings.html uses 10% for c/d gutters; all other pages use 20% -->
        <div style="position: relative;">
          <div style="position: absolute; top: 0; bottom: 0; left: 20%; width: 1px; background: #eae5de;"></div>
          <div style="position: absolute; top: 0; bottom: 0; right: 20%; width: 1px; background: #eae5de;"></div>
          <!-- content between c and d -->
          <div style="margin-left: 20%; margin-right: 20%; padding: 80px 40px 60px;">
            <!-- PAGE CONTENT HERE -->
          </div>
        </div>

      </div>

      <!-- FOOTER -->

    </div>
  </div>
</body>
</html>
```

---

## Assets

```text
ass/
  devoid_pro_logo.jpg     — logo (JPG with dark background — see Logo section)
  devoid_hero_bg.jpg      — landing page hero background image
  blog-bg/
    blog-1.jpg            — first writing post image
    blog-N.jpg            — add more here, reference in blogs.json
  social/
    linkedin.svg, x.svg, insta.svg, tiktok.svg, youtube.svg
```
