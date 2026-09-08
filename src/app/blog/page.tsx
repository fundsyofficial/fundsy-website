import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Photo from "@/components/Photo";
import { getPublishedPosts } from "@/lib/posts";

/* Rebuilt at most once a minute, so a publish shows up quickly without
   rendering every request from scratch. */
export const revalidate = 60;

export const metadata: Metadata = {
  title: "What's new",
  description: "Guides, deadlines and finds from the students who keep Fundsy current.",
};

export default async function BlogIndex() {
  const posts = await getPublishedPosts(50);

  return (
    <>
      <PageHeader
        tone="mint"
        breadcrumb="What's new"
        title="What's new"
        intro="Guides, deadlines and finds, written by the students who keep the board current."
        meta={posts.length ? `${posts.length} ${posts.length === 1 ? "post" : "posts"}` : undefined}
      />

      <section className="wrap py-14 md:py-20">
        {posts.length === 0 ? (
          <div className="card-hair p-8" style={{ maxWidth: 620 }}>
            <h2 className="h3 mb-2">Nothing here yet</h2>
            <p className="text-[.9375rem]" style={{ color: "var(--ink-soft)" }}>
              The first post is being written. In the meantime, everything on{" "}
              <Link className="lnk" href="/resources">Student resources</Link> is current.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {posts.map((p) => (
              <Link
                className="card-hair p-6 md:p-7 grid md:grid-cols-[200px_1fr] gap-5 md:gap-8 items-start"
                key={p.id}
                href={`/blog/${p.slug}`}
              >
                {p.cover_image ? (
                  <span
                    style={{ position: "relative", aspectRatio: "4 / 3", display: "block",
                             borderRadius: "var(--radius-sm)", overflow: "hidden" }}
                  >
                    <Photo src={p.cover_image} alt="" tone={p.tone}
                           style={{ position: "absolute", inset: 0 }} sizes="200px" />
                  </span>
                ) : (
                  <span className={`key`} style={{ background: `var(--${p.tone})`, width: 44, height: 44, borderRadius: 12 }} />
                )}
                <div>
                  <p className="meta mb-2">
                    {p.category}
                    {p.published_at && ` · ${new Date(p.published_at).toLocaleDateString("en-GB", {
                      day: "numeric", month: "long", year: "numeric" })}`}
                  </p>
                  <h2 className="h3 mb-2" style={{ fontSize: "1.4rem" }}>{p.title}</h2>
                  {p.excerpt && (
                    <p className="text-[.9375rem]" style={{ color: "var(--ink-soft)" }}>{p.excerpt}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
