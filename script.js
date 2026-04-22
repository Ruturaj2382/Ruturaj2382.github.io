/**
 * Ruturaj Khamitkar — Portfolio Script
 * script.js
 *
 * Vanilla JS, no dependencies.
 * Handles: nav scroll, scroll reveal, smooth scroll, active nav links.
 */

(function () {
  'use strict';

  /* ── 1. Nav: add "scrolled" class after 50px ─────────────── */
  const nav = document.querySelector('nav');

  function handleNavScroll() {
    if (!nav) return;
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // run once on load in case page is already scrolled

  /* ── 2. Smooth scroll for anchor links ───────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const navHeight = nav ? nav.offsetHeight : 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });

  /* ── 3. Scroll reveal with IntersectionObserver ──────────── */

  // Elements to auto-tag with .reveal on page load
  const revealSelectors = [
    '.project-card',
    '.skill-category',
    '.roadmap-item',
    '.education-card',
    '.list-item',
  ];

  // Tag them
  revealSelectors.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      el.classList.add('reveal');
    });
  });

  // Observer
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active'); // Fixed from 'visible' to 'active' to match CSS
          // Once revealed, no need to keep observing
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  // Observe all .reveal elements (including those already in HTML + newly tagged)
  function observeRevealElements() {
    document.querySelectorAll('.reveal').forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  observeRevealElements();

  /* ── 4. Active nav link via IntersectionObserver ─────────── */
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    {
      threshold: 0.35,
    }
  );

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });

  /* ── 5. Skill tag glow on hover (JS-assisted) ────────────── */
  // The CSS handles the visual; this adds a brief "pulse" class for extra flair
  document.querySelectorAll('.skill-tag').forEach(function (tag) {
    tag.addEventListener('mouseenter', function () {
      this.style.boxShadow = '0 0 10px rgba(56, 189, 248, 0.4)'; // Updated to Cyan match
    });
    tag.addEventListener('mouseleave', function () {
      this.style.boxShadow = '';
    });
  });

})();
