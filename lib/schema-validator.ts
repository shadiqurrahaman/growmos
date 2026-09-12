/**
 * Server-side validator for the admin-supplied schema_jsonld field.
 *
 * Rules:
 *   - Optional. Empty / null returns ok with empty json.
 *   - Must parse as JSON.
 *   - Must be < 20KB.
 *   - Every node must have @context and @type.
 *   - @type values are blocked if they appear in the dangerous-types list
 *     (script / style / iframe / object / embed).
 *
 * On success returns the canonicalized JSON string for storage.
 */

export type JsonLdValidation =
  | { ok: true; json: string }
  | { ok: false; error: string };

const DANGEROUS_TYPES = new Set(["script", "style", "iframe", "object", "embed"]);
const MAX_BYTES = 20_000;

export function validateSchemaJsonld(raw: string | null | undefined): JsonLdValidation {
  if (raw == null || raw === "") return { ok: true, json: "" };
  if (typeof raw !== "string") return { ok: false, error: "schema_jsonld must be a string" };
  if (raw.length > MAX_BYTES) {
    return { ok: false, error: `schema_jsonld exceeds ${MAX_BYTES / 1000}KB limit` };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { ok: false, error: "schema_jsonld is not valid JSON" };
  }

  const err = checkNode(parsed, "$");
  if (err) return { ok: false, error: `schema_jsonld invalid: ${err}` };

  return { ok: true, json: JSON.stringify(parsed) };
}

function checkNode(node: unknown, path: string): string | null {
  if (node == null || typeof node !== "object") return null;

  if (Array.isArray(node)) {
    for (let i = 0; i < node.length; i++) {
      const err = checkNode(node[i], `${path}[${i}]`);
      if (err) return err;
    }
    return null;
  }

  const obj = node as Record<string, unknown>;

  // @type guard
  const t = obj["@type"];
  if (typeof t === "string" && DANGEROUS_TYPES.has(t.toLowerCase())) {
    return `${path}.@type '${t}' is not allowed`;
  }
  if (Array.isArray(t)) {
    for (const v of t) {
      if (typeof v === "string" && DANGEROUS_TYPES.has(v.toLowerCase())) {
        return `${path}.@type '${v}' is not allowed`;
      }
    }
  }

  // Required keys
  if (!("@context" in obj)) return `${path} is missing @context`;
  if (!("@type" in obj)) return `${path} is missing @type`;

  // Recurse into known object-valued keys
  for (const key of ["@graph", "mainEntity", "hasPart"]) {
    if (key in obj) {
      const err = checkNode(obj[key], `${path}.${key}`);
      if (err) return err;
    }
  }

  return null;
}