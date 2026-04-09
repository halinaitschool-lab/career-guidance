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

// ── Sticky CTA button visibility ──
const stickyCta = document.querySelector('.sticky-cta');
const howProcessSection = document.querySelector('.how-process-section');
if (stickyCta && howProcessSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        stickyCta.style.display = 'flex';
      } else if (e.boundingClientRect.top > 0) {
        stickyCta.style.display = 'none';
      }
    });
  }, { threshold: 0.01 });
  observer.observe(howProcessSection);
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
