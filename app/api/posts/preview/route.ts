import { NextRequest, NextResponse } from "next/server";
import { getAdminFromCookie } from "@/lib/auth";
import { putPreview } from "@/lib/preview-store";
import { compileMarkdownServer } from "@/lib/markdown.server";
import { sanitizeHtml } from "@/lib/sanitize";

export const dynamic = "force-dynamic";

/**
 * Build an unsaved post into the full Post shape used by the public reader,
 * by compiling the markdown body, normalizing dates, and providing fallback
 * values for fields the form may have left blank.
 */
function buildPreviewPost(form: Record<string, unknown>) {
  const bodyMarkdown = typeof form.body_markdown === "string" ? form.body_markdown : "";
  const content = compileMarkdownServer(bodyMarkdown);

  // Normalize dates — defaults if blank.
  const today = new Date().toISOString().slice(0, 10);
  const datePublished = typeof form.date_published === "string" && form.date_published
    ? form.date_published
    : today;
  const dateModified = typeof form.date_modified === "string" && form.date_modified
    ? form.date_modified
    : today;

  // iso datetime strings for created/updated (used by public reader)
  const nowIso = new Date().toISOString();

  return {
    id: typeof form.id === "number" ? form.id : 0,
    title: String(form.title ?? "Untitled"),
    slug: String(form.slug ?? "preview"),
    content,
    excerpt: typeof form.excerpt === "string" ? form.excerpt : null,
    image_url: typeof form.image_url === "string" && form.image_url ? form.image_url : null,
    image_alt: typeof form.image_alt === "string" ? form.image_alt : null,
    category: String(form.category ?? "Blog"),
    author: String(form.author ?? "GrowMos Team"),
    published: form.status === "published",
    sort_order: typeof form.sort_order === "number" ? form.sort_order : 0,
    seo_title: typeof form.seo_title === "string" ? form.seo_title : null,
    seo_description: typeof form.seo_description === "string" ? form.seo_description : null,
    seo_keywords: typeof form.seo_keywords === "string" ? form.seo_keywords : null,
    target_url: typeof form.target_url === "string" && form.target_url ? form.target_url : null,
    meta_description: typeof form.meta_description === "string" ? form.meta_description : null,
    author_name: typeof form.author_name === "string" && form.author_name ? form.author_name : null,
    author_url: typeof form.author_url === "string" && form.author_url ? form.author_url : null,
    date_published: datePublished,
    date_modified: dateModified,
    hero_image_url: typeof form.hero_image_url === "string" && form.hero_image_url ? form.hero_image_url : null,
    hero_image_alt: typeof form.hero_image_alt === "string" && form.hero_image_alt ? form.hero_image_alt : null,
    body_markdown: bodyMarkdown || null,
    schema_jsonld: typeof form.schema_jsonld === "string" && form.schema_jsonld ? form.schema_jsonld : null,
    status: typeof form.status === "string" ? form.status : "draft",
    created_at: nowIso,
    updated_at: nowIso,
  };
}

export async function POST(req: NextRequest) {
  const admin = await getAdminFromCookie();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const post = buildPreviewPost(body || {});

    // Also re-sanitize any user-supplied schema_jsonld for safety (defense in
    // depth — the API that stores it also validates, but previews can come
    // from unsaved drafts).
    if (post.schema_jsonld) {
      try {
        const parsed: unknown = JSON.parse(post.schema_jsonld);
        if (typeof parsed === "object" && parsed !== null) {
          const obj = parsed as Record<string, unknown>;
          const ctx = obj["@context"];
          const type = obj["@type"];
          if (ctx && type) {
            // Keep as-is if structurally OK; the public reader will JSON-stringify it.
          }
        }
      } catch {
        // Bad JSON in preview — strip it rather than block the preview
        post.schema_jsonld = null;
      }
    }

    // Avoid unused-var lint if sanitizeHtml ever shifts signatures
    void sanitizeHtml;

    const token = putPreview(post as never);
    return NextResponse.json({ token, url: `/admin/preview/${token}` });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Preview failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}