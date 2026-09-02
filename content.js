// ============================================================
// Carved in Stone — all copy and every outbound link
//
// A plain script, not a fetched .json, on purpose: the main site's
// JSON-parse failures are silent (it falls back to a stale inline copy and
// the edit looks like it did nothing). A syntax error here throws in the
// console and the page stops, which is the failure mode worth having.
//
// CASING: game sites use regular casing — "Carved in Stone", "Wishlist on
// Steam", "About". That is the opposite of thatuglyboy.com, which is lowercase
// throughout. Do not "fix" one to match the other; the split is deliberate,
// and there is no text-transform on this page enforcing it, so the strings
// here are what ships.
//
// KEEP IT SHORT. A game page is a poster, not a design document. One
// sentence per idea; if a feature needs two, the feature is two features.
// Spanish is written natively, not translated.
// ============================================================

// ---- outbound links --------------------------------------------------
// Empty string = not live yet. The renderer draws those as a flat olive plate
// carrying a "Soon" chip, so an unfilled slot is visible on the page.
const LINKS = {
  // Steam store page. Fill in once the app id exists:
  // 'https://store.steampowered.com/app/<appid>/carved-in-stone/'
  steam: '',

  // Two servers, by language. es = LATAM, en = everywhere else.
  discord: {
    en: '',
    es: ''
  },

  // The parent site. ?lang= is the fallback hand-off for a blocked cookie
  // (lang-store.js explains the cookie).
  site: 'https://thatuglyboy.com',
  contact: { en: 'https://contact.thatuglyboy.com', es: 'https://contacto.thatuglyboy.com' }
};

const CONTENT = {
  en: {
    meta: {
      title: 'Carved in Stone — a roguelite RTS',
      description: 'A society of agents grows, falls, and leaves its genes to the next one.'
    },

    hero: {
      tagline: 'A society of agents grows, falls, and leaves its genes to the next one.'
    },

    cta: {
      steam: 'Wishlist on Steam',
      steamShort: 'Steam',
      discord: 'Discord',
      soon: 'Soon'
    },

    about: {
      title: 'About',
      items: [
        {
          icon: 'media/unit.png',
          name: 'Agents, not units',
          text: 'They forage, build, rest and pick fights on their own judgement.'
        },
        {
          icon: 'media/genes.png',
          name: 'Genes outlive the run',
          text: 'Every birth is a permanent upgrade for every society after it.'
        },
        {
          icon: 'media/wolf.png',
          name: 'The wolves hold the caves',
          text: 'Pressure comes off the map, not a difficulty clock. Noise wakes it.'
        },
        {
          icon: 'media/knowledge.png',
          name: 'A written legacy',
          text: 'Inscribe one technology and keep it forever. Sixty-five to choose from.'
        }
      ]
    },

    // Rendered headless out of the game itself — see
    // agent_simulation/generate_site_screenshots.py. Ordered by zoom, closest
    // first, so the row reads as a range of distances rather than six views
    // from the same height. Two of the six carry the HUD, in two different
    // states: a building selected, and a squad under orders. The caption is
    // the alt text; it is not drawn.
    screens: {
      shots: [
        { src: 'media/screen-1.jpg', alt: 'Close on a campfire: gatherers, dogs, an entertainer and a priest around the cave' },
        { src: 'media/screen-2.jpg', alt: 'The interface: the home cave selected, showing its stores and build range, with spiders attacking' },
        { src: 'media/screen-3.jpg', alt: 'The interface: a squad of settlers selected and under orders in a working town' },
        { src: 'media/screen-4.jpg', alt: 'A wolf pack in among warriors and their dogs' },
        { src: 'media/screen-5.jpg', alt: 'A small camp on the water, seen wide' },
        { src: 'media/screen-6.jpg', alt: 'The whole valley: a settlement between mountain slabs' }
      ]
    },

    community: {
      title: 'Community',
      cards: [
        { flag: 'Worldwide', name: 'English', key: 'en' },
        { flag: 'LATAM', name: 'Español', key: 'es' }
      ]
    },

    footer: {
      made: 'A game by',
      contact: 'Contact',
      rights: '© 2026'
    }
  },

  es: {
    meta: {
      title: 'Carved in Stone — un RTS roguelite',
      description: 'Una sociedad de agentes crece, cae y le deja sus genes a la siguiente.'
    },

    hero: {
      tagline: 'Una sociedad de agentes crece, cae y le deja sus genes a la siguiente.'
    },

    cta: {
      steam: 'Lista de deseos en Steam',
      steamShort: 'Steam',
      discord: 'Discord',
      soon: 'Pronto'
    },

    about: {
      title: 'Acerca de',
      items: [
        {
          icon: 'media/unit.png',
          name: 'Agentes, no unidades',
          text: 'Recolectan, construyen, descansan y pelean por criterio propio.'
        },
        {
          icon: 'media/genes.png',
          name: 'Los genes sobreviven',
          text: 'Cada nacimiento es una mejora permanente para toda sociedad posterior.'
        },
        {
          icon: 'media/wolf.png',
          name: 'Los lobos tienen las cuevas',
          text: 'La presión sale del mapa, no de un reloj. El ruido la despierta.'
        },
        {
          icon: 'media/knowledge.png',
          name: 'Un legado escrito',
          text: 'Inscribe una tecnología y consérvala para siempre. Hay sesenta y cinco.'
        }
      ]
    },

    screens: {
      shots: [
        { src: 'media/screen-1.jpg', alt: 'De cerca en una fogata: recolectores, perros, un animador y un sacerdote junto a la cueva' },
        { src: 'media/screen-2.jpg', alt: 'La interfaz: la cueva seleccionada, con sus reservas y su rango de construcción, mientras atacan las arañas' },
        { src: 'media/screen-3.jpg', alt: 'La interfaz: una escuadra de colonos seleccionada y con órdenes en un pueblo trabajando' },
        { src: 'media/screen-4.jpg', alt: 'Una manada de lobos entre guerreros y sus perros' },
        { src: 'media/screen-5.jpg', alt: 'Un campamento pequeño sobre el agua, en plano abierto' },
        { src: 'media/screen-6.jpg', alt: 'El valle entero: un asentamiento entre lajas de montaña' }
      ]
    },

    community: {
      title: 'Comunidad',
      cards: [
        { flag: 'LATAM', name: 'Español', key: 'es' },
        { flag: 'Mundial', name: 'English', key: 'en' }
      ]
    },

    footer: {
      made: 'Un juego de',
      contact: 'Contacto',
      rights: '© 2026'
    }
  }
};
