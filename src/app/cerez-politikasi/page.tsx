import type { Metadata } from "next";
import { PolicyPage } from "@/components/layout/PolicyPage";
import { POLICY_UPDATED, cookiePolicy } from "@/lib/policies";

export const metadata: Metadata = {
  title: "Çerez Politikası",
};

export default function Page() {
  return <PolicyPage title="Çerez Politikası" updated={POLICY_UPDATED} sections={cookiePolicy} />;
}
