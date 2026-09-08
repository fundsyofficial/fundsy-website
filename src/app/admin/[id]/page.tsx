import Link from "next/link";
import { notFound } from "next/navigation";
import PostEditor from "@/components/PostEditor";
import { supabaseServer } from "@/lib/supabase/server-client";
import type { Post } from "@/lib/post-types";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await supabaseServer();
  const { data } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const post = data as Post;

  return (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-4 mb-8">
        <h1 className="h2">Edit post</h1>
        {post.published && (
          <Link className="lnk text-sm" href={`/blog/${post.slug}`}>View it on the site</Link>
        )}
      </div>
      <PostEditor post={post} />
    </>
  );
}
