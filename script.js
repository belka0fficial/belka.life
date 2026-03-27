'use strict';

/* ============================================================
   HERO GRAPH MODULE
   Draws SVG lines: portrait → each skill node only.
   Hovering a node highlights all its connected lines.
   ============================================================ */
const HeroGraphModule = (() => {
  const LINE_COLOR       = '#242424';
  const LINE_COLOR_HOVER = 'rgba(208, 202, 194, 0.45)';
  const LINE_W           = '0.75';
  const LINE_W_HOVER     = '1.5';

  function getCenter(el, rect) {
    const r = el.getBoundingClientRect();
    return { x: r.left - rect.left + r.width / 2, y: r.top - rect.top + r.height / 2 };
  }

  function drawLines() {
    const svg      = document.getElementById('graph-svg');
    const portrait = document.getElementById('graph-portrait');
    const graph    = document.getElementById('hero-graph');
    if (!svg || !portrait || !graph) return;

    svg.innerHTML = '';
    const rect = graph.getBoundingClientRect();
    const pc   = getCenter(portrait, rect);

    document.querySelectorAll('.graph-node').forEach(node => {
      const icon = node.querySelector('.node-icon');
      if (!icon) return;
      const nc   = getCenter(icon, rect);
      const id   = node.dataset.domainId;
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', pc.x); line.setAttribute('y1', pc.y);
      line.setAttribute('x2', nc.x); line.setAttribute('y2', nc.y);
      line.setAttribute('stroke', LINE_COLOR);
      line.setAttribute('stroke-width', LINE_W);
      line.dataset.domainId = id;
      svg.appendChild(line);
    });
  }

  function setHover(domainId, on) {
    const line = document.querySelector(`#graph-svg line[data-domain-id="${domainId}"]`);
    if (!line) return;
    line.setAttribute('stroke',       on ? LINE_COLOR_HOVER : LINE_COLOR);
    line.setAttribute('stroke-width', on ? LINE_W_HOVER     : LINE_W);
  }

  // --- Pan / Zoom state ---

  let tx = 0, ty = 0, scale = 1;
  let isPanning = false, hasDragged = false;
  let panStartX = 0, panStartY = 0, panStartTx = 0, panStartTy = 0;
  const SCALE_MIN = 0.35, SCALE_MAX = 3.5;

  function applyTransform(animated) {
    const canvas = document.getElementById('graph-canvas');
    if (!canvas) return;
    canvas.style.transition = animated ? 'transform 450ms cubic-bezier(0,0,0.2,1)' : 'none';
    canvas.style.transform  = `translate(${tx}px, ${ty}px) scale(${scale})`;
    if (animated) setTimeout(drawLines, 460);
    else          drawLines();
  }

  function onPanStart(e) {
    if (!isMapMode()) return;
    if (e.button !== undefined && e.button !== 0) return;
    if (e.target.closest('.map-exit-bar, .map-mode-btn, .map-exit-btn')) return;
    isPanning  = true;
    hasDragged = false;
    panStartX  = e.clientX;
    panStartY  = e.clientY;
    panStartTx = tx;
    panStartTy = ty;
    document.body.classList.add('map-panning');
    window.addEventListener('pointermove', onPanMove);
    window.addEventListener('pointerup',   onPanEnd);
    window.addEventListener('pointercancel', onPanEnd);
  }

  function onPanMove(e) {
    if (!isPanning) return;
    const dx = e.clientX - panStartX;
    const dy = e.clientY - panStartY;
    if (!hasDragged && dx * dx + dy * dy > 16) hasDragged = true;
    if (!hasDragged) return;
    tx = panStartTx + dx;
    ty = panStartTy + dy;
    applyTransform(false);
  }

  function onPanEnd() {
    isPanning = false;
    document.body.classList.remove('map-panning');
    window.removeEventListener('pointermove', onPanMove);
    window.removeEventListener('pointerup',   onPanEnd);
    window.removeEventListener('pointercancel', onPanEnd);
  }

  function onWheel(e) {
    if (!isMapMode()) return;
    e.preventDefault();
    const factor   = e.deltaY < 0 ? 1.08 : 0.93;
    const newScale = Math.max(SCALE_MIN, Math.min(SCALE_MAX, scale * factor));
    const rect     = document.getElementById('hero-graph').getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    tx    = mx - (mx - tx) * (newScale / scale);
    ty    = my - (my - ty) * (newScale / scale);
    scale = newScale;
    applyTransform(false);
  }

  // --- Map mode ---

  function isMapMode() {
    return document.body.classList.contains('map-mode');
  }

  function enterMapMode() {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.body.classList.add('map-mode');
    document.getElementById('map-exit-bar').setAttribute('aria-hidden', 'false');
    setTimeout(() => document.getElementById('map-exit-btn').focus(), 420);
    // Hero height changes on mobile — wait two frames for layout then redraw lines
    requestAnimationFrame(() => requestAnimationFrame(drawLines));
  }

  function exitMapMode() {
    document.body.classList.remove('map-mode');
    document.getElementById('map-exit-bar').setAttribute('aria-hidden', 'true');
    // Animate canvas back to default position
    tx = 0; ty = 0; scale = 1;
    applyTransform(true);
    setTimeout(() => document.getElementById('map-mode-btn').focus(), 100);
  }

  function playIntroAnimation() {
    const svg      = document.getElementById('graph-svg');
    const portrait = document.getElementById('graph-portrait');
    const graph    = document.getElementById('hero-graph');
    if (!svg || !portrait || !graph) return;

    // Reduced motion: skip straight to final state
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      drawLines();
      return;
    }

    svg.innerHTML = '';
    const nodes = Array.from(document.querySelectorAll('.graph-node'));

    // Hide nodes immediately before paint
    nodes.forEach(n => {
      n.style.opacity   = '0';
      n.style.transform = 'translate(-50%,-50%) scale(0)';
      n.style.transition = 'none';
    });

    // Animate portrait in first
    portrait.style.animation = 'portrait-enter 600ms cubic-bezier(0.34, 1.2, 0.64, 1) forwards';
    setTimeout(() => {
      portrait.style.animation = '';
    }, 660);

    const LINE_START    = 320;   // ms — lines begin after portrait appears
    const LINE_DUR      = 380;   // ms per line draw
    const NODE_POP_DUR  = 560;   // ms for node spring
    const STAGGER       = 55;    // ms between each node

    requestAnimationFrame(() => {
      const rect = graph.getBoundingClientRect();
      const pc   = getCenter(portrait, rect);

      nodes.forEach((node, i) => {
        const icon = node.querySelector('.node-icon');
        if (!icon) return;
        const nc  = getCenter(icon, rect);
        const id  = node.dataset.domainId;
        const len = Math.hypot(nc.x - pc.x, nc.y - pc.y);

        // Create line, hidden via dashoffset
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', pc.x); line.setAttribute('y1', pc.y);
        line.setAttribute('x2', nc.x); line.setAttribute('y2', nc.y);
        line.setAttribute('stroke', LINE_COLOR);
        line.setAttribute('stroke-width', LINE_W);
        line.setAttribute('stroke-dasharray', len);
        line.setAttribute('stroke-dashoffset', len);
        line.dataset.domainId = id;
        svg.appendChild(line);

        const lineDelay = LINE_START + i * STAGGER;
        const nodeDelay = lineDelay + LINE_DUR;

        // Draw line: stroke-dashoffset → 0
        setTimeout(() => {
          line.style.transition = `stroke-dashoffset ${LINE_DUR}ms cubic-bezier(0.4, 0, 0.2, 1)`;
          line.setAttribute('stroke-dashoffset', '0');
          setTimeout(() => {
            line.style.transition = '';
            line.removeAttribute('stroke-dasharray');
            line.removeAttribute('stroke-dashoffset');
          }, LINE_DUR + 20);
        }, lineDelay);

        // Pop node when line arrives
        setTimeout(() => {
          node.style.transition = 'none';
          node.style.animation  = `node-pop ${NODE_POP_DUR}ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards`;
          setTimeout(() => {
            node.style.animation  = '';
            node.style.opacity    = '';
            node.style.transform  = '';
            node.style.transition = '';
          }, NODE_POP_DUR + 30);
        }, nodeDelay);
      });
    });
  }

  // Normal distribution random (Box-Muller), clamped to [0,1]
  function gaussianT(mean, std) {
    const u1 = Math.random(), u2 = Math.random();
    const z  = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return Math.max(0.04, Math.min(0.96, mean + z * std));
  }

  function randomizeNodePositions() {
    const nodes = Array.from(document.querySelectorAll('.graph-node'));
    const graph = document.getElementById('hero-graph');
    if (!graph || !nodes.length) return;

    const gw          = graph.offsetWidth;
    const gh          = graph.offsetHeight;
    const cx          = gw * 0.50;
    const cy          = gh * 0.44;
    const pad         = Math.min(gw, gh) * 0.04;
    const MIN_R       = Math.min(gw, gh) * 0.21;
    const MIN_BETWEEN = Math.min(gw, gh) * 0.14;

    const n          = nodes.length;
    const sectorSize = (Math.PI * 2) / n;

    // Shuffle sector → node assignment
    const order = Array.from({ length: n }, (_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }

    const placed = [];

    order.forEach((nodeIdx, sectorIdx) => {
      const node      = nodes[nodeIdx];
      const angleBase = sectorIdx * sectorSize;
      let bestX = 0, bestY = 0, bestScore = -Infinity;

      for (let attempt = 0; attempt < 35; attempt++) {
        const angle = angleBase + sectorSize * (0.08 + Math.random() * 0.84);
        const cosA  = Math.cos(angle);
        const sinA  = Math.sin(angle);

        let maxR = Infinity;
        if (cosA > 0) maxR = Math.min(maxR, (gw - pad - cx) / cosA);
        if (cosA < 0) maxR = Math.min(maxR, (pad - cx) / cosA);
        if (sinA > 0) maxR = Math.min(maxR, (gh - pad - cy) / sinA);
        if (sinA < 0) maxR = Math.min(maxR, (pad - cy) / sinA);
        maxR = Math.max(maxR, MIN_R + 10);

        // t ~ normal(0.5, 0.22): most nodes near medium, few very close or far
        const t = gaussianT(0.5, 0.22);
        const R = MIN_R + t * (maxR - MIN_R);
        const x = cx + R * cosA;
        const y = cy + R * sinA;

        // Score = min distance to all placed nodes
        let minD = Infinity;
        for (const p of placed) minD = Math.min(minD, Math.hypot(x - p.x, y - p.y));
        if (placed.length === 0) minD = Infinity;

        if (minD > bestScore) {
          bestScore = minD;
          bestX = x; bestY = y;
          if (minD >= MIN_BETWEEN) break;
        }
      }

      placed.push({ x: bestX, y: bestY });
      node.style.setProperty('--nx', ((bestX / gw) * 100).toFixed(1) + '%');
      node.style.setProperty('--ny', ((bestY / gh) * 100).toFixed(1) + '%');
    });
  }

  function init() {
    randomizeNodePositions();
    playIntroAnimation();

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(drawLines, 80);
    }, { passive: true });

    document.querySelectorAll('.graph-node').forEach(node => {
      const id = node.dataset.domainId;
      node.addEventListener('mouseenter', () => setHover(id, true));
      node.addEventListener('mouseleave', () => setHover(id, false));
      node.addEventListener('focus',      () => setHover(id, true));
      node.addEventListener('blur',       () => setHover(id, false));
      node.addEventListener('click',      () => { if (!hasDragged) ModalModule.open(id); });
    });

    // Portrait click → enter map mode (guard against drag)
    const portrait = document.getElementById('graph-portrait');
    portrait.addEventListener('click', () => { if (!hasDragged && !isMapMode()) enterMapMode(); });
    portrait.addEventListener('keydown', e => {
      if ((e.key === 'Enter' || e.key === ' ') && !isMapMode()) {
        e.preventDefault();
        enterMapMode();
      }
    });

    document.getElementById('map-mode-btn').addEventListener('click', enterMapMode);
    document.getElementById('map-exit-btn').addEventListener('click', exitMapMode);

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && isMapMode() && !document.getElementById('modal-overlay').classList.contains('is-open')) {
        exitMapMode();
      }
    });

    // Pan / zoom listeners on the hero section
    const heroEl = document.getElementById('hero');
    heroEl.addEventListener('pointerdown', onPanStart);
    heroEl.addEventListener('wheel', onWheel, { passive: false });
  }

  return { init, drawLines, enterMapMode, exitMapMode };
})();

