import Link from "next/link";
import PageHeader from "./PageHeader";
import type { Tone } from "@/lib/site";

/** A real route with the right header, nav state and metadata, and an honest
 *  note that the content isn't written yet. Better than a 404 while Amy and
 *  Ryan work through the remaining sections — and it keeps the nav clickable
 *  so the whole site can be reviewed end to end. */
export default function ComingSoon({
  tone,
  title,
  intro,
  planned,
}: {
  tone: Tone;
  title: string;
  intro: string;
  planned: string[];
}) {
  return (
    <>
      <PageHeader tone={tone} breadcrumb={title} title={title} intro={intro} />
      <div className="wrap py-14 md:py-20 grid lg:grid-cols-[1fr_320px] gap-10 lg:gap-16 items-start">
        <div>
          <h2 className="h2 mb-4">Being written now</h2>
          <p className="prose mb-8" style={{ color: "var(--ink-soft)" }}>
            This page follows the same template as{" "}
            <Link className="lnk" href="/resources">Student resources</Link> — a banded header,
            a Featured rail, and listings grouped by category. What&rsquo;s missing is the
            content, not the design.
          </p>
          <ul className="grid gap-3" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {planned.map((p) => (
              <li className="card-hair p-5 text-[.9375rem]" key={p}>{p}</li>
            ))}
          </ul>
        </div>
        <aside className="card-hair p-6 lg:sticky lg:top-24">
          <h2 className="h3 mb-3">Know something for this page?</h2>
          <p className="text-sm mb-5" style={{ color: "var(--ink-soft)" }}>
            We build these sections out of what students send us. If you have something that
            belongs here, it&rsquo;s the fastest way to get it live.
          </p>
          <Link className="btn btn-pink btn-sm" href="/contact#share">Share a find</Link>
        </aside>
      </div>
    </>
  );
}
