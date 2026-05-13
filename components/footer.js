/**
 * Footer component — identical on all pages.
 * @returns {string} HTML string
 */
export function createFooter() {
  return `
    <footer class="relative flex h-full w-full grow flex-col">
      <div class="relative flex h-full grow flex-col overflow-hidden px-4 text-center lg:flex-row lg:px-6 lg:text-left border-c-300 border-r border-l border-t">

        <!-- Left column: legal + mobile socials -->
        <div class="flex w-full flex-1 flex-col gap-16 pt-16 pb-20 lg:gap-6">
          <div class="flex flex-col items-center gap-8 lg:hidden">
            <div class="flex flex-col gap-8 lg:hidden">
              <p class="text-center font-[450] text-base text-c-900 opacity-45 lg:text-sm">
                <a class="rounded-md text-center transition-opacity hover:opacity-75" href="">We're hiring</a>
              </p>
              <span class="font-[450] text-c-900 opacity-45 lg:hidden">
                <a href="">Terms</a> &amp;
                <a href="">Privacy</a>
              </span>
              <span class="font-[450] text-c-900 opacity-45 lg:hidden">
                <a href="">Support</a>
              </span>
              <div class="flex items-center justify-center gap-4 font-[450] text-c-900 text-sm lg:text-right">
                <div class="flex items-center gap-2">
                  <a target="_blank" rel="noopener noreferrer" class="transition-opacity hover:opacity-75"
                    aria-label="LinkedIn" href="https://www.linkedin.com/company/devoid-pro">
                    <img alt="LinkedIn" loading="lazy" width="24" height="24" decoding="async"
                      class="inline-block size-6 lg:size-[18px]" src="./ass/social/linkedin.svg"
                      style="color: transparent" />
                  </a>
                  <a target="_blank" rel="noopener noreferrer" class="transition-opacity hover:opacity-75"
                    aria-label="X (Twitter)" href="https://x.com/devoidpro">
                    <img alt="X (Twitter)" loading="lazy" width="24" height="24" decoding="async"
                      class="inline-block size-6 lg:size-[18px]" src="./ass/social/x.svg"
                      style="color: transparent" />
                  </a>
                  <a target="_blank" rel="noopener noreferrer" class="transition-opacity hover:opacity-75"
                    aria-label="Instagram" href="https://www.instagram.com/devoid.pro">
                    <img alt="Instagram" loading="lazy" width="24" height="24" decoding="async"
                      class="inline-block size-6 lg:size-[18px]" src="./ass/social/insta.svg"
                      style="color: transparent" />
                  </a>
                  <a href="mailto:contact@devoid.pro" class="transition-opacity hover:opacity-75" aria-label="Email">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="inline-block size-6 lg:size-[18px]" fill="currentColor" aria-hidden="true">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-6 text-left font-[450] text-c-500 text-xs tracking-tight">
            <div class="flex flex-row gap-3">
              <span>© Devoid</span>
              <span class="hidden lg:inline-block">
                <a class="transition-opacity hover:opacity-75" href="">Terms</a>
                &amp;
                <a class="transition-opacity hover:opacity-75" href="">Privacy</a>
              </span>
              <span class="hidden lg:inline-block">
                <a class="transition-opacity hover:opacity-75" href="">Support</a>
              </span>
            </div>
            <span>Devoid provides world-class engineering talent and seamless
              team extension services to companies across the globe. We
              specialize in identifying skill gaps, deploying highly vetted
              professionals, and integrating them directly into your workflows
              ensuring immediate impact and long-term scalability. From rapid
              team augmentation to full-cycle product acceleration,</span>
            <span>Devoid enables organizations to move faster, operate smarter,
              and build without limitations. All engagements are tailored to
              individual requirements, project scope, and business
              objectives.</span>
          </div>
        </div>

        <!-- Right column: desktop only -->
        <div class="hidden w-full flex-1 items-start justify-end gap-8 pt-16 pb-20 lg:flex">
          <p class="text-center font-[450] text-base text-c-900 opacity-45 lg:text-sm">
            <a class="rounded-md text-center transition-opacity hover:opacity-75" href="">We're hiring</a>
          </p>
          <div class="flex items-center justify-center gap-4 font-[450] text-c-900 text-sm lg:text-right">
            <div class="flex items-center gap-2">
              <a target="_blank" rel="noopener noreferrer" class="transition-opacity hover:opacity-75"
                aria-label="LinkedIn" href="https://www.linkedin.com/company/devoid-pro">
                <img alt="LinkedIn" loading="lazy" width="24" height="24" decoding="async"
                  class="inline-block size-6 lg:size-[18px]" src="./ass/social/linkedin.svg"
                  style="color: transparent" />
              </a>
              <a target="_blank" rel="noopener noreferrer" class="transition-opacity hover:opacity-75"
                aria-label="X (Twitter)" href="https://x.com/devoidpro">
                <img alt="X (Twitter)" loading="lazy" width="24" height="24" decoding="async"
                  class="inline-block size-6 lg:size-[18px]" src="./ass/social/x.svg" style="color: transparent" />
              </a>
              <a target="_blank" rel="noopener noreferrer" class="transition-opacity hover:opacity-75"
                aria-label="Instagram" href="https://www.instagram.com/devoid.pro">
                <img alt="Instagram" loading="lazy" width="24" height="24" decoding="async"
                  class="inline-block size-6 lg:size-[18px]" src="./ass/social/insta.svg" style="color: transparent" />
              </a>
              <a href="mailto:contact@devoid.pro" class="transition-opacity hover:opacity-75" aria-label="Email">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="inline-block size-6 lg:size-[18px]" fill="currentColor" aria-hidden="true">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  `;
}