/* ============================================================
   NAV MODULE
   ============================================================ */
const NavModule = (() => {
  function init() {
    const nav = document.getElementById('nav');
    const hamburger = document.querySelector('.nav-hamburger');
    const links = document.getElementById('nav-links');

    // sticky background on scroll
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });

    // mobile hamburger toggle
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      links.classList.toggle('open', isOpen);
    });

    // close nav on link click (mobile)
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        links.classList.remove('open');
      });
    });

    // smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  return { init };
})();

/* ============================================================
   SCROLL REVEAL MODULE
   ============================================================ */
const ScrollReveal = (() => {
  let observer = null;

  function init() {
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
  }

  function observe(el) {
    if (observer) observer.observe(el);
  }

  return { init, observe };
})();

/* ============================================================
   FEED MODULE
   ============================================================ */
const FeedModule = (() => {
  let currentFilter = 'all';
  let visibleCount = DATA.feedInitialCount;

  function getFiltered() {
    if (currentFilter === 'all') return DATA.feed;
    return DATA.feed.filter(item => item.type === currentFilter);
  }

  function buildItem(item) {
    const el = document.createElement('article');
    el.className = 'feed-item reveal-on-scroll';
    el.dataset.type = item.type;
    el.dataset.domain = item.domain;
    el.innerHTML = `
      <div class="feed-item-meta">
        <span class="feed-tag feed-tag--${item.type}">${item.type.toUpperCase()}</span>
        <span class="feed-domain-tag feed-domain-tag--${item.domain}">${item.domain.toUpperCase()}</span>
        <time class="feed-date" datetime="${item.date}">${item.dateDisplay}</time>
      </div>
      <h3 class="feed-item-title">${item.title}</h3>
      <p class="feed-item-desc">${item.desc}</p>
    `;
    return el;
  }

  function render() {
    const list = document.getElementById('feed-list');
    const items = getFiltered().slice(0, visibleCount);
    list.innerHTML = '';
    items.forEach(item => {
      const el = buildItem(item);
      list.appendChild(el);
      ScrollReveal.observe(el);
    });

    const loadMoreBtn = document.getElementById('feed-load-more');
    loadMoreBtn.style.display = visibleCount >= getFiltered().length ? 'none' : '';
  }

  function setFilter(type) {
    currentFilter = type;
    visibleCount = DATA.feedInitialCount;
    render();
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === type);
    });
  }

  function init() {
    render();

    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => setFilter(btn.dataset.filter));
    });

    document.getElementById('feed-load-more').addEventListener('click', () => {
      visibleCount += DATA.feedInitialCount;
      render();
    });
  }

  return { init };
})();

