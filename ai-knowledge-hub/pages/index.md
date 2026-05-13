# Page: index.html (Landing Page)

URL: `https://devoid.pro/`  
File: `devoid/index.html`

---

## Purpose

The main landing page. Hero section with background image, nav, email capture form, and footer. Dark background throughout — logo and text use light colours.

---

## Page Structure

```
<body>
  <div> (centering wrapper, bg-off-white)
    <main> (hero section, full viewport height, max-w-[1204px])
      <div> (background image + gradient overlay)
      <div> (hero content: nav + heading + form)
        <div> (nav wrapper)
          <header> (logo + Blogs link + hamburger)
        <div> (hero text + form)
          <h1> Scale Teams Without Friction.
          <p> subheading
          <div> (email form)
    <footer> (identical to all pages — see design-system.md)
```

**Note:** The landing page does NOT use the a/b/c/d border system. The border system is for interior/content pages only. The footer still has `border-l border-r border-c-300` on its inner div (continuing the a/b visual from the footer upward).

---

## Hero Section

- Full viewport height: `min-h-screen`
- Max width: `max-w-[1204px] 2xl:max-w-[1440px]`
- Background image: `./ass/devoid_hero_bg.jpg`
  - `fetchpriority="high"` (LCP image — do not remove)
  - `width="1204" height="881"` (explicit dimensions — do not remove)
- Gradient overlay: `bg-gradient-to-b from-black/30 via-75% to-transparent` on top third

---

## Navigation (landing page variant)

Same HTML structure as all pages but with these differences:

- Text colour: `text-off-white` (not `text-off-black`)
- Logo style: `mix-blend-mode: screen` (not `filter: invert(1); mix-blend-mode: multiply`)
- Hamburger button class ends with `text-off-white` (not `text-off-black`)
- No `border-b border-c-300` on the nav wrapper (no underline — the hero image is behind it)
- Nav is inside the hero `<main>` tag, not a standalone `<header>` outside it

```html
<!-- Logo on dark bg -->
<img src="./ass/devoid_pro_logo.jpg" alt="Devoid" class="inline-block rounded-sm"
  style="mix-blend-mode: screen; height: 40px; width: 40px" />
```

---

## Hero Text

```html
<h1 class="flex flex-wrap justify-center gap-3 font-light font-serif text-6xl text-c-50 leading-[75%] tracking-[-3.5px] antialiased sm:max-w-[696px] sm:text-8xl lg:justify-start">
  <span>Scale</span><span>Teams</span><span>Without</span><span></span><span>Friction.</span>
</h1>
```

- Font: Martina Plantijn serif, light weight
- Colour: `text-c-50` (near white)
- Tracking: `-3.5px`

---

## Email Capture Form

```html
<form class="flex rounded-[14px] bg-[#F5F1EC]/70 p-[5px] font-inter backdrop-blur-xs mx-4 flex-col gap-6 sm:mx-0 sm:h-[54px] sm:w-full sm:flex-row sm:items-center sm:gap-0 lg:max-w-[5000px]">
  <input required class="min-w-0 appearance-none placeholder-[#140E00]/60 outline-none disabled:opacity-50 sm:flex-1 pt-3 pl-2 sm:pt-0 sm:pl-[18px]"
         placeholder="Your email address" type="email" value="" />
  <button class="... bg-c-800 text-c-100 hover:bg-c-800/90 px-6 py-[17px] h-[45px] shrink-0 sm:flex sm:w-[140px]" type="submit">
    Contact Us
  </button>
</form>
```

The form currently has no submission handler (no `action`, no JS). Placeholder only.

---

## "From Earth" Badge

Small announcement pill at the top of hero content:

```html
<a class="inline-flex items-center gap-1 rounded-[9px] bg-[#FFFEFC17] px-3 py-px font-450 text-xs transition-all duration-300 ease-in-out hover:backdrop-blur-sm border border-[#F7F4F04D] text-white" href="">
  <span class="leading-[26px]">From Earth</span>
  <!-- arrow SVG -->
</a>
```

`href=""` — no destination yet. Update when there's a link target.

---

## What to Change and How

### Change the hero headline
Edit the `<span>` words inside the `<h1>`. Keep one `<span>` per word to preserve the wrapping gap layout.

### Change the subheading
Edit the `<p>` tag after the `<h1>`. Keep under ~12 words.

### Update the CTA button text
Edit the `<button>` inside the form — currently "Contact Us".

### Add form submission
Add `action="..."` to the `<form>` or add a JS `submit` event listener. Do not break the existing classes.

### Change the hero background image
Replace `./ass/devoid_hero_bg.jpg`. Keep the same `width` and `height` attributes if the new image is the same dimensions, otherwise update them.

### Add a new nav link
Add another `<a>` after the Blogs link, same class pattern. Update `blog.html` nav to match.

---

## SEO

See `seo-sitemap.md` for the full head block. The `<title>` is just `Devoid` (no tagline — intentional for the homepage).
