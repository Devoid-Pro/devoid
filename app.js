import { render as renderHome }        from './pages/home.js';
import { render as renderWritings }    from './pages/writings.js';
import { render as renderWritingItem } from './pages/writing-item.js';

/* ─── Head updater ──────────────────────────────────────────────────────── */

function updateHead(meta) {
  document.title = meta.title || 'Devoid';

  setMeta('name', 'description', meta.description || '');
  setCanonical(meta.canonical || 'https://devoid.pro/');

  setMeta('property', 'og:type',        meta.ogType  || 'website');
  setMeta('property', 'og:site_name',   'Devoid');
  setMeta('property', 'og:url',         meta.ogUrl   || meta.canonical || 'https://devoid.pro/');
  setMeta('property', 'og:title',       meta.ogTitle || meta.title || 'Devoid');
  setMeta('property', 'og:description', meta.description || '');
  setMeta('property', 'og:image',       meta.ogImage || 'https://devoid.pro/ass/devoid_pro_logo.png');
  setMeta('property', 'og:image:alt',   'Devoid logo');

  setMeta('name', 'twitter:card',        'summary_large_image');
  setMeta('name', 'twitter:title',       meta.ogTitle || meta.title || 'Devoid');
  setMeta('name', 'twitter:description', meta.description || '');
  setMeta('name', 'twitter:image',       meta.ogImage || 'https://devoid.pro/ass/devoid_pro_logo.png');

  if (meta.jsonLd) {
    var ld = document.getElementById('ld-json');
    if (!ld) {
      ld = document.createElement('script');
      ld.id   = 'ld-json';
      ld.type = 'application/ld+json';
      document.head.appendChild(ld);
    }
    ld.textContent = meta.jsonLd;
  }
}

function setMeta(attrName, attrValue, content) {
  var selector = 'meta[' + attrName + '="' + attrValue + '"]';
  var el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href) {
  var el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/* ─── Route table ───────────────────────────────────────────────────────── */

/*
  Each route:
    path    — exact string or pattern string with :param tokens
    render  — page render function(appEl, params, updateHead)
    pattern — compiled RegExp (built below)
    keys    — ordered param names extracted from path
*/
var routes = [
  { path: '/',             render: renderHome        },
  { path: '/writings',     render: renderWritings    },
  { path: '/writing/:id',  render: renderWritingItem },
];

/* Compile route patterns once */
routes.forEach(function (route) {
  var keys = [];
  var pattern = route.path.replace(/:([^/]+)/g, function (_, key) {
    keys.push(key);
    return '([^/]+)';
  });
  route.pattern = new RegExp('^' + pattern + '/?$');
  route.keys    = keys;
});

/* ─── Router ────────────────────────────────────────────────────────────── */

function router() {
  var path   = window.location.pathname;
  var appEl  = document.getElementById('app');

  /* Silently redirect legacy .html URLs */
  if (path.endsWith('.html')) {
    var clean = path
      .replace(/\.html$/, '')
      .replace('writing-item', 'writing');
    history.replaceState(null, '', clean);
    path = clean;
  }

  /* Scroll to top on every navigation */
  window.scrollTo(0, 0);

  /* Match route */
  for (var i = 0; i < routes.length; i++) {
    var route = routes[i];
    var match = path.match(route.pattern);
    if (match) {
      var params = {};
      route.keys.forEach(function (key, idx) {
        params[key] = decodeURIComponent(match[idx + 1] || '');
      });
      route.render(appEl, params, updateHead);
      return;
    }
  }

  /* 404 fallback */
  appEl.innerHTML =
    '<div class="flex min-h-screen flex-col items-center justify-center bg-off-white text-off-black">' +
    '<p style="font-size:14px;color:#9a8f82;padding:60px 40px;">Page not found. ' +
    '<a href="/" data-link style="color:#4a4035;">Go home</a></p>' +
    '</div>';
  document.title = '404 — Devoid';
}

/* ─── Link interception (event delegation) ──────────────────────────────── */

document.addEventListener('click', function (e) {
  var link = e.target.closest('a[data-link]');
  if (!link) return;
  e.preventDefault();
  var href = link.getAttribute('href');
  if (!href || href === '#') return;
  if (href === window.location.pathname) return; /* same page — no-op */
  history.pushState(null, '', href);
  router();
});

/* ─── Bootstrap ─────────────────────────────────────────────────────────── */

window.addEventListener('popstate', router);
router();
