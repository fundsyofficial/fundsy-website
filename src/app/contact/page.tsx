import type { Metadata } from "next";
import Link from "next/link";
import ContactForms from "@/components/ContactForms";
import PageHeader from "@/components/PageHeader";
import PhotoCard from "@/components/PhotoCard";
import { SOCIALS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Share a find, ask a question, partner with Fundsy, or send your resume for a free review by a DFW student.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        tone="mint"
        breadcrumb="Contact us"
        title="Say hi, send a tip, or ask us for help"
        intro="Pick whichever form fits. We’ll write back, usually within two or three days."
        aside={
          <PhotoCard
            style={{ height: 250 }}
            src="/assets/img/jobs.jpg"
            alt="Notes and reading glasses on a desk"
            tone="sun"
            title="Who reads these"
            titleSize="1.2rem"
            body="Amy and Ryan, the two students who started Fundsy. Nothing here goes to a support queue or an automated inbox, and nobody outside the team sees what you send."
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        }
      />

      <div className="wrap py-12 md:py-16 grid lg:grid-cols-[1fr_330px] gap-10 lg:gap-16 items-start">
        <ContactForms />

        <aside className="grid gap-6 lg:sticky lg:top-24">
          <div className="card-hair p-6">
            <h2 className="h3 mb-3">Rather not use a form?</h2>
            <ul className="text-sm space-y-2" style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li>Email <a className="lnk" href={`mailto:${SOCIALS.email}`}>{SOCIALS.email}</a></li>
              <li>DM us <a className="lnk" href={SOCIALS.instagram}>@fundsy on Instagram</a></li>
              <li>Message us on <a className="lnk" href={SOCIALS.linkedin}>LinkedIn</a></li>
            </ul>
          </div>

          <div className="card-hair p-6">
            <h2 className="h3 mb-3">Looking for something else?</h2>
            <ul className="text-sm space-y-2" style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li><Link className="lnk" href="/team#ambassadors">Become a campus ambassador</Link></li>
              <li><Link className="lnk" href="/newsletter">Read the newsletter</Link></li>
              <li><Link className="lnk" href="/resources">Browse student resources</Link></li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
