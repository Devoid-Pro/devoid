# Page: writing-item.html (Writing Post Detail)

URL: `https://devoid.pro/writing-item.html?id=N`  
File: `devoid/writing-item.html`  
Data: `devoid/blogs.json`

---

## Purpose

Displays a single writing post. Fully dynamic — JS reads `?id=N` from the URL query string, fetches `blogs.json`, finds the matching entry by `id`, and renders the page. No individual HTML files per post.

---

## Page Structure

```text
<body>
  <div> (centering wrapper)
    <div> (flex-1, max-w-[1204px] column)

      <div class="flex-1 border-l border-r border-c-300">   ← a + b borders

        <div class="w-full border-b border-c-300">           ← nav + underline
          <header> (logo + Writings link [not active] + hamburger)

        <div style="position: relative;">                    ← c + d lines (z-index: 0)
          <div class="post-c-line">                          ← c line (z-index: 0)
          <div class="post-d-line">                          ← d line (z-index: 0)
          <div id="post-root">                               ← JS renders 3 siblings here

      <footer> (identical to all pages)
```

---

## Three-Block Render Pattern

JS renders three sibling elements inside `#post-root`. This is the key structural rule:

```text
#post-root
  ├── div.post-content-zone   ← header: back link + date + h1 topic
  ├── div.post-image-full     ← image breakout (wider than c/d zone)
  └── div.post-content-zone   ← body: article text
```

**`#post-root` is NOT inside a `.post-content-zone`.** It is a direct child of the `position: relative` wrapper. The JS renders the content zones as children of `#post-root`.

---

## Border System

Uses the standard 20% gutter (unlike writings.html which uses 10%).

| Border | Where | Z-index |
| --- | --- | --- |
| a | Outer left (`border-l` on `div.flex-1`) | — |
| b | Outer right (`border-r` on `div.flex-1`) | — |
| c | 20% from left (absolute, 1px, `#eae5de`) | `z-index: 0` |
| d | 20% from right (absolute, 1px, `#eae5de`) | `z-index: 0` |
| image | Breaks out beyond c/d | `z-index: 1` |

**The c and d lines must have `z-index: 0`. The image must have `position: relative; z-index: 1`.** This ensures the image paints on top of the lines where they intersect.

---

## Image Breakout Layout

The hero image is wider than the c/d content zone. It extends into the gutters:

```text
 a (0%)   c (20%)               d (80%)  b (100%)
 |        |                     |        |
 |   [    image from 10% ——————————— to 90%    ]
 |        |                     |        |
```

Implementation:

```css
.post-image-full {
  margin-left: 10%;   /* midpoint of a(0%) → c(20%) gutter */
  margin-right: 10%;  /* midpoint of d(80%) → b(100%) gutter */
  position: relative;
  z-index: 1;
}

.post-image-full img {
  width: 100%;
  height: 440px;
  object-fit: cover;
  border-radius: 4px;
  display: block;
}
```

The `%` on `.post-image-full` margins is relative to the `position: relative` wrapper's width (full container, a to b). So `10%` is the midpoint of each gutter.

---

## CSS Classes

```css
/* C and D border lines */
.post-c-line  { position: absolute; top: 0; bottom: 0; left: 20%; width: 1px; background: #eae5de; z-index: 0; }
.post-d-line  { position: absolute; top: 0; bottom: 0; right: 20%; width: 1px; background: #eae5de; z-index: 0; }

/* Content zone — used twice (header block and body block) */
.post-content-zone { margin-left: 20%; margin-right: 20%; padding: 0 40px; }

/* Back link */
.post-back    { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 450; color: #9a8f82; text-decoration: none; transition: opacity 0.2s; }
.post-back:hover { opacity: 0.7; }

/* Post header typography */
.post-date    { font-size: 12px; color: #9a8f82; font-weight: 450; letter-spacing: -0.2px; }
.post-topic   { font-size: 44px; line-height: 1.05; letter-spacing: -2px; }

/* Image breakout */
.post-image-full     { margin-left: 10%; margin-right: 10%; position: relative; z-index: 1; }
.post-image-full img { width: 100%; height: 440px; object-fit: cover; border-radius: 4px; display: block; }

/* Body content */
.post-body    { font-size: 16px; line-height: 1.85; color: #4a4035; }

/* Body typography — child elements of .post-body */
.post-body p          { margin-bottom: 22px; }
.post-body h3         { font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif; font-weight: 300; font-size: 24px; letter-spacing: -0.6px; line-height: 1.2; color: #1a1512; margin-top: 48px; margin-bottom: 16px; }
.post-body strong     { font-weight: 600; color: #1a1512; }
.post-body blockquote { border-left: 2px solid #eae5de; margin: 40px 0 0; padding: 14px 24px; color: #6b5f53; font-style: italic; }

/* Loading/error state */
.post-loading { font-size: 14px; color: #9a8f82; margin: 0 20%; padding: 60px 40px; }
```

