import { createClient } from "@supabase/supabase-js";

/** Anon client with no cookies attached.
 *
 *  Public pages read posts through this rather than the cookie-backed client,
 *  for two reasons: reading cookies would force every page to render per
 *  request, and generateStaticParams runs at build time where there is no
 *  request to read from.
 *
 *  RLS still applies as `anon`, so this can only ever see published posts.
 *  Drafts are previewed from the admin editor, not from a public URL. */
export function supabasePublic() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
