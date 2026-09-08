import type { Metadata } from "next";
import SectionPage from "@/components/SectionPage";
import { SAVINGS_FEATURED, SAVINGS_SECTIONS } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Savings + student discounts",
  description:
    "Verified student discounts, free things to do in Dallas–Fort Worth, and the cheap finds worth the drive.",
};

export default function SavingsPage() {
  return (
    <SectionPage
      tone="pink"
      title="Savings + student discounts"
      intro="Places that take a student ID, weekends that cost nothing, and the things that quietly cost the most as a student done cheaper. We call ahead so you don’t get turned away at the counter."
      meta="101 listings across 3 categories, last checked 3 September 2026"
      headerPhoto={{ src: "/assets/img/coffee.jpg", alt: "The counter of a small coffee shop", tone: "mint" }}
      sections={SAVINGS_SECTIONS}
      featured={SAVINGS_FEATURED}
      railAction={{ href: "/contact#share", label: "Share a discount" }}
      nextUp={{
        tone: "lilac",
        title: "Next up: Small businesses ♡",
        body: "Local owners we love, with their hours, links and whatever they offer students.",
        href: "/small-businesses",
        label: "Go to Small businesses",
      }}
    />
  );
}
