# Devoid — SEO & Sitemap

---

## How SEO Works in the SPA

There is no static `<meta>` per page. The `index.html` shell has only minimal static head content. All page-specific SEO tags are set **dynamically** by `app.js`'s `updateHead(meta)` function on every route render.

`updateHead()` upserts (creates-or-updates):

- `<title>`
- `<meta name="description">`
- `<link rel="canonical">`
- `og:type`, `og:site_name`, `og:url`, `og:title`, `og:description`, `og:image`, `og:image:alt`
- `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- `<script id="ld-json" type="application/ld+json">` (the JSON-LD block)

Call it from every page module's `render()`:

```js
updateHead({
  title:       'Page Title — Devoid',
  description: '150–160 char description',
  canonical:   'https://devoid.pro/path',
  ogType:      'website',           // or 'article' for blog posts
  ogUrl:       'https://devoid.pro/path',
  ogTitle:     'Page Title — Devoid',
  ogImage:     'https://devoid.pro/ass/devoid_pro_logo.png',
  jsonLd:      JSON.stringify({ '@context': 'https://schema.org', '@graph': [...] })
});
```

---

## Static Head Content (index.html)

These tags are in `index.html` and never change:

```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
<meta name="author" content="Devoid" />
<meta name="robots" content="index, follow" />
<meta name="theme-color" content="#f7f4f0" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
<link rel="preload" as="image" href="/ass/devoid_pro_logo.png" />
<link rel="prefetch" href="/blogs.json" />
<link href="https://fonts.googleapis.com/css2?family=Inter:..." rel="stylesheet" />
<link rel="stylesheet" href="./styles.css" />
<link rel="stylesheet" href="./custom.css" />
<link rel="icon" type="image/jpeg" href="./ass/devoid_mini_logo.jpg" />
<link rel="apple-touch-icon" href="./ass/devoid_mini_logo.jpg" />
<title>Devoid</title>   ← overwritten immediately by updateHead() on first render
```

---

## JSON-LD Structured Data

### Organization node (include on every page)

```json
{
  "@type": "Organization",
  "@id": "https://devoid.pro/#organization",
  "name": "Devoid",
  "url": "https://devoid.pro",
  "logo": { "@type": "ImageObject", "url": "https://devoid.pro/ass/devoid_pro_logo.png" },
  "description": "Devoid connects companies with elite engineers, PMs, QA, DevOps, and UI/UX designers on demand — filling every skill gap without friction.",
  "areaServed": "Worldwide",
  "serviceType": ["Engineering Staff Augmentation", "Technical Team Extension", "On-Demand Engineering Teams"],
  "sameAs": ["https://www.linkedin.com/company/devoid-pro"]
}
```

### Page-specific nodes

**`/` (home)** — add `WebSite`:

```json
{
  "@type": "WebSite",
  "@id": "https://devoid.pro/#website",
  "url": "https://devoid.pro",
  "name": "Devoid",
  "publisher": { "@id": "https://devoid.pro/#organization" }
}
```

**`/writings`** — add `Blog`:

```json
{
  "@type": "Blog",
  "@id": "https://devoid.pro/writings#blog",
  "url": "https://devoid.pro/writings",
  "name": "Devoid Writings",
  "description": "Insights on scaling engineering teams, eliminating hiring lag, and deploying the right technical talent at the right time.",
  "publisher": { "@id": "https://devoid.pro/#organization" }
}
```

**`/writing/:id`** — add `BlogPosting` (using dynamic `blog` values):

```json
{
  "@type": "BlogPosting",
  "@id": "https://devoid.pro/writing/[id]#article",
  "url": "https://devoid.pro/writing/[id]",
  "headline": "[blog.topic]",
  "datePublished": "[blog.date]",
  "author": { "@id": "https://devoid.pro/#organization" },
  "publisher": { "@id": "https://devoid.pro/#organization" },
  "isPartOf": { "@id": "https://devoid.pro/writings#blog" }
}
```

---

## Existing Pages SEO Summary

### `/` (home)

- Title: `Devoid — Scale Engineering Teams Without Friction`
- Canonical: `https://devoid.pro/`
- Description: Devoid connects companies with elite engineers, PMs, QA, DevOps, and UI/UX designers on demand. Fill every skill gap and scale your team without friction.
- JSON-LD: Organization + WebSite

### `/writings`

- Title: `Devoid Writings — Insights on Scaling Tech Teams`
- Canonical: `https://devoid.pro/writings`
- Description: Devoid Writings — insights on scaling engineering teams, eliminating hiring lag, and deploying the right technical talent at the right time.
- JSON-LD: Organization + Blog

### `/writing/1`

- Title: `[blog.topic] — Devoid` (dynamic)
- Canonical: `https://devoid.pro/writing/1`
- Description: `[blog.miniDescription]` (dynamic)
- JSON-LD: Organization + BlogPosting

---

## robots.txt

```text
User-agent: *
Allow: /
Sitemap: https://devoid.pro/sitemap.xml
```

---

## sitemap.xml

Current state (clean paths — no `.html` suffix):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <url>
    <loc>https://devoid.pro/</loc>
    <lastmod>2026-05-13</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>

  <url>
    <loc>https://devoid.pro/writings</loc>
    <lastmod>2026-05-13</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

</urlset>
```

### When to update sitemap.xml

| Event | Action |
| --- | --- |
| New page added | Add a `<url>` entry |
| Existing page significantly updated | Update `<lastmod>` to today (YYYY-MM-DD) |
| New post added to blogs.json | Update `<lastmod>` of `/writings` entry |
| Page removed | Remove its `<url>` entry |

### Priority guide

- `1.0` — homepage only
- `0.8` — primary section pages (writings listing)
- `0.6` — individual writing posts (add if indexing is desired)
- `0.4` — utility pages (terms, privacy)

### changefreq guide

- `monthly` — homepage
- `weekly` — writings listing (gets new posts)
- `never` — individual archived posts
