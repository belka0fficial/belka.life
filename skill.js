'use strict';

/* ============================================================
   SKILL PAGE — reads ?id= from URL, loads SKILL_DATA, renders
   ============================================================ */

// --- Helpers ---

function hex2rgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function el(id) { return document.getElementById(id); }

// --- Routing ---

function getDomainId() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id') || 'chess';
}

// --- Section renderers ---

function renderNav(d) {
  el('sk-nav-domain').textContent = d.icon + '  ' + d.name;
  const ext = el('sk-nav-ext');
  ext.textContent = d.externalLabel + ' ↗';
  ext.href = d.externalUrl;
}

function renderHero(d) {
  el('sk-hero-icon').textContent    = d.icon;
  el('sk-hero-name').textContent    = d.name;
  el('sk-hero-subtitle').textContent = d.subtitle;
  el('sk-status-badge').textContent = '● ' + d.status.toUpperCase();
  el('sk-since').textContent        = 'est. ' + d.since;

  const statsEl = el('sk-quick-stats');
  statsEl.innerHTML = '';
  (d.quickStats || []).forEach(s => {
    const card = document.createElement('div');
    card.className = 'sk-stat-card';
    card.setAttribute('role', 'listitem');
    card.innerHTML = `
      <span class="sk-stat-value">${s.value}</span>
      <span class="sk-stat-label">${s.label}</span>
    `;
    statsEl.appendChild(card);
  });
}

function renderOverview(d) {
  el('sk-description').textContent = d.description || '';
}

function renderMetrics(d) {
  const grid = el('sk-metrics');
  grid.innerHTML = '';
  (d.metrics || []).forEach(m => {
    const card = document.createElement('div');
    card.className = 'sk-metric';
    card.innerHTML = `
      <span class="sk-metric-value">${m.value}</span>
      <span class="sk-metric-label">${m.label}</span>
      ${m.note ? `<span class="sk-metric-note">${m.note}</span>` : ''}
    `;
    grid.appendChild(card);
  });
}

function renderChart(d) {
  const section = el('sec-chart');
  if (!d.ratingHistory || !d.ratingHistory.length) return;

  section.hidden = false;

  // Title
  const isLeetcode = d.id === 'cs';
  el('sk-chart-title').textContent = isLeetcode ? 'PROBLEMS SOLVED — PROGRESS' : 'RAPID ELO — PROGRESSION';

  const chart   = el('sk-chart');
  const max     = Math.max(...d.ratingHistory.map(r => r.value));
  const min     = Math.min(...d.ratingHistory.map(r => r.value));
  const range   = max - min || 1;

  chart.innerHTML = '';
  d.ratingHistory.forEach((row, i) => {
    const pct = ((row.value - min) / range) * 0.7 + 0.3; // 30%–100% fill
    const delay = i * 80;
    const item = document.createElement('div');
    item.className = 'sk-chart-row';
    item.innerHTML = `
      <span class="sk-chart-label">${row.date}</span>
      <div class="sk-chart-bar-wrap">
        <div class="sk-chart-bar-fill" style="width:${(pct * 100).toFixed(1)}%; animation-delay:${delay}ms"></div>
      </div>
      <span class="sk-chart-value">${row.value}</span>
    `;
    chart.appendChild(item);
  });
}

function renderAchievements(d) {
  const list = el('sk-achievements');
  list.innerHTML = '';
  (d.achievements || []).forEach(a => {
    const li = document.createElement('li');
    li.className = 'sk-achievement-item';
    li.innerHTML = `
      <time class="sk-achievement-date">${a.date}</time>
      <div class="sk-achievement-body">
        <span class="sk-achievement-text">${a.text}</span>
        ${a.type ? `<span class="sk-achievement-type sk-type--${a.type}">${a.type.toUpperCase()}</span>` : ''}
      </div>
    `;
    list.appendChild(li);
  });
}

function renderSessions(d) {
  const list = el('sk-sessions');
  list.innerHTML = '';
  (d.sessions || []).forEach(s => {
    const li = document.createElement('li');
    li.className = 'sk-session-item';
    const gamesLine = s.games !== undefined
      ? `<span class="sk-session-result">${s.games} games · ${s.result || ''}</span>`
      : (s.result ? `<span class="sk-session-result">${s.result}</span>` : '');
    li.innerHTML = `
      <div class="sk-session-header">
        <time class="sk-session-date">${s.date}</time>
        <span class="sk-session-type">${s.type}</span>
        <span class="sk-session-duration">${s.duration}</span>
      </div>
      ${s.exercises ? `<span class="sk-session-detail">${s.exercises}</span>` : ''}
      ${gamesLine}
    `;
    list.appendChild(li);
  });
}

function renderTimeline(d) {
  const list = el('sk-timeline');
  list.innerHTML = '';
  (d.timeline || []).forEach(t => {
    const li = document.createElement('li');
    li.className = 'sk-timeline-item';
    li.innerHTML = `
      <time class="sk-timeline-date">${t.date}</time>
      <span class="sk-timeline-event">${t.event}</span>
    `;
    list.appendChild(li);
  });
}

