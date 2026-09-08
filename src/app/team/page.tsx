import type { Metadata } from "next";
import Link from "next/link";
import MemberCard from "@/components/MemberCard";
import PageHeader from "@/components/PageHeader";
import RuleHeading from "@/components/RuleHeading";
import { AMBASSADORS, FOUNDERS, OPEN_CAMPUSES } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Our team",
  description:
    "Amy, Ryan and the campus ambassadors keeping Fundsy current across Dallas–Fort Worth.",
};

export default function TeamPage() {
  return (
    <>
      <PageHeader
        tone="sun"
        breadcrumb="Our team"
        title="Our team"
        intro="Twelve students keep this board current. Two of them started it; the rest cover a campus each, check the listings that go stale, and answer when someone on their campus asks a question."
        meta="Nobody here is paid. Everyone here is a student."
      />

      <section className="wrap py-14 md:py-18">
        <RuleHeading className="h2">The two who started it</RuleHeading>
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {FOUNDERS.map((m) => (
            <MemberCard key={m.name} member={m} large />
          ))}
        </div>
      </section>

      <section id="ambassadors" className="band band-deep py-16 md:py-20" style={{ scrollMarginTop: 96 }}>
        <div className="wrap">
          <RuleHeading className="h2">Campus ambassadors</RuleHeading>
          <p className="prose mt-4 mb-9" style={{ color: "var(--ink-soft)" }}>
            One per campus. They check the listings for their school each semester, and they are
            the reason a resource here says &ldquo;confirmed&rdquo; rather than &ldquo;probably&rdquo;.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {AMBASSADORS.map((m) => (
              <MemberCard key={m.name} member={m} />
            ))}
          </div>
        </div>
      </section>

      <section className="wrap py-16 md:py-24 grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-start">
        <div>
          <h2 className="h2 mb-4">Campuses with nobody on them yet</h2>
          <p className="prose mb-6" style={{ color: "var(--ink-soft)" }}>
            If you&rsquo;re at one of these, you would be the first person covering it &mdash; which
            mostly means telling us what you already know about your own campus.
          </p>
          <ul className="flex flex-wrap gap-3 mb-8" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {OPEN_CAMPUSES.map((c) => (
              <li key={c}><span className="chip">{c}</span></li>
            ))}
          </ul>
          <Link className="btn btn-pink" href="/contact">Ask about joining</Link>
        </div>

        <div className="card-hair p-6 md:p-7">
          <h2 className="h3 mb-3">What an ambassador actually does</h2>
          <ul className="grid gap-3" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li className="text-[.9375rem]">Re-checks the listings for their campus once a semester.</li>
            <li className="text-[.9375rem]">Sends in anything new they come across &mdash; a pantry, a discount, a deadline.</li>
            <li className="text-[.9375rem]">Answers the odd question from someone at their school.</li>
          </ul>
          <p className="meta mt-5">
            Realistically an hour or two a month, and more in August and January when things change.
          </p>
        </div>
      </section>
    </>
  );
}
