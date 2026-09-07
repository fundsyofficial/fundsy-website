import Link from "next/link";
import type { Tone } from "@/lib/site";

/** One of the four things you can browse. The colour chip is the same colour
 *  that heads that section's page, so the chips read as a key across the site
 *  rather than as decoration. */
export default function SectionTile({
  href,
  tone,
  title,
  body,
  meta,
}: {
  href: string;
  tone: Tone;
  title: string;
  body: string;
  meta: string;
}) {
  return (
    <Link className="tile" href={href}>
      <span
        className="key mb-4"
        style={{
          background: `var(--${tone})`,
          width: 40,
          height: 40,
          borderRadius: 12,
        }}
      />
      <h3 className="h3 mb-2 mt-1">{title}</h3>
      <p className="text-sm mb-4" style={{ color: "var(--ink-soft)" }}>{body}</p>
      <span className="meta">{meta}</span>
    </Link>
  );
}
