import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./tailwind-only.css";
import {
  siteUrl,
  siteName,
  siteDescription,
  siteTagline,
  siteKeywords,
  siteKnowsAbout,
  siteServiceTypes,
  siteSocialLinks,
  siteEmail,
  sitePhone,
  siteCalendly,
  defaultOgImage,
  pageUrl,
} from "@/lib/seo";
import { JsonLd } from "@/lib/jsonld";

const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-YJHB4R4V6R";

const defaultTitle = "Data Engineering & BI — dbt, BigQuery, Power BI";

export const viewport: Viewport = {
  themeColor: "#0b1220",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  title: {
    default: defaultTitle,
    template: "%s | GrowMos",
  },
  description: siteDescription,
  keywords: siteKeywords,
  category: "Data Engineering & Business Intelligence",
  classification: "B2B Technology Services",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    siteName,
    locale: "en_US",
    title: defaultTitle,
    description: siteDescription,
    url: siteUrl,
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: `${siteName} — Data Engineering & BI Services`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteDescription,
    images: [defaultOgImage],
    creator: "@growmos",
    site: "@growmos",
  },
  alternates: {
    canonical: siteUrl,
    types: {
      "text/markdown": [
        { url: pageUrl("/llms.txt"), title: `${siteName} for LLMs (short)` },
        { url: pageUrl("/llms-full.txt"), title: `${siteName} for LLMs (full)` },
      ],
    },
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${siteUrl}#organization`,
      name: siteName,
      legalName: siteName,
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/growmos.jpg`,
        width: 1408,
        height: 1275,
      },
      image: `${siteUrl}/images/growmos.jpg`,
      description: siteDescription,
      slogan: siteTagline,
      email: siteEmail,
      telephone: sitePhone,
      priceRange: "$$$",
      foundingDate: "2022",
      areaServed: { "@type": "Place", name: "Worldwide" },
      address: {
        "@type": "PostalAddress",
        addressCountry: "Worldwide",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: siteEmail,
        telephone: sitePhone,
        url: siteCalendly,
        availableLanguage: ["English"],
      },
      knowsAbout: siteKnowsAbout,
      serviceType: siteServiceTypes,
      sameAs: siteSocialLinks,
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}#website`,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      publisher: { "@id": `${siteUrl}#organization` },
      inLanguage: "en-US",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteUrl}/blog?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            // Google Consent Mode v2 — required for EEA compliance (Mar 2024+).
            // Default all four consent signals to 'denied'. Any future CMP can
            // call gtag('consent', 'update', {...}) to grant specific signals.
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              wait_for_update: 500
            });

            // For non-EEA regions where consent isn't required, grant analytics
            // storage by default so GA4 still records sessions without a CMP.
            gtag('consent', 'default', {
              region: ['US','CA','AU','NZ','JP','SG','IN','BR','ZA','GB'],
              analytics_storage: 'granted'
            });

            gtag('config', '${gaId}', { anonymize_ip: true });
          `}
        </Script>

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

        <JsonLd data={organizationJsonLd} />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}