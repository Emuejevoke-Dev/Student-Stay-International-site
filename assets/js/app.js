/**
 * StudentStay - Master Application JavaScript Engine
 * Provides Theme Management, Dynamic Auth, Multi-Currency Engine,
 * Hero Auto-Playing Carousel, Property Filters, Escrow Booking Modal,
 * and Student Profile Management.
 */

// ==========================================
// 1. THEME MANAGEMENT (High Contrast Dark/Light)
// ==========================================
const ThemeManager = {
  THEME_KEY: 'studentstay_theme',

  init() {
    const savedTheme = localStorage.getItem(this.THEME_KEY) || 'light';
    this.applyTheme(savedTheme);

    // Attach listeners to all theme toggle buttons across the page
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggle();
      });
    });
  },

  applyTheme(theme) {
    const isDark = theme === 'dark';
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(this.THEME_KEY, theme);
    this.updateToggleButtons(isDark);
  },

  toggle() {
    const isCurrentlyDark = document.documentElement.classList.contains('dark');
    const newTheme = isCurrentlyDark ? 'light' : 'dark';
    this.applyTheme(newTheme);
  },

  updateToggleButtons(isDark) {
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      const icon = btn.querySelector('i');
      const text = btn.querySelector('span');
      if (icon) {
        icon.className = isDark ? 'fa-solid fa-sun text-amber-400 mr-1.5' : 'fa-solid fa-moon mr-1.5 text-slate-600 dark:text-slate-300';
      }
      if (text) {
        text.textContent = isDark ? 'Light Mode' : 'Dark Mode';
      }
      btn.setAttribute('title', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    });
  }
};

// ==========================================
// 1.5 DYNAMIC INTAKE ANNOUNCEMENT TICKER ENGINE
// ==========================================
const IntakeAnnouncementManager = {
  announcements: {
    germany: {
      tag: '2026/27 Intake Open 🇩🇪',
      text: '🇩🇪 Coming to Munich or Berlin? Zero deposit guarantee, verified TUM & HU campus commutes & free airport welcome shuttle!'
    },
    usa: {
      tag: '2026/27 Intake Open 🇺🇸',
      text: '🇺🇸 Coming to New York, Boston, or Los Angeles? Zero deposit guarantee, verified Ivy League commutes & free airport welcome shuttle!'
    },
    canada: {
      tag: '2026/27 Intake Open 🇨🇦',
      text: '🇨🇦 Coming to Toronto, Vancouver, or Waterloo? Zero deposit guarantee, UofT & UBC verified commutes & free airport welcome shuttle!'
    },
    australia: {
      tag: '2026/27 Intake Open 🇦🇺',
      text: '🇦🇺 Coming to Sydney or Melbourne? Zero deposit guarantee, USYD & UNSW verified commutes & free airport welcome shuttle!'
    },
    uk: {
      tag: '2026/27 Intake Open 🇬🇧',
      text: '🇬🇧 Coming to Glasgow, Edinburgh, London, or Manchester? Zero deposit guarantee & free airport welcome shuttle!'
    },
    all: {
      tag: '2026/27 Intake Open 🌍',
      text: '🌍 Verified student accommodations across Germany, UK, USA, Canada & Australia with 100% Escrow Protection & free airport shuttle!'
    }
  },

  getActiveCountry() {
    const saved = localStorage.getItem('studentstay_active_country');
    if (saved && saved !== 'all') return saved;
    const customUser = localStorage.getItem('studentstay_custom_user');
    const savedUser = localStorage.getItem('studentstay_current_user');
    if (customUser || savedUser) {
      const user = window.AuthManager ? AuthManager.getCurrentUser() : null;
      if (user && user.destinationCountry && user.destinationCountry !== 'all') return user.destinationCountry;
      if (user && user.countryCode && user.countryCode !== 'all' && this.announcements[user.countryCode]) return user.countryCode;
    }
    return 'all';
  },

  update(countryCode) {
    const country = countryCode || this.getActiveCountry();
    const config = this.announcements[country] || this.announcements.all;

    const textEls = document.querySelectorAll('.top-intake-announcement-text, #top-announcement-text');
    textEls.forEach(el => {
      el.textContent = config.text;
    });

    const tagEls = document.querySelectorAll('.top-intake-announcement-tag, #top-announcement-tag');
    tagEls.forEach(el => {
      el.textContent = config.tag;
    });
  },

  init() {
    this.update();
  }
};

// ==========================================
// 1.8 RESPONSIVE MOBILE NAVIGATION ENGINE
// ==========================================
const MobileNavManager = {
  isOpen: false,

  init() {
    this.ensureMenuExists();
    this.bindEvents();
    this.highlightActivePage();
  },

  ensureMenuExists() {
    // If on signup.html (dedicated minimal auth portal), skip injecting full nav
    if (typeof window !== 'undefined' && window.location && window.location.pathname.endsWith('signup.html')) {
      return;
    }

    const header = document.querySelector('header');
    if (!header) return;

    const isAgent = typeof window !== 'undefined' && window.location && window.location.pathname.includes('agent.html');

    // 1. Ensure toggle button exists in header controls
    const toggleBtnId = isAgent ? 'owner-mobile-nav-toggle' : 'mobile-nav-toggle';
    let toggleBtn = document.getElementById(toggleBtnId);
    if (!toggleBtn) {
      const headerInner = header.querySelector('.max-w-7xl') || header;
      const lowerRow = document.createElement('div');
      lowerRow.className = isAgent 
        ? 'lg:hidden py-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-start'
        : 'md:hidden py-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-start';
      
      toggleBtn = document.createElement('button');
      toggleBtn.type = 'button';
      toggleBtn.id = toggleBtnId;
      toggleBtn.className = isAgent 
        ? 'inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-200 text-xs font-bold transition-all shadow-xs cursor-pointer border border-amber-300 dark:border-amber-700'
        : 'inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs font-bold transition-all shadow-xs cursor-pointer border border-slate-200/80 dark:border-slate-700';
      toggleBtn.setAttribute('aria-label', 'Toggle navigation tabs');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.innerHTML = isAgent
        ? `<i class="fa-solid fa-bars text-amber-600 dark:text-amber-400 text-xs" id="owner-mobile-nav-toggle-icon"></i><span>All 7 Tabs</span><i class="fa-solid fa-chevron-down text-[9px] text-amber-600 dark:text-amber-400 ml-0.5"></i>`
        : `<i class="fa-solid fa-bars text-sky-600 dark:text-sky-400 text-xs" id="mobile-nav-toggle-icon"></i><span>All Tabs</span><i class="fa-solid fa-chevron-down text-[9px] text-slate-400 dark:text-slate-500 ml-0.5"></i>`;
      lowerRow.appendChild(toggleBtn);

      const navEl = header.querySelector('nav');
      if (navEl) {
        navEl.parentNode.insertBefore(lowerRow, navEl);
      } else {
        headerInner.appendChild(lowerRow);
      }
    }

    // 2. Ensure mobile dropdown menu container exists
    const menuId = isAgent ? 'owner-mobile-nav-menu' : 'mobile-nav-menu';
    let menu = document.getElementById(menuId);
    if (!menu) {
      menu = document.createElement('div');
      menu.id = menuId;
      menu.className = isAgent
        ? 'hidden lg:hidden border-t border-slate-200/80 dark:border-slate-800 bg-white/98 dark:bg-[#0b1324]/98 backdrop-blur-xl py-4 px-3 sm:px-4 shadow-xl transition-all'
        : 'hidden md:hidden border-t border-slate-200/80 dark:border-slate-800 bg-white/98 dark:bg-[#0b1324]/98 backdrop-blur-xl py-4 px-3 sm:px-4 shadow-xl transition-all';

      if (isAgent) {
        menu.innerHTML = `
          <div class="space-y-3">
            <div class="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 px-2 flex items-center justify-between">
              <span>Owner & Letting Agent Dashboard Sections</span>
              <span class="text-[9px] bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-1.5 py-0.5 rounded font-extrabold">All 7 Tabs</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs font-bold">
              <a href="#section-kpis" class="mobile-nav-link flex items-center space-x-2.5 p-2.5 rounded-xl bg-amber-500 text-slate-950 shadow-xs">
                <i class="fa-solid fa-chart-pie text-sm"></i><span>1. Executive KPIs</span>
              </a>
              <a href="#section-roster" class="mobile-nav-link flex items-center space-x-2.5 p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                <i class="fa-solid fa-users text-amber-500 text-sm"></i><span>2. Tenancy Roster</span>
              </a>
              <a href="#section-refunds" class="mobile-nav-link flex items-center space-x-2.5 p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                <i class="fa-solid fa-vault text-rose-500 text-sm"></i><span>3. Escrow Trust & Refunds</span>
              </a>
              <a href="#section-companies" class="mobile-nav-link flex items-center space-x-2.5 p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                <i class="fa-solid fa-building text-sky-500 text-sm"></i><span>4. Partner Companies</span>
              </a>
              <a href="#section-stream" class="mobile-nav-link flex items-center space-x-2.5 p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                <i class="fa-solid fa-satellite-dish text-emerald-500 text-sm"></i><span>5. Live Tenancy Stream</span>
              </a>
              <a href="#section-feedback" class="mobile-nav-link flex items-center space-x-2.5 p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                <i class="fa-solid fa-star text-amber-500 text-sm"></i><span>6. Tenancy Reviews</span>
              </a>
              <a href="#section-issues" class="mobile-nav-link flex items-center space-x-2.5 p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                <i class="fa-solid fa-triangle-exclamation text-amber-500 text-sm"></i><span>7. Issue Resolution</span>
              </a>
            </div>
            <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 text-xs">
              <a href="index.html" class="flex-1 py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-center font-bold">
                <i class="fa-solid fa-arrow-left mr-1"></i> Student Home
              </a>
              <button type="button" onclick="logoutStudent(event)" class="sign-out-global-btn flex-1 py-2 px-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 font-bold text-center">
                <i class="fa-solid fa-arrow-right-from-bracket mr-1"></i> Sign Out
              </button>
            </div>
          </div>
        `;
      } else {
        const path = typeof window !== 'undefined' && window.location ? window.location.pathname : '';
        let page = path.split('/').pop() || 'index.html';
        if (!page || page === '') page = 'index.html';
        const isExploreContext = ['find-home.html', 'tours.html', 'map.html', 'insights.html', 'residents.html', 'chat.html'].includes(page);

        menu.innerHTML = `
          <div class="space-y-3.5">
            <!-- 1. Primary Student Navigation Tabs -->
            <div>
              <div class="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 px-2 flex items-center justify-between">
                <span>Core Navigation Tabs</span>
                <span class="text-[9px] text-sky-600 dark:text-sky-400 font-extrabold uppercase">Primary 4</span>
              </div>
              <div class="grid grid-cols-2 gap-1.5">
                <a href="index.html" class="mobile-nav-link flex items-center space-x-2.5 p-2.5 rounded-xl font-bold text-xs transition-all text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800" data-page="index.html">
                  <div class="w-7 h-7 rounded-lg bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                    <i class="fa-solid fa-house text-xs"></i>
                  </div>
                  <span class="truncate">Home</span>
                </a>
                <a href="find-home.html" class="mobile-nav-link flex items-center space-x-2.5 p-2.5 rounded-xl font-bold text-xs transition-all text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800" data-page="find-home.html">
                  <div class="w-7 h-7 rounded-lg bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                    <i class="fa-solid fa-magnifying-glass-location text-xs"></i>
                  </div>
                  <span class="truncate">Find Home</span>
                </a>
                <a href="about.html" class="mobile-nav-link flex items-center space-x-2.5 p-2.5 rounded-xl font-bold text-xs transition-all text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800" data-page="about.html">
                  <div class="w-7 h-7 rounded-lg bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                    <i class="fa-solid fa-circle-info text-xs"></i>
                  </div>
                  <span class="truncate">About Us</span>
                </a>
                <a href="profile.html" class="mobile-nav-link flex items-center space-x-2.5 p-2.5 rounded-xl font-bold text-xs transition-all text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800" data-page="profile.html">
                  <div class="w-7 h-7 rounded-lg bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                    <i class="fa-solid fa-id-badge text-xs"></i>
                  </div>
                  <span class="truncate">Student Profile</span>
                </a>
              </div>
            </div>

            ${isExploreContext ? `
            <!-- 2. Exploration & Community Tools (Dedicated to Find Home & Living Tools) -->
            <div class="pt-3 border-t border-slate-100 dark:border-slate-800/80">
              <div class="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 px-2 flex items-center justify-between">
                <span>Exploration & Living Tools</span>
                <span class="text-[9px] text-emerald-600 dark:text-emerald-400 font-extrabold uppercase">Interactive</span>
              </div>
              <div class="grid grid-cols-2 gap-1.5">
                <a href="tours.html" class="mobile-nav-link flex items-center space-x-2.5 p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-all" data-page="tours.html">
                  <div class="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <i class="fa-solid fa-arrows-spin text-xs"></i>
                  </div>
                  <span class="truncate">360° Tours</span>
                </a>
                <a href="map.html" class="mobile-nav-link flex items-center space-x-2.5 p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-all" data-page="map.html">
                  <div class="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <i class="fa-solid fa-map-location-dot text-xs"></i>
                  </div>
                  <span class="truncate">Campus Map</span>
                </a>
                <a href="insights.html" class="mobile-nav-link flex items-center space-x-2.5 p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-all" data-page="insights.html">
                  <div class="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                    <i class="fa-solid fa-chart-line text-xs"></i>
                  </div>
                  <span class="truncate">Rent Insights</span>
                </a>
                <a href="residents.html" class="mobile-nav-link flex items-center space-x-2.5 p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-all" data-page="residents.html">
                  <div class="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <i class="fa-solid fa-users text-xs"></i>
                  </div>
                  <span class="truncate">Residents</span>
                </a>
                <a href="chat.html" class="mobile-nav-link col-span-2 flex items-center space-x-2.5 p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-all" data-page="chat.html">
                  <div class="w-7 h-7 rounded-lg bg-teal-100 dark:bg-teal-950/80 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                    <i class="fa-solid fa-comments text-xs"></i>
                  </div>
                  <div class="flex-1 min-w-0 flex items-center justify-between">
                    <span class="truncate">Direct Landlord Chat</span>
                    <span class="text-[9px] px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-extrabold uppercase">Live Escrow</span>
                  </div>
                </a>
              </div>
            </div>
            ` : `
            <!-- Gateway to Find Your New Home (Where Exploration & Living Tools Live) -->
            <div class="pt-3 border-t border-slate-100 dark:border-slate-800/80">
              <a href="find-home.html" class="block p-3 rounded-2xl bg-gradient-to-r from-sky-50 via-sky-50/50 to-indigo-50/60 dark:from-sky-950/40 dark:via-sky-950/20 dark:to-indigo-950/30 border border-sky-200/90 dark:border-sky-800/80 group hover:border-sky-400 transition-all shadow-xs">
                <div class="flex items-center space-x-3">
                  <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-sky-400 text-white flex items-center justify-center shrink-0 shadow-sm shadow-sky-600/30 group-hover:scale-105 transition-transform">
                    <i class="fa-solid fa-compass text-base"></i>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center justify-between">
                      <span>Explore Accommodations</span>
                      <i class="fa-solid fa-arrow-right text-[10px] text-sky-600 dark:text-sky-400 group-hover:translate-x-1 transition-transform"></i>
                    </div>
                    <div class="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      360° Tours • Campus Map • Rent Insights • Peer Chat
                    </div>
                  </div>
                </div>
              </a>
            </div>
            `}

            <!-- 3. Portals & Quick Account Access -->
            <div class="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2 text-xs">
              <a href="agent.html" class="flex-1 py-2.5 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-400/40 font-bold transition-all flex items-center justify-center space-x-1.5">
                <i class="fa-solid fa-user-tie text-amber-500 text-xs"></i>
                <span>Owner Portal</span>
              </a>
              <a href="signup.html" class="flex-1 py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold transition-all shadow-xs flex items-center justify-center space-x-1.5">
                <i class="fa-solid fa-user-plus text-xs"></i>
                <span>Create Account</span>
              </a>
            </div>
          </div>
        `;
      }

      // Append menu directly inside the header container
      const container = header.querySelector('.max-w-7xl') || header;
      container.appendChild(menu);
    }
  },

  bindEvents() {
    // Universal event delegation for toggles
    document.addEventListener('click', (e) => {
      const isAgent = typeof window !== 'undefined' && window.location && window.location.pathname.includes('agent.html');
      const toggleBtnId = isAgent ? 'owner-mobile-nav-toggle' : 'mobile-nav-toggle';
      const menuId = isAgent ? 'owner-mobile-nav-menu' : 'mobile-nav-menu';
      const iconId = isAgent ? 'owner-mobile-nav-toggle-icon' : 'mobile-nav-toggle-icon';

      const toggleBtn = e.target.closest(`#${toggleBtnId}, .mobile-nav-toggle`);
      if (toggleBtn) {
        e.preventDefault();
        this.toggleMenu(menuId, iconId, toggleBtn);
        return;
      }

      // Close when clicking a link inside the mobile menu
      const navLink = e.target.closest(`#${menuId} a`);
      if (navLink) {
        this.closeMenu(menuId, iconId, document.getElementById(toggleBtnId));
        return;
      }

      // Close when clicking outside header
      const menu = document.getElementById(menuId);
      if (menu && !menu.classList.contains('hidden')) {
        const header = document.querySelector('header');
        if (header && !header.contains(e.target)) {
          this.closeMenu(menuId, iconId, document.getElementById(toggleBtnId));
        }
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const isAgent = typeof window !== 'undefined' && window.location && window.location.pathname.includes('agent.html');
        const toggleBtnId = isAgent ? 'owner-mobile-nav-toggle' : 'mobile-nav-toggle';
        const menuId = isAgent ? 'owner-mobile-nav-menu' : 'mobile-nav-menu';
        const iconId = isAgent ? 'owner-mobile-nav-toggle-icon' : 'mobile-nav-toggle-icon';
        this.closeMenu(menuId, iconId, document.getElementById(toggleBtnId));
      }
    });

    // Close on resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        const isAgent = typeof window !== 'undefined' && window.location && window.location.pathname.includes('agent.html');
        const toggleBtnId = isAgent ? 'owner-mobile-nav-toggle' : 'mobile-nav-toggle';
        const menuId = isAgent ? 'owner-mobile-nav-menu' : 'mobile-nav-menu';
        const iconId = isAgent ? 'owner-mobile-nav-toggle-icon' : 'mobile-nav-toggle-icon';
        this.closeMenu(menuId, iconId, document.getElementById(toggleBtnId));
      }
    });
  },

  toggleMenu(menuId, iconId, toggleBtn) {
    const menu = document.getElementById(menuId);
    if (!menu) return;

    const isCurrentlyHidden = menu.classList.contains('hidden');
    if (isCurrentlyHidden) {
      menu.classList.remove('hidden');
      menu.classList.add('mobile-menu-enter');
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
      const icon = document.getElementById(iconId);
      if (icon) {
        icon.className = icon.className.replace('fa-bars', 'fa-xmark');
      }
    } else {
      this.closeMenu(menuId, iconId, toggleBtn);
    }
  },

  closeMenu(menuId, iconId, toggleBtn) {
    const menu = document.getElementById(menuId);
    if (!menu || menu.classList.contains('hidden')) return;

    menu.classList.add('hidden');
    menu.classList.remove('mobile-menu-enter');
    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
    const icon = document.getElementById(iconId);
    if (icon) {
      icon.className = icon.className.replace('fa-xmark', 'fa-bars');
    }
  },

  highlightActivePage() {
    if (typeof window === 'undefined' || !window.location) return;
    const path = window.location.pathname;
    let pageName = path.split('/').pop() || 'index.html';
    if (!pageName || pageName === '') pageName = 'index.html';

    const activeLinks = document.querySelectorAll(`#mobile-nav-menu a[data-page="${pageName}"]`);
    activeLinks.forEach(link => {
      link.className = "mobile-nav-link flex items-center space-x-2.5 p-2.5 rounded-xl font-bold text-xs transition-all bg-sky-600 text-white shadow-xs";
      const iconBox = link.querySelector('div');
      if (iconBox) {
        iconBox.className = "w-7 h-7 rounded-lg bg-white/20 text-white flex items-center justify-center shrink-0";
      }
    });
  }
};

