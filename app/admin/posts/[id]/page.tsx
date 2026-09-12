import { ensureDB } from "@/lib/db";
import { getAdminFromCookie } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import PostForm, { type Post } from "@/components/admin/PostForm";

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdminFromCookie();
  if (!admin) redirect("/admin/login");

  const { id } = await params;
  const sql = await ensureDB();

  const numericId = Number(id);
  if (isNaN(numericId)) notFound();

  const rows = await sql`SELECT * FROM posts WHERE id = ${numericId} LIMIT 1`;
  const post = rows[0] as unknown as Post | undefined;
  if (!post) notFound();

  return <PostForm mode="edit" initialPost={post} />;
}