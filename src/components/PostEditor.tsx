"use client";

import { useActionState, useState } from "react";
import { savePost, type EditorState } from "@/app/admin/actions";
import { CATEGORIES, slugify, type Post } from "@/lib/post-types";

const TONES = ["sun", "mint", "pink", "lilac", "ink"] as const;

export default function PostEditor({ post }: { post?: Post }) {
  const [state, formAction, pending] = useActionState<EditorState, FormData>(savePost, null);
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post?.slug));

  /* The slug follows the title until someone edits it by hand, then it stops —
     changing a published post's URL silently would break every link to it. */
  const effectiveSlug = slugTouched ? slug : slugify(title);

  return (
    <form action={formAction} className="grid lg:grid-cols-[1fr_300px] gap-8 items-start">
      {post && <input type="hidden" name="id" value={post.id} />}

      <div className="grid gap-5">
        {state && !state.ok && <p className="form-error" role="alert">{state.message}</p>}

        <div>
          <label className="label" htmlFor="title">Title</label>
          <input
            className="input" id="title" name="title" value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Where to eat for under ten dollars near every campus"
            required
          />
        </div>

        <div>
          <label className="label" htmlFor="excerpt">Excerpt</label>
          <textarea
            className="textarea" id="excerpt" name="excerpt" defaultValue={post?.excerpt ?? ""}
            style={{ minHeight: 90 }}
            placeholder="One or two sentences. This is what shows on the homepage and in the rail."
          />
        </div>

        <div>
          <label className="label" htmlFor="body">Body</label>
          <textarea
            className="textarea" id="body" name="body" defaultValue={post?.body ?? ""}
            style={{ minHeight: 420, fontFamily: "ui-monospace, SFMono-Regular, monospace", fontSize: ".875rem" }}
            placeholder={"Markdown works here.\n\n## A heading\n\nA paragraph, with **bold** and a [link](https://example.com).\n\n- a list\n- of things"}
          />
          <p className="hint">
            Markdown: <code>## heading</code>, <code>**bold**</code>, <code>[text](url)</code>,
            <code>- list</code>. Blank line between paragraphs.
          </p>
        </div>
      </div>

      <aside className="grid gap-5 lg:sticky lg:top-8">
        <div className="card-hair p-5 grid gap-5">
          <div>
            <label className="label" htmlFor="slug">Web address</label>
            <input
              className="input" id="slug" name="slug" value={effectiveSlug}
              onChange={(e) => { setSlug(e.target.value); setSlugTouched(true); }}
            />
            <p className="hint">/blog/{effectiveSlug || "…"}</p>
          </div>

          <div>
            <label className="label" htmlFor="category">Section</label>
            <select className="select" id="category" name="category" defaultValue={post?.category ?? CATEGORIES[0]}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="label" htmlFor="tone">Colour</label>
            <select className="select" id="tone" name="tone" defaultValue={post?.tone ?? "sun"}>
              {TONES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <label className="label" htmlFor="cover_image">Cover image</label>
            <input
              className="input" id="cover_image" name="cover_image"
              defaultValue={post?.cover_image ?? ""}
              placeholder="/assets/img/market.jpg"
            />
            <p className="hint">A path under /assets/img/, or a full URL.</p>
          </div>

          <div>
            <label className="label" htmlFor="author">Written by</label>
            <input className="input" id="author" name="author" defaultValue={post?.author ?? ""} placeholder="Amy" />
          </div>

          <label className="check">
            <input type="checkbox" name="published" defaultChecked={post?.published ?? false} />
            <span>Published — visible to everyone</span>
          </label>
        </div>

        <button className="btn btn-pink" type="submit" disabled={pending}>
          {pending ? "Saving…" : post ? "Save changes" : "Create post"}
        </button>
      </aside>
    </form>
  );
}
