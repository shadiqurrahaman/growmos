import type { MetadataRoute } from "next";
import { getDB } from "@/lib/db";
import { siteUrl, pageUrl } from "@/lib/seo";

async function getPostSlugs() {
  try {
    const sql = getDB();
    const posts = await sql`
      SELECT slug, updated_at, created_at
      FROM posts WHERE published = true
      ORDER BY COALESCE(updated_at, created_at) DESC
      LIMIT 5000
    `;
    return posts as unknown as { slug: string; updated_at: string | null; created_at: string }[];
  } catch {
    return [];
  }
}

// `images` is a Google sitemap extension, not part of MetadataRoute.Sitemap.
type SitemapEntry = MetadataRoute.Sitemap[number] & { images?: string[] };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: Array<{
    path: string;
    priority: number;
    changeFrequency: SitemapEntry["changeFrequency"];
    image?: string;
  }> = [
    { path: "", changeFrequency: "weekly", priority: 1, image: "/images/dashboard.jpg" },
    { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
    { path: "/about", changeFrequency: "monthly", priority: 0.6 },
    { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terms-of-service", changeFrequency: "yearly", priority: 0.3 },
    { path: "/data-pipeline-engineering", changeFrequency: "monthly", priority: 0.9, image: "/images/services/data-pipeline.jpg" },
    { path: "/cloud-data-warehousing", changeFrequency: "monthly", priority: 0.9, image: "/images/services/data-warehousing.jpg" },
    { path: "/bi-dashboards", changeFrequency: "monthly", priority: 0.9, image: "/images/services/bi-dashboard.jpg" },
    { path: "/bi-reporting-ai", changeFrequency: "monthly", priority: 0.8, image: "/images/svc-bi-ai.jpg" },
    { path: "/crm-data-integration", changeFrequency: "monthly", priority: 0.8, image: "/images/services/crm-integration.jpg" },
    { path: "/reverse-etl-activation", changeFrequency: "monthly", priority: 0.8, image: "/images/services/data-transformation.jpg" },
    { path: "/meta-ads", changeFrequency: "monthly", priority: 0.7, image: "/images/svc-digital-marketing.jpg" },
    { path: "/google-ads", changeFrequency: "monthly", priority: 0.7, image: "/images/web_analytics.jpg" },
    { path: "/social-media-management", changeFrequency: "monthly", priority: 0.7, image: "/images/social_media_marketing.jpg" },
    { path: "/ai-video-editing", changeFrequency: "monthly", priority: 0.7 },
    { path: "/custom-software-development", changeFrequency: "monthly", priority: 0.7, image: "/images/svc-software-dev.jpg" },
    { path: "/integrations/salesforce", changeFrequency: "monthly", priority: 0.7 },
    { path: "/integrations/hubspot", changeFrequency: "monthly", priority: 0.7 },
  ];

  const normalized: SitemapEntry[] = staticPages.map((p) => {
    const entry: SitemapEntry = {
      url: pageUrl(p.path),
      changeFrequency: p.changeFrequency,
      priority: p.priority,
      lastModified: now,
    };
    if (p.image) entry.images = [pageUrl(p.image)];
    return entry;
  });

  const posts = await getPostSlugs();
  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.updated_at ? new Date(post.updated_at) : new Date(post.created_at),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...normalized, ...postPages];
}