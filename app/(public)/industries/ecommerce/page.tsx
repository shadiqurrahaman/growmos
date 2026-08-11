import type { Metadata } from "next";
import IndustryPage, { type IndustryPageData } from "@/components/IndustryPage";

export const metadata: Metadata = {
 title: "Data Solutions for E-commerce | GrowMos",
 description:
 "Multi-channel attribution, LTV modelling, and inventory analytics for e-commerce brands. Shopify, ad platforms, and warehouse in one place.",
};

const data: IndustryPageData = {
 accent: "#3b82f6",
 badge: "For E-commerce",
 titleTop: "Every Channel.",
 titleGradient: "One Source of Truth",
 description:
 "E-commerce brands run on Shopify, Meta, Google, TikTok, Klaviyo, and a dozen other tools each with its own version of \"revenue.\" We build the warehouse foundation that lets you see true ROAS, true LTV, and true contribution margin across every channel.",
 stats: [
 { value: "−30%", label: "Wasted ad spend" },
 { value: "2.4×", label: "Faster reporting cycles" },
 { value: "Live", label: "Inventory in your warehouse" },
 ],
 challengesBadge: "The E-commerce Reality",
 challengesTitle: "Why E-commerce",
 challengesGradient: "Attribution Breaks",
 challengesSubtitle: "Three problems every multi-channel brand faces.",
 challenges: [
 {
 icon: "fa-solid fa-arrows-split-up-and-left",
 title: "Channel Attribution Is a Mess",
 desc: "Meta claims credit. Google claims credit. Your email tool claims credit. None of them talk to each other and your CFO doesn't trust any of them.",
 },
 {
 icon: "fa-solid fa-money-bill-trend-up",
 title: "True LTV Is Unknown",
 desc: "You know first-purchase value. You don't know whether the second and third orders funded the Facebook ads in the first place.",
 },
 {
 icon: "fa-solid fa-boxes-stacked",
 title: "Inventory and Marketing Are Disconnected",
 desc: "Marketing keeps spending on a SKU that's about to go out of stock. Inventory doesn't know the marketing plan. Money is left on the table.",
 },
 ],
 solutionsBadge: "What We Build",
 solutionsTitle: "An E-commerce Data Platform",
 solutionsGradient: "Built for Growth",
 solutionsSubtitle: "From ad-spend audits to LTV measured, not assumed.",
 solutions: [
 {
 icon: "fa-solid fa-chart-pie",
 title: "Multi-Channel Attribution",
 desc: "Data-driven attribution that connects paid, organic, email, and direct to closed revenue with the lineage to defend every number.",
 href: "/crm-data-integration",
 },
 {
 icon: "fa-solid fa-coins",
 title: "True LTV & Contribution Margin",
 desc: "Cohort-based LTV models, blended vs. paid breakdown, and contribution margin by SKU and channel in your warehouse.",
 href: "/bi-dashboards",
 },
 {
 icon: "fa-solid fa-store",
 title: "Shopify + Warehouse Sync",
 desc: "Orders, customers, products, inventory, and refunds modelled, tested, and joined with your ad platforms.",
 href: "/data-pipeline-engineering",
 },
 {
 icon: "fa-solid fa-envelope",
 title: "Lifecycle & Email Activation",
 desc: "Build Klaviyo and Meta audiences from your warehouse abandoned cart, VIP, lapsed and audit ROI of every flow.",
 href: "/reverse-etl-activation",
 },
 ],
 processBadge: "How We Engage",
 processTitle: "E-commerce Engagement,",
 processGradient: "Week by Week",
 processSubtitle: "First wins in 4 weeks attribution foundation in 8.",
 process: [
 { n: "01", title: "Channel & Source Audit", desc: "We inventory every source (Shopify, Meta, Google, Klaviyo, TikTok, etc.), reconcile revenue, and surface the gaps." },
 { n: "02", title: "Warehouse Foundation", desc: "We stand up BigQuery / Snowflake, sync all sources, and model the orders → customers → cohorts → LTV chain." },
 { n: "03", title: "Attribution & Margin", desc: "We build the multi-touch attribution model and the contribution-margin views your CFO and founders need." },
 { n: "04", title: "Operate & Scale", desc: "Ongoing optimisation of dashboards, new use cases (LTV-driven bidding, audience activation), and yearly platform reviews." },
 ],
 faqs: [
 { q: "Can you work with our existing Shopify / Klaviyo / Triple Whale setup?", a: "Yes usually we sit alongside Triple Whale / Northbeam for day-to-day decisions and use the warehouse as the system of record for monthly board reporting. We can also replace them if you want to consolidate." },
 { q: "How do you handle refunds, chargebacks, and partial returns?", a: "We model the full revenue lifecycle gross, discount, refund, chargeback, net and let every dashboard show the breakdown. Marketing optimises on net, finance reconciles on gross, and you can see both side by side." },
 { q: "What about subscription / DTC repeat purchase?", a: "We model subscription cohorts separately from one-time purchases, and build LTV curves that account for churn, pause, and reactivation. Same data, different lenses both useful." },
 { q: "Do you build performance dashboards too?", a: "Yes but we focus on the ones that change decisions (channel shift, creative refresh, audience activation). Not 30 vanity dashboards no one opens." },
 ],
 ctaTitle: "Stop guessing where your",
 ctaGradient: "ad spend goes.",
 ctaText:
 "Book a free discovery call. We'll review your current attribution, your ad accounts, and your finance reporting and show you what a real e-commerce data platform looks like in 4 weeks.",
};

export default function EcommercePage() {
 return <IndustryPage {...data} />;
}