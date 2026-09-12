import { NextRequest, NextResponse } from "next/server";
import { ensureDB } from "@/lib/db";
import { getAdminFromCookie } from "@/lib/auth";
import { compileMarkdownServer as compileMarkdown } from "@/lib/markdown.server";
import { sanitizeHtml } from "@/lib/sanitize";
import { validateSchemaJsonld } from "@/lib/schema-validator";

export const dynamic = "force-dynamic";

const ALLOWED_STATUS = new Set(["draft", "review", "published"]);

type Unchanged = { __unchanged: true };
const UNCHANGED: Unchanged = { __unchanged: true };

function isUnchanged<T>(v: T | Unchanged): v is Unchanged {
  return typeof v === "object" && v !== null && (v as Unchanged).__unchanged === true;
}

function normalizeStatus(input: unknown): "draft" | "review" | "published" {
  if (typeof input === "string" && ALLOWED_STATUS.has(input)) {
    return input as "draft" | "review" | "published";
  }
  return "draft";
}

function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const sql = await ensureDB();
    const isSlug = isNaN(Number(id));
    const admin = await getAdminFromCookie();

    if (isSlug) {
      const [post] = admin
        ? await sql`SELECT * FROM posts WHERE slug = ${id}`
        : await sql`SELECT * FROM posts WHERE slug = ${id} AND status = 'published'`;
      if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json({ post });
    }

    const numericId = Number(id);
    const [post] = admin
      ? await sql`SELECT * FROM posts WHERE id = ${numericId}`
      : await sql`SELECT * FROM posts WHERE id = ${numericId} AND status = 'published'`;
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ post });
  } catch {
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdminFromCookie();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const numericId = Number(id);
  if (isNaN(numericId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    const sql = await ensureDB();
    const body = await req.json();

    const {
      title, slug, content, excerpt, image_url, image_alt, category, author,
      published, sort_order, seo_title, seo_description, seo_keywords,
      target_url, meta_description, author_name, author_url,
      date_published, date_modified,
      hero_image_url, hero_image_alt,
      body_markdown, schema_jsonld, status,
    } = body;

    // target_url uniqueness check (exclude self)
    if (target_url) {
      const [conflict] = await sql`SELECT id FROM posts WHERE target_url = ${target_url} AND id <> ${numericId} LIMIT 1`;
      if (conflict) {
        return NextResponse.json({ error: "target_url already in use by another post" }, { status: 409 });
      }
    }

    // Validate JSON-LD when provided
    if (schema_jsonld !== undefined && schema_jsonld !== null && schema_jsonld !== "") {
      const jld = validateSchemaJsonld(schema_jsonld);
      if (!jld.ok) {
        return NextResponse.json({ error: jld.error, field: "schema_jsonld" }, { status: 400 });
      }
    }

    const [existing] = await sql`SELECT id FROM posts WHERE id = ${numericId}`;
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Resolve content: markdown wins; recompile or sanitize as needed.
    let contentValue: string | Unchanged = UNCHANGED;
    if (body_markdown !== undefined) {
      contentValue = compileMarkdown(body_markdown ?? "");
    } else if (content !== undefined) {
      contentValue = sanitizeHtml(content ?? "");
    }

    // Resolve status / published synchronization
    let publishedValue: boolean | Unchanged = UNCHANGED;
    if (status !== undefined) {
      publishedValue = normalizeStatus(status) === "published";
    } else if (published !== undefined) {
      publishedValue = !!published;
    }

    // Resolve date_modified — bump to today when content or status changed
    const today = todayIsoDate();
    let dateModifiedValue: string | Unchanged = UNCHANGED;
    if (date_modified !== undefined) {
      dateModifiedValue = date_modified || today;
    } else if (!isUnchanged(contentValue) || status !== undefined) {
      dateModifiedValue = today;
    }

    // Sentinel-aware values
    const statusValue: string | Unchanged = status !== undefined ? normalizeStatus(status) : UNCHANGED;
    const imageUrlValue: string | null | Unchanged = image_url === undefined ? UNCHANGED : (image_url ?? null);
    const targetUrlValue: string | null | Unchanged = target_url === undefined ? UNCHANGED : (target_url ?? null);
    const schemaJsonldValue: string | null | Unchanged = schema_jsonld === undefined
      ? UNCHANGED
      : (schema_jsonld === null || schema_jsonld === "" ? null : schema_jsonld);

    const [post] = await sql`
      UPDATE posts SET
        title             = COALESCE(${title ?? null}, title),
        slug              = COALESCE(${slug ?? null}, slug),
        content           = COALESCE(${isUnchanged(contentValue) ? null : contentValue}, content),
        excerpt           = COALESCE(${excerpt ?? null}, excerpt),
        image_url         = ${isUnchanged(imageUrlValue) ? sql`image_url` : imageUrlValue},
        image_alt         = COALESCE(${image_alt ?? null}, image_alt),
        category          = COALESCE(${category ?? null}, category),
        author            = COALESCE(${author ?? null}, author),
        published         = COALESCE(${isUnchanged(publishedValue) ? null : publishedValue}, published),
        sort_order        = COALESCE(${sort_order ?? null}, sort_order),
        seo_title         = COALESCE(${seo_title ?? null}, seo_title),
        seo_description   = COALESCE(${seo_description ?? null}, seo_description),
        seo_keywords      = COALESCE(${seo_keywords ?? null}, seo_keywords),
        target_url        = ${isUnchanged(targetUrlValue) ? sql`target_url` : targetUrlValue},
        meta_description  = COALESCE(${meta_description ?? null}, meta_description),
        author_name       = COALESCE(${author_name ?? null}, author_name),
        author_url        = COALESCE(${author_url ?? null}, author_url),
        date_published    = COALESCE(${date_published ?? null}, date_published),
        date_modified     = COALESCE(${isUnchanged(dateModifiedValue) ? null : dateModifiedValue}, date_modified),
        hero_image_url    = COALESCE(${hero_image_url ?? null}, hero_image_url),
        hero_image_alt    = COALESCE(${hero_image_alt ?? null}, hero_image_alt),
        body_markdown     = COALESCE(${body_markdown ?? null}, body_markdown),
        schema_jsonld     = ${isUnchanged(schemaJsonldValue) ? sql`schema_jsonld` : schemaJsonldValue},
        status            = COALESCE(${isUnchanged(statusValue) ? null : statusValue}, status),
        updated_at        = NOW()
      WHERE id = ${numericId}
      RETURNING *
    `;
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ post });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "DB error";
    if (/unique|duplicate/i.test(msg)) {
      return NextResponse.json({ error: msg }, { status: 409 });
    }
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdminFromCookie();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const sql = await ensureDB();
    await sql`DELETE FROM posts WHERE id = ${Number(id)}`;
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}