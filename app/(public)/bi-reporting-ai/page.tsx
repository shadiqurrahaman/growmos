import type { Metadata } from "next";
import ServicePage, { type ServicePageData } from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Web Analytics & Business Intelligence",
  description:
    "GA4, Google Tag Manager, custom event tracking, funnel analysis, and clear dashboards. Turn messy data into decisions you can actually act on.",
};

const data: ServicePageData = {
  accent: "#7c5cf0",
  badge: "Web Analytics & BI",
  titleTop: "Know Exactly What's",
  titleGradient: "Working",
  description:
    "Most businesses are sitting on a goldmine of data they can't read. We set up clean tracking and build dashboards that answer the only questions that matter: where are customers coming from, where are they dropping off, and what should you do next?",
  stats: [
    { value: "1", label: "Single source of truth" },
    { value: "100%", label: "Privacy-compliant tracking" },
    { value: "Real-time", label: "Dashboards you'll use" },
  ],
  introHeading: "Stop flying on",
  introGradient: "gut feeling.",
  introText:
    "Bad data is worse than no data — it leads to confident, expensive mistakes. We fix your tracking foundation first, then turn the numbers into clear, visual dashboards anyone on your team can understand. No more arguing about whose spreadsheet is right. Just one trustworthy view of your business.",
  introList: [
    "Accurate, privacy-compliant tracking (GDPR-ready)",
    "Dashboards in plain language, not data-speak",
    "One source of truth your whole team trusts",
    "Insights tied to actions, not just charts",
  ],
  capabilitiesBadge: "What's Included",
  capabilitiesTitle: "From Raw Data to",
  capabilitiesGradient: "Real Decisions",
  capabilitiesSubtitle: "The full pipeline — accurate tracking through to dashboards you'll actually open.",
  capabilities: [
    {
      id: "ga4-gtm",
      icon: "fa-solid fa-gauge",
      title: "GA4 & Google Tag Manager Setup",
      desc: "The foundation everything rests on. We configure GA4 and Tag Manager properly so the data you collect is actually trustworthy.",
      points: [
        "Clean GA4 property setup",
        "Tag Manager implementation",
        "Cross-domain & e-commerce tracking",
        "Migration from old Universal Analytics",
      ],
    },
    {
      id: "event-tracking",
      icon: "fa-solid fa-crosshairs",
      title: "Custom Event Tracking",
      desc: "Track what actually matters to your business — form submits, add-to-carts, calls, video plays — not just pageviews.",
      points: [
        "Form, click & call tracking",
        "E-commerce & purchase events",
        "Server-side & enhanced tracking",
        "Ad platform conversion sync",
      ],
    },
    {
      id: "funnel-analysis",
      icon: "fa-solid fa-filter",
      title: "Funnel Analysis",
      desc: "We map the path from first visit to purchase and pinpoint exactly where people drop off — so you can plug the leaks.",
      points: [
        "Full customer-journey mapping",
        "Drop-off & friction analysis",
        "Conversion-rate insights",
        "Clear recommendations to fix leaks",
      ],
    },
    {
      id: "dashboards",
      icon: "fa-solid fa-chart-column",
      title: "Dashboard Creation",
      desc: "Live, visual dashboards that pull everything into one screen — so you spend time deciding, not digging through reports.",
      points: [
        "Looker Studio & custom dashboards",
        "Marketing, sales & revenue views",
        "Automated, scheduled reports",
        "KPIs anyone on the team can read",
      ],
    },
  ],
  processBadge: "How We Work",
  processTitle: "Clarity in",
  processGradient: "Four Steps",
  processSubtitle: "We fix the foundation first, then build the view on top.",
  process: [
    { n: "01", title: "Audit", desc: "We check what you're currently tracking, find the gaps and errors, and define the metrics that actually matter to you." },
    { n: "02", title: "Implement", desc: "We set up clean, accurate, privacy-compliant tracking across your site and tools — done properly the first time." },
    { n: "03", title: "Visualize", desc: "We build dashboards that turn the numbers into a clear story your whole team can read at a glance." },
    { n: "04", title: "Advise", desc: "We don't just hand over charts. We walk you through what the data means and what to do about it." },
  ],
  benefitsBadge: "Why GrowMos",
  benefitsTitle: "Data You Can Finally",
  benefitsGradient: "Trust",
  benefitsSubtitle: "Numbers are only useful if they're right — and if you understand them.",
  benefits: [
    { icon: "fa-solid fa-check-double", title: "Accurate by Design", desc: "We obsess over getting the tracking right, because every decision you make downstream depends on it." },
    { icon: "fa-solid fa-lightbulb", title: "Insight, Not Just Data", desc: "We tell you what the numbers mean and what to do next — not just hand you a wall of charts." },
    { icon: "fa-solid fa-user-shield", title: "Privacy-First", desc: "Consent handling and GDPR-ready setups keep you compliant while still collecting the data you need." },
    { icon: "fa-solid fa-link", title: "Everything Connected", desc: "Ads, site, and sales data in one place, so you can finally see the full picture instead of disconnected pieces." },
  ],
  faqs: [
    { q: "My Google Analytics is a mess. Can you fix it?", a: "Yes — that's one of the most common things we do. We audit your current setup, clean up or rebuild it, and make sure the data you're collecting from now on is accurate and meaningful." },
    { q: "What's the difference between this and the reports in my ad account?", a: "Ad platforms only show their own slice and tend to over-claim credit. We give you a neutral, full-funnel view that ties ad spend to actual revenue across every channel — one honest source of truth." },
    { q: "Will this slow down my website?", a: "No. We implement tracking efficiently (often server-side) so it captures what you need without hurting your page speed or user experience." },
    { q: "Do I need technical skills to use the dashboards?", a: "Not at all. That's the whole point — we build them to be read at a glance by anyone on your team, and we walk you through how to use them." },
  ],
  ctaTitle: "Ready to actually",
  ctaGradient: "understand your data?",
  ctaText:
    "Book a free call. We'll take a quick look at your current tracking and show you what you're missing — and what it's quietly costing you.",
};

export default function BiReportingPage() {
  return <ServicePage {...data} />;
}
