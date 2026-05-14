# Page: Writing Post Detail

URL: `https://devoid.pro/writing/:id`
File: `pages/writing-item.js`
Data: `blogs.json`

---

## Purpose

Displays a single writing post. Fully dynamic — the router extracts `:id` from the URL path, the page fetches `/blogs.json`, finds the matching entry by integer `id`, and renders the full post. No individual HTML files per post.

---

## Page Structure

```text
render(appEl, params, updateHead):

<div> (centering wrapper, flex min-h-screen flex-col)
  <div> (flex-1 max-w-[1204px] column)

    <div class="flex-1 border-l border-r border-c-300">   ← a + b borders

      ${createNav(false, null)}   ← light, no active link

      <div style="position:relative">
        <div class="post-c-line">   ← c: 20% from left
        <div class="post-d-line">   ← d: 20% from right
        <div id="post-root">        ← JS renders 3 siblings here after fetch

    ${createFooter()}
```

`params.id` is a string from the router — parse it with `parseInt(params.id, 10)` before comparing to `blog.id`.

---

## Three-Block Render Pattern

After `fetch('/blogs.json')` resolves, JS renders three sibling elements inside `#post-root`:

```text
#post-root
  ├── div.post-content-zone   ← header: back link + date + h1 topic
  ├── div.post-image-full     ← image breakout (10%→90%, wider than c/d)
  └── div.post-content-zone   ← body: article HTML from blog.description
```

`#post-root` is a direct child of the `position:relative` wrapper — it is NOT inside `.post-content-zone`.

---

## Border System

Uses standard **20% gutters**.

| Border | Z-index | Note |
| --- | --- | --- |
| a / b | — | `border-l border-r` on `flex-1` div |
| c | `z-index: 0` | `.post-c-line`: absolute, `left:20%` |
| d | `z-index: 0` | `.post-d-line`: absolute, `right:20%` |
| image | `z-index: 1` | `.post-image-full`: `position:relative; z-index:1` |

The c/d lines must have `z-index: 0` and the image must have `z-index: 1` so the image paints on top where they intersect.

---

## Image Breakout Layout

The post hero image extends into the gutters beyond c/d:

```text
 a (0%)   c (20%)               d (80%)  b (100%)
 |        |                     |        |
 |  [     image 10%——————————90%         ]
 |        |                     |        |
```

```css
.post-image-full {
  margin-left: 10%;   /* midpoint of a(0%)→c(20%) gutter */
  margin-right: 10%;
  position: relative;
  z-index: 1;
}
.post-image-full img {
  width: 100%;
  height: 440px;
  object-fit: cover;
  border-radius: 4px;
}
```

---

## Blur-Up Image Effect

After `imageWrap.innerHTML` is set, the post image gets the blur-up treatment:

```js
postImg.style.filter    = 'blur(8px)';
postImg.style.transform = 'scale(1.015)';
postImg.style.transition = 'filter 0.5s ease, transform 0.5s ease';
```

A `load` event clears both properties. If the service worker has the image cached, `img.complete` is `true` and it clears instantly.

---

## Head Update (Dynamic)

`updateHead()` is called **after** the fetch resolves, not before, because `blog.topic` and `blog.miniDescription` are needed:

```js
updateHead({
  title:       blog.topic + ' — Devoid',
  description: blog.miniDescription,
  canonical:   'https://devoid.pro/writing/' + blog.id,
  ogType:      'article',
  ogUrl:       'https://devoid.pro/writing/' + blog.id,
  ogTitle:     blog.topic + ' — Devoid',
  jsonLd:      JSON.stringify({ '@graph': [Organization, BlogPosting] })
});
```

JSON-LD `BlogPosting` node uses `blog.id` and `blog.date` — see `seo-sitemap.md`.

---

## Error States

All error states render into `#post-root` with a `data-link` back to `/writings`:

| Condition | Message |
| --- | --- |
| No `params.id` | "No post specified." |
| `blogs.json` matched nothing | "Post not found." |
| `fetch()` rejected | "Failed to load post." |

---

## Supported HTML in description

The `.post-body` CSS handles these elements:

| Element | Result |
| --- | --- |
| `<p>` | Paragraph, 22px bottom margin |
| `<h3>` | Serif subheading, 24px, light weight, 48px top margin |
| `<strong>` | Bold, dark `#1a1512` |
| `<blockquote>` | Left-bordered callout, italic, muted `#6b5f53` |

Example:

```json
"description": "<p>Intro.</p><h3>A Subheading</h3><p>Body with <strong>bold</strong>.</p><blockquote><strong>CTA.</strong> Follow-up.</blockquote>"
```

---

## blogs.json Fields Used

| Field | Used for |
| --- | --- |
| `id` | Matched against `params.id` (as integer) |
| `topic` | `<h1>` heading, `<title>`, og:title |
| `date` | Formatted date ("May 13, 2026") |
| `imageUrl` | Hero image `src` — must be `/ass/blog-bg/blog-N.png` (absolute) |
| `miniDescription` | meta description, og:description |
| `description` | Article body — rendered as `innerHTML` |

---

## Navigation

`createNav(false, null)` — light variant, no active link (we are on a post, not the listing).

The "Back to Writings" link uses `href="/writings" data-link` (not `./writings.html`).

---

## Mobile Behaviour

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

On mobile: c/d lines hidden, content zones span full width with 20px padding, image goes flush to edges.

---

## fetch() Requirement

`fetch('/blogs.json')` — absolute path. Requires an HTTP server (`npx serve .`). Does not work as `file://`.
