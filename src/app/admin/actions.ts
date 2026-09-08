"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server-client";
import { slugify } from "@/lib/post-types";

export type EditorState = { ok: boolean; message: string } | null;

/** Every page a post can appear on has to be rebuilt when it changes. */
function revalidatePost(slug?: string) {
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/admin");
  if (slug) revalidatePath(`/blog/${slug}`);
}

function readForm(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const rawSlug = String(formData.get("slug") ?? "").trim();
  return {
    title,
    slug: slugify(rawSlug || title),
    excerpt: String(formData.get("excerpt") ?? "").trim() || null,
    body: String(formData.get("body") ?? ""),
    category: String(formData.get("category") ?? "Student resources"),
    cover_image: String(formData.get("cover_image") ?? "").trim() || null,
    tone: String(formData.get("tone") ?? "sun"),
    published: formData.get("published") === "on",
    author: String(formData.get("author") ?? "").trim() || null,
  };
}

export async function savePost(_prev: EditorState, formData: FormData): Promise<EditorState> {
  const id = String(formData.get("id") ?? "");
  const values = readForm(formData);

  if (!values.title) return { ok: false, message: "A post needs a title." };
  if (!values.slug) {
    return { ok: false, message: "That title has no letters or numbers in it, so there is no slug to make. Add a slug by hand." };
  }

  const supabase = await supabaseServer();

  const { error } = id
    ? await supabase.from("posts").update(values).eq("id", id)
    : await supabase.from("posts").insert(values);

  if (error) {
    console.error("[admin] save failed", error);
    /* 23505 is a unique violation, which here always means the slug. */
    if (error.code === "23505") {
      return { ok: false, message: `There is already a post at /blog/${values.slug}. Change the slug.` };
    }
    return { ok: false, message: "That didn't save. Nothing was changed." };
  }

  revalidatePost(values.slug);
  redirect("/admin?saved=1");
}

export async function deletePost(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const supabase = await supabaseServer();
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) console.error("[admin] delete failed", error);
  revalidatePost();
  redirect("/admin?deleted=1");
}

export async function togglePublished(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const next = formData.get("next") === "true";
  const slug = String(formData.get("slug") ?? "");
  const supabase = await supabaseServer();
  const { error } = await supabase.from("posts").update({ published: next }).eq("id", id);
  if (error) console.error("[admin] publish toggle failed", error);
  revalidatePost(slug);
  redirect("/admin");
}

export async function signOut() {
  const supabase = await supabaseServer();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
