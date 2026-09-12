import { NextRequest, NextResponse } from "next/server";
import { ensureDB } from "@/lib/db";
import { getAdminFromCookie } from "@/lib/auth";
import { compileMarkdownServer } from "@/lib/markdown.server";
import { sanitizeHtml } from "@/lib/sanitize";
import { validateSchemaJsonld } from "@/lib/schema-validator";

export const dynamic = "force-dynamic";

const ALLOWED_STATUS = new Set(["draft", "review", "published"]);

function compileContentIfMarkdown(row: { body_markdown?: unknown; content?: unknown }) {
  if (typeof row.body_markdown === "string" && row.body_markdown.length > 0) {
    return compileMarkdownServer(row.body_markdown);
  }
  // Fallback: if content was passed but body_markdown was not, still sanitize it.
  if (typeof row.content === "string") {
    return sanitizeHtml(row.content);
  }
  return "";
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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const published = searchParams.get("published");
  const limit = parseInt(searchParams.get("limit") || "50");
  const offset = parseInt(searchParams.get("offset") || "0");
  const sort = searchParams.get("sort") || "default"; // "default" | "recent"

  try {
    const sql = await ensureDB();
    let posts;
    // Public consumers only see status='published'. Admin (no `published` param
    // or `published=all`) sees every status.
    if (published === "true") {
      posts = sort === "recent"
        ? await sql`
            SELECT id, title, slug, excerpt, image_url, image_alt, category, author, status, hero_image_url, hero_image_alt, date_published, date_modified, target_url, created_at, updated_at
            FROM posts WHERE status = 'published'
            ORDER BY COALESCE(updated_at, created_at) DESC, created_at DESC
            LIMIT ${limit} OFFSET ${offset}
          `
        : await sql`
            SELECT id, title, slug, excerpt, image_url, image_alt, category, author, status, hero_image_url, hero_image_alt, date_published, date_modified, target_url, created_at, updated_at
            FROM posts WHERE status = 'published'
            ORDER BY sort_order DESC, created_at DESC
            LIMIT ${limit} OFFSET ${offset}
          `;
    } else {
      posts = sort === "recent"
        ? await sql`
            SELECT *
            FROM posts
            ORDER BY COALESCE(updated_at, created_at) DESC, created_at DESC
            LIMIT ${limit} OFFSET ${offset}
          `
        : await sql`
            SELECT *
            FROM posts
            ORDER BY sort_order DESC, created_at DESC
            LIMIT ${limit} OFFSET ${offset}
          `;
    }
    return NextResponse.json({ posts });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = await getAdminFromCookie();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const sql = await ensureDB();
    const body = await req.json();

    const {
      // Old fields
      title, slug, content, excerpt, image_url, image_alt, category, author,
      published, sort_order, seo_title, seo_description, seo_keywords,
      // New fields
      target_url, meta_description, author_name, author_url,
      date_published, date_modified,
      hero_image_url, hero_image_alt,
      body_markdown, schema_jsonld, status,
    } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: "title and slug are required" }, { status: 400 });
    }

    // Validate target_url uniqueness (excluding self — N/A on POST)
    if (target_url) {
      const [exists] = await sql`SELECT id FROM posts WHERE target_url = ${target_url} LIMIT 1`;
      if (exists) {
        return NextResponse.json({ error: "target_url already in use by another post" }, { status: 409 });
      }
    }

    // Validate JSON-LD
    const jld = validateSchemaJsonld(schema_jsonld);
    if (!jld.ok) {
      return NextResponse.json({ error: jld.error, field: "schema_jsonld" }, { status: 400 });
    }

    // Normalize status / published
    const normalizedStatus = normalizeStatus(status);
    const publishedBool = published ?? (normalizedStatus === "published");

    // Body compilation: markdown wins over content
    const finalContent = compileContentIfMarkdown({ body_markdown, content });

    const today = todayIsoDate();
    const finalDatePublished = date_published || today;
    const finalDateModified = date_modified || today;

    const [post] = await sql`
      INSERT INTO posts (
        title, slug, content, excerpt, image_url, image_alt, category, author, published, sort_order,
        seo_title, seo_description, seo_keywords,
        target_url, meta_description, author_name, author_url,
        date_published, date_modified, hero_image_url, hero_image_alt,
        body_markdown, schema_jsonld, status
      ) VALUES (
        ${title}, ${slug}, ${finalContent}, ${excerpt ?? ""}, ${image_url ?? null}, ${image_alt ?? null},
        ${category ?? "Blog"}, ${author ?? "GrowMos Team"}, ${publishedBool}, ${sort_order ?? 0},
        ${seo_title ?? null}, ${seo_description ?? null}, ${seo_keywords ?? null},
        ${target_url ?? null}, ${meta_description ?? null}, ${author_name ?? null}, ${author_url ?? null},
        ${finalDatePublished}, ${finalDateModified}, ${hero_image_url ?? null}, ${hero_image_alt ?? null},
        ${body_markdown ?? null}, ${jld.json || null}, ${normalizedStatus}
      )
      RETURNING *
    `;
    return NextResponse.json({ post }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "DB error";
    // Postgres unique-violation surface
    if (/unique|duplicate/i.test(msg)) {
      return NextResponse.json({ error: msg }, { status: 409 });
    }
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}