// ==========================================
// 1B. NATIVE-FEEL MOBILE BOTTOM NAVIGATION
// ==========================================
const MobileBottomBar = {
  init() {
    if (typeof document === 'undefined') return;
    if (document.getElementById('mobile-bottom-bar')) return;

    const pathname = window.location ? window.location.pathname : '';
    if (pathname.includes('signup.html')) return; // Minimal onboarding layout for signup

    const isAgent = pathname.includes('agent.html');
    let currentPage = pathname.split('/').pop() || 'index.html';
    if (!currentPage || currentPage === '') currentPage = 'index.html';

    const bar = document.createElement('nav');
    bar.id = 'mobile-bottom-bar';
    bar.setAttribute('aria-label', 'Mobile Quick Navigation');
    bar.className = 'md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0b1324]/95 backdrop-blur-lg border-t border-slate-200/90 dark:border-slate-800 shadow-xl px-2 py-1.5 flex items-center justify-around transition-colors';

    if (isAgent) {
      bar.innerHTML = `
        <a href="#section-kpis" class="mobile-bottom-tab flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:text-amber-500 active:scale-95 transition-all">
          <i class="fa-solid fa-chart-pie text-sm mb-0.5"></i>
          <span class="text-[9px] font-bold">KPIs</span>
        </a>
        <a href="#section-roster" class="mobile-bottom-tab flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:text-amber-500 active:scale-95 transition-all">
          <i class="fa-solid fa-users text-sm mb-0.5"></i>
          <span class="text-[9px] font-bold">Roster</span>
        </a>
        <a href="#section-refunds" class="mobile-bottom-tab flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:text-amber-500 active:scale-95 transition-all">
          <i class="fa-solid fa-vault text-sm mb-0.5"></i>
          <span class="text-[9px] font-bold">Escrow</span>
        </a>
        <a href="#section-companies" class="mobile-bottom-tab flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:text-amber-500 active:scale-95 transition-all">
          <i class="fa-solid fa-city text-sm mb-0.5"></i>
          <span class="text-[9px] font-bold">Units</span>
        </a>
        <a href="index.html" class="mobile-bottom-tab flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:text-amber-500 active:scale-95 transition-all">
          <i class="fa-solid fa-graduation-cap text-sm mb-0.5"></i>
          <span class="text-[9px] font-bold">Student View</span>
        </a>
      `;
    } else {
      const isExploreContext = ['find-home.html', 'tours.html', 'map.html', 'insights.html', 'residents.html', 'chat.html'].includes(currentPage);
      
      if (isExploreContext) {
        bar.innerHTML = `
          <a href="index.html" class="mobile-bottom-tab flex flex-col items-center justify-center py-1 px-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 active:scale-95 transition-all ${currentPage === 'index.html' ? 'active-bottom-tab text-sky-600 dark:text-sky-400 font-extrabold' : ''}" data-page="index.html">
            <i class="fa-solid fa-house text-sm mb-0.5"></i>
            <span class="text-[9px] font-bold">Home</span>
          </a>
          <a href="find-home.html" class="mobile-bottom-tab flex flex-col items-center justify-center py-1 px-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 active:scale-95 transition-all ${currentPage === 'find-home.html' ? 'active-bottom-tab text-sky-600 dark:text-sky-400 font-extrabold' : ''}" data-page="find-home.html">
            <i class="fa-solid fa-magnifying-glass-location text-sm mb-0.5"></i>
            <span class="text-[9px] font-bold">Find Home</span>
          </a>
          <a href="tours.html" class="mobile-bottom-tab flex flex-col items-center justify-center py-1 px-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 active:scale-95 transition-all ${currentPage === 'tours.html' ? 'active-bottom-tab text-sky-600 dark:text-sky-400 font-extrabold' : ''}" data-page="tours.html">
            <i class="fa-solid fa-arrows-spin text-sm mb-0.5"></i>
            <span class="text-[9px] font-bold">360° Tours</span>
          </a>
          <a href="chat.html" class="mobile-bottom-tab flex flex-col items-center justify-center py-1 px-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 active:scale-95 transition-all ${currentPage === 'chat.html' ? 'active-bottom-tab text-sky-600 dark:text-sky-400 font-extrabold' : ''}" data-page="chat.html">
            <i class="fa-regular fa-comment-dots text-sm mb-0.5"></i>
            <span class="text-[9px] font-bold">Peer Chat</span>
          </a>
          <a href="profile.html" class="mobile-bottom-tab flex flex-col items-center justify-center py-1 px-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 active:scale-95 transition-all ${currentPage === 'profile.html' ? 'active-bottom-tab text-sky-600 dark:text-sky-400 font-extrabold' : ''}" data-page="profile.html">
            <i class="fa-solid fa-id-badge text-sm mb-0.5"></i>
            <span class="text-[9px] font-bold">Profile</span>
          </a>
        `;
      } else {
        bar.innerHTML = `
          <a href="index.html" class="mobile-bottom-tab flex flex-col items-center justify-center py-1 px-3 rounded-xl text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 active:scale-95 transition-all ${currentPage === 'index.html' ? 'active-bottom-tab text-sky-600 dark:text-sky-400 font-extrabold' : ''}" data-page="index.html">
            <i class="fa-solid fa-house text-sm mb-0.5"></i>
            <span class="text-[9px] font-bold">Home</span>
          </a>
          <a href="find-home.html" class="mobile-bottom-tab flex flex-col items-center justify-center py-1 px-3 rounded-xl text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 active:scale-95 transition-all ${currentPage === 'find-home.html' ? 'active-bottom-tab text-sky-600 dark:text-sky-400 font-extrabold' : ''}" data-page="find-home.html">
            <i class="fa-solid fa-magnifying-glass-location text-sm mb-0.5"></i>
            <span class="text-[9px] font-bold">Find Home</span>
          </a>
          <a href="about.html" class="mobile-bottom-tab flex flex-col items-center justify-center py-1 px-3 rounded-xl text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 active:scale-95 transition-all ${currentPage === 'about.html' ? 'active-bottom-tab text-sky-600 dark:text-sky-400 font-extrabold' : ''}" data-page="about.html">
            <i class="fa-solid fa-circle-info text-sm mb-0.5"></i>
            <span class="text-[9px] font-bold">About Us</span>
          </a>
          <a href="profile.html" class="mobile-bottom-tab flex flex-col items-center justify-center py-1 px-3 rounded-xl text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 active:scale-95 transition-all ${currentPage === 'profile.html' ? 'active-bottom-tab text-sky-600 dark:text-sky-400 font-extrabold' : ''}" data-page="profile.html">
            <i class="fa-solid fa-id-badge text-sm mb-0.5"></i>
            <span class="text-[9px] font-bold">Profile</span>
          </a>
        `;
      }
    }

    document.body.appendChild(bar);
  }
};

// ==========================================
// 2. AUTH & STUDENT PROFILE STATE ENGINE
// ==========================================
function logoutStudent(e) {
  try {
    // Preserve custom user and registered user accounts in studentstay_users_db
    // Also record the last email so sign-in remembers who logged out
    const currentUser = window.AuthManager ? AuthManager.getCurrentUser() : null;
    if (currentUser && currentUser.email) {
      localStorage.setItem('studentstay_last_email', currentUser.email);
    }
    localStorage.removeItem('studentstay_current_user');
    localStorage.removeItem('studentstay_active_agent');
    localStorage.setItem('studentstay_logged_out', 'true');
  } catch(err) {
    console.error('Storage clear error:', err);
  }

  // Update UI on current page immediately if containers exist
  if (window.AuthManager && typeof AuthManager.renderAuthContainers === 'function') {
    AuthManager.renderAuthContainers();
    AuthManager.updateGreetings();
  }

  // If already on signup page, switch to signin tab directly
  if (typeof window !== 'undefined' && window.location && window.location.pathname && window.location.pathname.endsWith('signup.html')) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    if (typeof switchPortalRole === 'function') switchPortalRole('student');
    if (typeof switchAuthTab === 'function') switchAuthTab('signin');
    return;
  }

  // Navigate immediately to sign in page
  if (typeof window !== 'undefined' && window.location) {
    window.location.href = 'signup.html?mode=signin';
  }
}
if (typeof window !== 'undefined') {
  window.logoutStudent = logoutStudent;
}

