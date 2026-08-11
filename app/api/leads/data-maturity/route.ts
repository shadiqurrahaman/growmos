import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getDB } from "@/lib/db";

interface LeadPayload {
 name?: string;
 email?: string;
 company?: string;
 role?: string;
 company_size?: string;
 current_stack?: string;
 biggest_pain?: string;
}

export async function POST(req: NextRequest) {
 try {
 const body = (await req.json()) as LeadPayload;
 const name = (body?.name || "").trim();
 const email = (body?.email || "").trim();

 if (!name || !email) {
 return NextResponse.json(
 { error: "Name and email are required." },
 { status: 400 }
 );
 }

 // Save to DB
 try {
 const sql = getDB();
 await sql`
 INSERT INTO data_maturity_leads (
 name, email, company, role, company_size, current_stack, biggest_pain
 ) VALUES (
 ${name},
 ${email},
 ${body.company || null},
 ${body.role || null},
 ${body.company_size || null},
 ${body.current_stack || null},
 ${body.biggest_pain || null}
 )
 `;
 } catch (dbErr) {
 console.error("DB save error (data-maturity lead):", dbErr);
 return NextResponse.json(
 { error: "Could not save your details. Please try again." },
 { status: 500 }
 );
 }

 // Send notification email (best-effort)
 if (process.env.SMTP_USER && process.env.SMTP_PASS) {
 try {
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
 subject: `Data Maturity Lead: ${name} (${body.company || "Unknown company"})`,
 html: `
 <h2>New Data Maturity Assessment Lead</h2>
 <p><strong>Name:</strong> ${name}</p>
 <p><strong>Email:</strong> ${email}</p>
 <p><strong>Company:</strong> ${body.company || "Not provided"}</p>
 <p><strong>Role:</strong> ${body.role || "Not provided"}</p>
 <p><strong>Company size:</strong> ${body.company_size || "Not provided"}</p>
 <p><strong>Current stack:</strong> ${body.current_stack || "Not provided"}</p>
 <p><strong>Biggest pain:</strong> ${(body.biggest_pain || "Not provided").replace(/\n/g, "<br>")}</p>
 `,
 });
 } catch (mailErr) {
 // Don't fail the request if email fails the lead is already saved.
 console.error("Email notification error (data-maturity lead):", mailErr);
 }
 }

 return NextResponse.json({ success: true });
 } catch (err) {
 console.error("Data-maturity lead form error:", err);
 return NextResponse.json(
 { error: "Failed to submit. Please try again." },
 { status: 500 }
 );
 }
}
