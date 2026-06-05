import { NextRequest, NextResponse } from "next/server";
import { getAdminFromCookie } from "@/lib/auth";
import { getDB } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const admin = await getAdminFromCookie();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const page  = Math.max(1, parseInt(searchParams.get("page")  || "1"));
  const limit = Math.min(Math.max(1, parseInt(searchParams.get("limit") || "50")), 200);
  const offset = (page - 1) * limit;

  try {
    const sql = getDB();

    const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM received_emails`;
    const rows = await sql`
      SELECT id, from_address, from_name, to_address, subject, read, received_at
      FROM received_emails
      ORDER BY received_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;

    const emails = rows.map(r => ({
      uid:     r.id,
      subject: r.subject || "(no subject)",
      from: { name: r.from_name, address: r.from_address },
      date:    r.received_at,
      read:    r.read,
    }));

    return NextResponse.json({
      emails,
      total:  count,
      page,
      limit,
      pages:  Math.ceil(count / limit),
    });
  } catch (err) {
    console.error("Inbox error:", err);
    return NextResponse.json({ error: "Failed to load inbox" }, { status: 500 });
  }
}
