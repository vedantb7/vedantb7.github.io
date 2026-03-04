/**
 * detail.js — Case Study Page Renderer
 * Reads ?id=N from URL, finds matching project in PROJECTS[], renders it.
 */

(function () {
    'use strict';

    const root = document.getElementById('case-root');

    function getProjectId() {
        const params = new URLSearchParams(window.location.search);
        return parseInt(params.get('id'), 10);
    }

    function renderImageMarkup(project) {
        if (project.thumbnail) {
            return `<img src="${project.thumbnail}" alt="${project.title} hero image" />`;
        }
        return `
      <div class="case-image-placeholder">
        <div class="placeholder-center">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <rect x="10" y="10" width="100" height="100" rx="12" stroke="#C0C0C0" stroke-width="1.5"/>
            <path d="M10 80l30-30 22 22 18-18 30 30" stroke="#C0C0C0" stroke-width="1.5"
                  stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="42" cy="46" r="8" fill="#C0C0C0"/>
          </svg>
        </div>
      </div>`;
    }

    function renderNotFound() {
        root.innerHTML = `
      <div class="error-section">
        <div class="error-code">404</div>
        <p class="error-msg">Project not found — it may have been moved or removed.</p>
        <a href="./index.html" class="btn-back-home" style="margin-top:16px">
          ← Back to Work
        </a>
      </div>`;
    }

    function renderProject(project) {
        // Build tags HTML
        const tagsHTML = project.tags
            .map(tag => `<span class="case-tag">${tag}</span>`)
            .join('');

        // Update page title
        document.title = `${project.title} — Vedant`;

        root.innerHTML = `
      <!-- Hero -->
      <header class="case-hero">
        <div class="case-hero-grid" aria-hidden="true"></div>
        <span class="case-category-badge">${project.category}</span>
        <h1 class="case-title">${project.title}</h1>
        <div class="case-meta-row">
          <div class="case-meta-item">
            <span class="case-meta-label">Year</span>
            <span class="case-meta-value">${project.year}</span>
          </div>
          <div class="case-meta-item">
            <span class="case-meta-label">Category</span>
            <span class="case-meta-value">${project.category}</span>
          </div>
          <div class="case-meta-item">
            <span class="case-meta-label">Stack</span>
            <span class="case-meta-value">${project.tags.join(', ')}</span>
          </div>
        </div>
      </header>

      <!-- Hero Image -->
      <section class="case-image-section" aria-label="Project image">
        <div class="case-image-wrap">
          ${renderImageMarkup(project)}
        </div>
      </section>

      <!-- Description -->
      <section class="case-content" aria-label="Project overview">
        <p class="case-content-label">Overview</p>
        <div class="case-description">
          ${project.description
                .split('\n\n')
                .map(p => `<p>${p.trim()}</p>`)
                .join('\n')}
        </div>
      </section>

      <!-- Tags -->
      <section class="case-tags-section" aria-label="Technologies used">
        <p class="case-tags-label">Technologies</p>
        <div class="case-tags">${tagsHTML}</div>
      </section>

      <!-- Footer -->
      <footer class="case-footer">
        <a href="./index.html" class="btn-back-home">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M9 2L4 7l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          All Projects
        </a>
        <p class="case-footer-copy">© 2025 Vedant.</p>
      </footer>`;
    }

    // ── Init ────────────────────────────────────────────────
    const id = getProjectId();
    const project = PROJECTS.find(p => p.id === id);

    if (project) {
        renderProject(project);
    } else {
        renderNotFound();
    }

})();
