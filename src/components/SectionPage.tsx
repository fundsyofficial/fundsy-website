import Link from "next/link";
import FeaturedRail, { type Deadline, type FeaturedItem } from "./FeaturedRail";
import PageHeader from "./PageHeader";
import PhotoCard from "./PhotoCard";
import ResourceRow from "./ResourceRow";
import RuleHeading from "./RuleHeading";
import type { Section } from "@/lib/pages";
import type { Tone } from "@/lib/site";

/** The content-page template: banded header, a rail carrying on-page nav plus
 *  Featured plus deadlines, and categories introduced by a photo card.
 *
 *  Student resources, Opportunities and Savings are all this component with
 *  different data — which is the point of having built it once. */
export default function SectionPage({
  tone,
  title,
  intro,
  meta,
  headerPhoto,
  sections,
  featured,
  deadlines,
  deadlineHeading,
  railAction,
  nextUp,
}: {
  tone: Tone;
  title: string;
  intro: string;
  meta?: string;
  headerPhoto?: { src: string; alt: string; tone: Tone | "paper" };
  sections: Section[];
  featured?: FeaturedItem[];
  deadlines?: Deadline[];
  deadlineHeading?: string;
  railAction?: { href: string; label: string };
  nextUp?: { tone: Tone; title: string; body: string; href: string; label: string };
}) {
  return (
    <>
      <PageHeader
        tone={tone}
        breadcrumb={title}
        title={title}
        intro={intro}
        meta={meta}
        photo={headerPhoto}
      />

      <div className="wrap py-12 md:py-16 grid lg:grid-cols-[276px_1fr] gap-10 lg:gap-14 items-start">
        <FeaturedRail
          featured={featured}
          deadlines={deadlines}
          deadlineHeading={deadlineHeading}
          action={railAction}
        >
          <div>
            <RuleHeading as="h3" className="h3">On this page</RuleHeading>
            <ul className="space-y-1 text-sm mt-4" style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    className="flex items-center gap-2.5 py-2"
                    href={`#${s.id}`}
                    style={{
                      textDecoration: "none",
                      fontWeight: i === 0 ? 600 : 400,
                      borderBottom: i === sections.length - 1 ? undefined : "1px solid var(--ink-hair)",
                    }}
                  >
                    <span
                      className="key"
                      style={{ background: `var(--${s.keyTone})`, width: 11, height: 11, borderRadius: 3 }}
                    />
                    {s.name} <span className="meta">{s.count}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </FeaturedRail>

        <div>
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="mb-16" style={{ scrollMarginTop: 96 }}>
              <PhotoCard
                className="mb-8"
                style={{ height: 250 }}
                src={s.photo.src}
                alt={s.photo.alt}
                tone={s.tone}
                pill={s.count}
                heading="h2"
                titleSize="2rem"
                title={
                  <span className="flex items-center gap-3">
                    <span className="key" style={{ background: `var(--${s.keyTone})` }} />
                    {s.name}
                  </span>
                }
                body={s.intro}
                sizes="(max-width: 1024px) 100vw, 62vw"
              />

              {(s.layout ?? "rows") === "rows" &&
                s.listings.map((l) => <ResourceRow key={l.title} {...l} />)}

              {s.layout === "pairs" && (
                <div className="grid md:grid-cols-2 gap-4">
                  {s.listings.map((l) => (
                    <article className="card-hair p-6" key={l.title}>
                      {l.pill && (
                        <span className={`pill pill-${s.keyTone} mb-3`} style={{ display: "inline-block" }}>
                          {l.pill}
                        </span>
                      )}
                      <h3 className="h3 mb-2">{l.title}</h3>
                      <p className="text-[.9375rem] mb-3" style={{ color: "var(--ink-soft)" }}>{l.body}</p>
                      {l.link && <Link className="lnk text-sm" href={l.link.href}>{l.link.label}</Link>}
                    </article>
                  ))}
                </div>
              )}

              {s.layout === "trio" && (
                <div className="grid md:grid-cols-3 gap-4">
                  {s.listings.map((l) => (
                    <article className="card-hair p-5" key={l.title}>
                      <h3 className="h3 mb-2">{l.title}</h3>
                      <p className="text-sm" style={{ color: "var(--ink-soft)" }}>{l.body}</p>
                    </article>
                  ))}
                </div>
              )}

              {s.note && (
                <div className="note note-lilac mt-8">
                  <p className="text-sm">{s.note}</p>
                </div>
              )}
            </section>
          ))}
        </div>
      </div>

      {nextUp && (
        <section className="band py-14" style={{ background: `var(--${nextUp.tone})` }}>
          <div className="wrap flex flex-wrap items-center justify-between gap-6">
            <div>
              <h2 className="h2 mb-2">{nextUp.title}</h2>
              <p className="prose">{nextUp.body}</p>
            </div>
            <Link className="btn btn-ink" href={nextUp.href}>{nextUp.label}</Link>
          </div>
        </section>
      )}
    </>
  );
}
