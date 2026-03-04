/**
 * index.js — Home page interactivity
 * Features: Preloader, Accordion project list, Scroll-spy nav, Nav scroll shrink
 */

(function () {
  'use strict';

  // ── 1. Preloader ─────────────────────────────────────────
  const preloader = document.getElementById('preloader');
  const preloaderBar = document.getElementById('preloader-bar');
  const preloaderStatus = document.getElementById('preloader-status');

  const STAGES = [
    { label: 'Initialising', pct: 10 },
    { label: 'Loading assets', pct: 40 },
    { label: 'Rendering UI', pct: 75 },
    { label: 'Ready', pct: 100 },
  ];

  let stageIdx = 0;

  function advancePreloader() {
    if (stageIdx >= STAGES.length) return;
    const { label, pct } = STAGES[stageIdx++];
    preloaderBar.style.width = pct + '%';
    preloaderStatus.textContent = label;
  }

  // Tick through stages with staggered timing for a realistic feel
  advancePreloader();
  const stageTick = setInterval(() => {
    advancePreloader();
    if (stageIdx >= STAGES.length) clearInterval(stageTick);
  }, 320);

  function dismissPreloader() {
    clearInterval(stageTick);
    preloaderBar.style.width = '100%';
    preloaderStatus.textContent = 'Ready';
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 400);
  }

  // Dismiss on window load, with a minimum display time for effect
  const minShowTime = 1400; // ms
  const loadStart = Date.now();
  window.addEventListener('load', () => {
    const elapsed = Date.now() - loadStart;
    const wait = Math.max(0, minShowTime - elapsed);
    setTimeout(dismissPreloader, wait);
  });

  // Failsafe: always dismiss after 4s
  setTimeout(dismissPreloader, 4000);


  // ── 2. Render Project Rows ───────────────────────────────
  const list = document.getElementById('projects-list');

  function createImageMarkup(project) {
    if (project.thumbnail) {
      return `<img src="${project.thumbnail}" alt="${project.title} preview" loading="lazy" />`;
    }
    return `
      <div class="detail-image-placeholder" aria-hidden="true">
        <div class="placeholder-glyph">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="4" y="4" width="24" height="24" rx="3" stroke="#C0C0C0" stroke-width="1.5"/>
            <path d="M4 20l7-7 5 5 4-4 8 8" stroke="#C0C0C0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="11" cy="12" r="2" fill="#C0C0C0"/>
          </svg>
        </div>
      </div>`;
  }

  function renderProjects() {
    const fragment = document.createDocumentFragment();

    PROJECTS.forEach((project, idx) => {
      const row = document.createElement('div');
      row.className = 'project-row';
      row.dataset.id = project.id;

      const indexStr = String(idx + 1).padStart(2, '0');
      const tagsHTML = project.tags
        .map(tag => `<span class="detail-tag">${tag}</span>`)
        .join('');

      // Live At button — hidden if liveLink is "#"
      const liveBtn = (project.liveLink && project.liveLink !== '#')
        ? `<a href="${project.liveLink}" target="_blank" rel="noopener" class="btn-live-at">
                     Live At
                     <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                       <path d="M2 10L10 2M10 2H5M10 2v5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                     </svg>
                   </a>`
        : `<span class="btn-live-at" style="opacity:0.35;cursor:default" aria-label="No live link">
                     Live At
                     <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                       <path d="M2 10L10 2M10 2H5M10 2v5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                     </svg>
                   </span>`;

      row.innerHTML = `
        <div class="row-header" role="button" tabindex="0"
             aria-expanded="false"
             aria-controls="row-detail-${project.id}"
             id="row-btn-${project.id}">
          <span class="row-index">${indexStr}</span>
          <span class="row-title">${project.title}</span>
          <span class="row-category">${project.category}</span>
          <span class="row-year">${project.year}</span>
          <span class="row-chevron" aria-hidden="true">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </div>
        <div class="row-detail"
             id="row-detail-${project.id}"
             role="region"
             aria-labelledby="row-btn-${project.id}"
             aria-hidden="true">
          <div class="row-detail-inner">
            <div class="detail-image-wrap">
              ${createImageMarkup(project)}
            </div>
            <div class="detail-content">
              <p class="detail-summary">${project.summary}</p>
              <div class="detail-tags">${tagsHTML}</div>
              <div class="detail-actions">
                <a href="${project.link}" class="btn-case-study">
                  View Full Case Study
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </a>
                ${liveBtn}
              </div>
            </div>
          </div>
        </div>`;

      fragment.appendChild(row);
    });

    list.appendChild(fragment);
  }


  // ── 3. Accordion Logic ───────────────────────────────────
  let openRow = null;

  function closeRow(row) {
    row.classList.remove('is-open');
    row.querySelector('.row-header').setAttribute('aria-expanded', 'false');
    row.querySelector('.row-detail').setAttribute('aria-hidden', 'true');
  }

  function openRowEl(row) {
    row.classList.add('is-open');
    row.querySelector('.row-header').setAttribute('aria-expanded', 'true');
    row.querySelector('.row-detail').setAttribute('aria-hidden', 'false');
  }

  function handleRowClick(e) {
    // Don't toggle if user clicked a link inside the detail card
    if (e.target.closest('a, button')) {
      const isHeader = e.target.closest('.row-header');
      if (!isHeader) return;
    }

    const row = e.currentTarget.closest('.project-row');
    if (!row) return;

    const isAlreadyOpen = row.classList.contains('is-open');

    if (openRow && openRow !== row) {
      closeRow(openRow);
      openRow = null;
    }

    if (isAlreadyOpen) {
      closeRow(row);
      openRow = null;
    } else {
      openRowEl(row);
      openRow = row;
      setTimeout(() => {
        row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 50);
    }
  }

  function attachAccordionListeners() {
    document.querySelectorAll('.row-header').forEach(btn => {
      btn.addEventListener('click', handleRowClick);
      btn.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleRowClick(e);
        }
      });
    });
  }


  // ── 4. Nav Scroll Shrink + Scroll-Spy ───────────────────
  const navWrapper = document.getElementById('nav-wrapper');
  const navLinks = document.querySelectorAll('.nav-links a');

  // Map each nav link href → the DOM section it points to
  const sections = [];
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('mailto')) return;
    const id = href.replace('#', '').trim();
    const el = id ? document.getElementById(id) : document.getElementById('home');
    if (el) sections.push({ link, el });
  });

  function setActiveLink(activeLink) {
    navLinks.forEach(l => l.classList.remove('active'));
    if (activeLink) activeLink.classList.add('active');
  }

  let ticking = false;

  function onScroll() {
    const scrollY = window.scrollY;

    // Shrink nav
    navWrapper.classList.toggle('scrolled', scrollY > 60);

    // Scroll-spy: find the section whose top is closest to (and above) the viewport midpoint
    const viewMid = scrollY + window.innerHeight * 0.35;
    let bestLink = null;
    let bestBottom = -Infinity;

    sections.forEach(({ link, el }) => {
      const top = el.offsetTop;
      const bottom = top + el.offsetHeight;
      if (top <= viewMid && bottom > bestBottom) {
        bestBottom = bottom;
        bestLink = link;
      }
    });

    setActiveLink(bestLink);
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  // Run once on load to set initial active state
  onScroll();


  // ── 5. Init ──────────────────────────────────────────────
  renderProjects();
  attachAccordionListeners();

})();
