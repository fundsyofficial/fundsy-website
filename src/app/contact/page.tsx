import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import PhotoCard from "@/components/PhotoCard";
import RuleHeading from "@/components/RuleHeading";
import ShareFindForm from "@/components/ShareFindForm";
import { SOCIALS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Email the students behind Fundsy, or send in something worth putting on the board.",
};

/** Email is the primary channel, so it leads. Each purpose gets a prefilled
 *  subject line — it costs nothing and makes an inbox sortable. */
const PURPOSES = [
  {
    id: "general",
    tone: "sun",
    title: "A question about a listing",
    subject: "Question about a listing",
    body: "Tell us which listing and what isn’t adding up. If a link is dead or a discount has stopped, that’s worth knowing too — we’d rather hear it from you than leave it wrong.",
  },
  {
    id: "resume",
    tone: "mint",
    title: "Resume help",
    subject: "Resume review",
    body: "Attach it as a PDF or Word file and say what you’re applying for — a specific role, an industry, or just “anything paid this summer”. All three are useful. Reviews go out on Sundays.",
  },
  {
    id: "partner",
    tone: "pink",
    title: "Partner with Fundsy",
    subject: "Partnership",
    body: "Who you are, where you are, and what you’d like to offer students. Spotlights are free for small businesses and always will be.",
  },
] as const;

export default function ContactPage() {
  return (
    <>
      <PageHeader
        tone="mint"
        breadcrumb="Contact us"
        title="Email us"
        intro="Everything reaches the same inbox, read by the two students who started Fundsy. Nothing goes to a support queue and nobody outside the team sees it."
        aside={
          <PhotoCard
            style={{ height: 250 }}
            src="/assets/img/jobs.jpg"
            alt="Notes and reading glasses on a desk"
            tone="sun"
            title={SOCIALS.email}
            titleSize="1.3rem"
            body="Amy and Ryan read these. We usually write back within two or three days."
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        }
      />

      {/* ---- Email, by purpose ---- */}
      <section className="wrap py-14 md:py-20">
        <RuleHeading className="h2">What to send, and what to say</RuleHeading>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {PURPOSES.map((p) => (
            <article
              className="card-hair p-6 flex flex-col"
              key={p.id}
              id={p.id}
              style={{ scrollMarginTop: 96 }}
            >
              <span
                className="key mb-4"
                style={{ background: `var(--${p.tone})`, width: 34, height: 34, borderRadius: 10 }}
              />
              <h3 className="h3 mb-2">{p.title}</h3>
              <p className="text-[.9375rem] mb-6" style={{ color: "var(--ink-soft)", flex: 1 }}>
                {p.body}
              </p>
              <a
                className="btn btn-plain btn-sm"
                style={{ justifySelf: "start", alignSelf: "flex-start" }}
                href={`mailto:${SOCIALS.email}?subject=${encodeURIComponent(p.subject)}`}
              >
                Email us about this
              </a>
            </article>
          ))}
        </div>

        <p className="meta mt-7">
          Prefer not to email? DM{" "}
          <a className="lnk" href={SOCIALS.instagram} target="_blank" rel="noreferrer">
            {SOCIALS.instagramHandle}
          </a>{" "}
          or message us on{" "}
          <a className="lnk" href={SOCIALS.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>.
        </p>
      </section>

      {/* ---- The one form that earns its place ---- */}
      <section id="share" className="band band-deep py-16 md:py-20" style={{ scrollMarginTop: 96 }}>
        <div className="wrap grid lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-24">
            <h2 className="h2 mb-4">Know something we should share?</h2>
            <p className="prose mb-5">
              A scholarship your department never advertises, a taco place that takes student
              IDs, a free clinic your friend swears by. If it saves a DFW student money, we
              want it.
            </p>
            <p className="prose" style={{ color: "var(--ink-soft)" }}>
              This one is a form rather than an email because the fields matter &mdash; which
              section it belongs in, the link, the deadline. A student on the team checks every
              submission before it goes on the board.
            </p>
          </div>
          <div className="card p-6 md:p-8">
            <ShareFindForm />
          </div>
        </div>
      </section>

      <section className="wrap py-14 md:py-16">
        <div className="card-hair p-6 md:p-7 flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="h3 mb-1">Want to cover your campus?</h2>
            <p className="text-[.9375rem]" style={{ color: "var(--ink-soft)" }}>
              Ambassadors re-check the listings for their school each semester. An hour or two a month.
            </p>
          </div>
          <Link className="btn btn-plain btn-sm" href="/team#ambassadors">How it works</Link>
        </div>
      </section>
    </>
  );
}
