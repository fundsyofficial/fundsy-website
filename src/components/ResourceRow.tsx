import Link from "next/link";

/** A single listing. Flat card, hairline border — you read this, you don't
 *  click the whole thing, so it deliberately looks different from a tile. */
export default function ResourceRow({
  title,
  pill,
  body,
  link,
}: {
  title: string;
  pill?: string;
  body: string;
  link?: { href: string; label: string };
}) {
  return (
    <article className="card-hair p-6 mb-4">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
        <h3 className="h3">{title}</h3>
        {pill && <span className="pill">{pill}</span>}
      </div>
      <p className="prose text-[.9375rem] mb-3" style={{ color: "var(--ink-soft)" }}>
        {body}
      </p>
      {link && (
        <Link className="lnk text-sm" href={link.href}>
          {link.label}
        </Link>
      )}
    </article>
  );
}
