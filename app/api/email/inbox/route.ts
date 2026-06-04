import { NextRequest, NextResponse } from "next/server";
import { getAdminFromCookie } from "@/lib/auth";
import { ImapFlow } from "imapflow";

export const dynamic = "force-dynamic";

function makeClient() {
  return new ImapFlow({
    host: process.env.IMAP_HOST || "mail.growmos.com",
    port: parseInt(process.env.IMAP_PORT || "993"),
    secure: parseInt(process.env.IMAP_PORT || "993") === 993,
    auth: {
      user: process.env.IMAP_USER || process.env.SMTP_USER || "",
      pass: process.env.IMAP_PASS || process.env.SMTP_PASS || "",
    },
    logger: false,
    connectionTimeout: 10000,
    greetingTimeout: 8000,
  });
}

export async function GET(req: NextRequest) {
  const admin = await getAdminFromCookie();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const imapUser = process.env.IMAP_USER || process.env.SMTP_USER || "";
  const imapPass = process.env.IMAP_PASS || process.env.SMTP_PASS || "";
  if (!imapUser || !imapPass) {
    return NextResponse.json({ error: "IMAP credentials not configured. Set IMAP_HOST, IMAP_USER, IMAP_PASS in your .env." }, { status: 503 });
  }

  const { searchParams } = new URL(req.url);
  const folder = searchParams.get("folder") || "INBOX";
  // page=1 is newest, page=2 is older, etc.
  const page  = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(Math.max(1, parseInt(searchParams.get("limit") || "50")), 200);

  const client = makeClient();

  try {
    await client.connect();
    const lock = await client.getMailboxLock(folder);
    const emails: object[] = [];
    let total = 0;

    try {
      const mailbox = client.mailbox as { exists?: number } | undefined;
      total = mailbox?.exists || 0;

      if (total > 0) {
        // newest-first pagination: page 1 = last `limit` messages
        const seqEnd   = total - (page - 1) * limit;
        const seqStart = Math.max(1, seqEnd - limit + 1);

        if (seqEnd >= 1) {
          for await (const msg of client.fetch(`${seqStart}:${seqEnd}`, {
            envelope: true,
            flags: true,
            bodyStructure: false,
          })) {
            emails.unshift({
              uid:     msg.uid,
              seq:     msg.seq,
              subject: msg.envelope?.subject || "(no subject)",
              from:    msg.envelope?.from?.[0] ?? null,
              to:      msg.envelope?.to?.[0] ?? null,
              date:    msg.envelope?.date ?? null,
              flags:   [...(msg.flags || [])],
              read:    msg.flags?.has("\\Seen") ?? false,
            });
          }
        }
      }
    } finally {
      lock.release();
    }

    await client.logout();
    return NextResponse.json({
      emails,
      folder,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("IMAP error:", err);
    const raw = err instanceof Error ? err.message : "IMAP connection failed";
    let friendly = raw;
    if (raw.includes("ETIMEDOUT") || raw.includes("timeout"))
      friendly = `Connection timed out — check IMAP_HOST (${process.env.IMAP_HOST}) and IMAP_PORT.`;
    else if (raw.includes("AUTH") || raw.includes("535"))
      friendly = "Authentication failed — check IMAP_USER and IMAP_PASS in .env.";
    else if (raw.includes("ENOTFOUND"))
      friendly = `IMAP host "${process.env.IMAP_HOST}" not found — check IMAP_HOST spelling.`;
    return NextResponse.json({ error: friendly }, { status: 500 });
  }
}
