# Devoid — SEO & Sitemap

---

## SEO Head Block Template

Copy this for every new page. Replace all `[PLACEHOLDERS]`.

```html
<title>[Page Title] — Devoid</title>
<meta name="description" content="[150–160 char description with keywords]" />
<meta name="author" content="Devoid" />
<meta name="robots" content="index, follow" />

<link rel="canonical" href="https://devoid.pro/[page.html or just /]" />

<meta property="og:type" content="website" />
<meta property="og:site_name" content="Devoid" />
<meta property="og:url" content="https://devoid.pro/[page.html]" />
<meta property="og:title" content="[Page Title] — Devoid" />
<meta property="og:description" content="[Same as meta description]" />
<meta property="og:image" content="https://devoid.pro/ass/devoid_pro_logo.jpg" />
<meta property="og:image:alt" content="Devoid logo" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="[Page Title] — Devoid" />
<meta name="twitter:description" content="[Same as meta description]" />
<meta name="twitter:image" content="https://devoid.pro/ass/devoid_pro_logo.jpg" />
```

Also include in `<head>` (same on every page):
```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="./styles.css" />
<meta name="theme-color" content="#f7f4f0" />
<link rel="icon" type="image/jpeg" href="./ass/devoid_pro_logo.jpg" />
<link rel="apple-touch-icon" href="./ass/devoid_pro_logo.jpg" />
```

---

## JSON-LD Structured Data

Always include the `Organization` node on every page. Add page-type nodes alongside it.

### Organization node (always present)
```json
{
  "@type": "Organization",
  "@id": "https://devoid.pro/#organization",
  "name": "Devoid",
  "url": "https://devoid.pro",
  "logo": { "@type": "ImageObject", "url": "https://devoid.pro/ass/devoid_pro_logo.jpg" },
  "description": "Devoid connects companies with world-class tech talent from Sri Lanka — software engineers, PMs, QA, DevOps, and UI/UX designers — on demand.",
  "foundingLocation": { "@type": "Country", "name": "Sri Lanka" },
  "areaServed": "Worldwide",
  "serviceType": ["Staff Augmentation", "Tech Talent Outsourcing", "Team Extension"],
  "sameAs": ["https://www.linkedin.com/company/devoid-pro"]
}
```

### Page-specific nodes

**index.html** — add `WebSite`:
```json
{
  "@type": "WebSite",
  "@id": "https://devoid.pro/#website",
  "url": "https://devoid.pro",
  "name": "Devoid",
  "publisher": { "@id": "https://devoid.pro/#organization" }
}
```

**blog.html** — add `Blog`:
```json
{
  "@type": "Blog",
  "@id": "https://devoid.pro/blog.html#blog",
  "url": "https://devoid.pro/blog.html",
  "name": "Devoid Blog",
  "description": "Insights on staff augmentation, hiring top tech talent from Sri Lanka, and scaling engineering teams.",
  "publisher": { "@id": "https://devoid.pro/#organization" }
}
```

**Individual blog post page** — add `BlogPosting`:
```json
{
  "@type": "BlogPosting",
  "@id": "https://devoid.pro/blog/[slug].html#article",
  "url": "https://devoid.pro/blog/[slug].html",
  "headline": "[Post title]",
  "datePublished": "YYYY-MM-DD",
  "author": { "@id": "https://devoid.pro/#organization" },
  "publisher": { "@id": "https://devoid.pro/#organization" },
  "isPartOf": { "@id": "https://devoid.pro/blog.html#blog" }
}
```

---

## robots.txt

File location: `devoid/robots.txt`

```
User-agent: *
Allow: /
Sitemap: https://devoid.pro/sitemap.xml
```

---

## sitemap.xml

File location: `devoid/sitemap.xml`

### Current sitemap
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
    <loc>https://devoid.pro/blog.html</loc>
    <lastmod>2026-05-13</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

</urlset>
```

### When to update sitemap.xml

| Event | Action |
|---|---|
| New page added | Add a `<url>` entry |
| Existing page significantly updated | Update `<lastmod>` to today's date (YYYY-MM-DD) |
| New blog post added to blogs.json | Update `<lastmod>` of `blog.html` entry |
| Page removed | Remove its `<url>` entry |

### Priority guide
- `1.0` — homepage only
- `0.8` — primary section pages (blog listing, about, etc.)
- `0.6` — individual blog posts
- `0.4` — utility pages (terms, privacy)

### changefreq guide
- `monthly` — homepage, about
- `weekly` — blog listing (gets new posts)
- `never` — individual archived posts

---

## Existing Pages SEO Summary

### index.html
- Title: `Devoid`
- Canonical: `https://devoid.pro/`
- Description: Connects US startups with elite Sri Lankan engineers, PMs, QA, DevOps, UI/UX. Scale tech teams on demand.
- JSON-LD: Organization + WebSite

### blog.html
- Title: `Devoid Blog — Insights on Scaling Tech Teams`
- Canonical: `https://devoid.pro/blog.html`
- Description: Blog covering staff augmentation, hiring top tech talent from Sri Lanka, scaling engineering teams.
- JSON-LD: Organization + Blog
