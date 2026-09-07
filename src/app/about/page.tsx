import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "About Fundsy",
  description: "Two students started keeping a list. Here’s where it came from, what we’re trying to do for DFW, and who pays for it (nobody, so far).",
};

export default function Page() {
  return (
    <ComingSoon
      tone="sun"
      title="About Fundsy"
      intro="Two students started keeping a list. Here’s where it came from, what we’re trying to do for DFW, and who pays for it (nobody, so far)."
      planned={[
          "Why we started, and the semester that prompted it",
          "What Fundsy will and won’t take money for",
          "How a listing gets checked before it goes up",
          "Where we want this to be by 2027",
      ]}
    />
  );
}
