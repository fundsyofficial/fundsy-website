import type { Metadata } from "next";
import SectionPage from "@/components/SectionPage";
import { RESOURCE_DEADLINES, RESOURCE_FEATURED } from "@/lib/content";
import { RESOURCE_SECTIONS } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Student resources",
  description:
    "Transportation, food, healthcare, wellness and academic support for college students across Dallas–Fort Worth.",
};

export default function ResourcesPage() {
  return (
    <SectionPage
      tone="sun"
      title="Student resources"
      intro="The practical stuff: how to get across the metroplex, where to eat when the money runs out, who will see you without insurance, and who to talk to when the semester goes sideways. Every listing is checked by a student on that campus."
      meta="48 listings across 5 categories, last checked 3 September 2026"
      headerPhoto={{ src: "/assets/img/transit.jpg", alt: "The inside of a DART rail car", tone: "lilac" }}
      sections={RESOURCE_SECTIONS}
      featured={RESOURCE_FEATURED}
      deadlines={RESOURCE_DEADLINES}
      railAction={{ href: "/contact#share", label: "Suggest a listing" }}
      nextUp={{
        tone: "pink",
        title: "Next up: Opportunities",
        body: "Scholarships, internships and jobs, sorted by what closes first.",
        href: "/opportunities",
        label: "Go to Opportunities",
      }}
    />
  );
}
