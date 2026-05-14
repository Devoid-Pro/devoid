# Page: Home (Landing Page)

URL: `https://devoid.pro/`
File: `pages/home.js`

---

## Purpose

The main landing page. Full-viewport hero with background image, dark nav, email capture form, and footer. The entire hero section has a dark/image background — all text and logo use light colours.

---

## Page Structure

```text
render(appEl) sets appEl.innerHTML:

<div> (centering wrapper, flex-col, bg-off-white)
  <div> (max-w-[1204px] column — wraps BOTH hero and footer)

    <div> (hero — relative, min-h-screen, box-border)
      <div> (background: image or gradient depending on connection speed)
        <img id="hero-bg-img" ...>   ← skipped on slow connections
        <div> (gradient overlay: top third, black/30 → transparent)
      <div> (hero content — relative, flex-col, overflow-hidden)
        ${createNav(true, null)}     ← dark variant, no border-b
        <div> (hero text + form area)
          <div> (From Earth badge)
          <h1> Scale Teams Without Friction.
          <p>  subheading
          <div> (email capture form)

    ${createFooter()}
```

**Note:** The home page does NOT use the a/b/c/d border system. The footer still has `border-l border-r border-c-300` on its inner div (from `createFooter()`).

---

## Navigation (home page variant)

```js
${createNav(true, null)}
```

`isDark=true` produces:

- `text-off-white` on header and hamburger button
- Logo: `mix-blend-mode: screen` (dark JPG background vanishes against dark hero)
- No `border-b border-c-300` on nav wrapper (hero image is behind it)

---

## Hero Background — Network-Aware

`pages/home.js` checks `window.__devoidSlowConn` (set by `app.js` at startup):

| Connection | Behaviour |
| --- | --- |
| Fast (default) | `<img id="hero-bg-img" src="/ass/devoid_hero_bg.jpg" fetchpriority="high" decoding="async">` renders with `opacity:0`, fades to `opacity:1` via JS once `load` fires |
| Slow (`slow-2g`, `2g`, `saveData`) | Image skipped entirely — replaced with `linear-gradient(150deg, #1a100a → #3d2a18)` CSS gradient |

The hero image is `1204×881`, `/ass/devoid_hero_bg.jpg`. `fetchpriority="high"` must stay on the `<img>` — it is the LCP element.

---

## Hero Text

```html
<h1 class="flex flex-wrap justify-center gap-3 font-light font-serif text-6xl text-c-50 leading-[75%] tracking-[-3.5px] antialiased sm:max-w-[696px] sm:text-8xl lg:justify-start">
  <span>Scale</span><span>Teams</span><span>Without</span><span></span><span>Friction.</span>
</h1>
```

- Font: Martina Plantijn serif, light weight
- Colour: `text-c-50` (near white)
- Tracking: `-3.5px` (inline style not needed — compiled into the class)
- One `<span>` per word to preserve the wrapping gap layout

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

The form currently has no submission handler. Add a `submit` event listener after `appEl.innerHTML` is set.

---

## "From Earth" Badge

```html
<a class="inline-flex items-center gap-1 rounded-[9px] bg-[#FFFEFC17] px-3 py-px font-450 text-xs transition-all duration-300 ease-in-out hover:backdrop-blur-sm border border-[#F7F4F04D] text-white" href="">
  <span class="leading-[26px]">From Earth</span>
  <!-- arrow SVG -->
</a>
```

`href=""` — no destination yet. Update when there is a link target.

---

## HEAD_META

```js
{
  title:       'Devoid — Scale Engineering Teams Without Friction',
  description: 'Devoid connects companies with elite engineers, PMs, QA, DevOps, and UI/UX designers on demand. Fill every skill gap and scale your team without friction.',
  canonical:   'https://devoid.pro/',
  ogType:      'website',
  ogUrl:       'https://devoid.pro/',
  ogTitle:     'Devoid — Scale Engineering Teams Without Friction',
  ogImage:     'https://devoid.pro/ass/devoid_pro_logo.png',
  jsonLd: [Organization, WebSite nodes]  // see seo-sitemap.md
}
```

---

## What to Change and How

### Change the hero headline

Edit the `<span>` words inside the `<h1>`. Keep one `<span>` per word.

### Change the subheading

Edit the `<p>` after the `<h1>`. Keep under ~12 words.

### Add form submission

After `appEl.innerHTML = ...`, query the form and add a `submit` listener. Do not break the existing classes.

### Change the hero background image

Replace `/ass/devoid_hero_bg.jpg`. Update `width` and `height` attributes if dimensions differ.

### Change the slow-connection gradient

Edit the `linear-gradient(...)` value in the `heroBgHtml` variable inside `render()`.
