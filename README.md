# Fundsy

A student-run guide to the scholarships, discounts, free food and local spots that
college students in Dallas–Fort Worth actually use.

## Running it

You need Docker running for the database.

```bash
npm install
cp .env.example .env.local
npm run db:start      # starts local Supabase, prints the keys
npm run dev
```

Put the values `db:start` prints into `.env.local` — Project URL, the anon key,
and the service role key. Then open http://localhost:3000.

| Command | |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run db:start` | Start local Supabase |
| `npm run db:stop` | Stop it |
| `npm run db:reset` | Wipe and re-apply migrations |
| `npm run db:studio` | Open Supabase Studio (127.0.0.1:54323) |
| `npm run db:editors` | Recreate the local editor accounts after a reset |

Submissions land in the local database — read them in Studio.

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
| 3 — Component migration | Done. All nine pages built |
| 4 — Forms + Supabase | Done against **local** Supabase. Not linked to a hosted project |
| Posts / CMS | Done. `/admin`, magic-link sign-in, drafts, Markdown |
| 5 — Vercel | **Not started** |

All nine pages are built. Student resources, Opportunities and Savings are the same
`<SectionPage>` component with different data — a banded header, a rail carrying on-page
nav plus Featured plus deadlines, and categories introduced by a photo card. Categories
can vary their listing layout (`rows`, `pairs`, `trio`) so a page never reads as one
repeated shape.

About, Small businesses, Our team and Newsletter have their own layouts, built from the
same components.

**All copy is placeholder.** The sentences are real sentences so the layouts can be
judged, and the listings are plausible, but no date, amount or deadline on this site has
been verified. Everything needs checking by a student before it goes live.

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

## Writing posts

The site is a blog: Amy and Ryan write posts at **`/admin`** and they appear on
`/blog`, on the homepage rail, and at `/blog/<slug>` — no deploy, no developer.

Sign-in is a magic link. There are no passwords to lose, and no self-signup: an address
has to already exist as a user *and* be listed in `public.is_editor()` in
`supabase/migrations/20260908000000_posts.sql`. Two gates on purpose — being able to sign
in is not the same as being allowed to write.

Locally, `supabase db reset` wipes the auth users along with everything else, so recreate
them with `npm run db:editors`, then take the sign-in link out of Mailpit at
http://127.0.0.1:54324.

**Drafts are genuinely invisible.** Public pages read the database as `anon`, and the RLS
policy only exposes rows where `published = true` — so an unpublished post 404s rather
than relying on a filter in application code that someone could forget. Verified against
the running database: anon sees only published rows, a signed-in non-editor also sees only
published rows and cannot write at all, and an editor sees everything.

Post bodies are Markdown, rendered with react-markdown. Raw HTML is not enabled and
nothing goes through `dangerouslySetInnerHTML`, so a post cannot inject script into the
page even if an editor account were compromised.

### What is not editable yet

Posts are. The category-page listings on Student resources, Opportunities and Savings are
still in `src/lib/pages.ts` and need a developer. Moving those into the database is the
obvious next step and would reuse everything the posts table already does.

## Instagram and the newsletter

The site links to the real accounts: [@fundsyofficial](https://www.instagram.com/fundsyofficial/)
and **The Fundsy Scoop** on LinkedIn. The newsletter page lists every real edition, with
links straight through to LinkedIn.

### Instagram posts need a token — there is no way around it

The homepage grid shows the six most recent posts **once `INSTAGRAM_ACCESS_TOKEN` is
set**. Until then it falls back to placeholder tiles that link to the profile, so the
layout never has a hole in it.

It cannot work without a token, and that is worth understanding before anyone spends time
on it:

- The public profile page returns 200 and its meta tags carry the follower and post
  counts, but **the HTML contains no posts at all** — Instagram renders them client-side
  behind an auth check.
- The old public oEmbed endpoint now redirects, and Instagram Basic Display was shut
  down in 2024.
- Scraping is not a shortcut worth taking. It breaks Instagram's terms, the media URLs
  are short-lived signed CDN links that cannot be stored, and the markup changes without
  notice. This repo deliberately contains no scraper.

**To switch it on:**

1. Make @fundsyofficial a Professional account (Business or Creator) in the Instagram app
   — Settings → Account type.
2. Create a Meta app at developers.facebook.com and add the **Instagram** product.
3. Generate a long-lived user access token with the `instagram_business_basic` scope.
4. Put it in `.env.local` as `INSTAGRAM_ACCESS_TOKEN`, and in Vercel's environment
   variables for production.

Long-lived tokens last 60 days and need refreshing, so this eventually wants a scheduled
refresh. `src/lib/instagram.ts` fetches on an hourly revalidate and returns `null` on any
failure, so an expired token degrades to the fallback rather than breaking the page.

### The newsletter

`ISSUES` in `src/lib/pages.ts` is a hand-maintained list of editions. Titles, links and
excerpts all come from the newsletter's own public pages, so every word shown is Amy's —
nothing is summarised or paraphrased here. Add a row when a new edition goes out; LinkedIn
has no public API for this.

## ⚠ Photography

The images in `public/assets/img/` are **placeholders from a stock placeholder service
and are not licensed for Fundsy to publish.** Every one must be replaced before launch —
with photos the team shoots, photos a business gives permission for, or properly licensed
stock. They are here so the layouts can be judged against real pictures.

Team avatars are initials rather than faces on purpose: a stock portrait standing in for
a named ambassador is worse than an obvious placeholder.
