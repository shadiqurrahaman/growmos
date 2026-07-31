import type { Metadata } from "next";
import IndustryPage, { type IndustryPageData } from "@/components/IndustryPage";

export const metadata: Metadata = {
  title: "Data Solutions for Retail | GrowMos",
  description:
    "POS, inventory, and unified customer data platforms for retail operators. From chain stores to omnichannel, we build the data foundation.",
};

const data: IndustryPageData = {
  accent: "#a855f7",
  badge: "For Retail",
  titleTop: "Every Store, Every Channel",
  titleGradient: "One View of Customer",
  description:
    "Retail operators juggle POS, e-commerce, inventory, loyalty, marketing, and a dozen spreadsheets — and the customer record is fragmented across all of them. We build the unified data platform that connects online and offline, so merchandising, marketing, and ops can finally see the same customer.",
  stats: [
    { value: "20%", label: "Reduction in stockouts" },
    { value: "1.8×", label: "Loyalty programme ROI" },
    { value: "Live", label: "Customer view across channels" },
  ],
  challengesBadge: "The Retail Reality",
  challengesTitle: "Why Retail",
  challengesGradient: "Data Is Fragmented",
  challengesSubtitle: "Three problems every multi-location retailer faces.",
  challenges: [
    {
      icon: "fa-solid fa-store",
      title: "Online and Offline Don't Talk",
      desc: "A loyalty customer buys in-store, then browses online, then comes back via email — and no one connects the dots.",
    },
    {
      icon: "fa-solid fa-boxes-stacked",
      title: "Inventory Decisions Are Blind",
      desc: "Marketing runs a promotion on a SKU that's out of stock in 30% of stores. Inventory doesn't know the marketing plan.",
    },
    {
      icon: "fa-solid fa-percent",
      title: "Promotions Aren't Measured",
      desc: "Each campaign is tracked in isolation. Nobody knows whether the 20% off drove incremental revenue or just shifted timing.",
    },
  ],
  solutionsBadge: "What We Build",
  solutionsTitle: "A Retail Data Platform",
  solutionsGradient: "Built for Stores",
  solutionsSubtitle: "From POS to loyalty — joined, modelled, and actionable.",
  solutions: [
    {
      icon: "fa-solid fa-id-card",
      title: "Unified Customer 360",
      desc: "Stitch loyalty, POS, e-commerce, and email into a single customer record — with the join keys tested and documented.",
      href: "/crm-data-integration",
    },
    {
      icon: "fa-solid fa-cube",
      title: "Inventory & Demand Signals",
      desc: "POS live into your warehouse, joined with marketing campaigns — so merchandising and marketing share the same truth.",
      href: "/data-pipeline-engineering",
    },
    {
      icon: "fa-solid fa-chart-line",
      title: "Promotion & Campaign Analytics",
      desc: "Incrementality testing, attribution by channel, and post-promo reporting finance actually trusts.",
      href: "/bi-dashboards",
    },
    {
      icon: "fa-solid fa-arrows-rotate",
      title: "Loyalty Lifecycle",
      desc: "Push churn-risk and VIP signals back into your CRM and email tools — close the loop on retention and reactivation.",
      href: "/reverse-etl-activation",
    },
  ],
  processBadge: "How We Engage",
  processTitle: "Retail Engagement,",
  processGradient: "Week by Week",
  processSubtitle: "From POS silos to a unified platform your team uses daily.",
  process: [
    { n: "01", title: "Source & Store Audit", desc: "We inventory every POS, e-commerce, loyalty, and marketing system — and map the data to a unified customer and product model." },
    { n: "02", title: "Pipeline Build", desc: "We sync POS, e-commerce, loyalty, and CRM into your warehouse with tests, lineage, and near-real-time freshness." },
    { n: "03", title: "Promo & Inventory Models", desc: "We model promotion effectiveness, inventory turnover, and customer LTV — with dashboards for merchandising, marketing, and ops." },
    { n: "04", title: "Operate & Scale", desc: "Ongoing model evolution, new location rollouts, and quarterly reviews as your business grows." },
  ],
  faqs: [
    { q: "Do you work with specific POS systems?", a: "Yes — we've integrated Lightspeed, Shopify POS, Square, Toast, and several proprietary systems. Same engineering patterns, different schemas. If your POS has an API or CSV export, we can sync it." },
    { q: "How do you handle loyalty join keys?", a: "Identity stitching is the hardest part of retail data. We design the join keys once (loyalty ID → email → phone → POS card) with tests, and re-stitch at the model layer when new sources come in." },
    { q: "What about multi-store / multi-region?", a: "We model the warehouse to scale: separate schemas per region, with rollups to the corporate level. Same dashboards, different filter scopes — and access controls that respect regional data residency." },
    { q: "Can you measure promotion incrementality?", a: "Yes — using control-geo / hold-out testing, time-series comparisons, and machine-learning attribution where data allows. We'll set up the framework, the team runs the experiments." },
  ],
  ctaTitle: "Connect every store to",
  ctaGradient: "every customer.",
  ctaText:
    "Book a free discovery call. We'll review your POS, loyalty, and marketing stack — and show you what a unified retail data platform looks like in 6–8 weeks.",
};

export default function RetailPage() {
  return <IndustryPage {...data} />;
}