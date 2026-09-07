import Link from "next/link";
import Photo from "./Photo";
import PhotoCard from "./PhotoCard";
import type { Tone } from "@/lib/site";

export type MosaicData = {
  lead: { href: string; src: string; alt: string; tone: Tone; pill: string; meta: string; title: string };
  flat: {
    pill: string;
    title: string;
    body: string;
    rows: { href: string; label: string; note: string }[];
  };
  narrow: { href: string; src: string; alt: string; tone: Tone; pill: string; meta: string; title: string };
  wide: { href: string; src: string; alt: string; tone: Tone; pill: string; title: string; body: string };
  chips: { items: { href: string; label: string }[]; action: { href: string; label: string } };
};

/** Five cells of deliberately unequal size — a tall lead image with a text
 *  panel notched into its corner, a flat colour cell, a wide image, a narrow
 *  image and a chip cloud. It should never read as a row of identical cards. */
export default function BoardMosaic({ data }: { data: MosaicData }) {
  const { lead, flat, narrow, wide, chips } = data;

  return (
    <div className="mosaic">
      <Link className="pcard m-lead" href={lead.href} style={{ minHeight: 300 }}>
        <MosaicLead {...lead} />
      </Link>

      <div className="m-flat m-flat-a">
        <div className="m-flat-body">
          <span className="pill">{flat.pill}</span>
          <h3 className="h3 mt-3 mb-2" style={{ fontSize: "clamp(1.15rem,1.6vw,1.4rem)" }}>
            {flat.title}
          </h3>
          <p className="text-sm">{flat.body}</p>
        </div>
        {flat.rows.map((r) => (
          <Link className="m-row" key={r.href + r.label} href={r.href}>
            <span>{r.label}</span>
            <time>{r.note}</time>
          </Link>
        ))}
      </div>

      <PhotoCard
        href={narrow.href}
        src={narrow.src}
        alt={narrow.alt}
        tone={narrow.tone}
        pill={narrow.pill}
        meta={narrow.meta}
        title={narrow.title}
        titleSize="1.05rem"
        style={{ minHeight: 230 }}
        sizes="(max-width: 900px) 100vw, 20vw"
      />

      <PhotoCard
        href={wide.href}
        src={wide.src}
        alt={wide.alt}
        tone={wide.tone}
        pill={wide.pill}
        title={wide.title}
        body={wide.body}
        titleSize="1.15rem"
        style={{ minHeight: 230 }}
        sizes="(max-width: 900px) 100vw, 28vw"
      />

      <div className="m-flat m-flat-b justify-between">
        <div className="m-flat-body">
          <div className="chips">
            {chips.items.map((c) => (
              <Link className="chip" key={c.href + c.label} href={c.href}>
                {c.label}
              </Link>
            ))}
          </div>
        </div>
        <Link className="m-row" href={chips.action.href}>
          <span>{chips.action.label}</span>
          <span className="circ" aria-hidden="true">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
              <path
                d="M3 14L14 3M14 3H6M14 3v8"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Link>
      </div>
    </div>
  );
}

/* The lead cell puts its words in a notched panel rather than over a scrim. */
function MosaicLead({ src, alt, tone, pill, meta, title }: MosaicData["lead"]) {
  return (
    <>
      <Photo src={src} alt={alt} tone={tone} sizes="(max-width: 900px) 100vw, 34vw" priority />
      <span className="pcard-top pill">{pill}</span>
      <div className="notch">
        <p className="meta mb-1">{meta}</p>
        <h3 className="h3" style={{ fontSize: "1.35rem", maxWidth: "14ch" }}>
          {title}
        </h3>
      </div>
    </>
  );
}
