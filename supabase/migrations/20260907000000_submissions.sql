-- Fundsy form submissions.
--
-- Four tables rather than one polymorphic table: Amy and Ryan read these in the
-- Supabase dashboard, and named columns are far easier to work through than a
-- jsonb blob.
--
-- SECURITY MODEL — read this before changing any policy below.
--
-- Every table has RLS enabled and NO policies granting anon or authenticated
-- anything. That is deliberate, not an oversight. These tables hold students'
-- email addresses, schools and resumes. The anon key ships to the browser, so
-- any policy granting anon SELECT would publish every submission to anyone who
-- opened devtools.
--
-- Writes go through Next.js server actions using the service role key, which
-- bypasses RLS and never leaves the server. Reads happen in the dashboard.
--
-- If you later add public reads (published listings, say), put those in their
-- own table. Do not loosen these.

create extension if not exists "pgcrypto";

-- Shared status vocabulary so the dashboard reads consistently.
create type public.submission_status as enum ('new', 'reviewing', 'done', 'declined');


-- "Know something we should share?" -----------------------------------------
create table public.finds (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  find_name   text not null,
  category    text not null,
  city        text,
  link        text,
  details     text,
  email       text not null,
  school      text,
  credit      boolean not null default false,
  status      public.submission_status not null default 'new'
);

comment on table public.finds is
  'Community submissions from the Share a find form. A student on the team checks each one before it goes on the board.';


-- General questions ----------------------------------------------------------
create table public.questions (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  email       text not null,
  topic       text not null,
  message     text not null,
  status      public.submission_status not null default 'new'
);


-- Partnership requests -------------------------------------------------------
create table public.partnership_requests (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  organisation  text not null,
  contact_name  text not null,
  email         text not null,
  website       text,
  partner_type  text not null,
  message       text,
  status        public.submission_status not null default 'new'
);


-- Newest first is how every one of these is read.
create index finds_created_at_idx                on public.finds (created_at desc);
create index questions_created_at_idx            on public.questions (created_at desc);
create index partnership_requests_created_at_idx on public.partnership_requests (created_at desc);


-- RLS on, no policies. See the note at the top of this file.
alter table public.finds                enable row level security;
alter table public.questions            enable row level security;
alter table public.partnership_requests enable row level security;

-- Resume reviews are handled over email for now: students send a PDF to
-- hello@fundsy.org and the team replies there. That was a deliberate call —
-- an upload endpoint means a private bucket, a consent record and a promise to
-- delete files, all to do something an inbox already does. If it comes back,
-- the original table and bucket are in git at commit 904796a.
