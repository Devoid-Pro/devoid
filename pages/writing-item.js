import { createNav } from '../components/nav.js';
import { createFooter } from '../components/footer.js';

function formatDate(iso) {
  var d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function setMetaTag(selector, attr, value) {
  var el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    if (attr === 'property') el.setAttribute('property', value);
    document.head.appendChild(el);
  }
  el.setAttribute(attr === 'name' ? 'content' : 'content', value);
}

/**
 * Renders a single writing post into appEl.
 * @param {HTMLElement} appEl
 * @param {{ id: string }} params  — route param extracted by router
 * @param {function} updateHead
 */
export function render(appEl, params, updateHead) {
  const targetId = parseInt(params.id, 10);

  appEl.innerHTML = `
    <div class="flex min-h-screen flex-col items-center bg-off-white text-off-black">
      <div class="flex-1 flex w-full max-w-[1204px] 2xl:max-w-[1440px] flex-col">

        <div class="flex-1 border-l border-r border-c-300">

          ${createNav(false, null)}

          <div style="position: relative;">
            <div class="post-c-line"></div>
            <div class="post-d-line"></div>
            <div id="post-root">
              <p class="post-loading">Loading…</p>
            </div>
          </div>

        </div>

        ${createFooter()}

      </div>
    </div>
  `;

  if (!targetId) {
    document.getElementById('post-root').innerHTML =
      '<p class="post-loading">No post specified. <a href="/writings" data-link style="color:#4a4035;">Back to Writings</a></p>';
    return;
  }

  fetch('./blogs.json')
    .then(function (r) { return r.json(); })
    .then(function (blogs) {
      var blog = null;
      for (var i = 0; i < blogs.length; i++) {
        if (blogs[i].id === targetId) { blog = blogs[i]; break; }
      }

      var root = document.getElementById('post-root');
      if (!root) return;

      if (!blog) {
        root.innerHTML = '<p class="post-loading">Post not found. <a href="/writings" data-link style="color:#4a4035;">Back to Writings</a></p>';
        return;
      }

      /* Update head dynamically for this post */
      updateHead({
        title: blog.topic + ' — Devoid',
        description: blog.miniDescription,
        canonical: 'https://devoid.pro/writing/' + blog.id,
        ogType: 'article',
        ogUrl: 'https://devoid.pro/writing/' + blog.id,
        ogTitle: blog.topic + ' — Devoid',
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
              '@type': 'BlogPosting',
              '@id': 'https://devoid.pro/writing/' + blog.id + '#article',
              'url': 'https://devoid.pro/writing/' + blog.id,
              'headline': blog.topic,
              'datePublished': blog.date,
              'author': { '@id': 'https://devoid.pro/#organization' },
              'publisher': { '@id': 'https://devoid.pro/#organization' },
              'isPartOf': { '@id': 'https://devoid.pro/writings#blog' }
            }
          ]
        })
      });

      /* 1. Header zone */
      var header = document.createElement('div');
      header.className = 'post-content-zone';
      header.style.paddingTop = '60px';
      header.style.paddingBottom = '40px';
      header.innerHTML =
        '<a class="post-back" href="/writings" data-link>' +
        '<svg viewBox="0 0 10 9" style="width:10px;height:10px;transform:rotate(180deg);fill:currentColor;" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M5.52614 8.72409L4.75519 7.96238L7.66357 5.05399H0.249512V3.94604H7.66357L4.75519 1.04689L5.52614 0.27594L9.75022 4.50002L5.52614 8.72409Z"></path></svg>' +
        'Back to Writings' +
        '</a>' +
        '<p class="post-date" style="margin-top:40px;">' + formatDate(blog.date) + '</p>' +
        '<h1 class="post-topic font-serif font-light text-off-black" style="margin-top:14px;">' + blog.topic + '</h1>';

      /* 2. Image breakout */
      var imageWrap = document.createElement('div');
      imageWrap.className = 'post-image-full';
      imageWrap.style.marginBottom = '0';
      imageWrap.innerHTML = '<img src="' + blog.imageUrl + '" alt="' + blog.topic + '" />';

      /* 3. Body zone */
      var body = document.createElement('div');
      body.className = 'post-content-zone';
      body.style.paddingTop = '48px';
      body.style.paddingBottom = '80px';
      body.innerHTML = '<div class="post-body">' + blog.description + '</div>';

      root.innerHTML = '';
      root.appendChild(header);
      root.appendChild(imageWrap);
      root.appendChild(body);
    })
    .catch(function (e) {
      console.error('Failed to load blog:', e);
      var root = document.getElementById('post-root');
      if (root) root.innerHTML = '<p class="post-loading">Failed to load post. <a href="/writings" data-link style="color:#4a4035;">Back to Writings</a></p>';
    });
}
