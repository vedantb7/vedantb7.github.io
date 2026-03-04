/**
 * index.js — Home page interactivity
 * Handles: accordion project list, nav scroll shrink
 */

(function () {
    'use strict';

    // ── 1. Render Project Rows ───────────────────────────────
    const list = document.getElementById('projects-list');

    function createImageMarkup(project) {
        if (project.thumbnail) {
            return `<img src="${project.thumbnail}" alt="${project.title} preview" loading="lazy" />`;
        }
        // CSS placeholder for projects without images
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
              <a href="${project.link}" class="btn-case-study">
                View Full Case Study
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>`;

            fragment.appendChild(row);
        });

        list.appendChild(fragment);
    }

    // ── 2. Accordion Logic ───────────────────────────────────
    let openRow = null; // Track the currently open row

    function closeRow(row) {
        row.classList.remove('is-open');
        const btn = row.querySelector('.row-header');
        const detail = row.querySelector('.row-detail');
        btn.setAttribute('aria-expanded', 'false');
        detail.setAttribute('aria-hidden', 'true');
    }

    function openRowEl(row) {
        row.classList.add('is-open');
        const btn = row.querySelector('.row-header');
        const detail = row.querySelector('.row-detail');
        btn.setAttribute('aria-expanded', 'true');
        detail.setAttribute('aria-hidden', 'false');
    }

    function handleRowClick(e) {
        const row = e.currentTarget.closest('.project-row');
        if (!row) return;

        const isAlreadyOpen = row.classList.contains('is-open');

        // Clean Exit: close any open row first
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
            // Smooth-scroll the row into view if it's below the fold
            setTimeout(() => {
                row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 50);
        }
    }

    function attachAccordionListeners() {
        document.querySelectorAll('.row-header').forEach(btn => {
            btn.addEventListener('click', handleRowClick);
            // Keyboard accessibility
            btn.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleRowClick(e);
                }
            });
        });
    }

    // ── 3. Nav Scroll Shrink ─────────────────────────────────
    const navWrapper = document.getElementById('nav-wrapper');
    const SCROLL_THRESHOLD = 60;
    let ticking = false;

    function updateNav() {
        const scrolled = window.scrollY > SCROLL_THRESHOLD;
        navWrapper.classList.toggle('scrolled', scrolled);
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNav);
            ticking = true;
        }
    }, { passive: true });

    // ── 4. Init ──────────────────────────────────────────────
    renderProjects();
    attachAccordionListeners();

})();
