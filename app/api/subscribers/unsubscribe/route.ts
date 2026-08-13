import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const sql = getDB();
    const body = await req.json().catch(() => ({}));
    const email = (body?.email || "").toString().trim().toLowerCase();

    if (!email) {
      return NextResponse.json({ error: "email is required" }, { status: 400 });
    }

    const [sub] = await sql`
      UPDATE subscribers
      SET status = 'unsubscribed'
      WHERE LOWER(email) = ${email}
      RETURNING id, email, status
    `;

    if (!sub) {
      // Email was never in our list — treat as success so users aren't pestered
      return NextResponse.json({ success: true, alreadyUnsubscribed: true });
    }

    return NextResponse.json({ success: true, subscriber: sub });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "DB error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// Allow GET for one-click unsubscribe links from email headers (RFC 8058)
export async function GET(req: NextRequest) {
  try {
    const sql = getDB();
    const url = new URL(req.url);
    const email = (url.searchParams.get("email") || "").trim().toLowerCase();

    if (!email) {
      return NextResponse.json({ error: "email is required" }, { status: 400 });
    }

    const [sub] = await sql`
      UPDATE subscribers
      SET status = 'unsubscribed'
      WHERE LOWER(email) = ${email}
      RETURNING id, email, status
    `;

    if (!sub) {
      return NextResponse.json({ success: true, alreadyUnsubscribed: true });
    }

    return NextResponse.json({ success: true, subscriber: sub });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "DB error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}