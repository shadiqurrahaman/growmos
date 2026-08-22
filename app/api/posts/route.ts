import { NextRequest, NextResponse } from "next/server";
import { ensureDB } from "@/lib/db";
import { getAdminFromCookie } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const published = searchParams.get("published");
  const limit = parseInt(searchParams.get("limit") || "50");
  const offset = parseInt(searchParams.get("offset") || "0");
  const sort = searchParams.get("sort") || "default"; // "default" | "recent"

  try {
    const sql = await ensureDB();
    let posts;
    // "recent" = most recently created OR updated first. Falls back to created_at
    // for posts whose updated_at equals created_at (never edited).
    if (published === "true") {
      posts = sort === "recent"
        ? await sql`
            SELECT id, title, slug, excerpt, image_url, image_alt, category, author, created_at, updated_at
            FROM posts WHERE published = true
            ORDER BY COALESCE(updated_at, created_at) DESC, created_at DESC
            LIMIT ${limit} OFFSET ${offset}
          `
        : await sql`
            SELECT id, title, slug, excerpt, image_url, image_alt, category, author, created_at
            FROM posts WHERE published = true
            ORDER BY sort_order DESC, created_at DESC
            LIMIT ${limit} OFFSET ${offset}
          `;
    } else {
      posts = sort === "recent"
        ? await sql`
            SELECT id, title, slug, excerpt, image_url, image_alt, category, author, published, sort_order, created_at, updated_at, seo_title, seo_description, seo_keywords
            FROM posts
            ORDER BY COALESCE(updated_at, created_at) DESC, created_at DESC
            LIMIT ${limit} OFFSET ${offset}
          `
        : await sql`
            SELECT id, title, slug, excerpt, image_url, image_alt, category, author, published, sort_order, created_at, updated_at, seo_title, seo_description, seo_keywords
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
    const { title, slug, content, excerpt, image_url, image_alt, category, author, published, sort_order, seo_title, seo_description, seo_keywords } = await req.json();
    if (!title || !slug || !content) {
      return NextResponse.json({ error: "title, slug, and content are required" }, { status: 400 });
    }
    const [post] = await sql`
      INSERT INTO posts (title, slug, content, excerpt, image_url, image_alt, category, author, published, sort_order, seo_title, seo_description, seo_keywords)
      VALUES (${title}, ${slug}, ${content}, ${excerpt||""}, ${image_url||null}, ${image_alt||null}, ${category||"Blog"}, ${author||"GrowMos Team"}, ${published??false}, ${sort_order??0}, ${seo_title||null}, ${seo_description||null}, ${seo_keywords||null})
      RETURNING *
    `;
    return NextResponse.json({ post }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "DB error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
