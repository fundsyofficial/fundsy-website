import { supabaseServer } from "@/lib/supabase/server-client";
import { supabasePublic } from "@/lib/supabase/public-client";

import type { Post } from "@/lib/post-types";

export * from "@/lib/post-types";

/** Published posts, newest first. Read as `anon`, so RLS makes drafts
 *  unreachable here regardless of who is signed in. */
export async function getPublishedPosts(limit = 20): Promise<Post[]> {
  const supabase = supabasePublic();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[posts] list failed", error);
    return [];
  }
  return (data ?? []) as Post[];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const supabase = supabasePublic();
  const { data, error } = await supabase.from("posts").select("*").eq("slug", slug).maybeSingle();

  /* Null means "no such post" and the caller renders a 404. A query that
     *failed* is a different thing entirely — if the database is unreachable,
     returning null would 404 a live post, and Next would cache that. Throwing
     surfaces an error page instead, which is honest and not cached. */
  if (error) {
    console.error("[posts] fetch failed", error);
    throw new Error(`Could not load the post "${slug}": ${error.message}`);
  }
  return (data as Post) ?? null;
}

/** Everything, drafts included. Only returns rows for a signed-in editor —
 *  RLS decides, not this function. */
export async function getAllPostsForEditor(): Promise<Post[]> {
  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("[posts] editor list failed", error);
    return [];
  }
  return (data ?? []) as Post[];
}
