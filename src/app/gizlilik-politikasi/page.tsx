import type { Metadata } from "next";
import { PolicyPage } from "@/components/layout/PolicyPage";
import { POLICY_UPDATED, privacyPolicy } from "@/lib/policies";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
};

export default function Page() {
  return <PolicyPage title="Gizlilik Politikası" updated={POLICY_UPDATED} sections={privacyPolicy} />;
}
