# Devoid — AI Knowledge Hub

This directory is the single source of truth for any AI agent working on this project.
Read the relevant doc before touching any file.

## What is Devoid?

`devoid.pro` — a talent company that connects companies with elite engineers, PMs, QA, DevOps, and UI/UX designers on demand. Devoid fills engineering skill gaps globally, without friction. No specific country or region is referenced in any user-facing content — see Rule 9 in `rules.md`.

## Tech Stack

- Pure static HTML files — no framework, no build tool, no npm, no bundler
- Tailwind CSS is **pre-compiled** into `styles.css` (62.6 KB) — see `rules.md` for the critical constraint this creates
- Vanilla JavaScript (inline `<script>` tags) for dynamic content
- Hosted at `https://devoid.pro`

## File Structure

```text
devoid/
  index.html          ← Landing page
  writings.html       ← Writings listing page (formerly blog.html)
  writing-item.html   ← Individual writing detail page (formerly blog-detail.html)
  blogs.json          ← Blog post data (add new posts here)
  styles.css          ← Pre-compiled Tailwind — DO NOT regenerate or modify
  custom.css          ← Site-wide custom CSS (scrollbar theme, etc.) — append here
  DESIGN.md           ← Design system reference (summary version)
  ass/
    devoid_pro_logo.jpg
    devoid_hero_bg.jpg
    blog-bg/
      blog-1.jpg      ← Blog post images go here, named blog-N.jpg
    social/
      linkedin.svg, x.svg, insta.svg, tiktok.svg, youtube.svg
  ai-knowledge-hub/   ← You are here
    README.md
    design-system.md
    rules.md
    seo-sitemap.md
    pages/
      index.md
      writings.md
      writing-item.md
```

## Which Doc to Read for Which Task

| Task | Read |
| --- | --- |
| Adding a new writing/blog post | `pages/writings.md` |
| Editing writing content / detail page layout | `pages/writing-item.md` |
| Creating a new page | `design-system.md` + `rules.md` + `seo-sitemap.md` |
| Changing colours, fonts, borders | `design-system.md` + `rules.md` |
| Changing the nav or footer | `design-system.md` (nav/footer sections) |
| SEO changes, adding to sitemap | `seo-sitemap.md` |
| Logo treatment | `design-system.md` (Logo section) |
| Any styling decision | `rules.md` first — check the DO/DON'T list |
