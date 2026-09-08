import type { Tone } from "@/lib/site";

/** Types and pure helpers only — no server imports.
 *  This file is safe to import from a client component; `@/lib/posts` is not,
 *  because it reaches for next/headers to read the auth cookie. */

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  category: string;
  cover_image: string | null;
  tone: Tone;
  published: boolean;
  published_at: string | null;
  author: string | null;
  updated_at: string;
};

export const CATEGORIES = [
  "Student resources",
  "Opportunities",
  "Savings + discounts",
  "Small businesses",
  "Newsletter",
] as const;

/** Title to URL-safe slug, matching the database's check constraint. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
