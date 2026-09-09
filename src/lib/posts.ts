import type { Tone } from "@/lib/site";

/** Posts, written in code.
 *
 *  There is no CMS and no database. To publish, add an entry to POSTS below
 *  and deploy — the blog index, the post page and the homepage rail all read
 *  from here.
 *
 *  `body` is Markdown. Use a template literal so it can span lines; blank lines
 *  separate paragraphs, `##` makes a heading, `- ` a list item.
 *
 *  Newest first — the order in this array is the order on the site. */

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  coverImage?: string;
  tone: Tone;
  /** ISO date, e.g. "2026-09-12". Shown on the post and in the rail. */
  date: string;
  author?: string;
};

export const POSTS: Post[] = [
  {
    slug: "free-groceries-on-thursdays-campus-by-campus",
    title: "Free groceries on Thursdays, campus by campus",
    excerpt:
      "Four DFW pantries that never ask for paperwork, with the hours that are actually right this semester.",
    category: "Student resources",
    coverImage: "/assets/img/pantry.jpg",
    tone: "mint",
    date: "2026-09-12",
    author: "Amy",
    body: `## What you need

A student ID. That is the whole list — no income paperwork, no referral, no appointment.

## Where and when

- **UT Dallas** — Comet Cupboard, Thursdays 11am to 3pm
- **UT Arlington** — Thursdays 12pm to 4pm
- **UNT** — Wednesdays and Thursdays, 10am to 2pm
- **Dallas College** — varies by campus, check before you go

Bring a tote. They run out of bags by the afternoon, and produce arrives on Thursday
mornings, so going early is worth it.

> If the shelves look picked over, ask. There is usually more in the back.

We re-check these hours every semester, because they change more often than anyone
announces.`,
  },
];

/** Newest first. */
export function getPosts(): Post[] {
  return [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

/** For dates in the UI. Written out rather than numeric, to match the rail. */
export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
