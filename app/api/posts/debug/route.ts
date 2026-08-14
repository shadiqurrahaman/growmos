import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export const dynamic = "force-dynamic";

/**
 * Debug endpoint for verifying the posts table on production.
 * Returns counts + a sample of the latest rows so you can confirm
 * whether `published = true` rows are missing on live.
 *
 * Hit: GET /api/posts/debug
 *
 * Safe to keep enabled — it only reads. No PII, no auth required.
 */
export async function GET() {
  try {
    const sql = getDB();
    const total = await sql`SELECT COUNT(*)::int AS n FROM posts`;
    const published = await sql`SELECT COUNT(*)::int AS n FROM posts WHERE published = true`;
    const sample = await sql`
      SELECT id, title, slug, published, created_at
      FROM posts
      ORDER BY created_at DESC
      LIMIT 10
    `;
    return NextResponse.json({
      ok: true,
      db_url_set: Boolean(process.env.DATABASE_URL),
      total: total[0]?.n ?? 0,
      published: published[0]?.n ?? 0,
      recent: sample,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "DB error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
