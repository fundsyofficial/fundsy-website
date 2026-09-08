import "server-only";
import { createClient } from "@supabase/supabase-js";

/** Service-role client. Bypasses Row Level Security, so it can read every
 *  student's email address and resume.
 *
 *  The `server-only` import above makes the build fail if this file is ever
 *  pulled into a client component — that is the whole point of it being here
 *  rather than inline in an action. */
export function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase is not configured. Copy .env.example to .env.local and fill it in — " +
        "run `supabase start` and take the values from `supabase status`.",
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
