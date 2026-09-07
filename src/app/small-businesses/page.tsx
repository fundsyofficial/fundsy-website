import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Small businesses ♡",
  description: "Local owners we love, with their hours, links and whatever they offer students.",
};

export default function Page() {
  return (
    <ComingSoon
      tone="lilac"
      title="Small businesses ♡"
      intro="Local owners we love, with their hours, links and whatever they offer students."
      planned={[
          "This month’s spotlight, written after a visit",
          "All fourteen businesses with hours and links",
          "What each one offers students",
          "How a business gets listed (it’s free)",
      ]}
    />
  );
}
