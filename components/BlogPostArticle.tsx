import Link from "next/link";
import { siteUrl } from "@/lib/seo";

export type BlogPostData = {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  image_url: string | null;
  image_alt: string | null;
  category: string;
  author: string;
  published?: boolean;
  sort_order?: number;
  created_at: string;
  updated_at?: string | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
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
  status?: string | null;
};

export function resolveCanonical(post: BlogPostData): string {
  if (post.target_url) {
    if (post.target_url.startsWith("http")) return post.target_url;
    return `${siteUrl}${post.target_url.startsWith("/") ? "" : "/"}${post.target_url}`;
  }
  return `${siteUrl}/blog/${post.slug}`;
}

export function toIsoTimestamp(dateStr: string | null, fallbackIso: string): string {
  if (dateStr) return `${dateStr}T00:00:00Z`;
  return fallbackIso;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function estimateReadingTime(html: string): number {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/**
 * Renders a blog post identically to /blog/[slug]. Shared between the live
 * public route and the admin-only /admin/preview/[token] route so the
 * author sees exactly what visitors will see.
 */
export default function BlogPostArticle({ post, previewBadge = false }: { post: BlogPostData; previewBadge?: boolean }) {
  const readingTime = estimateReadingTime(post.content);
  const keywords = post.seo_keywords ? post.seo_keywords.split(",").map(k => k.trim()).filter(Boolean) : [];
  const heroUrl = post.hero_image_url || post.image_url;
  const heroAlt = post.hero_image_alt || post.image_alt || post.title;
  const authorName = post.author_name || post.author;
  const publishedAt = toIsoTimestamp(post.date_published, post.created_at);
  const modifiedAt = toIsoTimestamp(post.date_modified, post.updated_at || post.created_at);
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
      {previewBadge && (
        <div
          style={{
            background: "var(--accent-purple)",
            color: "var(--primary)",
            padding: "0.6rem 1rem",
            textAlign: "center",
            fontWeight: 700,
            fontSize: "0.85rem",
            marginBottom: "1rem",
            borderRadius: "0.5rem",
            maxWidth: "800px",
            margin: "0 auto 1.5rem",
          }}
        >
          <i className="fa-solid fa-eye" style={{ marginRight: "0.5rem" }}></i>
          PREVIEW — This is how your post will look when published. Not visible to the public until you click Save.
        </div>
      )}

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

        {/* Content — .post-body styles (in globals.css) apply typography
            (headings, paragraphs, lists, blockquote, code, tables) to the
            sanitized HTML produced by `marked`. Without this class the
            markdown elements render visually identical to body text. */}
        <div
          className="post-body"
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