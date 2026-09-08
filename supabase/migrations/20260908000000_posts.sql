-- Blog posts, written and edited by the Fundsy team through /admin.
--
-- SECURITY MODEL — different from the submissions tables on purpose.
--
-- Submissions hold students' private details, so anon gets nothing. Posts are
-- public content, so anon may read PUBLISHED rows and nothing else. Drafts stay
-- invisible until someone chooses to publish them.
--
-- Writes require an authenticated session. Anyone who can sign in can edit, so
-- keep the allowed-emails list short — see public.is_editor below.

-- gen_random_uuid() below needs this. It used to be declared by the
-- submissions migration, which no longer exists.
create extension if not exists "pgcrypto";

create table public.posts (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),

  slug          text not null unique,
  title         text not null,
  excerpt       text,
  body          text not null default '',

  -- Matches the section colours in src/lib/site.ts.
  category      text not null default 'Student resources',
  cover_image   text,
  tone          text not null default 'sun',

  published     boolean not null default false,
  published_at  timestamptz,

  author        text,

  constraint slug_is_url_safe check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  constraint tone_is_known    check (tone in ('sun','mint','pink','lilac','ink'))
);

comment on table public.posts is
  'Owner-editable posts. Public reads are limited to published rows by RLS.';

create index posts_published_idx on public.posts (published, published_at desc);
create index posts_slug_idx      on public.posts (slug);

-- Keep updated_at honest without trusting the client to send it.
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  -- Stamp the publish date the first time it goes live, and clear it if it
  -- comes back down, so "published_at" always means what it says.
  --
  -- This has to run on INSERT as well as UPDATE: a post written and published
  -- in one go never passes through an update, and was landing with a null
  -- published_at — which reads as "Unpublished" on the post page and sorts to
  -- the bottom of the blog index.
  if new.published and (TG_OP = 'INSERT' or old.published is distinct from true) then
    new.published_at = coalesce(new.published_at, now());
  elsif not new.published then
    new.published_at = null;
  end if;
  return new;
end $$;

create trigger posts_touch_updated_at
  before insert or update on public.posts
  for each row execute function public.touch_updated_at();

-- Who is allowed to edit. Add an address here and that person can sign in and
-- write; remove it and they cannot, whatever session they hold.
create or replace function public.is_editor()
returns boolean language sql stable as $$
  select coalesce(auth.jwt() ->> 'email', '') in (
    'fundsy.official@gmail.com',
    'amy@fundsy.org',
    'ryan@fundsy.org'
  );
$$;

alter table public.posts enable row level security;

-- Anyone may read a published post. Drafts are invisible.
create policy "published posts are public"
  on public.posts for select
  to anon, authenticated
  using (published = true);

-- Editors see everything, including drafts, and may write.
create policy "editors read everything"
  on public.posts for select
  to authenticated
  using (public.is_editor());

create policy "editors insert"
  on public.posts for insert
  to authenticated
  with check (public.is_editor());

create policy "editors update"
  on public.posts for update
  to authenticated
  using (public.is_editor())
  with check (public.is_editor());

create policy "editors delete"
  on public.posts for delete
  to authenticated
  using (public.is_editor());