function renderSocial(d) {
  const grid = el('sk-social');
  grid.innerHTML = '';
  (d.socialPosts || []).forEach(p => {
    const a = document.createElement('a');
    a.className = 'sk-post-card';
    a.href = p.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.setAttribute('aria-label', p.caption);
    a.innerHTML = `
      <div class="sk-post-thumb">${p.icon || '📸'}</div>
      <div class="sk-post-overlay">
        <p class="sk-post-caption">${p.caption}</p>
        <time class="sk-post-date">${p.date}</time>
      </div>
    `;
    grid.appendChild(a);
  });

  const moreLink = el('sk-social-more');
  if (d.proofLinks) {
    const igLink = d.proofLinks.find(l => l.url.includes('instagram'));
    if (igLink) moreLink.href = igLink.url;
  }
}

function renderProofLinks(d) {
  const container = el('sk-proof-links');
  container.innerHTML = '';
  (d.proofLinks || []).forEach(l => {
    const a = document.createElement('a');
    a.className = 'sk-proof-link';
    a.href = l.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.innerHTML = `
      <span class="sk-proof-arrow">↗</span>
      <span>${l.label}</span>
    `;
    container.appendChild(a);
  });
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
      <div class="sk-elo-grid">
        <div class="sk-elo-card"><span class="sk-elo-value">${rapid}</span><span class="sk-elo-label">RAPID</span></div>
        <div class="sk-elo-card"><span class="sk-elo-value">${blitz}</span><span class="sk-elo-label">BLITZ</span></div>
        <div class="sk-elo-card"><span class="sk-elo-value">${bullet}</span><span class="sk-elo-label">BULLET</span></div>
        <div class="sk-elo-card"><span class="sk-elo-value">${puzzle}</span><span class="sk-elo-label">PUZZLES</span></div>
      </div>
      <span class="sk-live-source">Live from Chess.com · updated now</span>
    `;
  } catch {
    container.innerHTML = '<p style="font-family:var(--font-mono);font-size:var(--text-xs);color:var(--text-muted)">Live data unavailable — check Chess.com directly.</p>';
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
      <div class="sk-github-grid">
        <div class="sk-github-card"><span class="sk-github-value">${repos}</span><span class="sk-github-label">PUBLIC REPOS</span></div>
        <div class="sk-github-card"><span class="sk-github-value">${followers}</span><span class="sk-github-label">FOLLOWERS</span></div>
        <div class="sk-github-card"><span class="sk-github-value">${since}</span><span class="sk-github-label">ON GITHUB SINCE</span></div>
      </div>
      <span class="sk-live-source">Live from GitHub · updated now</span>
    `;
  } catch {
    container.innerHTML = '<p style="font-family:var(--font-mono);font-size:var(--text-xs);color:var(--text-muted)">Live data unavailable — check GitHub directly.</p>';
  }
}

function renderLive(d) {
  const section = el('sec-live');
  if (!d.apiConfig) return;

  section.hidden = false;
  el('sk-live-title').textContent =
    d.apiConfig.type === 'chess' ? 'LIVE — CHESS.COM RATINGS' : 'LIVE — GITHUB';

  const container = el('sk-live-container');
  if (d.apiConfig.type === 'chess')  fetchChessLive(d.apiConfig.username, container);
  if (d.apiConfig.type === 'github') fetchGithubLive(d.apiConfig.username, container);
}

// --- Theme application ---

function applyTheme(d) {
  const color = d.color || '#d0cac2';
  document.documentElement.style.setProperty('--skill-accent', color);
  document.documentElement.style.setProperty('--skill-accent-dim', hex2rgba(color, 0.08));

  // Update page title + social meta
  document.title = d.name + ' — BELKA.LIFE';
  const desc = (d.description || '').slice(0, 160);
  const setMeta = (id, attr, val) => { const m = el(id); if (m) m.setAttribute(attr, val); };
  setMeta('meta-description', 'content', desc);
  setMeta('og-title',         'content', d.name + ' — BELKA.LIFE');
  setMeta('og-description',   'content', desc);
  setMeta('tw-title',         'content', d.name + ' — BELKA.LIFE');
  setMeta('tw-description',   'content', desc);
}

// --- Fallback for unknown domain ---

function renderNotFound(id) {
  document.body.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;font-family:var(--font-mono);color:var(--text-secondary);gap:24px;">
      <span style="font-size:3rem">¬</span>
      <p style="letter-spacing:0.1em">DOMAIN NOT FOUND: ${id}</p>
      <a href="index.html" style="font-size:0.75rem;letter-spacing:0.08em;color:var(--text-muted);border-bottom:1px solid var(--border)">← BACK TO BELKA.LIFE</a>
    </div>
  `;
}

// --- Boot ---

document.addEventListener('DOMContentLoaded', () => {
  const id = getDomainId();
  const d  = SKILL_DATA[id];

  if (!d) {
    renderNotFound(id);
    return;
  }

  applyTheme(d);
  renderNav(d);
  renderHero(d);
  renderOverview(d);
  renderLive(d);
  renderMetrics(d);
  renderChart(d);
  renderAchievements(d);
  renderSessions(d);
  renderTimeline(d);
  renderSocial(d);
  renderProofLinks(d);
});
