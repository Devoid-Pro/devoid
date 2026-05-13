import { createNav } from '../components/nav.js';
import { createFooter } from '../components/footer.js';

const HEAD_META = {
  title: 'Devoid — Scale Engineering Teams Without Friction',
  description: 'Devoid connects companies with elite engineers, PMs, QA, DevOps, and UI/UX designers on demand. Fill every skill gap and scale your team without friction.',
  canonical: 'https://devoid.pro/',
  ogType: 'website',
  ogUrl: 'https://devoid.pro/',
  ogTitle: 'Devoid — Scale Engineering Teams Without Friction',
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
        '@type': 'WebSite',
        '@id': 'https://devoid.pro/#website',
        'url': 'https://devoid.pro',
        'name': 'Devoid',
        'publisher': { '@id': 'https://devoid.pro/#organization' }
      }
    ]
  })
};

/**
 * Renders the landing (home) page into appEl.
 * @param {HTMLElement} appEl
 * @param {object} _params  (unused — no route params on home)
 * @param {function} updateHead
 */
export function render(appEl, _params, updateHead) {
  appEl.innerHTML = `
    <div class="flex min-h-screen flex-col items-center bg-off-white text-off-black">

      <!-- Hero Section -->
      <div class="relative box-border flex min-h-screen w-full flex-col max-w-[1204px] 2xl:max-w-[1440px] md:h-[881px] md:min-h-auto lg:max-h-svh">

        <!-- Background Image -->
        <div class="absolute h-full w-full overflow-hidden transition-opacity duration-400 opacity-100">
          <img alt="Devoid — scale engineering teams without friction"
            class="pointer-events-none absolute h-full w-full select-none object-cover transition-transform duration-1000"
            src="./ass/devoid_hero_bg.jpg"
            fetchpriority="high"
            width="1204"
            height="881"
            style="position: absolute; height: 100%; width: 100%; inset: 0px; color: transparent;" />
          <div class="absolute top-0 h-1/3 w-full bg-gradient-to-b from-black/30 via-75% to-transparent"></div>
        </div>

        <!-- Hero Content -->
        <div class="relative flex h-full grow flex-col items-center justify-center gap-12 overflow-hidden px-4 sm:gap-16 sm:px-8">

          <!-- Navigation -->
          <div class="w-full" style="opacity: 1; transform: none">
            ${createNav(true, null)}
          </div>

          <!-- Hero Text + Form -->
          <div class="flex h-full min-h-0 w-full max-w-[1172px] grow flex-col items-center lg:items-start lg:justify-start gap-28 sm:gap-24">
            <div class="flex flex-col items-center gap-8 lg:items-start" style="opacity: 1; height: auto">

              <!-- From Earth badge -->
              <div class="flex justify-center lg:justify-start" style="opacity: 1; transform: none">
                <a class="inline-flex items-center gap-1 rounded-[9px] bg-[#FFFEFC17] px-3 py-px font-450 text-xs transition-all duration-300 ease-in-out hover:backdrop-blur-sm border border-[#F7F4F04D] text-white"
                  href="">
                  <span class="leading-[26px]">From Earth</span>
                  <svg viewBox="0 0 10 9" class="inline-block fill-current w-3" preserveAspectRatio="xMidYMid meet"
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.52614 8.72409L4.75519 7.96238L7.66357 5.05399H0.249512V3.94604H7.66357L4.75519 1.04689L5.52614 0.27594L9.75022 4.50002L5.52614 8.72409Z"></path>
                  </svg>
                </a>
              </div>

              <!-- Heading -->
              <h1 class="flex flex-wrap justify-center gap-3 font-light font-serif text-6xl text-c-50 leading-[75%] tracking-[-3.5px] antialiased sm:max-w-[696px] sm:text-8xl lg:justify-start">
                <span>Scale</span><span>Teams</span><span>Without</span><span></span><span>Friction.</span>
              </h1>

              <!-- Subheading -->
              <p class="flex w-full items-center text-center font-light text-c-50 text-xl sm:max-w-[400px] lg:max-w-[500px] lg:text-left">
                Devoid connects companies with world class talent on demand,
                without friction.
              </p>
            </div>

            <!-- Email capture form -->
            <div class="flex h-full w-full max-w-[450px] flex-col gap-4" style="opacity: 1; transform: none">
              <form class="flex rounded-[14px] bg-[#F5F1EC]/70 p-[5px] font-inter backdrop-blur-xs mx-4 flex-col gap-6 sm:mx-0 sm:h-[54px] sm:w-full sm:flex-row sm:items-center sm:gap-0 lg:max-w-[5000px]">
                <input required
                  class="min-w-0 appearance-none placeholder-[#140E00]/60 outline-none disabled:opacity-50 sm:flex-1 pt-3 pl-2 sm:pt-0 sm:pl-[18px]"
                  placeholder="Your email address" type="email" value="" />
                <button
                  class="inline-flex items-center justify-center gap-1 rounded-[11px] text-[15px] cursor-pointer font-inter font-[450] leading-[11px] tracking-[-0.2px] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-c-800 text-c-100 hover:bg-c-800/90 px-6 py-[17px] h-[45px] shrink-0 sm:flex sm:w-[140px]"
                  type="submit">
                  Contact Us
                </button>
              </form>
              <div class="flex flex-col gap-2 text-center lg:text-left">
                <span class="font-medium text-c-50 text-sm">Stay in the loop</span>
                <span class="text-c-400 text-xs sm:text-sm">Get insights on scaling teams, hiring strategies, and product acceleration.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      ${createFooter()}

    </div>
  `;

  updateHead(HEAD_META);
}
