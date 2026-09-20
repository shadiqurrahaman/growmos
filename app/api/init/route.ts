import { NextResponse } from "next/server";
import { ensureDB } from "@/lib/db";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const sql = await ensureDB();
    // Verify the new columns exist
    const cols = await sql`
      SELECT column_name FROM information_schema.columns
      WHERE table_name = 'posts'
      ORDER BY ordinal_position
    `;
    return NextResponse.json({
      success: true,
      message: "Database initialized.",
      columns: (cols as unknown as { column_name: string }[]).map((c) => c.column_name),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Init failed", details: String(err) }, { status: 500 });
  }
}
