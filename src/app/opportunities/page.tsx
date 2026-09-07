import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Opportunities",
  description: "Scholarships, internships, part-time jobs and volunteering across Dallas–Fort Worth, sorted by what closes soonest.",
};

export default function Page() {
  return (
    <ComingSoon
      tone="mint"
      title="Opportunities"
      intro="Scholarships, internships, part-time jobs and volunteering across Dallas–Fort Worth, sorted by what closes soonest."
      planned={[
          "Scholarships open to Texas students right now",
          "Paid internships that don’t require prior experience",
          "Campus jobs that fit around a class schedule",
          "Volunteering that counts toward service hours",
      ]}
    />
  );
}
