import type { Metadata } from "next";
import { pageUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Unsubscribe",
  description: "Manage your email subscription preferences with GrowMos.",
  alternates: { canonical: pageUrl("/unsubscribe") },
  robots: { index: false, follow: false },
};

export default function UnsubscribeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}