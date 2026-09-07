import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Newsletter",
  description: "Once a month on LinkedIn: what’s closing soon, what’s new on the board, and one DFW business worth your money.",
};

export default function Page() {
  return (
    <ComingSoon
      tone="mint"
      title="Newsletter"
      intro="Once a month on LinkedIn: what’s closing soon, what’s new on the board, and one DFW business worth your money."
      planned={[
          "Read the latest issue on LinkedIn",
          "Every past issue, archived",
          "What goes in it and what doesn’t",
          "Subscribe without a LinkedIn account",
      ]}
    />
  );
}
