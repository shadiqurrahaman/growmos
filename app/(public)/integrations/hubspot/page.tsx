import type { Metadata } from "next";
import IntegrationPage, { type IntegrationPageData } from "@/components/IntegrationPage";

export const metadata: Metadata = {
 title: "GrowMos + HubSpot Marketing Attribution & Pipeline Analytics",
 description:
 "Sync HubSpot contacts, deals, and engagement into your warehouse. Multi-touch attribution, lifecycle analytics, and lead scoring.",
};

const data: IntegrationPageData = {
 accent: "#ff7a59",
 brand: "HubSpot",
 tagline: "Marketing, sales, and service combined modelled, tested, and tied to revenue.",
 titleTop: "Sync HubSpot.",
 titleGradient: "Attribute Marketing to Revenue.",
 description:
 "HubSpot is the hub of your marketing and sales motion but on its own, attribution is guesswork. We sync Contacts, Companies, Deals, Tickets, and engagement events into your warehouse, join them with closed-won revenue, and surface the channels that actually drive pipeline.",
 stats: [
 { value: "Live", label: "Engagement events streamed" },
 { value: "100%", label: "Custom properties preserved" },
 { value: "1", label: "Lead score across systems" },
 ],
 useCases: [
 {
 icon: "fa-solid fa-bullseye",
 title: "Multi-Touch Attribution",
 desc: "Connect every HubSpot touchpoint email, ad, web, sales activity to closed-won revenue.",
 },
 {
 icon: "fa-solid fa-handshake",
 title: "Lead-to-Revenue Reporting",
 desc: "From form fill to closed deal modelled, attributed, and visible to the CMO and CFO.",
 },
 {
 icon: "fa-solid fa-arrows-rotate",
 title: "Lifecycle & Retention",
 desc: "Push churn-risk and re-engagement audiences back into HubSpot close the loop on retention.",
 },
 {
 icon: "fa-solid fa-people-group",
 title: "B2B Account-Based Reporting",
 desc: "Stitch Companies with closed-won revenue, attach ad spend, and show the pipeline that matters.",
 },
 ],
 capabilities: [
 {
 icon: "fa-solid fa-database",
 title: "Full Schema Sync",
 desc: "Contacts, Companies, Deals, Tickets, Engagements (emails, calls, meetings), and custom objects preserved.",
 },
 {
 icon: "fa-solid fa-chart-line",
 title: "Engagement Event Stream",
 desc: "Email opens, clicks, replies, page views, and form submissions all modelled for funnel analysis.",
 },
 {
 icon: "fa-solid fa-cubes",
 title: "dbt-Modelled Marts",
 desc: "Marketing-qualified, sales-qualified, and closed-won models with tests on every stage transition.",
 },
 {
 icon: "fa-solid fa-arrows-split-up-and-left",
 title: "Attribution Modeling",
 desc: "First-touch, last-touch, position-based, and data-driven depending on your data volume.",
 },
 {
 icon: "fa-solid fa-wand-magic-sparkles",
 title: "Lead Scoring Overhaul",
 desc: "Move from rules-based scoring to a warehouse-driven model predictive, tested, and explainable.",
 },
 {
 icon: "fa-solid fa-shield-halved",
 title: "Compliance-Aware",
 desc: "GDPR consent properties, opt-out handling, and PII redaction built into the model layer.",
 },
 ],
 process: [
 { n: "01", title: "HubSpot & Goal Audit", desc: "We review your HubSpot portals, custom properties, and the business questions attribution needs to answer." },
 { n: "02", title: "Pipeline Build", desc: "We sync contacts, companies, deals, and engagement events into your warehouse with tests and lineage." },
 { n: "03", title: "Model & Attribute", desc: "We build the dbt models and the attribution framework first-touch, last-touch, and data-driven where data allows." },
 { n: "04", title: "Activate & Operate", desc: "We push churn-risk and re-engagement audiences back into HubSpot, ship dashboards, and document the system." },
 ],
 faqs: [
 { q: "Do you work with Marketing Hub, Sales Hub, Service Hub, or all three?", a: "All three. Most clients use Marketing + Sales Hub; we also pull Service Hub Tickets for full customer context. We sync whatever you've configured." },
 { q: "How do you handle multi-touch attribution?", a: "We start with first-touch and last-touch (every marketing team needs both), then layer on position-based and data-driven as data allows. We use Hightouch / Census for the activations and the warehouse for the modelling." },
 { q: "Can you replace our rules-based lead scoring?", a: "Yes and we usually do. Rules-based scoring misses the actual signal. We use the warehouse to model a predictive score from engagement + firmographic + behavioural data, then push it back into HubSpot as a custom property." },
 { q: "What about GDPR consent properties?", a: "HubSpot has built-in consent tracking. We sync those properties into the warehouse and model opt-out / unsubscribe states at every layer so a re-engagement flow never reaches a contact who shouldn't be there." },
 ],
 ctaTitle: "Attribute every marketing",
 ctaGradient: "dollar to revenue.",
 ctaText:
 "Book a free briefing. We'll review your HubSpot setup, your current attribution, and your goals and show you what a real revenue-attribution platform looks like in 4–6 weeks.",
};

export default function HubspotPage() {
 return <IntegrationPage {...data} />;
}