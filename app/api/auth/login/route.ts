import { NextRequest, NextResponse } from "next/server";
import { createToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const adminPass = process.env.ADMIN_PASSWORD || "growmos2024";

  if (password !== adminPass) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  const token = await createToken();
  const res = NextResponse.json({ success: true });
  res.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return res;
}
