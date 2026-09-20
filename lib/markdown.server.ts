import { marked } from "marked";
import { sanitizeHtml } from "./sanitize";

// Register marked-footnote so [^1] references and [^1]: definitions render as
// proper footnotes. Wrapped in try/catch so a missing/broken extension doesn't
// 500 every blog page render.
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const mod = require("marked-footnote");
  const footnote = mod.default ?? mod;
  if (typeof footnote === "function") {
    marked.use({ extensions: [footnote()] });
  }
} catch (err) {
  console.warn("[markdown.server] marked-footnote not loaded; footnotes will render as raw text:", err);
}

marked.setOptions({ gfm: true, breaks: false });

function parseSync(md: string): string {
  // marked.parse returns string | Promise<string>. With no async extensions
  // and no async hooks, this is always sync (string). Cast for TS.
  return marked.parse(md ?? "", { async: false }) as string;
}

/**
 * SERVER-ONLY markdown compiler. Pure-JS sanitize (lib/sanitize.ts) avoids the
 * isomorphic-dompurify/jsdom ESM load failure on Vercel. NEVER import this from
 * a "use client" component.
 *
 * Use lib/markdown.client.ts from client components.
 */
export function compileMarkdownServer(md: string): string {
  if (!md) return "";
  // Drop editor scaffolding the author may have left in body_markdown:
  // - "H1 "/"H2 "/"H3 " prefixes on heading lines
  // - "Q: " prefix on FAQ question lines
  // These should not appear in published output. We strip them BEFORE marked
  // parses the markdown so the resulting headings are clean.
  const cleaned = md
    .replace(/^(#{1,6}\s+)(H[1-6]\s+)/gm, "$1")
    .replace(/^(#{3,6}\s+)Q:\s+/gm, "$1");
  const raw = parseSync(cleaned);
  // Strip any remaining raw footnote-definition lines (in case the extension
  // didn't register) so they don't appear as visible body text.
  const stripped = raw.replace(/\[\^[^\]]+\]:\s*[^\n<]*(?:\n(?!\[\^)[^\n<]*)*/g, "");
  return sanitizeHtml(stripped);
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