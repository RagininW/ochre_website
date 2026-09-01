// ============================================================
// ochre.thatuglyboy.com — renderer
//
// One page, two languages, no build step. All copy and every outbound link
// live in content.js; this file only decides the language and draws.
// ============================================================

const app = document.getElementById('app');

// ------------------ LANGUAGE ------------------
// Resolved and stored by lang-store.js, which keeps the choice in a cookie
// scoped to .thatuglyboy.com so it is shared with the main site and the contact
// site. See that file for why localStorage alone cannot do this.
let LANG = TubLang.resolve();
const C = () => CONTENT[LANG] || CONTENT.en;

function setLang(l) {
  if (!TubLang.valid[l] || l === LANG) return;
  LANG = l;
  TubLang.persist(l);
  render();
}

// ------------------ HELPERS ------------------
function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

// Every link on this page is one of these plates. A url that isn't live yet
// renders flat and unpressable with its own "soon" chip, at full size — the
// gap is meant to be visible, not hidden behind a dimmed style.
function btn(href, label, cls) {
  const c = `btn ${cls || ''}`.trim();
  if (href) {
    return `<a class="${c}" href="${esc(href)}" target="_blank" rel="noopener">${label}</a>`;
  }
  return `<span class="${c} dead" aria-disabled="true">${label}
    <span class="soon">${esc(C().cta.soon)}</span>
  </span>`;
}

// thatuglyboy.com reads ?lang= and strips it — carry the choice back over.
const siteUrl = () => `${LINKS.site}/?lang=${LANG}`;

// ------------------ SECTIONS ------------------
function topbar() {
  return `
    <header class="topbar">
      <div class="wrap">
        <a class="brand" href="#top">ochre<span class="dot">.</span></a>
        ${btn(LINKS.steam, esc(C().cta.steamShort), 'sm primary')}
        ${btn(LINKS.discord[LANG], esc(C().cta.discord), 'sm')}
        <div class="lang">
          <button class="${LANG === 'en' ? 'on' : ''}" data-lang="en">en</button>
          <button class="${LANG === 'es' ? 'on' : ''}" data-lang="es">es</button>
        </div>
      </div>
    </header>
  `;
}

function hero() {
  const c = C().hero;
  const loop = c.loop.map((s) => `<li>${esc(s)}</li>`).join('');
  return `
    <section class="hero" id="top">
      <div class="wrap">
        <div class="settler" aria-hidden="true"></div>
        <h1 class="wordmark">ochre<span class="dot">.</span></h1>
        <p class="tagline">${esc(c.tagline)}</p>
        <ul class="loop">${loop}</ul>
        <div class="cta-row">
          ${btn(LINKS.steam, esc(C().cta.steam), 'big primary')}
          ${btn(LINKS.discord[LANG], esc(C().cta.discord), 'big')}
        </div>
        <p class="meta">${esc(c.meta)}</p>
      </div>
    </section>
  `;
}

function screens() {
  const c = C().screens;
  const shots = c.shots.map((cap) => `
    <figure class="shot"><figcaption>${esc(cap)}</figcaption></figure>
  `).join('');
  return `
    <section class="block" id="screens">
      <div class="wrap">
        <h2>${esc(c.title)}</h2>
        <div class="shots">${shots}</div>
      </div>
    </section>
  `;
}

function systems() {
  const c = C().systems;
  const items = c.items.map((f) => `
    <article class="sys">
      <div class="ic" style="--src:url('${esc(f.icon)}')" aria-hidden="true"></div>
      <div>
        <h3>${esc(f.name)}</h3>
        <p>${esc(f.text)}</p>
      </div>
    </article>
  `).join('');
  return `
    <section class="block" id="systems">
      <div class="wrap">
        <h2>${esc(c.title)}</h2>
        <div class="systems">${items}</div>
      </div>
    </section>
  `;
}

function community() {
  const c = C().community;
  // Each server is named in its own language whatever the page is set to, so
  // the name carries its own lang — which also picks the right display face.
  const cards = c.cards.map((s) => btn(
    LINKS.discord[s.key],
    `<span class="flag">${esc(s.flag)}</span>
     <span class="name" lang="${esc(s.key)}">${esc(s.name)}</span>`,
    ''
  )).join('');
  return `
    <section class="block" id="community">
      <div class="wrap">
        <h2>${esc(c.title)}</h2>
        <div class="servers">${cards}</div>
      </div>
    </section>
  `;
}

// The "that ugly boy" mark, small, at the end — LocalThunk under Balatro.
function footer() {
  const c = C().footer;
  return `
    <footer class="site">
      <div class="wrap">
        <div class="made">${esc(c.made)}</div>
        <a class="tub" href="${esc(siteUrl())}">
          <span class="name" role="img" aria-label="that ugly boy"></span>
          <span class="mark" aria-hidden="true"></span>
        </a>
        <div class="foot-links">
          <span>ochre ${esc(c.rights)}</span>
          <a href="${esc(LINKS.contact[LANG] || LINKS.contact.en)}">${esc(c.contact)}</a>
        </div>
      </div>
    </footer>
  `;
}

// ------------------ RENDER ------------------
function render() {
  const c = C();
  document.documentElement.lang = LANG;   // drives the display-font swap in CSS
  document.title = c.meta.title;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute('content', c.meta.description);

  app.innerHTML = [topbar(), hero(), screens(), systems(), community(), footer()].join('');
}

app.addEventListener('click', (e) => {
  const b = e.target.closest('.lang button');
  if (b) setLang(b.dataset.lang);
});

render();
