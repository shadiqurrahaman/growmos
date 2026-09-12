import { notFound } from "next/navigation";
import { ensureDB } from "@/lib/db";
import { siteName } from "@/lib/seo";
import BlogPostArticle, {
  resolveCanonical,
  toIsoTimestamp,
  type BlogPostData,
} from "@/components/BlogPostArticle";
export const dynamic = "force-dynamic";

async function getPost(slug: string): Promise<BlogPostData | null> {
  try {
    const sql = await ensureDB();
    const isSlug = /^\d+$/.test(slug) === false;
    const [post] = isSlug
      ? await sql`SELECT * FROM posts WHERE slug = ${slug} AND status = 'published' LIMIT 1`
      : await sql`SELECT * FROM posts WHERE id = ${Number(slug)} AND status = 'published' LIMIT 1`;
    return (post as unknown as BlogPostData) || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found | GrowMos" };

  const canonical = resolveCanonical(post);
  const seoTitle = post.seo_title || `${post.title} | ${siteName} Blog`;
  const seoDescription = post.meta_description || post.seo_description || post.excerpt || "";
  const heroUrl = post.hero_image_url || post.image_url;
  const heroAlt = post.hero_image_alt || post.image_alt || post.title;
  const keywords = post.seo_keywords
    ? post.seo_keywords.split(",").map((k) => k.trim()).filter(Boolean)
    : [];
  const publishedAt = toIsoTimestamp(post.date_published, post.created_at);
  const modifiedAt = toIsoTimestamp(post.date_modified, post.updated_at || post.created_at);
  const authorName = post.author_name || post.author;

  const isFounder = authorName === "MD Sha";
  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: seoTitle,
    description: seoDescription,
    datePublished: publishedAt,
    dateModified: modifiedAt,
    author: authorName
      ? {
          "@type": "Person",
          name: authorName,
          ...(post.author_url ? { url: post.author_url.startsWith("http") ? post.author_url : `${canonical.split("/blog/")[0]}${post.author_url.startsWith("/") ? "" : "/"}${post.author_url}` } : (isFounder ? { url: "https://www.linkedin.com/in/mdshadataanalyst/" } : {})),
        }
      : { "@type": "Organization", name: siteName },
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: { "@type": "ImageObject", url: `${canonical.split("/blog/")[0]}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    image: heroUrl ? [heroUrl] : undefined,
    keywords: post.seo_keywords || undefined,
    inLanguage: "en-US",
    articleSection: post.category || undefined,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: canonical.split("/blog/")[0] },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${canonical.split("/blog/")[0]}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: canonical },
    ],
  };

  const jsonLdScripts: string[] = [];
  if (post.schema_jsonld) jsonLdScripts.push(post.schema_jsonld);
  jsonLdScripts.push(JSON.stringify(blogPostingJsonLd));
  jsonLdScripts.push(JSON.stringify(breadcrumbJsonLd));

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: post.seo_keywords || undefined,
    authors: [{ name: authorName }],
    alternates: {
      canonical,
      languages: { en: canonical, "x-default": canonical },
    },
    openGraph: {
      type: "article",
      title: seoTitle,
      description: seoDescription,
      url: canonical,
      siteName,
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      authors: [authorName],
      tags: keywords.length ? keywords : undefined,
      images: heroUrl ? [{ url: heroUrl, alt: heroAlt }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: heroUrl ? [heroUrl] : undefined,
    },
    other: {
      "script:ld+json": jsonLdScripts,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return <BlogPostArticle post={post} />;
}