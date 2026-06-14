import type { Metadata } from "next";
import ServicePage, { type ServicePageData } from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Social Media Management",
  description:
    "Full-service social media management — strategy, branding, content, and creator partnerships that grow your audience and turn followers into customers.",
};

const data: ServicePageData = {
  accent: "#0ea5b7",
  badge: "Social Media Management",
  titleTop: "Turn Followers Into",
  titleGradient: "Customers",
  description:
    "A big following means nothing if it doesn't grow your business. We manage your social media end to end — strategy, content, branding, and community — to build an audience that actually trusts you and buys from you.",
  stats: [
    { value: "Daily", label: "Content & engagement" },
    { value: "On-brand", label: "Every single post" },
    { value: "Real", label: "Community, not bots" },
  ],
  introHeading: "Consistency without the",
  introGradient: "headache.",
  introText:
    "Showing up every day with good content is exhausting when you're also running a business — so it's usually the first thing to slip. We take it off your plate entirely. From planning the calendar to designing the posts to replying in your comments, we keep your brand active, consistent, and growing while you focus on the work only you can do.",
  introList: [
    "A consistent presence without you lifting a finger",
    "On-brand visuals that look professionally designed",
    "Real engagement that builds genuine community",
    "Content tied to business goals, not just likes",
  ],
  capabilitiesBadge: "What's Included",
  capabilitiesTitle: "Your Social Media,",
  capabilitiesGradient: "Fully Handled",
  capabilitiesSubtitle: "Strategy, design, management, and partnerships — all under one roof.",
  capabilities: [
    {
      id: "strategy",
      icon: "fa-solid fa-chess",
      title: "Strategy & Consulting",
      desc: "We start with a plan, not random posting. A clear strategy built around your audience, your goals, and the platforms that matter for you.",
      points: [
        "Audience & competitor research",
        "Content pillars & calendar",
        "Platform & posting strategy",
        "Goal setting & performance review",
      ],
    },
    {
      id: "branding",
      icon: "fa-solid fa-palette",
      title: "Visual Branding & Templates",
      desc: "A consistent, professional look that makes your brand instantly recognizable in a crowded, fast-scrolling feed.",
      points: [
        "Branded post & story templates",
        "Consistent color, type & style",
        "Graphics, carousels & reels design",
        "Profile & highlight makeovers",
      ],
    },
    {
      id: "niche-management",
      icon: "fa-solid fa-layer-group",
      title: "Platform Niche Management",
      desc: "Every platform has its own rules and culture. We tailor your content and approach to each one instead of copy-pasting everywhere.",
      points: [
        "Platform-specific content",
        "Daily posting & scheduling",
        "Community & comment management",
        "Trend & hashtag monitoring",
      ],
    },
    {
      id: "influencer",
      icon: "fa-solid fa-users-rays",
      title: "Creator & Influencer Ops",
      desc: "The right creator can put your brand in front of thousands of warm, trusting buyers. We find them and run the whole partnership.",
      points: [
        "Creator sourcing & vetting",
        "Outreach & negotiation",
        "Campaign briefs & coordination",
        "Performance tracking & reporting",
      ],
    },
  ],
  processBadge: "How We Work",
  processTitle: "From Quiet Page to",
  processGradient: "Thriving Community",
  processSubtitle: "A steady system that builds real momentum over time.",
  process: [
    { n: "01", title: "Discover", desc: "We learn your brand, audience, and goals, then audit your current presence to see what's working and what isn't." },
    { n: "02", title: "Plan", desc: "We build a content strategy and calendar, plus a branded visual system that makes every post unmistakably yours." },
    { n: "03", title: "Create & Post", desc: "We produce, schedule, and publish consistent content — and actively engage with your community every day." },
    { n: "04", title: "Grow & Report", desc: "We track what resonates, refine the approach, and send you clear reports on growth and engagement." },
  ],
  benefitsBadge: "Why GrowMos",
  benefitsTitle: "Social That Builds a",
  benefitsGradient: "Business",
  benefitsSubtitle: "We measure success in customers and trust, not just follower counts.",
  benefits: [
    { icon: "fa-solid fa-hourglass-half", title: "We Take It Off Your Plate", desc: "No more late-night scrambles to post. We own the calendar, the content, and the consistency so you don't have to." },
    { icon: "fa-solid fa-heart", title: "Real Engagement", desc: "We build genuine community by actually talking to your audience — not buying empty followers that never convert." },
    { icon: "fa-solid fa-gem", title: "Professional, On-Brand Look", desc: "Your feed will look like it has a full design team behind it — because, in effect, it does." },
    { icon: "fa-solid fa-arrow-trend-up", title: "Tied to Business Goals", desc: "Every post has a purpose. We connect your social presence to leads, sales, and brand trust — not vanity metrics." },
  ],
  faqs: [
    { q: "Which platforms do you manage?", a: "Instagram, Facebook, TikTok, LinkedIn, YouTube, and more. We'll recommend focusing on the few platforms where your specific audience actually spends time, rather than spreading thin across all of them." },
    { q: "Do you create the content too, or just post it?", a: "We handle everything — strategy, copywriting, graphic design, and scheduling. We can also coordinate video content through our AI Video team. You get a finished, on-brand feed without lifting a finger." },
    { q: "How long until I see growth?", a: "Social media is a compounding game. You'll usually notice better consistency and engagement within the first month, with meaningful audience and community growth building over 3–6 months of steady, strategic effort." },
    { q: "Will the content actually sound like my brand?", a: "Yes. We start by learning your voice, values, and style, and we keep you in the approval loop. The goal is content your audience would never guess was outsourced." },
  ],
  ctaTitle: "Ready to grow your",
  ctaGradient: "audience?",
  ctaText:
    "Book a free call. We'll review your current social presence and share a few quick ideas we'd put into action in your first month.",
};

export default function SocialMediaPage() {
  return <ServicePage {...data} />;
}
