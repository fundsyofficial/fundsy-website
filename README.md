# Fundsy

A student-run guide to the scholarships, discounts, free food and local spots that
college students in Dallas–Fort Worth actually use.

## Running it

```bash
npm install
npm run dev
```

That is the whole setup. **The site reads no environment variables and talks to no
database.** There is nothing to configure, no `.env` file, no services to sign into.

| Command | |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

Every page is prerendered as static HTML at build time.

## Editing the site

All content is in code. Change a file, commit, deploy.

| What | Where |
| --- | --- |
| Homepage hero, mosaic, section tiles, Instagram tiles | `src/lib/content.ts` |
| Student resources listings | `src/lib/content.ts` (`RESOURCE_*`) and `src/lib/pages.ts` |
| Opportunities, Savings listings | `src/lib/pages.ts` |
| About, team, businesses, newsletter editions | `src/lib/pages.ts` |
| Blog posts | `src/lib/posts.ts` |
| Nav, footer, section colours, email, socials | `src/lib/site.ts` |
| Photographs | `public/assets/img/` |

### Adding a blog post

Add an entry to `POSTS` in `src/lib/posts.ts`:

```ts
{
  slug: "where-to-eat-for-under-ten-dollars",
  title: "Where to eat for under ten dollars near every campus",
  excerpt: "One or two sentences. This shows on the blog index and the homepage rail.",
  category: "Student resources",
  coverImage: "/assets/img/market.jpg",
  tone: "mint",
  date: "2026-10-02",
  author: "Amy",
  body: `## A heading

A paragraph. Blank lines separate paragraphs.

- a list item
- another`,
}
```

`body` is Markdown. The post appears at `/blog/<slug>`, on `/blog`, and the three most
recent fill the Featured rail on the homepage. Ordering is by `date`, newest first.

## The design system

Structure and skin are separate on purpose, and that split should survive:

- **`base.css`** is layout only — the grid, the bento mosaic, the featured rail. It
  contains no colour and no typeface decisions.
- **`theme.css`** is the entire visual identity. Swapping the design direction is
  swapping this one file. Nine earlier directions live in `wireframes/alternates/`.

Both are imported **into a cascade layer** in `globals.css`. That matters: Tailwind v4
puts utilities in `@layer utilities`, and unlayered CSS beats every layered rule
regardless of specificity — imported plainly, `h1,h2,h3,h4{margin:0}` silently overrides
every `mb-*` utility in the markup. Keep the `layer(components)` on those imports.

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

**The favicon** is the wordmark's lowercase `f` in Archivo 800 on pastel pink —
`src/app/icon.png`, `apple-icon.png` and `favicon.ico`.

### Known gap

Earlier directions used **shadow to mean clickable**. This one has no shadows, so a tile
you can click and a card you only read look identical. That needs solving — most cheaply
as a border-weight or background difference on interactive cards.

## Getting in touch: email

**`fundsy.official@gmail.com`** is the only channel and the contact page leads with it.
Each purpose — a question about a listing, resume help, a partnership, sharing a find —
gets a prefilled subject and, for finds, a body template.

**There are no forms anywhere on the site.** No submissions, no database, no inbox to
remember to check. A form's whole job here was to deliver a message to that address, and
an email does it without a service to maintain.

## Instagram and the newsletter

Both link out: [@fundsyofficial](https://www.instagram.com/fundsyofficial/) and **The
Fundsy Scoop** on LinkedIn. The newsletter page lists every real edition with its own
opening line, taken from each issue's public preview.

The Instagram tiles on the homepage are **pictures kept in the repo**, not live posts.
Pulling real posts needs an Instagram Graph API token, which means a secret to store and
rotate every 60 days — deliberately not how this site works. Swap the images in
`src/lib/content.ts` when they go stale.

## Status

| | |
| --- | --- |
| Design, all nine pages | Done |
| Blog | Done, posts in `src/lib/posts.ts` |
| Deployment | **Not started** |

Deploying is `vercel` against this repo, with nothing to configure.

## ⚠ Before this goes live

**The photographs in `public/assets/img/` are placeholders from a stock placeholder
service and are not licensed for Fundsy to publish.** Every one has to be replaced —
with photos the team shoots, photos a business gives permission for, or properly
licensed stock. They are here so the layouts can be judged against real pictures.

Useful sizes: the mosaic lead wants a portrait crop around 900×1200, the wide cells
1000×700, the rail thumbs anything square, the category headers 1000×700.

**All listing copy is unverified.** The sentences are real sentences so the layouts can
be judged, and the listings are plausible, but no date, amount, deadline or business
detail has been checked.

**The team page has invented people on it.** Amy's name is real — it is the byline on
the newsletter. Ryan's surname is marked `[surname needed]` rather than guessed, and all
six ambassadors, their schools, majors and bios were made up to fill the layout.

Team avatars are initials rather than faces on purpose: a stock portrait standing in for
a named ambassador is worse than an obvious placeholder.
