# Devoid — AI Knowledge Hub

This directory is the single source of truth for any AI agent working on this project.
Read the relevant doc before touching any file.

## What is Devoid?

`devoid.pro` — a tech talent outsourcing company. They hire elite software engineers, PMs, QA, DevOps, and UI/UX designers from Sri Lanka and place them inside US startups on demand. Companies collaborate with Devoid to fill employee gaps without friction.

## Tech Stack

- Pure static HTML files — no framework, no build tool, no npm, no bundler
- Tailwind CSS is **pre-compiled** into `styles.css` (62.6 KB) — see `rules.md` for the critical constraint this creates
- Vanilla JavaScript (inline `<script>` tags) for dynamic content
- Hosted at `https://devoid.pro`

## File Structure

```
devoid/
  index.html          ← Landing page
  blog.html           ← Blog listing page
  blogs.json          ← Blog post data (add new posts here)
  styles.css          ← Pre-compiled Tailwind — DO NOT regenerate or modify
  DESIGN.md           ← Design system reference (summary version)
  robots.txt          ← Should contain: User-agent: *, Allow: /, Sitemap URL
  sitemap.xml         ← XML sitemap — update whenever a new page is added
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
      blog.md
```

## Which Doc to Read for Which Task

| Task | Read |
|---|---|
| Adding a new blog post | `pages/blog.md` |
| Creating a new page | `design-system.md` + `rules.md` + `seo-sitemap.md` |
| Changing colours, fonts, borders | `design-system.md` + `rules.md` |
| Changing the nav or footer | `design-system.md` (nav/footer sections) |
| SEO changes, adding to sitemap | `seo-sitemap.md` |
| Logo treatment | `design-system.md` (Logo section) |
| Any styling decision | `rules.md` first — check the DO/DON'T list |
