/**
 * HTML sanitizer for storage / public rendering.
 *
 * Why a custom sanitizer instead of isomorphic-dompurify: the latter transitively
 * loads jsdom on the server, and jsdom → html-encoding-sniffer → @exodus/bytes
 * is an ESM-only chain that breaks under Vercel/Node's require() loader:
 *   Error [ERR_REQUIRE_ESM]: require() of ES Module
 *     /var/task/node_modules/@exodus/bytes/encoding-lite.js
 * This breaks every API route that imports this module (POST /api/posts,
 * POST /api/posts/preview) with a 500.
 *
 * The allowlist below matches the public reader's typography expectations and
 * blocks inline event handlers / javascript: URIs / on* attributes. This is a
 * focused sanitizer for the small set of HTML we actually produce (markdown
 * output + admin-supplied schema_jsonld JSON-LD rendered as raw HTML).
 */

const ALLOWED_TAGS = new Set([
  "p", "br", "hr",
  "h1", "h2", "h3", "h4", "h5", "h6",
  "strong", "em", "u", "s", "code", "pre",
  "blockquote",
  "ul", "ol", "li",
  "a", "img",
  "table", "thead", "tbody", "tr", "th", "td",
  "figure", "figcaption",
]);

const ALLOWED_ATTRS = new Set([
  "href", "target", "rel", "src", "alt", "width", "height", "title",
]);

// Matches URI schemes we permit on href/src. Anything else (e.g. javascript:)
// is rejected by the URL check below.
const SAFE_URI = /^(?:(?:https?|mailto|tel):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i;

/**
 * Strip dangerous patterns from HTML. Operates on the serialized string rather
 * than a parsed DOM — appropriate for the small, well-defined allowlist above.
 *
 * Steps:
 *   1. Remove <script>, <style>, <iframe>, <object>, <embed>, and <link> tags
 *      entirely (including their content).
 *   2. Strip any on* event-handler attributes from any remaining tag.
 *   3. Drop disallowed tags but keep their inner text.
 *   4. On remaining tags, drop attributes not in ALLOWED_ATTRS, and reject
 *      unsafe href/src values.
 *   5. Force rel="noopener noreferrer" + target="_blank" on external <a> tags.
 */
export function sanitizeHtml(dirty: string): string {
  if (!dirty) return "";

  let html = dirty;

  // 1. Drop dangerous tags and their content entirely.
  html = html.replace(
    /<(script|style|iframe|object|embed|link)\b[^>]*>[\s\S]*?<\/\1>/gi,
    ""
  );
  // Self-closing dangerous variants.
  html = html.replace(/<(script|style|iframe|object|embed|link)\b[^>]*\/?>/gi, "");

  // 2. Strip on* event-handler attributes from any tag.
  html = html.replace(/\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "");

  // 3 & 4. Walk every tag, decide keep-or-strip + filter attributes.
  html = html.replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)>/g, (match, rawTag: string, rawAttrs: string) => {
    const isClose = match.startsWith("</");
    const tag = rawTag.toLowerCase();

    if (!ALLOWED_TAGS.has(tag)) {
      // Drop the tag but keep its inner text (handled by leaving the closing
      // tag stripped too — <span>foo</span> → foo).
      return isClose ? "" : "";
    }

    if (isClose) {
      return `</${tag}>`;
    }

    // Parse surviving attributes from rawAttrs (best-effort, not a full parser).
    const attrs: Record<string, string> = {};
    const attrRe = /([a-zA-Z_:][a-zA-Z0-9_.:-]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g;
    let m: RegExpExecArray | null;
    while ((m = attrRe.exec(rawAttrs)) !== null) {
      const name = m[1].toLowerCase();
      const value = m[2] ?? m[3] ?? m[4] ?? "";
      attrs[name] = value;
    }

    // Filter attributes.
    const safeAttrs: string[] = [];
    for (const [name, value] of Object.entries(attrs)) {
      if (!ALLOWED_ATTRS.has(name)) continue;
      // Reject unsafe URIs on href/src.
      if ((name === "href" || name === "src") && !SAFE_URI.test(value)) continue;
      safeAttrs.push(`${name}="${escapeAttr(value)}"`);
    }

    // Force rel="noopener noreferrer" on all <a>, target="_blank" on external.
    if (tag === "a") {
      const href = attrs.href || "";
      const isExternal = /^https?:\/\//i.test(href);
      if (!safeAttrs.some((a) => a.startsWith("rel="))) {
        safeAttrs.push('rel="noopener noreferrer"');
      }
      if (isExternal && !safeAttrs.some((a) => a.startsWith("target="))) {
        safeAttrs.push('target="_blank"');
      }
    }

    return `<${tag}${safeAttrs.length ? " " + safeAttrs.join(" ") : ""}>`;
  });

  return html;
}

function escapeAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}