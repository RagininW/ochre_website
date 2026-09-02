# The lockup

"that ugly boy" set beside the puzzle piece. It is the masthead on
`thatuglyboy.com` and the credit at the foot of `ochre.thatuglyboy.com`, and it
will appear on every game site after this one.

The two placements share rules 2 and 3 exactly and differ only in the piece's
size, in colour, and in overall scale. That is what keeps it the same object
wherever it turns up.

**Every relationship here is a ratio, and every ratio was measured.** None are
eyeballed pixel counts. The lockup has to hold in a masthead at 440px type and
in a footer credit at 140px, on any screen. If a number is wrong, re-measure —
do not nudge until it looks right, because "looks right" at one viewport is what
put the earlier versions out of true at every other one.

## The ruler

Everything is a fraction of **the wordmark's ink height** — the top of its
ascenders to the bottom of its descenders.

Not the element box, which carries the line's leading. Not the font-size, which
is an abstraction the eye never sees. The ink is what a reader actually lines
things up against.

## The three rules

**1. The piece is a fraction of the wordmark's ink height — the one ratio that
is per-placement.**

| placement | piece |
|---|---|
| `thatuglyboy.com` masthead | **0.6193** |
| `ochre` footer credit | **0.4857** |

Chosen, not derived, and the difference is deliberate: a masthead has room
around it and a footer credit does not, so the size that reads as balanced in
the credit leaves a hole in the hero. Both sit below the ascenders — sizing the
piece so its top meets them gives 0.69, which is near the masthead's value but
arrived at by accident.

Rules 2 and 3 are identical in both, and rule 3 is written against the wordmark
rather than the piece **so that changing this number does not silently move the
spacing too**.

**2. The centre of the piece's left peg sits on the wordmark's meanline.**

The meanline is the top of the x-height. "that ugly boy" has no capitals and
enormous ascenders and descenders, so its optical centre is nowhere near its box
centre — aligning the two boxes puts the piece visibly low. The peg is the
piece's left-hand lobe, the part of it that reads as sitting *on* a line.

With both tops on a common line, this puts the piece **down** by
`meanline − peg × piece` of the wordmark's height:

```
0.4154 − 0.6014 × 0.4857 = 0.1233
```

**3. The gap is 0.10 of the wordmark's ink height.**

Not of the piece. The piece's size is the thing most likely to be revisited, and
tying the gap to it means every such revision silently moves the spacing too.

**And one constraint.** The piece scales with the type, never with its
container. Both sites had a version where a grid column sized it; past some
viewport the column stopped growing, or the nowrap wordmark squeezed it, and the
ratios came apart while the type kept going. Size the piece off the wordmark and
the rest follows.

## The measurements

### `ugly_boy`, set to "that ugly boy"

**No full stop.** The masthead carried one and the Ochre artwork did not, which
is why the two lockups measured differently for a while. It is gone from both.

Read off the live face with canvas metrics and a baseline-aligned probe, at
374.4px. All are multiples of the font-size, so they hold at any size.

| | value | what it is |
|---|---|---|
| ink height | **0.9531 em** | ascender top to descender bottom — the ruler |
| ink top | **0.2277 em** | below the element's box top. The box is taller than the ink; this is the offset any top-alignment must clear. |
| meanline | **0.4098** | as a fraction of the ink height — rule 2's target |
| box width | 1.901 em | the rendered element width under `white-space: nowrap` |
| advance | 1.771 em | |
| x-height | 0.1563 em | tiny; the extenders run about six times it |
| baseline | 0.7746 em | below the box top |

Ochre's PNG measures its meanline at **0.4154** rather than 0.4098 — a browser
reads the x-height off the glyph outline, a rasteriser off thresholded pixels.
Use each renderer's own figure for the thing it renders. The two look identical.

**`letter-spacing` puts a space after the last glyph too.** At 0.01em over
thirteen characters the element box runs 0.13em past the advance, and that
trailing space landed in the gap. The masthead cancels it with
`margin-right: -0.01em`.

