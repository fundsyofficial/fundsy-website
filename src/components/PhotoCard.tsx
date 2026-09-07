import Link from "next/link";
import Photo from "./Photo";
import type { Tone } from "@/lib/site";

/** Image full-bleed, words over a scrim. Renders as a link when href is given
 *  and as a plain block when it isn't — a section header is not a click target. */
export default function PhotoCard({
  href,
  src,
  alt,
  tone,
  pill,
  meta,
  title,
  body,
  heading = "h3",
  titleSize,
  className = "",
  style,
  sizes,
  priority,
}: {
  href?: string;
  src: string;
  alt: string;
  tone: Tone | "paper";
  pill?: string;
  meta?: string;
  title: React.ReactNode;
  body?: string;
  heading?: "h2" | "h3";
  titleSize?: string;
  className?: string;
  style?: React.CSSProperties;
  sizes?: string;
  priority?: boolean;
}) {
  const Heading = heading;
  const inner = (
    <>
      <Photo src={src} alt={alt} tone={tone} sizes={sizes} priority={priority} />
      {pill && <span className="pcard-top pill">{pill}</span>}
      <div className="pcard-body">
        {meta && <p className="pcard-meta">{meta}</p>}
        <Heading className="h3" style={titleSize ? { fontSize: titleSize } : undefined}>
          {title}
        </Heading>
        {body && <p>{body}</p>}
      </div>
    </>
  );

  if (!href) {
    return (
      <div className={`pcard ${className}`} style={style}>
        {inner}
      </div>
    );
  }
  return (
    <Link className={`pcard ${className}`} href={href} style={style}>
      {inner}
    </Link>
  );
}
