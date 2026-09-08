import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PhotoCard from "@/components/PhotoCard";
import PostBody from "@/components/PostBody";
import { getPostBySlug, getPublishedPosts } from "@/lib/posts";

/* Rebuilt at most once a minute, so a publish shows up quickly without
   rendering every request from scratch. */
export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getPublishedPosts(100);
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      type: "article",
      publishedTime: post.published_at ?? undefined,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  /* Read as anon, so RLS has already made drafts unreachable. */
  if (!post) notFound();

  return (
    <>
      <article className="wrap py-12 md:py-16" style={{ maxWidth: 860 }}>
        <nav className="meta mb-6" aria-label="Breadcrumb">
          <Link className="lnk" href="/">Home</Link>
          &nbsp;/&nbsp; <Link className="lnk" href="/blog">What&rsquo;s new</Link>
          &nbsp;/&nbsp; {post.category}
        </nav>

        <h1 className="display mb-5" style={{ fontSize: "clamp(2.1rem,4.2vw,3.2rem)" }}>
          {post.title}
        </h1>

        <p className="meta mb-8">
          {post.author && `${post.author} · `}
          {post.published_at
            ? new Date(post.published_at).toLocaleDateString("en-GB", {
                day: "numeric", month: "long", year: "numeric" })
            : "Unpublished"}
          {` · ${post.category}`}
        </p>

        {post.cover_image && (
          <PhotoCard
            className="mb-10"
            style={{ height: 340 }}
            src={post.cover_image}
            alt=""
            tone={post.tone}
            title=""
            sizes="(max-width: 900px) 100vw, 860px"
            priority
          />
        )}

        {post.excerpt && (
          <p className="prose text-[1.0625rem] mb-8" style={{ fontWeight: 500 }}>{post.excerpt}</p>
        )}

        <PostBody>{post.body}</PostBody>
      </article>

      <section className="band band-pink py-14">
        <div className="wrap flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="h2 mb-2">Know something we should share?</h2>
            <p className="prose">If it saves a DFW student money, we want it.</p>
          </div>
          <Link className="btn btn-ink" href="/contact#share">Share a find</Link>
        </div>
      </section>
    </>
  );
}
