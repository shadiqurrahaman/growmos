import { NextResponse } from "next/server";
import { getAdminFromCookie } from "@/lib/auth";
import { syncInbox } from "@/lib/imap";

export const dynamic = "force-dynamic";

export async function POST() {
  const admin = await getAdminFromCookie();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const newEmails = await syncInbox();
    return NextResponse.json({ success: true, newEmails });
  } catch (err) {
    console.error("IMAP sync error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Sync failed" },
      { status: 500 }
    );
  }
}