/* ============================================================
   MODAL MODULE
   ============================================================ */
const ModalModule = (() => {
  const overlay   = document.getElementById('modal-overlay');
  const body      = document.getElementById('modal-body');
  const titleEl   = document.getElementById('modal-domain-title');
  const iconEl    = document.getElementById('modal-domain-icon');
  let lastFocus   = null;
  let savedScroll = 0;

  // --- Section builders ---

  function buildPlatformBar(links) {
    if (!links || !links.length) return '';
    const html = links.map(l =>
      `<a class="modal-platform-link" href="${l.url}" target="_blank" rel="noopener noreferrer">${l.label} ↗</a>`
    ).join('');
    return `<div class="modal-platform-bar">${html}</div>`;
  }

  function buildMetrics(metrics) {
    if (!metrics || !metrics.length) return '';
    const cards = metrics.map(m => `
      <div class="metric-card">
        <span class="metric-value">${m.value}</span>
        <span class="metric-label">${m.label}</span>
      </div>`).join('');
    return `<div class="modal-metrics">${cards}</div>`;
  }

  function buildAchievements(achievements) {
    if (!achievements || !achievements.length) return '';
    const items = achievements.map(a => `
      <li class="achievement-item">
        <time class="achievement-date">${a.date}</time>
        <span class="achievement-text">${a.text}</span>
      </li>`).join('');
    return `
      <div class="modal-achievements">
        <h3 class="modal-section-title">ACHIEVEMENT LOG</h3>
        <ul class="achievement-list" role="list">${items}</ul>
      </div>`;
  }

  function buildSessions(sessions) {
    if (!sessions || !sessions.length) return '';
    const items = sessions.map(s => `
      <li class="session-item">
        <time class="session-date">${s.date}</time>
        <div class="session-info">
          <span class="session-main">${s.type}${s.exercises ? ` — ${s.exercises}` : ''}</span>
          ${s.result ? `<span class="session-detail">${s.games !== undefined ? `${s.games} games · ` : ''}${s.result}</span>` : ''}
        </div>
        <span class="session-duration">${s.duration}</span>
      </li>`).join('');
    return `
      <div class="modal-sessions">
        <h3 class="modal-section-title">RECENT SESSIONS</h3>
        <ul class="session-list" role="list">${items}</ul>
      </div>`;
  }

  function buildTimeline(items) {
    if (!items || !items.length) return '<p class="proof-empty">No entries yet.</p>';
    return items.map(t => `
      <li class="timeline-item">
        <time class="timeline-date">${t.date}</time>
        <span class="timeline-event">${t.event}</span>
      </li>`).join('');
  }

  function buildSocialPosts(posts) {
    if (!posts || !posts.length) return '';
    const cards = posts.map(p => `
      <a class="social-post-card" href="${p.url}" target="_blank" rel="noopener noreferrer" aria-label="${p.caption}">
        <div class="social-post-thumb">${p.icon || '📸'}</div>
        <div class="social-post-overlay">
          <p class="social-post-caption">${p.caption}</p>
          <time class="social-post-date">${p.date}</time>
        </div>
      </a>`).join('');
    return `
      <div class="modal-social">
        <h3 class="modal-section-title">INSTAGRAM</h3>
        <div class="social-posts-grid">${cards}</div>
        <a class="social-see-more" href="https://instagram.com/belka0fficial" target="_blank" rel="noopener noreferrer">VIEW ALL ON INSTAGRAM ↗</a>
      </div>`;
  }

  // --- Live API fetches ---

  async function fetchChessLive(username, container) {
    try {
      const res = await fetch(`https://api.chess.com/pub/player/${username}/stats`);
      if (!res.ok) throw new Error('non-ok');
      const d = await res.json();
      const rapid  = d.chess_rapid?.last?.rating  ?? '—';
      const blitz  = d.chess_blitz?.last?.rating  ?? '—';
      const bullet = d.chess_bullet?.last?.rating ?? '—';
      const puzzle = d.tactics?.highest?.rating   ?? '—';
      container.innerHTML = `
        <div class="elo-grid">
          <div class="elo-card"><span class="elo-value">${rapid}</span><span class="elo-label">RAPID</span></div>
          <div class="elo-card"><span class="elo-value">${blitz}</span><span class="elo-label">BLITZ</span></div>
          <div class="elo-card"><span class="elo-value">${bullet}</span><span class="elo-label">BULLET</span></div>
          <div class="elo-card"><span class="elo-value">${puzzle}</span><span class="elo-label">PUZZLES</span></div>
        </div>
        <span class="elo-source">Live from Chess.com · updated now</span>`;
    } catch {
      container.innerHTML = '<p class="proof-empty">Live data unavailable — check Chess.com directly.</p>';
    }
  }

  async function fetchGithubLive(username, container) {
    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) throw new Error('non-ok');
      const d = await res.json();
      const repos     = d.public_repos ?? '—';
      const followers = d.followers    ?? '—';
      const since     = d.created_at   ? new Date(d.created_at).getFullYear() : '—';
      container.innerHTML = `
        <div class="github-stats">
          <div class="github-stat"><span class="github-stat-value">${repos}</span><span class="github-stat-label">PUBLIC REPOS</span></div>
          <div class="github-stat"><span class="github-stat-value">${followers}</span><span class="github-stat-label">FOLLOWERS</span></div>
          <div class="github-stat"><span class="github-stat-value">${since}</span><span class="github-stat-label">SINCE</span></div>
        </div>
        <span class="elo-source">Live from GitHub · updated now</span>`;
    } catch {
      container.innerHTML = '<p class="proof-empty">Live data unavailable — check GitHub directly.</p>';
    }
  }

  // --- Main populate ---

  function populate(domain) {
    overlay.style.setProperty('--modal-accent', `var(${domain.accentVar || '--accent'})`);
    titleEl.textContent = domain.name;
    iconEl.textContent  = domain.icon;

    const cfg = domain.apiConfig;
    const liveTitle = cfg
      ? (cfg.type === 'chess' ? 'LIVE — CHESS.COM RATINGS' : 'LIVE — GITHUB')
      : '';

    body.innerHTML = `
      ${buildPlatformBar(domain.proofLinks)}
      <div class="modal-overview">
        <p class="modal-desc">${domain.overview || ''}</p>
      </div>
      ${buildMetrics(domain.metrics)}
      ${cfg ? `
        <div class="modal-live-section">
          <h3 class="modal-section-title">${liveTitle}</h3>
          <div id="modal-live-data" class="modal-live-loading">FETCHING LIVE DATA…</div>
        </div>` : ''}
      ${buildAchievements(domain.achievements)}
      ${buildSessions(domain.sessions)}
      <div class="modal-timeline">
        <h3 class="modal-section-title">PROGRESS TIMELINE</h3>
        <ul class="timeline-list" role="list">${buildTimeline(domain.timeline)}</ul>
      </div>
      ${buildSocialPosts(domain.socialPosts)}
    `;

    if (cfg) {
      const liveEl = document.getElementById('modal-live-data');
      if (liveEl) {
        if (cfg.type === 'chess')  fetchChessLive(cfg.username, liveEl);
        if (cfg.type === 'github') fetchGithubLive(cfg.username, liveEl);
      }
    }
  }

  function open(domainId) {
    const domain =
      DATA.domains.find(d => d.id === domainId) ||
      DATA.secondaryDomains.find(d => d.id === domainId);
    if (!domain) return;

    lastFocus   = document.activeElement;
    savedScroll = window.scrollY;

    populate(domain);

    // iOS scroll lock
    document.body.style.top = `-${savedScroll}px`;
    document.body.classList.add('modal-open');

    overlay.setAttribute('aria-hidden', 'false');
    overlay.classList.add('is-open');

    // scroll modal to top on reopen
    const container = overlay.querySelector('.modal-container');
    container.scrollTop = 0;

    // focus close button
    overlay.querySelector('.modal-close').focus();
  }

  function close() {
    overlay.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('is-open');

    // restore scroll — must clear top before removing modal-open
    document.body.style.top = '';
    document.body.classList.remove('modal-open');
    window.scrollTo(0, savedScroll);

    if (lastFocus) lastFocus.focus();
  }

  function trapFocus(e) {
    if (e.key !== 'Tab') return;
    const focusable = [
      ...overlay.querySelectorAll('button, a[href], input, [tabindex]:not([tabindex="-1"])')
    ].filter(el => !el.closest('[aria-hidden="true"]'));

    if (!focusable.length) return;
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function init() {
    overlay.querySelector('.modal-close').addEventListener('click', close);

    // click outside container closes modal
    overlay.addEventListener('click', e => {
      if (e.target === overlay) close();
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) close();
    });

    overlay.addEventListener('keydown', trapFocus);
  }

  return { init, open, close };
})();

