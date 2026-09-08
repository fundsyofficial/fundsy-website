/* Recreates the local editor accounts. `supabase db reset` wipes auth.users
   along with everything else, so this puts them back.
   Local only — it needs the service role key. */
import { readFileSync } from "node:fs";

const env = Object.fromEntries(
  readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .split("\n")
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1)]),
);

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY;
if (!url?.includes("127.0.0.1") && !url?.includes("localhost")) {
  console.error("Refusing to run: this is only for a local Supabase.");
  process.exit(1);
}

/* Keep in step with public.is_editor() in the posts migration. */
for (const email of ["fundsy.official@gmail.com", "amy@fundsy.org", "ryan@fundsy.org"]) {
  const res = await fetch(`${url}/auth/v1/admin/users`, {
    method: "POST",
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ email, email_confirm: true }),
  });
  console.log(res.ok ? `created ${email}` : `${email}: ${(await res.json()).msg ?? res.status}`);
}
console.log("\nSign in at /admin/login; the link arrives in Mailpit: http://127.0.0.1:54324");
