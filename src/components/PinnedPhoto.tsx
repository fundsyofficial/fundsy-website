import Photo from "./Photo";
import type { Tone } from "@/lib/site";

export default function PinnedPhoto({
  src,
  alt,
  caption,
  tone = "sun",
  className = "",
  style,
  priority,
}: {
  src: string;
  alt: string;
  caption: string;
  tone?: Tone;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
}) {
  return (
    <figure className={`snap m-0 ${className}`} style={style}>
      <Photo src={src} alt={alt} tone={tone} className="block" sizes="(max-width: 640px) 90vw, 22vw" priority={priority} />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
