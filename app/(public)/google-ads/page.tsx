import type { Metadata } from "next";
import ServicePage, { type ServicePageData } from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "AI-Driven Google Ads — Search, Shopping & PMax",
  description:
    "Capture buyers the moment they search. Google Search, Shopping, and Performance Max campaigns built to bring in high-intent customers, not wasted clicks.",
};

const data: ServicePageData = {
  accent: "#ea8600",
  badge: "AI Google Ads",
  titleTop: "Be the Answer",
  titleGradient: "When They Search",
  description:
    "When someone types exactly what you sell into Google, they're ready to buy. We make sure your business is the first thing they see — and that the click turns into a customer, not a wasted dollar.",
  stats: [
    { value: "68%", label: "Of buyers start on search" },
    { value: "5.2x", label: "Avg. return on ad spend" },
    { value: "-37%", label: "Wasted spend cut" },
  ],
  introHeading: "Reach people who are",
  introGradient: "already looking.",
  introText:
    "Unlike social ads that interrupt, Google Ads meet people in the exact moment they want what you offer. The catch? It's easy to burn cash on the wrong keywords and clumsy bidding. We tighten every part of the account — keywords, negatives, bids, and landing pages — so your budget chases buyers, not curious clickers.",
  introList: [
    "We cut wasted spend before we scale",
    "Negative keyword lists that block junk traffic",
    "Landing page advice that lifts conversions",
    "You keep full ownership of your account & data",
  ],
  capabilitiesBadge: "What's Included",
  capabilitiesTitle: "Full Coverage Across",
  capabilitiesGradient: "Google",
  capabilitiesSubtitle: "Search, Shopping, and AI-powered campaigns — managed end to end.",
  capabilities: [
    {
      id: "search-ads",
      icon: "fa-solid fa-magnifying-glass",
      title: "Search Ads Management",
      desc: "Show up exactly when someone searches for what you sell, with ads written to earn the click and the sale.",
      points: [
        "High-intent keyword targeting",
        "Compelling, tested ad copy",
        "Smart bidding & budget control",
        "Ongoing search-term cleanup",
      ],
    },
    {
      id: "shopping-ads",
      icon: "fa-solid fa-bag-shopping",
      title: "Shopping & Merchant Center",
      desc: "Put your products — with images, prices, and reviews — right at the top of search results for ready-to-buy shoppers.",
      points: [
        "Merchant Center setup & fixes",
        "Product feed optimization",
        "Shopping & Performance Max for retail",
        "Disapproval & policy troubleshooting",
      ],
    },
    {
      id: "keyword-research",
      icon: "fa-solid fa-binoculars",
      title: "Keyword & Competitor Research",
      desc: "We find the searches worth paying for and the gaps your competitors are missing — then build around them.",
      points: [
        "Buyer-intent keyword mapping",
        "Competitor ad & bid analysis",
        "Negative keyword strategy",
        "Search demand & seasonality insight",
      ],
    },
    {
      id: "pmax",
      icon: "fa-solid fa-layer-group",
      title: "Performance Max (PMax)",
      desc: "Google's AI campaign reaches buyers across Search, Shopping, YouTube, and more — but only if it's fed the right inputs. That's what we do.",
      points: [
        "Asset groups & audience signals",
        "Conversion-value optimization",
        "Channel performance insights",
        "Guardrails to control where ads run",
      ],
    },
  ],
  processBadge: "How We Work",
  processTitle: "From Click to",
  processGradient: "Customer",
  processSubtitle: "A clear, proven path to profitable search campaigns.",
  process: [
    { n: "01", title: "Account Audit", desc: "We review your account (or build it from scratch), spot leaks, and identify the highest-intent opportunities." },
    { n: "02", title: "Build & Track", desc: "We structure campaigns, set conversion tracking, and make sure every click is measured accurately." },
    { n: "03", title: "Refine Spend", desc: "We cut wasted keywords, sharpen bids, and steer budget toward the searches that actually convert." },
    { n: "04", title: "Scale & Report", desc: "We expand winning campaigns and send you clear reports on spend, leads, and return — every week." },
  ],
  benefitsBadge: "Why GrowMos",
  benefitsTitle: "Search Done",
  benefitsGradient: "Right",
  benefitsSubtitle: "We sweat the small details that quietly drain most ad budgets.",
  benefits: [
    { icon: "fa-solid fa-filter-circle-dollar", title: "Every Dollar Accountable", desc: "We track conversions properly, so you know which keywords make money and which just cost it." },
    { icon: "fa-solid fa-ban", title: "We Block Wasted Clicks", desc: "Aggressive negative-keyword management keeps your budget away from tire-kickers and bad searches." },
    { icon: "fa-solid fa-gauge-high", title: "Built for ROI, Not Vanity", desc: "Clicks and impressions don't pay you. We optimize for leads and sales that hit your bank account." },
    { icon: "fa-solid fa-comments", title: "Real Humans to Talk To", desc: "You get a dedicated specialist who knows your account — not a ticket queue and a chatbot." },
  ],
  faqs: [
    { q: "Is Google Ads better than Facebook Ads?", a: "They do different jobs. Google captures people actively searching for a solution (high intent), while Meta creates demand and builds awareness. Many of our clients run both — we'll tell you honestly where your budget will work hardest first." },
    { q: "How quickly can I expect leads?", a: "Search campaigns can start producing leads within days of launch because you're reaching people who are already looking. We then spend the first few weeks refining to lower your cost per lead." },
    { q: "What's the minimum budget to make this work?", a: "Most clients see solid results starting around $1,500–$3,000/month in ad spend, depending on your industry and how competitive your keywords are. We'll give you a realistic estimate on our first call." },
    { q: "Do you fix Merchant Center and product feed issues?", a: "Yes. Feed errors and product disapprovals are one of the most common reasons Shopping campaigns underperform. We diagnose and fix them as part of the setup." },
  ],
  ctaTitle: "Ready to own the",
  ctaGradient: "search results?",
  ctaText:
    "Book a free strategy call. We'll audit your current account or map a plan from scratch, and show you where the easy wins are hiding.",
};

export default function GoogleAdsPage() {
  return <ServicePage {...data} />;
}
