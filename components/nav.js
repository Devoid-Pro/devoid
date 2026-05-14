/**
 * Nav component
 * @param {boolean} isDark  - true on the dark hero landing page
 * @param {string|null} activePage - 'writings' to mark that link active; null otherwise
 * @returns {string} HTML string
 */
export function createNav(isDark = false, activePage = null) {
  const textColor   = isDark ? 'text-off-white' : 'text-off-black';
  const logoStyle   = isDark
    ? 'mix-blend-mode: screen; height: 36px; width: auto'
    : 'height: 36px; width: auto; filter: invert(1); mix-blend-mode: multiply;';
  const wrapperBorder = isDark ? '' : 'border-b border-c-300';
  const writingsActive = activePage === 'writings' ? ' aria-current="page"' : '';

  return `
    <div class="w-full ${wrapperBorder}">
      <header class="z-10 mx-auto flex w-full max-w-[1172px] flex-row items-center gap-8 font-[450] ${textColor} px-3 lg:h-[88px] xl:p-0 pt-4">

        <a href="/" data-link>
          <img src="/ass/devoid_pro_logo.png" alt="Devoid" class="inline-block"
            style="${logoStyle}" />
        </a>

        <a class="group relative hidden items-center gap-1 rounded-md text-center text-sm transition-opacity hover:opacity-70 active:opacity-100 lg:flex"
          href="/writings" data-link${writingsActive}>
          Writings
          <svg viewBox="0 0 10 9"
            class="inline-block fill-current size-2.5 opacity-0 transition-opacity group-hover:opacity-100"
            preserveAspectRatio="xMidYMid meet" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.52614 8.72409L4.75519 7.96238L7.66357 5.05399H0.249512V3.94604H7.66357L4.75519 1.04689L5.52614 0.27594L9.75022 4.50002L5.52614 8.72409Z"></path>
          </svg>
        </a>

        <button
          class="inline-flex items-center justify-center gap-1 text-[15px] cursor-pointer font-inter font-[450] leading-[11px] tracking-[-0.2px] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-off-black/5 h-12 w-12 rounded-full -mr-3 ml-auto lg:hidden ${textColor}"
          type="button" aria-label="Open mobile menu" id="nav-hamburger">
          <svg viewBox="0 0 24 24" class="inline-block fill-current size-6" preserveAspectRatio="xMidYMid meet"
            aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.5 15H1.5C1.22386 15 1 15.2239 1 15.5V16.5C1 16.7761 1.22386 17 1.5 17H22.5C22.7761 17 23 16.7761 23 16.5V15.5C23 15.2239 22.7761 15 22.5 15Z"></path>
            <path d="M22.5 7H1.5C1.22386 7 1 7.22386 1 7.5V8.5C1 8.77614 1.22386 9 1.5 9H22.5C22.7761 9 23 8.77614 23 8.5V7.5C23 7.22386 22.7761 7 22.5 7Z"></path>
          </svg>
        </button>

      </header>
    </div>

    <!-- Mobile menu overlay -->
    <div id="mobile-menu" aria-hidden="true"
      style="display:none;position:fixed;inset:0;z-index:200;background:#F7F4F0;flex-direction:column;">
      <!-- Menu header -->
      <div style="display:flex;align-items:center;justify-content:space-between;padding:16px 12px;border-bottom:1px solid #E8E3DC;">
        <a href="/" data-link>
          <img src="/ass/devoid_pro_logo.png" alt="Devoid"
            style="height:36px;width:auto;filter:invert(1);mix-blend-mode:multiply;" />
        </a>
        <button id="nav-menu-close" type="button" aria-label="Close menu"
          style="display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:50%;border:none;background:transparent;cursor:pointer;color:#140E00;margin-right:-12px;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            style="width:20px;height:20px;" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>
      <!-- Menu links -->
      <nav style="display:flex;flex-direction:column;padding:32px 24px;gap:0;">
        <a href="/writings" data-link${writingsActive}
          style="display:block;padding:16px 0;font-size:20px;font-weight:450;color:#140E00;text-decoration:none;border-bottom:1px solid #E8E3DC;transition:opacity 0.2s;"
          onmouseenter="this.style.opacity='0.6'" onmouseleave="this.style.opacity='1'">
          Writings
        </a>
      </nav>
    </div>
  `;
}
