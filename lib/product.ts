export type ProductFeature = {
  icon: string;
  title: string;
  desc: string;
  href: string;
};

// The 6 capabilities that make up the GrowMos platform. Each feature links
// to the corresponding service page so the section does double duty:
// outlines the product and routes visitors into the relevant service.
export const productFeatures: ProductFeature[] = [
 {
  icon: "fa-solid fa-plug",
  title: "Connectors",
  desc:
  "Fivetran, Airbyte, and custom sources wired in one place. CDC, webhooks, APIs.",
  href: "/data-pipeline-engineering",
 },
 {
  icon: "fa-solid fa-cube",
  title: "Warehouse",
  desc:
  "BigQuery, Snowflake, Microsoft Fabric, or Postgres. We pick the right engine for your data.",
  href: "/cloud-data-warehousing",
 },
 {
  icon: "fa-solid fa-gears",
  title: "Transformations",
  desc:
  "dbt models. Version-controlled, tested, and documented. The back-end of every good report.",
  href: "/bi-reporting-ai",
 },
 {
  icon: "fa-solid fa-chart-line",
  title: "Dashboards",
  desc:
  "Power BI or Metabase. One source of truth, not five. Trusted by finance and growth.",
  href: "/bi-dashboards",
 },
 {
  icon: "fa-solid fa-share-nodes",
  title: "Reverse ETL",
  desc:
  "Push insights back into HubSpot, Salesforce, Meta, and Google. Sales sees the same numbers.",
  href: "/reverse-etl-activation",
 },
 {
  icon: "fa-solid fa-heart-pulse",
  title: "Monitoring",
  desc:
  "Pipeline health, cost alerts, schema drift. Caught before your team notices.",
  href: "/data-pipeline-engineering",
 },
];