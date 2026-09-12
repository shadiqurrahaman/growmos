import { marked } from "marked";
import { sanitizeHtml } from "./sanitize";

marked.setOptions({ gfm: true, breaks: false });

function parseSync(md: string): string {
  // marked.parse returns string | Promise<string>. With no async extensions
  // and no async hooks, this is always sync (string). Cast for TS.
  return marked.parse(md ?? "", { async: false }) as string;
}

/**
 * Compile markdown to safe HTML. The result is sanitized before being stored
 * in the `content` column. Belt-and-braces — the public reader also relies
 * on the sanitized-on-write invariant.
 */
export function compileMarkdown(md: string): string {
  if (!md) return "";
  const raw = parseSync(md);
  return sanitizeHtml(raw);
}

/**
 * Plain-text view of a markdown document, used for reading-time / excerpt
 * estimation when only the markdown source is available.
 */
export function plainTextFromMarkdown(md: string): string {
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