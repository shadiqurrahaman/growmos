import type { Metadata } from "next";
import ServicePage, { type ServicePageData } from "@/components/ServicePage";

export const metadata: Metadata = {
 title: "Data Pipeline Engineering Fivetran, Airbyte & dbt",
 description:
 "End-to-end ingestion and transformation for B2B data. Fivetran, Airbyte, and dbt pipelines that are reliable, modelled, and ready for analysis.",
};

const data: ServicePageData = {
 accent: "#10b981",
 badge: "Data Engineering",
 titleTop: "Pipelines You Can",
 titleGradient: "Actually Trust",
 description:
 "Most data projects don't fail because of the warehouse or the BI tool they fail because the pipes underneath are fragile. We build production-grade ingestion and transformation pipelines using Fivetran, Airbyte, and dbt engineered for observability, testability, and zero-surprise delivery.",
 stats: [
 { value: "99.5%+", label: "Pipeline uptime" },
 { value: "−70%", label: "Manual data cleanup" },
 { value: "<2hr", label: "Fresh data in warehouse" },
 ],
 introHeading: "Stop firefighting data.",
 introGradient: "Start shipping insights.",
 introText:
 "If your team is spending Friday afternoons reconciling numbers between Salesforce, your ad platforms, and your warehouse the data pipeline is broken. We design and build pipelines that run themselves, with tests, monitoring, and documentation baked in. Your analysts get clean, modelled data they can trust.",
 introList: [
 "Tested transformations every column, every join, every model",
 "Source connectors maintained and versioned by us",
 "Lineage and freshness monitoring from day one",
 "You own the warehouse, the repos, and the documentation",
 ],
 capabilitiesBadge: "What's Included",
 capabilitiesTitle: "Everything You Need to",
 capabilitiesGradient: "Move Data Reliably",
 capabilitiesSubtitle: "From source connector to analytics-ready table handled.",
 capabilities: [
 {
 id: "sources-sync",
 icon: "fa-solid fa-database",
 title: "Source Connectors & Sync",
 desc: "Hundreds of pre-built connectors, configured for your sources and updated as APIs change.",
 points: [
 "Fivetran / Airbyte connector setup",
 "Custom source connectors when needed",
 "Incremental and historical backfills",
 "Schema drift detection",
 ],
 },
 {
 id: "transformations",
 icon: "fa-solid fa-gears",
 title: "dbt Transformations",
 desc: "Modelled, tested, documented data the backbone of every good report.",
 points: [
 "Staging, intermediate, and mart models",
 "Generic and snapshot tests on every column",
 "Auto-generated docs + lineage graphs",
 "CI/CD for dbt via GitHub Actions",
 ],
 },
 {
 id: "orchestration",
 icon: "fa-solid fa-arrows-rotate",
 title: "Orchestration & Scheduling",
 desc: "Pipelines that run on schedule, recover from failure, and alert when something's off.",
 points: [
 "Airflow, Dagster, or Prefect setup",
 "Backfills and reruns made safe",
 "Slack / email alerts on failure",
 "Cost-aware scheduling",
 ],
 },
 {
 id: "monitoring",
 icon: "fa-solid fa-chart-line",
 title: "Observability & Lineage",
 desc: "You'll know the moment a number looks wrong before your CEO does.",
 points: [
 "Freshness and volume monitors",
 "dbt-aware lineage visualisation",
 "Source-of-truth reconciliation",
 "Weekly data-quality digest",
 ],
 },
 ],
 processBadge: "How We Work",
 processTitle: "Your First 30 Days",
 processGradient: "With Us",
 processSubtitle: "Clear milestones, working software every week.",
 process: [
 { n: "01", title: "Source Inventory & Plan", desc: "We audit every system holding data you care about and we agree on a target architecture and roadmap." },
 { n: "02", title: "Foundation Sprint", desc: "We stand up the warehouse, core connectors, and a thin dbt project wired end-to-end before any heavy modelling." },
 { n: "03", title: "Model & Test", desc: "We build the staging and mart models against your real KPIs, with tests on every assumption." },
 { n: "04", title: "Hand-Off & Operate", desc: "We hand over with docs, runbooks, and alert routing then stay on for ongoing support or hand fully to your team." },
 ],
 benefitsBadge: "Why GrowMos",
 benefitsTitle: "Pipeline Engineers,",
 benefitsGradient: "Not Tool Resellers",
 benefitsSubtitle: "We design for your data, not the other way around.",
 benefits: [
 { icon: "fa-solid fa-shield-halved", title: "Production-Grade by Default", desc: "Every pipeline ships with tests, monitoring, and a runbook. No 'works on my machine' handoff." },
 { icon: "fa-solid fa-eye", title: "Observability You Can See", desc: "Freshness and lineage dashboards your whole team can read not a black box even your data team is afraid to touch." },
 { icon: "fa-solid fa-handshake-angle", title: "Tool-Agnostic", desc: "Fivetran today, Airbyte tomorrow if it suits you better. We pick the right tool, not the one we resell." },
 { icon: "fa-solid fa-clock", title: "Time-to-Insight, Not Time-to-BI", desc: "Our benchmarks: 4 weeks from kickoff to first trustworthy dashboard. Most teams take quarters to get here." },
 ],
 faqs: [
 { q: "Which ingestion tool is right for us Fivetran or Airbyte?", a: "It depends on your source mix, budget, and how much engineering you have in-house. For managed scale, Fivetran is hard to beat. For cost-sensitive, custom, or open-source-first setups, Airbyte is excellent. We help you pick not the other way around." },
 { q: "Do I need a separate transformation layer if I already have SQL views in the warehouse?", a: "Most teams we work with already do and that's a great starting point. dbt gives you version control, tests, and documentation on top of those views. We usually migrate what's working and rebuild what isn't." },
 { q: "How do you handle schema changes from upstream tools?", a: "We treat schema drift as a first-class concern. dbt tests catch most of it, monitoring catches the rest, and we have a documented process for breaking changes so nothing silently corrupts downstream models." },
 { q: "Can you work alongside our existing data team?", a: "Yes. Most engagements are team-augmentation: we ship the foundation and the harder models, your team owns the day-to-day. We're transparent about handoff and happy to pair." },
 ],
 ctaTitle: "Ready for pipelines you",
 ctaGradient: "trust?",
 ctaText:
 "Book a 30-minute discovery call. We'll review your source list, current pain, and goals and tell you honestly whether and how we can help.",
};

export default function DataPipelinePage() {
 return <ServicePage {...data} />;
}
