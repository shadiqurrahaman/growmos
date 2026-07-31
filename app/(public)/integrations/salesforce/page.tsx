import type { Metadata } from "next";
import IntegrationPage, { type IntegrationPageData } from "@/components/IntegrationPage";

export const metadata: Metadata = {
  title: "GrowMos + Salesforce — Unified Customer Data",
  description:
    "Sync Salesforce into your warehouse with confidence. Customer 360, attribution, and lead-to-revenue reporting backed by dbt-tested models.",
};

const data: IntegrationPageData = {
  accent: "#00a1e0",
  brand: "Salesforce",
  tagline: "The CRM that runs your business — modelled, tested, and trusted in your warehouse.",
  titleTop: "Sync Salesforce.",
  titleGradient: "Build a Customer 360.",
  description:
    "Salesforce holds your most important customer data — but it shouldn't be a silo. We sync Accounts, Contacts, Opportunities, Leads, and custom objects into your warehouse with full schema awareness, history tracking, and lineage. Result: a customer 360 finance and marketing will both trust.",
  stats: [
    { value: "1", label: "Customer record across systems" },
    { value: "Live", label: "Not nightly — near real time" },
    { value: "100%", label: "Custom objects preserved" },
  ],
  useCases: [
    {
      icon: "fa-solid fa-id-card",
      title: "Customer 360",
      desc: "Stitch Salesforce accounts and contacts with product, billing, and support — one record per customer, queryable by anyone.",
    },
    {
      icon: "fa-solid fa-money-bill-trend-up",
      title: "Lead-to-Revenue Reporting",
      desc: "From form fill to closed-won — modelled, attributed, and visible to finance and the board.",
    },
    {
      icon: "fa-solid fa-arrows-split-up-and-left",
      title: "Multi-Touch Attribution",
      desc: "Paid, organic, sales activity, and product usage — connected to closed revenue with lineage.",
    },
    {
      icon: "fa-solid fa-people-arrows",
      title: "Account Health & Expansion",
      desc: "Push account health, churn-risk, and expansion-readiness back into Salesforce — for sales and CS daily.",
    },
  ],
  capabilities: [
    {
      icon: "fa-solid fa-database",
      title: "Schema-Aware Sync",
      desc: "Fivetran / Airbyte connectors configured for your Salesforce schema — including custom objects, fields, and picklist values.",
    },
    {
      icon: "fa-solid fa-clock-rotate-left",
      title: "History Tracking Preserved",
      desc: "We sync Salesforce field history so stage progression, ownership changes, and amount edits are queryable as a time series.",
    },
    {
      icon: "fa-solid fa-cubes",
      title: "dbt-Modelled Marts",
      desc: "Staging → intermediate → mart models, with tests on every join and identity column. Tested against Salesforce.com.",
    },
    {
      icon: "fa-solid fa-arrows-rotate",
      title: "Two-Way Sync, Used Wisely",
      desc: "We push warehouse insights back into Salesforce only where it actually helps sales — and nowhere else.",
    },
    {
      icon: "fa-solid fa-shield-halved",
      title: "Security & Compliance",
      desc: "OAuth setup, IP allowlists, encryption in transit, and PII handling per your data residency requirements.",
    },
    {
      icon: "fa-solid fa-chart-line",
      title: "Executive Dashboards",
      desc: "Pipeline, attribution, and account health — visible in Power BI, Metabase, or your existing BI tool.",
    },
  ],
  process: [
    { n: "01", title: "Schema & Security Audit", desc: "We review your Salesforce schema, custom objects, integrations, and security model before any sync runs." },
    { n: "02", title: "Pipeline Build", desc: "We configure the connector, run an initial backfill, and validate row counts against Salesforce reports." },
    { n: "03", title: "Model & Test", desc: "We build the dbt models (Customer 360, opportunity history, lead-to-revenue) with tests on every join and identity column." },
    { n: "04", title: "Activate & Operate", desc: "We push churn-risk and account health into Salesforce via Reverse ETL, ship dashboards, and document the system." },
  ],
  faqs: [
    { q: "Which connector do you use — Fivetran, Airbyte, or custom?", a: "Mostly Fivetran for managed scale, Airbyte for customisation or cost-sensitive setups. We'll sometimes write a custom connector for large custom objects — depends on the schema, not the vendor." },
    { q: "How do you handle custom objects?", a: "We model every custom object in your schema, including picklist values, owner IDs, and history. The connector walks the schema at deploy time, so new fields are picked up on the next sync." },
    { q: "What about real-time vs. nightly sync?", a: "Fivetran default is every 15 minutes. We often go lower for high-priority objects (opportunities, leads) and higher for archival data. Documented per-object in the runbook." },
    { q: "Can you work with our existing Salesforce admin?", a: "Yes — and we recommend it. We need OAuth setup, security review, and field-level access grants. Your admin owns SSO, profiles, and permissions; we own the warehouse side." },
  ],
  ctaTitle: "Get Salesforce out of",
  ctaGradient: "its silo.",
  ctaText:
    "Book a free briefing. We'll review your Salesforce schema, downstream reporting, and goals — and show you what a real customer 360 looks like in 4–6 weeks.",
};

export default function SalesforcePage() {
  return <IntegrationPage {...data} />;
}