---

## Mobile Behaviour (max-width: 1023px)

```css
@media (max-width: 1023px) {
  .post-c-line, .post-d-line { display: none; }
  .post-content-zone { margin-left: 0; margin-right: 0; padding: 0 20px; }
  .post-topic { font-size: 26px; letter-spacing: -1px; }
  .post-image-full { margin-left: 0; margin-right: 0; }
  .post-image-full img { height: 220px; border-radius: 0; }
  .post-body { font-size: 15px; }
}
```

On mobile:

- c/d lines hidden
- Content zones span full width with 20px side padding
- Image goes full width (no gutter margin), no border-radius (flush to edges)

---

## JS Rendering

```javascript
// Reads ?id=N from URL, fetches blogs.json, matches by blog.id (integer)
var params = new URLSearchParams(window.location.search);
var targetId = parseInt(params.get('id'), 10);

// Renders three siblings into #post-root:

// 1. Header zone
var header = document.createElement('div');
header.className = 'post-content-zone';
header.style.paddingTop = '60px';
header.style.paddingBottom = '40px';
header.innerHTML = /* back link + date + h1 */;

// 2. Image breakout
var imageWrap = document.createElement('div');
imageWrap.className = 'post-image-full';
imageWrap.innerHTML = '<img src="' + blog.imageUrl + '" alt="' + blog.topic + '" />';

// 3. Body zone
var body = document.createElement('div');
body.className = 'post-content-zone';
body.style.paddingTop = '48px';
body.style.paddingBottom = '80px';
body.innerHTML = '<div class="post-body">' + blog.description + '</div>';

root.appendChild(header);
root.appendChild(imageWrap);
root.appendChild(body);
```

`blog.description` is rendered as `innerHTML` — it must contain HTML tags.

---

## Supported HTML in description

The `.post-body` CSS handles rendering for these elements:

| Element | Result |
| --- | --- |
| `<p>` | Paragraph with 22px bottom margin |
| `<h3>` | Serif subheading, 24px, light weight, 48px top margin |
| `<strong>` | Bold text, dark `#1a1512` |
| `<blockquote>` | Left-bordered callout, italic, muted text |

Example `description` value:

```json
"description": "<p>Intro paragraph.</p><h3>A Subheading</h3><p>Body text with <strong>bold</strong> words.</p><blockquote><strong>CTA line.</strong> Follow-up text.</blockquote>"
```

---

## blogs.json Fields Used

| Field | Used for |
| --- | --- |
| `id` | Matched against `?id=N` in URL |
| `topic` | `<h1>` heading + `<title>` tag + og:title |
| `date` | Formatted date display (e.g. "May 13, 2026") |
| `imageUrl` | Hero image `src` |
| `miniDescription` | `meta description` + og:description |
| `description` | Article body — rendered as HTML |

---

## Navigation

Same HTML as `writings.html` nav, but:

- The "Writings" link does **not** have `aria-current="page"` (we are on a post, not the listing)
- Logo still links to `./index.html`
- Back links read "Back to Writings" and href to `./writings.html`

---

## Linking from writings.html

The "Read the announcement" button on `writings.html` links here:

```javascript
href="./writing-item.html?id=" + blog.id
```

---

## SEO Notes

- `<title>` is set dynamically: `blog.topic + ' — Devoid'`
- `og:title` and `og:description` are also set dynamically
- Not currently in `sitemap.xml` — add individual posts with `priority: 0.6` and `changefreq: never` if indexing is desired

---

## fetch() Requirement

Same as `writings.html` — requires an HTTP server. Does not work as `file://` URL.
