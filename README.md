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

Put the values `db:start` prints into `.env.local` — the Project URL and the anon key.
The service role key is only needed by `npm run db:editors`; the app itself never reads
it. Then open http://localhost:3000.

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

The database holds posts and nothing else. Nothing a visitor does writes to it.

## Where things are

```
src/app/          routes — one folder per page
src/app/styles/   base.css (structure) + theme.css (skin)
src/components/   the design system
src/lib/site.ts   navigation, section colours, socials
src/lib/content.ts  placeholder editorial content (homepage, resources)
src/lib/pages.ts    placeholder editorial content (the other sections)
src/lib/posts.ts    posts, read from Supabase
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
| 4 — Forms | Dropped. Everything is email; see below |
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

## Getting in touch: email first

**`fundsy.official@gmail.com` is the primary channel** and the contact page leads with
it. Each purpose — a question about a listing, resume help, a partnership — gets a
prefilled subject line, which costs nothing and makes the inbox sortable. None of those
three has a form or a database row, because those conversations belong somewhere a person
actually reads.

**There are no forms on the public site at all.** "Share a find" is an email too — the
button prefills a subject and a body template (what it is, where, a link, how it works,
the deadline), so people don't have to guess what's useful and we don't have to parse
prose.

That template is the old form's fields, moved into the email body. The same information
arrives, in a place someone actually reads.

### Why the forms went

They worked. The problem was where the submissions landed: a Postgres table nobody was
notified about. A find would sit there until someone remembered to open Supabase Studio,
which is not a workflow — it's a way to lose things quietly. Wiring up email forwarding
would have fixed the symptom while keeping a database, a service-role key and a spam
surface, all to deliver a message to an inbox.

The whole path went in stages, and each one is in git if it's ever wanted back:

| | |
| --- | --- |
| Resume upload — private bucket, consent record, deletion promise | `904796a` |
| General question and Partner with us forms | `9b7abf5` |
| Share a find form, `finds` table, zod validation | `f0f2001` |

### What this bought

**The app no longer uses the service-role key.** Nothing under `src/` reads it, and CI
does not set it. That key bypasses Row Level Security, and it now exists in exactly one
place: `scripts/create-editors.mjs`, a local development script. **Do not set it in
Vercel.**

The database is down to one table, `posts`, which holds nothing private. No student email
address is stored anywhere any more.

### Linking a hosted project

```bash
supabase link --project-ref <ref>
supabase db push
```

Then set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel. Those
two are all the app needs.

Also paste `supabase/templates/magic_link.html` into Authentication → Email Templates, and
add the production URL to the redirect allow-list, or admin sign-in links will point at
localhost.

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

If the database is unreachable, a post page raises an error rather than returning a 404 —
a live post 404-ing because Postgres blinked would get cached, and read as permanently
gone. The blog index degrades to its empty state instead, which is the right trade for a
list.

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
2. Create a Meta app at developers.facebook.com and add the **Instagram** product, with
   the `instagram_business_basic` permission.
3. Generate a token on @fundsyofficial: App Dashboard → Instagram → *API setup with
   Instagram business login* → Generate token. **This one lasts an hour**, which is not
   long enough to be useful.
4. Trade it for a 60-day token. Put your app secret in `.env.local` as
   `INSTAGRAM_APP_SECRET`, then:

   ```bash
   npm run ig:token exchange <the-one-hour-token>
   ```

5. Put the long-lived token it prints into `.env.local` as `INSTAGRAM_ACCESS_TOKEN`, and
   into Vercel's environment variables for production.

### Keeping it alive

Long-lived tokens expire after 60 days. Before then:

```bash
npm run ig:refresh
```

That extends it by another 60 days from today and prints the new value, which has to be
updated in both places. A token has to be at least 24 hours old and not yet expired to be
refreshable — if it lapses, start again from step 3.

**This is a diary entry waiting to be missed**, and the honest fix is to store the token
in Supabase and refresh it on a schedule rather than by hand. Worth doing once there is a
real token to store.

The app degrades rather than breaks: `src/lib/instagram.ts` returns `null` on any failure
and the grid falls back to placeholder tiles. An expired token logs a specific message
saying which command to run, so the cause is not a mystery.

`INSTAGRAM_APP_SECRET` is only used by the CLI script, never by the app. It must never
get a `NEXT_PUBLIC_` prefix — that would ship it to every visitor's browser.

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
