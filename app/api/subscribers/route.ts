import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { getAdminFromCookie } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest) {
  const admin = await getAdminFromCookie();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const sql = getDB();
    const subscribers = await sql`SELECT * FROM subscribers ORDER BY created_at DESC`;
    return NextResponse.json({ subscribers });
  } catch {
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const sql = getDB();
    const { email, name, tags } = await req.json();

    if (!email) return NextResponse.json({ error: "email is required" }, { status: 400 });

    const [sub] = await sql`
      INSERT INTO subscribers (email, name, tags)
      VALUES (${email}, ${name || null}, ${tags || []})
      ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name, status = 'active'
      RETURNING *
    `;

    return NextResponse.json({ subscriber: sub }, { status: 201 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "DB error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
