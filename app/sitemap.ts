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
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/contact`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/boss-model`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const posts = await getPostSlugs();
  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.updated_at ? new Date(post.updated_at) : new Date(post.created_at),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...postPages];
}
