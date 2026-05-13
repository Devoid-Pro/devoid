# Devoid — Critical Rules

Read this before writing any HTML or CSS for this project. These rules have been learned through real mistakes.

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
- `w-1/5` — gives zero width, borders become invisible ← this burned us once
- `w-3/5`, `w-2/5`, `ml-[20%]`, `mr-[20%]` — likely not compiled
- `bg-[#F2EEE8]`, `bg-[#FFFEFC17]` — arbitrary bg colours from other sites not in source
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

```
|a          |c      content      |d          |b|
```

| Name | Description | How to implement |
|---|---|---|
| a | Outer left edge | `border-l border-c-300` on the page wrapper |
| b | Outer right edge | `border-r border-c-300` on the page wrapper |
| c | Left content boundary (20% from left) | `position: absolute; left: 20%; width: 1px; background: #eae5de;` |
| d | Right content boundary (20% from right = 80% from left) | `position: absolute; right: 20%; width: 1px; background: #eae5de;` |

**All body content must be between c and d.** Use `margin-left: 20%; margin-right: 20%` on content wrappers (not Tailwind classes — they're not compiled).

**No horizontal lines between cards or sections** unless explicitly added as a deliberate design element (e.g., nav bottom border, footer top border).

---

## 3. Logo Treatment Depends on Background

The logo file (`./ass/devoid_pro_logo.jpg`) has a dark background. Rendering it naively on a light page shows a dark rectangle.

**On dark/hero backgrounds (index.html):**
```html
style="mix-blend-mode: screen; height: 40px; width: 40px"
```
Screen blend mode makes the dark JPG background vanish against a dark hero.

**On light/off-white backgrounds (blog.html and all interior pages):**
```html
style="height: 40px; width: 40px; filter: invert(1); mix-blend-mode: multiply;"
```
`invert(1)` flips white mark → black, dark bg → white. `multiply` makes the white vanish on the off-white page.

---

## 4. Nav and Footer Are Identical Across All Pages

Copy them exactly. Only change text colour (`text-off-white` on dark, `text-off-black` on light) and logo style (see Rule 3).

**Nav wrapper always has `border-b border-c-300`** (the horizontal underline).  
**Footer inner div always has `border-c-300 border-r border-l border-t`** (top + a/b continuation).

---

## 5. New Pages — Checklist

When creating a new page:

1. Copy the body wrapper skeleton from `design-system.md`
2. Copy nav from `blog.html` (change active link)
3. Copy footer from `blog.html` exactly
4. Set the correct logo style for the page background (Rule 3)
5. All body content goes between c and d (Rule 2)
6. Add the full SEO head block — see `seo-sitemap.md`
7. Add the new URL to `sitemap.xml` — see `seo-sitemap.md`

---

## 6. No Build Tool — No npm — No Framework

Do not run `npm install`, `npx tailwind`, or anything that could regenerate `styles.css`. The compiled file is the source of truth. Adding new Tailwind utilities requires inline styles as a workaround.

---

## 7. Blog Data Comes from blogs.json

The blog listing page (`blog.html`) fetches `blogs.json` at runtime via `fetch()`. To add a new blog post, add an entry to `blogs.json` only — do not modify `blog.html`.

`fetch()` requires an HTTP server — it will not work if `blog.html` is opened as a `file://` URL locally. It works correctly at `devoid.pro`.
