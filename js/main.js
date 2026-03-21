/* ══════════════════════════════════════════════════════════════════════════
   Nuwan Dewasurendra - Portfolio Website
   main.js
   ══════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────────────────────────────
     PROJECT DATA  -  edit this object to update project content
  ───────────────────────────────────────────────────────────────────── */
  const PROJECT_DATA = {
    homebot: {
      title: 'Home Bot',
      tags: ['Python', 'AI Agent', 'Gemini API', 'Automation'],
      icon: '🤖',
      bannerStyle: 'blue',
      description:
        'An AI agent built with the Gemini API, browser-use, and Playwright. Manages personal tasks: planning schedules, monitoring weather, checking grades, and automating home devices based on context and time of day. Currently developing a second meta-agent that builds tools for Homebot and self-debugs using local LLMs.',
      highlights: [
        'Powered by Gemini API for natural language task management',
        'Browser automation via browser-use and Playwright',
        'Monitors weather, checks grades, and automates schedules',
        'Smart home device automation based on weather and time of day',
        'Second agent in development: builds tools & self-debugs with local LLMs',
      ],
      images: [],
      pdf: { url: 'assets/projects/homebot/homebot-doc.pdf', label: 'View Project Document' },
      github: null,
    },

    headsoccer: {
      title: 'Head Soccer',
      tags: ['Python', 'PyGame', 'PyMunk', 'Game Development'],
      icon: '⚽',
      bannerStyle: 'green',
      description:
        'A physics-based 2D soccer game built entirely in Python using PyGame and PyMunk. Players control characters that kick a ball into the opponent\'s goal. Features a real physics engine, sprite animation, collision detection, and full game state management. Active project maintained since 2021.',
      highlights: [
        'Real physics engine via PyMunk - ball momentum, gravity, and bounce',
        'PyGame sprite animation and smooth game loop',
        'Collision detection between players, ball, and all boundaries',
        'Scoring system with win/lose/reset state management',
        'Responsive keyboard controls with responsive input handling',
        'Active project maintained and expanded since 2021',
      ],
      images: [
        'assets/projects/headsoccer/screenshot-1.png',
        'assets/projects/headsoccer/screenshot-2.png',
        'assets/projects/headsoccer/screenshot-3.png',
        'assets/projects/headsoccer/screenshot-4.png',
      ],
      pdf: null,
      github: 'https://github.com/CampfireCoding/Head-Soccer',
    },

    lego: {
      title: 'LEGO Mechanics',
      tags: ['Engineering', 'LEGO Technic', 'Mechanical Design'],
      icon: '🧱',
      bannerStyle: 'orange',
      description:
        'A series of mechanical engineering explorations built with LEGO Technic - studying real engineering concepts like gear ratios, structural loading, torque, and kinematic linkages. Each build was designed to demonstrate a specific principle hands-on.',
      highlights: [
        'Gear ratio experiments exploring compound mechanical advantage',
        'Structural designs load-tested for strength and stability',
        'Kinematic linkages converting rotary to linear motion',
        'Modular builds that demonstrate engineering principles',
        // Photos coming - download from Google Photos album
      ],
      images: [
        // Add paths here once photos are downloaded from Google Photos:
        // 'assets/projects/lego/lego-1.jpg',
        // 'assets/projects/lego/lego-2.jpg',
      ],
      pdf: null,
      github: null,
    },

    snakegame: {
      title: 'Snake Game',
      tags: ['Python', 'PyGame', 'Game Development'],
      icon: '🐍',
      bannerStyle: 'green',
      description:
        'A full recreation of the classic Snake game built in Python using PyGame. The player controls a growing snake, eating food to increase score while avoiding collisions with the walls and itself. A clean, self-contained project focused on game loop design and input handling.',
      highlights: [
        'Classic Snake gameplay faithfully recreated from scratch',
        'Smooth game loop with frame-rate control via PyGame',
        'Randomized food spawning with collision detection',
        'Score tracking and game-over state management',
        'Clean, readable Python code - a great learning project',
      ],
      images: [],
      pdf: null,
      github: 'https://github.com/CampfireCoding/Google-Snake-Game',
    },

    eaglescout: {
      title: 'Eagle Scout & ASPL',
      tags: ['Leadership', 'Community Service', 'Scouting'],
      icon: '🦅',
      bannerStyle: 'olive',
      description:
        'Currently serving as Assistant Senior Patrol Leader (ASPL) for a troop of 100+ scouts - leading meetings, organizing outings, and guiding scouts through rank advancements. Achieved Life Rank on April 16, 2024. Holds 12 Eagle Merit Badges and 13 Regular Merit Badges.',
      highlights: [
        'Leading 100+ scouts as Assistant Senior Patrol Leader (ASPL)',
        'Organizing troop meetings, outings, and rank advancement programs',
        'Responsible for: Outing Program, Quartermaster, Outdoor Ethics, Order of the Arrow',
        'Life Rank achieved - April 16, 2024',
        '12 Eagle Merit Badges & 13 Regular Merit Badges',
        'National Youth Leadership Training graduate - Summer 2025',
      ],
      images: [],
      pdf: null,
      github: null,
    },
  };


  /* ─────────────────────────────────────────────────────────────────────
     INITIALIZATION
  ───────────────────────────────────────────────────────────────────── */
  function init() {
    initNavigation();
    initTypingAnimation();
    initScrollAnimations();
    initProjectModals();
    initResumeToggle();
    initContactForm();
    initFooterYear();
  }

  document.addEventListener('DOMContentLoaded', init);


  /* ─────────────────────────────────────────────────────────────────────
     NAVIGATION
  ───────────────────────────────────────────────────────────────────── */
  function initNavigation() {
    const nav = document.getElementById('nav');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav__link');
    const mobileLinks = document.querySelectorAll('.nav__mobile-link');
    const sections = document.querySelectorAll('main section[id]');
    const NAV_HEIGHT = 70;

    let ticking = false;

    function handleScroll() {
      const scrollY = window.scrollY;
      nav.classList.toggle('nav--scrolled', scrollY > 20);
      updateActiveLink(scrollY, sections, navLinks, NAV_HEIGHT);
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => { handleScroll(); ticking = false; });
        ticking = true;
      }
    });

    handleScroll();

    let menuOpen = false;

    function openMenu() {
      menuOpen = true;
      hamburger.classList.add('is-open');
      mobileMenu.classList.add('is-open');
      hamburger.setAttribute('aria-expanded', 'true');
      mobileMenu.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      menuOpen = false;
      hamburger.classList.remove('is-open');
      mobileMenu.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () => menuOpen ? closeMenu() : openMenu());
    mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuOpen) closeMenu();
    });
  }

  function updateActiveLink(scrollY, sections, navLinks, navHeight) {
    let currentId = '';
    const triggerOffset = navHeight + 80;

    sections.forEach(section => {
      if (scrollY >= section.offsetTop - triggerOffset) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('nav__link--active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('nav__link--active');
      }
    });
  }


  /* ─────────────────────────────────────────────────────────────────────
     TYPING ANIMATION
  ───────────────────────────────────────────────────────────────────── */
  function initTypingAnimation() {
    const typingEl = document.getElementById('typing-text');
    if (!typingEl) return;

    const phrases = ['Computer Scientist', 'Game Developer', 'AI Builder', 'Scout Leader', 'Nonprofit Founder'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
      const current = phrases[phraseIndex];
      charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
      typingEl.textContent = current.substring(0, charIndex);

      let delay = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === current.length) {
        delay = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 380;
      }

      setTimeout(typeLoop, delay);
    }

    setTimeout(typeLoop, 1000);
  }


  /* ─────────────────────────────────────────────────────────────────────
     SCROLL ANIMATIONS
  ───────────────────────────────────────────────────────────────────── */
  function initScrollAnimations() {
    document.querySelectorAll('.stagger-children').forEach(parent => {
      Array.from(parent.children).forEach((child, i) => {
        child.style.setProperty('--delay', `${i * 110}ms`);
        child.classList.add('fade-up');
      });
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
  }


  /* ─────────────────────────────────────────────────────────────────────
     PROJECT MODALS
  ───────────────────────────────────────────────────────────────────── */
  function initProjectModals() {
    const projectsGrid = document.getElementById('projects-grid');
    const modalContainer = document.getElementById('modal-container');
    if (!projectsGrid || !modalContainer) return;

    let lastFocusedElement = null;

    function openModal(projectId) {
      const data = PROJECT_DATA[projectId];
      if (!data) return;

      modalContainer.innerHTML = buildModalHTML(data);
      const overlay = modalContainer.querySelector('.modal-overlay');
      const closeBtn = modalContainer.querySelector('.modal-close');

      document.body.style.overflow = 'hidden';
      setTimeout(() => closeBtn && closeBtn.focus(), 60);

      closeBtn.addEventListener('click', closeModal);
      overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
      document.addEventListener('keydown', handleModalKeydown);
      trapFocus(overlay);
    }

    function closeModal() {
      const overlay = modalContainer.querySelector('.modal-overlay');
      if (!overlay) return;

      overlay.style.animation = 'overlayIn 0.18s ease reverse forwards';
      const content = overlay.querySelector('.modal-content');
      if (content) content.style.animation = 'modalIn 0.2s ease reverse forwards';

      setTimeout(() => {
        modalContainer.innerHTML = '';
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleModalKeydown);
        if (lastFocusedElement) lastFocusedElement.focus();
      }, 200);
    }

    function handleModalKeydown(e) {
      if (e.key === 'Escape') closeModal();
    }

    function trapFocus(container) {
      const focusable = Array.from(container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ));
      if (focusable.length < 2) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      container.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      });
    }

    // Event delegation
    projectsGrid.addEventListener('click', (e) => {
      const card = e.target.closest('.project-card');
      if (!card) return;
      lastFocusedElement = card;
      openModal(card.dataset.project);
    });

    projectsGrid.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const card = e.target.closest('.project-card');
      if (!card) return;
      e.preventDefault();
      lastFocusedElement = card;
      openModal(card.dataset.project);
    });
  }

  /* ─── BUILD MODAL HTML ────────────────────────────────────────────── */
  function buildModalHTML(data) {
    const images = data.images.filter(Boolean);
    const hasImages = images.length > 0;

    const tagsHTML = data.tags.map(t => `<span class="tag">${t}</span>`).join('');
    const highlightsHTML = data.highlights
      .filter(h => typeof h === 'string')
      .map(h => `<li>${escapeHtml(h)}</li>`).join('');

    // Action buttons
    const actionBtns = [];
    if (data.github) {
      actionBtns.push(`
        <a href="${data.github}" class="btn btn--primary" target="_blank" rel="noopener noreferrer">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink:0" aria-hidden="true">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
          View on GitHub
        </a>`);
    }
    if (data.pdf) {
      actionBtns.push(`<a href="${data.pdf.url}" class="btn btn--outline" target="_blank" rel="noopener noreferrer">${escapeHtml(data.pdf.label)}</a>`);
    }
    const actionsHTML = actionBtns.length
      ? `<div class="modal-actions">${actionBtns.join('')}</div>`
      : '';

    // Top section: image strip or decorative banner
    let topSection = '';
    if (hasImages) {
      const imgsHTML = images.map((src, i) =>
        `<img src="${src}" alt="${escapeHtml(data.title)} - screenshot ${i + 1}" loading="${i === 0 ? 'eager' : 'lazy'}">`
      ).join('');
      topSection = `<div class="modal-image-strip">${imgsHTML}</div>`;
    } else {
      const bannerColors = {
        blue:    'linear-gradient(135deg, #0d1b3e 0%, #1a2f5e 50%, #0d2440 100%)',
        green:   'linear-gradient(135deg, #0a2818 0%, #0d4025 50%, #0a2010 100%)',
        orange:  'linear-gradient(135deg, #2d1a05 0%, #4a2d0a 50%, #2d1505 100%)',
        olive:   'linear-gradient(135deg, #1a2208 0%, #2d3d10 50%, #141a06 100%)',
        default: 'linear-gradient(135deg, #1A1F2E 0%, #242938 100%)',
      };
      const bg = bannerColors[data.bannerStyle] || bannerColors.default;
      const initials = data.title.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
      topSection = `<div class="modal-banner" style="background: ${bg};" aria-hidden="true"><span class="modal-banner__icon">${initials}</span></div>`;
    }

    return `
      <div class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal-content">
          <button class="modal-close" aria-label="Close modal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" width="16" height="16" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
          ${topSection}
          <div class="modal-header">
            <h2 id="modal-title">${escapeHtml(data.title)}</h2>
            <div class="modal-tags">${tagsHTML}</div>
          </div>
          <div class="modal-body">
            <p>${escapeHtml(data.description)}</p>
            <ul class="modal-highlights">${highlightsHTML}</ul>
            ${actionsHTML}
          </div>
        </div>
      </div>`;
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(String(str)));
    return div.innerHTML;
  }


  /* ─────────────────────────────────────────────────────────────────────
     RESUME PDF TOGGLE
  ───────────────────────────────────────────────────────────────────── */
  function initResumeToggle() {
    const btn = document.getElementById('toggle-pdf-btn');
    const wrapper = document.getElementById('pdf-wrapper');
    if (!btn || !wrapper) return;

    btn.addEventListener('click', () => {
      const isHidden = wrapper.hasAttribute('hidden');
      if (isHidden) {
        wrapper.removeAttribute('hidden');
        btn.textContent = 'Collapse PDF';
        setTimeout(() => wrapper.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
      } else {
        wrapper.setAttribute('hidden', '');
        btn.textContent = 'View Full PDF Resume';
      }
    });
  }


  /* ─────────────────────────────────────────────────────────────────────
     CONTACT FORM
  ───────────────────────────────────────────────────────────────────── */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name    = form.querySelector('#contact-name').value.trim();
      const email   = form.querySelector('#contact-email').value.trim();
      const message = form.querySelector('#contact-message').value.trim();

      if (!name || !email || !message) {
        showFormFeedback(form, 'Please fill in all fields.', 'error'); return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showFormFeedback(form, 'Please enter a valid email address.', 'error'); return;
      }

      showFormFeedback(form, "Thanks! I'll get back to you soon.", 'success');
      form.reset();
    });
  }

  function showFormFeedback(form, message, type) {
    form.querySelector('.form-feedback')?.remove();
    const el = document.createElement('p');
    el.className = 'form-feedback';
    el.textContent = message;
    el.style.cssText = `font-size:.875rem;padding:.75rem 1rem;border-radius:8px;font-weight:500;${
      type === 'error'
        ? 'color:#ff6b6b;background:rgba(255,107,107,.1);border:1px solid rgba(255,107,107,.3);'
        : 'color:#4ECDC4;background:rgba(78,205,196,.1);border:1px solid rgba(78,205,196,.3);'
    }`;
    form.appendChild(el);
    setTimeout(() => el.remove(), 5000);
  }


  /* ─────────────────────────────────────────────────────────────────────
     FOOTER YEAR
  ───────────────────────────────────────────────────────────────────── */
  function initFooterYear() {
    const el = document.getElementById('footer-year');
    if (el) el.textContent = new Date().getFullYear();
  }

})();
