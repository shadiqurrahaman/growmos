// Canonical site URL — always use www.growmos.com.
// Apex growmos.com → www with a 301 in next.config.ts.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NEXT_PUBLIC_BASE_URL?.startsWith("http://localhost")
    ? process.env.NEXT_PUBLIC_BASE_URL
    : "https://www.growmos.com");

export const siteName = "GrowMos";

export const siteTagline =
  "Data systems for ambitious B2B teams.";

export const siteDescription =
  "Data pipelines, cloud data warehouses, and BI dashboards built on dbt, Fivetran, BigQuery and Power BI. Trusted by B2B SaaS & e-commerce teams.";

export const siteKeywords = [
  "data engineering services",
  "data pipeline consulting",
  "BI dashboard development",
  "cloud data warehouse",
  "BigQuery consulting",
  "dbt consulting",
  "Power BI development",
  "Metabase consulting",
  "Fivetran implementation",
  "Snowflake consulting",
  "Microsoft Fabric",
  "CRM data integration",
  "Salesforce analytics",
  "HubSpot reporting",
  "reverse ETL",
  "managed DataOps",
];

export const siteSocialLinks = [
  "https://www.linkedin.com/company/growmos",
  "https://www.crunchbase.com/organization/growmos",
  "https://g2.com/products/growmos",
  "https://clutch.co/profile/growmos",
];

// Reusable Knows-About list (used by service schema too).
export const siteKnowsAbout = [
  "Data Engineering",
  "Business Intelligence",
  "Cloud Data Warehousing",
  "Performance Marketing",
  "Revenue Operations",
  "Customer Data Platforms",
  "dbt",
  "Fivetran",
  "Airbyte",
  "Snowflake",
  "BigQuery",
  "Microsoft Fabric",
  "Power BI",
  "Metabase",
  "Reverse ETL",
  "Salesforce",
  "HubSpot",
  "Looker",
  "Tableau",
];

export const siteServiceTypes = [
  "Data Engineering",
  "Business Intelligence",
  "Cloud Data Warehousing",
  "CRM Data Integration",
  "Reverse ETL Activation",
  "Managed DataOps",
];

// Contact and conversion constants — used by layout, contact page, and llms endpoints.
export const siteEmail = "hello@growmos.com";
export const sitePhone = "+1-555-123-4567";
export const siteWhatsApp = "https://wa.me/15551234567";
export const siteCalendly = "https://calendly.com/hello-growmos/30min";

// Default OG fallback image (home + service pages).
export const defaultOgImage = "/images/dashboard.jpg";

// Build a canonical absolute URL from a site-rooted path.
export function pageUrl(path: string): string {
  return `${siteUrl}${path.startsWith("/") ? "" : "/"}${path}`;
}

// First dashboard image = LCP candidate for the homepage hero.
export const homeHeroLcpImage = "/images/dashboards/saas-dashboard.webp";

import type { Metadata } from "next";

/**
 * Build a service/blog page Metadata object with consistent canonical,
 * OG, and Twitter cards. Pages that need extra fields can spread or
 * override the result.
 */
export function buildPageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  ogDescription?: string;
  type?: "website" | "article";
}): Metadata {
  const image = opts.image ?? defaultOgImage;
  const ogDesc = opts.ogDescription ?? opts.description;
  return {
    title: opts.title,
    description: opts.description,
    keywords: opts.keywords,
    alternates: { canonical: pageUrl(opts.path) },
    openGraph: {
      type: opts.type ?? "article",
      title: opts.title,
      description: ogDesc,
      url: pageUrl(opts.path),
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: opts.imageAlt ?? opts.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: ogDesc,
      images: [image],
    },
  };
}
