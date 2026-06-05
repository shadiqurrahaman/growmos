import { NextRequest, NextResponse } from "next/server";
import { getAdminFromCookie } from "@/lib/auth";
import { getDB } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const admin = await getAdminFromCookie();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sql = getDB();
  await sql`
    INSERT INTO received_emails (from_address, from_name, to_address, subject, html, text)
    VALUES (
      'test@example.com',
      'Test Sender',
      'hello@reply.growmos.com',
      'Test email from inbound',
      '<p>This is a <strong>test email</strong> to verify your inbox is working.</p>',
      'This is a test email to verify your inbox is working.'
    )
  `;

  return NextResponse.json({ success: true, message: "Test email inserted into inbox." });
}
