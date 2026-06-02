import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { getAdminFromCookie } from "@/lib/auth";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest) {
  const admin = await getAdminFromCookie();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const sql = getDB();
    const campaigns = await sql`
      SELECT * FROM email_campaigns ORDER BY created_at DESC
    `;
    return NextResponse.json({ campaigns });
  } catch {
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = await getAdminFromCookie();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const sql = getDB();
    const { subject, from_name, reply_to, html_body, text_body } = await req.json();

    if (!subject || !html_body) {
      return NextResponse.json({ error: "subject and html_body are required" }, { status: 400 });
    }

    const [campaign] = await sql`
      INSERT INTO email_campaigns (subject, from_name, reply_to, html_body, text_body)
      VALUES (${subject}, ${from_name || "GrowMos"}, ${reply_to || null}, ${html_body}, ${text_body || null})
      RETURNING *
    `;

    return NextResponse.json({ campaign }, { status: 201 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "DB error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
