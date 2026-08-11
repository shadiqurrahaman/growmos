export type PricingTier = {
  name: string;
  tagline: string;
  price: string;
  priceSuffix: string;
  priceNote?: string;
  cta: string;
  ctaHref: string;
  featured?: boolean;
  features: string[];
};

// 3-tier pricing for GrowMos services + product.
// Mirrors the standard B2B SaaS pricing page pattern (Starter / Growth /
// Enterprise) used by Fivetran, dbt, Hightouch, Stitch, and Airbyte. The
// middle tier is marked "Most Popular" and given a visual emphasis.
export const pricingTiers: PricingTier[] = [
 {
 name: "Starter",
 tagline: "For teams making their first move to data-driven decisions.",
 price: "$500",
 priceSuffix: "/month",
 priceNote: "Billed monthly. Pause or cancel anytime.",
 cta: "Start with Starter",
 ctaHref: "/contact?plan=starter",
 features: [
 "Up to 5 data sources connected",
 "1 dashboard suite (Power BI or Metabase)",
 "Standard dbt transformation layer",
 "Weekly health report",
 "Email support (24h response)",
 ],
 },
 {
 name: "Growth",
 tagline: "For B2B teams scaling their data operations.",
 price: "$1,200",
 priceSuffix: "/month",
 priceNote: "Most teams at this size are running 24/7 pipelines.",
 cta: "Talk to the team",
 ctaHref: "/contact?plan=growth",
 featured: true,
 features: [
 "Up to 25 data sources connected",
 "Multiple dashboard suites per team",
 "Advanced dbt models with testing",
 "Reverse ETL into HubSpot / Salesforce",
 "Real-time pipeline monitoring",
 "Quarterly roadmap reviews",
 "Slack channel + 4h response",
 ],
 },
 {
 name: "Enterprise",
 tagline: "For organisations with custom data, security, and compliance needs.",
 price: "Custom",
 priceSuffix: "",
 priceNote: "Tailored to your stack, volume, and SLAs.",
 cta: "Book a briefing",
 ctaHref: "/contact?plan=enterprise",
 features: [
 "Unlimited sources and dashboards",
 "Custom connectors and private APIs",
 "Dedicated senior engineering pod",
 "SOC 2 / HIPAA / GDPR compliance",
 "Single-tenant deployment available",
 "Named CSM + 1h response SLA",
 "Quarterly on-site strategy workshops",
 ],
 },
];