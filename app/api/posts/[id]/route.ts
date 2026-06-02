import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { getAdminFromCookie } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const sql = getDB();
    const isSlug = isNaN(Number(id));
    const [post] = isSlug
      ? await sql`SELECT * FROM posts WHERE slug = ${id}`
      : await sql`SELECT * FROM posts WHERE id = ${Number(id)}`;
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
  try {
    const sql = getDB();
    const { title, slug, content, excerpt, image_url, category, author, published, sort_order } = await req.json();
    const [post] = await sql`
      UPDATE posts SET
        title = COALESCE(${title}, title),
        slug = COALESCE(${slug}, slug),
        content = COALESCE(${content}, content),
        excerpt = COALESCE(${excerpt}, excerpt),
        image_url = ${image_url ?? null},
        category = COALESCE(${category}, category),
        author = COALESCE(${author}, author),
        published = COALESCE(${published}, published),
        sort_order = COALESCE(${sort_order}, sort_order),
        updated_at = NOW()
      WHERE id = ${Number(id)}
      RETURNING *
    `;
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ post });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "DB error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdminFromCookie();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const sql = getDB();
    await sql`DELETE FROM posts WHERE id = ${Number(id)}`;
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}
