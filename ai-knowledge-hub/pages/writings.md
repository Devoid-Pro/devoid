# Page: Writings Listing

URL: `https://devoid.pro/writings`
File: `pages/writings.js`
Data: `blogs.json`

---

## Purpose

Lists all Devoid writing posts. Data-driven — posts load from `/blogs.json` at runtime via `fetch()`. To publish a new post, add an entry to `blogs.json` only — do not modify `writings.js`.

---

## Page Structure

```text
render(appEl) sets appEl.innerHTML:

<div> (centering wrapper, flex min-h-screen flex-col)
  <div> (flex-1 max-w-[1204px] column)

    <div class="flex-1 border-l border-r border-c-300">   ← a + b borders

      ${createNav(false, 'writings')}                      ← light, Writings active

      <div style="position:relative">
        <div class="blog-c-line">   ← c: 10% from left
        <div class="blog-d-line">   ← d: 10% from right
        <div class="blog-content-zone">   ← margin 10% each side
          <h1> Writings
          <p>  description
          <div id="blog-list">   ← skeletons first, then JS renders real cards

    ${createFooter()}
```

---

## Border System

This page uses **10% gutters** — narrower than the default 20% used on other interior pages.

| Border | Implementation |
| --- | --- |
| a / b | `border-l border-r border-c-300` on the `flex-1` div |
| c | `.blog-c-line { position:absolute; left:10%; width:1px; background:#eae5de; }` |
| d | `.blog-d-line { position:absolute; right:10%; width:1px; background:#eae5de; }` |

Content wrapper: `.blog-content-zone { margin-left:10%; margin-right:10%; padding:80px 40px 60px; }`

---

## blogs.json Schema

Location: `blogs.json` (project root)

```json
[
  {
    "id": 1,
    "order": 1,
    "slug": "url-safe-hyphenated-slug",
    "topic": "Full title of the writing post",
    "date": "YYYY-MM-DD",
    "miniDescription": "One or two sentence teaser shown on the listing card.",
    "description": "<p>Full article as HTML.</p>",
    "imageUrl": "/ass/blog-bg/blog-1.png"
  }
]
```

### Field rules

- `id` — integer, unique — matched by `/writing/:id` route
- `order` — integer — JS sorts ascending before rendering
- `slug` — reserved for future slug-based URLs (unused by router currently)
- `miniDescription` — keep under 160 characters
- `description` — full HTML, rendered as `innerHTML` on the post detail page
- `imageUrl` — **must be an absolute root-relative path**: `/ass/blog-bg/blog-N.png` — never `./ass/...`

### Adding a new writing post

1. Add the image to `/ass/blog-bg/` named `blog-N.png` (increment N)
2. Add a new entry to `blogs.json` with the next `id` and desired `order`
3. Set `date` to publish date in `YYYY-MM-DD` format
4. Write `description` as HTML — see `writing-item.md` for supported elements

---

## Loading Sequence

1. `render()` sets `appEl.innerHTML` (nav + headings + `#blog-list`).
2. Two skeleton `.blog-card` rows are injected into `#blog-list` immediately (shimmer `.sk-line` elements).
3. `fetch('/blogs.json')` fires.
4. On resolve: `list.innerHTML = ''` clears skeletons, real cards are appended sorted by `order`.
5. On error: a plain error message replaces the skeletons.

---

## Writing Card Layout

```text
┌─────────────────────────────────────────────────────────────┐
│  [date — "Month D, YYYY"]           [image — 32% width,    │
│                                      180px height,         │
│  [topic — serif, 24px]               object-fit: cover]    │
│                                                             │
│  [miniDescription — 14px, 1.7lh]                           │
│                                                             │
│  [Read the announcement →]                                  │
└─────────────────────────────────────────────────────────────┘
```

CSS grid (desktop): `grid-template-columns: 58% 32%; column-gap: 10%`
Mobile: `flex-direction: column` (image moves between topic and description)

Card separator: `border-top: 1px solid #eae5de` on each `<article.blog-card>`

---

## Blur-Up Image Effect

After each card is created and before it is appended to `#blog-list`, the card image is given:

```js
img.style.filter    = 'blur(6px)';
img.style.transform = 'scale(1.03)';
img.style.transition = 'filter 0.45s ease, transform 0.45s ease';
```

A `load` event listener clears both properties, producing a smooth sharpen as the image decodes. If the service worker serves from cache, `img.complete` is already `true` and the blur is cleared instantly.

---

## "Read the Announcement" Button

```js
'<a class="blog-card-btn group relative inline-flex items-center gap-1 rounded-sm px-3 py-1 text-sm transition-opacity hover:opacity-70 active:opacity-100"' +
' style="background:#F2EEE8;color:#4a4035;" href="/writing/' + blog.id + '" data-link>' +
'Read the announcement...' +
'</a>'
```

Link format: `/writing/[id]` with `data-link`. **Not** `writing-item.html?id=N`.

---

## HEAD_META

```js
{
  title:       'Devoid Writings — Insights on Scaling Tech Teams',
  description: 'Devoid Writings — insights on scaling engineering teams, eliminating hiring lag, and deploying the right technical talent at the right time.',
  canonical:   'https://devoid.pro/writings',
  ogType:      'website',
  ogUrl:       'https://devoid.pro/writings',
  jsonLd: [Organization, Blog nodes]  // see seo-sitemap.md
}
```

---

## fetch() Requirement

`fetch('/blogs.json')` requires an HTTP server:

- Works at `https://devoid.pro/writings`
- Does NOT work when opening `index.html` directly as `file://` in a browser

For local development, run `npx serve .` inside the `devoid/` directory.
