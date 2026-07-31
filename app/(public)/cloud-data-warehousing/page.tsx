import type { Metadata } from "next";
import ServicePage, { type ServicePageData } from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Cloud Data Warehousing — BigQuery, Microsoft Fabric & Snowflake",
  description:
    "Modern warehouses designed for B2B scale. BigQuery, Microsoft Fabric, and Snowflake architecture, migration, and cost optimisation.",
};

const data: ServicePageData = {
  accent: "#3b82f6",
  badge: "Cloud Data Warehouse",
  titleTop: "A Warehouse Built to",
  titleGradient: "Run Your Business",
  description:
    "Your warehouse is the foundation of every decision, every dashboard, and every downstream AI feature. We architect, build, and optimise warehouses in BigQuery, Microsoft Fabric, and Snowflake — sized for cost, speed, and the way your team actually queries.",
  stats: [
    { value: "−45%", label: "Average warehouse spend" },
    { value: "10×", label: "Faster complex queries" },
    { value: "100%", label: "Owned by you" },
  ],
  introHeading: "Modern stack.",
  introGradient: "Right-sized.",
  introText:
    "BigQuery, Microsoft Fabric, and Snowflake each have a sweet spot — and a footgun or two. We help you pick the right one for your data volume, query patterns, and existing investments (especially if you're a Microsoft shop). Then we set it up properly: project structure, access controls, partitions, and cost guardrails.",
  introList: [
    "Right-sized for your actual query patterns",
    "Security and access controls from day one",
    "Cost monitoring and budgets wired in",
    "Migration path off legacy systems, planned up front",
  ],
  capabilitiesBadge: "What's Included",
  capabilitiesTitle: "Architecture, Migration,",
  capabilitiesGradient: "And Tuning",
  capabilitiesSubtitle: "From greenfield to legacy lift-and-shift — handled.",
  capabilities: [
    {
      id: "warehouse-architecture",
      icon: "fa-solid fa-sitemap",
      title: "Warehouse Architecture",
      desc: "Project / schema layout, partitioning, clustering, and access controls that scale with your team.",
      points: [
        "Project / workspace structure",
        "Partitioning and clustering strategy",
        "Role-based access controls",
        "Environments (dev / staging / prod)",
      ],
    },
    {
      id: "fabric-bigquery-snowflake",
      icon: "fa-solid fa-cube",
      title: "BigQuery / Fabric / Snowflake",
      desc: "Native expertise in all three — and an honest recommendation on which fits your stack.",
      points: [
        "BigQuery slot reservations",
        "Microsoft Fabric OneLake design",
        "Snowflake warehouse sizing",
        "Multi-cloud and hybrid setups",
      ],
    },
    {
      id: "migration",
      icon: "fa-solid fa-truck-fast",
      title: "Migration from Legacy",
      desc: "From Redshift, SQL Server, MySQL, on-prem Hadoop — we've done it. Zero-downtime where it matters.",
      points: [
        "Discovery and source inventory",
        "Cut-over and dual-write strategy",
        "Backfill and reconciliation",
        "Decommissioning of legacy systems",
      ],
    },
    {
      id: "cost-performance",
      icon: "fa-solid fa-gauge-high",
      title: "Cost & Performance Tuning",
      desc: "Most warehouses we audit have 30–50% of spend optimisable. We find it, prove it, and ship the fixes.",
      points: [
        "Query performance analysis",
        "Slot / warehouse sizing reviews",
        "Materialised views and aggregations",
        "Budgets and alerts",
      ],
    },
  ],
  processBadge: "How We Work",
  processTitle: "Typical Engagement,",
  processGradient: "Week by Week",
  processSubtitle: "Predictable timelines, clear handoffs.",
  process: [
    { n: "01", title: "Discovery", desc: "We profile current state: sources, query patterns, spend, users, governance. Output: a target architecture and roadmap." },
    { n: "02", title: "Foundation", desc: "We stand up the warehouse, environments, access controls, and the first production-grade dataset." },
    { n: "03", title: "Migration or Build", desc: "Either migrate from legacy in waves, or build out the mart layer that powers your BI and AI." },
    { n: "04", title: "Operate & Tune", desc: "We monitor cost and performance, ship optimisations, and hand over a fully documented platform." },
  ],
  benefitsBadge: "Why GrowMos",
  benefitsTitle: "Vendor-Agnostic,",
  benefitsGradient: "Architect-Led",
  benefitsSubtitle: "The right warehouse, not the one we get paid for.",
  benefits: [
    { icon: "fa-solid fa-scale-balanced", title: "Tool-Agnostic", desc: "We're certified across BigQuery, Fabric, and Snowflake — and we'll tell you honestly which fits your stack and budget." },
    { icon: "fa-solid fa-coins", title: "Cost Engineers", desc: "Most warehouses have 30–50% optimisable spend. We find it in the first audit, then ship the fixes." },
    { icon: "fa-solid fa-lock", title: "Security-First", desc: "Access controls, PII handling, and audit logs are designed in from day one — not bolted on." },
    { icon: "fa-solid fa-people-group", title: "Knowledge Transfer", desc: "We leave your team with documentation, runbooks, and pairing sessions — not a black box." },
  ],
  faqs: [
    { q: "Which warehouse should I pick?", a: "It depends on your existing cloud investments, query patterns, and team skills. Microsoft shops usually win with Fabric. Pure-GCP ecosystems usually win with BigQuery. Heavy ELT + lots of complex joins often favours Snowflake. We'll walk through the trade-offs on a discovery call." },
    { q: "Can you migrate us off Redshift or SQL Server?", a: "Yes — we've done it for SaaS and E-commerce clients on data sets from 100GB to 30TB+. The migration is staged in waves with a dual-write / dual-read window so nothing breaks for downstream consumers." },
    { q: "How long does a typical warehouse build take?", a: "Greenfield on BigQuery or Snowflake: 4–6 weeks to first production dataset. Migration: 8–12 weeks depending on source complexity. We give you a fixed timeline after discovery." },
    { q: "Do we need a separate BI tool?", a: "Each warehouse has its own built-in insights tool, but for executive dashboards and self-serve analytics most teams pair with Power BI or Metabase. We can build either — see our BI service page." },
  ],
  ctaTitle: "Let's design the right",
  ctaGradient: "warehouse.",
  ctaText:
    "Book a free discovery call. We'll profile your current state, sketch a target architecture, and tell you honestly what it costs and how long it takes.",
};

export default function CloudWarehousingPage() {
  return <ServicePage {...data} />;
}
