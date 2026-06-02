import { NextRequest, NextResponse } from "next/server";
import { getAdminFromCookie } from "@/lib/auth";
import { ImapFlow } from "imapflow";
import { simpleParser } from "mailparser";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ uid: string }> }
) {
  const admin = await getAdminFromCookie();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { uid } = await params;
  const { searchParams } = new URL(req.url);
  const folder = searchParams.get("folder") || "INBOX";

  const client = new ImapFlow({
    host: process.env.IMAP_HOST || "mail.growmos.com",
    port: parseInt(process.env.IMAP_PORT || "993"),
    secure: parseInt(process.env.IMAP_PORT || "993") === 993,
    auth: {
      user: process.env.IMAP_USER || process.env.SMTP_USER || "",
      pass: process.env.IMAP_PASS || process.env.SMTP_PASS || "",
    },
    logger: false,
  });

  try {
    await client.connect();
    const lock = await client.getMailboxLock(folder);
    let email = null;

    try {
      const msg = await client.fetchOne(`${uid}`, { source: true }, { uid: true });
      if (msg && (msg as { source?: Buffer }).source) {
        const parsed = await simpleParser((msg as { source: Buffer }).source);
        email = {
          uid,
          subject: parsed.subject,
          from: parsed.from?.value?.[0] ?? null,
          to: parsed.to,
          date: parsed.date,
          html: parsed.html || null,
          text: parsed.text || null,
          attachments: parsed.attachments?.map((a) => ({
            filename: a.filename,
            contentType: a.contentType,
            size: a.size,
          })) ?? [],
        };
        await client.messageFlagsAdd(`${uid}`, ["\\Seen"], { uid: true });
      }
    } finally {
      lock.release();
    }

    await client.logout();
    if (!email) return NextResponse.json({ error: "Email not found" }, { status: 404 });
    return NextResponse.json({ email });
  } catch (err) {
    console.error("IMAP fetch error:", err);
    const msg = err instanceof Error ? err.message : "IMAP error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
