import type { Metadata } from "next";
import ServicePage, { type ServicePageData } from "@/components/ServicePage";

export const metadata: Metadata = {
 title: "BI & Dashboard Development Power BI & Metabase",
 description:
 "Decision-ready dashboards in Power BI and Metabase, built around the KPIs your team actually uses.",
};

const data: ServicePageData = {
 accent: "#8b5cf6",
 badge: "Business Intelligence",
 titleTop: "Dashboards Your Team",
 titleGradient: "Will Actually Use",
 description:
 "Most dashboards die on the share screen. We build BI that survives contact with a busy team clean models, intuitive navigation, and metrics tied to the decisions your business is actually making.",
 stats: [
 { value: "4 wks", label: "Avg. time to first dashboard" },
 { value: "+52%", label: "Increase in self-serve questions answered" },
 { value: "−60%", label: "Ad-hoc analyst requests" },
 ],
 introHeading: "From spreadsheet chaos",
 introGradient: "to single source.",
 introText:
 "We start with your goals, not your data. What decisions are getting made today and what numbers would make those decisions easier? Then we model the warehouse to support those metrics and ship dashboards that get opened every Monday morning.",
 introList: [
 "Modelled before visualised every metric defined once",
 "Built around decisions, not vanity metrics",
 "Tested with the actual people who'll use them",
 "Self-serve where possible, expert where needed",
 ],
 capabilitiesBadge: "What's Included",
 capabilitiesTitle: "From KPIs to Self-Serve",
 capabilitiesGradient: "Adoption",
 capabilitiesSubtitle: "Every layer of your BI practice covered.",
 capabilities: [
 {
 id: "metric-modeling",
 icon: "fa-solid fa-cubes",
 title: "Metric Modelling",
 desc: "A centralised, tested definition of every metric so finance, marketing, and product all read the same number.",
 points: [
 "Headcount, revenue, MRR, LTV, etc.",
 "Metric layer (Cube / dbt Metrics)",
 "Lineage from metric to source row",
 "Tests on metric calculations",
 ],
 },
 {
 id: "executive-dashboards",
 icon: "fa-solid fa-chart-line",
 title: "Executive Dashboards",
 desc: "Board-ready views that summarise the business in 5 seconds and let leaders drill in for the why.",
 points: [
 "One-page executive summary",
 "Cohort and trend views",
 "Variance vs. plan and prior period",
 "Mobile-friendly layouts",
 ],
 },
 {
 id: "operational-dashboards",
 icon: "fa-solid fa-gauge",
 title: "Operational Dashboards",
 desc: "Daily-use dashboards for support, sales, finance, and ops built for speed and drill-down.",
 points: [
 "Customer health / churn views",
 "Sales pipeline and quota tracking",
 "Marketing attribution by channel",
 "On-call / live dashboards",
 ],
 },
 {
 id: "self-serve-enablement",
 icon: "fa-solid fa-users",
 title: "Self-Serve Enablement",
 desc: "Make the team self-sufficient with the right guardrails, training, and access in place.",
 points: [
 "Semantic layer setup",
 "Drill-path and certified datasets",
 "Train-the-trainer workshops",
 "Office hours for analysts",
 ],
 },
 ],
 processBadge: "How We Work",
 processTitle: "BI Engagements That",
 processGradient: "Stick",
 processSubtitle: "We design for adoption, not just delivery.",
 process: [
 { n: "01", title: "Goals & Metrics Workshop", desc: "We sit with leadership and front-line teams to define the 10–20 KPIs that matter and how they're calculated." },
 { n: "02", title: "Model & Pilot", desc: "We model the metric layer and build 2–3 flagship dashboards the ones that get opened every Monday." },
 { n: "03", title: "Rollout & Train", desc: "We roll out to the wider team, run training, and iterate on the highest-traffic dashboards." },
 { n: "04", title: "Operate", desc: "Ongoing support, metric evolution, and new dashboard builds as the business changes." },
 ],
 benefitsBadge: "Why GrowMos",
 benefitsTitle: "BI Built Around Your",
 benefitsGradient: "Decisions",
 benefitsSubtitle: "Adoption is a feature not an afterthought.",
 benefits: [
 { icon: "fa-solid fa-bullseye", title: "Decision-First Design", desc: "Every dashboard is built around a specific decision or meeting and we work backward from there." },
 { icon: "fa-solid fa-layer-group", title: "Modelled, Not Visualised", desc: "Metrics get defined once in a semantic layer, then reused. Finance and marketing read the same number." },
 { icon: "fa-solid fa-graduation-cap", title: "Team Enablement", desc: "We leave behind trained analysts, clear docs, and runbooks not a black box in someone's head." },
 { icon: "fa-solid fa-arrows-rotate", title: "Living BI", desc: "Quarterly reviews and ongoing iteration keep your BI aligned with how the business actually evolves." },
 ],
 faqs: [
 { q: "Power BI or Metabase which should I pick?", a: "Power BI if you're a Microsoft shop or need enterprise-grade governance. Metabase if you want a modern, friendly UX, faster iteration, and self-serve for non-technical users. Both work great with BigQuery or Snowflake. We're certified in both and can build in either." },
 { q: "How do you handle conflicting definitions of the same metric?", a: "Badly at first that's why we model metrics centrally. We document every metric in a semantic layer with tests, lineage, and an owner. By the time we're done, finance and marketing are reading the same number for revenue, LTV, and CAC." },
 { q: "Can you embed dashboards in our product?", a: "Yes. We support embedded Power BI, embedded Metabase, and fully custom React dashboards built on top of your warehouse for B2B SaaS products that want customer-facing analytics." },
 { q: "What does ongoing support look like?", a: "Two models: retainer (a few days a month for new dashboards and metric evolution) or full ownership (we run your BI function for you). Most clients start retainer, graduate to full ownership when their data team grows." },
 ],
 ctaTitle: "Build the BI your team",
 ctaGradient: "deserves.",
 ctaText:
 "Book a 30-minute discovery call. We'll review your current dashboards (or your goals if you're starting fresh) and show you exactly what a BI rebuild looks like in 4 weeks.",
};

export default function BiDashboardsPage() {
 return <ServicePage {...data} />;
}
