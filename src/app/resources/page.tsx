import type { Metadata } from "next";
import Link from "next/link";
import FeaturedRail from "@/components/FeaturedRail";
import PageHeader from "@/components/PageHeader";
import PhotoCard from "@/components/PhotoCard";
import ResourceRow from "@/components/ResourceRow";
import RuleHeading from "@/components/RuleHeading";
import {
  RESOURCE_CATEGORIES,
  RESOURCE_DEADLINES,
  RESOURCE_FEATURED,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Student resources",
  description:
    "Transportation, food, healthcare, wellness and academic support for college students across Dallas–Fort Worth.",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        tone="sun"
        breadcrumb="Student resources"
        title="Student resources"
        intro="The practical stuff: how to get across the metroplex, where to eat when the money runs out, who will see you without insurance, and who to talk to when the semester goes sideways. Every listing is checked by a student on that campus."
        meta="48 listings across 5 categories, last checked 3 September 2026"
        photo={{
          src: "/assets/img/transit.jpg",
          alt: "The inside of a DART rail car",
          tone: "lilac",
        }}
      />

      <div className="wrap py-12 md:py-16 grid lg:grid-cols-[276px_1fr] gap-10 lg:gap-14 items-start">
        <FeaturedRail
          featured={RESOURCE_FEATURED}
          deadlines={RESOURCE_DEADLINES}
          action={{ href: "/contact#share", label: "Suggest a listing" }}
        >
          <div>
            <RuleHeading as="h3" className="h3">On this page</RuleHeading>
            <ul className="space-y-1 text-sm mt-4" style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {RESOURCE_CATEGORIES.map((c, i) => (
                <li key={c.id}>
                  <a
                    className="flex items-center gap-2.5 py-2"
                    href={`#${c.id}`}
                    style={{
                      textDecoration: "none",
                      fontWeight: i === 0 ? 600 : 400,
                      borderBottom:
                        i === RESOURCE_CATEGORIES.length - 1
                          ? undefined
                          : "1px solid var(--ink-hair)",
                    }}
                  >
                    <span
                      className="key"
                      style={{
                        background: `var(--${c.keyTone})`,
                        width: 11,
                        height: 11,
                        borderRadius: 3,
                      }}
                    />
                    {c.name} <span className="meta">{c.count.replace(" listings", "")}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </FeaturedRail>

        <div>
          {RESOURCE_CATEGORIES.map((c) => (
            <section key={c.id} id={c.id} className="mb-16" style={{ scrollMarginTop: 96 }}>
              <PhotoCard
                className="mb-8"
                style={{ height: 250 }}
                src={c.photo.src}
                alt={c.photo.alt}
                tone={c.tone}
                pill={c.count}
                heading="h2"
                titleSize="2rem"
                title={
                  <span className="flex items-center gap-3">
                    <span className="key" style={{ background: `var(--${c.keyTone})` }} />
                    {c.name}
                  </span>
                }
                body={c.intro}
                sizes="(max-width: 1024px) 100vw, 62vw"
              />

              {c.rows?.map((r) => (
                <ResourceRow key={r.title} {...r} />
              ))}

              {c.pairs && (
                <div className="grid md:grid-cols-2 gap-4">
                  {c.pairs.map((p) => (
                    <article className="card-hair p-6" key={p.title}>
                      <span className={`pill pill-${c.keyTone} mb-3`} style={{ display: "inline-block" }}>
                        {p.pill}
                      </span>
                      <h3 className="h3 mb-2">{p.title}</h3>
                      <p className="text-[.9375rem] mb-3" style={{ color: "var(--ink-soft)" }}>{p.body}</p>
                      <Link className="lnk text-sm" href={p.link.href}>{p.link.label}</Link>
                    </article>
                  ))}
                </div>
              )}

              {c.trio && (
                <div className="grid md:grid-cols-3 gap-4">
                  {c.trio.map((t) => (
                    <article className="card-hair p-5" key={t.title}>
                      <h3 className="h3 mb-2">{t.title}</h3>
                      <p className="text-sm" style={{ color: "var(--ink-soft)" }}>{t.body}</p>
                    </article>
                  ))}
                </div>
              )}

              {c.quote && (
                <div className="note note-lilac mt-8">
                  <p className="text-sm">{c.quote}</p>
                </div>
              )}
            </section>
          ))}
        </div>
      </div>

      <section className="band band-pink py-14">
        <div className="wrap flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="h2 mb-2">Next up: Opportunities</h2>
            <p className="prose">Scholarships, internships and jobs, sorted by what closes first.</p>
          </div>
          <Link className="btn btn-ink" href="/opportunities">Go to Opportunities</Link>
        </div>
      </section>
    </>
  );
}
