"use client";
import { marked } from "marked";
import DOMPurify from "dompurify";

marked.setOptions({ gfm: true, breaks: false });

function parseSync(md: string): string {
  return marked.parse(md ?? "", { async: false }) as string;
}

const ALLOWED_TAGS = [
  "p", "br", "hr",
  "h1", "h2", "h3", "h4", "h5", "h6",
  "strong", "em", "u", "s", "code", "pre",
  "blockquote",
  "ul", "ol", "li",
  "a", "img",
  "table", "thead", "tbody", "tr", "th", "td",
  "figure", "figcaption",
];

const ALLOWED_ATTR = ["href", "target", "rel", "src", "alt", "width", "height", "title"];

/**
 * CLIENT-ONLY markdown compiler. Used by the in-editor live preview in
 * `MarkdownEditor.tsx`. Uses `dompurify` (the browser-native package, not
 * isomorphic-dompurify) so jsdom never reaches the client bundle.
 *
 * The allowlist here MUST match `lib/sanitize.ts` on the server, so what the
 * author sees matches what the public reader will render.
 */
export function compileMarkdownClient(md: string): string {
  if (!md) return "";
  const raw = parseSync(md);

  // dompurify attaches to window.document automatically in the browser.
  const cleaned = DOMPurify.sanitize(raw, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|tel):|[^a-z]|[a-z+.-]+(?:[^a-z+.\-:]|$))/i,
  }) as string;

  // Same a-tag hardening as the server sanitizer.
  return cleaned.replace(/<a\s+([^>]*?)>/gi, (match, attrs: string) => {
    const hrefMatch = attrs.match(/href="([^"]*)"/i);
    const isExternal = !!hrefMatch && /^https?:\/\//i.test(hrefMatch[1]);
    let next = match;
    if (isExternal && !/target=/i.test(attrs)) {
      next = next.replace("<a ", '<a target="_blank" ');
    }
    if (!/rel=/i.test(next)) {
      next = next.replace("<a ", '<a rel="noopener noreferrer" ');
    }
    return next;
  });
}