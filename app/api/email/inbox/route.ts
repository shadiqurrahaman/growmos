import { NextRequest, NextResponse } from "next/server";
import { getAdminFromCookie } from "@/lib/auth";
import { ImapFlow } from "imapflow";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const admin = await getAdminFromCookie();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const folder = searchParams.get("folder") || "INBOX";
  const limit = Math.min(parseInt(searchParams.get("limit") || "30"), 100);

  const imapHost = process.env.IMAP_HOST || "mail.growmos.com";
  const imapPort = parseInt(process.env.IMAP_PORT || "993");
  const imapUser = process.env.IMAP_USER || process.env.SMTP_USER || "";
  const imapPass = process.env.IMAP_PASS || process.env.SMTP_PASS || "";

  if (!imapUser || !imapPass) {
    return NextResponse.json({ error: "IMAP credentials not configured" }, { status: 503 });
  }

  const client = new ImapFlow({
    host: imapHost,
    port: imapPort,
    secure: imapPort === 993,
    auth: { user: imapUser, pass: imapPass },
    logger: false,
  });

  try {
    await client.connect();
    const lock = await client.getMailboxLock(folder);
    const emails: object[] = [];

    try {
      const mailbox = client.mailbox as { exists?: number } | undefined;
      const total = mailbox?.exists || 0;
      if (total > 0) {
        const from = Math.max(1, total - limit + 1);
        for await (const msg of client.fetch(`${from}:${total}`, {
          envelope: true,
          flags: true,
          bodyStructure: false,
        })) {
          emails.unshift({
            uid: msg.uid,
            seq: msg.seq,
            subject: msg.envelope?.subject || "(no subject)",
            from: msg.envelope?.from?.[0] ?? null,
            to: msg.envelope?.to?.[0] ?? null,
            date: msg.envelope?.date ?? null,
            flags: [...(msg.flags || [])],
            read: msg.flags?.has("\\Seen") ?? false,
          });
        }
      }
    } finally {
      lock.release();
    }

    await client.logout();
    return NextResponse.json({ emails, folder });
  } catch (err) {
    console.error("IMAP error:", err);
    const msg = err instanceof Error ? err.message : "IMAP connection failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
