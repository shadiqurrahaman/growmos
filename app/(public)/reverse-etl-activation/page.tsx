import type { Metadata } from "next";
import ServicePage, { type ServicePageData } from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Reverse ETL & Activation — Hightouch, Census & Warehouse-to-Business",
  description:
    "Send warehouse insights back to the tools your team uses — sales, marketing, support, and product. Hightouch, Census, and custom Activation.",
};

const data: ServicePageData = {
  accent: "#ec4899",
  badge: "Reverse ETL & Activation",
  titleTop: "Don't Just Have Data.",
  titleGradient: "Activate It",
  description:
    "Most companies spend years building a beautiful warehouse — and then their sales team still uses stale CRM data. We close the loop with Reverse ETL: syncing warehouse insights back into the tools your team lives in, so every interaction is informed by your best data.",
  stats: [
    { value: "12+", label: "Destinations supported" },
    { value: "Live", label: "Not nightly — live sync" },
    { value: "100%", label: "Owned by your team" },
  ],
  introHeading: "From warehouse to",
  introGradient: "where work happens.",
  introText:
    "Reverse ETL is the missing last mile of the modern data stack. We set up Hightouch or Census (or build custom syncs) so that your warehouse insights — modelled audiences, churn-risk scores, customer health — show up directly in Salesforce, HubSpot, Marketo, Zendesk, and your product. No exports. No CSVs. No staleness.",
  introList: [
    "Pick the right Reverse ETL partner for your stack",
    "Modelled audiences and scores from your warehouse",
    "Live sync to the tools your team actually uses",
    "Closed-loop reporting back into the warehouse",
  ],
  capabilitiesBadge: "What's Included",
  capabilitiesTitle: "Activation, Audiences,",
  capabilitiesGradient: "And Closed Loops",
  capabilitiesSubtitle: "Make your warehouse do something — not just sit there.",
  capabilities: [
    {
      id: "hightouch-census",
      icon: "fa-solid fa-arrows-right-left",
      title: "Hightouch / Census Setup",
      desc: "We pick the right Reverse ETL partner, model the source models, and configure the destinations.",
      points: [
        "Source model design",
        "Destination mapping",
        "Sync scheduling and monitoring",
        "Identity resolution across systems",
      ],
    },
    {
      id: "audiences",
      icon: "fa-solid fa-people-group",
      title: "Modelled Audiences",
      desc: "Behavioural and lifecycle audiences built in your warehouse — pushed to ad platforms and CRM in real time.",
      points: [
        "Lifecycle stage audiences",
        "Churn / expansion audiences",
        "High-value lookalikes",
        "Suppression lists for clean targeting",
      ],
    },
    {
      id: "sales-enablement",
      icon: "fa-solid fa-handshake",
      title: "Sales & Support Enablement",
      desc: "Push scores, alerts, and next-best-action into the tools your sales and support teams use daily.",
      points: [
        "Account health in Salesforce",
        "Churn risk alerts in Zendesk",
        "Lead scoring in HubSpot",
        "Task automation from warehouse events",
      ],
    },
    {
      id: "closed-loop",
      icon: "fa-solid fa-arrows-rotate",
      title: "Closed-Loop Reporting",
      desc: "Track what happens after activation — every event flows back into the warehouse for attribution.",
      points: [
        "Event capture from destinations",
        "Attribution back to source campaigns",
        "Incrementality testing framework",
        "Quarterly activation reviews",
      ],
    },
  ],
  processBadge: "How We Work",
  processTitle: "From Static BI to",
  processGradient: "Active Data",
  processSubtitle: "Most engagements ship value within 4 weeks.",
  process: [
    { n: "01", title: "Use-Case Mapping", desc: "We identify the 2–3 highest-value use cases first — leads, churn, expansion, lifecycle — that justify Reverse ETL." },
    { n: "02", title: "Source Model Build", desc: "We model the audiences and scores in your warehouse, with tests, lineage, and ownership." },
    { n: "03", title: "Sync & Activate", desc: "We wire up the Reverse ETL partner, configure destinations, and ship the first live syncs." },
    { n: "04", title: "Measure & Iterate", desc: "We track the impact on pipeline, conversion, and retention — and refine the models each quarter." },
  ],
  benefitsBadge: "Why GrowMos",
  benefitsTitle: "More Than a Reverse ETL",
  benefitsGradient: "Setup",
  benefitsSubtitle: "We design the model, the sync, and the measurement.",
  benefits: [
    { icon: "fa-solid fa-bullseye", title: "Use-Case First", desc: "We don't set up Reverse ETL for the sake of it — we map the 2–3 highest-value use cases and ship them first." },
    { icon: "fa-solid fa-shield-halved", title: "Identity Done Right", desc: "Identity stitching across systems is the hardest part of Reverse ETL. We design it once, test it, and keep it accurate." },
    { icon: "fa-solid fa-people-group", title: "Team Buy-In", desc: "We co-design with the sales / marketing teams who'll use the activated data — so adoption isn't a future problem." },
    { icon: "fa-solid fa-clock-rotate-left", title: "Closed-Loop Reporting", desc: "Every activation event flows back into your warehouse, so you can prove what changed attributable to data." },
  ],
  faqs: [
    { q: "Hightouch or Census — which is right for us?", a: "Hightough has a deeper destination catalog and enterprise features. Census is more developer-friendly and has a tighter open-source ethos. Both are excellent. We pick based on your stack, team skills, and budget." },
    { q: "Do I need Reverse ETL if I already have a CDP?", a: "Often yes — Reverse ETL is different in that it pulls from your warehouse (your source of truth), not a black-box CDP. It's also dramatically cheaper and more flexible. We can usually replace a CDP with warehouse + Reverse ETL in weeks." },
    { q: "What if my team already uses Zapier for this?", a: "Zapier is great for one-off workflows but it doesn't scale, it doesn't model events, and it doesn't have lineage. Reverse ETL is the right answer when you need reliability, observability, and a centralised model." },
    { q: "How do you measure success?", a: "We define it up front. Typical metrics: lift in MQL → SQL conversion, reduction in churn, time saved on reporting, and ad-spend efficiency. We tie all of it back to the warehouse so you can see the impact quarter over quarter." },
  ],
  ctaTitle: "Activate the data you",
  ctaGradient: "already have.",
  ctaText:
    "Book a 30-minute discovery call. We'll review your current warehouse, downstream tools, and goals — and show you what Reverse ETL looks like in 4 weeks.",
};

export default function ReverseEtlPage() {
  return <ServicePage {...data} />;
}
