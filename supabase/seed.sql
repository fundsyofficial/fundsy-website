-- Runs on `supabase db reset`. One example post so a fresh local database
-- shows a working blog rather than an empty state, and so the homepage rail
-- has something real in it.
insert into public.posts (slug, title, excerpt, body, category, cover_image, tone, author, published)
values (
  'free-groceries-on-thursdays-campus-by-campus',
  'Free groceries on Thursdays, campus by campus',
  'Four DFW pantries that never ask for paperwork, with the hours that are actually right this semester.',
  E'## What you need\n\nA student ID. That is the whole list — no income paperwork, no referral, no appointment.\n\n## Where and when\n\n- **UT Dallas** — Comet Cupboard, Thursdays 11am to 3pm\n- **UT Arlington** — Thursdays 12pm to 4pm\n- **UNT** — Wednesdays and Thursdays, 10am to 2pm\n- **Dallas College** — varies by campus, check before you go\n\nBring a tote. They run out of bags by the afternoon, and produce arrives on Thursday mornings, so going early is worth it.\n\n> If the shelves look picked over, ask. There is usually more in the back.\n\nWe re-check these hours every semester, because they change more often than anyone announces.',
  'Student resources',
  '/assets/img/pantry.jpg',
  'mint',
  'Amy',
  true
);
