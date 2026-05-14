import { render as renderHome }        from './pages/home.js';
import { render as renderWritings }    from './pages/writings.js';
import { render as renderWritingItem } from './pages/writing-item.js';

/* ─── Connection quality flag (read by page modules) ────────────────────── */

window.__devoidSlowConn = !!(
  navigator.connection &&
  (navigator.connection.saveData ||
    ['slow-2g', '2g'].indexOf(navigator.connection.effectiveType) !== -1)
);

/* ─── Loader ─────────────────────────────────────────────────────────────── */

var _loaderDismissed = false;
function dismissLoader() {
  if (_loaderDismissed) return;
  _loaderDismissed = true;
  var loader = document.getElementById('page-loader');
  if (!loader) return;
  loader.classList.add('hidden');
  setTimeout(function () {
    if (loader.parentNode) loader.parentNode.removeChild(loader);
  }, 450);
}

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

var routes = [
  { path: '/',             render: renderHome        },
  { path: '/writings',     render: renderWritings    },
  { path: '/writing/:id',  render: renderWritingItem },
];

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

var _firstRender = true;

function router() {
  var path  = window.location.pathname;
  var appEl = document.getElementById('app');

  /* Redirect legacy .html URLs */
  if (path.endsWith('.html')) {
    var clean = path
      .replace(/\.html$/, '')
      .replace('writing-item', 'writing');
    history.replaceState(null, '', clean);
    path = clean;
  }

  window.scrollTo(0, 0);

  /* Page fade-in animation (skip on the very first render — loader handles that) */
  if (!_firstRender) {
    appEl.classList.remove('page-enter');
    void appEl.offsetWidth; /* force reflow to restart animation */
    appEl.classList.add('page-enter');
  }
  _firstRender = false;

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
      dismissLoader();
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
  dismissLoader();
}

/* ─── Link interception + mobile menu (event delegation) ────────────────── */

function openMobileMenu() {
  var menu = document.getElementById('mobile-menu');
  if (!menu) return;
  menu.style.display = 'flex';
  menu.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  var menu = document.getElementById('mobile-menu');
  if (!menu) return;
  menu.style.display = 'none';
  menu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.addEventListener('click', function (e) {
  if (e.target.closest('#nav-hamburger')) {
    openMobileMenu();
    return;
  }

  if (e.target.closest('#nav-menu-close')) {
    closeMobileMenu();
    return;
  }

  var link = e.target.closest('a[data-link]');
  if (!link) return;
  e.preventDefault();
  closeMobileMenu();
  var href = link.getAttribute('href');
  if (!href || href === '#') return;
  if (href === window.location.pathname) return;
  history.pushState(null, '', href);
  router();
});

/* ─── Bootstrap ─────────────────────────────────────────────────────────── */

window.addEventListener('popstate', router);
router();
