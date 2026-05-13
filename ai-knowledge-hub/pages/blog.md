# Page: blog.html (Blog Listing)

URL: `https://devoid.pro/blog.html`  
File: `devoid/blog.html`  
Data: `devoid/blogs.json`

---

## Purpose

Lists all Devoid blog posts. Data-driven — posts are loaded from `blogs.json` at runtime via `fetch()`. To publish a new post, add an entry to `blogs.json` only.

---

## Page Structure

```
<body>
  <div> (centering wrapper)
    <div> (max-w-[1204px] column)

      <div class="flex-1 border-l border-r border-c-300">   ← a + b borders

        <div class="w-full border-b border-c-300">           ← nav + underline
          <header> (logo + Blogs link [active] + hamburger)

        <div style="position: relative;">                    ← c + d lines
          <div> (c line: left: 20%)
          <div> (d line: right: 20%)
          <div style="margin-left:20%; margin-right:20%; padding:80px 40px 60px;">
            <h1> Blogs
            <p> short description (lorem for now)
            <div id="blog-list">   ← JS renders cards here

      <footer> (identical to all pages)

  <script> (fetches blogs.json, renders cards into #blog-list)
```

---

## Border System

This page uses all four named borders:

| Border | Where | Implementation |
|---|---|---|
| a | Outer left | `border-l` on `div.flex-1` |
| b | Outer right | `border-r` on `div.flex-1` |
| c | 20% from left | `position:absolute; left:20%; width:1px; background:#eae5de` |
| d | 20% from right | `position:absolute; right:20%; width:1px; background:#eae5de` |

Nav underline: `border-b border-c-300` on the nav wrapper `<div>`.  
Footer top: `border-t` on the footer inner div.

**All content is inside the `margin-left:20%; margin-right:20%` div.**

---

## blogs.json Schema

Location: `devoid/blogs.json`

```json
[
  {
    "id": "unique-slug-for-this-post",
    "topic": "Full title of the blog post",
    "date": "YYYY-MM-DD",
    "miniDescription": "One or two sentence teaser shown on the listing card.",
    "description": "Full article content (for future individual post pages).",
    "imageUrl": "./ass/blog-bg/blog-N.jpg"
  }
]
```

### Adding a new blog post

1. Add an image to `./ass/blog-bg/` named `blog-N.jpg` (increment N)
2. Add a new object to the **top** of `blogs.json` array (newest first)
3. Set `date` to the publish date in `YYYY-MM-DD` format
4. Update `<lastmod>` in `sitemap.xml` for `blog.html` to today's date

### Field rules
- `id`: lowercase, hyphen-separated, URL-safe — used as href when individual post pages are built
- `topic`: full title, no truncation
- `miniDescription`: keep under 160 characters — shown in full on the card
- `description`: full content stored here for future use, not rendered on the listing page yet
- `imageUrl`: relative path from project root

---

## Blog Card Rendering

Cards are rendered by the inline `<script>` at the bottom of `blog.html`. Each card:

```
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

- Left column: `flex: 0 0 58%`
- Right column (image): `flex: 0 0 32%`
- Gap between columns: `10%`
- Card separator: `border-top: 1px solid #eae5de` on each `<article>`
- Cards have `padding: 40px 0` (no side padding — outer wrapper handles that)

### "Read the announcement" button

```html
<a class="group relative inline-flex items-center gap-1 rounded-sm px-3 py-1 text-sm transition-opacity hover:opacity-70 active:opacity-100"
   style="background: #F2EEE8; color: #4a4035;" href="#">
  Read the announcement
  <svg viewBox="0 0 10 9" class="inline-block fill-current size-2.5" ...>
    <path d="M5.52614 8.72409..."></path>
  </svg>
</a>
```

`href="#"` currently. When individual blog post pages exist, update the script to use `blog.id` to build the href.

---

## Navigation (blog page variant)

Same as design-system.md nav template with:
- `text-off-black` (light background)
- Logo: `filter: invert(1); mix-blend-mode: multiply`
- Blogs link has `aria-current="page"` (it's the current page)
- `href="./index.html"` on the logo link (back to home)

---

## What to Change and How

### Add a new blog post
Edit `blogs.json` only — see above.

### Change the page description (lorem text)
Edit the `<p>` tag below `<h1>Blogs</h1>` in `blog.html`.

### Change card layout proportions
Edit the `flex: 0 0 58%` and `flex: 0 0 32%` inline styles inside the `<script>` tag in `blog.html`. Make sure they sum to ≤ 90% (the gap takes the remaining 10%).

### Change card image height
Edit `height:180px` in the `<img>` style inside the script.

### Add expand/accordion on "Read the announcement" click
This is a planned feature — not yet implemented. The `description` field in `blogs.json` holds the full content for this purpose. When implementing, add a click handler that toggles a hidden `<div>` below the card row.

### Make the button link to individual post pages
Change the `href="#"` in the script to `href="./blog/${blog.id}.html"` (or whatever URL structure is chosen for individual posts), then create those pages.

---

## fetch() Requirement

The `<script>` uses `fetch('./blogs.json')`. This requires an HTTP server:
- Works at `https://devoid.pro/blog.html`
- Does NOT work when opening `blog.html` directly as `file://` in a browser

For local development, use a simple server: `npx serve .` or Python's `http.server`.
