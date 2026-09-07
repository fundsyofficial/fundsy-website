import Link from "next/link";
import Photo from "./Photo";
import RuleHeading from "./RuleHeading";
import type { Tone } from "@/lib/site";

export type FeaturedItem = {
  href: string;
  date: string;
  title: string;
  src: string;
  alt: string;
  tone: Tone;
};

export type Deadline = {
  href: string;
  label: string;
  days: number;
};

/** Small square thumb, date, two-line title — then a deadline list.
 *  Deadlines get a different shape from the featured items on purpose:
 *  different kind of information, different treatment. */
export default function FeaturedRail({
  featured,
  deadlines,
  deadlineHeading = "Closing soon",
  soonWithin = 7,
  action,
  children,
}: {
  featured?: FeaturedItem[];
  deadlines?: Deadline[];
  deadlineHeading?: string;
  soonWithin?: number;
  action?: { href: string; label: string };
  children?: React.ReactNode;
}) {
  return (
    <aside className="rail lg:sticky lg:top-24">
      {children}

      {featured && featured.length > 0 && (
        <div>
          <RuleHeading as="h3" className="h3">Featured</RuleHeading>
          <div className="grid gap-4 mt-4">
            {featured.map((f) => (
              <Link className="rail-item" key={f.href + f.title} href={f.href}>
                <Photo
                  src={f.src}
                  alt={f.alt}
                  tone={f.tone}
                  className="rail-thumb"
                  sizes="74px"
                />
                <div>
                  <p className="rail-date">{f.date}</p>
                  <h4>{f.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {deadlines && deadlines.length > 0 && (
        <div>
          <RuleHeading as="h3" className="h3">{deadlineHeading}</RuleHeading>
          <div className="mt-3">
            {deadlines.map((d) => (
              <Link className="dl-item" key={d.href + d.label} href={d.href}>
                <span>{d.label}</span>
                <span className={`dl-days${d.days <= soonWithin ? " soon" : ""}`}>
                  {d.days} {d.days === 1 ? "day" : "days"}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {action && (
        <Link className="btn btn-plain btn-sm" href={action.href} style={{ justifySelf: "start" }}>
          {action.label}
        </Link>
      )}
    </aside>
  );
}
