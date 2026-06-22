/**
 * index.js — Home page interactivity
 * Features: Preloader, Accordion project list, Scroll-spy nav, Nav scroll shrink
 */

(function () {
  'use strict';

  // ── 0. Custom Cursor Logic ───────────────────────────────
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');
  let mouseX = 0, mouseY = 0;
  let dotX = 0, dotY = 0;
  let ringX = 0, ringY = 0;
  let lastX = 0, lastY = 0;
  let isMobile = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  if (!isMobile) {
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Fast movement detection for trail
      const dx = mouseX - lastX;
      const dy = mouseY - lastY;
      const speed = Math.sqrt(dx * dx + dy * dy);
      if (speed > 15) {
        createTrail(mouseX, mouseY);
      }
      lastX = mouseX;
      lastY = mouseY;
    });

    function createTrail(x, y) {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.left = x + 'px';
      trail.style.top = y + 'px';
      document.body.appendChild(trail);

      setTimeout(() => {
        trail.style.opacity = '0';
        trail.style.transform = 'translate(-50%, -50%) scale(0.1)';
        setTimeout(() => trail.remove(), 300);
      }, 50);
    }

    function animateCursor() {
      // Smooth following
      dotX += (mouseX - dotX) * 0.2;
      dotY += (mouseY - dotY) * 0.2;
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;

      if (cursorDot) {
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';
      }
      if (cursorRing) {
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
      }

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover detection for interactive elements
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('a, button, .row-header, .btn-live-at')) {
        document.body.classList.add('cursor-active');
      }
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest('a, button, .row-header, .btn-live-at')) {
        document.body.classList.remove('cursor-active');
      }
    });
  }

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
      const navWrapper = document.getElementById('nav-wrapper');
      if (navWrapper) navWrapper.classList.add('visible');
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


  // ── 4. Nav Scroll Shrink + Scroll-Spy (Observer) ────────
  const navWrapper = document.getElementById('nav-wrapper');
  const navLinks = document.querySelectorAll('.nav-links a');
  const navLogo = document.getElementById('nav-logo-trigger');

  let currentActiveLink = null;

  // Map each nav link href → the DOM section it points to
  const sections = [];
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href === '#' || href.startsWith('mailto')) return;
    const id = href.replace('#', '').trim();
    const el = document.getElementById(id);
    if (el) sections.push({ link, el });
  });

  const observerOptions = {
    threshold: 0.2, // More sensitive for tall About section
    rootMargin: "-10% 0px -40% 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    // If at the very top, target the Home link
    if (window.scrollY < 100) {
      const homeLink = document.querySelector('.nav-links a[href="#home"]');
      if (homeLink) {
        navLinks.forEach(l => l.classList.remove('active'));
        homeLink.classList.add('active');
        currentActiveLink = homeLink;
      }
      return;
    }

    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);

        if (activeLink && activeLink !== currentActiveLink) {
          navLinks.forEach(l => l.classList.remove('active'));
          activeLink.classList.add('active');
          currentActiveLink = activeLink;
        }
      }
    });
  }, observerOptions);

  sections.forEach(({ el }) => observer.observe(el));

  // ── Click Handle for Immediate Glint Sync ──
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      // Only smooth scroll if it's an anchor on the same page
      if (href && href.startsWith('#')) {
        const targetId = href.replace('#', '');
        const targetEl = document.getElementById(targetId);

        if (targetEl) {
          e.preventDefault();

          // Skip active class swap ONLY if it's the contact trigger
          // This keeps the Glint on Home/Work when the modal opens
          if (link.id !== 'nav-contact-trigger') {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            currentActiveLink = link; // Update currentActiveLink only if class is swapped
          }

          // Smooth Scroll
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
      // Non-anchor links (like about.html) will behave normally.
    });
  });

  let isScrolling = false;
  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        const scrolled = window.scrollY > 50; // Threshold: 50px Dead Zone
        navWrapper.classList.toggle('scrolled', scrolled);

        // Force Home state if at top
        if (window.scrollY < 100) {
          const homeLink = document.querySelector('.nav-links a[href="#home"]');
          if (homeLink) {
            navLinks.forEach(l => l.classList.remove('active'));
            homeLink.classList.add('active');
            currentActiveLink = homeLink;
          }
        }
        isScrolling = false;
      });
      isScrolling = true;
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    // No JS required for underline resize
  });

  // Initial state check
  setTimeout(() => {
    // CSS handles initial active state glint
  }, 100);


  // ── 8. Final Spring-Physics Skills Web ──────────────
  function initSkillsGraph() {
    const rootContainer = document.getElementById('skills-graph-root');
    const svgLayer = document.getElementById('skills-graph-lines');
    const columnRight = document.querySelector('.work-right');
    if (!rootContainer || !svgLayer) return;

    let expandedGroups = new Set();
    let isRootExpanded = false;
    const CENTER_NODE_ID = 'root';

    // Map of currently rendered node elements for coordinate tracking
    const nodeElements = new Map();
    const lineElements = [];

    // Refined Text Containment Logic
    function autoScaleText(el, radius, text) {
      const label = el.querySelector('.node-label');
      if (!label) return;

      const maxSize = el.classList.contains('lv-1') ? 12 : 10;
      // Formula: fontSize = Math.min(maxSize, (circleRadius * 2.2) / text.length)
      let fontSize = Math.min(maxSize, (radius * 2.2) / text.length);

      // Safety floor for readability
      if (fontSize < 6) fontSize = 6;

      label.style.fontSize = fontSize + 'px';

      // Final boundary check
      const maxWidth = radius * 1.8;
      while (label.offsetWidth > maxWidth && fontSize > 5) {
        fontSize -= 0.5;
        label.style.fontSize = fontSize + 'px';
      }
    }

    // Animation loop for live-stretching "Tether" lines
    function updateLines() {
      lineElements.forEach(lineObj => {
        const { line, parentId, childId } = lineObj;
        const parentEl = nodeElements.get(parentId);
        const childEl = nodeElements.get(childId);

        if (parentEl && childEl) {
          // Get live positions relative to rootContainer
          const pRect = parentEl.getBoundingClientRect();
          const rRect = rootContainer.getBoundingClientRect();
          const cRect = childEl.getBoundingClientRect();

          const x1 = pRect.left + pRect.width / 2 - rRect.left;
          const y1 = pRect.top + pRect.height / 2 - rRect.top;
          const x2 = cRect.left + cRect.width / 2 - rRect.left;
          const y2 = cRect.top + cRect.height / 2 - rRect.top;

          line.setAttribute("x1", x1);
          line.setAttribute("y1", y1);
          line.setAttribute("x2", x2);
          line.setAttribute("y2", y2);

          // Sync line visibility with child transition
          if (childEl.classList.contains('visible')) {
            line.classList.add('visible');
          } else {
            line.classList.remove('visible');
          }
        }
      });
      requestAnimationFrame(updateLines);
    }

    // Initialize all nodes once for smooth transitions
    function setupNodes() {
      rootContainer.innerHTML = '';
      svgLayer.innerHTML = '';
      nodeElements.clear();
      lineElements.length = 0;

      SKILLS.forEach(skill => {
        const el = document.createElement('div');
        el.className = `skill-node lv-${skill.level}`;

        // Apply group color to node circles
        const groupInfo = skill.level === 0 ? null : (skill.level === 1 ? skill : SKILLS.find(s => s.id === skill.parent));
        if (groupInfo && groupInfo.color) {
          el.style.backgroundColor = groupInfo.color;
          el.style.borderColor = `rgba(255, 255, 255, 0.1)`;
          el.setAttribute('data-group-color', groupInfo.color);
        }

        if (skill.level > 0) el.setAttribute('data-group', skill.level === 1 ? skill.id : skill.parent);
        el.innerHTML = `<span class="node-label">${skill.name}</span>`;

        // Initial state at center
        el.style.transform = `translate(-50%, -50%) scale(0)`;

        el.onclick = (e) => {
          e.stopPropagation();
          if (skill.id === CENTER_NODE_ID) {
            isRootExpanded = !isRootExpanded;
            if (!isRootExpanded) expandedGroups.clear();
          } else if (skill.level === 1) {
            if (expandedGroups.has(skill.id)) {
              expandedGroups.delete(skill.id);
            } else {
              expandedGroups.clear();
              expandedGroups.add(skill.id);
            }
          }
          refreshGraph();
        };

        rootContainer.appendChild(el);
        nodeElements.set(skill.id, el);

        if (skill.parent) {
          const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
          line.setAttribute("class", "skill-line-svg");

          // Inherit Group's specific color for the tether
          if (groupInfo && groupInfo.color) {
            line.style.stroke = groupInfo.color;
          } else {
            line.style.stroke = '#C0C0C0'; // Fallback to silver for root
          }

          svgLayer.appendChild(line);
          lineElements.push({ line, parentId: skill.parent, childId: skill.id });
        }
      });
    }

    function refreshGraph() {
      SKILLS.forEach(skill => {
        const el = nodeElements.get(skill.id);
        if (!el) return;

        let visible = false;
        let x = 0, y = 0;

        if (skill.id === CENTER_NODE_ID) {
          visible = true;
          x = 0; y = 0;
        } else if (skill.parent === CENTER_NODE_ID) {
          visible = isRootExpanded;
          const groups = SKILLS.filter(s => s.parent === CENTER_NODE_ID);
          const idx = groups.findIndex(s => s.id === skill.id);
          const angle = (idx / groups.length) * Math.PI * 2;
          x = Math.cos(angle) * 140;
          y = Math.sin(angle) * 140;
        } else {
          visible = expandedGroups.has(skill.parent);
          const siblings = SKILLS.filter(s => s.parent === skill.parent);
          const idx = siblings.findIndex(s => s.id === skill.id);
          const groups = SKILLS.filter(s => s.parent === CENTER_NODE_ID);
          const pIdx = groups.findIndex(s => s.id === skill.parent);
          const pAngle = (pIdx / groups.length) * Math.PI * 2;
          const spread = Math.PI * 0.5;
          const angle = pAngle - (spread / 2) + (idx / (siblings.length - 1 || 1)) * spread;
          x = Math.cos(angle) * 260;
          y = Math.sin(angle) * 260;
        }

        if (visible) {
          el.classList.add('visible');
          el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1)`;
        } else {
          el.classList.remove('visible');
          // Retract to parent or center
          let rx = 0, ry = 0;
          if (skill.parent && skill.parent !== CENTER_NODE_ID) {
            const groups = SKILLS.filter(s => s.parent === CENTER_NODE_ID);
            const pIdx = groups.findIndex(s => s.id === skill.parent);
            const pAngle = (pIdx / groups.length) * Math.PI * 2;
            rx = Math.cos(pAngle) * 140;
            ry = Math.sin(pAngle) * 140;
          }
          el.style.transform = `translate(calc(-50% + ${rx}px), calc(-50% + ${ry}px)) scale(0)`;
        }

        setTimeout(() => autoScaleText(el, el.offsetWidth / 2, skill.name), 0);
      });
    }

    if (columnRight) {
      columnRight.onclick = () => {
        isRootExpanded = false;
        expandedGroups.clear();
        refreshGraph();
      };
    }

    setupNodes();
    refreshGraph();
    requestAnimationFrame(updateLines);
    window.addEventListener('resize', refreshGraph);
  }

  // ── 10. Render Timeline (90-Degree Step Snake) ──────────
  function renderTimeline() {
    const container = document.getElementById('about-timeline');
    if (!container || typeof TIMELINE_DATA === 'undefined') return;

    container.innerHTML = '';
    const itemsPerRow = 5;
    const rows = [];

    // Group items into rows
    for (let i = 0; i < TIMELINE_DATA.length; i += itemsPerRow) {
      rows.push(TIMELINE_DATA.slice(i, i + itemsPerRow));
    }

    const fragment = document.createDocumentFragment();

    rows.forEach((rowData, rowIndex) => {
      const rowEl = document.createElement('div');
      const isEven = rowIndex % 2 === 0;
      const isLastRow = rowIndex === rows.length - 1;
      
      rowEl.className = `timeline-row ${isEven ? 'row-ltr' : 'row-rtl'}`;
      if (isLastRow) {
        rowEl.classList.add('last-row');
        rowEl.style.setProperty('--last-item-idx', rowData.length - 1);
      }

      rowData.forEach((item, itemIndex) => {
        const el = document.createElement('div');
        el.className = 'timeline-item';

        // Mark ends for vertical "step" connectors
        if (itemIndex === rowData.length - 1) el.classList.add('row-end');
        if (itemIndex === 0) el.classList.add('row-start');

        el.innerHTML = `
          <div class="timeline-dot" aria-hidden="true"></div>
          <div class="timeline-content">
            <p class="timeline-text">${item.activity}</p>
            <time class="timeline-date">${item.month} ${item.year}</time>
          </div>
        `;
        rowEl.appendChild(el);
      });

      fragment.appendChild(rowEl);
    });

    container.appendChild(fragment);
  }

  // ── 8b. Mobile: Collapsible Skills View ──────────────────
  function initCollapsibleSkills() {
    const categoriesContainer = document.getElementById('skills-categories');
    if (!categoriesContainer) return;

    // Get unique categories (Tier 2)
    const categories = SKILLS.filter(s => s.level === 1);
    
    categoriesContainer.innerHTML = '';

    categories.forEach(category => {
      // Get skills under this category
      const skills = SKILLS.filter(s => s.parent === category.id);
      
      const categoryEl = document.createElement('div');
      categoryEl.className = 'skill-category';
      categoryEl.setAttribute('data-group', category.id);

      const headerEl = document.createElement('div');
      headerEl.className = 'skill-category-header';
      headerEl.innerHTML = `
        <div class="skill-category-title">
          <div class="skill-category-icon"></div>
          <span>${category.name}</span>
        </div>
        <div class="skill-category-toggle">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 10 13 14 9"></polyline>
          </svg>
        </div>
      `;

      const skillsEl = document.createElement('div');
      skillsEl.className = 'skill-category-skills';
      
      const listEl = document.createElement('div');
      listEl.className = 'skill-list';
      
      skills.forEach(skill => {
        const tagEl = document.createElement('span');
        tagEl.className = 'skill-tag';
        tagEl.textContent = skill.name;
        listEl.appendChild(tagEl);
      });

      skillsEl.appendChild(listEl);
      categoryEl.appendChild(headerEl);
      categoryEl.appendChild(skillsEl);

      // Toggle functionality
      headerEl.addEventListener('click', () => {
        categoryEl.classList.toggle('active');
      });

      categoriesContainer.appendChild(categoryEl);
    });

    // Open first category by default on mobile
    const firstCategory = categoriesContainer.querySelector('.skill-category');
    if (firstCategory) {
      firstCategory.classList.add('active');
    }
  }

  // ── 9. Init All ──────────────────────────────────────────
  function init() {
    renderProjects();
    attachAccordionListeners();
    initSkillsGraph();
    initCollapsibleSkills();
    renderTimeline();

    setTimeout(() => {
      const list = document.getElementById('projects-list');
      if (list && list.children.length === 0) renderProjects();
    }, 500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ── 6. Contact Action Hub Logic ────────────────────────
  const modal = document.getElementById('contact');
  const modalClose = document.getElementById('modal-close');
  const modalOverlay = document.getElementById('modal-overlay');
  const hubCopyBtn = document.getElementById('hub-copy-btn');
  const navContactTrigger = document.getElementById('nav-contact-trigger');

  const EMAIL_ADDRESS = 'vedantbondekar@gmail.com';

  function openModal(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (navContactTrigger) navContactTrigger.addEventListener('click', openModal);
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

  // Modern copy with fallback
  async function copyToClipboard(text) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      return success;
    } catch (err) {
      console.error('Copy failed:', err);
      return false;
    }
  }

  if (hubCopyBtn) {
    hubCopyBtn.addEventListener('click', async () => {
      const success = await copyToClipboard(EMAIL_ADDRESS);
      if (success) {
        const originalText = hubCopyBtn.textContent;
        hubCopyBtn.textContent = 'Copied!';
        hubCopyBtn.style.background = 'var(--accent-hi)';
        hubCopyBtn.style.color = 'var(--bg)';
        setTimeout(() => {
          hubCopyBtn.textContent = originalText;
          hubCopyBtn.style.background = '';
          hubCopyBtn.style.color = '';
        }, 2000);
      }
    });
  }

  // ── 7. Footer One-Click Copy ────────────────────────────
  const footerEmailLink = document.getElementById('footer-email-link');
  const copyTooltip = document.getElementById('copy-tooltip');

  if (footerEmailLink) {
    footerEmailLink.addEventListener('click', async (e) => {
      e.preventDefault();
      const success = await copyToClipboard(EMAIL_ADDRESS);
      if (success) {
        footerEmailLink.classList.add('copied');
        if (copyTooltip) copyTooltip.classList.add('active');

        setTimeout(() => {
          footerEmailLink.classList.remove('copied');
          if (copyTooltip) copyTooltip.classList.remove('active');
        }, 1500);
      }
    });
  }

  // Handle Escape key for modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // ── 7. Interactive Hero Playground (Constellation Grid) ──
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let nodes = [];
    let mouse = { x: -1000, y: -1000 };
    let ripples = [];

    class Node {
      constructor(x, y) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
      }

      update() {
        // Subtle floating movement
        this.baseX += this.vx;
        this.baseY += this.vy;
        if (this.baseX < 0 || this.baseX > canvas.width) this.vx *= -1;
        if (this.baseY < 0 || this.baseY > canvas.height) this.vy *= -1;

        // Magnetic attraction to mouse
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 300;

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          this.x += dx * force * 0.04;
          this.y += dy * force * 0.04;
          this.glow = force;
        } else {
          // Return to base position more slowly for fluidity
          this.x += (this.baseX - this.x) * 0.03;
          this.y += (this.baseY - this.y) * 0.03;
          this.glow = 0;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1.5 + (this.glow * 1.5), 0, Math.PI * 2);
        const opacity = 0.4 + (this.glow * 0.6);
        ctx.fillStyle = `rgba(192, 192, 192, ${opacity})`;
        if (this.glow > 0.5) {
          ctx.shadowBlur = 10 * this.glow;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0; // Reset for performance
      }
    }

    function initCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      nodes = [];
      const count = Math.floor((canvas.width * canvas.height) / 8000);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      for (let i = 0; i < count; i++) {
        // Center-weighted distribution
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.sqrt(Math.random()) * (Math.min(canvas.width, canvas.height) * 0.4);
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        nodes.push(new Node(x, y));
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw ripples
      ripples = ripples.filter(r => r.life > 0);
      ripples.forEach(r => {
        r.radius += 5;
        r.life -= 0.02;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(192, 192, 192, ${r.life * 0.3})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Update and draw connections
      nodes.forEach((node, i) => {
        node.update();
        node.draw();

        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = node.x - nodeB.x;
          const dy = node.y - nodeB.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.strokeStyle = `rgba(192, 192, 192, ${(1 - dist / 150) * 0.4})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animate);
    }

    window.addEventListener('mousemove', (e) => {
      if (!canvas) return;

      const isHeroVisible = window.scrollY < (window.innerHeight * 0.8);

      // ── Particle Boundary Fix ──
      // Particles ONLY react if mouse is on the RIGHT HALF of the viewport AND Hero is visible
      if (isHeroVisible && e.clientX > window.innerWidth / 2) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;

        // Update CSS variables for grid glow on the hero section
        const hero = document.getElementById('home');
        if (hero) {
          const heroRect = hero.getBoundingClientRect();
          hero.style.setProperty('--mouse-x', `${e.clientX - heroRect.left}px`);
          hero.style.setProperty('--mouse-y', `${e.clientY - heroRect.top}px`);
          hero.style.setProperty('--glow-opacity', '1');
        }
      } else {
        // Return to idle state (Constellation Mode) if hero is hidden or mouse on left
        mouse.x = -1000;
        mouse.y = -1000;
        const hero = document.getElementById('home');
        if (hero) hero.style.setProperty('--glow-opacity', '0');
      }
    });

    window.addEventListener('mouseout', (e) => {
      if (!e.relatedTarget) {
        mouse.x = -1000;
        mouse.y = -1000;
        const hero = document.getElementById('home');
        if (hero) hero.style.setProperty('--glow-opacity', '0');
      }
    });

    canvas.addEventListener('mousedown', (e) => {
      const rect = canvas.getBoundingClientRect();
      ripples.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 0,
        life: 1
      });
    });

    window.addEventListener('resize', initCanvas);
    initCanvas();
    animate();
  }

})();
