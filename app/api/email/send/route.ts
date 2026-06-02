import { NextRequest, NextResponse } from "next/server";
import { getAdminFromCookie } from "@/lib/auth";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "mail.growmos.com",
    port: Number(process.env.SMTP_PORT) || 465,
    secure: Number(process.env.SMTP_PORT || 465) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
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

    const transporter = createTransporter();
    const fromName = process.env.EMAIL_FROM_NAME || "GrowMos";
    const fromAddr = process.env.SMTP_USER || "hello@growmos.com";

    await transporter.sendMail({
      from: `"${fromName}" <${fromAddr}>`,
      to,
      replyTo: replyTo || fromAddr,
      subject,
      html,
      text: text || "",
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Send email error:", err);
    const msg = err instanceof Error ? err.message : "Failed to send";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
