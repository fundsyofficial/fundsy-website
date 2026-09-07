# Fundsy

A student-run guide to the scholarships, discounts, free food and local spots that
college students in Dallas–Fort Worth actually use.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

| Command | |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

## Where things are

```
src/app/          routes — one folder per page
src/app/styles/   base.css (structure) + theme.css (skin)
src/components/   the design system
src/lib/site.ts   navigation, section colours, socials
src/lib/content.ts  placeholder editorial content — becomes Supabase in Phase 4
public/assets/img   placeholder photography (see the warning below)
wireframes/       the Phase 1 static HTML, kept for reference
```

## The design system

Structure and skin are separate on purpose, and that split should survive:

- **`base.css`** is layout only — the grid, the bento mosaic, the featured rail, forms.
  It contains no colour and no typeface decisions.
- **`theme.css`** is the entire visual identity. Swapping the design direction is
  swapping this one file. Nine earlier directions live in `wireframes/alternates/`.

Both are imported **into a cascade layer** in `globals.css`. That matters: Tailwind v4
puts utilities in `@layer utilities`, and unlayered CSS beats every layered rule
regardless of specificity — imported plainly, `h1,h2,h3,h4{margin:0}` silently
overrides every `mb-*` utility in the markup. Keep the `layer(components)` on those
imports.

### Rules worth keeping

**Pastel fills, near-black ink.** The palette is soft but `--ink` is `#0D0D10`. That
contrast is what lets type sit at 400–700 instead of leaning on weight for hierarchy.
Lighten the ink and the whole system collapses.

**The signal colour is spent only on actions.** `#FF3D8B` marks the primary button, a
deadline about to close, a link underline — nothing else. Pastel gets to stay pastel
because it is never asked to carry urgency.

**Colour is a key.** Each section owns a colour (`src/lib/site.ts`) and keeps it in the
page-header band, the homepage tile chip, the category heading marker and the on-page
nav dot.

**Motion:** one moment only, and `prefers-reduced-motion` is respected.

### Known gap

Earlier directions used **shadow to mean clickable**. This one has no shadows, so a
tile you can click and a card you only read look identical. That needs solving — most
cheaply as a border-weight or background difference on interactive cards.

## Status

| Phase | |
| --- | --- |
| 1 — Wireframes | Done. `wireframes/` |
| 2 — Next.js + Tailwind | Done |
| 3 — Component migration | Done for Home, Student resources, Contact |
| 4 — Forms + Supabase | **Not started.** Forms render but do not submit |
| 5 — Vercel | **Not started** |

Six routes are honest placeholders — About, Opportunities, Savings, Small businesses,
Our team, Newsletter. They render the real header, nav state and metadata, and say what
is coming. They follow the `/resources` template; what they need is content, not design.

**The contact forms deliberately have no submit handler.** They call
`preventDefault()` rather than posting to a half-built endpoint, so a student's message
can never be silently dropped. Wiring them up is Phase 4:

1. A Supabase project, then `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   in `.env.local`.
2. Tables matching the shapes in `src/lib/content.ts`, plus a **private** bucket for
   resumes.
3. A server action per panel in `src/components/ContactForms.tsx`.

The consent checkbox and the "deleted once we've sent you notes" line on the resume form
are promises the backend has to actually keep.

## ⚠ Photography

The images in `public/assets/img/` are **placeholders from a stock placeholder service
and are not licensed for Fundsy to publish.** Every one must be replaced before launch —
with photos the team shoots, photos a business gives permission for, or properly licensed
stock. They are here so the layouts can be judged against real pictures.

Team avatars are initials rather than faces on purpose: a stock portrait standing in for
a named ambassador is worse than an obvious placeholder.
