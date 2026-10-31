import type { Metadata } from "next";
import { PolicyPage } from "@/components/layout/PolicyPage";
import { POLICY_UPDATED, kvkkNotice } from "@/lib/policies";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
};

export default function Page() {
  return <PolicyPage title="KVKK Aydınlatma Metni" updated={POLICY_UPDATED} sections={kvkkNotice} />;
}
