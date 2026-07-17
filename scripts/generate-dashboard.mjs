#!/usr/bin/env node
/**
 * Generates the New Relic-styled SVG dashboard widgets for the profile README.
 *
 * Live data sources:
 *   - Service checks: real HTTP requests (status code + latency) against each side project.
 *   - Logs widget:    latest articles from https://amllamojha.com/articles/articles.json
 *
 * Run: node scripts/generate-dashboard.mjs
 * Output: assets/*.svg
 */

import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { performance } from 'node:perf_hooks';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const ASSETS = path.join(ROOT, 'assets');
const CACHE = path.join(ROOT, 'data', 'articles-cache.json');

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const ARTICLES_URL = 'https://amllamojha.com/articles/articles.json';
const CAREER_START = 2012;
const YEARS_IN_PROD = new Date().getFullYear() - CAREER_START;

const SERVICES = [
  { name: 'amllamojha.com', url: 'https://amllamojha.com', tag: 'portfolio' },
  { name: 'kirohub.dev', url: 'https://kirohub.dev', tag: 'community' },
  { name: 'waypoint', url: 'https://waypoint.amllamojha.com', tag: 'ai-rpg' },
  { name: 'slimelord', url: 'https://slimelord.amllamojha.com', tag: 'game' },
  { name: 'twitch-reels', url: 'https://twitch-reels.amllamojha.com', tag: 'serverless' },
  { name: 'watercolor-helper', url: 'https://watercolor-helper.amllamojha.com', tag: 'design-tool' },
  { name: 'approve-please', url: 'https://approve-please.amllamojha.com', tag: 'productivity' },
  { name: 'novibenocode.com', url: 'https://www.novibenocode.com', tag: 'micro-site' },
];

// Pinned entry at the top of the Logs widget
const PINNED_LOG = {
  level: 'SERIES',
  date: 'weekly',
  title: 'Kiro weekly reading list — AWS Builders',
  source: 'AWS Builders',
};

const STACK = [
  'AWS', 'Serverless', 'Terraform', 'ECS Fargate', 'TypeScript', 'Node.js',
  'Docker', 'New Relic', 'CloudWatch', 'Bedrock', 'CI/CD', 'GenAI Ops',
];

const LINKS = [
  { label: 'amllamojha.com', href: 'https://amllamojha.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/alvarollamojha' },
  { label: 'Dev.to', href: 'https://dev.to/llamojha' },
  { label: 'AWS Builders', href: 'https://builder.aws.com/content/3EqcYqwwrlxCXN5MNG2jqvy0vn3/kiro-weekly-reading-list-7th-june-2026' },
  { label: 'Articles', href: 'https://amllamojha.com/#/articles' },
];

const W = 850; // widget width, tuned to GitHub's README column

// Llamojha Design System tokens (claude.ai/design "Llamojha Design System"):
// ink surfaces, gold primary accent, teal for data signals, semantic status.
const C = {
  tile: '#111A2D', // --surface-card (ink-600)
  tileAlt: '#0B1120', // --surface-raised (ink-700)
  border: '#243353', // --ink-400 subtle border on dark
  text: '#E6EBF2', // --slate-100
  muted: '#9AA6B8', // --slate-300
  faint: '#6E7A8E', // --slate-400
  green: '#4ECB8E', // --success
  greenDim: 'rgba(78,203,142,0.10)',
  amber: '#FFD666', // --gold-500 primary accent
  amberDim: 'rgba(255,214,102,0.12)', // --accent-soft
  teal: '#3DD6C4', // --teal-500 constellation / data signals
  tealDim: 'rgba(61,214,196,0.12)',
  red: '#F2657A', // --danger
  redDim: 'rgba(242,101,122,0.10)',
};

// --font-* fallback stacks (webfonts can't load inside GitHub-served SVGs)
const SERIF = `'Playfair Display',Georgia,'Times New Roman',serif`;
const FONT = `'Geist','Helvetica Neue',-apple-system,system-ui,sans-serif`;
const MONO = `'JetBrains Mono','SFMono-Regular',ui-monospace,Menlo,monospace`;

// ---------------------------------------------------------------------------
// Data collection
// ---------------------------------------------------------------------------

async function checkService(svc) {
  const start = performance.now();
  try {
    const res = await fetch(svc.url, {
      redirect: 'follow',
      signal: AbortSignal.timeout(20_000),
      headers: { 'user-agent': 'llamojha-profile-dashboard/1.0' },
    });
    const ms = Math.round(performance.now() - start);
    return { ...svc, up: res.ok, code: res.status, ms };
  } catch {
    return { ...svc, up: false, code: 'ERR', ms: null };
  }
}