/* ============================================================
   DOMAINS MODULE
   ============================================================ */
const DomainsModule = (() => {
  function buildCard(domain) {
    const el = document.createElement('article');
    el.className = 'domain-card reveal-on-scroll';
    el.dataset.domainId = domain.id;
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'listitem');
    el.setAttribute('aria-label', `${domain.name} — view domain details`);

    const hoverStatsHtml = (domain.hoverStats || []).map(s => `
      <div class="hover-stat">
        <span class="hover-stat-label">${s.label}</span>
        <span class="hover-stat-value">${s.value}</span>
      </div>
    `).join('');

    el.innerHTML = `
      <div class="domain-card-top">
        <span class="domain-icon" aria-hidden="true">${domain.icon}</span>
        <span class="domain-status-badge status--${domain.status}">${domain.status.toUpperCase()}</span>
      </div>
      <h3 class="domain-name">${domain.name}</h3>
      <p class="domain-subtitle">${domain.subtitle}</p>
      <div class="domain-latest">
        <span class="domain-latest-label">LATEST</span>
        <span class="domain-latest-value">${domain.latestMilestone}</span>
      </div>
      <div class="domain-hover-stats" aria-hidden="true">${hoverStatsHtml}</div>
      <button class="domain-view-btn" data-domain-id="${domain.id}" aria-label="View ${domain.name} domain">VIEW →</button>
    `;

    // VIEW → opens full-screen skill page
    el.querySelector('.domain-view-btn').addEventListener('click', e => {
      e.stopPropagation();
      window.location.href = `skill.html?id=${domain.id}`;
    });

    // keyboard: Enter or Space on the card itself → skill page
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.location.href = `skill.html?id=${domain.id}`;
      }
    });

    return el;
  }

  function init() {
    const grid = document.querySelector('.domains-grid');
    DATA.domains.forEach(d => grid.appendChild(buildCard(d)));

    // secondary domains toggle
    const toggle      = document.querySelector('.secondary-toggle');
    const secondGrid  = document.querySelector('.secondary-grid');
    let   rendered    = false;

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      const nowOpen = !isOpen;

      toggle.setAttribute('aria-expanded', String(nowOpen));
      secondGrid.hidden = !nowOpen;
      toggle.textContent = nowOpen ? '− SECONDARY DOMAINS' : '+ SECONDARY DOMAINS';

      if (nowOpen && !rendered) {
        DATA.secondaryDomains.forEach(d => {
          const card = buildCard(d);
          secondGrid.appendChild(card);
          ScrollReveal.observe(card);
        });
        rendered = true;
      }
    });
  }

  return { init };
})();

