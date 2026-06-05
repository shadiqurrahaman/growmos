import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export const dynamic = "force-dynamic";

// Resend posts to this endpoint when an email arrives at reply.growmos.com
export async function POST(req: NextRequest) {
  // Verify secret token to prevent abuse
  const secret = req.nextUrl.searchParams.get("secret");
  if (!process.env.RESEND_WEBHOOK_SECRET || secret !== process.env.RESEND_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    // Resend inbound payload: { type, created_at, data: { from, to, subject, html, text } }
    const data = body?.data ?? body;

    const rawFrom: string = data?.from ?? "";
    const subject: string  = data?.subject ?? "(no subject)";
    const html: string     = data?.html    ?? "";
    const text: string     = data?.text    ?? "";
    const toField          = Array.isArray(data?.to) ? data.to[0] : (data?.to ?? "");

    // Parse "Name <email>" format
    const nameMatch = rawFrom.match(/^(.+?)\s*<(.+?)>$/);
    const fromName    = nameMatch ? nameMatch[1].trim() : null;
    const fromAddress = nameMatch ? nameMatch[2].trim() : rawFrom.trim();

    const sql = getDB();
    await sql`
      INSERT INTO received_emails (from_address, from_name, to_address, subject, html, text)
      VALUES (${fromAddress}, ${fromName}, ${toField}, ${subject}, ${html || null}, ${text || null})
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Inbound webhook error:", err);
    return NextResponse.json({ error: "Failed to store email" }, { status: 500 });
  }
}
