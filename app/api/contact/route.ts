import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getDB } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, service, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    // Save to DB
    try {
      const sql = getDB();
      await sql`
        INSERT INTO contact_submissions (name, email, phone, service, message)
        VALUES (${name}, ${email}, ${phone || null}, ${service || null}, ${message})
      `;
    } catch (dbErr) {
      console.error("DB save error:", dbErr);
    }

    // Send email notification
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "mail.growmos.com",
        port: Number(process.env.SMTP_PORT) || 465,
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"GrowMos Website" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_TO || "hello@growmos.com",
        replyTo: email,
        subject: `New Contact: ${name} – ${service || "General Enquiry"}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>Service:</strong> ${service || "Not specified"}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
