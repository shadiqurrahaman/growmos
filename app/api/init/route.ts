import { NextResponse } from "next/server";
import { initDB } from "@/lib/db";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await initDB();
    return NextResponse.json({ success: true, message: "Database initialized." });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Init failed" }, { status: 500 });
  }
}
