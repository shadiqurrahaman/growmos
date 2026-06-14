import type { Metadata } from "next";
import ServicePage, { type ServicePageData } from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "AI Video & Editing — Scroll-Stopping Content",
  description:
    "AI video generation, UGC ad editing, and e-commerce product videos that stop the scroll and sell. Content built to convert, produced fast and affordably.",
};

const data: ServicePageData = {
  accent: "#e0457b",
  badge: "AI Video & Editing",
  titleTop: "Content That Stops",
  titleGradient: "the Scroll",
  description:
    "Attention is the only currency online — and it's getting expensive. We produce short-form video that grabs people in the first two seconds and keeps them watching until they're ready to buy. Powered by AI, polished by editors who get marketing.",
  stats: [
    { value: "3s", label: "To win or lose a viewer" },
    { value: "10x", label: "Faster than traditional video" },
    { value: "∞", label: "Variations for testing" },
  ],
  introHeading: "Great video, without the",
  introGradient: "studio price tag.",
  introText:
    "Hiring a film crew for every ad is slow and expensive. AI changes the math. We combine AI generation with sharp human editing to produce a steady stream of high-converting videos — UGC-style ads, product showcases, and social content — at a fraction of the usual cost and time. More creative to test means more winners found.",
  introList: [
    "Made for the platform — vertical, captioned, native",
    "Hooks and pacing designed to hold attention",
    "Fast turnaround so you never run out of content",
    "Built to test — many angles, not one expensive bet",
  ],
  capabilitiesBadge: "What We Produce",
  capabilitiesTitle: "Video for Every",
  capabilitiesGradient: "Goal",
  capabilitiesSubtitle: "From AI-generated ads to polished product films — all built to convert.",
  capabilities: [
    {
      id: "ai-video-generation",
      icon: "fa-solid fa-clapperboard",
      title: "AI Video Generation",
      desc: "Generate fresh, on-brand video without cameras, actors, or sets — perfect for testing dozens of creative angles fast.",
      points: [
        "AI avatars & spokespeople",
        "Text-to-video & b-roll generation",
        "AI voiceovers in multiple languages",
        "Rapid creative variations for testing",
      ],
    },
    {
      id: "ugc-editing",
      icon: "fa-solid fa-mobile-screen",
      title: "UGC Ad Editing",
      desc: "The authentic, native style that outperforms polished ads on social. We edit raw footage into scroll-stopping, conversion-focused ads.",
      points: [
        "Hook-driven openings",
        "Dynamic captions & sound design",
        "Platform-native pacing & format",
        "Multiple hook & CTA variations",
      ],
    },
    {
      id: "ecommerce-video",
      icon: "fa-solid fa-box-open",
      title: "E-Commerce Product Videos",
      desc: "Show your product in action so shoppers can picture owning it. Built to lift conversion on product pages and in ads.",
      points: [
        "Product demos & feature highlights",
        "Lifestyle & in-use scenes",
        "Before/after & comparison videos",
        "Optimized for ads & product pages",
      ],
    },
    {
      id: "ai-integration",
      icon: "fa-solid fa-wand-magic-sparkles",
      title: "AI Workflow Integration",
      desc: "We don't just make one video — we build a content engine, so producing and repurposing video becomes fast and repeatable.",
      points: [
        "Repurpose one shoot into many clips",
        "Templated, on-brand workflows",
        "Bulk creation for ad testing",
        "Consistent style across every piece",
      ],
    },
  ],
  processBadge: "How We Work",
  processTitle: "From Brief to",
  processGradient: "Scroll-Stopper",
  processSubtitle: "A simple flow that keeps the content — and the results — coming.",
  process: [
    { n: "01", title: "Strategy & Hooks", desc: "We define your message, audience, and the hooks most likely to stop the scroll for your buyers." },
    { n: "02", title: "Produce", desc: "We generate and edit your videos — AI where it's faster, human craft where it counts." },
    { n: "03", title: "Variations", desc: "We deliver multiple hooks, cuts, and formats so you can test and find your winners." },
    { n: "04", title: "Learn & Repeat", desc: "We double down on what performs and keep your content pipeline flowing — never running dry." },
  ],
  benefitsBadge: "Why GrowMos",
  benefitsTitle: "Video That Earns Its",
  benefitsGradient: "Keep",
  benefitsSubtitle: "Pretty isn't the point. Performance is.",
  benefits: [
    { icon: "fa-solid fa-bolt", title: "Fast Turnaround", desc: "AI-assisted production means you get a steady stream of content in days, not weeks — so you're never stuck waiting." },
    { icon: "fa-solid fa-coins", title: "Studio Quality, Lean Budget", desc: "Skip the crews and rentals. Get scroll-stopping video at a price that lets you test more and risk less." },
    { icon: "fa-solid fa-flask", title: "Made for Testing", desc: "We give you many angles, not one big bet — the surest way to find the creative that actually sells." },
    { icon: "fa-solid fa-bullseye", title: "Marketing-Minded Editors", desc: "Our editors think about conversions, not just transitions. Every cut serves the goal: getting the click." },
  ],
  faqs: [
    { q: "Will AI-generated video look cheap or fake?", a: "Not the way we use it. We blend AI with skilled human editing and only ship content that looks and feels on-brand. AI speeds up the work; it never replaces quality control." },
    { q: "Do I need to provide footage?", a: "Not always. We can work entirely with AI generation, use your existing product footage and photos, or combine both. We'll recommend the best mix for your product and budget." },
    { q: "What platforms do you create for?", a: "TikTok, Instagram Reels, Facebook, YouTube Shorts, and product pages. Everything is formatted natively for where it'll run — vertical, captioned, and paced for that audience." },
    { q: "How many videos do I get?", a: "It depends on your package, but our focus is volume for testing. We'd rather give you several strong variations to test than one polished video that may or may not land." },
  ],
  ctaTitle: "Ready for content that",
  ctaGradient: "converts?",
  ctaText:
    "Book a free call. Show us your product, and we'll share a few creative directions we'd test first — and how quickly we could get them live.",
};

export default function AiVideoEditingPage() {
  return <ServicePage {...data} />;
}
