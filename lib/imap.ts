import { ImapFlow } from "imapflow";
import { simpleParser, type ParsedMail, type AddressObject } from "mailparser";
import { getDB } from "@/lib/db";

function parseAddress(addr: AddressObject | AddressObject[] | undefined): { name: string | null; address: string } {
  const obj = Array.isArray(addr) ? addr[0] : addr;
  const val = obj?.value?.[0];
  return { name: val?.name || null, address: val?.address || "" };
}

function toBuffer(source: Buffer | undefined): Buffer {
  if (!source) throw new Error("Missing message source");
  return source;
}

export async function syncInbox(): Promise<number> {
  const host = process.env.IMAP_HOST;
  const port = parseInt(process.env.IMAP_PORT || "993");
  const user = process.env.IMAP_USER;
  const pass = process.env.IMAP_PASS;

  if (!host || !user || !pass) {
    throw new Error("IMAP_HOST, IMAP_USER, and IMAP_PASS env vars are required");
  }

  const client = new ImapFlow({
    host,
    port,
    secure: port === 993,
    auth: { user, pass },
    logger: false,
  });

  await client.connect();

  let inserted = 0;

  try {
    const lock = await client.getMailboxLock("INBOX");
    try {
      const sql = getDB();

      const status = await client.status("INBOX", { messages: true });
      const total = status.messages ?? 0;
      if (total === 0) return 0;

      const from = Math.max(1, total - 99);
      const range = `${from}:${total}`;

      for await (const msg of client.fetch(range, { source: true })) {
        let parsed: ParsedMail;
        try {
          parsed = await simpleParser(toBuffer(msg.source));
        } catch {
          continue;
        }

        const messageId = parsed.messageId ?? null;
        const subject   = parsed.subject ?? "(no subject)";
        const html      = typeof parsed.html === "string" ? parsed.html : null;
        const text      = parsed.text ?? null;
        const date      = parsed.date ?? new Date();

        const fromParsed = parseAddress(parsed.from);
        const toParsed   = parseAddress(parsed.to as AddressObject | undefined);

        const result = await sql`
          INSERT INTO received_emails
            (from_address, from_name, to_address, subject, html, text, received_at, message_id)
          VALUES
            (${fromParsed.address}, ${fromParsed.name}, ${toParsed.address},
             ${subject}, ${html}, ${text}, ${date}, ${messageId})
          ON CONFLICT (message_id) DO NOTHING
        `;

        if (result.count > 0) inserted++;
      }
    } finally {
      lock.release();
    }
  } finally {
    await client.logout();
  }

  return inserted;
}