/* ============================================================
   ECOSYSTEM MODULE
   ============================================================ */
const EcosystemModule = (() => {
  function buildCard(item) {
    const el = document.createElement('a');
    el.className = 'ecosystem-card reveal-on-scroll';
    el.href = item.url;
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
    el.setAttribute('role', 'listitem');
    el.setAttribute('aria-label', `${item.platform} — ${item.handle}`);

    el.innerHTML = `
      <div class="ecosystem-icon" aria-hidden="true">${item.icon}</div>
      <div class="ecosystem-info">
        <span class="ecosystem-platform">${item.platform}</span>
        <span class="ecosystem-handle">${item.handle}</span>
      </div>
      <span class="ecosystem-status ecosystem-status--${item.status}">${item.status.toUpperCase()}</span>
      <span class="ecosystem-arrow" aria-hidden="true">↗</span>
    `;

    return el;
  }

  function init() {
    const grid = document.querySelector('.ecosystem-grid');
    DATA.ecosystem.forEach(item => grid.appendChild(buildCard(item)));
  }

  return { init };
})();

/* ============================================================
   PROJECTS MODULE
   ============================================================ */
const ProjectsModule = (() => {
  function buildCard(p) {
    const card = document.createElement('div');
    card.className = 'project-card reveal-on-scroll';
    card.setAttribute('role', 'listitem');

    const stackHTML = p.stack.map(t => `<span class="project-tag">${t}</span>`).join('');
    const linkHTML  = p.url
      ? `<a class="project-link-btn" href="${p.url}" target="_blank" rel="noopener noreferrer">VIEW ↗</a>`
      : '';

    card.innerHTML = `
      <div class="project-card-top">
        <span class="project-icon" aria-hidden="true">${p.icon}</span>
        <div class="project-badges">
          <span class="project-category">${p.category}</span>
          <span class="project-status project-status--${p.status}">${p.status.toUpperCase()}</span>
        </div>
      </div>
      <h3 class="project-name">${p.name}</h3>
      <p class="project-desc">${p.desc}</p>
      <div class="project-stack">${stackHTML}</div>
      ${linkHTML}
    `;
    return card;
  }

  function init() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    DATA.projects.forEach(p => {
      const card = buildCard(p);
      grid.appendChild(card);
      ScrollReveal.observe(card);
    });
  }

  return { init };
})();

