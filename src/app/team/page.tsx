import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Our team",
  description: "Amy, Ryan and the ambassadors covering each campus. Come say hi on yours.",
};

export default function Page() {
  return (
    <ComingSoon
      tone="sun"
      title="Our team"
      intro="Amy, Ryan and the ambassadors covering each campus. Come say hi on yours."
      planned={[
          "Amy and Ryan, the co-founders",
          "Twelve campus ambassadors with photo, school, major and bio",
          "Which campuses still need an ambassador",
          "How to apply to join",
      ]}
    />
  );
}
