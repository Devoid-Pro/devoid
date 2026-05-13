# Page: writings.html (Writings Listing)

URL: `https://devoid.pro/writings.html`  
File: `devoid/writings.html`  
Data: `devoid/blogs.json`

---

## Purpose

Lists all Devoid writing posts. Data-driven — posts are loaded from `blogs.json` at runtime via `fetch()`. To publish a new post, add an entry to `blogs.json` only.

---

## Page Structure

```text
<body>
  <div> (centering wrapper)
    <div> (flex-1, max-w-[1204px] column)

      <div class="flex-1 border-l border-r border-c-300">   ← a + b borders

        <div class="w-full border-b border-c-300">           ← nav + underline
          <header> (logo + Writings link [active] + hamburger)

        <div style="position: relative;">                    ← c + d lines
          <div class="blog-c-line"> (c: left 10%)
          <div class="blog-d-line"> (d: right 10%)
          <div class="blog-content-zone"> (margin 10% each side)
            <h1> Writings
            <p> short description
            <div id="blog-list">   ← JS renders cards here

      <footer> (identical to all pages)

  <script> (fetches blogs.json, renders cards into #blog-list)
```

---

## Border System

This page uses narrower gutters than the default 20%. **writings.html is the only page with 10% gutters.**

| Border | Where | Implementation |
| --- | --- | --- |
| a | Outer left | `border-l` on `div.flex-1` |
| b | Outer right | `border-r` on `div.flex-1` |
| c | **10% from left** | `.blog-c-line { position: absolute; left: 10%; width: 1px; background: #eae5de; }` |
| d | **10% from right** | `.blog-d-line { position: absolute; right: 10%; width: 1px; background: #eae5de; }` |

Content wrapper: `margin-left: 10%; margin-right: 10%; padding: 80px 40px 60px;`

Nav underline: `border-b border-c-300` on the nav wrapper `<div>`.  
Footer top: `border-t` on the footer inner div.

---

## blogs.json Schema

Location: `devoid/blogs.json`

```json
[
  {
    "id": 1,
    "order": 1,
    "slug": "url-safe-hyphenated-slug",
    "topic": "Full title of the writing post",
    "date": "YYYY-MM-DD",
    "miniDescription": "One or two sentence teaser shown on the listing card.",
    "description": "<p>Full article as HTML — rendered as innerHTML on the detail page.</p>",
    "imageUrl": "./ass/blog-bg/blog-N.jpg"
  }
]
```

### Field rules

- `id`: integer, unique — matched by `writing-item.html?id=N`
- `order`: integer — JS sorts ascending by this before rendering
- `slug`: lowercase, hyphen-separated — reserved for future slug-based URLs
- `topic`: full title, no truncation
- `miniDescription`: keep under 160 characters — shown in full on the listing card
- `description`: full HTML content — rendered as `innerHTML` on `writing-item.html`
- `imageUrl`: relative path from project root

### Adding a new writing post

1. Add an image to `./ass/blog-bg/` named `blog-N.jpg` (increment N)
2. Add a new object to `blogs.json` with the next `id` and desired `order`
3. Set `date` to the publish date in `YYYY-MM-DD` format
4. Write `description` as HTML — see `writing-item.md` for supported elements

---

## Writing Card Rendering

Cards are rendered by the inline `<script>` at the bottom of `writings.html`. Each card uses a CSS grid layout:

```text
┌─────────────────────────────────────────────────────────────┐
│  [date in "Month D, YYYY" format]                           │
│                                                             │
│  [topic — serif font, 24px]          [image — 32% width    │
│                                       180px height         │
│  [miniDescription — 14px, 1.7 line   object-fit: cover]    │
│   height]                                                   │
│                                                             │
│  [Read the announcement →]                                  │
└─────────────────────────────────────────────────────────────┘
```

- Left column: `58%`
- Right column (image): `32%`
- Gap between columns: `10%`
- Card separator: `border-top: 1px solid #eae5de` on each `<article>`
- Card padding: `40px 0`

### "Read the announcement" button

Links to `writing-item.html?id=N` using the post's `id` field:

```javascript
href="./writing-item.html?id=" + blog.id
```

---

## Navigation (writings page variant)

Same as design-system.md nav template with:

- `text-off-black` (light background)
- Logo: `filter: invert(1); mix-blend-mode: multiply`
- Writings link has `aria-current="page"`
- Logo links to `./index.html`

---

## What to Change and How

### Add a new writing post

Edit `blogs.json` only — see above.

### Change the page description text

Edit the `<p>` tag below `<h1>Writings</h1>` in `writings.html`.

### Change card layout proportions

Edit `grid-template-columns: 58% 32%` and `column-gap: 10%` in the `.blog-card` CSS rule in `writings.html`. Columns must sum to ≤ 90%.

### Change card image height

Edit `height: 180px` in the `.blog-card-image img` CSS rule in `writings.html`.

---

## fetch() Requirement

The `<script>` uses `fetch('./blogs.json')`. This requires an HTTP server:

- Works at `https://devoid.pro/writings.html`
- Does NOT work when opening `writings.html` directly as `file://` in a browser

For local development, use a simple server: `npx serve .` or Python's `http.server`.
