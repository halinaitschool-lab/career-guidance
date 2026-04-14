// ══════════════════════════════════
//  WERONIKA SITE — MAIN JS
// ══════════════════════════════════

// ── Navbar scroll ──
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// ── Burger menu ──
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');
if (burger && navLinks) {
  const CLOSE_MENU_EVENTS = ['resize', 'orientationchange'];
  let lockedScrollY = 0;

  const isOpen = () => navLinks.classList.contains('open');

  // Simple scroll lock: hide body overflow and compensate scrollbar width to avoid layout shift.
  const lockScroll = () => {
    lockedScrollY = window.scrollY || window.pageYOffset || 0;
    const scrollbarWidth = Math.max(0, window.innerWidth - document.documentElement.clientWidth);
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.overflow = 'hidden';
  };

  const unlockScroll = () => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    // restore scroll position if it changed
    if (lockedScrollY) window.scrollTo(0, lockedScrollY);
    lockedScrollY = 0;
  };

  const openMenu = () => {
    burger.classList.add('open');
    navLinks.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    lockScroll();
  };

  const closeMenu = () => {
    if (!isOpen()) return;
    burger.classList.remove('open');
    navLinks.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    unlockScroll();
  };

  const toggleMenu = () => {
    if (isOpen()) closeMenu();
    else openMenu();
  };

  burger.setAttribute('aria-expanded', burger.getAttribute('aria-expanded') || 'false');
  if (!burger.getAttribute('aria-controls')) burger.setAttribute('aria-controls', 'nav-links');

  // Use a single click handler for reliability across mobile browsers. No touch-specific handlers.
  burger.addEventListener('click', toggleMenu);
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  CLOSE_MENU_EVENTS.forEach(evt => window.addEventListener(evt, closeMenu));
}

// ── Parallax ──
const heroBg = document.getElementById('heroBg');
const ctaBg = document.getElementById('ctaBg');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (heroBg) heroBg.style.transform = `translateY(${y * 0.35}px)`;
  if (ctaBg) {
    const rect = ctaBg.closest('section')?.getBoundingClientRect();
    if (rect) ctaBg.style.transform = `translateY(${(rect.top * 0.2)}px)`;
  }
}, { passive: true });

// ── Scroll reveal ──
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(el => revealObserver.observe(el));

// ── Sticky CTA on desktop: show after scrolling past first hero / page header ──
const stickyCta = document.querySelector('.sticky-cta');
const stickySentinel =
  document.querySelector('.hero') ||
  document.querySelector('.page-header') ||
  document.getElementById('navbar')?.nextElementSibling;

if (stickyCta && stickySentinel) {
  const DESKTOP_MIN = 769;
  const syncStickyCtaDesktop = () => {
    if (window.innerWidth < DESKTOP_MIN) {
      stickyCta.classList.remove('sticky-cta--desktop-visible');
      return;
    }
    const rect = stickySentinel.getBoundingClientRect();
    stickyCta.classList.toggle('sticky-cta--desktop-visible', rect.bottom <= 0);
  };

  window.addEventListener('scroll', syncStickyCtaDesktop, { passive: true });
  window.addEventListener('resize', syncStickyCtaDesktop);
  syncStickyCtaDesktop();
}

// ── Trust strip auto-scroll ──
const trustStrip = document.querySelector('.trust-strip');
if (trustStrip) {
  const trustInner = trustStrip.querySelector('.trust-inner');
  if (trustInner) {
    let scrollPos = 0;
    const scrollSpeed = 1;
    const scrollInterval = setInterval(() => {
      scrollPos += scrollSpeed;
      if (scrollPos >= trustInner.scrollWidth - trustInner.parentElement.clientWidth) {
        scrollPos = 0;
      }
      trustInner.parentElement.scrollLeft = scrollPos;
    }, 30);
    
    // Stop auto-scroll on hover
    trustStrip.addEventListener('mouseenter', () => clearInterval(scrollInterval));
  }
}

// ── Active nav link ──
const currentPagePath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPagePath || (currentPagePath === '' && href === 'index.html')) {
    a.classList.add('active');
  } else {
    a.classList.remove('active');
  }
});
