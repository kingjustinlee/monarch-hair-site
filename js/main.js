/* ============================================================
   MONARCH VITALITY — INTERACTIVE BEHAVIORS
   ============================================================ */

(function () {
    'use strict';

    // ---------- Sticky nav background on scroll ----------
    const nav = document.getElementById('nav');
    const onScroll = () => {
        if (window.scrollY > 24) nav.classList.add('is-scrolled');
        else nav.classList.remove('is-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ---------- Mobile menu toggle ----------
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isOpen = navToggle.classList.toggle('is-open');
            navLinks.classList.toggle('is-open');
            navToggle.setAttribute('aria-expanded', isOpen);
        });
        // Close on link click
        navLinks.querySelectorAll('a').forEach(a =>
            a.addEventListener('click', () => {
                navToggle.classList.remove('is-open');
                navLinks.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
            })
        );
    }

    // ---------- Reveal animations ----------
    // Hero reveals: trigger with staggered delay after page load.
    // Scroll reveals (on explicitly marked elements): trigger via IntersectionObserver.
    const heroEls = document.querySelectorAll('.hero .reveal');
    heroEls.forEach((el) => {
        const delay = parseInt(el.dataset.delay || '0', 10);
        setTimeout(() => el.classList.add('is-visible'), delay);
    });

    const nonHeroReveals = Array.from(document.querySelectorAll('.reveal'))
        .filter(el => !el.closest('.hero'));

    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });
        nonHeroReveals.forEach(el => io.observe(el));
    } else {
        // Fallback: reveal everything immediately
        nonHeroReveals.forEach(el => el.classList.add('is-visible'));
    }

})();
