import Image from "next/image";
import type { Tone } from "@/lib/site";

/** The house photo treatment. Every photograph on the site goes through here,
 *  so changing how Fundsy photos look is one file. The tone class sets which
 *  section colour is laid into the image; in the current theme the wash is
 *  dialled to zero and the class only carries the placeholder ground. */
export default function Photo({
  src,
  alt,
  tone = "sun",
  className = "",
  sizes = "(max-width: 900px) 100vw, 50vw",
  priority = false,
  style,
}: {
  src: string;
  alt: string;
  tone?: Tone | "paper";
  className?: string;
  sizes?: string;
  priority?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <span className={`duo tone-${tone} ${className}`} style={style}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} />
    </span>
  );
}
