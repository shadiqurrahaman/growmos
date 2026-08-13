import type { MetadataRoute } from "next";
import { getDB } from "@/lib/db";
import { siteUrl } from "@/lib/seo";

async function getPostSlugs() {
  try {
    const sql = getDB();
    const posts = await sql`
      SELECT slug, updated_at, created_at FROM posts WHERE published = true
    `;
    return posts as unknown as { slug: string; updated_at: string | null; created_at: string }[];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    // Top-level
    { url: siteUrl, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${siteUrl}/blog`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${siteUrl}/contact`, changeFrequency: "monthly" as const, priority: 0.6 },
    // Legal
    { url: `${siteUrl}/privacy-policy`, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${siteUrl}/terms-of-service`, changeFrequency: "yearly" as const, priority: 0.3 },
    // Data solutions services
    { url: `${siteUrl}/data-pipeline-engineering`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${siteUrl}/cloud-data-warehousing`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${siteUrl}/bi-dashboards`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${siteUrl}/crm-data-integration`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${siteUrl}/reverse-etl-activation`, changeFrequency: "monthly" as const, priority: 0.8 },
    // Growth services
    { url: `${siteUrl}/meta-ads`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${siteUrl}/google-ads`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${siteUrl}/social-media-management`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${siteUrl}/ai-video-editing`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${siteUrl}/custom-software-development`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${siteUrl}/bi-reporting-ai`, changeFrequency: "monthly" as const, priority: 0.7 },
    // Integrations
    { url: `${siteUrl}/integrations/salesforce`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${siteUrl}/integrations/hubspot`, changeFrequency: "monthly" as const, priority: 0.7 },
  ].map((p) => ({ ...p, lastModified: now }));

  const posts = await getPostSlugs();
  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.updated_at ? new Date(post.updated_at) : new Date(post.created_at),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...postPages];
}