import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { getAdminFromCookie } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdminFromCookie();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const sql = getDB();
    const { name, status, tags } = await req.json();
    const [sub] = await sql`
      UPDATE subscribers SET
        name = COALESCE(${name}, name),
        status = COALESCE(${status}, status),
        tags = COALESCE(${tags}, tags)
      WHERE id = ${Number(id)}
      RETURNING *
    `;
    if (!sub) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ subscriber: sub });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "DB error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdminFromCookie();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const sql = getDB();
    await sql`DELETE FROM subscribers WHERE id = ${Number(id)}`;
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}
