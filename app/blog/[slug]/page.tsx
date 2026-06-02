import Link from "next/link";
import { notFound } from "next/navigation";
import { getDB } from "@/lib/db";
export const dynamic = "force-dynamic";

async function getPost(slug: string) {
  try {
    const sql = getDB();
    const [post] = await sql`SELECT * FROM posts WHERE slug = ${slug} AND published = true`;
    return post || null;
  } catch { return null; }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found | GrowMos" };
  return {
    title: `${post.title} | GrowMos Blog`,
    description: post.excerpt || "",
    openGraph: post.image_url ? { images: [{ url: post.image_url }] } : {},
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <main style={{ paddingTop:"2rem" }}>
      <article style={{ maxWidth:"800px", margin:"0 auto", padding:"0 1.5rem 4rem" }}>
        {/* Back */}
        <Link href="/blog" style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", color:"var(--primary)", fontWeight:600, marginBottom:"2rem", fontSize:"0.9rem" }}>
          <i className="fa-solid fa-arrow-left"></i> Back to Blog
        </Link>

        {/* Hero image */}
        {post.image_url && (
          <div style={{ borderRadius:"1rem", overflow:"hidden", marginBottom:"2rem", aspectRatio:"16/9" }}>
            <img src={post.image_url} alt={post.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
          </div>
        )}

        {/* Meta */}
        <div style={{ display:"flex", gap:"1rem", alignItems:"center", marginBottom:"1.5rem", flexWrap:"wrap" }}>
          <span style={{ background:"var(--accent-purple)", color:"var(--primary)", padding:"0.25rem 0.75rem", borderRadius:"9999px", fontSize:"0.8rem", fontWeight:700 }}>{post.category}</span>
          <span style={{ color:"var(--gray-500)", fontSize:"0.85rem" }}>
            <i className="fa-solid fa-user" style={{ marginRight:"0.4rem" }}></i>{post.author}
          </span>
          <span style={{ color:"var(--gray-500)", fontSize:"0.85rem" }}>
            <i className="fa-solid fa-calendar" style={{ marginRight:"0.4rem" }}></i>
            {new Date(post.created_at).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}
          </span>
        </div>

        {/* Title */}
        <h1 style={{ fontSize:"var(--font-size-4xl)", fontWeight:800, color:"var(--secondary)", lineHeight:1.2, marginBottom:"2rem" }}>{post.title}</h1>

        {/* Content */}
        <div
          style={{ lineHeight:1.8, color:"var(--gray-700)", fontSize:"1.05rem" }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </main>
  );
}
