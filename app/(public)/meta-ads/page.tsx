import type { Metadata } from "next";
import ServicePage, { type ServicePageData } from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "AI-Driven Meta Ads (Facebook & Instagram)",
  description:
    "Facebook and Instagram ads that find your buyers and turn ad spend into revenue. Audience research, Pixel & Conversions API, funnels, and hands-on account management.",
};

const data: ServicePageData = {
  accent: "#1877f2",
  badge: "AI Meta Ads",
  titleTop: "Ads That Actually",
  titleGradient: "Find Your Buyers",
  description:
    "Boosting a post and hoping for the best isn't a strategy. We build Facebook and Instagram campaigns that put your offer in front of the people most likely to buy — and we keep tuning them until the numbers make sense.",
  stats: [
    { value: "3.4x", label: "Avg. return on ad spend" },
    { value: "-41%", label: "Lower cost per lead" },
    { value: "24/7", label: "Campaign monitoring" },
  ],
  introHeading: "Stop guessing.",
  introGradient: "Start scaling.",
  introText:
    "Most businesses waste money on Meta because they show the right ad to the wrong people — or the wrong ad to the right people. We fix both. Using AI-assisted audience modeling and a tested funnel structure, we make every dollar work harder, then scale what's working without losing your margins.",
  introList: [
    "No long lock-in contracts — we earn the next month",
    "Clear weekly reporting in plain English, not jargon",
    "Creative testing so your ads never go stale",
    "You own your ad account, Pixel, and all the data",
  ],
  capabilitiesBadge: "What's Included",
  capabilitiesTitle: "Everything You Need to",
  capabilitiesGradient: "Win on Meta",
  capabilitiesSubtitle: "From the first audience to the final optimization — handled.",
  capabilities: [
    {
      id: "audience-research",
      icon: "fa-solid fa-bullseye",
      title: "Audience Research & Targeting",
      desc: "We find the exact people worth reaching — not a broad guess. Lookalikes, interests, and behaviors built from your real customer data.",
      points: [
        "Customer & competitor analysis",
        "Lookalike & custom audiences",
        "Retargeting that re-engages warm buyers",
        "Continuous audience refinement",
      ],
    },
    {
      id: "pixel-setup",
      icon: "fa-solid fa-satellite-dish",
      title: "Meta Pixel & Conversions API",
      desc: "If your tracking is broken, your ads are flying blind. We set up accurate, privacy-safe tracking so Meta's AI optimizes toward real sales.",
      points: [
        "Pixel & Conversions API (CAPI) setup",
        "Server-side event tracking",
        "iOS & privacy-update proofing",
        "Accurate conversion attribution",
      ],
    },
    {
      id: "campaign-strategy",
      icon: "fa-solid fa-diagram-project",
      title: "Campaign Strategy & Funnels",
      desc: "Cold traffic rarely buys on the first click. We build a journey — from first impression to checkout — that warms people up and closes them.",
      points: [
        "Full-funnel campaign architecture",
        "Offer & creative angle testing",
        "Scroll-stopping ad copy & hooks",
        "Scaling plans that protect margins",
      ],
    },
    {
      id: "account-management",
      icon: "fa-solid fa-sliders",
      title: "Hands-On Account Management",
      desc: "Ads aren't 'set and forget.' We watch your account daily, cut what's losing, and double down on what's winning.",
      points: [
        "Daily monitoring & optimization",
        "Budget pacing & bid management",
        "Weekly performance reports",
        "A dedicated point of contact",
      ],
    },
  ],
  processBadge: "How We Work",
  processTitle: "Your First 30 Days",
  processGradient: "With Us",
  processSubtitle: "Clear steps, no mystery. Here's exactly what happens.",
  process: [
    { n: "01", title: "Audit & Strategy", desc: "We dig into your account, offers, and past results, then map a campaign plan built around your goals." },
    { n: "02", title: "Build & Track", desc: "We set up clean tracking, audiences, and campaigns — and write creative designed to stop the scroll." },
    { n: "03", title: "Launch & Test", desc: "We go live with controlled tests to find your winning audiences and angles before scaling spend." },
    { n: "04", title: "Scale & Report", desc: "We pour budget into what works, trim what doesn't, and keep you in the loop every single week." },
  ],
  benefitsBadge: "Why GrowMos",
  benefitsTitle: "More Than an",
  benefitsGradient: "Agency",
  benefitsSubtitle: "We treat your ad budget like it's our own money.",
  benefits: [
    { icon: "fa-solid fa-chart-line", title: "We Optimize for Revenue", desc: "Likes and reach are nice. Sales pay the bills. Every decision we make is judged against your bottom line." },
    { icon: "fa-solid fa-eye", title: "Full Transparency", desc: "You see exactly where your money goes, what it earns, and what we're changing — no smoke and mirrors." },
    { icon: "fa-solid fa-wand-magic-sparkles", title: "AI + Human Judgment", desc: "We use AI to move fast on data, but a real strategist makes the calls that protect your brand and margins." },
    { icon: "fa-solid fa-handshake-angle", title: "No Lock-In Contracts", desc: "We keep your business by getting results, not by trapping you in a 12-month agreement." },
  ],
  faqs: [
    { q: "How much should I budget for ad spend?", a: "It depends on your goals and margins, but most clients start between $1,500–$5,000/month in ad spend (separate from our management fee). On our first call we'll give you an honest recommendation — even if that means waiting until you're ready." },
    { q: "How soon will I see results?", a: "You'll usually see early signal within the first 2–3 weeks as we test. Reliable, scalable performance typically settles in around the 60–90 day mark once the data and creative mature." },
    { q: "Do I need to hand over my Facebook account?", a: "No. You keep full ownership of your ad account, Pixel, and Business Manager. We simply request partner access, so everything stays yours if we ever part ways." },
    { q: "Who creates the ad creative?", a: "We handle the strategy, copy, and direction. We can work with your existing visuals or produce fresh creative — including AI-generated and UGC-style content through our video team." },
  ],
  ctaTitle: "Ready to make Meta",
  ctaGradient: "profitable?",
  ctaText:
    "Book a free, no-pressure strategy call. We'll review your current ads (or your goals if you're just starting) and show you exactly where the opportunity is.",
};

export default function MetaAdsPage() {
  return <ServicePage {...data} />;
}
