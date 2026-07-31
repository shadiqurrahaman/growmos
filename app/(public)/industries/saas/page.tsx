import type { Metadata } from "next";
import IndustryPage, { type IndustryPageData } from "@/components/IndustryPage";

export const metadata: Metadata = {
  title: "Data Solutions for SaaS | GrowMos",
  description:
    "Product analytics, attribution, and warehouse foundations for SaaS companies. From PLG metrics to enterprise sales dashboards.",
};

const data: IndustryPageData = {
  accent: "#6366f1",
  badge: "For SaaS",
  titleTop: "Data That Powers",
  titleGradient: "Your SaaS Engine",
  description:
    "Whether you're product-led, sales-led, or somewhere in between — your business runs on metrics. We build the data foundation SaaS companies need to grow on: clean product analytics, attribution that actually works, and dashboards your finance team will defend in the boardroom.",
  stats: [
    { value: "−40%", label: "Faster monthly close" },
    { value: "10×", label: "Speed of insight delivery" },
    { value: "100%", label: "Trusted in boardroom" },
  ],
  challengesBadge: "The SaaS Reality",
  challengesTitle: "Why Most SaaS",
  challengesGradient: "Data Is Broken",
  challengesSubtitle: "Three problems we hear from every SaaS leadership team.",
  challenges: [
    {
      icon: "fa-solid fa-chart-line",
      title: "MRR Means Three Things",
      desc: "Marketing reports one number, finance another, and the board sees a third. None of them agree — and everyone has a different definition.",
    },
    {
      icon: "fa-solid fa-bullseye",
      title: "Attribution Is Guesswork",
      desc: "Self-serve sign-ups, sales-led pipeline, and product-qualified accounts all flow through different systems — and no one knows which channels actually work.",
    },
    {
      icon: "fa-solid fa-people-arrows",
      title: "Product Data Is Siloed",
      desc: "Mixpanel / Amplitude / PostHog hold usage data. Stripe holds billing. Salesforce holds pipeline. None of them talk to each other.",
    },
  ],
  solutionsBadge: "What We Build",
  solutionsTitle: "A SaaS Data Platform",
  solutionsGradient: "That Holds Up",
  solutionsSubtitle: "From product analytics to board-ready dashboards — one source of truth.",
  solutions: [
    {
      icon: "fa-solid fa-arrows-rotate",
      title: "Unified Customer 360",
      desc: "Stitch product, billing, CRM, and support into a single customer record — including identity across anonymous → identified → paying.",
      href: "/crm-data-integration",
    },
    {
      icon: "fa-solid fa-coins",
      title: "MRR / ARR / NRR Done Right",
      desc: "Modelled in your warehouse, tested against your billing system, and visible to everyone from finance to the board.",
      href: "/bi-dashboards",
    },
    {
      icon: "fa-solid fa-chart-line",
      title: "Product Analytics in the Warehouse",
      desc: "Move from Mixpanel/Amplitude to event tables in BigQuery or Snowflake — with cohorts, funnels, and retention reports your PMs will use.",
      href: "/data-pipeline-engineering",
    },
    {
      icon: "fa-solid fa-arrows-split-up-and-left",
      title: "Multi-Touch Attribution",
      desc: "Paid, organic, sales, and product — connected end-to-end so growth knows what to double down on and what to cut.",
      href: "/reverse-etl-activation",
    },
  ],
  processBadge: "How We Engage",
  processTitle: "Typical SaaS Engagement,",
  processGradient: "Week by Week",
  processSubtitle: "From source chaos to a model you can defend in 4–6 weeks.",
  process: [
    { n: "01", title: "Metric Audit", desc: "We reconcile the 10–20 metrics your team actually uses — and document the math behind every one of them." },
    { n: "02", title: "Source Sync", desc: "We sync Stripe, your CRM, billing, product analytics, and ad platforms into your warehouse with tests and lineage." },
    { n: "03", title: "Model & Marts", desc: "We build the dbt models that power MRR, NRR, LTV, and attribution — and the dashboards finance and the board will read." },
    { n: "04", title: "Activate", desc: "We push churn-risk and expansion-readiness scores back into Salesforce / HubSpot via Reverse ETL — for sales and CS." },
  ],
  faqs: [
    { q: "Do you replace Mixpanel or Amplitude?", a: "Often partially — for most SaaS teams, we move event-level product analytics into BigQuery or Snowflake (more flexible, cheaper at scale, joins with everything else). Mixpanel/Amplitude can stay for fast iteration, but the source of truth moves to your warehouse." },
    { q: "How do you handle anonymous → identified user stitching?", a: "Identity stitching is the hardest part of SaaS data. We design the join keys once, with tests on every model that depends on them. Identity changes over time (anonymous → free → trial → paid → churned) are handled with type-2 SCDs." },
    { q: "Can you work with our finance team's existing reporting?", a: "Yes — most engagements end with us reconciling to the numbers finance already publishes, so we can prove the new system matches before cut-over." },
    { q: "What's the typical cost and timeline?", a: "For a mid-market SaaS company: 6–8 weeks to a usable foundation, with ongoing retainer for activation and new use cases. We'll give you an honest range after a discovery call." },
  ],
  ctaTitle: "Build the data platform your",
  ctaGradient: "SaaS deserves.",
  ctaText:
    "Book a free discovery call. We'll review your current stack, your board's favourite metric, and the questions your team can't answer today — and show you how 6 weeks can change that.",
};

export default function SaasPage() {
  return <IndustryPage {...data} />;
}