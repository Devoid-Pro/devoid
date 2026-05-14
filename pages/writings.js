import { createNav } from '../components/nav.js';
import { createFooter } from '../components/footer.js';

const HEAD_META = {
  title: 'Devoid Writings — Insights on Scaling Tech Teams',
  description: 'Devoid Writings — insights on scaling engineering teams, eliminating hiring lag, and deploying the right technical talent at the right time.',
  canonical: 'https://devoid.pro/writings',
  ogType: 'website',
  ogUrl: 'https://devoid.pro/writings',
  ogTitle: 'Devoid Writings — Insights on Scaling Tech Teams',
  ogImage: 'https://devoid.pro/ass/devoid_pro_logo.png',
  jsonLd: JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://devoid.pro/#organization',
        'name': 'Devoid',
        'url': 'https://devoid.pro',
        'logo': { '@type': 'ImageObject', 'url': 'https://devoid.pro/ass/devoid_pro_logo.png' },
        'description': 'Devoid connects companies with elite engineers, PMs, QA, DevOps, and UI/UX designers on demand — filling every skill gap without friction.',
        'areaServed': 'Worldwide',
        'serviceType': ['Engineering Staff Augmentation', 'Technical Team Extension', 'On-Demand Engineering Teams'],
        'sameAs': ['https://www.linkedin.com/company/devoid-pro']
      },
      {
        '@type': 'Blog',
        '@id': 'https://devoid.pro/writings#blog',
        'url': 'https://devoid.pro/writings',
        'name': 'Devoid Writings',
        'description': 'Insights on scaling engineering teams, eliminating hiring lag, and deploying the right technical talent at the right time.',
        'publisher': { '@id': 'https://devoid.pro/#organization' }
      }
    ]
  })
};

function formatDate(iso) {
  var d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function skeletonCard() {
  return '<div class="blog-card">' +
    '<div class="blog-card-date"><div class="sk-line" style="width:90px;height:11px;"></div></div>' +
    '<div class="blog-card-topic">' +
      '<div class="sk-line" style="width:92%;height:20px;margin-bottom:8px;"></div>' +
      '<div class="sk-line" style="width:68%;height:20px;"></div>' +
    '</div>' +
    '<div class="blog-card-desc">' +
      '<div class="sk-line" style="margin-bottom:8px;"></div>' +
      '<div class="sk-line" style="margin-bottom:8px;"></div>' +
      '<div class="sk-line" style="width:72%;"></div>' +
    '</div>' +
    '<div class="blog-card-btn"><div class="sk-line" style="width:150px;height:28px;border-radius:4px;margin-bottom:0;"></div></div>' +
    '<div class="blog-card-image"><div class="sk-line" style="height:180px;border-radius:4px;margin-bottom:0;"></div></div>' +
    '</div>';
}

function renderCards(blogs) {
  var list = document.getElementById('blog-list');
  if (!list) return;
  list.innerHTML = ''; /* clear skeletons */
  blogs.sort(function (a, b) { return a.order - b.order; });
  blogs.forEach(function (blog) {
    var article = document.createElement('article');
    article.className = 'blog-card';
    article.innerHTML =
      '<p class="blog-card-date">' + formatDate(blog.date) + '</p>' +
      '<h2 class="blog-card-topic font-serif font-light text-off-black">' + blog.topic + '</h2>' +
      '<p class="blog-card-desc text-c-500">' + blog.miniDescription + '</p>' +
      '<a class="blog-card-btn group relative inline-flex items-center gap-1 rounded-sm px-3 py-1 text-sm transition-opacity hover:opacity-70 active:opacity-100" style="background:#F2EEE8;color:#4a4035;" href="/writing/' + blog.id + '" data-link>' +
      'Read the announcement' +
      '<svg viewBox="0 0 10 9" class="inline-block fill-current size-2.5" preserveAspectRatio="xMidYMid meet" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M5.52614 8.72409L4.75519 7.96238L7.66357 5.05399H0.249512V3.94604H7.66357L4.75519 1.04689L5.52614 0.27594L9.75022 4.50002L5.52614 8.72409Z"></path></svg>' +
      '</a>' +
      '<div class="blog-card-image">' +
      '<img src="' + blog.imageUrl + '" alt="' + blog.topic + '" loading="lazy" decoding="async" />' +
      '</div>';

    /* Blur-up: start blurred, sharpen once decoded */
    var img = article.querySelector('.blog-card-image img');
    if (img) {
      img.style.filter = 'blur(6px)';
      img.style.transform = 'scale(1.03)';
      img.style.transition = 'filter 0.45s ease, transform 0.45s ease';
      var clearBlur = function () {
        img.style.filter = '';
        img.style.transform = '';
      };
      if (img.complete && img.naturalWidth > 0) {
        clearBlur();
      } else {
        img.addEventListener('load', clearBlur, { once: true });
      }
    }

    list.appendChild(article);
  });
}

/**
 * Renders the writings listing page into appEl.
 * @param {HTMLElement} appEl
 * @param {object} _params
 * @param {function} updateHead
 */
export function render(appEl, _params, updateHead) {
  appEl.innerHTML = `
    <div class="flex min-h-screen flex-col items-center bg-off-white text-off-black">
      <div class="flex-1 flex w-full max-w-[1204px] 2xl:max-w-[1440px] flex-col">

        <div class="flex-1 border-l border-r border-c-300">

          ${createNav(false, 'writings')}

          <div style="position: relative;">
            <div class="blog-c-line"></div>
            <div class="blog-d-line"></div>
            <div class="blog-content-zone">
              <h1 class="blog-page-heading font-serif font-light text-5xl text-off-black tracking-tight"
                style="margin-bottom: 20px;">Writings</h1>
              <p class="text-c-500 text-sm font-[450] leading-relaxed" style="margin-bottom: 56px;">
                What separates the startups that scale from the ones that stall? It often comes down to how they think.
                Devoid's Writings explores the strategies, shifts, and real-world lessons shaping how engineering teams
                grow — one article at a time.
              </p>
              <div id="blog-list"></div>
            </div>
          </div>

        </div>

        ${createFooter()}

      </div>
    </div>
  `;

  updateHead(HEAD_META);

  /* Show skeleton cards immediately while fetching */
  var list = document.getElementById('blog-list');
  if (list) list.innerHTML = skeletonCard() + skeletonCard();

  fetch('/blogs.json')
    .then(function (r) { return r.json(); })
    .then(renderCards)
    .catch(function (e) {
      console.error('Failed to load blogs:', e);
      var l = document.getElementById('blog-list');
      if (l) l.innerHTML = '<p style="font-size:14px;color:#9a8f82;padding:20px 0;">Could not load articles. Please refresh.</p>';
    });
}
