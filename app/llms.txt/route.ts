// Short, curated machine-readable summary for LLM crawlers
// (Google AI Overviews, ChatGPT, Perplexity, Claude web, etc.).
// See: https://llmstxt.org/ spec (Answer.AI / Jeremy Howard).

export const dynamic = "force-static";

const body = `# GrowMos

> Data engineering, BI dashboards, and cloud data warehouses for ambitious B2B teams. We design, build, and run the data platform behind faster decisions and measurable growth — from ingestion (Fivetran, Airbyte) through transformation (dbt) to warehouse (BigQuery, Microsoft Fabric, Snowflake) and BI (Power BI, Metabase).

## Core Data Services

- [Data Pipeline Engineering](https://www.growmos.com/data-pipeline-engineering): Production Fivetran, Airbyte and dbt pipelines with 99.5% uptime — tested, documented, and observed end-to-end.
- [Cloud Data Warehousing](https://www.growmos.com/cloud-data-warehousing): BigQuery, Microsoft Fabric and Snowflake architecture, migration, and cost optimisation for B2B scale.
- [BI & Dashboard Development](https://www.growmos.com/bi-dashboards): Executive-grade Power BI and Metabase dashboards tied to KPIs your team actually uses. First dashboard in 4 weeks.
- [BI Reporting & AI](https://www.growmos.com/bi-reporting-ai): AI-assisted reporting and natural-language Q&A on top of your warehouse.
- [CRM Data Integration](https://www.growmos.com/crm-data-integration): Unify Salesforce, HubSpot and ad platforms into a single source of truth — multi-touch attribution and customer-360 analytics.
- [Reverse ETL Activation](https://www.growmos.com/reverse-etl-activation): Push warehouse data into Salesforce, HubSpot and ad platforms with Hightouch and Census. Activate segments in minutes.

## Growth & Engineering Services

- [Custom Software Development](https://www.growmos.com/custom-software-development): Internal tools, dashboards, and data apps built for B2B teams. Senior engineers from day one.
- [Google Ads Management](https://www.growmos.com/google-ads): Google Ads campaign management tied to your CRM and warehouse.
- [Meta Ads Management](https://www.growmos.com/meta-ads): Facebook and Instagram ads with closed-loop attribution.
- [Social Media Management](https://www.growmos.com/social-media-management): Organic social content, calendar, and analytics.
- [AI Video Editing](https://www.growmos.com/ai-video-editing): AI-assisted video editing for ads and organic content.

## Integrations

- [Salesforce Integration](https://www.growmos.com/integrations/salesforce): Sync Salesforce into your warehouse with full attribution.
- [HubSpot Integration](https://www.growmos.com/integrations/hubspot): HubSpot contacts, deals, and engagement synced with multi-touch attribution.

## Resources

- [Blog](https://www.growmos.com/blog): Data engineering, BI, and analytics insights from the GrowMos team.
- [About GrowMos](https://www.growmos.com/about): The team behind every GrowMos engagement.
- [Contact](https://www.growmos.com/contact): Get in touch — book a 30-minute call.

## About

GrowMos is a B2B data team founded in 2022. We work with SaaS, e-commerce, EdTech, and retail companies that have outgrown spreadsheets but don't yet want to staff a full in-house data team. Typical engagements start with a 1-week fixed-fee discovery sprint, then a 4–12 week build, then optional retainer for ongoing monitoring and optimisation.

## Contact

- Email: hello@growmos.com
- WhatsApp: https://wa.me/15551234567
- Book a call: https://calendly.com/hello-growmos/30min
`;

export function GET() {
  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}