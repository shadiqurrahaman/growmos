import DOMPurify from "isomorphic-dompurify";

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

const ALLOWED_URI_REGEXP = /^(?:(?:https?|mailto|tel):|[^a-z]|[a-z+.-]+(?:[^a-z+.\-:]|$))/i;

/**
 * Sanitize HTML for storage / public rendering.
 * Allowlist matches the public reader's typography expectations and blocks
 * inline event handlers / javascript: URIs / on* attributes.
 *
 * Style/class are intentionally NOT in ALLOWED_ATTR — the global styles.css
 * already targets bare tags.
 */
export function sanitizeHtml(dirty: string): string {
  if (!dirty) return "";
  const cleaned = DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOWED_URI_REGEXP,
  });

  // Force-add rel="noopener noreferrer" to all <a>, and target="_blank" on
  // external (http/https) links. Defense against tab-nabbing.
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