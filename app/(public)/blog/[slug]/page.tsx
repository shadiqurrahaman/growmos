import Link from "next/link";
import { notFound } from "next/navigation";
import { getDB } from "@/lib/db";
import { siteUrl, siteName } from "@/lib/seo";
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
};

async function getPost(slug: string): Promise<Post | null> {
  try {
    const sql = getDB();
    const [post] = await sql`SELECT * FROM posts WHERE slug = ${slug} AND published = true`;
    return (post as unknown as Post) || null;
  } catch { return null; }
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function estimateReadingTime(html: string): number {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found | GrowMos" };

  const url = `${siteUrl}/blog/${post.slug}`;
  const seoTitle = post.seo_title || `${post.title} | ${siteName} Blog`;
  const seoDescription = post.seo_description || post.excerpt || "";
  const ogImage = post.image_url;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: post.seo_keywords || undefined,
    authors: [{ name: post.author }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: seoTitle,
      description: seoDescription,
      url,
      siteName,
      publishedTime: post.created_at,
      modifiedTime: post.updated_at || post.created_at,
      authors: [post.author],
      tags: post.seo_keywords ? post.seo_keywords.split(",").map(k => k.trim()).filter(Boolean) : undefined,
      images: ogImage ? [{ url: ogImage, alt: post.image_alt || post.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const url = `${siteUrl}/blog/${post.slug}`;
  const seoTitle = post.seo_title || post.title;
  const seoDescription = post.seo_description || post.excerpt || "";
  const readingTime = estimateReadingTime(post.content);
  const keywords = post.seo_keywords ? post.seo_keywords.split(",").map(k => k.trim()).filter(Boolean) : [];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: seoTitle,
    description: seoDescription,
    keywords: keywords.join(", ") || undefined,
    image: post.image_url ? [post.image_url] : undefined,
    datePublished: post.created_at,
    dateModified: post.updated_at || post.created_at,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: { "@type": "ImageObject", url: `${siteUrl}/images/growmos.jpg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <main style={{ paddingTop:"2rem" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <article style={{ maxWidth:"800px", margin:"0 auto", padding:"0 1.5rem 4rem" }}>
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" style={{ marginBottom:"1.5rem", fontSize:"0.85rem", color:"var(--gray-500)" }}>
          <Link href="/" style={{ color:"var(--gray-500)" }}>Home</Link>
          <span style={{ margin:"0 0.5rem" }}>/</span>
          <Link href="/blog" style={{ color:"var(--gray-500)" }}>Blog</Link>
          <span style={{ margin:"0 0.5rem" }}>/</span>
          <span style={{ color:"var(--secondary)" }}>{post.title}</span>
        </nav>

        {/* Back */}
        <Link href="/blog" style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", color:"var(--primary)", fontWeight:600, marginBottom:"1.5rem", fontSize:"0.9rem" }}>
          <i className="fa-solid fa-arrow-left"></i> Back to Blog
        </Link>

        {/* Hero image */}
        {post.image_url && (
          <div style={{ borderRadius:"1rem", overflow:"hidden", marginBottom:"2rem", aspectRatio:"16/9" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image_url}
              alt={post.image_alt || post.title}
              title={post.image_alt || post.title}
              loading="eager"
              decoding="async"
              style={{ width:"100%", height:"100%", objectFit:"cover" }}
            />
          </div>
        )}

        {/* Meta */}
        <div style={{ display:"flex", gap:"1rem", alignItems:"center", marginBottom:"1.5rem", flexWrap:"wrap" }}>
          <span style={{ background:"var(--accent-purple)", color:"var(--primary)", padding:"0.25rem 0.75rem", borderRadius:"9999px", fontSize:"0.8rem", fontWeight:700 }}>{post.category}</span>
          <span style={{ color:"var(--gray-500)", fontSize:"0.85rem" }}>
            <i className="fa-solid fa-user" style={{ marginRight:"0.4rem" }}></i>{post.author}
          </span>
          <time dateTime={post.created_at} style={{ color:"var(--gray-500)", fontSize:"0.85rem" }}>
            <i className="fa-solid fa-calendar" style={{ marginRight:"0.4rem" }}></i>
            {new Date(post.created_at).toLocaleDateString("en-US", { year:"numeric", month:"long", day:"numeric" })}
          </time>
          <span style={{ color:"var(--gray-500)", fontSize:"0.85rem" }}>
            <i className="fa-solid fa-clock" style={{ marginRight:"0.4rem" }}></i>
            {readingTime} min read
          </span>
        </div>

        {/* Title */}
        <h1 style={{ fontSize:"var(--font-size-4xl)", fontWeight:800, color:"var(--secondary)", lineHeight:1.2, marginBottom:"1rem" }}>{post.title}</h1>

        {/* Excerpt / dek */}
        {post.excerpt && (
          <p style={{ fontSize:"1.15rem", color:"var(--gray-600)", lineHeight:1.6, marginBottom:"2rem", fontStyle:"italic" }}>{post.excerpt}</p>
        )}

        {/* Content */}
        <div
          style={{ lineHeight:1.8, color:"var(--gray-700)", fontSize:"1.05rem" }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags / Keywords */}
        {keywords.length > 0 && (
          <div style={{ marginTop:"3rem", paddingTop:"2rem", borderTop:"1px solid var(--gray-200)" }}>
            <div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap", alignItems:"center" }}>
              <span style={{ color:"var(--gray-500)", fontSize:"0.85rem", fontWeight:600 }}>
                <i className="fa-solid fa-tags" style={{ marginRight:"0.4rem" }}></i>Tags:
              </span>
              {keywords.map((kw) => (
                <span key={kw} style={{ background:"var(--gray-100)", color:"var(--gray-700)", padding:"0.2rem 0.6rem", borderRadius:"6px", fontSize:"0.8rem" }}>{kw}</span>
              ))}
            </div>
          </div>
        )}
      </article>
    </main>
  );
}