### The piece

Both sites use the same crop, so there is one number:

| file | left peg centre |
|---|---|
| `main-site/covers/portrait.png` | **0.6014** of the image height |
| `ochre/media/tub_mark.png` | **0.6014** — the same crop, as a mask |

`tub_mark.png` is generated *from* `covers/portrait.png`: cropped to its ink,
alpha thresholded, painted white so CSS can tint it. Regenerate it from that
file and nothing else, or the peg figure drifts apart again.

### Where they land

| placement | wordmark | piece | gap |
|---|---|---|---|
| `thatuglyboy.com` masthead | live text, 0.9531 em of ink | 0.5903 em (0.6193) | 0.0953 em |
| `ochre` footer credit | 140px PNG | 68px (0.4857) | 14px |

## Where they live

`main-site/index.html`, in `:root`:

```css
--lockup-ink:    0.9531;  /* wordmark ink height, in ems */
--lockup-inktop: 0.2277;  /* element box top -> ink top, in ems */
--lockup-mean:   0.4098;  /* meanline, fraction of the ink height */
--lockup-peg:    0.6014;  /* peg centre, fraction of the piece height */
--lockup-mark-r: 0.6193;  /* piece height, fraction of the ink height */
--lockup-gap-r:  0.1000;  /* gap, fraction of the ink height */
--lockup-box:    1.901;   /* element box width, in ems */
```

Everything else in that masthead derives from these. The type is capped at the
size where the whole lockup still fits its row —
`box + gap + piece = 1.901 + 0.0953 + 0.5903 = 2.587` ems — so the ratios never
bend to make room. That cap is what every earlier version was missing: `26vw`
kept growing after `#app` stopped at 1440, and the piece was squeezed to absorb
the difference.

`ochre/index.html` carries the same numbers on `.tub` as `--mark-r`, `--gap-r`,
`--mean-r` and `--peg-r`, against a `--wordmark-h` in pixels, because there the
wordmark is a fixed-size image rather than live type.

Verified at 1100, 1200, 1440 and 1920: the placement's own piece ratio, gap
0.100, and the peg on the meanline to the pixel, at every one.

Changing the piece's size does **not** need the vertical re-solved by hand. The
piece is centred in a box whose height does not depend on it, so its peg sits at
`centre + 0.1014 x ratio x ink` — move the ratio and the correction moves by
`0.1014 x ink x delta`. Going 0.4857 -> 0.6193 took the slope from 0.09623 to
0.08332, and that landed on the meanline to the pixel first try.

## Re-measuring

The figures come out of the artwork and the font, so a new crop or a change to
the wordmark string invalidates them.

- **Peg centre**: take the image's alpha, walk the column-coverage profile in
  from the left edge until it necks — that isolates the left lobe — then take
  the vertical midpoint of that lobe's rows and divide by the image height.
- **Ink height, ink top, meanline**: `canvas.measureText(...)` gives
  `actualBoundingBoxAscent` and `actualBoundingBoxDescent` for the string and
  the x-height from `'x'`. For the baseline, put a zero-size `inline-block` with
  `vertical-align: baseline` after the text and read its top edge. Ink height is
  ascent + descent; ink top is baseline − ascent; meanline as a fraction is
  `(ascent − xHeight) / inkHeight`.
- **Box width**: render at a known size with `white-space: nowrap`, divide the
  element width by the font-size.

## Two traps worth writing down

**`<figure>` has a UA margin.** `.portrait-card` is a `<figure>`, and browsers
give those `margin: 1em 40px`. That 40px *was* the separation for a long time —
not the grid gap, not any rule in the site's own CSS — which is why measuring
the grid never found it. Anything carrying the piece needs `margin: 0`.

**A `1fr` column is not the wordmark.** An `fr` track leaves trailing slack that
varies with the viewport, and that slack lands in the gap. The masthead's
wordmark column is `max-content`, so the column *is* the wordmark.
