import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Photo from "@/components/Photo";
import RuleHeading from "@/components/RuleHeading";
import { BUSINESSES, SPOTLIGHT } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Small businesses ♡",
  description:
    "Local Dallas–Fort Worth businesses we love, with their hours, links and whatever they offer students. Spotlights are free.",
};

export default function SmallBusinessesPage() {
  return (
    <>
      <PageHeader
        tone="lilac"
        breadcrumb="Small businesses ♡"
        title="Small businesses ♡"
        intro="Places run by people, near enough to walk to, that give students something. Nobody pays to be here — we write about where we actually go, and we say so when a business gives us something."
        meta="14 spotlights, last checked 3 September 2026"
      />

      {/* ---- This month's spotlight ---- */}
      <section className="wrap py-14 md:py-20">
        <RuleHeading className="h2" >September spotlight</RuleHeading>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mt-8">
          <div className="card" style={{ aspectRatio: "4 / 3", padding: 0, position: "relative", overflow: "hidden" }}>
            <Photo
              src={SPOTLIGHT.src}
              alt={SPOTLIGHT.alt}
              tone="sun"
              style={{ position: "absolute", inset: 0 }}
              sizes="(max-width: 1024px) 100vw, 46vw"
              priority
            />
          </div>
          <div>
            <span className="pill pill-mint">{SPOTLIGHT.area}</span>
            <h2 className="h2 mt-4 mb-4">{SPOTLIGHT.headline}</h2>
            {SPOTLIGHT.body.map((p) => (
              <p className="prose mb-4" key={p.slice(0, 24)}>{p}</p>
            ))}
            <p className="note note-sun mt-6 text-[.9375rem]" style={{ fontWeight: 600 }}>
              {SPOTLIGHT.offer}
            </p>
          </div>
        </div>
      </section>

      {/* ---- The directory ---- */}
      <section className="band band-deep py-16 md:py-20">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <RuleHeading style={{ flex: "1 1 420px" }}>Every business on the list</RuleHeading>
            <Link className="lnk text-sm" href="/contact#partner">Own one? Get listed free</Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BUSINESSES.map((b) => (
              <article className="card overflow-hidden" key={b.slug} style={{ padding: 0 }}>
                <div style={{ position: "relative", aspectRatio: "4 / 3" }}>
                  <Photo
                    src={b.src}
                    alt={b.alt}
                    tone={b.tone}
                    style={{ position: "absolute", inset: 0 }}
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                </div>
                <div className="p-5">
                  <p className="meta mb-1">{b.area} &middot; {b.kind}</p>
                  <h3 className="h3 mb-2">{b.name}</h3>
                  <p className="text-sm mb-4" style={{ color: "var(--ink-soft)" }}>{b.blurb}</p>
                  <span className={`pill pill-${b.tone}`}>{b.offer}</span>
                </div>
              </article>
            ))}
          </div>

          <p className="meta mt-8">
            Ten more are written up and waiting on a photo. If you own somewhere and want to be on
            this list, it costs nothing &mdash; <Link className="lnk" href="/contact#partner">tell us about it</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