async function fetchArticles() {
  try {
    const res = await fetch(ARTICLES_URL, {
      redirect: 'follow',
      signal: AbortSignal.timeout(20_000),
      headers: { 'user-agent': 'llamojha-profile-dashboard/1.0' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    await mkdir(path.dirname(CACHE), { recursive: true });
    await writeFile(CACHE, JSON.stringify(json, null, 2));
    return json.articles;
  } catch (err) {
    console.warn(`articles fetch failed (${err.message}), using cache`);
    const cached = JSON.parse(await readFile(CACHE, 'utf8'));
    return cached.articles;
  }
}

function articleDate(article) {
  const d = new Date(article.date?.en ?? '');
  return Number.isNaN(d.getTime())
    ? '----------'
    : d.toISOString().slice(0, 10);
}

function articleSource(article) {
  if (article.source?.en) return article.source.en;
  return article.type === 'markdown' ? 'Blog' : 'Article';
}

// ---------------------------------------------------------------------------
// SVG helpers
// ---------------------------------------------------------------------------

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

function svg(w, h, body, { animated = false } = {}) {
  const pulse = animated
    ? `@keyframes pulse{0%,100%{opacity:1}50%{opacity:.25}}
       .pulse{animation:pulse 2.4s ease-in-out infinite}`
    : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img">
<style>
  .f{font-family:${FONT}}
  .m{font-family:${MONO}}
  .s{font-family:${SERIF}}
  ${pulse}
</style>
${body}
</svg>`;
}

const tile = (x, y, w, h, fill = C.tile) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${fill}" stroke="${C.border}"/>`;

/** Widget title bar: mono eyebrow with em-dash lead and wide tracking, plus kebab dots. */
function widgetTitle(x, y, w, label) {
  const dots = [0, 5, 10]
    .map((dy) => `<circle cx="${x + w - 22}" cy="${y + 15 + dy}" r="1.4" fill="${C.faint}"/>`)
    .join('');
  return `<text x="${x + 16}" y="${y + 24}" class="m" font-size="10" letter-spacing="1.8" fill="${C.muted}">&#8212; ${esc(label.toUpperCase())}</text>${dots}`;
}

const statusDot = (cx, cy, color, pulse = false) =>
  `<circle cx="${cx}" cy="${cy}" r="4" fill="${color}"${pulse ? ' class="pulse"' : ''}/>` +
  `<circle cx="${cx}" cy="${cy}" r="7" fill="none" stroke="${color}" stroke-opacity="0.25"/>`;

function chip(x, y, text, color, dim, mono = true) {
  const w = 14 + text.length * 6.6;
  return {
    w,
    svg:
      `<rect x="${x}" y="${y}" width="${w}" height="18" rx="9" fill="${dim}"/>` +
      `<text x="${x + w / 2}" y="${y + 12.5}" class="${mono ? 'm' : 'f'}" font-size="10" fill="${color}" text-anchor="middle">${esc(text)}</text>`,
  };
}

const approxTextWidth = (text, size) => text.length * size * 0.62;

// ---------------------------------------------------------------------------
// Widgets
// ---------------------------------------------------------------------------

function headerSvg(refreshedAt) {
  const h = 118;

  // Constellation motif: drifting teal nodes, faint links, one gold anchor node
  const nodes = [
    [470, 30], [516, 58], [558, 24], [604, 44], [576, 74],
  ];
  const links = [[0, 1], [1, 2], [2, 3], [1, 4], [3, 4]];
  const anchor = [640, 62];
  const constellation =
    links
      .map(([a, b]) =>
        `<line x1="${nodes[a][0]}" y1="${nodes[a][1]}" x2="${nodes[b][0]}" y2="${nodes[b][1]}" stroke="${C.teal}" stroke-opacity="0.16"/>`)
      .join('') +
    `<line x1="${nodes[3][0]}" y1="${nodes[3][1]}" x2="${anchor[0]}" y2="${anchor[1]}" stroke="${C.amber}" stroke-opacity="0.3"/>` +
    `<line x1="${nodes[4][0]}" y1="${nodes[4][1]}" x2="${anchor[0]}" y2="${anchor[1]}" stroke="${C.amber}" stroke-opacity="0.3"/>` +
    nodes.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2" fill="${C.teal}" fill-opacity="0.7"/>`).join('') +
    `<circle cx="${anchor[0]}" cy="${anchor[1]}" r="3" fill="${C.amber}" class="pulse"/>`;

  const body = `
${tile(0, 0, W, h)}
${constellation}
${statusDot(28, 40, C.green, true)}
<text x="46" y="47" class="s" font-size="23" font-weight="700" letter-spacing="1.5" fill="#FFFFFF">ALVARO LLAMOJHA</text>
<text x="46" y="72" class="s" font-size="14" font-style="italic" font-weight="600" fill="${C.amber}">DevOps &amp; Observability Engineer</text>
<rect x="${W - 156}" y="26" width="130" height="26" rx="13" fill="${C.greenDim}" stroke="${C.green}" stroke-opacity="0.4"/>
<circle cx="${W - 140}" cy="39" r="3.5" fill="${C.green}" class="pulse"/>
<text x="${W - 128}" y="43" class="m" font-size="11" letter-spacing="1" fill="${C.green}">OPERATIONAL</text>
<text x="${W - 26}" y="72" class="m" font-size="10" letter-spacing="2.2" fill="${C.faint}" text-anchor="end">&#8212; SINCE ${CAREER_START}</text>
<line x1="16" y1="88" x2="${W - 16}" y2="88" stroke="${C.border}"/>
<text x="16" y="106" class="m" font-size="10" fill="${C.faint}">env: production&#160;&#160;·&#160;&#160;region: eu-west-1&#160;&#160;·&#160;&#160;last refreshed ${esc(refreshedAt)}</text>
<text x="${W - 16}" y="106" class="m" font-size="10" fill="${C.amber}" text-anchor="end">amllamojha.com</text>`;
  return svg(W, h, body, { animated: true });
}

function billboardsSvg(services, articleCount) {
  const h = 128;
  const gap = 12;
  const bw = (W - gap * 3) / 4;
  const up = services.filter((s) => s.up).length;
  const allUp = up === services.length;

  const boards = [
    { label: 'YEARS IN PRODUCTION', value: String(YEARS_IN_PROD), sub: 'e-commerce · platform · SRE', color: C.text },
    {
      label: 'SERVICES UP',
      value: `${up}/${services.length}`,
      sub: 'live side projects · synthetics',
      color: allUp ? C.green : C.amber,
    },
    { label: 'ARTICLES & TALKS', value: String(articleCount), sub: 'blog · dev.to · presentations', color: C.text },
    { label: 'PEAK-SEASON SEV-1s', value: '0', sub: 'LEGO.com · Black Friday scale', color: C.green },
  ];

  const body = boards
    .map((b, i) => {
      const x = i * (bw + gap);
      return `
${tile(x, 0, bw, h)}
${widgetTitle(x, 0, bw, b.label)}
<text x="${x + 16}" y="78" class="m" font-size="38" font-weight="700" fill="${b.color}">${esc(b.value)}</text>
<text x="${x + 16}" y="106" class="f" font-size="11" fill="${C.faint}">${esc(b.sub)}</text>`;
    })
    .join('');
  return svg(W, h, body);
}

function servicesSvg(services) {
  const rowH = 32;
  const top = 64;
  const h = top + services.length * rowH + 16;
  const maxMs = Math.max(...services.map((s) => s.ms ?? 0), 1000);
  const barX = W - 196;
  const barMax = 150;

  const headers = `
<text x="30" y="${top - 12}" class="f" font-size="10" letter-spacing="1" fill="${C.faint}">SERVICE</text>
<text x="330" y="${top - 12}" class="f" font-size="10" letter-spacing="1" fill="${C.faint}">TAG</text>
<text x="470" y="${top - 12}" class="f" font-size="10" letter-spacing="1" fill="${C.faint}">RESULT</text>
<text x="${barX}" y="${top - 12}" class="f" font-size="10" letter-spacing="1" fill="${C.faint}">RESPONSE TIME</text>`;

  const rows = services
    .map((s, i) => {
      const y = top + i * rowH;
      const cy = y + rowH / 2 - 2;
      const color = s.up ? C.green : C.red;
      const dim = s.up ? C.greenDim : C.redDim;
      const result = s.up ? `${s.code} OK` : String(s.code);
      const ms = s.ms == null ? '—' : `${s.ms} ms`;
      const frac = s.ms == null ? 1 : Math.min(1, Math.log(1 + s.ms) / Math.log(1 + maxMs));
      const barW = Math.max(4, Math.round(frac * barMax));
      const barColor = !s.up ? C.red : s.ms > 2000 ? C.amber : C.teal;
      const stripe = i % 2 ? `<rect x="9" y="${y}" width="${W - 18}" height="${rowH}" fill="${C.tileAlt}"/>` : '';
      const resultChip = chip(462, cy - 9, result, color, dim);
      return `
${stripe}
${statusDot(30, cy, color)}
<text x="48" y="${cy + 4}" class="m" font-size="12" fill="${C.text}">${esc(s.name)}</text>
<text x="330" y="${cy + 4}" class="m" font-size="11" fill="${C.faint}">${esc(s.tag)}</text>
${resultChip.svg}
<rect x="${barX}" y="${cy - 4}" width="${barMax}" height="8" rx="4" fill="${C.tileAlt}" stroke="${C.border}" stroke-width="0.5"/>
<rect x="${barX}" y="${cy - 4}" width="${barW}" height="8" rx="4" fill="${barColor}" fill-opacity="0.85"/>
<text x="${W - 30}" y="${cy + 4}" class="m" font-size="11" fill="${C.muted}" text-anchor="end">${esc(ms)}</text>`;
    })
    .join('');

  const body = `${tile(0, 0, W, h)}${widgetTitle(0, 0, W, 'Synthetics — side-project checks (live)')}${headers}${rows}`;
  return svg(W, h, body);
}

function stackSvg() {
  const h = 96;
  let x = 16;
  let y = 46;
  const chips = STACK.map((label) => {
    const cw = 30 + approxTextWidth(label, 11);
    if (x + cw > W - 16) {
      x = 16;
      y += 30;
    }
    const out = `
<rect x="${x}" y="${y - 15}" width="${cw}" height="22" rx="11" fill="${C.tileAlt}" stroke="${C.border}"/>
<circle cx="${x + 13}" cy="${y - 4}" r="3" fill="${C.teal}"/>
<text x="${x + 23}" y="${y}" class="f" font-size="11" fill="${C.text}">${esc(label)}</text>`;
    x += cw + 8;
    return out;
  }).join('');
  const body = `${tile(0, 0, W, h)}${widgetTitle(0, 0, W, 'APM — instrumented stack')}${chips}`;
  return svg(W, h, body);
}

function logsSvg(articles) {
  const entries = [
    { ...PINNED_LOG, pinned: true },
    ...articles.slice(0, 4).map((a) => ({
      level: 'INFO',
      date: articleDate(a),
      title: a.title?.en ?? a.slug,
      source: articleSource(a),
    })),
  ];
  const rowH = 30;
  const top = 46;
  const h = top + entries.length * rowH + 14;

  const rows = entries
    .map((e, i) => {
      const y = top + i * rowH;
      const cy = y + rowH / 2 - 2;
      const stripe = i % 2 ? `<rect x="9" y="${y}" width="${W - 18}" height="${rowH}" fill="${C.tileAlt}"/>` : '';
      const levelColor = e.pinned ? C.amber : C.teal;
      const levelDim = e.pinned ? C.amberDim : C.tealDim;
      const level = chip(24, cy - 9, e.level, levelColor, levelDim);
      const srcChip = chip(W - 24 - (14 + e.source.length * 6.6), cy - 9, e.source, C.amber, C.amberDim, false);
      let title = e.title;
      if (title.length > 78) title = `${title.slice(0, 75)}…`;
      return `
${stripe}
${level.svg}
<text x="78" y="${cy + 4}" class="m" font-size="11" fill="${C.faint}">${esc(e.date)}</text>
<text x="160" y="${cy + 4}" class="f" font-size="12" fill="${C.text}">${esc(title)}</text>
${srcChip.svg}`;
    })
    .join('');

  const body = `${tile(0, 0, W, h)}${widgetTitle(0, 0, W, 'Logs — latest articles')}${rows}`;
  return svg(W, h, body);
}

function linkChipSvg(label) {
  const w = Math.round(36 + approxTextWidth(label, 12));
  const h = 36;
  const body = `
${tile(0, 0, w, h)}
<circle cx="18" cy="18" r="3" fill="${C.amber}"/>
<text x="28" y="22.5" class="m" font-size="12" fill="${C.text}">${esc(label)}</text>`;
  return { w, svg: svg(w, h, body) };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const [services, articles] = await Promise.all([
  Promise.all(SERVICES.map(checkService)),
  fetchArticles(),
]);

const refreshedAt = `${new Date().toISOString().slice(0, 16).replace('T', ' ')} UTC`;

await mkdir(ASSETS, { recursive: true });

const files = {
  'header.svg': headerSvg(refreshedAt),
  'billboards.svg': billboardsSvg(services, articles.length),
  'services.svg': servicesSvg(services),
  'stack.svg': stackSvg(),
  'logs.svg': logsSvg(articles),
};
for (const link of LINKS) {
  const slug = link.label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  files[`chip-${slug}.svg`] = linkChipSvg(link.label).svg;
}

for (const [name, content] of Object.entries(files)) {
  await writeFile(path.join(ASSETS, name), content);
  console.log(`wrote assets/${name}`);
}

const down = services.filter((s) => !s.up);
if (down.length) console.warn(`DOWN: ${down.map((s) => s.name).join(', ')}`);
console.log(`refreshed ${refreshedAt} · ${articles.length} articles`);
