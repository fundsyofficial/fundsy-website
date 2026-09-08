/* Instagram access token helper.
 *
 *   node scripts/instagram-token.mjs exchange <short-lived-token>
 *   node scripts/instagram-token.mjs refresh  [long-lived-token]
 *
 * A token from the App Dashboard lasts one hour. `exchange` trades it for a
 * long-lived one that lasts 60 days; `refresh` extends a long-lived token for
 * another 60 from today.
 *
 * The exchange sends your app secret, so this is a server-side script and must
 * stay one. Never put INSTAGRAM_APP_SECRET anywhere with a NEXT_PUBLIC_ prefix,
 * and never let it reach the browser.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";

const ENV_PATH = new URL("../.env.local", import.meta.url);

function readEnv() {
  if (!existsSync(ENV_PATH)) return {};
  return Object.fromEntries(
    readFileSync(ENV_PATH, "utf8")
      .split("\n")
      .filter((l) => l && !l.startsWith("#") && l.includes("="))
      .map((l) => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1)]),
  );
}

function die(message) {
  console.error(`\n${message}\n`);
  process.exit(1);
}

function reportExpiry(seconds) {
  const days = Math.round(seconds / 86400);
  const when = new Date(Date.now() + seconds * 1000);
  return `${days} days — ${when.toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  })}`;
}

const env = readEnv();
const [command, argToken] = process.argv.slice(2);

if (command === "exchange") {
  const secret = env.INSTAGRAM_APP_SECRET || process.env.INSTAGRAM_APP_SECRET;
  const shortLived = argToken;

  if (!secret) die("Set INSTAGRAM_APP_SECRET in .env.local first (Meta App Dashboard → App settings → Basic).");
  if (!shortLived) die("Usage: node scripts/instagram-token.mjs exchange <short-lived-token>");

  const url = new URL("https://graph.instagram.com/access_token");
  url.searchParams.set("grant_type", "ig_exchange_token");
  url.searchParams.set("client_secret", secret);
  url.searchParams.set("access_token", shortLived);

  const res = await fetch(url);
  const json = await res.json();

  if (!res.ok) {
    /* The message is Instagram's; it usually says exactly what is wrong. */
    die(`Exchange failed (${res.status}): ${json.error?.message ?? JSON.stringify(json)}`);
  }

  console.log("\nLong-lived token:\n");
  console.log(json.access_token);
  console.log(`\nValid for ${reportExpiry(json.expires_in)}`);
  console.log("\nPut it in .env.local as INSTAGRAM_ACCESS_TOKEN, and in Vercel's");
  console.log("environment variables for production. Refresh it before it expires:");
  console.log("  npm run ig:refresh\n");

} else if (command === "refresh") {
  /* The companion to the exchange above. Confirmed reachable — it returns a
     proper OAuth error for a bad token rather than a 404. */
  const token = argToken || env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) die("No token. Pass one, or set INSTAGRAM_ACCESS_TOKEN in .env.local.");

  const url = new URL("https://graph.instagram.com/refresh_access_token");
  url.searchParams.set("grant_type", "ig_refresh_token");
  url.searchParams.set("access_token", token);

  const res = await fetch(url);
  const json = await res.json();

  if (!res.ok) {
    die(`Refresh failed (${res.status}): ${json.error?.message ?? JSON.stringify(json)}\n` +
        "A token has to be at least 24 hours old and not yet expired to be refreshable.\n" +
        "If it has expired, start again with `npm run ig:token exchange <short-lived-token>`.");
  }

  console.log("\nRefreshed token:\n");
  console.log(json.access_token);
  console.log(`\nValid for ${reportExpiry(json.expires_in)}`);
  console.log("\nUpdate INSTAGRAM_ACCESS_TOKEN in .env.local and in Vercel.\n");

} else {
  console.log(`
Instagram token helper

  npm run ig:token exchange <short-lived-token>   one hour  ->  60 days
  npm run ig:refresh                              60 days   ->  60 more

Getting a short-lived token:
  Meta App Dashboard -> your app -> Instagram -> API setup with Instagram
  business login -> Generate token, on @fundsyofficial.

Needs INSTAGRAM_APP_SECRET in .env.local. That secret must never reach the
browser — no NEXT_PUBLIC_ prefix, ever.
`);
  process.exit(command ? 1 : 0);
}
