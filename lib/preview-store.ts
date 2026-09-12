/**
 * In-memory short-lived cache for unsaved post previews.
 *
 * Why in-memory: previews are unsaved drafts. We don't want them persisted to
 * the DB. The cache is per-process; for multi-instance deploys that's a
 * limitation but acceptable since previews are best-effort.
 *
 * TTL: 10 minutes. Old entries are pruned lazily on read.
 */

import type { Post } from "@/components/admin/PostForm";

type Entry = {
  post: Post;
  expiresAt: number;
};

const TTL_MS = 10 * 60 * 1000;
const store = new Map<string, Entry>();

function randomToken(): string {
  // 24 chars, URL-safe
  const bytes = new Uint8Array(18);
  crypto.getRandomValues(bytes);
  return Buffer.from(bytes).toString("base64url");
}

function prune(now: number) {
  for (const [key, entry] of store) {
    if (entry.expiresAt <= now) store.delete(key);
  }
}

export function putPreview(post: Post): string {
  const now = Date.now();
  prune(now);
  const token = randomToken();
  store.set(token, { post, expiresAt: now + TTL_MS });
  return token;
}

export function getPreview(token: string): Post | null {
  const now = Date.now();
  prune(now);
  const entry = store.get(token);
  if (!entry) return null;
  if (entry.expiresAt <= now) {
    store.delete(token);
    return null;
  }
  return entry.post;
}