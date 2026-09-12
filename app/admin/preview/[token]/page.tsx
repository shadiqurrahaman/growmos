import { redirect } from "next/navigation";
import { getAdminFromCookie } from "@/lib/auth";
import { getPreview } from "@/lib/preview-store";
import { siteName } from "@/lib/seo";
import BlogPostArticle, { resolveCanonical, type BlogPostData } from "@/components/BlogPostArticle";
import Link from "next/link";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const post = getPreview(token);
  if (!post) return { title: "Preview expired | GrowMos" };

  const canonical = resolveCanonical(post);
  const seoTitle = `${post.title} (PREVIEW) | ${siteName}`;
  const seoDescription = post.meta_description || post.seo_description || post.excerpt || "";

  return {
    title: seoTitle,
    description: seoDescription,
    robots: { index: false, follow: false },
    openGraph: { title: seoTitle, description: seoDescription, url: canonical, siteName },
  };
}

export default async function PreviewPage({ params }: { params: Promise<{ token: string }> }) {
  const admin = await getAdminFromCookie();
  if (!admin) redirect("/admin/login");

  const { token } = await params;
  const post = getPreview(token);
  if (!post) {
    return (
      <main style={{ paddingTop: "8rem", textAlign: "center", minHeight: "60vh" }}>
        <div className="container" style={{ maxWidth: "600px" }}>
          <i className="fa-solid fa-clock-rotate-left" style={{ fontSize: "3rem", color: "var(--gray-400)", marginBottom: "1rem", display: "block" }}></i>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.5rem" }}>Preview expired</h1>
          <p style={{ color: "var(--gray-500)", marginBottom: "1.5rem" }}>
            This preview is no longer available (previews expire after 10 minutes). Click the Preview button in the editor again to generate a fresh one.
          </p>
          <Link href="/admin/dashboard" style={{ color: "var(--primary)", fontWeight: 600 }}>
            <i className="fa-solid fa-arrow-left" style={{ marginRight: "0.4rem" }}></i>
            Back to dashboard
          </Link>
        </div>
      </main>
    );
  }

  return <BlogPostArticle post={post as BlogPostData} previewBadge />;
}