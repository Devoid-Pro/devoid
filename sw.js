var CACHE = 'devoid-v1';

var PRECACHE = [
  '/',
  '/app.js',
  '/styles.css',
  '/custom.css',
  '/blogs.json',
  '/ass/devoid_pro_logo.png',
  '/ass/devoid_mini_logo.jpg',
  '/ass/devoid_hero_bg.jpg',
  '/ass/blog-bg/blog-1.png',
  '/ass/social/linkedin.svg',
  '/ass/social/x.svg',
  '/ass/social/insta.svg',
  '/ass/social/tiktok.svg',
  '/ass/social/youtube.svg',
];

/* ── Install: precache all critical assets ── */
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE)
      .then(function (c) { return c.addAll(PRECACHE); })
      .then(function () { return self.skipWaiting(); })
  );
});

/* ── Activate: remove stale caches ── */
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys
          .filter(function (k) { return k !== CACHE; })
          .map(function (k) { return caches.delete(k); })
      );
    }).then(function () { return self.clients.claim(); })
  );
});

/* ── Fetch: tiered caching strategy ── */
self.addEventListener('fetch', function (e) {
  var req = e.request;
  var url;
  try { url = new URL(req.url); } catch (_) { return; }

  if (url.origin !== self.location.origin) return;

  var path = url.pathname;

  /* Cache-first for images — serve instantly, revalidate in background */
  if (/\.(jpg|jpeg|png|svg|gif|webp|ico)$/.test(path)) {
    e.respondWith(
      caches.match(req).then(function (cached) {
        /* Background revalidate */
        fetch(req).then(function (fresh) {
          if (fresh && fresh.ok) {
            caches.open(CACHE).then(function (c) { c.put(req, fresh); });
          }
        }).catch(function () {});
        if (cached) return cached;
        /* Not in cache yet — fetch and store */
        return fetch(req).then(function (fresh) {
          if (fresh && fresh.ok) {
            var clone = fresh.clone();
            caches.open(CACHE).then(function (c) { c.put(req, clone); });
          }
          return fresh;
        });
      })
    );
    return;
  }

  /* Stale-while-revalidate for JS, CSS, JSON — instant from cache + silent update */
  if (/\.(js|css|json)$/.test(path)) {
    e.respondWith(
      caches.match(req).then(function (cached) {
        var fetchPromise = fetch(req).then(function (fresh) {
          if (fresh && fresh.ok) {
            var clone = fresh.clone();
            caches.open(CACHE).then(function (c) { c.put(req, clone); });
          }
          return fresh;
        }).catch(function () { return cached; });
        return cached || fetchPromise;
      })
    );
    return;
  }

  /* Navigation requests — network with cache fallback for offline */
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).catch(function () {
        return caches.match('/');
      })
    );
  }
});
