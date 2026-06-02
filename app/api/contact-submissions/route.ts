import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { getAdminFromCookie } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest) {
  const admin = await getAdminFromCookie();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const sql = getDB();
    const submissions = await sql`SELECT * FROM contact_submissions ORDER BY created_at DESC`;
    return NextResponse.json({ submissions });
  } catch {
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const admin = await getAdminFromCookie();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const sql = getDB();
    const { id, read, replied } = await req.json();
    await sql`
      UPDATE contact_submissions SET
        read = COALESCE(${read}, read),
        replied = COALESCE(${replied}, replied)
      WHERE id = ${Number(id)}
    `;
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}
