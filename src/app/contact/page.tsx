import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import PhotoCard from "@/components/PhotoCard";
import RuleHeading from "@/components/RuleHeading";
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

/* The fields that used to be a form. They are now a template in the email
   body, which is the same information arriving somewhere someone reads. */
const SHARE_FIELDS = [
  { label: "What it is", hint: "The name of the scholarship, discount, event or place." },
  { label: "Where", hint: "A campus, a city, or online." },
  { label: "A link", hint: "A website, an Instagram handle, or a phone number." },
  { label: "How it works", hint: "Who qualifies, what to bring, anything that catches people out." },
  { label: "Deadline", hint: "If there is one. This is the bit most listings get wrong." },
] as const;

const SHARE_SUBJECT = encodeURIComponent("A find for Fundsy");
const SHARE_BODY = encodeURIComponent(
  [
    "What it is:",
    "Where (campus, city, or online):",
    "Link (website, Instagram, or phone):",
    "How it works (who qualifies, what to bring):",
    "Deadline, if there is one:",
    "",
    "Your school (optional):",
    "Happy to be credited on the listing? yes / no",
  ].join("\n"),
);

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

      {/* ---- Share a find. An email with the structure written into it, so
           nobody has to guess what we need and nothing waits in a table for
           somebody to remember to open it. ---- */}
      <section id="share" className="band band-deep py-16 md:py-20" style={{ scrollMarginTop: 96 }}>
        <div className="wrap grid lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-16 items-start">
          <div>
            <h2 className="h2 mb-4">Know something we should share?</h2>
            <p className="prose mb-5">
              A scholarship your department never advertises, a taco place that takes student
              IDs, a free clinic your friend swears by. If it saves a DFW student money, we
              want it.
            </p>
            <p className="prose mb-7" style={{ color: "var(--ink-soft)" }}>
              Email it over. The button fills in a template so you don&rsquo;t have to guess what
              we need &mdash; delete any line you can&rsquo;t answer. A student on the team checks
              everything before it goes on the board.
            </p>
            <a className="btn btn-pink" href={`mailto:${SOCIALS.email}?subject=${SHARE_SUBJECT}&body=${SHARE_BODY}`}>
              Email us a find
            </a>
          </div>

          <div className="card p-6 md:p-8">
            <h3 className="h3 mb-4">What helps us check it</h3>
            <ul className="grid gap-3" style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {SHARE_FIELDS.map((f) => (
                <li className="card-hair p-4" key={f.label}>
                  <p className="text-[.9375rem]" style={{ fontWeight: 600 }}>{f.label}</p>
                  <p className="text-sm" style={{ color: "var(--ink-soft)" }}>{f.hint}</p>
                </li>
              ))}
            </ul>
            <p className="meta mt-5">
              None of it is required. A name and a link is enough to get us started.
            </p>
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