/* ============================================================
   ABOUT MODULE
   ============================================================ */
const AboutModule = (() => {
  function buildStatGrid(container, items) {
    items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'about-stat-item';
      div.innerHTML = `
        <span class="about-stat-val">${item.value}</span>
        <span class="about-stat-key">${item.label}</span>
      `;
      container.appendChild(div);
    });
  }

  function init() {
    const p = DATA.profile;
    if (!p) return;

    const bioEl = document.getElementById('about-bio');
    if (bioEl) bioEl.textContent = p.bio;

    const stackEl = document.getElementById('about-stack-tags');
    if (stackEl) {
      p.stack.forEach(t => {
        const span = document.createElement('span');
        span.className = 'about-stack-tag';
        span.textContent = t;
        stackEl.appendChild(span);
      });
    }

    const physEl = document.getElementById('about-physical');
    if (physEl) buildStatGrid(physEl, p.physical);

    const strengthEl = document.getElementById('about-strength');
    if (strengthEl) buildStatGrid(strengthEl, p.strength);

    const goalsEl = document.getElementById('about-goals');
    if (goalsEl) {
      p.goals.forEach(g => {
        const li = document.createElement('li');
        li.className = 'about-goal-item';
        li.textContent = g;
        goalsEl.appendChild(li);
      });
    }

    document.querySelectorAll('.about-block').forEach(el => ScrollReveal.observe(el));
  }

  return { init };
})();

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Set footer year
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Boot modules
  NavModule.init();
  ModalModule.init();        // must init before HeroGraphModule (nodes call ModalModule.open)
  HeroGraphModule.init();
  FeedModule.init();
  DomainsModule.init();
  ProjectsModule.init();
  AboutModule.init();
  EcosystemModule.init();

  // Scroll reveal runs last — after all modules have rendered initial content
  ScrollReveal.init();
});
