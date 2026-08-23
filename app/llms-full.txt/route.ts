// Long-form machine-readable content for LLM crawlers.
// This is the verbose companion to /llms.txt and includes the full
// description prose for each service, FAQs, methodology, and tech stack.

export const dynamic = "force-static";

const body = `# GrowMos (Long-Form Reference)

> GrowMos is a B2B data engineering and business intelligence services firm founded in 2022. We design, build, and run the data platform behind faster decisions and measurable growth — from ingestion through transformation to warehouse and BI. Our core stack: Fivetran, Airbyte, dbt, BigQuery, Microsoft Fabric, Snowflake, Power BI, and Metabase. We work with SaaS, e-commerce, EdTech, and retail companies that have outgrown spreadsheets but don't yet want to staff a full in-house data team.

## Who We Are

GrowMos was founded in 2022 with one belief: data work should ship, stay shipped, and pay for itself within a quarter. We're senior engineers and strategists — not junior analysts behind dashboards. Every engagement starts with a fixed-fee discovery sprint, then a written blueprint, then a build phase with weekly demos, then optional retainer for monitoring, alerting, and quarterly roadmap reviews.

We are best-fit for:

- B2B SaaS companies between Series A and Series D
- E-commerce brands doing $5M–$100M ARR
- EdTech and retail companies with multi-channel customer journeys
- Marketing teams that need unified paid-media + CRM attribution

We're not the best fit if:

- You need a junior resource for one-off Excel cleanup
- You want a black-box "AI agent" with no humans in the loop
- You have zero data and zero operational maturity yet

## Core Data Services

### Data Pipeline Engineering

URL: https://www.growmos.com/data-pipeline-engineering

Most data projects don't fail because of the warehouse or the BI tool — they fail because the pipes underneath are fragile. We build production-grade ingestion and transformation pipelines using Fivetran, Airbyte, and dbt — engineered for observability, testability, and zero-surprise delivery.

Outcomes: 99.5%+ pipeline uptime, −70% manual data cleanup, < 2 hours fresh data in the warehouse.

Includes:

- Source Connectors & Sync — Fivetran/Airbyte managed connectors, custom API & webhook ingestion, CDC replication.
- dbt Project Setup — staging → intermediate → marts architecture, tests, documentation, CI/CD.
- Schema Management — automatic schema drift detection, version control, lineage.
- Observability — freshness checks, row-count anomalies, alerting via Slack/email.

### Cloud Data Warehousing

URL: https://www.growmos.com/cloud-data-warehousing

Modern warehouses designed for B2B scale — without the bloat. We architect, migrate, and optimise data warehouses on BigQuery, Microsoft Fabric, and Snowflake.

Includes:

- BigQuery setup, slot reservation, partition/cluster strategy, cost control
- Microsoft Fabric / Synapse implementation with OneLake
- Snowflake warehouse sizing, virtual warehouses, query acceleration
- Security, RBAC, column-level masking, audit logging

### BI & Dashboard Development

URL: https://www.growmos.com/bi-dashboards

Executive-grade dashboards that turn your warehouse into decisions. Power BI and Metabase — built around KPIs your team actually uses.

Includes:

- Power BI development — DAX measures, row-level security, deployment pipelines
- Metabase setup — collections, permissions, embedded analytics
- Self-serve analytics enablement — metric catalog, certified datasets
- KPI definition and metric governance — single source of truth across teams

### BI Reporting & AI

URL: https://www.growmos.com/bi-reporting-ai

AI-assisted BI reporting and natural-language Q&A on top of your warehouse. We pair traditional dashboards with LLM-powered insight generation, anomaly explanations, and narrative summaries for executive reports.

### CRM Data Integration

URL: https://www.growmos.com/crm-data-integration

Unify Salesforce, HubSpot, and ad platforms into a single source of truth. Multi-touch attribution modelling, customer 360, and lifecycle analytics.

Includes:

- Salesforce & HubSpot data extraction (objects, history, custom fields)
- Multi-touch attribution modelling — first-touch, last-touch, time-decay, position-based, data-driven
- Customer 360 — unified contact, account, opportunity, and product-usage views
- Paid-media + CRM unified reporting — spend → pipeline → revenue

### Reverse ETL Activation

URL: https://www.growmos.com/reverse-etl-activation

Push warehouse data back into the operational tools your revenue team lives in. Hightouch and Census implementations that activate segments and audiences in minutes, not days.

## Growth & Engineering Services

### Custom Software Development

URL: https://www.growmos.com/custom-software-development

Internal tools, dashboards, and data apps built for B2B. Senior engineers from day one — full-stack TypeScript, Next.js, Python/FastAPI, Postgres.

### Google Ads Management

URL: https://www.growmos.com/google-ads

Google Ads campaigns tied to your CRM and warehouse — closed-loop attribution, conversion tracking, audience sync.

### Meta Ads Management

URL: https://www.growmos.com/meta-ads

Facebook and Instagram ads with closed-loop attribution back to your CRM and warehouse.

### Social Media Management

URL: https://www.growmos.com/social-media-management

Organic social content, calendar, and analytics — LinkedIn, Twitter/X, Instagram, TikTok.

### AI Video Editing

URL: https://www.growmos.com/ai-video-editing

AI-assisted video editing for ads and organic content — script generation, B-roll sourcing, captions, and platform-native variants.

## Integrations

### Salesforce

URL: https://www.growmos.com/integrations/salesforce

Sync Salesforce contacts, accounts, opportunities, and custom objects into your warehouse. Full lineage, multi-touch attribution, and lead-scoring.

### HubSpot

URL: https://www.growmos.com/integrations/hubspot

Sync HubSpot contacts, deals, and engagement into your warehouse. Multi-touch attribution, lifecycle analytics, and lead scoring.

## Methodology

Our engagements follow a 5-phase methodology:

1. **Discovery & Data Audit** (1 week, fixed-fee) — current state, gaps, and a 90-day plan.
2. **Architecture & Roadmap** — locked blueprint covering sources, stack, KPIs, and success metrics.
3. **Build & Migrate** — working dashboards in sprints, weekly demos. First dashboard in 2–3 weeks, full rollout in 6–12 weeks.
4. **Validate & Launch** — tested pipelines, validated metrics, full documentation, team training.
5. **Monitor & Optimise** (retainer) — 24/7 monitoring, alerting, monthly reports, quarterly reviews.

## Tech Stack

Ingestion: Fivetran, Airbyte, Stitch, custom Python workers.
Transformation: dbt (Cloud and Core), Dataform.
Warehouses: BigQuery, Snowflake, Microsoft Fabric, Databricks, Postgres.
BI & Analytics: Power BI, Metabase, Looker, Tableau.
CRM & Ads: Salesforce, HubSpot, Google Ads, Meta Ads, LinkedIn Ads.
Reverse ETL: Hightouch, Census.
Languages: SQL, Python, TypeScript, dbt Jinja.

## Frequently Asked Questions

Q: What does GrowMos actually do?
A: We design, build, and maintain modern data platforms for B2B companies — from ingestion (Fivetran, Airbyte) through transformation (dbt) to warehouse (BigQuery, Microsoft Fabric, Snowflake) and dashboards (Power BI, Metabase). We also integrate CRM and ad data, and surface insights through BI and AI.

Q: Who do you typically work with?
A: Founders, decision-makers, and marketing leaders at SaaS, E-commerce, EdTech, and Retail companies — usually teams that have outgrown spreadsheets but don't want to staff a full in-house data team yet.

Q: Which tools do you work with?
A: Our core stack is Fivetran / Airbyte for ingestion, dbt for transformation, BigQuery / Microsoft Fabric / Snowflake for the warehouse, and Power BI / Metabase for dashboards. We also build custom integrations with Salesforce, HubSpot, Shopify, and ad platforms.

Q: How is a data engagement structured?
A: Most engagements start with a discovery sprint (2–3 weeks) to map your sources, define KPIs, and design the warehouse. Then we build the pipeline in 4–8 weeks, hand off with documentation, and offer ongoing support. Detailed scope is set in a written proposal.

Q: Do you take equity?
A: Occasionally, in lieu of part of cash fee, for early-stage companies we believe in. Not the default — most engagements are fee-for-service.

Q: What's your typical team size?
A: Senior pod of 2–4 specialists per engagement: lead data engineer, dbt/analytics engineer, BI developer, plus a delivery lead.

## Contact

- Email: hello@growmos.com
- WhatsApp: https://wa.me/15551234567
- Book a call: https://calendly.com/hello-growmos/30min
- Contact page: https://www.growmos.com/contact
- Blog: https://www.growmos.com/blog
- About: https://www.growmos.com/about
- Privacy Policy: https://www.growmos.com/privacy-policy
- Terms of Service: https://www.growmos.com/terms-of-service
`;

export function GET() {
  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}