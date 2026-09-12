import Link from "next/link";
import type { Metadata } from "next";
import { ensureDB } from "@/lib/db";
import { buildPageMetadata, defaultOgImage } from "@/lib/seo";
export const dynamic = "force-dynamic";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog | Data Engineering, BI & Analytics Insights",
  description:
    "Insights, guides and industry deep-dives on data pipelines, dbt, BigQuery, Snowflake, Power BI, Metabase, CRM analytics, and B2B data strategy.",
  path: "/blog",
  type: "website",
  keywords: [
    "data engineering blog",
    "dbt tutorials",
    "BigQuery guides",
    "BI insights",
    "Snowflake tips",
    "data strategy blog",
  ],
  image: defaultOgImage,
  imageAlt: "GrowMos Blog — Data engineering and BI insights",
});

async function getPosts() {
  try {
    const sql = await ensureDB();
    const posts = await sql`
      SELECT id, title, slug, excerpt, image_url, image_alt, hero_image_url, hero_image_alt, category, author, date_published, created_at, updated_at
      FROM posts WHERE status = 'published'
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
                      {(post.hero_image_url || post.image_url) ? (
                        <img src={String(post.hero_image_url || post.image_url)} alt={String(post.hero_image_alt || post.image_alt || post.title)} className="blog-card__img" />
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
                                const dateLabel = post.date_published || post.created_at;
                                return new Date(String(dateLabel)).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});
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
