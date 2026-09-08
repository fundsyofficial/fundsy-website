import Link from "next/link";
import { deletePost, togglePublished } from "./actions";
import { getAllPostsForEditor } from "@/lib/posts";

export default async function AdminHome({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; deleted?: string }>;
}) {
  const [posts, params] = await Promise.all([getAllPostsForEditor(), searchParams]);
  const drafts = posts.filter((p) => !p.published);
  const live = posts.filter((p) => p.published);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="h2 mb-1">Posts</h1>
          <p className="meta">
            {live.length} published, {drafts.length} {drafts.length === 1 ? "draft" : "drafts"}
          </p>
        </div>
        <Link className="btn btn-pink" href="/admin/new">Write a post</Link>
      </div>

      {params.saved && <p className="note note-mint mb-6 text-[.9375rem]" role="status">Saved.</p>}
      {params.deleted && <p className="note note-mint mb-6 text-[.9375rem]" role="status">Deleted.</p>}

      {posts.length === 0 ? (
        <div className="card-hair p-8">
          <h2 className="h3 mb-2">Nothing written yet</h2>
          <p className="text-[.9375rem] mb-6" style={{ color: "var(--ink-soft)" }}>
            Posts show up on the homepage and on <Link className="lnk" href="/blog">the blog</Link> as
            soon as you publish them. Drafts stay invisible to everyone but you.
          </p>
          <Link className="btn btn-pink btn-sm" href="/admin/new">Write the first one</Link>
        </div>
      ) : (
        <div className="grid gap-3">
          {posts.map((p) => (
            <article className="card-hair p-5 flex flex-wrap items-center gap-x-6 gap-y-3" key={p.id}>
              <div style={{ flex: "1 1 320px", minWidth: 0 }}>
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h2 className="h3">{p.title}</h2>
                  <span className={`pill ${p.published ? "pill-mint" : ""}`}>
                    {p.published ? "Live" : "Draft"}
                  </span>
                </div>
                <p className="meta">
                  /blog/{p.slug} &middot; {p.category} &middot; edited{" "}
                  {new Date(p.updated_at).toLocaleDateString("en-GB", {
                    day: "numeric", month: "short", year: "numeric",
                  })}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Link className="btn btn-plain btn-sm" href={`/admin/${p.id}`}>Edit</Link>

                <form action={togglePublished}>
                  <input type="hidden" name="id" value={p.id} />
                  <input type="hidden" name="slug" value={p.slug} />
                  <input type="hidden" name="next" value={String(!p.published)} />
                  <button className="btn btn-plain btn-sm" type="submit">
                    {p.published ? "Unpublish" : "Publish"}
                  </button>
                </form>

                <form action={deletePost}>
                  <input type="hidden" name="id" value={p.id} />
                  <button className="btn btn-plain btn-sm" type="submit">Delete</button>
                </form>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
