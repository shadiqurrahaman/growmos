import type { Metadata } from "next";
import IndustryPage, { type IndustryPageData } from "@/components/IndustryPage";

export const metadata: Metadata = {
  title: "Data Solutions for EdTech | GrowMos",
  description:
    "Learner analytics, dashboarding, and engagement data pipelines for EdTech companies. From LMS to attribution to retention.",
};

const data: IndustryPageData = {
  accent: "#f59e0b",
  badge: "For EdTech",
  titleTop: "Data That Drives",
  titleGradient: "Learner Outcomes",
  description:
    "EdTech companies sit on a goldmine of behavioural data — engagement, completion, retention — but most of it lives in an LMS, a few spreadsheets, and a content analytics tool. We bring it all into a single platform so product, marketing, and ops can make decisions that actually move learning outcomes.",
  stats: [
    { value: "3×", label: "Faster product insight cycles" },
    { value: "20%", label: "Avg. retention lift in 6 months" },
    { value: "100%", label: "Privacy-aware pipelines" },
  ],
  challengesBadge: "The EdTech Reality",
  challengesTitle: "Why EdTech",
  challengesGradient: "Data Is Hard",
  challengesSubtitle: "Three problems unique to the learning business.",
  challenges: [
    {
      icon: "fa-solid fa-graduation-cap",
      title: "Engagement ≠ Outcome",
      desc: "Completion rates are vanity. You need to know whether engagement actually leads to outcomes — and that requires joining LMS, billing, and survey data.",
    },
    {
      icon: "fa-solid fa-shield-halved",
      title: "Privacy & Compliance",
      desc: "Children's data, regional residency, and consent management — EdTech has constraints other industries don't. Your warehouse needs to be designed with this in mind.",
    },
    {
      icon: "fa-solid fa-bullseye",
      title: "Acquisition vs. Retention",
      desc: "Free-to-paid conversion, parent vs. learner attribution, school vs. consumer funnels — most EdTech teams can't tell which channel actually drives a paying learner.",
    },
  ],
  solutionsBadge: "What We Build",
  solutionsTitle: "An EdTech Data Platform",
  solutionsGradient: "Built for Learning",
  solutionsSubtitle: "From LMS to attribution — designed for the way EdTech actually works.",
  solutions: [
    {
      icon: "fa-solid fa-chart-line",
      title: "Learner Engagement Analytics",
      desc: "Cohort-based engagement, completion curves, and outcome models — queryable in your warehouse, surfaced in dashboards.",
      href: "/bi-dashboards",
    },
    {
      icon: "fa-solid fa-shield-halved",
      title: "Privacy-First Architecture",
      desc: "Consent-aware data models, region-pinned storage, and PII handling built for COPPA / GDPR-K / FERPA constraints.",
      href: "/cloud-data-warehousing",
    },
    {
      icon: "fa-solid fa-arrows-split-up-and-left",
      title: "Multi-Channel Attribution",
      desc: "School, parent, organic, paid, and referral — connected to actual paid enrolment, not just MQLs.",
      href: "/crm-data-integration",
    },
    {
      icon: "fa-solid fa-bullhorn",
      title: "Lifecycle & Retention",
      desc: "Push churn-risk and re-engagement audiences back into your CRM and email tools — close the loop on retention.",
      href: "/reverse-etl-activation",
    },
  ],
  processBadge: "How We Engage",
  processTitle: "EdTech Engagement,",
  processGradient: "Week by Week",
  processSubtitle: "From LMS chaos to insights your team trusts.",
  process: [
    { n: "01", title: "Source & Privacy Review", desc: "We audit your LMS, billing, ad platforms, and consent tooling — and design the privacy posture for the warehouse." },
    { n: "02", title: "Pipeline Build", desc: "We sync LMS events, billing, CRM, and ad platforms into a privacy-aware warehouse model with tests and lineage." },
    { n: "03", title: "Cohort & Outcome Models", desc: "We model engagement, completion, and outcome cohorts — and the attribution chains that connect them to paid revenue." },
    { n: "04", title: "Activation & Reporting", desc: "We push churn-risk and re-engagement audiences back into CRM and email, and ship the dashboards your team needs." },
  ],
  faqs: [
    { q: "How do you handle children's data (COPPA / GDPR-K)?", a: "Privacy-by-design, not as an afterthought. We design the warehouse to segregate minors' data, apply consent rules at the model layer, and use region-pinned storage where the law requires. We sign a DPA before any data moves." },
    { q: "Can you work with our existing LMS analytics?", a: "Yes — most EdTech teams use a mix of Moodle / Canvas / proprietary + Mixpanel / Amplitude. We sync into the warehouse, join with billing, and use the LMS' analytics for fast iteration while the warehouse is the source of truth." },
    { q: "What about B2B / school contracts vs. B2C / parent-paid?", a: "We model both funnels in the warehouse, with separate KPIs for B2B (ARR, school count, expansion) and B2C (parent LTV, learner retention). Same data, different lenses — and clean attribution across both." },
    { q: "How do you measure learner outcomes?", a: "Outcome data usually comes from assessment tools, surveys, or LMS grades. We sync these into the warehouse and model the correlation between engagement and outcome — so product can iterate on what actually drives learning." },
  ],
  ctaTitle: "Build the data platform",
  ctaGradient: "your learners deserve.",
  ctaText:
    "Book a free discovery call. We'll review your LMS, your acquisition funnel, and your privacy posture — and show you what a privacy-aware EdTech data platform looks like in 4–6 weeks.",
};

export default function EdtechPage() {
  return <IndustryPage {...data} />;
}