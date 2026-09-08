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
  if (error) {
    console.error("[posts] fetch failed", error);
    return null;
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
