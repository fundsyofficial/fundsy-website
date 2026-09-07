# Fundsy — Phase 1 wireframes

Static HTML + Tailwind, for Amy and Ryan to react to before any React gets written.

```bash
cd wireframes && python3 -m http.server 8787
```

Then open http://localhost:8787 — or just double-click `index.html`.

| File | What it is |
| --- | --- |
| `index.html` | Homepage |
| `resources.html` | Generic content page — the template for Opportunities, Savings, Small Businesses |
| `contact.html` | Form page — Share a find, General question, Partner with us, Resume help |
| `base.css` | Structure: layout, grid, mosaic, rail, forms. No colour or type decisions |
| `theme-p6.css` | The skin: palette, typefaces, weights, corners, photo treatment |
| `fundsy.js` | Mobile drawer, form tab switching, file-name display |
| `logo-options.html` | Five wordmark candidates in the real header |
| `assets/img/` | 18 placeholder photographs — **see the licensing note below** |
| `alternates/` | The design directions that lost. Nothing live loads from here |

## The direction

Quiet pastel. Pastel fills on white, a bold Archivo headline, and **space instead of lines** —
no card outlines, no drop shadows. Borders survive only where they're the affordance: form
fields and buttons.

The palette is pastel but the **ink is near-black** (`#0D0D10`), which is the whole trick.
An earlier pastel round failed because the ink was pastel too — nothing had contrast, so the
headline weight had to do all the work and every heading turned into the same chunky bold sans.
Black on butter yellow is 14:1, so the type can sit at 400–700 and still read.

| Role | |
| --- | --- |
| Ground / cards | `#FFFFFF`, alternating band `#F7F4FB` |
| Ink — all text, all borders | `#0D0D10` |
| Student resources / Transportation | `#FFE6A3` |
| Opportunities / Food | `#A9E3CC` |
| Savings + discounts / Healthcare | `#FFC9DC` |
| Small businesses / Wellness | `#C0CCF9` |
| **Signal** — actions only | `#FF3D8B` |

**The signal colour is the rule that makes the pastels work.** Hot pink is spent only on
things you act on: the primary button, a deadline about to close, a link underline. Pastel
gets to stay pastel because it is never asked to carry urgency. Don't spread it around.

**Type.** Archivo throughout — 700 for display, 600 for subheads and UI, 400 for text.
Hierarchy comes from size and colour, never from adding weight. The wordmark is Archivo 800
set tight; `logo-options.html` has four alternatives and swapping is three lines
(`--font-logo`, `--w-logo`, `--logo-ls`).

**Colour is a key, not decoration.** Each section owns a colour and keeps it everywhere: the
page-header band, the chip on the homepage tile, the marker beside a category heading, the dot
in the on-page nav.

**Motion.** One moment only — the hero board settling in on load. No fade-up per section, no
lift on every card. `prefers-reduced-motion` is respected.

## Two borrowed layouts

**The bento mosaic** (from the Go Gym shot): the week's picks are five cells of deliberately
unequal size — a tall lead image with a text panel notched into its corner, a flat colour cell
carrying a headline and two follow-on links, a wide image, a narrow image, and a chip cloud.
It never reads as a row of identical cards.

**The Featured rail** (from the Enjooy shot): a narrow right column of square thumb, date,
two-line title. It runs on the homepage and on the resources page, where it also carries the
on-page nav and a Closing soon deadline list. Deadlines get a different shape from the
Featured items on purpose — different kind of information.

## Known gap

The outlined earlier directions used **shadow to mean clickable**: things you click got a hard
offset shadow, things you only read got a hairline. This direction has neither, so a tile you
can click and a card you only read now look identical. That distinction needs to come back some
other way before build — most cheaply as a border-weight or background difference on
interactive cards.

## About the photographs

The 18 images in `assets/img/` are **placeholders pulled from a stock placeholder service to
judge layout — they are not licensed for Fundsy to publish.** Every one has to be replaced
before the site goes live, with photos the team shoots, photos a business gives permission for,
or properly licensed stock. They're in the repo so the wireframes look like a real site rather
than a grid of grey boxes; treat them as sizing guides.

Sizes if you're shooting replacements: the mosaic lead wants a portrait crop around 900×1200,
the wide cells 1000×700, the rail thumbs anything square, the category headers 1000×700.

The team avatars are initials rather than faces on purpose — a stock portrait standing in for a
named ambassador is worse than an obvious placeholder.

## Notes for Phase 2/3

- `base.css` and `theme-p6.css` are already split the way the Next.js app should be: structure
  in components, skin in tokens. The `:root` block in `theme-p6.css` drops into
  `tailwind.config.ts` plus a CSS variable layer.
- Comments in the HTML name the component each block becomes (`<PinnedNote/>`, `<TearOffNav/>`,
  `<BoardMosaic/>`, `<FeaturedRail/>`, `<ResourceRow/>`, `<ContactForms/>`).
- `base.css` carries neutral fallback tokens on purpose. A theme that fails to load then looks
  obviously broken rather than looking like a deliberate minimal design — which is exactly the
  confusion one malformed comment caused during design.
- `contact.html` is where Supabase attaches: three tables' worth of submissions plus a private
  bucket for resumes. The consent checkbox and the "deleted once we've sent you notes" line are
  promises the backend has to actually keep.
- The Tailwind CDN script is fine for wireframes and must not survive into Next.js.
