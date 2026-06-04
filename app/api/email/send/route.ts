import { NextRequest, NextResponse } from "next/server";
import { getAdminFromCookie } from "@/lib/auth";

export const dynamic = "force-dynamic";

async function sendViaResend(
  to: string, subject: string, html: string, text: string
) {
  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY!);
  const fromName = process.env.EMAIL_FROM_NAME || "GrowMos";
  const fromAddr = process.env.SMTP_USER || "hello@growmos.com";

  const { error } = await resend.emails.send({
    from: `${fromName} <${fromAddr}>`,
    to,
    subject,
    html,
    text: text || undefined,
  });

  if (error) throw new Error(error.message);
}

async function sendViaSMTP(
  to: string, subject: string, html: string, text: string, replyTo?: string
) {
  const nodemailer = (await import("nodemailer")).default;
  const smtpHost = process.env.SMTP_HOST!;
  const smtpPort = Number(process.env.SMTP_PORT || 465);
  const smtpUser = process.env.SMTP_USER!;
  const smtpPass = process.env.SMTP_PASS!;
  const fromName = process.env.EMAIL_FROM_NAME || "GrowMos";

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
    connectionTimeout: 10000,
    greetingTimeout: 8000,
    socketTimeout: 15000,
  });

  await transporter.sendMail({
    from: `"${fromName}" <${smtpUser}>`,
    to,
    replyTo: replyTo || smtpUser,
    subject,
    html,
    text: text || "",
  });
}

export async function POST(req: NextRequest) {
  const admin = await getAdminFromCookie();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { to, subject, html, text, replyTo } = await req.json();

    if (!to || !subject || !html) {
      return NextResponse.json({ error: "to, subject, and html are required" }, { status: 400 });
    }

    const useResend = !!process.env.RESEND_API_KEY;

    if (useResend) {
      await sendViaResend(to, subject, html, text);
    } else {
      const smtpHost = process.env.SMTP_HOST || "";
      const smtpUser = process.env.SMTP_USER || "";
      const smtpPass = process.env.SMTP_PASS || "";
      if (!smtpHost || !smtpUser || !smtpPass) {
        return NextResponse.json(
          { error: "No email provider configured. Set RESEND_API_KEY or SMTP_HOST/SMTP_USER/SMTP_PASS in .env." },
          { status: 503 }
        );
      }
      await sendViaSMTP(to, subject, html, text, replyTo);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Send email error:", err);
    const raw = err instanceof Error ? err.message : String(err);

    let friendly = raw;
    if (raw.includes("ECONNREFUSED"))
      friendly = "Connection refused — SMTP_HOST or SMTP_PORT is wrong.";
    else if (raw.includes("ETIMEDOUT") || raw.includes("timeout"))
      friendly = "Connection timed out — your network is blocking outbound mail ports. Set RESEND_API_KEY in .env to use Resend instead.";
    else if (raw.includes("535") || raw.includes("534") || raw.includes("AUTH"))
      friendly = "Authentication failed — check SMTP_USER and SMTP_PASS.";
    else if (raw.includes("ENOTFOUND"))
      friendly = `SMTP host "${process.env.SMTP_HOST}" not found — check SMTP_HOST spelling.`;
    else if (raw.includes("domain is not verified") || raw.includes("not verified"))
      friendly = "Resend: sender domain not verified. Verify growmos.com at resend.com/domains.";

    return NextResponse.json({ error: friendly }, { status: 500 });
  }
}
