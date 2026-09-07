import Link from "next/link";

/** The perforated strip along the bottom of the hero flyer. The tabs are the
 *  section nav — the signature device does navigation work, not decoration. */
export default function TearOffNav({
  items,
}: {
  items: readonly { href: string; label: string }[];
}) {
  return (
    <div className="tabs">
      {items.map((i) => (
        <Link className="tab" key={i.href} href={i.href}>
          {i.label}
        </Link>
      ))}
    </div>
  );
}
