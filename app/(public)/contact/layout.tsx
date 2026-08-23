import type { Metadata } from "next";
import { siteUrl, siteName, siteEmail, sitePhone, buildPageMetadata, pageUrl } from "@/lib/seo";
import { JsonLd } from "@/lib/jsonld";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact | Book a 30-Minute Data Consultation",
  description:
    "Talk to GrowMos about your data engineering, BI, warehouse or CRM integration project. Book a 30-minute call or message us on WhatsApp. Response within 24 hours.",
  path: "/contact",
  type: "website",
  keywords: [
    "contact GrowMos",
    "data consultancy contact",
    "book a data consultation",
    "B2B data services",
  ],
  imageAlt: "Contact GrowMos — Book a 30-minute call",
});

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contact ${siteName}`,
  url: pageUrl("/contact"),
  description:
    "Talk to GrowMos about your data engineering, BI, warehouse or CRM integration project.",
  mainEntity: {
    "@type": "Organization",
    name: siteName,
    email: siteEmail,
    telephone: sitePhone,
    url: siteUrl,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={contactPageJsonLd} />
      {children}
    </>
  );
}