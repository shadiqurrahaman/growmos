import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { getAdminFromCookie } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const published = searchParams.get("published");
  const limit = parseInt(searchParams.get("limit") || "50");
  const offset = parseInt(searchParams.get("offset") || "0");

  try {
    const sql = getDB();
    let posts;
    if (published === "true") {
      posts = await sql`
        SELECT id, title, slug, excerpt, image_url, category, author, created_at
        FROM posts WHERE published = true
        ORDER BY sort_order DESC, created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
    } else {
      posts = await sql`
        SELECT id, title, slug, excerpt, image_url, category, author, published, sort_order, created_at, updated_at
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
    const sql = getDB();
    const { title, slug, content, excerpt, image_url, category, author, published, sort_order } = await req.json();
    if (!title || !slug || !content) {
      return NextResponse.json({ error: "title, slug, and content are required" }, { status: 400 });
    }
    const [post] = await sql`
      INSERT INTO posts (title, slug, content, excerpt, image_url, category, author, published, sort_order)
      VALUES (${title}, ${slug}, ${content}, ${excerpt||""}, ${image_url||null}, ${category||"Blog"}, ${author||"GrowMos Team"}, ${published??false}, ${sort_order??0})
      RETURNING *
    `;
    return NextResponse.json({ post }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "DB error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
