import Link from "next/link";
import { notFound } from "next/navigation";
import { ensureDB } from "@/lib/db";
import { siteUrl, siteName, siteFounder } from "@/lib/seo";
export const dynamic = "force-dynamic";

type Post = {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  image_url: string | null;
  image_alt: string | null;
  category: string;
  author: string;
  created_at: string;
  updated_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
  // CMS v2
  target_url: string | null;
  meta_description: string | null;
  author_name: string | null;
  author_url: string | null;
  date_published: string | null;
  date_modified: string | null;
  hero_image_url: string | null;
  hero_image_alt: string | null;
  body_markdown: string | null;
  schema_jsonld: string | null;
  status: string | null;
};

async function getPost(slug: string): Promise<Post | null> {
  try {
    const sql = await ensureDB();
    const isSlug = /^\d+$/.test(slug) === false;
    const [post] = isSlug
      ? await sql`SELECT * FROM posts WHERE slug = ${slug} AND status = 'published' LIMIT 1`
      : await sql`SELECT * FROM posts WHERE id = ${Number(slug)} AND status = 'published' LIMIT 1`;
    return (post as unknown as Post) || null;
  } catch {
    return null;
  }
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function estimateReadingTime(html: string): number {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function resolveCanonical(post: Post): string {
  if (post.target_url) {
    if (post.target_url.startsWith("http")) return post.target_url;
    return `${siteUrl}${post.target_url.startsWith("/") ? "" : "/"}${post.target_url}`;
  }
  return `${siteUrl}/blog/${post.slug}`;
}

function toIsoTimestamp(dateStr: string | null, fallbackIso: string): string {
  if (dateStr) return `${dateStr}T00:00:00Z`;
  return fallbackIso;
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
  const modifiedAt  = toIsoTimestamp(post.date_modified, post.updated_at || post.created_at);
  const authorName  = post.author_name || post.author;

  // Auto-generated BlogPosting JSON-LD — always emitted alongside any
  // admin-supplied schema_jsonld. Defense in depth: search engines always
  // see a consistent BlogPosting block.
  const isFounder = authorName === siteFounder.name;
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
          ...(post.author_url ? { url: post.author_url.startsWith("http") ? post.author_url : `${siteUrl}${post.author_url.startsWith("/") ? "" : "/"}${post.author_url}` } : (isFounder ? { url: siteFounder.linkedinUrl } : {})),
        }
      : { "@type": "Organization", name: siteName },
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png` },
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
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: canonical },
    ],
  };

  // Build the script:ld+json list. Order: admin-supplied first, then auto.
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

  const readingTime = estimateReadingTime(post.content);
  const keywords = post.seo_keywords ? post.seo_keywords.split(",").map(k => k.trim()).filter(Boolean) : [];
  const heroUrl = post.hero_image_url || post.image_url;
  const heroAlt = post.hero_image_alt || post.image_alt || post.title;
  const authorName = post.author_name || post.author;
  const publishedAt = toIsoTimestamp(post.date_published, post.created_at);
  const modifiedAt  = toIsoTimestamp(post.date_modified, post.updated_at || post.created_at);
  const publishedDate = post.date_published
    ? new Date(`${post.date_published}T00:00:00Z`)
    : new Date(post.created_at);
  const modifiedDate = post.date_modified
    ? new Date(`${post.date_modified}T00:00:00Z`)
    : new Date(post.updated_at || post.created_at);

  const authorUrlAbsolute = post.author_url
    ? (post.author_url.startsWith("http") ? post.author_url : `${siteUrl}${post.author_url.startsWith("/") ? "" : "/"}${post.author_url}`)
    : null;

  return (
    <main style={{ paddingTop: "2rem" }}>
      <article style={{ maxWidth: "800px", margin: "0 auto", padding: "0 1.5rem 4rem" }}>
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem", fontSize: "0.85rem", color: "var(--gray-500)" }}>
          <Link href="/" style={{ color: "var(--gray-500)" }}>Home</Link>
          <span style={{ margin: "0 0.5rem" }}>/</span>
          <Link href="/blog" style={{ color: "var(--gray-500)" }}>Blog</Link>
          <span style={{ margin: "0 0.5rem" }}>/</span>
          <span style={{ color: "var(--secondary)" }}>{post.title}</span>
        </nav>

        {/* Back */}
        <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--primary)", fontWeight: 600, marginBottom: "1.5rem", fontSize: "0.9rem" }}>
          <i className="fa-solid fa-arrow-left"></i> Back to Blog
        </Link>

        {/* Hero image */}
        {heroUrl && (
          <div style={{ borderRadius: "1rem", overflow: "hidden", marginBottom: "2rem", aspectRatio: "16/9" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroUrl}
              alt={heroAlt}
              title={heroAlt}
              loading="eager"
              decoding="async"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        )}

        {/* Meta */}
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          <span style={{ background: "var(--accent-purple)", color: "var(--primary)", padding: "0.25rem 0.75rem", borderRadius: "9999px", fontSize: "0.8rem", fontWeight: 700 }}>
            {post.category}
          </span>
          <span style={{ color: "var(--gray-500)", fontSize: "0.85rem" }}>
            <i className="fa-solid fa-user" style={{ marginRight: "0.4rem" }}></i>
            {authorUrlAbsolute ? (
              <a href={authorUrlAbsolute} style={{ color: "inherit", textDecoration: "underline" }}>
                {authorName}
              </a>
            ) : (
              authorName
            )}
          </span>
          <time dateTime={publishedAt} style={{ color: "var(--gray-500)", fontSize: "0.85rem" }}>
            <i className="fa-solid fa-calendar" style={{ marginRight: "0.4rem" }}></i>
            {publishedDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </time>
          <span style={{ color: "var(--gray-500)", fontSize: "0.85rem" }}>
            <i className="fa-solid fa-clock" style={{ marginRight: "0.4rem" }}></i>
            {readingTime} min read
          </span>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: "var(--font-size-4xl)", fontWeight: 800, color: "var(--secondary)", lineHeight: 1.2, marginBottom: "1rem" }}>
          {post.title}
        </h1>

        {/* Excerpt / dek */}
        {post.excerpt && (
          <p style={{ fontSize: "1.15rem", color: "var(--gray-600)", lineHeight: 1.6, marginBottom: "2rem", fontStyle: "italic" }}>
            {post.excerpt}
          </p>
        )}

        {/* Content — sanitized on write; admin-controlled, but the public reader
            still treats this as semi-trusted because there is exactly one author. */}
        <div
          style={{ lineHeight: 1.8, color: "var(--gray-700)", fontSize: "1.05rem" }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags / Keywords */}
        {keywords.length > 0 && (
          <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--gray-200)" }}>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ color: "var(--gray-500)", fontSize: "0.85rem", fontWeight: 600 }}>
                <i className="fa-solid fa-tags" style={{ marginRight: "0.4rem" }}></i>Tags:
              </span>
              {keywords.map((kw) => (
                <span key={kw} style={{ background: "var(--gray-100)", color: "var(--gray-700)", padding: "0.2rem 0.6rem", borderRadius: "6px", fontSize: "0.8rem" }}>
                  {kw}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Last updated */}
        <div style={{ marginTop: "1.5rem", color: "var(--gray-500)", fontSize: "0.8rem" }}>
          <i className="fa-solid fa-clock-rotate-left" style={{ marginRight: "0.4rem" }}></i>
          Last updated:{" "}
          <time dateTime={modifiedAt}>
            {modifiedDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </time>
        </div>
      </article>
    </main>
  );
}