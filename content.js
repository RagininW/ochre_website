// ============================================================
// ochre — all copy and every outbound link
//
// A plain script, not a fetched .json, on purpose: the main site's
// JSON-parse failures are silent (it falls back to a stale inline copy and
// the edit looks like it did nothing). A syntax error here throws in the
// console and the page stops, which is the failure mode worth having.
//
// KEEP IT SHORT. A game page is a poster, not a design document. One
// sentence per idea; if a feature needs two, the feature is two features.
// Spanish is written natively, not translated.
// ============================================================

// ---- outbound links --------------------------------------------------
// Empty string = not live yet. The renderer draws those as a flat dead-key
// button instead of a link, so an unfilled slot is visible on the page.
const LINKS = {
  // Steam store page. Fill in once the app id exists:
  // 'https://store.steampowered.com/app/<appid>/ochre/'
  steam: '',

  // Two servers, by language. es = LATAM, en = everywhere else.
  discord: {
    en: '',
    es: ''
  },

  // The parent site. ?lang= carries the language across the origin boundary
  // (localStorage cannot — see CLAUDE.md).
  site: 'https://thatuglyboy.com',
  contact: { en: 'https://contact.thatuglyboy.com', es: 'https://contacto.thatuglyboy.com' }
};

const CONTENT = {
  en: {
    meta: {
      title: 'ochre — a roguelite rts',
      description: 'a society of agents grows, falls, and leaves its genes to the next one.'
    },

    hero: {
      tagline: 'a society of agents grows, falls, and leaves its genes to the next one.',
      loop: ['build', 'survive', 'fall', 'evolve'],
      meta: 'roguelite rts · pc · single player · in development'
    },

    cta: {
      steam: 'wishlist on steam',
      steamShort: 'steam',
      discord: 'discord',
      soon: 'soon'
    },

    screens: {
      title: 'screens',
      shots: ['the settlement', 'a wild cave', 'the legacy tree', 'the reckoning']
    },

    systems: {
      title: 'systems',
      items: [
        {
          icon: 'media/unit.png',
          name: 'agents, not units',
          text: 'they forage, build, rest and pick fights on their own judgement.'
        },
        {
          icon: 'media/genes.png',
          name: 'genes outlive the run',
          text: 'every birth is a permanent upgrade for every society after it.'
        },
        {
          icon: 'media/wolf.png',
          name: 'the wolves hold the caves',
          text: 'pressure comes off the map, not a difficulty clock. noise wakes it.'
        },
        {
          icon: 'media/knowledge.png',
          name: 'a written legacy',
          text: 'inscribe one technology and keep it forever. sixty-five to choose from.'
        }
      ]
    },

    community: {
      title: 'two servers',
      cards: [
        { flag: 'worldwide', name: 'english', key: 'en' },
        { flag: 'latam', name: 'español', key: 'es' }
      ]
    },

    footer: {
      made: 'a game by',
      contact: 'contact',
      rights: '© 2026'
    }
  },

  es: {
    meta: {
      title: 'ochre — un rts roguelite',
      description: 'una sociedad de agentes crece, cae y le deja sus genes a la siguiente.'
    },

    hero: {
      tagline: 'una sociedad de agentes crece, cae y le deja sus genes a la siguiente.',
      loop: ['construir', 'sobrevivir', 'caer', 'evolucionar'],
      meta: 'rts roguelite · pc · un jugador · en desarrollo'
    },

    cta: {
      steam: 'lista de deseos en steam',
      steamShort: 'steam',
      discord: 'discord',
      soon: 'pronto'
    },

    screens: {
      title: 'capturas',
      shots: ['el asentamiento', 'una cueva salvaje', 'el árbol de legado', 'el ajuste de cuentas']
    },

    systems: {
      title: 'sistemas',
      items: [
        {
          icon: 'media/unit.png',
          name: 'agentes, no unidades',
          text: 'recolectan, construyen, descansan y pelean por criterio propio.'
        },
        {
          icon: 'media/genes.png',
          name: 'los genes sobreviven',
          text: 'cada nacimiento es una mejora permanente para toda sociedad posterior.'
        },
        {
          icon: 'media/wolf.png',
          name: 'los lobos tienen las cuevas',
          text: 'la presión sale del mapa, no de un reloj. el ruido la despierta.'
        },
        {
          icon: 'media/knowledge.png',
          name: 'un legado escrito',
          text: 'inscribe una tecnología y consérvala para siempre. hay sesenta y cinco.'
        }
      ]
    },

    community: {
      title: 'dos servidores',
      cards: [
        { flag: 'latam', name: 'español', key: 'es' },
        { flag: 'worldwide', name: 'english', key: 'en' }
      ]
    },

    footer: {
      made: 'un juego de',
      contact: 'contacto',
      rights: '© 2026'
    }
  }
};
