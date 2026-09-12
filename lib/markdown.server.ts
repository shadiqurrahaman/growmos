import { marked } from "marked";
import { sanitizeHtml } from "./sanitize";

marked.setOptions({ gfm: true, breaks: false });

function parseSync(md: string): string {
  // marked.parse returns string | Promise<string>. With no async extensions
  // and no async hooks, this is always sync (string). Cast for TS.
  return marked.parse(md ?? "", { async: false }) as string;
}

/**
 * SERVER-ONLY markdown compiler. Uses isomorphic-dompurify (which falls back
 * to jsdom on the server). NEVER import this from a "use client" component
 * — it pulls jsdom into the browser bundle.
 *
 * Use lib/markdown.client.ts from client components.
 */
export function compileMarkdownServer(md: string): string {
  if (!md) return "";
  const raw = parseSync(md);
  return sanitizeHtml(raw);
}

/**
 * Server-side plain-text helper for reading-time / excerpt estimation.
 */
export function plainTextFromMarkdownServer(md: string): string {
  if (!md) return "";
  return sanitizeHtml(parseSync(md))
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Plain-text view of already-sanitized HTML (used for legacy posts that
 * have no markdown source).
 */
export function plainTextFromHtml(html: string): string {
  if (!html) return "";
  return sanitizeHtml(html)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}