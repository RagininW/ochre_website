// ============================================================
// tub-lang — the language choice, shared across every thatuglyboy hostname.
//
// This file is DUPLICATED, byte for byte, in:
//   ../main-site/lang-store.js
//   ../contact/index.html   (inlined — that site is a single file)
// Change one, change all three, or the sites disagree about the language.
//
// Why a cookie and not localStorage: localStorage is keyed by *origin*, so
// thatuglyboy.com, ochre.thatuglyboy.com and contact.thatuglyboy.com each get
// their own private box and none of them can read the others'. A cookie is
// keyed by *domain*, and one written against `.thatuglyboy.com` is sent to
// every host under it. That is the only client-side store the three sites
// actually share.
//
// localStorage is still written, as the fallback for hostnames the cookie
// domain cannot cover — localhost, 127.0.0.1, *.workers.dev — where each site
// is genuinely its own origin and there is nothing to share with.
// ============================================================
(function (global) {
  var KEY = 'tub_lang';          // cookie name
  var LS_KEY = 'tub:lang';       // pre-existing localStorage key, kept as-is
  var VALID = { en: 1, es: 1 };
  var YEAR = 60 * 60 * 24 * 365;

  // The registrable domain, or null when there isn't one to share across.
  // Anchored at the end so a lookalike host cannot match, and deliberately
  // narrow: this is the only domain these sites are served from.
  function sharedDomain() {
    var h = String(global.location.hostname || '').toLowerCase();
    if (h === 'thatuglyboy.com' || h.slice(-16) === '.thatuglyboy.com') {
      return '.thatuglyboy.com';
    }
    return null;
  }

  function readCookie() {
    try {
      var m = String(document.cookie).match(/(?:^|;\s*)tub_lang=([^;]*)/);
      return m ? decodeURIComponent(m[1]) : null;
    } catch (e) { return null; }
  }

  function writeCookie(lang) {
    var d = sharedDomain();
    // No Secure flag: it would drop the cookie on http://localhost, and the
    // value is a two-letter display preference, not a credential.
    var c = KEY + '=' + encodeURIComponent(lang)
          + '; path=/; max-age=' + YEAR + '; SameSite=Lax';
    if (d) c += '; domain=' + d;
    try { document.cookie = c; } catch (e) {}
  }

  // Order: ?lang= wins (an explicit hand-off from another hostname), then the
  // shared cookie, then this origin's own localStorage, then the browser, then
  // english. ?lang= is consumed and stripped so it does not linger in the URL
  // and outlive the choice it carried.
  function resolve() {
    var q = null;
    try {
      q = new URLSearchParams(global.location.search).get('lang');
    } catch (e) {}
    if (q && VALID[q]) {
      persist(q);
      try {
        var url = global.location.pathname + global.location.hash;
        global.history.replaceState(null, '', url);
      } catch (e) {}
      return q;
    }

    var c = readCookie();
    if (c && VALID[c]) return c;

    try {
      var s = localStorage.getItem(LS_KEY);
      if (s && VALID[s]) { writeCookie(s); return s; }   // migrate it up
    } catch (e) {}

    try {
      if (String(navigator.language || '').toLowerCase().indexOf('es') === 0) return 'es';
    } catch (e) {}

    return 'en';
  }

  function persist(lang) {
    if (!VALID[lang]) return;
    writeCookie(lang);
    try { localStorage.setItem(LS_KEY, lang); } catch (e) {}
  }

  global.TubLang = { resolve: resolve, persist: persist, valid: VALID };
})(window);
