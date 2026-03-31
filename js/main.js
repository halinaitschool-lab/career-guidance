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
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
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

// ── Active language & dynamic language switching ──
const isLocal = window.location.hostname === 'localhost' 
            || window.location.hostname === '127.0.0.1';

// Determine the base path for language links
const getLanguageBaseUrl = () => {
  const pathname = window.location.pathname;
  
  // On production: /career-guidance/ru/opinie.html
  // On local: /ru/opinie.html
  const isProdPath = pathname.includes('/career-guidance/');
  const prodBase = '/career-guidance/';
  const localBase = '/';
  
  return isProdPath ? prodBase : localBase;
};

// Get current language and page
const getLanguageInfo = () => {
  const pathname = window.location.pathname;
  const segments = pathname.split('/').filter(s => s); // Remove empty strings
  
  let currentLang = '';
  let currentPage = 'index.html';
  
  // Check if path includes 'career-guidance' (production)
  if (segments.includes('career-guidance')) {
    const idx = segments.indexOf('career-guidance');
    currentLang = segments[idx + 1] || '';
    currentPage = segments[idx + 2] || 'index.html';
  } else {
    // Local or gh-pages without career-guidance
    currentLang = segments[0] || '';
    currentPage = segments[1] || 'index.html';
  }
  
  return { currentLang, currentPage };
};

const { currentLang, currentPage } = getLanguageInfo();
const baseUrl = getLanguageBaseUrl();

// Update language button links
document.querySelectorAll('.lang-btn').forEach(langBtn => {
  const targetLang = langBtn.textContent.trim().toLowerCase(); // 'pl' or 'ru'
  langBtn.href = `${baseUrl}${targetLang}/${currentPage}`;
  
  if (targetLang === currentLang) {
    langBtn.classList.add('active-lang');
  } else {
    langBtn.classList.remove('active-lang');
  }
});