const AuthManager = {
  USER_KEY: 'studentstay_current_user',
  BOOKINGS_KEY: 'studentstay_user_bookings',

  sampleUsers: [
    {
      id: 'user-lukas',
      name: 'Lukas Müller',
      email: 'lukas.m@tum.de',
      university: 'Technical University of Munich (TUM)',
      country: 'Germany 🇩🇪',
      countryCode: 'germany',
      destinationCountry: 'germany',
      destinationCountryName: 'Germany 🇩🇪',
      initials: 'LM',
      avatar: 'assets/images/james.jpg',
      course: 'MSc Robotics & Artificial Intelligence',
      intake: 'Oct 2026',
      activeBooking: {
        propertyId: 'tum-olympia-zentrum',
        propertyName: 'TUM Olympia Student Residence - Munich',
        roomType: 'Executive En-suite Studio (22m²)',
        weeklyPriceGBP: 210,
        depositPaidGBP: 150,
        status: 'Secured & Escrow Protected',
        checkIn: '1 October 2026',
        leaseDuration: '51 Weeks (Winter Semester)',
        bookingRef: 'STAY-DE-91024',
        roomNumber: 'Olympia Studio 402, Block B',
        city: 'Munich, Germany',
        airport: 'Munich Franz Josef Strauss (MUC)',
        address: 'Helene-Mayer-Ring 7, 80809 Munich • 6 min walk to TUM'
      }
    },
    {
      id: 'user-ama',
      name: 'Ama Konadu',
      email: 'ama.k@gcu.ac.uk',
      university: 'Glasgow Caledonian University (GCU)',
      country: 'Ghana 🇬🇭',
      countryCode: 'gh',
      destinationCountry: 'uk',
      destinationCountryName: 'United Kingdom 🇬🇧',
      initials: 'AK',
      avatar: 'assets/images/ama.jpg',
      course: 'MSc International Business',
      intake: 'Sept 2026',
      activeBooking: {
        propertyId: 'buchanan-view',
        propertyName: 'Buchanan View - Glasgow City Centre',
        roomType: 'Bronze En-suite Studio (18m²)',
        weeklyPriceGBP: 189,
        depositPaidGBP: 150,
        status: 'Secured & Escrow Protected',
        checkIn: '12 September 2026',
        leaseDuration: '51 Weeks (Full Year)',
        bookingRef: 'STAY-88219-UK',
        roomNumber: 'Flat 304B, Block A',
        city: 'Glasgow, Scotland',
        airport: 'Glasgow Intl (GLA)',
        address: '33 Calgary St, Glasgow G4 0XG • 8 min walk to GCU'
      }
    },
    {
      id: 'user-sarah',
      name: 'Sarah Jenkins',
      email: 's.jenkins@columbia.edu',
      university: 'Columbia University',
      country: 'United States 🇺🇸',
      countryCode: 'usa',
      destinationCountry: 'usa',
      destinationCountryName: 'United States 🇺🇸',
      initials: 'SJ',
      avatar: 'assets/images/meilin.jpg',
      course: 'BA International Relations',
      intake: 'Sept 2026',
      activeBooking: {
        propertyId: 'columbia-morningside-heights',
        propertyName: 'Columbia Morningside Student Suites - New York',
        roomType: 'Private Studio Suite (20m²)',
        weeklyPriceGBP: 275,
        depositPaidGBP: 200,
        status: 'Secured & Escrow Protected',
        checkIn: '1 September 2026',
        leaseDuration: '51 Weeks',
        bookingRef: 'STAY-US-88310',
        roomNumber: 'Morningside Suite 812',
        city: 'New York City, USA',
        airport: 'John F. Kennedy Intl (JFK)',
        address: '540 W 112th St, New York, NY 10025 • 5 min walk to Columbia'
      }
    },
    {
      id: 'user-liam',
      name: 'Liam Tremblay',
      email: 'liam.t@utoronto.ca',
      university: 'University of Toronto (UofT)',
      country: 'Canada 🇨🇦',
      countryCode: 'canada',
      destinationCountry: 'canada',
      destinationCountryName: 'Canada 🇨🇦',
      initials: 'LT',
      avatar: 'assets/images/ravi.jpg',
      course: 'BSc Computer Engineering',
      intake: 'Sept 2026',
      activeBooking: {
        propertyId: 'uoft-stgeorge-studios',
        propertyName: 'UofT St. George Student Lofts - Toronto',
        roomType: 'Premium En-suite Studio (24m²)',
        weeklyPriceGBP: 215,
        depositPaidGBP: 160,
        status: 'Secured & Escrow Protected',
        checkIn: '5 September 2026',
        leaseDuration: '51 Weeks',
        bookingRef: 'STAY-CA-77192',
        roomNumber: 'St George Loft 310',
        city: 'Toronto, Canada',
        airport: 'Toronto Pearson Intl (YYZ)',
        address: '350 Huron St, Toronto, ON M5S 2G5 • 7 min walk to UofT'
      }
    },
    {
      id: 'user-chloe',
      name: 'Chloe Zhang',
      email: 'chloe.z@sydney.edu.au',
      university: 'University of Sydney',
      country: 'Australia 🇦🇺',
      countryCode: 'australia',
      destinationCountry: 'australia',
      destinationCountryName: 'Australia 🇦🇺',
      initials: 'CZ',
      avatar: 'assets/images/ama.jpg',
      course: 'Master of Architecture',
      intake: 'July 2026',
      activeBooking: {
        propertyId: 'usyd-darlington-residence',
        propertyName: 'USYD Darlington Student Suites - Sydney',
        roomType: 'Modern En-suite Studio (21m²)',
        weeklyPriceGBP: 245,
        depositPaidGBP: 180,
        status: 'Secured & Escrow Protected',
        checkIn: '25 July 2026',
        leaseDuration: '51 Weeks',
        bookingRef: 'STAY-AU-66104',
        roomNumber: 'Darlington Suite 205',
        city: 'Sydney, Australia',
        airport: 'Sydney Kingsford Smith (SYD)',
        address: '154 City Rd, Darlington NSW 2008 • 5 min walk to USYD'
      }
    },
    {
      id: 'user-david',
      name: 'David Smith',
      email: 'david.smith@strath.ac.uk',
      university: 'University of Strathclyde',
      country: 'United Kingdom 🇬🇧',
      countryCode: 'uk',
      destinationCountry: 'uk',
      destinationCountryName: 'United Kingdom 🇬🇧',
      initials: 'DS',
      avatar: 'assets/images/james.jpg',
      course: 'BSc Mechanical Engineering',
      intake: 'Sept 2026',
      activeBooking: {
        propertyId: 'merchant-studios',
        propertyName: 'Merchant Studios - Merchant City',
        roomType: 'Silver Studio with Kitchenette',
        weeklyPriceGBP: 215,
        depositPaidGBP: 150,
        status: 'Secured & Escrow Protected',
        checkIn: '19 September 2026',
        leaseDuration: '44 Weeks (Academic Year)',
        bookingRef: 'STAY-90412-UK',
        roomNumber: 'Studio 112, West Wing',
        city: 'Glasgow, Scotland',
        airport: 'Glasgow Intl (GLA)',
        address: '110 Havannah St, Glasgow G4 0UB • 5 min walk to Strathclyde'
      }
    },
    {
      id: 'user-priya',
      name: 'Priya Patel',
      email: 'priya.p@glasgow.ac.uk',
      university: 'University of Glasgow',
      country: 'India 🇮🇳',
      countryCode: 'in',
      destinationCountry: 'uk',
      destinationCountryName: 'United Kingdom 🇬🇧',
      initials: 'PP',
      avatar: 'assets/images/meilin.jpg',
      course: 'MSc Data Analytics',
      intake: 'Sept 2026',
      activeBooking: {
        propertyId: 'riverside-quay',
        propertyName: 'Riverside Quay Student Residence',
        roomType: 'En-suite Bronze Room in 4-Bed Flat',
        weeklyPriceGBP: 175,
        depositPaidGBP: 150,
        status: 'Secured & Escrow Protected',
        checkIn: '12 September 2026',
        leaseDuration: '51 Weeks',
        bookingRef: 'STAY-77341-UK',
        roomNumber: 'Flat 4C, Room 2',
        city: 'Glasgow, Scotland',
        airport: 'Glasgow Intl (GLA)',
        address: 'Clyde St, Glasgow G1 4ER • 12 min subway to UofG'
      }
    },
    {
      id: 'user-chen',
      name: 'Chen Wei',
      email: 'chen.wei@ucl.ac.uk',
      university: 'University College London (UCL)',
      country: 'China 🇨🇳',
      countryCode: 'cn',
      destinationCountry: 'uk',
      destinationCountryName: 'United Kingdom 🇬🇧',
      initials: 'CW',
      avatar: 'assets/images/ravi.jpg',
      course: 'MSc Financial Technology',
      intake: 'Sept 2026',
      activeBooking: {
        propertyId: 'kings-cross-studios',
        propertyName: 'Kings Cross Student Living - London',
        roomType: 'Executive Studio Deluxe',
        weeklyPriceGBP: 320,
        depositPaidGBP: 200,
        status: 'Secured & Escrow Protected',
        checkIn: '20 September 2026',
        leaseDuration: '51 Weeks',
        bookingRef: 'STAY-99214-LDN',
        roomNumber: 'Studio 618',
        city: 'London, England',
        airport: 'London Heathrow (LHR)',
        address: '200 Pentonville Rd, London N1 9JP • 12 min walk to UCL'
      }
    }
  ],

  getUsersDb() {
    try {
      return JSON.parse(localStorage.getItem('studentstay_users_db') || '{}');
    } catch (e) {
      return {};
    }
  },

  saveUserToDb(user) {
    if (!user || !user.email) return;
    const db = this.getUsersDb();
    db[user.email.toLowerCase()] = user;
    localStorage.setItem('studentstay_users_db', JSON.stringify(db));
    localStorage.setItem('studentstay_custom_user', JSON.stringify(user));
    localStorage.setItem('studentstay_last_email', user.email.toLowerCase());
  },

  isLoggedIn() {
    if (localStorage.getItem('studentstay_logged_out') === 'true') {
      return false;
    }
    const hasCustom = !!localStorage.getItem('studentstay_custom_user');
    const hasSaved = !!localStorage.getItem(this.USER_KEY);
    return hasCustom || hasSaved;
  },

  getCurrentUser() {
    if (!this.isLoggedIn()) {
      return null;
    }
    const savedId = localStorage.getItem(this.USER_KEY);

    // 1. Check custom user in localStorage
    const customUserJson = localStorage.getItem('studentstay_custom_user');
    if (customUserJson) {
      try {
        const cu = JSON.parse(customUserJson);
        if (!savedId || cu.id === savedId) {
          return cu;
        }
      } catch (e) {}
    }

    // 2. Check usersDb
    const db = this.getUsersDb();
    if (savedId) {
      const fromDb = Object.values(db).find(u => u.id === savedId);
      if (fromDb) return fromDb;
    }

    // 3. Check sample users
    if (savedId) {
      const sample = this.sampleUsers.find(u => u.id === savedId);
      if (sample) return sample;
    }

    // 4. Check if any user in db matches last email
    const lastEmail = localStorage.getItem('studentstay_last_email');
    if (lastEmail && db[lastEmail.toLowerCase()]) {
      return db[lastEmail.toLowerCase()];
    }

    // 5. Fallback custom user if available
    if (customUserJson) {
      try { return JSON.parse(customUserJson); } catch (e) {}
    }

    return this.sampleUsers[0];
  },

  getSafeUser() {
    return this.getCurrentUser() || this.sampleUsers[0];
  },

  setCurrentUser(userId) {
    let user = this.sampleUsers.find(u => u.id === userId);
    if (!user) {
      try {
        const cu = JSON.parse(localStorage.getItem('studentstay_custom_user') || 'null');
        if (cu && cu.id === userId) user = cu;
      } catch (e) {}
    }
    if (!user) {
      const db = this.getUsersDb();
      user = Object.values(db).find(u => u.id === userId);
    }

    if (user) {
      localStorage.removeItem('studentstay_logged_out');
      localStorage.setItem(this.USER_KEY, user.id);
      if (user.email) {
        localStorage.setItem('studentstay_last_email', user.email.toLowerCase());
      }
      if (!this.sampleUsers.some(su => su.id === user.id)) {
        localStorage.setItem('studentstay_custom_user', JSON.stringify(user));
      }

      const destCountry = user.destinationCountry || user.countryCode || 'uk';
      localStorage.setItem('studentstay_active_country', destCountry);
      localStorage.setItem('studentstay_active_university', user.university || 'Glasgow Caledonian University (GCU)');

      // Auto switch currency to match country
      if (destCountry === 'germany') CurrencyManager.setCurrency('EUR');
      else if (destCountry === 'usa' || destCountry === 'canada' || destCountry === 'australia') CurrencyManager.setCurrency('USD');
      else CurrencyManager.setCurrency('GBP');

      if (window.IntakeAnnouncementManager) {
        IntakeAnnouncementManager.update(destCountry);
      }
      if (window.HomepageCountryManager) {
        HomepageCountryManager.switchCountry(destCountry);
      }
      if (window.HomeSearchManager) {
        HomeSearchManager.syncToCountry(destCountry, user.university);
      }
      this.renderAuthContainers();
      this.updateGreetings();
      if (typeof renderProfilePage === 'function') {
        renderProfilePage();
      }
    }
  },

  logout(e) {
    logoutStudent(e);
  },

  getTimeGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  },

  updateGreetings() {
    const user = this.getCurrentUser();
    const timeGreeting = this.getTimeGreeting();

    // Homepage hero personalized greeting
    const heroGreeting = document.getElementById('hero-user-greeting');
    if (heroGreeting) {
      if (user) {
        heroGreeting.innerHTML = `
          <span class="inline-flex items-center px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-500/20 text-sky-800 dark:text-sky-200 border border-sky-300 dark:border-sky-400/30 text-xs font-semibold backdrop-blur-md mb-2">
            <i class="fa-solid fa-sparkles mr-1.5 text-amber-500 dark:text-amber-300"></i> ${timeGreeting}, ${user.name.split(' ')[0]}!
          </span>
          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-4 brand-font">
            Find & Tour Your <span class="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-sky-400 dark:from-sky-400 dark:to-cyan-200">Dream Student Home</span>
          </h1>
          <p class="text-base sm:text-lg text-slate-600 dark:text-slate-200 max-w-2xl mx-auto drop-shadow-xs leading-relaxed mb-6 font-medium">
            How can we help you today, <strong class="text-slate-900 dark:text-white">${user.name}</strong>? Explore 100% physically inspected student residences with 360° virtual tours, verified commutes to <em class="text-sky-600 dark:text-sky-300 font-semibold">${user.university}</em>, and zero scam risk guarantee.
          </p>
        `;
      } else {
        heroGreeting.innerHTML = `
          <span class="inline-flex items-center px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-500/20 text-sky-800 dark:text-sky-200 border border-sky-300 dark:border-sky-400/30 text-xs font-semibold backdrop-blur-md mb-2">
            <i class="fa-solid fa-shield-halved mr-1.5 text-emerald-600 dark:text-emerald-400"></i> 100% Verified International Student Accommodation
          </span>
          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-4 brand-font">
            Find & Tour Your <span class="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-sky-400 dark:from-sky-400 dark:to-cyan-200">Dream Student Home</span>
          </h1>
          <p class="text-base sm:text-lg text-slate-600 dark:text-slate-200 max-w-2xl mx-auto drop-shadow-xs leading-relaxed mb-6 font-medium">
            Zero scam risk, physical inspections, and verified campus commutes across the UK, Germany, USA, Canada & Australia. Inspect rooms in 360° and lock in safe escrow before landing.
          </p>
        `;
      }
    }

    // Top greeting badge
    const topGreeting = document.getElementById('nav-user-greeting-text');
    if (topGreeting) {
      topGreeting.textContent = user ? `${timeGreeting}, ${user.name.split(' ')[0]}` : 'Welcome to StudentStay';
    }
  },

  renderAuthContainers() {
    const isLogged = this.isLoggedIn();
    const user = this.getCurrentUser();
    const containers = document.querySelectorAll('.auth-container');

    containers.forEach(container => {
      if (isLogged && user) {
        // SIGNED IN STATE: Avatar + Profile Dropdown + Working Sign Out Button
        container.innerHTML = `
          <div class="flex items-center space-x-1.5 sm:space-x-2">
            <!-- User Profile Dropdown Pill -->
            <div class="relative group">
              <button type="button" class="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold transition-all cursor-pointer">
                <div class="w-6 h-6 rounded-full overflow-hidden bg-sky-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 border border-white/40 shadow-xs">
                  ${user.avatar ? `<img src="${user.avatar}" alt="${user.name}" class="w-full h-full object-cover" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">` : ''}
                  <span class="${user.avatar ? 'hidden' : 'block'}">${user.initials || 'ST'}</span>
                </div>
                <span class="text-slate-800 dark:text-slate-200 font-bold hidden md:inline truncate max-w-[90px]">${user.name.split(' ')[0]}</span>
                <i class="fa-solid fa-chevron-down text-[10px] text-slate-400"></i>
              </button>

              <!-- Dropdown Menu -->
              <div class="absolute right-0 mt-1.5 w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 px-1 hidden group-hover:block hover:block z-50">
                <div class="px-3 py-2 border-b border-slate-100 dark:border-slate-700/60 mb-1">
                  <div class="font-bold text-xs text-slate-900 dark:text-slate-100">${user.name}</div>
                  <div class="text-[11px] text-slate-500 dark:text-slate-400 truncate">${user.university}</div>
                  <div class="text-[10px] text-sky-600 dark:text-sky-400 font-semibold mt-0.5">${user.country} • ${user.course}</div>
                </div>

                <a href="profile.html" class="flex items-center px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-slate-700 rounded-xl transition-colors">
                  <i class="fa-solid fa-id-badge w-5 text-sky-600"></i> My Student Profile & Room
                </a>
                <a href="find-home.html" class="flex items-center px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-slate-700 rounded-xl transition-colors">
                  <i class="fa-solid fa-magnifying-glass-location w-5 text-sky-600"></i> Find Your New Home
                </a>
                <a href="tours.html" class="flex items-center px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-slate-700 rounded-xl transition-colors">
                  <i class="fa-solid fa-arrows-spin w-5 text-sky-600"></i> 360° Virtual Tours
                </a>
                <a href="about.html" class="flex items-center px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-slate-700 rounded-xl transition-colors">
                  <i class="fa-solid fa-circle-info w-5 text-sky-600"></i> About StudentStay
                </a>

                <!-- Account Actions -->
                <div class="border-t border-slate-100 dark:border-slate-700/60 my-1 pt-2 px-3 space-y-1">
                  <a href="signup.html?mode=signup" class="flex items-center text-[11px] font-bold text-sky-600 dark:text-sky-400 hover:underline py-1">
                    <i class="fa-solid fa-user-plus w-4 text-[10px]"></i> Create New Student Account
                  </a>
                  <a href="signup.html?mode=signin" onclick="logoutStudent(event)" class="w-full text-left flex items-center text-[11px] font-semibold text-rose-600 dark:text-rose-400 hover:underline py-1 cursor-pointer">
                    <i class="fa-solid fa-arrow-right-from-bracket w-4 text-[10px]"></i> Sign Out
                  </a>
                </div>
              </div>
            </div>

            <!-- DIRECTLY VISIBLE SIGN OUT BUTTON (AN HTML <a> LINK TO GUARANTEE 100% IMMEDIATE REDIRECTION) -->
            <a href="signup.html?mode=signin" onclick="logoutStudent(event)" class="sign-out-global-btn inline-flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/70 text-rose-600 dark:text-rose-400 text-xs font-bold transition-all cursor-pointer shadow-xs hover:shadow-sm group shrink-0" title="Sign out of student account">
              <i class="fa-solid fa-arrow-right-from-bracket text-[11px] group-hover:translate-x-0.5 transition-transform pointer-events-none"></i>
              <span class="pointer-events-none">Sign Out</span>
            </a>
          </div>
        `;
      } else {
        // SIGNED OUT / GUEST STATE: Clean, Prominent Create Account & Sign In Buttons
        container.innerHTML = `
          <div class="flex items-center space-x-1.5 sm:space-x-2">
            <a href="signup.html?mode=signup" class="inline-flex items-center space-x-1 sm:space-x-1.5 px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-all shadow-xs shadow-sky-600/25 shrink-0">
              <i class="fa-solid fa-user-plus text-[11px]"></i>
              <span>Create Account</span>
            </a>
            <a href="signup.html?mode=signin" class="inline-flex items-center space-x-1 sm:space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs font-bold transition-all shadow-xs shrink-0">
              <i class="fa-solid fa-arrow-right-to-bracket text-[11px] text-sky-600"></i>
              <span>Sign In</span>
            </a>
          </div>
        `;
      }
    });
  }
};

// ==========================================
// 3. MULTI-CURRENCY CONVERSION ENGINE
// ==========================================
const CurrencyManager = {
  CURRENCY_KEY: 'studentstay_currency',

  currencies: {
    GBP: { symbol: '£', rate: 1.0, label: '£ GBP', code: 'GBP' },
    USD: { symbol: '$', rate: 1.28, label: '$ USD', code: 'USD' },
    EUR: { symbol: '€', rate: 1.17, label: '€ EUR', code: 'EUR' },
    NGN: { symbol: '₦', rate: 2050, label: '₦ NGN', code: 'NGN' },
    INR: { symbol: '₹', rate: 107.5, label: '₹ INR', code: 'INR' },
    CNY: { symbol: '¥', rate: 9.25, label: '¥ CNY', code: 'CNY' }
  },

  getCurrentCurrency() {
    return localStorage.getItem(this.CURRENCY_KEY) || 'GBP';
  },

  setCurrency(currCode) {
    if (this.currencies[currCode]) {
      localStorage.setItem(this.CURRENCY_KEY, currCode);
      this.syncSelectInputs(currCode);
      this.updateAllPricesOnPage();
    }
  },

  init() {
    const current = this.getCurrentCurrency();
    this.syncSelectInputs(current);

    document.querySelectorAll('#currency-selector, .currency-select-input').forEach(select => {
      select.value = current;
      select.addEventListener('change', (e) => {
        this.setCurrency(e.target.value);
      });
    });

    this.updateAllPricesOnPage();
  },

  syncSelectInputs(currCode) {
    document.querySelectorAll('#currency-selector, .currency-select-input').forEach(select => {
      select.value = currCode;
    });
  },

  format(amountGBP) {
    const currCode = this.getCurrentCurrency();
    const curr = this.currencies[currCode] || this.currencies.GBP;
    const converted = amountGBP * curr.rate;

    if (currCode === 'NGN' || currCode === 'INR') {
      return `${curr.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${curr.symbol}${Math.round(converted).toLocaleString()}`;
  },

  updateAllPricesOnPage() {
    document.querySelectorAll('[data-price-gbp]').forEach(el => {
      const gbp = parseFloat(el.getAttribute('data-price-gbp'));
      if (!isNaN(gbp)) {
        const period = el.getAttribute('data-price-period') || '';
        el.textContent = `${this.format(gbp)} ${period}`.trim();
      }
    });
  }
};

// ==========================================
// 4. FULL-SECTION HERO CAROUSEL ENGINE
// ==========================================
const HeroCarousel = {
  slides: [
    {
      image: 'assets/images/diverse_students.jpg',
      badge: '🌍 Global International Student Housing',
      title: 'Find & Tour Your Verified Student Home',
      highlight: 'With 100% Peace of Mind',
      description: 'Zero scam risk, physical inspections, and verified campus commutes. Join thousands of international students from Ghana, Nigeria, India, China, the US, and Europe.',
      ctaText: 'Find Your New Home',
      ctaLink: 'find-home.html',
      secondaryText: 'Take 360° Virtual Tour',
      secondaryLink: 'tours.html'
    },
    {
      image: 'assets/images/buchanan_view.jpg',
      badge: '🎥 High-Definition Virtual Inspections',
      title: 'Walk Through Real Studios In 360°',
      highlight: 'Before Paying a Single Penny',
      description: 'Rotate 360°, inspect the study desk, en-suite bathroom, high-speed Wi-Fi point, and heating from your home country before booking.',
      ctaText: 'Explore 360° Virtual Tours',
      ctaLink: 'tours.html',
      secondaryText: 'Browse Rooms & Prices',
      secondaryLink: 'find-home.html'
    },
    {
      image: 'assets/images/merchant_studios.jpg',
      badge: '🛡️ 100% Safe Escrow Guarantee',
      title: 'Zero Scam Risk & Escrow Protection',
      highlight: 'No Visa, No Pay Guarantee',
      description: 'Your holding deposit is held safely in licensed escrow. If your UK visa is delayed or denied, 100% is refunded within 48 hours without fees.',
      ctaText: 'Learn About Our Guarantees',
      ctaLink: 'about.html',
      secondaryText: 'View Verified Homes',
      secondaryLink: 'find-home.html'
    },
    {
      image: 'assets/images/student_lounge.jpg',
      badge: '💬 Verified Peer Community',
      title: 'Chat Directly With Current Residents',
      highlight: 'Real Advice From Real Students',
      description: 'Connect with current student ambassadors living on-site. Ask about winter heating, walking shortcuts to campus, and local supermarkets.',
      ctaText: 'Ask Current Residents',
      ctaLink: 'residents.html',
      secondaryText: 'Start Live Peer Chat',
      secondaryLink: 'chat.html'
    }
  ],

  currentIndex: 0,
  intervalId: null,
  intervalDuration: 5500,

  init() {
    const container = document.getElementById('hero-carousel');
    if (!container) return;

    this.render();
    this.startAutoPlay();

    // Pause on hover
    container.addEventListener('mouseenter', () => this.stopAutoPlay());
    container.addEventListener('mouseleave', () => this.startAutoPlay());
  },

  render() {
    const container = document.getElementById('hero-carousel');
    if (!container) return;

    container.innerHTML = `
      <div class="hero-carousel-container relative w-full h-[600px] sm:h-[660px] overflow-hidden rounded-3xl shadow-2xl border border-slate-200/40 dark:border-slate-800">
        <!-- Slides -->
        <div id="carousel-slides-wrapper" class="relative w-full h-full">
          ${this.slides.map((s, idx) => `
            <div class="carousel-slide absolute inset-0 ${idx === 0 ? 'active' : ''}" data-slide-index="${idx}">
              <div class="carousel-slide-bg" style="background-image: url('${s.image}');"></div>
              <div class="carousel-overlay"></div>
              
              <div class="relative z-20 h-full max-w-7xl mx-auto px-6 sm:px-10 flex flex-col justify-center items-center text-center">
                <div class="inline-flex items-center px-4 py-1.5 rounded-full bg-white/15 dark:bg-slate-900/60 backdrop-blur-md text-sky-200 border border-white/20 text-xs font-semibold mb-4 shadow-sm">
                  ${s.badge}
                </div>
                
                <h2 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl brand-font drop-shadow-md mb-4">
                  ${s.title} <br class="hidden sm:inline">
                  <span class="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-cyan-200 to-amber-200">${s.highlight}</span>
                </h2>
                
                <p class="text-slate-200 text-sm sm:text-base lg:text-lg max-w-2xl font-normal leading-relaxed drop-shadow mb-8">
                  ${s.description}
                </p>

                <div class="flex flex-wrap items-center justify-center gap-3">
                  <a href="${s.ctaLink}" class="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-bold text-sm shadow-lg shadow-sky-600/30 hover:scale-105 transition-all flex items-center">
                    <i class="fa-solid fa-magnifying-glass-location mr-2"></i> ${s.ctaText}
                  </a>
                  <a href="${s.secondaryLink}" class="px-6 py-3.5 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold text-sm border border-white/30 hover:scale-105 transition-all flex items-center">
                    <i class="fa-solid fa-play mr-2 text-xs"></i> ${s.secondaryText}
                  </a>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Controls: Prev / Next Buttons -->
        <button onclick="HeroCarousel.prev()" class="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-slate-900/60 hover:bg-sky-600 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-lg" aria-label="Previous Slide">
          <i class="fa-solid fa-chevron-left text-sm"></i>
        </button>
        <button onclick="HeroCarousel.next()" class="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-slate-900/60 hover:bg-sky-600 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-lg" aria-label="Next Slide">
          <i class="fa-solid fa-chevron-right text-sm"></i>
        </button>

        <!-- Slide Indicators -->
        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2.5">
          ${this.slides.map((_, idx) => `
            <button onclick="HeroCarousel.goTo(${idx})" class="carousel-dot h-2.5 rounded-full transition-all cursor-pointer ${idx === 0 ? 'w-8 bg-sky-400' : 'w-2.5 bg-white/40 hover:bg-white/70'}" aria-label="Go to slide ${idx + 1}"></button>
          `).join('')}
        </div>
      </div>
    `;
  },

  goTo(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    if (!slides.length) return;

    this.currentIndex = (index + this.slides.length) % this.slides.length;

    slides.forEach((s, idx) => {
      s.classList.toggle('active', idx === this.currentIndex);
    });

    dots.forEach((dot, idx) => {
      if (idx === this.currentIndex) {
        dot.className = 'carousel-dot h-2.5 w-8 bg-sky-400 rounded-full transition-all cursor-pointer';
      } else {
        dot.className = 'carousel-dot h-2.5 w-2.5 bg-white/40 hover:bg-white/70 rounded-full transition-all cursor-pointer';
      }
    });
  },

  next() {
    this.goTo(this.currentIndex + 1);
  },

  prev() {
    this.goTo(this.currentIndex - 1);
  },

  startAutoPlay() {
    this.stopAutoPlay();
    this.intervalId = setInterval(() => {
      this.next();
    }, this.intervalDuration);
  },

  stopAutoPlay() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
};

// ==========================================
// 5. ESCROW RESERVATION MODAL ENGINE
// ==========================================
let currentBookingStep = 1;
let selectedBookingProperty = null;

function ensureBookingModalExists() {
  let modal = document.getElementById('modal-booking-escrow');
  if (modal) return modal;

  modal = document.createElement('div');
  modal.id = 'modal-booking-escrow';
  modal.className = 'fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 hidden';
  modal.innerHTML = `
    <div class="bg-white dark:bg-[#0f1a30] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
      <div class="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/60 dark:bg-slate-900/60">
        <div>
          <div class="flex items-center space-x-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h3 id="booking-property-title" class="text-base font-extrabold text-slate-900 dark:text-slate-100 brand-font">
              Buchanan View - Bronze En-suite
            </h3>
          </div>
          <p id="booking-property-subtitle" class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Bronze Studio • £189 / week
          </p>
        </div>
        <button onclick="closeBookingModal()" class="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center cursor-pointer transition-colors">
          ✕
        </button>
      </div>

      <div class="px-6 py-3 bg-slate-100/60 dark:bg-slate-850 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-500">
        <div class="flex items-center space-x-2">
          <div id="step-indicator-1" class="w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center text-xs">1</div>
          <span>Room & Dates</span>
        </div>
        <div class="flex items-center space-x-2">
          <div id="step-indicator-2" class="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 flex items-center justify-center text-xs">2</div>
          <span>Student Info</span>
        </div>
        <div class="flex items-center space-x-2">
          <div id="step-indicator-3" class="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 flex items-center justify-center text-xs">3</div>
          <span>Escrow Protection</span>
        </div>
      </div>

      <div class="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
        <div id="booking-step-1" class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Select Tenancy Length</label>
            <select class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-800 dark:text-slate-100 font-medium">
              <option>51 Weeks (Full Academic Year & Summer)</option>
              <option>44 Weeks (Standard Academic Year)</option>
              <option>Semester 1 Only (Autumn Intake)</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Check-in Date</label>
            <select class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-800 dark:text-slate-100 font-medium">
              <option>Saturday, 12 September 2026</option>
              <option>Saturday, 19 September 2026</option>
              <option>Saturday, 26 September 2026</option>
            </select>
          </div>
          <div class="p-3 bg-sky-50 dark:bg-sky-950/40 rounded-xl border border-sky-200 dark:border-sky-800 text-xs text-sky-800 dark:text-sky-300">
            <i class="fa-solid fa-plane-arrival mr-1.5"></i> Free airport welcome shuttle & zero cancellation fee with 100% Visa Guarantee.
          </div>
        </div>

        <div id="booking-step-2" class="space-y-4 hidden">
          <div>
            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Full Legal Name</label>
            <input type="text" id="booking-student-name" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-800 dark:text-slate-100 font-medium">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Enrolled University & Course</label>
            <input type="text" id="booking-student-uni" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-800 dark:text-slate-100 font-medium">
          </div>
          <div class="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400">
            <i class="fa-solid fa-graduation-cap text-sky-600 mr-1.5"></i> Room reservation exclusively for verified university students.
          </div>
        </div>

        <div id="booking-step-3" class="space-y-4 hidden">
          <div class="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-4 space-y-2">
            <div class="flex items-center text-emerald-800 dark:text-emerald-300 text-xs font-bold">
              <i class="fa-solid fa-shield-halved text-emerald-600 mr-2 text-base"></i> 100% Refundable Escrow Guarantee
            </div>
            <p class="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
              Your holding deposit secures this room exclusively. If your student visa is delayed or denied, 100% is refunded within 48 hours without fee.
            </p>
          </div>
          <div class="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
            <div class="flex justify-between">
              <span class="text-slate-600 dark:text-slate-400">Weekly Rent:</span>
              <span id="booking-summary-rent" class="font-bold text-slate-900 dark:text-slate-100">£189 / wk (All Bills Included)</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-600 dark:text-slate-400">Holding Deposit Due Today:</span>
              <span id="booking-summary-deposit" class="font-extrabold text-sky-600 dark:text-sky-400 text-sm">£150.00</span>
            </div>
          </div>
        </div>
      </div>

      <div class="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <button onclick="prevBookingStep()" class="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer">
          Back
        </button>
        <div class="space-x-2">
          <button onclick="nextBookingStep()" id="btn-booking-next" class="px-5 py-2.5 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-xl shadow-xs transition-all cursor-pointer">
            Continue →
          </button>
          <button onclick="completeBooking()" id="btn-booking-submit" class="hidden px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-all cursor-pointer">
            Lock Room in Escrow
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  return modal;
}

function openBookingModal(propertyId) {
  const modal = ensureBookingModalExists();

  let property = null;
  if (propertyId && window.APP_DATA && APP_DATA.getProperty) {
    property = APP_DATA.getProperty(propertyId);
  }
  if (!property && propertyId && window.APP_DATA && APP_DATA.properties) {
    property = APP_DATA.properties.find(p => p.id === propertyId);
  }
  if (!property) {
    const user = window.AuthManager ? AuthManager.getCurrentUser() : null;
    const country = (user && (user.destinationCountry || user.countryCode)) || localStorage.getItem('studentstay_active_country') || 'uk';
    const flagships = {
      germany: 'tum-olympia-zentrum',
      usa: 'columbia-morningside-heights',
      canada: 'uoft-stgeorge-studios',
      australia: 'usyd-darlington-residence',
      uk: 'buchanan-view'
    };
    const propId = flagships[country] || 'buchanan-view';
    property = (window.APP_DATA && APP_DATA.getProperty) ? APP_DATA.getProperty(propId) : (window.APP_DATA && APP_DATA.properties ? APP_DATA.properties[0] : null);
  }
  if (!property) {
    property = {
      id: 'buchanan-view',
      title: 'Buchanan View - Glasgow City Centre',
      roomType: 'Bronze En-suite Studio (18m²)',
      pricePerWeekGBP: 189,
      depositGBP: 150
    };
  }

  selectedBookingProperty = property;
  currentBookingStep = 1;

  const titleEl = document.getElementById('booking-property-title');
  if (titleEl) titleEl.textContent = property.title;

  const subtitleEl = document.getElementById('booking-property-subtitle');
  if (subtitleEl) subtitleEl.textContent = `${property.roomType || 'Verified Studio Suite'} • ${CurrencyManager.format(property.pricePerWeekGBP || property.priceGBP || 189)} / wk`;

  // Pre-fill user data
  const user = AuthManager.getCurrentUser();
  const nameInput = document.getElementById('booking-student-name');
  if (nameInput) nameInput.value = user.name || '';

  const uniInput = document.getElementById('booking-student-uni');
  if (uniInput) uniInput.value = user.university || '';

  updateBookingStepView();
  modal.classList.remove('hidden');
}

function closeBookingModal() {
  const modal = document.getElementById('modal-booking-escrow');
  if (modal) modal.classList.add('hidden');
}

function nextBookingStep() {
  if (currentBookingStep < 3) {
    currentBookingStep++;
    updateBookingStepView();
  }
}

function prevBookingStep() {
  if (currentBookingStep > 1) {
    currentBookingStep--;
    updateBookingStepView();
  }
}

function updateBookingStepView() {
  for (let i = 1; i <= 3; i++) {
    const stepEl = document.getElementById(`booking-step-${i}`);
    if (stepEl) stepEl.classList.toggle('hidden', i !== currentBookingStep);

    const indicator = document.getElementById(`step-indicator-${i}`);
    if (indicator) {
      if (i === currentBookingStep) {
        indicator.className = 'w-7 h-7 rounded-full bg-sky-600 text-white font-bold flex items-center justify-center shadow-md';
      } else if (i < currentBookingStep) {
        indicator.className = 'w-7 h-7 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center';
        indicator.innerHTML = '<i class="fa-solid fa-check text-xs"></i>';
      } else {
        indicator.className = 'w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 font-bold flex items-center justify-center';
        indicator.textContent = i;
      }
    }
  }

  const btnNext = document.getElementById('btn-booking-next');
  const btnSubmit = document.getElementById('btn-booking-submit');
  if (btnNext && btnSubmit) {
    if (currentBookingStep === 3) {
      btnNext.classList.add('hidden');
      btnSubmit.classList.remove('hidden');
    } else {
      btnNext.classList.remove('hidden');
      btnSubmit.classList.add('hidden');
    }
  }

  // Update step 3 prices with currency
  const depositEl = document.getElementById('booking-summary-deposit');
  if (depositEl && selectedBookingProperty) {
    depositEl.textContent = CurrencyManager.format(selectedBookingProperty.depositGBP || 150);
  }
  const rentEl = document.getElementById('booking-summary-rent');
  if (rentEl && selectedBookingProperty) {
    rentEl.textContent = `${CurrencyManager.format(selectedBookingProperty.pricePerWeekGBP)} / wk`;
  }
}

function completeBooking() {
  const user = AuthManager.getCurrentUser();
  const randomRef = 'STAY-' + Math.floor(10000 + Math.random() * 90000) + '-SEC';

  // Save updated booking to user
  if (selectedBookingProperty) {
    const bookingDetails = {
      propertyId: selectedBookingProperty.id,
      propertyName: selectedBookingProperty.title,
      roomType: selectedBookingProperty.roomType || 'Verified Studio Suite',
      weeklyPriceGBP: selectedBookingProperty.pricePerWeekGBP || 189,
      depositPaidGBP: selectedBookingProperty.depositGBP || 150,
      status: 'Secured & Escrow Protected',
      checkIn: '12 September 2026',
      leaseDuration: '51 Weeks (Full Year)',
      bookingRef: randomRef,
      roomNumber: 'Suite ' + Math.floor(100 + Math.random() * 400),
      city: selectedBookingProperty.city || 'Glasgow, Scotland'
    };
    user.activeBooking = bookingDetails;
    localStorage.setItem(AuthManager.USER_KEY, user.id);

    const customUserJson = localStorage.getItem('studentstay_custom_user');
    if (customUserJson) {
      try {
        const customUser = JSON.parse(customUserJson);
        customUser.activeBooking = bookingDetails;
        localStorage.setItem('studentstay_custom_user', JSON.stringify(customUser));
      } catch (e) {}
    }
  }

  closeBookingModal();

  if (typeof renderProfilePage === 'function') {
    renderProfilePage();
  }

  // Show Sweet alert style modal or toast
  const alertBox = document.createElement('div');
  alertBox.className = 'fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4';
  alertBox.innerHTML = `
    <div class="bg-white dark:bg-slate-800 rounded-3xl max-w-md w-full p-6 text-center shadow-2xl border border-emerald-500/30">
      <div class="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4 text-2xl shadow-inner">
        <i class="fa-solid fa-shield-check"></i>
      </div>
      <h3 class="text-xl font-extrabold text-slate-900 dark:text-slate-100 brand-font mb-2">Room Reserved & Protected!</h3>
      <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
        Congratulations <strong>${user.name}</strong>! Your holding deposit of <strong>${CurrencyManager.format(selectedBookingProperty ? selectedBookingProperty.depositGBP : 150)}</strong> is safely locked in our licensed escrow account. Reference: <span class="font-mono font-bold text-sky-600">${randomRef}</span>.
      </p>
      <div class="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-3 text-xs text-emerald-800 dark:text-emerald-300 mb-5">
        <i class="fa-solid fa-circle-check mr-1.5"></i> 100% Visa Refund Guarantee active. Your room is exclusively held for 14 days.
      </div>
      <div class="flex space-x-2">
        <a href="profile.html" class="flex-1 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-sm transition-all">
          View in Student Profile
        </a>
        <button onclick="this.closest('.fixed').remove()" class="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 transition-all">
          Close
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(alertBox);
}

// ==========================================
// 6. 360° TOUR VIEWER ENGINE (TRUE 360° SPHERICAL ROTATION)
// ==========================================
let pannellumViewerInstance = null;
let currentTourProperty = null;
let isTourAutoRotating = false;
let tourRotateInterval = null;
let fallbackScrollX = 0;

function init360TourEngine() {
  const propertySelect = document.getElementById('tour-property-selector');
  if (propertySelect && window.APP_DATA && APP_DATA.properties) {
    propertySelect.innerHTML = APP_DATA.properties.map(p => `
      <option value="${p.id}">${p.title} (${p.countryCode ? p.countryCode.toUpperCase() : 'UK'})</option>
    `).join('');
  }

  const urlParams = new URLSearchParams(window.location.search);
  let propId = urlParams.get('property');
  if (!propId) {
    const savedCountry = localStorage.getItem('studentstay_active_country');
    const user = window.AuthManager ? AuthManager.getCurrentUser() : null;
    const activeCountry = savedCountry || (user && (user.destinationCountry || user.countryCode)) || 'uk';
    const flagships = {
      germany: 'tum-olympia-zentrum',
      usa: 'columbia-morningside-heights',
      canada: 'uoft-stgeorge-studios',
      australia: 'usyd-darlington-residence',
      uk: 'buchanan-view'
    };
    propId = flagships[activeCountry] || 'buchanan-view';
  }
  changeTourProperty(propId);
}

function changeTourProperty(propertyId) {
  const property = (window.APP_DATA && APP_DATA.getProperty) 
    ? APP_DATA.getProperty(propertyId)
    : (window.APP_DATA && APP_DATA.properties 
        ? (APP_DATA.properties.find(p => p.id === propertyId) || APP_DATA.properties[0])
        : null);

  if (!property) return;
  currentTourProperty = property;

  const selector = document.getElementById('tour-property-selector');
  if (selector) selector.value = property.id;

  const titleEl = document.getElementById('tour-property-title');
  if (titleEl) titleEl.textContent = `${property.title} — 360° Tour`;

  const subEl = document.getElementById('tour-property-sub');
  if (subEl) subEl.textContent = `${property.roomType} • ${property.address} • ${property.commutes ? property.commutes[0].time : 'Near Campus'}`;

  const pricePill = document.getElementById('tour-property-price-pill');
  if (pricePill) pricePill.textContent = `${CurrencyManager.format(property.pricePerWeekGBP)} / week (Bills Included)`;

  const locationBadge = document.getElementById('tour-nav-location');
  if (locationBadge) locationBadge.textContent = `${property.title.split('-')[0].trim()}, ${property.city}`;

  const angleContainer = document.getElementById('tour-angle-buttons-container');
  if (angleContainer && property.tourData && property.tourData.angles) {
    angleContainer.innerHTML = property.tourData.angles.map((a, idx) => `
      <button onclick="openAnglePreset('${a.id}')" id="angle-btn-${a.id}" class="angle-preset-pill px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center ${idx === 0 ? 'bg-sky-600 text-white shadow-xs' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-sky-600'}">
        <i class="fa-solid ${a.icon} mr-1.5"></i> ${a.shortName}
      </button>
    `).join('');
  }

  const scenesBar = document.getElementById('tour-scenes-bar');
  if (scenesBar && property.tourData && property.tourData.scenes) {
    scenesBar.innerHTML = property.tourData.scenes.map((s, idx) => `
      <button onclick="switchTourScene('${s.image}', ${s.isPano})" class="tour-scene-tab px-3 py-1.5 rounded-lg font-bold text-xs flex items-center shrink-0 cursor-pointer ${idx === 0 ? 'bg-sky-600 text-white' : 'text-slate-700 dark:text-slate-300 hover:text-sky-600'}">
        <i class="fa-solid ${s.icon} mr-1.5"></i> ${s.name}
      </button>
    `).join('');
  }

  // Load spherical 360 view
  const panoUrl = (property.tourData && property.tourData.panoImage) ? property.tourData.panoImage : 'assets/images/buchanan_360_panorama.jpg';
  loadSphericalPanorama(panoUrl, property);

  // Update Book Room and Chat with Resident buttons
  const bookBtn = document.getElementById('tour-book-btn');
  if (bookBtn) {
    bookBtn.setAttribute('onclick', `openBookingModal('${property.id}')`);
  }
  const chatBtn = document.getElementById('tour-resident-chat-btn');
  if (chatBtn) {
    chatBtn.href = `chat.html?resident=${property.residentId || property.featuredResidentId || 'ama-k'}`;
  }

  // Record view in Student Taste Engine
  if (window.StudentTasteEngine) {
    StudentTasteEngine.recordView(property);
  }
}

function loadSphericalPanorama(panoUrl, property) {
  const stage = document.getElementById('pannellum-stage');
  const fallbackStage = document.getElementById('custom-pano-stage');

  if (window.pannellum && stage) {
    try {
      if (pannellumViewerInstance) {
        pannellumViewerInstance.destroy();
        pannellumViewerInstance = null;
      }
      stage.style.display = 'block';
      if (fallbackStage) fallbackStage.style.display = 'none';

      pannellumViewerInstance = pannellum.viewer('pannellum-stage', {
        type: 'equirectangular',
        panorama: panoUrl,
        autoLoad: true,
        autoRotate: isTourAutoRotating ? -2 : 0,
        compass: true,
        showZoomCtrl: false,
        showFullscreenCtrl: false,
        mouseZoom: true,
        hfov: 100,
        minHfov: 45,
        maxHfov: 120,
        yaw: 0,
        pitch: 0
      });

      pannellumViewerInstance.on('load', () => {
        updateTourReadout();
      });

      pannellumViewerInstance.on('mousedown', () => {
        if (isTourAutoRotating && pannellumViewerInstance) {
          pannellumViewerInstance.stopAutoRotate();
        }
      });
      return;
    } catch (e) {
      console.warn('Pannellum WebGL fallback:', e);
    }
  }

  setupHorizontalFallbackViewer(panoUrl);
}

function setupHorizontalFallbackViewer(panoUrl) {
  const stage = document.getElementById('pannellum-stage');
  const fallbackStage = document.getElementById('custom-pano-stage');
  if (stage) stage.style.display = 'none';
  if (!fallbackStage) return;
  fallbackStage.style.display = 'flex';
  fallbackStage.innerHTML = '';
  fallbackStage.style.backgroundImage = `url(${panoUrl})`;
  fallbackStage.style.backgroundRepeat = 'repeat-x';
  fallbackStage.style.backgroundSize = 'cover';
  fallbackStage.style.backgroundPosition = `${fallbackScrollX}px center`;
  fallbackStage.style.cursor = 'grab';

  let isDragging = false;
  let startX = 0;

  const onDown = (e) => {
    isDragging = true;
    startX = e.pageX || (e.touches && e.touches[0].pageX) || 0;
    fallbackStage.style.cursor = 'grabbing';
  };
  const onMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX || (e.touches && e.touches[0].pageX) || 0;
    const dx = x - startX;
    startX = x;
    fallbackScrollX += dx * 1.5;
    fallbackStage.style.backgroundPosition = `${fallbackScrollX}px center`;
    updateTourReadout();
  };
  const onUp = () => {
    isDragging = false;
    fallbackStage.style.cursor = 'grab';
  };

  fallbackStage.onmousedown = onDown;
  window.onmousemove = onMove;
  window.onmouseup = onUp;
  fallbackStage.ontouchstart = onDown;
  window.ontouchmove = onMove;
  window.ontouchend = onUp;
}

function switchTourScene(imageUrl, isPano) {
  const tabs = document.querySelectorAll('.tour-scene-tab');
  tabs.forEach(t => {
    t.classList.remove('bg-sky-600', 'text-white');
    t.classList.add('text-slate-700', 'dark:text-slate-300');
  });
  if (event && event.currentTarget) {
    event.currentTarget.classList.add('bg-sky-600', 'text-white');
  }

  if (isPano) {
    loadSphericalPanorama(imageUrl, currentTourProperty);
  } else {
    // Show high-res still photograph scene
    const stage = document.getElementById('pannellum-stage');
    const fallbackStage = document.getElementById('custom-pano-stage');
    if (stage) stage.style.display = 'none';
    if (fallbackStage) {
      fallbackStage.style.display = 'flex';
      fallbackStage.innerHTML = `<img src="${imageUrl}" alt="Room Scene" class="w-full h-full object-cover animate-fade-in">`;
    }
  }
}

function openAnglePreset(angleId) {
  const btns = document.querySelectorAll('.angle-preset-pill');
  btns.forEach(b => {
    b.classList.remove('bg-sky-600', 'text-white', 'shadow-xs');
    b.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
  });
  const activeBtn = document.getElementById(`angle-btn-${angleId}`);
  if (activeBtn) {
    activeBtn.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
    activeBtn.classList.add('bg-sky-600', 'text-white', 'shadow-xs');
  }

  const descText = document.getElementById('tour-angle-desc-text');
  const readout = document.getElementById('tour-zoom-readout-pill');

  let pitch = 0, yaw = 0, hfov = 100, desc = '';
  if (angleId === 'wide-overview') {
    pitch = 0; yaw = 0; hfov = 100;
    desc = 'Full 360° panoramic perspective showing layout, hardwood floor, bed, study desk, and kitchenette pod.';
  } else if (angleId === 'window-angle') {
    pitch = 4; yaw = 45; hfov = 58;
    desc = 'Inspection angle of sound-insulated acoustic double-glazed window with daylight and Glasgow skyline view.';
  } else if (angleId === 'desk-angle') {
    pitch = -12; yaw = -38; hfov = 52;
    desc = 'Study station inspection showing large ergonomic desk, 250Mbps LAN socket, and task chair.';
  } else if (angleId === 'bed-angle') {
    pitch = -8; yaw = -105; hfov = 60;
    desc = 'Comfortable double bed with hypoallergenic mattress and extensive under-bed suitcases storage.';
  } else if (angleId === 'kitchen-angle') {
    pitch = 2; yaw = 115; hfov = 58;
    desc = 'Private kitchenette pod with touch induction hob, combi microwave oven, undercounter fridge, and extractor.';
  }

  if (descText) descText.textContent = desc;
  if (readout) readout.textContent = `Yaw: ${yaw}° • Zoom: ${Math.round((120 - hfov) / 75 * 100 + 40)}%`;

  if (pannellumViewerInstance) {
    pannellumViewerInstance.lookAt(pitch, yaw, hfov, 1000);
  }
}

function panCamera(dir) {
  if (pannellumViewerInstance) {
    if (dir === 'left') pannellumViewerInstance.setYaw(pannellumViewerInstance.getYaw() - 15);
    if (dir === 'right') pannellumViewerInstance.setYaw(pannellumViewerInstance.getYaw() + 15);
    if (dir === 'up') pannellumViewerInstance.setPitch(Math.min(85, pannellumViewerInstance.getPitch() + 10));
    if (dir === 'down') pannellumViewerInstance.setPitch(Math.max(-85, pannellumViewerInstance.getPitch() - 10));
    updateTourReadout();
    return;
  }
  const fallbackStage = document.getElementById('custom-pano-stage');
  if (fallbackStage) {
    if (dir === 'left') fallbackScrollX += 80;
    if (dir === 'right') fallbackScrollX -= 80;
    fallbackStage.style.backgroundPosition = `${fallbackScrollX}px center`;
    updateTourReadout();
  }
}

function zoomCamera(delta) {
  if (pannellumViewerInstance) {
    const cur = pannellumViewerInstance.getHfov();
    pannellumViewerInstance.setHfov(Math.max(45, Math.min(120, cur - delta * 15)));
    updateTourReadout();
  }
}

function resetCameraAngle() {
  if (pannellumViewerInstance) {
    pannellumViewerInstance.lookAt(0, 0, 100, 800);
    updateTourReadout();
  } else {
    fallbackScrollX = 0;
    const fallbackStage = document.getElementById('custom-pano-stage');
    if (fallbackStage) fallbackStage.style.backgroundPosition = '0px center';
    updateTourReadout();
  }
}

function updateTourReadout() {
  const readout = document.getElementById('tour-zoom-readout-pill');
  if (!readout) return;
  if (pannellumViewerInstance) {
    const yaw = Math.round(pannellumViewerInstance.getYaw() || 0);
    const hfov = Math.round(pannellumViewerInstance.getHfov() || 100);
    readout.textContent = `Heading: ${((yaw % 360 + 360) % 360)}° • Field: ${hfov}°`;
  } else {
    readout.textContent = `360° Horizontal Pan: Active`;
  }
}

function toggleTourAutoRotate() {
  const btn = document.getElementById('btn-tour-autorotate');
  isTourAutoRotating = !isTourAutoRotating;
  if (pannellumViewerInstance) {
    if (isTourAutoRotating) {
      pannellumViewerInstance.startAutoRotate(-2);
      if (btn) btn.classList.add('bg-sky-600', 'text-white');
    } else {
      pannellumViewerInstance.stopAutoRotate();
      if (btn) btn.classList.remove('bg-sky-600', 'text-white');
    }
  }
}

function toggleTourFullscreen() {
  const container = document.getElementById('tour-viewport-container');
  if (!container) return;
  if (!document.fullscreenElement) {
    container.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen().catch(() => {});
  }
}

// ==========================================
// STUDENT TASTE & SEARCH HISTORY ENGINE
// ==========================================
const StudentTasteEngine = {
  HISTORY_KEY: 'studentstay_search_history',

  getDefaultHistory: function() {
    const user = window.AuthManager ? AuthManager.getCurrentUser() : null;
    const c = (user && (user.destinationCountry || user.countryCode)) || localStorage.getItem('studentstay_active_country') || 'uk';

    if (c === 'germany') {
      return [
        {
          id: 'tum-olympia-zentrum',
          title: 'TUM Olympia Student Residence - Munich',
          city: 'Munich',
          country: 'germany',
          roomType: 'Executive En-suite Studio (22m²)',
          priceGBP: 210,
          image: 'assets/images/buchanan_view.jpg',
          commute: '6 min walk to TUM Campus',
          dateViewed: 'Today, 11:20 AM',
          action: 'Viewed 360° VR Tour & Secured',
          status: 'Booked & Escrow Protected'
        },
        {
          id: 'berlin-mitte-studios',
          title: 'Berlin Mitte Student Lofts - Capital Campus',
          city: 'Berlin',
          country: 'germany',
          roomType: 'Private En-suite Studio (21m²)',
          priceGBP: 195,
          image: 'assets/images/merchant_studios.jpg',
          commute: '8 min walk to Humboldt Univ',
          dateViewed: 'Yesterday, 4:45 PM',
          action: 'Searched & Inspected',
          status: 'Shortlisted'
        },
        {
          id: 'lmu-schwabing-studios',
          title: 'LMU Schwabing Student Residence - Munich',
          city: 'Munich',
          country: 'germany',
          roomType: 'Silver Studio with Kitchenette (20m²)',
          priceGBP: 220,
          image: 'assets/images/student_lounge.jpg',
          commute: '7 min U-Bahn to LMU',
          dateViewed: '3 days ago',
          action: 'Compared Commute & Price',
          status: 'Viewed'
        }
      ];
    } else if (c === 'usa') {
      return [
        {
          id: 'columbia-morningside-heights',
          title: 'Columbia Morningside Student Suites - New York',
          city: 'New York City',
          country: 'usa',
          roomType: 'Private Studio Suite (20m²)',
          priceGBP: 275,
          image: 'assets/images/buchanan_view.jpg',
          commute: '5 min walk to Columbia Campus',
          dateViewed: 'Today, 11:20 AM',
          action: 'Viewed 360° VR Tour & Secured',
          status: 'Booked & Escrow Protected'
        },
        {
          id: 'harvard-cambridge-studios',
          title: 'Harvard Square Cambridge Living - Boston',
          city: 'Boston / Cambridge',
          country: 'usa',
          roomType: 'Executive Academic Studio (22m²)',
          priceGBP: 260,
          image: 'assets/images/merchant_studios.jpg',
          commute: '6 min walk to Harvard Yard',
          dateViewed: 'Yesterday, 3:30 PM',
          action: 'Searched & Inspected',
          status: 'Shortlisted'
        }
      ];
    } else if (c === 'canada') {
      return [
        {
          id: 'uoft-stgeorge-studios',
          title: 'UofT St. George Student Lofts - Toronto',
          city: 'Toronto',
          country: 'canada',
          roomType: 'Premium En-suite Studio (24m²)',
          priceGBP: 215,
          image: 'assets/images/buchanan_view.jpg',
          commute: '7 min walk to UofT Campus',
          dateViewed: 'Today, 10:15 AM',
          action: 'Viewed 360° VR Tour & Secured',
          status: 'Booked & Escrow Protected'
        }
      ];
    } else if (c === 'australia') {
      return [
        {
          id: 'usyd-darlington-residence',
          title: 'USYD Darlington Student Suites - Sydney',
          city: 'Sydney',
          country: 'australia',
          roomType: 'Modern En-suite Studio (21m²)',
          priceGBP: 245,
          image: 'assets/images/buchanan_view.jpg',
          commute: '5 min walk to USYD Quadrangle',
          dateViewed: 'Today, 9:45 AM',
          action: 'Viewed 360° VR Tour & Secured',
          status: 'Booked & Escrow Protected'
        }
      ];
    }

    // Default UK
    return [
      {
        id: 'buchanan-view',
        title: 'Buchanan View - Glasgow City Centre',
        city: 'Glasgow',
        country: 'uk',
        roomType: 'Bronze En-suite Studio (18m²)',
        priceGBP: 189,
        image: 'assets/images/buchanan_view.jpg',
        commute: '8 min walk to GCU',
        dateViewed: 'Today, 11:20 AM',
        action: 'Viewed 360° VR Tour & Secured',
        status: 'Booked & Escrow Protected'
      },
      {
        id: 'merchant-studios',
        title: 'Merchant Studios - Merchant City',
        city: 'Glasgow',
        country: 'uk',
        roomType: 'Silver Studio with Kitchenette',
        priceGBP: 215,
        image: 'assets/images/merchant_studios.jpg',
        commute: '10 min bus to GCU',
        dateViewed: 'Yesterday, 4:45 PM',
        action: 'Searched & Inspected',
        status: 'Shortlisted'
      }
    ];
  },

  getHistory: function() {
    try {
      const data = localStorage.getItem(this.HISTORY_KEY);
      if (data) return JSON.parse(data);
    } catch(e) {}
    return this.getDefaultHistory();
  },

  recordView: function(property) {
    if (!property) return;
    try {
      let history = this.getHistory();
      history = history.filter(h => h.id !== property.id);
      history.unshift({
        id: property.id,
        title: property.title,
        city: property.city || 'Glasgow',
        country: property.countryCode || 'uk',
        roomType: property.roomType || 'Studio',
        priceGBP: property.pricePerWeekGBP || 189,
        image: property.heroImage || 'assets/images/buchanan_view.jpg',
        commute: (property.commutes && property.commutes[0]) ? property.commutes[0].time : 'Near Campus',
        dateViewed: 'Just now',
        action: 'Viewed 360° Virtual Tour',
        status: 'Active Interest'
      });
      localStorage.setItem(this.HISTORY_KEY, JSON.stringify(history.slice(0, 8)));
    } catch(e) {}
  },

  getRecommendationsForStudent: function(user) {
    const c = (user && (user.destinationCountry || user.countryCode)) || localStorage.getItem('studentstay_active_country') || 'uk';

    if (c === 'germany') {
      return [
        {
          id: 'tum-olympia-zentrum',
          title: 'TUM Olympia Residence — Skyline Studio (Munich)',
          city: 'Munich',
          reason: '98% Taste Match: Walking distance to TUM campus, high-floor balcony with Olympic Park views at verified student rates.',
          tag: 'Recommended Upgrade',
          badgeColor: 'amber',
          priceGBP: 210,
          image: 'assets/images/buchanan_view.jpg',
          amenityHighlight: 'Quiet study floor • 6 min walk to TUM lecture halls'
        },
        {
          id: 'berlin-mitte-studios',
          title: 'Berlin Mitte — Modern Ensuite Studio',
          city: 'Berlin',
          reason: '95% Taste Match: Central Berlin location near Humboldt University and direct U-Bahn transit.',
          tag: 'Alternative Destination',
          badgeColor: 'sky',
          priceGBP: 195,
          image: 'assets/images/merchant_studios.jpg',
          amenityHighlight: 'High-speed 250Mbps Wi-Fi • Humboldt Univ 8 min walk'
        }
      ];
    } else if (c === 'usa') {
      return [
        {
          id: 'columbia-morningside-heights',
          title: 'Columbia Morningside — Penthouse Suite (NYC)',
          city: 'New York City',
          reason: '99% Taste Match: Steps from Columbia gates with Manhattan skyline views and 24/7 security.',
          tag: 'Recommended Upgrade',
          badgeColor: 'amber',
          priceGBP: 275,
          image: 'assets/images/buchanan_view.jpg',
          amenityHighlight: 'Doorman building • 5 min walk to Columbia'
        }
      ];
    } else if (c === 'canada') {
      return [
        {
          id: 'uoft-stgeorge-studios',
          title: 'UofT St. George — Deluxe Studio (Toronto)',
          city: 'Toronto',
          reason: '97% Taste Match: Downtown Toronto living within 7 minutes walk to University of Toronto.',
          tag: 'Recommended Upgrade',
          badgeColor: 'amber',
          priceGBP: 215,
          image: 'assets/images/buchanan_view.jpg',
          amenityHighlight: 'Heated en-suite • Subterranean TTC transit link'
        }
      ];
    } else if (c === 'australia') {
      return [
        {
          id: 'usyd-darlington-residence',
          title: 'USYD Darlington — Modern Studio (Sydney)',
          city: 'Sydney',
          reason: '98% Taste Match: Located right on Darlington campus border with Redfern station express access.',
          tag: 'Recommended Upgrade',
          badgeColor: 'amber',
          priceGBP: 245,
          image: 'assets/images/buchanan_view.jpg',
          amenityHighlight: 'Air-conditioned • 5 min walk to USYD Quad'
        }
      ];
    }

    return [
      {
        id: 'buchanan-skyline',
        title: 'Buchanan View — Skyline Studio (Floor 4)',
        city: 'Glasgow',
        reason: '98% Taste Match: Same building, higher floor with South-facing city skyline views at identical weekly rent.',
        tag: 'Recommended Upgrade',
        badgeColor: 'amber',
        priceGBP: 189,
        image: 'assets/images/buchanan_view.jpg',
        amenityHighlight: 'Quiet study floor • Panoramic Glasgow sunset view'
      },
      {
        id: 'merchant-city-deluxe',
        title: 'Merchant Studios — Modern Double En-suite',
        city: 'Glasgow',
        reason: '94% Taste Match: 6 min walk to GCU, 2 min from African & Caribbean specialty grocery market on High St.',
        tag: 'Nearby Alternative',
        badgeColor: 'sky',
        priceGBP: 195,
        image: 'assets/images/merchant_studios.jpg',
        amenityHighlight: 'Free fitness suite • African grocery 200m away'
      }
    ];
  }
};


function showHotspotDetail(title, desc) {
  const card = document.getElementById('tour-active-hotspot-card');
  if (!card) return;
  card.innerHTML = `
    <div class="bg-slate-900/95 backdrop-blur-md p-4 rounded-2xl border border-sky-500/40 text-white shadow-2xl flex items-start space-x-3">
      <div class="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center shrink-0">
        <i class="fa-solid fa-sparkles text-xs"></i>
      </div>
      <div class="flex-1">
        <div class="font-bold text-xs text-sky-300">${title}</div>
        <p class="text-[11px] text-slate-300 mt-1">${desc}</p>
      </div>
      <button onclick="this.closest('#tour-active-hotspot-card').innerHTML=''" class="text-slate-400 hover:text-white text-xs">✕</button>
    </div>
  `;
}

// ==========================================
// 7. PEER CHAT & RESIDENCE CONCIERGE ENGINE (chat.html & residents.html)
// ==========================================
let currentActiveResidentId = 'residence-manager';
const chatSessionHistory = {};

function initChatEngine() {
  const urlParams = new URLSearchParams(window.location.search);
  let initialResId = urlParams.get('resident');

  if (!initialResId) {
    initialResId = 'residence-manager';
  } else if (initialResId === 'manager' || initialResId === 'concierge') {
    initialResId = 'residence-manager';
  }

  renderChatSidebar();
  renderChatMessages(initialResId);
}

function renderChatSidebar() {
  const sidebarContainer = document.getElementById('chat-sidebar-residents');
  if (!sidebarContainer || !window.APP_DATA || !APP_DATA.residents) return;

  const list = APP_DATA.residents;
  const onlineCountEl = document.getElementById('chat-online-count');
  const onlineCount = list.filter(r => r.isOnline).length;
  if (onlineCountEl) {
    onlineCountEl.textContent = `${onlineCount} Online`;
  }

  sidebarContainer.innerHTML = list.map(r => {
    const isManager = r.id === 'residence-manager';
    const isActive = r.id === currentActiveResidentId;
    return `
      <div onclick="switchChatResident('${r.id}')" class="p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
        isActive
          ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-400 dark:border-sky-500 shadow-xs'
          : 'bg-white dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
      }" id="sidebar-res-${r.id}">
        <div class="flex items-center space-x-2.5">
          <div class="relative">
            <img src="${r.avatar}" alt="${r.name}" class="w-10 h-10 rounded-full object-cover border ${isManager ? 'border-indigo-400' : 'border-sky-300'}">
            <span class="absolute bottom-0 right-0 w-2.5 h-2.5 ${r.isOnline ? 'bg-emerald-500' : 'bg-slate-400'} border-2 border-white dark:border-slate-900 rounded-full"></span>
          </div>
          <div>
            <div class="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center">
              ${r.name}
              ${isManager ? '<span class="ml-1.5 text-[9px] bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 px-1.5 py-0.2 rounded font-extrabold uppercase">Desk</span>' : ''}
            </div>
            <div class="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
              ${r.flag} ${r.propertyName}
            </div>
          </div>
        </div>
        <i class="fa-solid fa-chevron-right text-[10px] text-slate-400"></i>
      </div>
    `;
  }).join('');
}

function switchChatResident(residentId) {
  renderChatMessages(residentId);
}

function getResidentChatSession(residentId) {
  if (!chatSessionHistory[residentId]) {
    if (window.APP_DATA && APP_DATA.chatHistory && APP_DATA.chatHistory[residentId]) {
      chatSessionHistory[residentId] = JSON.parse(JSON.stringify(APP_DATA.chatHistory[residentId]));
    } else {
      const res = (window.APP_DATA && APP_DATA.getResident) ? APP_DATA.getResident(residentId) : null;
      const resName = res ? res.name : 'Resident Ambassador';
      const resProp = res ? res.propertyName : 'Verified Accommodation';
      const resUni = res ? res.university : 'Campus';
      const firstName = resName.split(' ')[0];

      chatSessionHistory[residentId] = [
        {
          id: `${residentId}-init-1`,
          sender: 'resident',
          text: `Hello! I am ${firstName}, living at ${resProp} while studying at ${resUni}. Feel free to ask me anything about the rooms, heating, campus commute, or neighbourhood!`,
          time: 'Just now'
        }
      ];
    }
  }
  return chatSessionHistory[residentId];
}

function renderChatMessages(residentId) {
  currentActiveResidentId = residentId;

  // Update sidebar active highlights
  document.querySelectorAll('#chat-sidebar-residents > div').forEach(d => {
    d.className = 'p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between bg-white dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800';
  });
  const activeSidebarItem = document.getElementById(`sidebar-res-${residentId}`);
  if (activeSidebarItem) {
    activeSidebarItem.className = 'p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between bg-sky-50 dark:bg-sky-950/40 border-sky-400 dark:border-sky-500 shadow-xs';
  }

  const resident = (window.APP_DATA && APP_DATA.getResident)
    ? APP_DATA.getResident(residentId)
    : ((window.APP_DATA && APP_DATA.residents) ? APP_DATA.residents.find(r => r.id === residentId) : null) || {
        id: 'residence-manager',
        name: 'Sarah Jenkins (Building Concierge)',
        country: 'Verified Management 🏢',
        flag: '🏢',
        course: 'Licensed Building Management',
        propertyName: 'StudentStay On-Site Concierge Desk',
        avatar: 'assets/images/concierge_manager.jpg',
        propertyId: 'buchanan-view',
        helpTopics: ['Key Collection & Check-in', 'Dual Occupancy Rules', 'Summer Luggage Storage', 'Escrow Deposit Refund Policy', 'Parcel Lockers']
      };

  const isManager = resident.id === 'residence-manager';

  // Update Header Elements
  const headerAvatar = document.getElementById('chat-header-avatar');
  if (headerAvatar) {
    headerAvatar.src = resident.avatar;
    headerAvatar.alt = resident.name;
    headerAvatar.className = `w-12 h-12 rounded-full object-cover border-2 ${isManager ? 'border-indigo-400' : 'border-sky-300'} shadow-sm`;
  }

  const headerName = document.getElementById('chat-header-name');
  if (headerName) headerName.textContent = resident.name;

  const headerFlag = document.getElementById('chat-header-flag');
  if (headerFlag) {
    headerFlag.textContent = `${resident.flag} ${resident.country}`;
    headerFlag.className = `text-xs px-2.5 py-0.5 rounded-full font-semibold ${
      isManager 
        ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800' 
        : 'bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300'
    }`;
  }

  const headerSub = document.getElementById('chat-header-sub');
  if (headerSub) {
    const uniPart = resident.university ? ` @ ${resident.university.split('(')[0].trim()}` : '';
    headerSub.textContent = `${resident.course || resident.role || 'Resident Ambassador'}${uniPart} • ${resident.propertyName}`;
  }

  const tourBtn = document.getElementById('chat-header-tour-btn');
  if (tourBtn) {
    tourBtn.href = `tours.html?property=${resident.propertyId || 'buchanan-view'}`;
  }

  const bookBtn = document.getElementById('chat-header-book-btn');
  if (bookBtn) {
    bookBtn.setAttribute('onclick', `openBookingModal('${resident.propertyId || 'buchanan-view'}')`);
  }

  const typingName = document.getElementById('typing-resident-name');
  if (typingName) {
    typingName.textContent = isManager 
      ? 'Residence concierge is typing an official response...' 
      : `${resident.name.split(' ')[0]} is typing an honest reply...`;
  }

  const inputField = document.getElementById('chat-input-field');
  if (inputField) {
    inputField.placeholder = isManager
      ? 'Ask building concierge about keys, check-in, leases, dual occupancy, luggage...'
      : `Ask ${resident.name.split(' ')[0]} anything about heating, wifi, safety, groceries, campus walk...`;
  }

  // Render Quick Topic Question Pills
  const promptsContainer = document.getElementById('chat-quick-prompts');
  if (promptsContainer) {
    const topics = (resident.helpTopics && resident.helpTopics.length > 0)
      ? resident.helpTopics
      : ['Winter Heating & Bills', '250Mbps Wi-Fi', 'Safety at Night', 'Campus Walking Route', 'Escrow Deposit Protection'];

    promptsContainer.innerHTML = topics.map(topic => `
      <button type="button" onclick="askQuickTopic('${topic.replace(/'/g, "\\'")}')" class="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-sky-50 dark:bg-slate-800 dark:hover:bg-sky-950/40 text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 border border-slate-200 dark:border-slate-700 text-xs font-semibold whitespace-nowrap transition-colors flex items-center shrink-0 cursor-pointer shadow-xs">
        <i class="fa-solid fa-sparkles text-amber-500 mr-1.5 text-[10px]"></i> ${topic}
      </button>
    `).join('');
  }

  // Render Messages Feed
  const container = document.getElementById('chat-messages-container');
  if (container) {
    const history = getResidentChatSession(residentId);
    container.innerHTML = history.map(m => {
      const isUser = m.sender === 'user';
      return `
        <div class="flex ${isUser ? 'justify-end' : 'justify-start'} mb-3">
          <div class="max-w-[75%] rounded-2xl px-4 py-2.5 text-xs ${
            isUser 
              ? 'bg-sky-600 text-white rounded-tr-none shadow-sm' 
              : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200 dark:border-slate-700 shadow-xs'
          }">
            <p class="leading-relaxed">${m.text}</p>
            ${m.media ? `
              <div class="mt-2.5 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-xs">
                <img src="${m.media.src}" alt="${m.media.caption}" class="w-full max-h-48 object-cover">
                <div class="p-2 text-[10px] bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 italic">
                  <i class="fa-solid fa-camera mr-1 text-sky-500"></i> ${m.media.caption}
                </div>
              </div>
            ` : ''}
            <div class="mt-1 text-[9px] ${isUser ? 'text-sky-200 text-right' : 'text-slate-400'}">${m.time || '14:25'}</div>
          </div>
        </div>
      `;
    }).join('');
    container.scrollTop = container.scrollHeight;
  }
}

function askQuickTopic(topic) {
  sendChatMessage(`Can you tell me about ${topic}?`);
}

function sendChatMessage(customText) {
  const input = document.getElementById('chat-input-field');
  const text = (typeof customText === 'string' && customText.trim()) 
    ? customText.trim() 
    : (input ? input.value.trim() : '');

  if (!text) return;
  if (input) input.value = '';

  const activeId = currentActiveResidentId || 'residence-manager';
  const resident = (window.APP_DATA && APP_DATA.getResident) 
    ? APP_DATA.getResident(activeId) 
    : { name: 'Resident Ambassador', propertyName: 'StudentStay Residence' };

  const session = getResidentChatSession(activeId);
  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const userMsg = {
    id: `msg-${Date.now()}`,
    sender: 'user',
    text: text,
    time: timeStr
  };
  session.push(userMsg);

  const container = document.getElementById('chat-messages-container');
  if (container) {
    container.innerHTML += `
      <div class="flex justify-end mb-3">
        <div class="max-w-[75%] rounded-2xl px-4 py-2.5 text-xs bg-sky-600 text-white rounded-tr-none shadow-sm">
          <p class="leading-relaxed">${text}</p>
          <div class="mt-1 text-[9px] text-sky-200 text-right">${timeStr}</div>
        </div>
      </div>
    `;
    container.scrollTop = container.scrollHeight;
  }

  // Show typing indicator
  const typingIndicator = document.getElementById('chat-typing-indicator');
  if (typingIndicator) {
    typingIndicator.classList.remove('hidden');
    if (container) container.scrollTop = container.scrollHeight;
  }

  // Generate Contextual Response
  setTimeout(() => {
    if (typingIndicator) typingIndicator.classList.add('hidden');

    const lower = text.toLowerCase();
    let replyText = '';

    const isManager = activeId === 'residence-manager';
    const replies = (window.APP_DATA && APP_DATA.smartResidentReplies) ? APP_DATA.smartResidentReplies : {};

    if (lower.includes('key') || lower.includes('checkin') || lower.includes('arrival')) {
      replyText = isManager
        ? (replies.keys || 'Key collection is staffed 24/7! When you arrive, our reception concierge desk issues your smart electronic door fob upon showing your Escrow Booking Reference.')
        : `Keys are collected smoothly at reception! Even when I landed late at Glasgow Airport, the night desk was open and checked me in within 5 minutes.`;
    } else if (lower.includes('escrow') || lower.includes('deposit') || lower.includes('safe') || lower.includes('visa') || lower.includes('refund')) {
      replyText = replies.escrow || 'Your holding deposit is locked strictly in government-licensed custodial escrow (SafeDeposits Scotland / TDS). 100% refundable if your student visa is delayed or denied!';
    } else if (lower.includes('heat') || lower.includes('cold') || lower.includes('winter') || lower.includes('radiator')) {
      replyText = replies.heating || 'The heating is fantastic! Every room features digital thermostatic radiators with unlimited heating included in the rent. You will stay toasty warm 24/7 with zero extra bills!';
    } else if (lower.includes('wifi') || lower.includes('internet') || lower.includes('speed') || lower.includes('coding')) {
      replyText = replies.wifi || 'Wi-Fi is 250 Mbps to 1 Gbps with Ask4! Super fast for coding, model training, and 4K Zoom calls without lag.';
    } else if (lower.includes('grocery') || lower.includes('supermarket') || lower.includes('food') || lower.includes('shopping')) {
      replyText = replies.groceries || 'Supermarkets (Tesco Express, Sainsbury’s, Lidl, and international grocery stores) are within 3-8 minutes walk from the entrance.';
    } else if (lower.includes('walk') || lower.includes('distance') || lower.includes('commute') || lower.includes('transit') || lower.includes('subway')) {
      replyText = replies.commute || `Walking to lectures is very direct and flat, takes around 6-10 minutes. Subway and bus stops are right around the corner!`;
    } else if (lower.includes('dual') || lower.includes('couple') || lower.includes('share')) {
      replyText = replies.dual || 'Selected Premium and Executive Studios allow dual occupancy for couples with a small utility supplement. Standard en-suites are single occupancy for quiet study.';
    } else if (lower.includes('luggage') || lower.includes('storage') || lower.includes('bag')) {
      replyText = replies.luggage || 'We have secure luggage holding rooms available for students arriving before tenancy begins or between academic semesters.';
    } else if (lower.includes('parcel') || lower.includes('delivery') || lower.includes('amazon')) {
      replyText = replies.parcels || 'Reception has automated parcel lockers! You receive a notification with a QR code to unlock your delivery 24/7.';
    } else if (lower.includes('bill') || lower.includes('electricity') || lower.includes('water')) {
      replyText = replies.bills || 'Zero extra charges! Electricity, unlimited central heating, water, high-speed Wi-Fi, and contents insurance are 100% included in the weekly rent.';
    } else {
      replyText = isManager
        ? `Thank you for your inquiry! Our on-site concierge team is here to ensure your tenancy runs seamlessly. Feel free to reserve your room using the Escrow guarantee button above, or ask any further questions.`
        : `Great question! From my experience living at ${resident.propertyName}, everything was accurate to the 360° tour. The location is safe, quiet, and perfect for studying. You are in very safe hands locking your room with Escrow!`;
    }

    const replyMsg = {
      id: `msg-${Date.now()}`,
      sender: isManager ? 'manager' : 'resident',
      text: replyText,
      time: timeStr
    };
    session.push(replyMsg);

    if (container) {
      container.innerHTML += `
        <div class="flex justify-start mb-3">
          <div class="max-w-[75%] rounded-2xl px-4 py-2.5 text-xs bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200 dark:border-slate-700 shadow-xs">
            <p class="leading-relaxed"><i class="fa-solid fa-sparkles text-amber-400 mr-1"></i> ${replyText}</p>
            <div class="mt-1 text-[9px] text-slate-400">${timeStr}</div>
          </div>
        </div>
      `;
      container.scrollTop = container.scrollHeight;
    }
  }, 800);
}

// ==========================================
// 7.5 HOMEPAGE COUNTRY PERSONALIZATION ENGINE
// ==========================================
const HomepageCountryManager = {
  currentCountry: 'all',

  init() {
    const savedCountry = localStorage.getItem('studentstay_active_country');
    const user = window.AuthManager ? AuthManager.getCurrentUser() : null;
    const userCountry = (user && (user.destinationCountry || user.countryCode)) || null;

    this.currentCountry = savedCountry || userCountry || 'all';
    this.updateActiveButton(this.currentCountry);
    this.renderProperties(this.currentCountry);
    this.updateHeroGreeting();
  },

  switchCountry(countryCode) {
    this.currentCountry = countryCode;
    localStorage.setItem('studentstay_active_country', countryCode);

    // Auto-adjust currency to country
    if (countryCode === 'uk') CurrencyManager.setCurrency('GBP');
    else if (countryCode === 'usa' || countryCode === 'canada' || countryCode === 'australia') CurrencyManager.setCurrency('USD');
    else if (countryCode === 'germany') CurrencyManager.setCurrency('EUR');

    this.updateActiveButton(countryCode);
    this.renderProperties(countryCode);
    this.updateHeroGreeting();

    if (window.IntakeAnnouncementManager) {
      IntakeAnnouncementManager.update(countryCode);
    }
    if (window.HomeSearchManager) {
      HomeSearchManager.syncToCountry(countryCode);
    }
  },

  updateActiveButton(countryCode) {
    const buttons = document.querySelectorAll('.home-country-pill');
    buttons.forEach(btn => {
      btn.className = 'home-country-pill px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-sky-600 cursor-pointer';
    });
    const activeBtn = document.getElementById(`home-country-btn-${countryCode}`);
    if (activeBtn) {
      activeBtn.className = 'home-country-pill px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all bg-sky-600 text-white shadow-xs cursor-pointer';
    }
  },

  updateHeroGreeting() {
    const countryNames = {
      uk: 'United Kingdom 🇬🇧',
      usa: 'United States 🇺🇸',
      canada: 'Canada 🇨🇦',
      australia: 'Australia 🇦🇺',
      germany: 'Germany 🇩🇪',
      all: 'Global Study Destinations'
    };
    const subTitleEl = document.getElementById('home-featured-subtitle');
    const titleEl = document.getElementById('home-featured-title');
    const descEl = document.getElementById('home-featured-desc');

    const countryName = countryNames[this.currentCountry] || 'Global Destinations';
    if (subTitleEl) subTitleEl.textContent = `${countryName} Accommodations`;
    if (titleEl) {
      if (this.currentCountry === 'all') {
        titleEl.textContent = 'Verified Residences Near Top Campuses';
      } else {
        titleEl.textContent = `Verified Residences in ${countryName}`;
      }
    }
    if (descEl) {
      descEl.textContent = `100% physically inspected properties with 360° virtual tours, verified transit routes, and escrow protection.`;
    }
  },

  renderProperties(countryCode) {
    const grid = document.getElementById('home-featured-grid');
    if (!grid || !window.APP_DATA || !APP_DATA.properties) return;

    let list = APP_DATA.properties;
    if (countryCode && countryCode !== 'all') {
      list = list.filter(p => p.countryCode === countryCode);
    }
    const displayList = list.slice(0, 6);

    grid.innerHTML = displayList.map(p => `
      <div class="property-card-hover bg-white dark:bg-[#0f1a30] rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs flex flex-col justify-between">
        <div>
          <div class="relative h-56 overflow-hidden">
            <img src="${p.heroImage || p.image || 'assets/images/buchanan_view.jpg'}" alt="${p.title}" class="w-full h-full object-cover">
            <span class="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-sm">
              <i class="fa-solid fa-shield-check mr-1"></i> Verified Residence
            </span>
            <span class="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-amber-300 text-xs font-bold px-2 py-0.5 rounded-lg border border-amber-400/30">
              <i class="fa-solid fa-star text-[10px] mr-1"></i> ${p.rating || 4.9} (${p.reviewsCount || 100})
            </span>
            <span class="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
              <i class="fa-solid fa-location-dot text-sky-400 mr-1"></i> ${p.city} • ${p.commutes ? p.commutes[0].time : 'Near Campus'}
            </span>
          </div>

          <div class="p-5">
            <div class="text-[11px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-1">
              ${p.city}, ${p.countryCode ? p.countryCode.toUpperCase() : 'UK'}
            </div>
            <h3 class="font-extrabold text-slate-900 dark:text-slate-100 text-base mb-1">${p.title}</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 mb-3">${p.roomType || 'Private En-suite Studio'}</p>
            <div class="flex flex-wrap gap-1.5 mb-4 text-[11px] text-slate-600 dark:text-slate-300 font-medium">
              <span class="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md">⚡ All Bills Included</span>
              <span class="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md">📶 250Mbps Wi-Fi</span>
              <span class="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md">🚿 Heated En-suite</span>
            </div>
          </div>
        </div>

        <div class="p-5 pt-0">
          <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mb-3">
            <div>
              <span class="text-[10px] text-slate-400 uppercase font-bold block">From</span>
              <span class="text-base font-extrabold text-sky-600 dark:text-sky-400" data-price-gbp="${p.pricePerWeekGBP || 189}" data-price-period="/ week">
                £${p.pricePerWeekGBP || 189} / week
              </span>
            </div>
            <div class="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800">
              Holding: £${p.depositGBP || 150} (Escrow)
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <a href="tours.html?property=${p.id}" class="py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-sky-950/40 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl transition-colors flex items-center justify-center">
              <i class="fa-solid fa-arrows-spin mr-1.5 text-sky-600"></i> 360° VR Tour
            </a>
            <a href="find-home.html?country=${p.countryCode}&property=${p.id}" class="py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center">
              <i class="fa-solid fa-magnifying-glass-location mr-1.5"></i> View Details
            </a>
          </div>
        </div>
      </div>
    `).join('');

    CurrencyManager.updateAllPricesOnPage();
  }
};

// ==========================================
// 8. HOMEPAGE SEARCH BAR SYNCHRONIZATION
// ==========================================
const HomeSearchManager = {
  unisByCountry: {
    all: [
      { id: 'all', name: 'All Universities Globally' },
      { id: 'tum', name: 'Technical University of Munich (TUM) 🇩🇪' },
      { id: 'lmu', name: 'Ludwig Maximilian Univ (LMU) 🇩🇪' },
      { id: 'hu-berlin', name: 'Humboldt University of Berlin 🇩🇪' },
      { id: 'gcu', name: 'Glasgow Caledonian (GCU) 🇬🇧' },
      { id: 'uofg', name: 'University of Glasgow 🇬🇧' },
      { id: 'uoe', name: 'University of Edinburgh 🇬🇧' },
      { id: 'ucl', name: 'UCL London 🇬🇧' },
      { id: 'columbia', name: 'Columbia University (NY) 🇺🇸' },
      { id: 'harvard', name: 'Harvard University (MA) 🇺🇸' },
      { id: 'uoft', name: 'University of Toronto 🇨🇦' },
      { id: 'usyd', name: 'University of Sydney 🇦🇺' }
    ],
    germany: [
      { id: 'all', name: 'All German Universities' },
      { id: 'tum', name: 'Technical University of Munich (TUM)' },
      { id: 'lmu', name: 'Ludwig Maximilian University (LMU)' },
      { id: 'hu-berlin', name: 'Humboldt University of Berlin' },
      { id: 'fu-berlin', name: 'Free University of Berlin (FU)' }
    ],
    uk: [
      { id: 'all', name: 'All UK Universities' },
      { id: 'gcu', name: 'Glasgow Caledonian (GCU)' },
      { id: 'strath', name: 'University of Strathclyde' },
      { id: 'uofg', name: 'University of Glasgow' },
      { id: 'uoe', name: 'University of Edinburgh' },
      { id: 'uab', name: 'University of Aberdeen' },
      { id: 'ucl', name: 'University College London (UCL)' },
      { id: 'kcl', name: 'King’s College London (KCL)' },
      { id: 'manchester', name: 'University of Manchester' },
      { id: 'birmingham', name: 'University of Birmingham' }
    ],
    usa: [
      { id: 'all', name: 'All US Universities' },
      { id: 'columbia', name: 'Columbia University' },
      { id: 'nyu', name: 'New York University (NYU)' },
      { id: 'harvard', name: 'Harvard University' },
      { id: 'mit', name: 'MIT' },
      { id: 'bu', name: 'Boston University' },
      { id: 'ucla', name: 'UCLA' },
      { id: 'usc', name: 'Univ of Southern California' },
      { id: 'berkeley', name: 'UC Berkeley' }
    ],
    canada: [
      { id: 'all', name: 'All Canadian Universities' },
      { id: 'uoft', name: 'University of Toronto (UofT)' },
      { id: 'york', name: 'York University' },
      { id: 'waterloo', name: 'University of Waterloo' },
      { id: 'ubc', name: 'University of British Columbia (UBC)' }
    ],
    australia: [
      { id: 'all', name: 'All Australian Universities' },
      { id: 'usyd', name: 'University of Sydney' },
      { id: 'unsw', name: 'UNSW Sydney' },
      { id: 'unimelb', name: 'University of Melbourne' }
    ]
  },

  init() {
    const countrySelect = document.getElementById('home-search-country');
    const uniSelect = document.getElementById('home-search-uni');
    if (!countrySelect || !uniSelect) return;

    const savedCountry = localStorage.getItem('studentstay_active_country');
    const user = window.AuthManager ? AuthManager.getCurrentUser() : null;
    const activeCountry = savedCountry || (user && (user.destinationCountry || user.countryCode)) || 'all';

    if (activeCountry && this.unisByCountry[activeCountry]) {
      countrySelect.value = activeCountry;
      this.updateUnis(activeCountry, (user && user.university) || null);
    } else {
      this.updateUnis('all');
    }

    countrySelect.addEventListener('change', () => {
      const selected = countrySelect.value;
      localStorage.setItem('studentstay_active_country', selected);
      this.updateUnis(selected);
      if (window.IntakeAnnouncementManager) {
        IntakeAnnouncementManager.update(selected);
      }
      if (window.HomepageCountryManager) {
        HomepageCountryManager.switchCountry(selected);
      }
    });
  },

  syncToCountry(countryCode, targetUniName) {
    const countrySelect = document.getElementById('home-search-country');
    if (countrySelect && countryCode) {
      countrySelect.value = countryCode;
      this.updateUnis(countryCode, targetUniName);
    }
  },

  updateUnis(countryCode, preselectUni) {
    const uniSelect = document.getElementById('home-search-uni');
    if (!uniSelect) return;
    const list = this.unisByCountry[countryCode] || this.unisByCountry['all'];
    uniSelect.innerHTML = list.map(u => `<option value="${u.id}">${u.name}</option>`).join('');

    if (preselectUni) {
      const norm = preselectUni.toLowerCase();
      for (let i = 0; i < uniSelect.options.length; i++) {
        const optText = uniSelect.options[i].text.toLowerCase();
        if (optText.includes(norm) || norm.includes(uniSelect.options[i].value.toLowerCase())) {
          uniSelect.selectedIndex = i;
          break;
        }
      }
    }
  }
};

// ==========================================
// 9. GLOBAL INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  CurrencyManager.init();
  IntakeAnnouncementManager.init();
  MobileNavManager.init();
  AuthManager.renderAuthContainers();
  AuthManager.updateGreetings();
  HeroCarousel.init();

  if (document.getElementById('home-featured-grid')) {
    HomepageCountryManager.init();
  }

  HomeSearchManager.init();
  MobileBottomBar.init();

  // Listen for storage events across tabs
  window.addEventListener('storage', (e) => {
    if (e.key === ThemeManager.THEME_KEY) {
      ThemeManager.applyTheme(e.newValue);
    } else if (e.key === CurrencyManager.CURRENCY_KEY) {
      CurrencyManager.setCurrency(e.newValue);
    } else if (e.key === AuthManager.USER_KEY || e.key === 'studentstay_custom_user') {
      AuthManager.renderAuthContainers();
      AuthManager.updateGreetings();
      IntakeAnnouncementManager.update();
    } else if (e.key === 'studentstay_active_country') {
      IntakeAnnouncementManager.update(e.newValue);
    }
  });

  // Universal click delegation for sign out buttons across all pages
  document.addEventListener('click', (e) => {
    const signoutBtn = e.target.closest('.sign-out-global-btn');
    if (signoutBtn) {
      logoutStudent(e);
    }
  });
});

if (typeof window !== 'undefined') {
  window.ThemeManager = ThemeManager;
  window.CurrencyManager = CurrencyManager;
  window.IntakeAnnouncementManager = IntakeAnnouncementManager;
  window.MobileNavManager = MobileNavManager;
  window.MobileBottomBar = MobileBottomBar;
  window.AuthManager = AuthManager;
  window.HeroCarousel = HeroCarousel;
  window.StudentTasteEngine = StudentTasteEngine;
  window.HomepageCountryManager = HomepageCountryManager;
  window.HomeSearchManager = HomeSearchManager;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ThemeManager,
    CurrencyManager,
    IntakeAnnouncementManager,
    MobileNavManager,
    MobileBottomBar,
    AuthManager,
    HeroCarousel,
    StudentTasteEngine,
    HomepageCountryManager,
    HomeSearchManager
  };
}
