/**
 * Short-lived cache for unsaved post previews, backed by Postgres.
 *
 * Why Postgres, not in-memory: on Vercel/serverless, each request can be
 * served by a fresh runtime, so a Map-based cache silently loses previews
 * between the POST that creates them and the GET that renders them.
 *
 * The shape `PreviewPost` mirrors the `posts` row shape used by the public
 * reader, so the same `<BlogPostArticle>` component can render either.
 */
import { ensureDB } from "@/lib/db";

export type PreviewPost = {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  image_url: string | null;
  image_alt: string | null;
  category: string;
  author: string;
  published: boolean;
  sort_order: number;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
  target_url: string | null;
  meta_description: string | null;
  author_name: string | null;
  author_url: string | null;
  date_published: string | null;
  date_modified: string | null;
  hero_image_url: string | null;
  hero_image_alt: string | null;
  body_markdown: string | null;
  schema_jsonld: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

const TTL_MS = 10 * 60 * 1000;

function randomToken(): string {
  // 24 chars, URL-safe
  const bytes = new Uint8Array(18);
  crypto.getRandomValues(bytes);
  return Buffer.from(bytes).toString("base64url");
}

export async function putPreview(post: PreviewPost): Promise<string> {
  const sql = await ensureDB();
  const token = randomToken();
  // Pass JSON as a JSON string and let Postgres cast ::jsonb on insert —
  // avoids relying on sql.json()'s stricter JSONValue type.
  const postJson = JSON.stringify(post);
  await sql`
    INSERT INTO post_previews (token, post, expires_at)
    VALUES (${token}, ${postJson}::jsonb, NOW() + INTERVAL '10 minutes')
  `;
  return token;
}

export async function getPreview(token: string): Promise<PreviewPost | null> {
  const sql = await ensureDB();
  // Lazy-prune expired rows once per call (cheap).
  await sql`DELETE FROM post_previews WHERE expires_at < NOW()`;
  const rows = await sql<{ post: PreviewPost }[]>`
    SELECT post FROM post_previews WHERE token = ${token} AND expires_at >= NOW() LIMIT 1
  `;
  const row = rows[0];
  if (!row) return null;
  return row.post;
}

// Keep TTL_MS referenced so future tuning is one constant to change.
void TTL_MS;
