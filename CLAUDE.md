# ochre.thatuglyboy.com

Single-page site for **ochre**, the roguelite RTS in
`D:\Documentos\Proyectos\Godot\agent_simulation`. Static, no build step, no
dependencies. Same family as `../main-site` and `../contact`, its own Worker.

The game was called *Age of Ages* until 2026-09-01, and *Agent RTS* before
that. Nothing carries the old names now except one deliberate note in
`settings_manager.py` (see below).

## Not deployed yet

Repo: `github.com/RagininW/ochre_website`. Before the first deploy:

1. Create a Worker named **`ochre-website`** — it must match `wrangler.jsonc`.
   Cloudflare derives that name from the repo. Any other
   name deploys a phantom Worker with no custom domains: every build goes green
   and the live site never changes.
2. Add the custom domain `ochre.thatuglyboy.com` to it.
3. Connect the repo to Workers Builds, the way `../contact` is. Push to `main`
   then ships to production.

`wrangler.jsonc` must stay at the repo root.

Deploying by hand is not an option on this machine: local Node is v14 and
wrangler needs 18+ (it dies with `Unexpected token '{'`). Cloud builds sidestep
that.

### Gotcha inherited from the contact site: routes shadow custom domains

A Worker on a **route** runs before a Worker on a **custom domain**, and a
static-assets Worker never falls through — it just answers. A route on the
`thatuglyboy` Worker matching this subdomain will silently serve the main site
here. This already happened once to `contact.thatuglyboy.com`. If this page
ever starts looking like the main site, check that Worker's routes first.

## Layout

- `index.html` — shell and the entire stylesheet, inline. Renders nothing on
  its own; `#app` is filled by `app.js`.
- `lang-store.js` — the language choice. **Duplicated** in `../main-site` and
  inlined in `../contact/index.html`; change one, change all three.
- `app.js` — one render function per section.
- `content.js` — **every string and every outbound link, both languages.**
- `fonts/`, `media/`, `favicon.png` — assets, all relative paths.

### Why `content.js` and not `content.json`

The main site fetches its copy as JSON and holds an inline fallback, so a
syntax error there fails *silently* — it renders the stale fallback and the
edit looks like it did nothing. A plain script has no fallback to hide behind:
a bad edit throws and the page goes blank. Better failure for a hand-edited file.

## Keep it short

This page is a poster, not a design document. One sentence per idea. The first
build carried six feature paragraphs, a roadmap, an about essay and a fact
strip, and it read as documentation — the references it is measured against
(playbalatro.com, undertale.com, weatherfactory.biz/book-of-hours) put a
wordmark, one sentence, and the store buttons above the fold and stop.

If a feature needs two sentences it is two features, or it is not a headline.

## The link slots that are still empty

`LINKS` at the top of `content.js`. Empty is not a bug — the renderer draws
those as a flat olive plate carrying a `soon` chip, so the gap shows on the page:

- `steam` — the store page. Mirror it into `../main-site/games.json` (`steam`)
  too; that button is hidden entirely while the field is empty.
- `discord.es` — the LATAM server.
- `discord.en` — the worldwide server.

Both servers always show in the community section whatever the page language
is, each named in its own language.

## The screenshots are generated, not captured

`agent_simulation/generate_site_screenshots.py` renders them headless — no
window, no HUD, no cursor. `media/screen-1..4.jpg` are the gallery; `bg-1..4.jpg`
are the washes behind the sections. Re-run it and re-copy to change them; do not
hand-crop a screen capture, because the HUD is in one and this has no HUD in it.

Three things that script has to get right, and they are worth knowing before
editing it:

- **The HUD comes off three different ways.** `game_ui = None` drops the whole
  HUD block. `_cinematic_clean()` — the game's own switch, written for the
  defeat close-up — takes the selection rings, order lines, targeting lines and
  the alarm "!". `_draw_marked_figure` is stubbed because the "0 / 200" under a
  cave is drawn in *world* space, where no HUD flag reaches it.
- **The camera is searched, not set.** The ground is generated from noise, so
  there is no list of rocks or ponds to aim at. Each scene renders a dozen-odd
  candidate framings and keeps the one with the widest spread of luminance and
  chroma — a decent stand-in for "interesting", since every feature the
  generator makes arrives as a change in colour.
- **The cast is mixed on purpose.** A settlement of nothing but settlers is one
  silhouette repeated forty times, so scenes draw a class mix and add divine
  units (dog, entertainer, priest, strategos). Spiders have full art and labels
  but no stat branch in `Predator.__init__`, so they fall through to the wolf
  numbers — fine for a still, and the reason they can appear here while they are
  still off `ENEMY_FAMILY_POOL` for real runs.

The washes are blended `luminosity` at low opacity and masked to nothing at
both edges. Luminosity rather than normal so they contribute light and shade
but no colour, which keeps the paper's hue and stops a band reading as a photo
pasted onto the sheet.

## Colour: sampled, not chosen

Every value in `:root` comes off the game's own plates in `assets/ui/`, and the
three textures are those plates with their black outline cropped away:

| token | plate | |
|---|---|---|
| `--paper` | `menus/bloodline_banner.png` | `#c1bea7`, warmed toward Lascaux ochre |
| `--capsule` | `menus/option_row.png` | `#3f2627`, lifted for the light page |
| `--olive` | `modal_button_secondary.png` | the not-yet plate |
| `--lime` | `primary_start_run.png` | `#d8d878` |
| `--sienna` / `--oxide` / `--amber` | `assets.py` Lascaux block | accents |

