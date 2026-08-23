import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

// Major AI crawlers. We explicitly allow all of them — being cited by AI
// engines is a positive signal for the brand. Listed individually so future
// policy changes only touch this constant.
const AI_CRAWLERS = [
  "GPTBot",            // OpenAI ChatGPT
  "ChatGPT-User",      // OpenAI on-demand browsing
  "OAI-SearchBot",     // OpenAI Search
  "ClaudeBot",         // Anthropic Claude
  "Claude-Web",        // Anthropic Claude web browsing
  "anthropic-ai",      // Anthropic alternate UA
  "PerplexityBot",     // Perplexity
  "Perplexity",        // Perplexity (older UA)
  "Google-Extended",   // Google Gemini + AI Overviews + Vertex
  "Applebot-Extended", // Apple Intelligence
  "cohere-ai",         // Cohere
  "cohere-training-data-crawler",
  "Bytespider",        // ByteDance (TikTok)
  "CCBot",             // Common Crawl (feeds many AI training sets)
  "Amazonbot",         // Amazon Rufus / Q
  "FacebookBot",       // Meta AI
  "Meta-ExternalAgent",
  "DuckAssistBot",     // DuckDuckGo AI
  "YouBot",            // You.com
  "MistralAI-User",    // Mistral le Chat
  "Timpibot",          // Timpi
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // AI-specific user-agents: allow all (default crawlable paths).
      ...AI_CRAWLERS.map((ua) => ({
        userAgent: ua,
        allow: "/",
        disallow: ["/admin", "/api"],
      })),
      // Catch-all for everything else (Googlebot, Bingbot, etc.).
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api"],
      },
    ],
    host: siteUrl,
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}