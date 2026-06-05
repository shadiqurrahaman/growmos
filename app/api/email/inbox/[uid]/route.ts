import { NextRequest, NextResponse } from "next/server";
import { getAdminFromCookie } from "@/lib/auth";
import { getDB } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ uid: string }> }
) {
  const admin = await getAdminFromCookie();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { uid } = await params;
  const id = parseInt(uid);
  if (isNaN(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  try {
    const sql = getDB();
    const [row] = await sql`
      SELECT * FROM received_emails WHERE id = ${id}
    `;
    if (!row) return NextResponse.json({ error: "Email not found" }, { status: 404 });

    // Mark as read
    await sql`UPDATE received_emails SET read = true WHERE id = ${id}`;

    return NextResponse.json({
      email: {
        uid:     row.id,
        subject: row.subject,
        from:  { name: row.from_name, address: row.from_address },
        to:      row.to_address,
        date:    row.received_at,
        html:    row.html || null,
        text:    row.text || null,
      },
    });
  } catch (err) {
    console.error("Fetch email error:", err);
    return NextResponse.json({ error: "Failed to load email" }, { status: 500 });
  }
}
