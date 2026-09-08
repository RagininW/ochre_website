// ============================================================
// Mammoth — all copy and every outbound link
//
// A plain script, not a fetched .json, on purpose: the main site's
// JSON-parse failures are silent (it falls back to a stale inline copy and
// the edit looks like it did nothing). A syntax error here throws in the
// console and the page stops, which is the failure mode worth having.
//
// CASING: game sites use regular casing — "Mammoth", "Wishlist on
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
      title: 'Mammoth — a roguelite RTS',
      description: 'Guide a dawning civilization through the beginnings of humanity. Face the perils and overcome nature.'
    },

    hero: {
      tagline: 'Guide a dawning civilization through the beginnings of humanity. Face the perils and overcome nature.'
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
          name: 'Guide your tribe',
          text: 'Forage, build, research and train your units to survive nature.'
        },
        {
          icon: 'media/genes.png',
          name: 'Your descendants grow stronger ',
          text: 'Every time your tribe fails, they inherit permanent strength to their offspring.'
        },
        {
          icon: 'media/wolf.png',
          name: 'Face nature at it\'s worst',
          text: 'Many enemies will oppose your growth and will try to hunt you. Use your tools and skills to defeat them.'
        },
        {
          icon: 'media/knowledge.png',
          name: 'A written legacy',
          text: 'Let your knowledge be useful for future generations by inscribing acquired technologies.'
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
      title: 'Mammoth — un RTS roguelite',
      description: 'Guía a una civilización naciente a través de sus inicios. Enfrenta el peligro y supera a la naturaleza.'
    },

    hero: {
      tagline: 'Guía a una civilización naciente a través de sus inicios. Enfrenta el peligro y supera a la naturaleza.'
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
          name: 'Guía a tu tribu',
          text: 'Junta recursos, contruye edificos y entrena a tus unidades para sobrevivir la naturaleza.'
        },
        {
          icon: 'media/genes.png',
          name: 'Tus descendientes serán más fuertes',
          text: 'Cada vez que tu tribu cae, le heredan su fuerza a sus hijos.'
        },
        {
          icon: 'media/wolf.png',
          name: 'Enfrenta a una naturaleza despiadada',
          text: 'Muchos enemigos se oponen al desarrollo de tu civilización. Usa tus herramientas y habilidades para vencerlos.'
        },
        {
          icon: 'media/knowledge.png',
          name: 'Un legado escrito',
          text: 'Que tu conocimiento le sea útil a las futuras generaciones. Inscribe las tecnologías adquiridas para tus descendientes.'
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
