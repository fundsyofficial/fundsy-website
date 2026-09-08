import type { Metadata } from "next";
import SectionPage from "@/components/SectionPage";
import { OPPORTUNITY_DEADLINES, OPPORTUNITY_FEATURED, OPPORTUNITY_SECTIONS } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Opportunities",
  description:
    "Scholarships, internships, part-time jobs and volunteering across Dallas–Fort Worth, sorted by what closes soonest.",
};

export default function OpportunitiesPage() {
  return (
    <SectionPage
      tone="mint"
      title="Opportunities"
      intro="Scholarships, internships, part-time jobs and volunteering across Dallas–Fort Worth. Sorted by what closes soonest, because that is the thing that catches people out."
      meta="43 listings across 4 categories, last checked 3 September 2026"
      headerPhoto={{ src: "/assets/img/grads.jpg", alt: "Students at a graduation ceremony", tone: "sun" }}
      sections={OPPORTUNITY_SECTIONS}
      featured={OPPORTUNITY_FEATURED}
      deadlines={OPPORTUNITY_DEADLINES}
      railAction={{ href: "/contact#share", label: "Tell us about one" }}
      nextUp={{
        tone: "pink",
        title: "Next up: Savings + student discounts",
        body: "Verified discounts, free things to do, and the cheap finds worth the drive.",
        href: "/savings",
        label: "Go to Savings",
      }}
    />
  );
}
