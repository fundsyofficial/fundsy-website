import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import RuleHeading from "@/components/RuleHeading";
import { ISSUES } from "@/lib/pages";
import { NEWSLETTER } from "@/lib/site";

export const metadata: Metadata = {
  title: NEWSLETTER.name,
  description: `${NEWSLETTER.tagline} ${NEWSLETTER.cadence}.`,
};

export default function NewsletterPage() {
  return (
    <>
      <PageHeader
        tone="mint"
        breadcrumb={NEWSLETTER.name}
        title={NEWSLETTER.name}
        intro={`${NEWSLETTER.tagline} One a month, and never more than that — what’s closing soon, what’s new on the board, and one DFW business worth your money.`}
        aside={
          <div className="card p-7">
            <h2 className="h3 mb-3">{NEWSLETTER.cadence}</h2>
            <p className="text-[.9375rem] mb-5" style={{ color: "var(--ink-soft)" }}>
              That is where most of the people who read it already are, and it means we
              aren&rsquo;t asking for your email just to send you twelve things a year.
            </p>
            <a className="btn btn-pink" href={NEWSLETTER.url} target="_blank" rel="noreferrer">
              Subscribe on LinkedIn
            </a>
          </div>
        }
      />

      <section className="wrap py-14 md:py-20">
        <RuleHeading className="h2">Every edition</RuleHeading>
        <div className="grid gap-4 mt-8">
          {ISSUES.map((i) => (
            <a
              className="card-hair p-6 md:p-7 grid md:grid-cols-[170px_1fr] gap-4 md:gap-8 items-start"
              key={i.href}
              href={i.href}
              target="_blank"
              rel="noreferrer"
            >
              <p className="meta">{i.date}</p>
              <div>
                <h3 className="h3 mb-2">{i.title}</h3>
                {i.excerpt && (
                  <p className="text-[.9375rem]" style={{ color: "var(--ink-soft)" }}>{i.excerpt}</p>
                )}
              </div>
            </a>
          ))}
        </div>
        <p className="meta mt-8">
          Every edition opens on LinkedIn. Written by Amy.
        </p>
      </section>

      <section className="band band-pink py-16 md:py-20">
        <div className="wrap grid lg:grid-cols-[1fr_1fr] gap-10 items-center">
          <div>
            <h2 className="h2 mb-4">Not on LinkedIn?</h2>
            <p className="prose">
              Fair enough. Everything in the newsletter is on this site first &mdash; the
              deadlines are on Opportunities and new listings show up on the homepage the
              week we add them.
            </p>
          </div>
          <div className="card p-6 md:p-7">
            <p className="prose mb-5" style={{ color: "var(--ink-soft)" }}>
              We&rsquo;re looking at a monthly text for deadlines, for people who don&rsquo;t
              open newsletters. If that would be useful, tell us &mdash; it&rsquo;s the kind of
              thing we build when enough people ask.
            </p>
            <Link className="btn btn-ink" href="/contact">Tell us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
