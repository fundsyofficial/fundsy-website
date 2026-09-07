import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Savings + student discounts",
  description: "Verified discounts, free things to do on a weekend, and the cheap finds worth the drive.",
};

export default function Page() {
  return (
    <ComingSoon
      tone="pink"
      title="Savings + student discounts"
      intro="Verified discounts, free things to do on a weekend, and the cheap finds worth the drive."
      planned={[
          "Places that take a student ID, mapped",
          "Free museums, parks and events every week",
          "Cheap eats under ten dollars by campus",
          "Software, transit and gym discounts worth having",
      ]}
    />
  );
}
