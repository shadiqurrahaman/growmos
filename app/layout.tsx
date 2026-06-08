import type { Metadata } from "next";
import "./tailwind-only.css";
import { siteUrl, siteName } from "@/lib/seo";

const title = "GrowMos | AI Driven Business Growth And Marketing Solution";
const description =
  "From concept to code GrowMos delivers tailored business solutions as your most trusted business growth solution provider.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | GrowMos",
  },
  description,
  openGraph: {
    type: "website",
    siteName,
    title,
    description,
    url: siteUrl,
    images: [{ url: "/images/CEO.jpg", width: 1200, height: 630, alt: siteName }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/CEO.jpg"],
  },
  alternates: {
    canonical: siteUrl,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/images/CEO.jpg`,
  description,
  email: "hello@growmos.com",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+880-1731-438768",
    contactType: "customer service",
    email: "hello@growmos.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
