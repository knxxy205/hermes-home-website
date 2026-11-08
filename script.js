const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

function closeMenu() {
  if (!menuToggle || !siteNav) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Buka navigasi');
  siteNav.classList.remove('is-open');
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Buka navigasi' : 'Tutup navigasi');
    siteNav.classList.toggle('is-open', !isOpen);
  });

  siteNav.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  document.addEventListener('click', (event) => {
    if (!siteNav.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
  });
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (!prefersReducedMotion.matches && window.gsap && window.ScrollTrigger && window.Lenis) {
  const { gsap, ScrollTrigger, Lenis } = window;
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({ autoRaf: false, anchors: true, lerp: 0.09, wheelMultiplier: 0.9 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .from('.hero-copy .eyebrow', { opacity: 0, y: 12, duration: 0.45 })
    .from('.hero h1', { opacity: 0, y: 20, duration: 0.65 }, '-=0.2')
    .from('.hero-lede', { opacity: 0, y: 14, duration: 0.5 }, '-=0.3')
    .from('.hero-actions .button', { opacity: 0, y: 10, duration: 0.4, stagger: 0.08 }, '-=0.25')
    .from('.hero-art', { opacity: 0, y: 15, duration: 0.65 }, '-=0.4');

  gsap.utils.toArray('.tab-card, .settings-card, .screenshot-card').forEach((card, index) => {
    gsap.from(card, {
      opacity: 0,
      y: 18,
      duration: 0.55,
      delay: (index % 3) * 0.06,
      ease: 'power2.out',
      scrollTrigger: { trigger: card, start: 'top 88%', once: true },
    });
  });

  gsap.utils.toArray('.feature-layout, .provider-layout, .setup-layout, .release-panel, .faq-layout').forEach((section) => {
    gsap.from(section.children, {
      opacity: 0,
      y: 18,
      duration: 0.65,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 84%', once: true },
    });
  });

  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
}
