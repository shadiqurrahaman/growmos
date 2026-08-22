import Link from "next/link";
import type { Metadata } from "next";
import { ensureDB } from "@/lib/db";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | GrowMos",
  description: "Insights, guides and industry deep-dives from the GrowMos team.",
};

async function getPosts() {
  try {
    const sql = await ensureDB();
    const posts = await sql`
      SELECT id, title, slug, excerpt, image_url, image_alt, category, author, created_at, updated_at
      FROM posts WHERE published = true
      ORDER BY COALESCE(updated_at, created_at) DESC, created_at DESC
    `;
    return posts;
  } catch { return []; }
}

export default async function BlogPage() {
  const posts = await getPosts();
  const colors = ["pink","purple","green","blue","orange"];

  return (
    <main>
      <section style={{ paddingTop:"8rem", paddingBottom:"3rem", background:"var(--secondary)", textAlign:"center" }}>
        <div className="container">
          <span className="section__badge" style={{ margin:"0 auto 1rem" }}>Insights & Guides</span>
          <h1 style={{ color:"#fff", fontSize:"var(--font-size-5xl)", fontWeight:800, marginBottom:"1rem" }}>Our Blog</h1>
          <p style={{ color:"rgba(255,255,255,0.7)", maxWidth:"600px", margin:"0 auto" }}>Insights, guides and industry deep-dives from the GrowMos team.</p>
        </div>
      </section>

      <section style={{ padding:"4rem 0" }}>
        <div className="container">
          {posts.length === 0 ? (
            <div style={{ textAlign:"center", padding:"4rem 0", color:"var(--gray-500)" }}>
              <i className="fa-solid fa-newspaper" style={{ fontSize:"3rem", marginBottom:"1rem", display:"block" }}></i>
              <p>No posts published yet. Check back soon!</p>
            </div>
          ) : (
            <div className="blog__grid">
              {posts.map((post: Record<string, unknown>, idx: number) => {
                const color = colors[idx % colors.length];
                return (
                  <Link key={String(post.id)} href={`/blog/${post.slug}`} className="blog-card">
                    <div className="blog-card__image">
                      {post.image_url ? (
                        <img src={String(post.image_url)} alt={String(post.title)} className="blog-card__img" />
                      ) : (
                        <div className={`blog-card__placeholder blog-card__placeholder--${color}`}>
                          <div className="blog-card__placeholder-badge">{String(post.category)}</div>
                          <div className="blog-card__placeholder-icon"><i className="fa-solid fa-newspaper"></i></div>
                        </div>
                      )}
                    </div>
                    <div className="blog-card__content">
                      <span className={`blog-card__category blog-card__category--${color}`}>{String(post.category)}</span>
                      <h3 className="blog-card__title">{String(post.title)}</h3>
                      <p className="blog-card__excerpt">{String(post.excerpt || "")}</p>
                      <div className="blog-card__footer">
                        <div className="blog-card__author">
                          <div className="blog-card__avatar"><i className="fa-solid fa-user"></i></div>
                          <div className="blog-card__author-info">
                            <span className="blog-card__author-name">{String(post.author)}</span>
                            <span className="blog-card__date">
                              {(() => {
                                const created = new Date(String(post.created_at)).getTime();
                                const updated = post.updated_at ? new Date(String(post.updated_at)).getTime() : 0;
                                const wasEdited = updated > created + 1000;
                                const label = wasEdited ? "Updated " : "";
                                const dt = wasEdited ? post.updated_at : post.created_at;
                                return label + new Date(String(dt)).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});
                              })()}
                            </span>
                          </div>
                        </div>
                        <span className="blog-card__read-more">Read more <i className="fa-solid fa-arrow-right"></i></span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
