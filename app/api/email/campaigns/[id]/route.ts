import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { getAdminFromCookie } from "@/lib/auth";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdminFromCookie();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const sql = getDB();
    const [campaign] = await sql`SELECT * FROM email_campaigns WHERE id = ${Number(id)}`;
    if (!campaign) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ campaign });
  } catch {
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdminFromCookie();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const sql = getDB();
    const { subject, from_name, reply_to, html_body, text_body } = await req.json();
    const [campaign] = await sql`
      UPDATE email_campaigns SET
        subject = COALESCE(${subject}, subject),
        from_name = COALESCE(${from_name}, from_name),
        reply_to = ${reply_to ?? null},
        html_body = COALESCE(${html_body}, html_body),
        text_body = ${text_body ?? null}
      WHERE id = ${Number(id)} AND status = 'draft'
      RETURNING *
    `;
    if (!campaign) return NextResponse.json({ error: "Not found or already sent" }, { status: 404 });
    return NextResponse.json({ campaign });
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
    await sql`DELETE FROM email_campaigns WHERE id = ${Number(id)} AND status = 'draft'`;
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}

// POST /api/email/campaigns/[id]/send → handled via action=send query param
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdminFromCookie();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const sql = getDB();

  try {
    const [campaign] = await sql`SELECT * FROM email_campaigns WHERE id = ${Number(id)}`;
    if (!campaign) return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
    if (campaign.status === "sent") return NextResponse.json({ error: "Already sent" }, { status: 400 });

    const subscribers = await sql`SELECT * FROM subscribers WHERE status = 'active'`;
    if (subscribers.length === 0) {
      return NextResponse.json({ error: "No active subscribers" }, { status: 400 });
    }

    await sql`UPDATE email_campaigns SET status = 'sending', recipient_count = ${subscribers.length} WHERE id = ${Number(id)}`;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "mail.growmos.com",
      port: Number(process.env.SMTP_PORT) || 465,
      secure: Number(process.env.SMTP_PORT || 465) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    const fromAddr = process.env.SMTP_USER || "hello@growmos.com";
    let sent = 0;

    for (const sub of subscribers) {
      try {
        const unsubLink = `${process.env.NEXT_PUBLIC_BASE_URL || "https://growmos.com"}/unsubscribe?email=${encodeURIComponent(sub.email)}`;
        const htmlWithFooter = `${campaign.html_body}
<br/><br/><hr style="border:none;border-top:1px solid #eee;margin:20px 0"/>
<p style="font-size:12px;color:#999;text-align:center">
  You're receiving this because you subscribed to GrowMos updates.<br/>
  <a href="${unsubLink}" style="color:#999">Unsubscribe</a>
</p>`;

        await transporter.sendMail({
          from: `"${campaign.from_name}" <${fromAddr}>`,
          to: sub.email,
          replyTo: campaign.reply_to || fromAddr,
          subject: campaign.subject,
          html: htmlWithFooter,
          text: campaign.text_body || "",
        });
        sent++;
      } catch (e) {
        console.error(`Failed to send to ${sub.email}:`, e);
      }
    }

    await sql`
      UPDATE email_campaigns
      SET status = 'sent', sent_count = ${sent}, sent_at = NOW()
      WHERE id = ${Number(id)}
    `;

    return NextResponse.json({ success: true, sent, total: subscribers.length });
  } catch (err) {
    await sql`UPDATE email_campaigns SET status = 'failed' WHERE id = ${Number(id)}`;
    const msg = err instanceof Error ? err.message : "Send error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
