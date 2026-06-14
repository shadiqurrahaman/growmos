import type { Metadata } from "next";
import ServicePage, { type ServicePageData } from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Custom Software Development & AI Integration",
  description:
    "Web apps, mobile apps, custom AI assistants, and workflow automation built around your business — not a template. Software that saves time and makes money.",
};

const data: ServicePageData = {
  accent: "#0fa968",
  badge: "Software Dev & AI",
  titleTop: "Software Built",
  titleGradient: "Around Your Business",
  description:
    "Off-the-shelf tools force your business to bend around their limits. We flip that. We build web apps, mobile apps, and AI systems that fit how you actually work — so your team moves faster and your customers stick around.",
  stats: [
    { value: "100%", label: "Code & IP is yours" },
    { value: "2–6 wk", label: "To a working MVP" },
    { value: "AI-first", label: "Built into every build" },
  ],
  introHeading: "From idea to",
  introGradient: "shipped product.",
  introText:
    "Whether you're automating a painful manual process, launching a new product, or adding AI to something you already run, we handle the whole journey — design, development, testing, and launch. We write clean, maintainable code and explain our decisions in plain language, so you're never locked out of your own software.",
  introList: [
    "You own 100% of the code and intellectual property",
    "Clear milestones — you see progress every week",
    "Built to scale, not just to demo",
    "Ongoing support and updates after launch",
  ],
  capabilitiesBadge: "What We Build",
  capabilitiesTitle: "One Team for Your",
  capabilitiesGradient: "Whole Stack",
  capabilitiesSubtitle: "Web, mobile, and AI — built to work together, not in silos.",
  capabilities: [
    {
      id: "web-apps",
      icon: "fa-solid fa-window-maximize",
      title: "Web Applications",
      desc: "Fast, secure, scalable web apps and platforms — from internal tools that save hours to customer-facing products that drive revenue.",
      points: [
        "Custom dashboards & portals",
        "SaaS platforms & marketplaces",
        "API & third-party integrations",
        "Modern, responsive interfaces",
      ],
    },
    {
      id: "mobile-apps",
      icon: "fa-solid fa-mobile-screen-button",
      title: "Mobile Apps",
      desc: "iOS and Android apps your customers will actually want to use, built once and deployed everywhere to keep costs sensible.",
      points: [
        "iOS & Android (cross-platform)",
        "Clean, intuitive UX design",
        "Push notifications & offline support",
        "App Store & Play Store launch",
      ],
    },
    {
      id: "ai-assistants",
      icon: "fa-solid fa-robot",
      title: "Custom AI Assistants",
      desc: "AI chatbots and assistants trained on your business — your docs, your products, your tone — so they answer like your best team member.",
      points: [
        "Trained on your own data (RAG)",
        "Customer support & sales assistants",
        "Internal knowledge-base bots",
        "Website, WhatsApp & Slack integration",
      ],
    },
    {
      id: "ai-workflows",
      icon: "fa-solid fa-gears",
      title: "AI Workflow Automation",
      desc: "Stop paying people to copy-paste between tools. We automate the repetitive work so your team spends time on what matters.",
      points: [
        "Connect your existing tools & apps",
        "Automated reports & data entry",
        "Smart document & email processing",
        "Custom triggers & approval flows",
      ],
    },
  ],
  processBadge: "How We Work",
  processTitle: "A Process You Can",
  processGradient: "Actually Follow",
  processSubtitle: "No black boxes. You always know what's being built and why.",
  process: [
    { n: "01", title: "Discovery", desc: "We learn your goals, users, and constraints, then turn them into a clear scope and a realistic plan." },
    { n: "02", title: "Design & Prototype", desc: "You see clickable designs before a line of code is written, so there are no expensive surprises later." },
    { n: "03", title: "Build in Sprints", desc: "We develop in short cycles with weekly check-ins, so you can give feedback while it still counts." },
    { n: "04", title: "Launch & Support", desc: "We test thoroughly, deploy, and stay on to fix, improve, and scale as your needs grow." },
  ],
  benefitsBadge: "Why GrowMos",
  benefitsTitle: "Engineering You Can",
  benefitsGradient: "Trust",
  benefitsSubtitle: "Built properly, documented clearly, owned entirely by you.",
  benefits: [
    { icon: "fa-solid fa-key", title: "You Own Everything", desc: "Full source code, documentation, and IP are handed to you. No vendor lock-in, no holding your software hostage." },
    { icon: "fa-solid fa-rocket", title: "Ship Fast, Sensibly", desc: "We get a working MVP into your hands quickly so you can validate with real users before over-investing." },
    { icon: "fa-solid fa-shield-halved", title: "Secure & Maintainable", desc: "Clean architecture and security best practices mean your software won't collapse under growth or hand you a surprise bill." },
    { icon: "fa-solid fa-people-arrows", title: "We Speak Human", desc: "We translate technical decisions into plain English, so you stay in control even if you're not a developer." },
  ],
  faqs: [
    { q: "I have an idea but no technical background — can you still help?", a: "Absolutely, that's most of our clients. We handle the technical side and guide you through the decisions in plain language. You bring the vision; we turn it into working software." },
    { q: "How much does a custom app cost?", a: "It depends entirely on scope — a focused MVP costs far less than a full platform. We scope your project into clear phases so you can start small, prove value, and expand. You'll get a transparent estimate before we begin." },
    { q: "Will I be locked into working with you forever?", a: "No. You own all the code and documentation. We build it so any competent developer can pick it up. Most clients stay because they want to, not because they're stuck." },
    { q: "Can you add AI to software I already have?", a: "Yes. We regularly integrate AI assistants, automation, and smart features into existing apps and websites without rebuilding them from scratch." },
  ],
  ctaTitle: "Have an idea worth",
  ctaGradient: "building?",
  ctaText:
    "Book a free discovery call. Tell us the problem you're trying to solve, and we'll tell you honestly whether — and how — software can fix it.",
};

export default function CustomSoftwarePage() {
  return <ServicePage {...data} />;
}