**Hue comes from the art; lightness and chroma are set in OKLCH.** That is the
whole reason the palette is specified the way it is: in OKLCH the two move
independently, so chroma can be pushed for liveliness without any pair losing
contrast. Several values sit at the sRGB gamut edge for their lightness. Every
pair is checked — body text on paper 10.6:1, text on the maroon plates 10.8:1,
headings 4.5:1, the loop 3.4:1 (both large sizes, which need 3.0).

If you change a value: **L for contrast, C for saturation.** They do not
interfere. Sienna at its raw sampled value was 2.7:1 on this paper; solving for
L fixed it without dulling the hue.

`--ic-1..4` are one accent per About card. They only ever sit on the maroon
plate, which is why they can run as bright as they do.

**The page is a sheet of parchment and everything else is a plate lying on it.**
Cards, buttons and screenshot frames are one object: painted fill, 3px black
outline, hard ink offset plus a soft bloom. Nothing on the page may be the same
colour as the paper — that is what keeps the plates legible.

Regenerating a texture (all three are scripted one-offs, see git history):
- `tex_page.jpg` — bloodline_banner's interior, softened by blending toward its
  **own mean colour** and then warmed. Do not use `ImageEnhance.Contrast` for
  this: it pulls each channel to its own mean, drains the warmth, and the paper
  comes out neutral grey. Mirrored 4-way into a seamless tile — the watercolour
  has no directional detail, so the joins are invisible, where a plain repeat
  shows a hard seam.
- `tex_maroon.png`, `tex_bone.png` — 10% inset crops, no other processing.

## Fonts: the accent problem

`fonts/lingming.ttf` and `fonts/sable.ttf` are the game's display faces from
`agent_simulation/assets/fonts/`.

**lingming carries no accented glyphs at all** — verified against its cmap, not
assumed: `á é í ó ú ñ ü ¿ ¡` are all absent. Spanish set in it comes out with
holes, or with single letters picked from a fallback face mid-word. So the whole
display stack swaps:

```css
[lang="es"] { --font-display: 'sable', serif; }
```

Scoped to any `[lang="es"]`, not just `<html>`, because the community buttons
carry their own `lang` — that is what puts *español* in sable while the page
around it is English.

The two faces put their baselines in different places at the same nominal size.
Measured at 40px: lingming is ascent 35 / descent 5, sable ascent 27 /
descent 13, capitals the same height. One `ascent-override`/`descent-override`
pair on both normalises the line box; `size-adjust: 110%` on sable matches the
cap height. Same correction the game makes in `assets.py` (`_DisplayFace`) and
`locales/es/_meta.json` (`display_scale: 1.1`) — if that number changes there,
change it here.

## The two image marks

`ugly_boy` is **not** loaded as a webfont. It is drawn as hairlines for the main
site's 150px+ masthead, and its extenders run about seven times its x-height;
set live at any size a footer can carry, the strokes fall under a pixel and it
renders as scratches. `media/tub_wordmark.png` is that text rasterised at 420px
from `../main-site/fonts/ugly_boy.ttf`, cropped tight to its ink, and used as a
CSS mask so it takes `currentColor`.

The piece is aligned on the **meanline** — the top of the x-height, since
"that ugly boy" has no capitals or ascenders — not on the middle of the words.
Two measured corrections, both off the alpha channels:

- the left peg's centre sits at **0.594** of the mark's height, 9.38% below its
  own box centre (`--peg-drop`)
- the meanline sits at **0.4231** of the wordmark's height, where the box centre
  is 0.5 (`--mean-rise`)

With both boxes centred on the flex line, the piece is shifted up by
`0.0938 x mark + 0.0769 x wordmark`. Re-measure rather than nudging if either
PNG is redrawn.

Scale matters too: the wordmark's x-height is only 14.6% of its box, so a piece
sized to the box towers over the words. Order and proportion follow the main
site's masthead — wordmark first, piece to its right, at about half the
wordmark's box height. The main site now carries the same relationship, both the
0.206 horizontal gap and the peg-on-meanline alignment.

`.tub .name` must keep the PNG's 1.885:1 aspect. Any other ratio letterboxes
inside `contain` and slides the words off the piece.

`media/settler.png` is `assets/unit1.png` — the base agent, and the silhouette
the house mark is drawn from. The source is only **88x94**, so it is upscaled 5x
with its alpha re-thresholded to keep a hard edge. It holds at the hero's 132px
and should not be pushed much past that until there is a bigger original.

## Language

`lang-store.js` resolves and stores it: `?lang=` → the shared cookie →
this origin's `localStorage` → `navigator.language` → english. `?lang=` is
consumed and stripped with `replaceState`.

The choice is shared with `thatuglyboy.com` and `contact.thatuglyboy.com` via a
**cookie** (`tub_lang`) scoped to `.thatuglyboy.com`. `localStorage` cannot do
this — it is keyed by origin — but a cookie is keyed by domain. `localStorage`
is still written as the fallback for hosts the cookie domain cannot cover:
localhost and `*.workers.dev`.

The cookie carries no `Secure` flag on purpose: it would be dropped on
`http://localhost`, and the value is a two-letter display preference.

## Copy register

Lowercase throughout, declarative, no second person. Spanish is written
natively, not translated.

## Related

- `../main-site` — `thatuglyboy.com`. `games.json` holds the ochre entry and the
  link here; `i18n.json` holds `games.site`.
- `../contact` — `contact.` / `contacto.thatuglyboy.com`.
- `D:\Documentos\Proyectos\Godot\agent_simulation` — the game. `README.md`,
  `BUILDINGS.md` and `RESEARCH_TREE.md` are where the feature copy comes from;
  `assets/ui/` is where the palette comes from.
