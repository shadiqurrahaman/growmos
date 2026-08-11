import type { Metadata } from "next";
import ServicePage, { type ServicePageData } from "@/components/ServicePage";

export const metadata: Metadata = {
 title: "CRM Data Integration Salesforce & HubSpot",
 description:
 "Unify Salesforce and HubSpot data with the rest of your stack. Customer 360, attribution, and lead-to-revenue reporting.",
};

const data: ServicePageData = {
 accent: "#f97316",
 badge: "CRM Data Integration",
 titleTop: "One Customer.",
 titleGradient: "Everywhere It Needs to Be",
 description:
 "Your CRM is the system of record for customer relationships but it shouldn't be a silo. We unify Salesforce and HubSpot data with the rest of your stack so marketing, sales, product, and finance all work from the same customer 360.",
 stats: [
 { value: "1", label: "Customer record across systems" },
 { value: "−80%", label: "Manual data reconciliation" },
 { value: "Live", label: "Two-way sync, not nightly batch" },
 ],
 introHeading: "Stop reconciling.",
 introGradient: "Start deciding.",
 introText:
 "If your marketing team and your sales team disagree on what counts as 'an MQL,' the problem isn't the people it's the data. We fix that by building a single customer 360 and giving every system the right view of every customer, in near real time.",
 introList: [
 "Single source of truth for customer data",
 "Custom objects, fields, and hierarchies mapped correctly",
 "Lead-to-revenue reporting that finance trusts",
 "Two-way sync where it makes sense, not where it's fashionable",
 ],
 capabilitiesBadge: "What's Included",
 capabilitiesTitle: "Customer 360,",
 capabilitiesGradient: "Done Right",
 capabilitiesSubtitle: "Salesforce, HubSpot, and everything around them.",
 capabilities: [
 {
 id: "salesforce-sync",
 icon: "fa-brands fa-salesforce",
 title: "Salesforce Sync",
 desc: "Reliable, schema-aware sync from Salesforce into your warehouse without losing history or breaking custom objects.",
 points: [
 "Standard and custom object mapping",
 "Field history tracking preserved",
 "Bulk and incremental loads",
 "Failure alerts with row-level detail",
 ],
 },
 {
 id: "hubspot-sync",
 icon: "fa-solid fa-bullhorn",
 title: "HubSpot Sync",
 desc: "Marketing, sales, and service data unified for attribution, lifecycle analysis, and reporting.",
 points: [
 "Contacts, companies, deals, tickets",
 "Engagement events (emails, calls, meetings)",
 "Marketing campaign attribution",
 "Property mapping across portals",
 ],
 },
 {
 id: "customer-360",
 icon: "fa-solid fa-id-card",
 title: "Customer 360 Model",
 desc: "A modelled customer record that joins CRM, product, billing, and support data owned by you, queryable by anyone.",
 points: [
 "Identity stitching across systems",
 "Hierarchies: account, parent, child",
 "Activity timeline per customer",
 "Tests on identity and joins",
 ],
 },
 {
 id: "attribution",
 icon: "fa-solid fa-arrows-split-up-and-left",
 title: "Attribution Modelling",
 desc: "Multi-touch attribution that connects paid media, organic, lifecycle, and sales activity to closed revenue.",
 points: [
 "First-touch, last-touch, and position-based",
 "Data-driven attribution where data allows",
 "Funnel analysis by channel and campaign",
 "Cost per qualified opportunity",
 ],
 },
 ],
 processBadge: "How We Work",
 processTitle: "From Siloed CRM to",
 processGradient: "Customer 360",
 processSubtitle: "Typically 4–6 weeks for the foundation.",
 process: [
 { n: "01", title: "CRM & Source Audit", desc: "We review your CRM schema, custom objects, and downstream consumers. Output: a mapping spec." },
 { n: "02", title: "Pipeline Build", desc: "We build the syncs (Fivetran, Airbyte, or custom) and the customer 360 model in your warehouse." },
 { n: "03", title: "Attribution & Reporting", desc: "We layer on multi-touch attribution and the dashboards your finance and marketing teams will use." },
 { n: "04", title: "Hand-Off & Operate", desc: "We document the model, train your team, and either continue as a retainer or hand over fully." },
 ],
 benefitsBadge: "Why GrowMos",
 benefitsTitle: "More Than a Sync ",
 benefitsGradient: "A Model",
 benefitsSubtitle: "Tools get data in the warehouse. We give it meaning.",
 benefits: [
 { icon: "fa-solid fa-users", title: "Customer 360 From Day One", desc: "You don't just get a Salesforce mirror in your warehouse you get a modelled customer record your whole team can trust." },
 { icon: "fa-solid fa-money-bill-trend-up", title: "Attribution Finance Trusts", desc: "Multi-touch models that connect paid spend to closed revenue, with the lineage to defend every number." },
 { icon: "fa-solid fa-arrows-rotate", title: "Two-Way Sync, Used Wisely", desc: "We don't push warehouse data back into your CRM by default. We do it where it actually helps sales and support and nowhere else." },
 { icon: "fa-solid fa-shield-halved", title: "Security & Compliance", desc: "PII handled per spec, audit trails on every sync, and access controls baked into every layer of the model." },
 ],
 faqs: [
 { q: "Which CRM do you integrate with most?", a: "Salesforce and HubSpot cover most of our clients. We've also integrated Zoho, Pipedrive, and Microsoft Dynamics same engineering patterns, different schemas." },
 { q: "Can we just use Fivetran or Airbyte for this?", a: "Yes and we use them as the first layer. The harder work is the customer 360 model on top: identity stitching, hierarchies, dedup, and the tests that keep it accurate. That's what we bring." },
 { q: "What about GDPR / data residency?", a: "Both syncs and the warehouse can be region-pinned. We design access controls and retention rules to match your privacy posture, and we sign a DPA before any PII leaves its current home." },
 { q: "Do you build dashboards, too?", a: "Yes see our BI & Dashboards service. Most CRM engagements also produce 2–4 executive dashboards (pipeline, attribution, customer health) as part of the work." },
 ],
 ctaTitle: "Get your CRM out of its",
 ctaGradient: "silo.",
 ctaText:
 "Book a free discovery call. We'll review your CRM, downstream reporting, and goals and show you what a customer 360 looks like in your warehouse in 4–6 weeks.",
};

export default function CrmIntegrationPage() {
 return <ServicePage {...data} />;
}
