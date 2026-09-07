import type { Tone } from "@/lib/site";

/** A note on the board. In the current theme the pin is hidden, but the
 *  component keeps it so an outlined direction can turn it back on. */
export default function PinnedNote({
  tone,
  pill,
  title,
  children,
  className = "",
  style,
}: {
  tone: Exclude<Tone, "ink">;
  pill?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <article className={`note note-${tone} ${className}`} style={style}>
      {pill && <span className="pill">{pill}</span>}
      {title && <h2 className="h3 mt-3 mb-1">{title}</h2>}
      <p className="text-sm">{children}</p>
    </article>
  );
}
