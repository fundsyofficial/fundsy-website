import Link from "next/link";
import Photo from "./Photo";
import type { Tone } from "@/lib/site";

/** The banded header every content page shares. Swap the tone per section. */
export default function PageHeader({
  tone,
  breadcrumb,
  title,
  intro,
  meta,
  photo,
  aside,
}: {
  tone: Tone;
  breadcrumb: string;
  title: string;
  intro?: string;
  meta?: string;
  photo?: { src: string; alt: string; tone: Tone | "paper" };
  aside?: React.ReactNode;
}) {
  const twoUp = Boolean(photo || aside);
  return (
    <section className="band" style={{ background: `var(--${tone})` }}>
      <div
        className={
          twoUp
            ? "wrap py-14 md:py-20 grid lg:grid-cols-[1.25fr_1fr] gap-10 lg:gap-14 items-center"
            : "wrap py-14 md:py-20"
        }
      >
        <div>
          <nav className="meta mb-5" aria-label="Breadcrumb" style={{ color: "var(--ink)" }}>
            <Link className="lnk" href="/">Home</Link>
            &nbsp;/&nbsp; {breadcrumb}
          </nav>
          <h1 className="display mb-5">{title}</h1>
          {intro && <p className="prose text-[1.0625rem] mb-6">{intro}</p>}
          {meta && <p className="meta">{meta}</p>}
        </div>

        {photo && (
          <div className="card" style={{ aspectRatio: "4 / 3", padding: 0, position: "relative", overflow: "hidden" }}>
            <Photo
              src={photo.src}
              alt={photo.alt}
              tone={photo.tone}
              style={{ position: "absolute", inset: 0 }}
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
            />
          </div>
        )}
        {!photo && aside}
      </div>
    </section>
  );
}
