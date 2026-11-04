const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    siteNav.classList.toggle('is-open', !isOpen);
  });

  siteNav.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      menuToggle.setAttribute('aria-expanded', 'false');
      siteNav.classList.remove('is-open');
    }
  });
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (!prefersReducedMotion.matches && window.gsap && window.ScrollTrigger && window.Lenis) {
  const { gsap, ScrollTrigger, Lenis } = window;
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
    autoRaf: false,
    anchors: true,
    lerp: 0.09,
    wheelMultiplier: 0.9,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  const heroIntro = gsap.timeline({ defaults: { ease: 'power3.out' } });
  heroIntro
    .from('.hero-copy .eyebrow', { opacity: 0, y: 14, duration: 0.55 })
    .from('.hero-copy h1', { opacity: 0, y: 24, duration: 0.75 }, '-=0.25')
    .from('.hero-lede', { opacity: 0, y: 18, duration: 0.6 }, '-=0.38')
    .from('.hero-actions .button', { opacity: 0, y: 12, duration: 0.45, stagger: 0.1 }, '-=0.32')
    .from('.hero-facts, .hero-caption', { opacity: 0, y: 10, duration: 0.5 }, '-=0.2')
    .from('.hero-phone', { opacity: 0, y: 32, scale: 0.97, duration: 0.9 }, '-=0.75');

  gsap.utils.toArray('.intro-head').forEach((section) => {
    gsap.from(section.children, {
      opacity: 0,
      y: 28,
      duration: 0.75,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 82%', once: true },
    });
  });

  gsap.utils.toArray('.feature-grid').forEach((section, index) => {
    const visual = section.querySelector('.feature-visual');
    const copy = section.querySelector('.feature-copy');
    const copyFrom = section.classList.contains('reverse') ? -26 : 26;
    const visualFrom = -copyFrom;

    gsap.from(copy, {
      opacity: 0,
      x: copyFrom,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 78%', once: true },
    });
    gsap.from(visual, {
      opacity: 0,
      x: visualFrom,
      y: 12,
      duration: 0.9,
      delay: 0.08,
      ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 78%', once: true },
    });
  });

  gsap.from('.privacy-inner > *', {
    opacity: 0,
    y: 18,
    duration: 0.65,
    stagger: 0.12,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.privacy-band', start: 'top 84%', once: true },
  });

  gsap.from('.step-card', {
    opacity: 0,
    y: 22,
    duration: 0.65,
    stagger: 0.14,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.steps-grid', start: 'top 82%', once: true },
  });

  gsap.from('.screenshot-card', {
    opacity: 0,
    y: 26,
    duration: 0.7,
    stagger: 0.13,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.screenshot-grid', start: 'top 84%', once: true },
  });

  gsap.from('.faq-intro, .faq-list', {
    opacity: 0,
    y: 22,
    duration: 0.7,
    stagger: 0.14,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.faq-grid', start: 'top 82%', once: true },
  });

  gsap.from('.beta-content, .beta-visual', {
    opacity: 0,
    y: 24,
    duration: 0.75,
    stagger: 0.16,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.beta-panel', start: 'top 83%', once: true },
  });

  gsap.to('.hero-phone', {
    yPercent: -3,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.7 },
  });

  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
}
