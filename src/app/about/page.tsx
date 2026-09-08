import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Photo from "@/components/Photo";
import { ABOUT } from "@/lib/pages";

export const metadata: Metadata = {
  title: "About Fundsy",
  description:
    "Two students started keeping a list of what college costs less in Dallas–Fort Worth. This is where it came from and how it works.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        tone="sun"
        breadcrumb="About Fundsy"
        title="About Fundsy"
        intro={ABOUT.intro}
        photo={{ src: "/assets/img/grads.jpg", alt: "Students at a graduation ceremony", tone: "lilac" }}
      />

      {/* ---- The story ---- */}
      <section className="wrap py-14 md:py-20 grid lg:grid-cols-[1fr_320px] gap-10 lg:gap-16 items-start">
        <div>
          <h2 className="h2 mb-5">How it started</h2>
          {ABOUT.story.map((p) => (
            <p className="prose mb-5 text-[1.0625rem]" key={p.slice(0, 24)}>{p}</p>
          ))}
          <p className="prose text-[1.0625rem]">
            It is still just students. Nobody is paid, no business has ever paid to appear, and
            the whole thing runs on a list, a shared inbox and a lot of asking around.
          </p>
        </div>

        <aside className="card-hair p-6 lg:sticky lg:top-24">
          <h2 className="h3 mb-4">Where we are so far</h2>
          <dl className="grid gap-4" style={{ margin: 0 }}>
            {ABOUT.numbers.map((n) => (
              <div key={n.label}>
                <dt className="h3" style={{ fontSize: "1.6rem" }}>{n.value}</dt>
                <dd className="meta" style={{ margin: 0 }}>{n.label}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>

      {/* ---- Principles ---- */}
      <section className="band band-deep py-16 md:py-20">
        <div className="wrap">
          <h2 className="h2 mb-3">How we decide what goes up</h2>
          <p className="prose mb-10" style={{ color: "var(--ink-soft)" }}>
            Four rules. They are the reason you can trust a listing without checking it yourself.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ABOUT.principles.map((p) => (
              <article className="card p-6" key={p.title} style={{ background: `var(--${p.tone})` }}>
                <h3 className="h3 mb-2">{p.title}</h3>
                <p className="text-sm">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---- What's next ---- */}
      <section className="wrap py-16 md:py-24 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="card" style={{ aspectRatio: "3 / 2", padding: 0, position: "relative", overflow: "hidden" }}>
          <Photo
            src="/assets/img/campus2.jpg"
            alt="A civic building in the metroplex"
            tone="mint"
            style={{ position: "absolute", inset: 0 }}
            sizes="(max-width: 1024px) 100vw, 46vw"
          />
        </div>
        <div>
          <h2 className="h2 mb-4">What we want next</h2>
          <ul className="grid gap-3 mb-7" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {ABOUT.goals.map((g) => (
              <li className="card-hair p-5 text-[.9375rem]" key={g}>{g}</li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <Link className="btn btn-pink" href="/team#ambassadors">Become an ambassador</Link>
            <Link className="btn btn-plain" href="/contact#partner">Partner with us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
