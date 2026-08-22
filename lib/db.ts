import postgres from "postgres";

let _sql: ReturnType<typeof postgres> | null = null;
let _initPromise: Promise<void> | null = null;

export function getDB() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  if (!_sql) {
    const url = process.env.DATABASE_URL;
    _sql = postgres(url, {
      ssl: url.includes("sslmode=require") || url.includes("neon.tech") ? "require" : false,
      max: 10,
      idle_timeout: 20,
      // Disable prepared statement caching so each statement auto-commits.
      no_prepare: false,
    });
  }
  // Kick off initDB on first use per process so schema migrations are always
  // applied. We do NOT await here to keep getDB() synchronous; callers that
  // need to wait should use ensureDB() instead (e.g. via /api/init).
  if (!_initPromise) {
    _initPromise = initDB().catch((err) => {
      console.error("initDB failed:", err);
      _initPromise = null; // allow retry on next call
    });
  }
  return _sql;
}

/**
 * Ensures the schema is fully migrated before returning the SQL client.
 * Use in routes that depend on newly-added columns (e.g. the posts API).
 * Safe to call multiple times — idempotent migrations.
 */
export async function ensureDB() {
  getDB(); // starts initDB if not already running
  if (_initPromise) {
    try { await _initPromise; } catch { /* error already logged; let call proceed */ }
  }
  return _sql!;
}

export async function initDB() {
  const sql = getDB();

  // Helper: run a migration step independently — if one fails, others still apply.
  async function step(name: string, fn: () => Promise<unknown>) {
    try {
      await fn();
    } catch (err) {
      console.error(`[initDB] step "${name}" failed:`, err);
    }
  }

  await step("create posts table", () => sql`
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      content TEXT NOT NULL,
      excerpt TEXT,
      image_url TEXT,
      image_alt TEXT,
      category TEXT DEFAULT 'Blog',
      author TEXT DEFAULT 'GrowMos Team',
      published BOOLEAN DEFAULT false,
      sort_order INTEGER DEFAULT 0,
      seo_title TEXT,
      seo_description TEXT,
      seo_keywords TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  // ── Idempotent migrations for older databases (run independently) ────────
  await step("add image_alt column",       () => sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS image_alt TEXT`);
  await step("add seo_title column",       () => sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS seo_title TEXT`);
  await step("add seo_description column", () => sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS seo_description TEXT`);
  await step("add seo_keywords column",    () => sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS seo_keywords TEXT`);

  await step("create subscribers table", () => sql`
    CREATE TABLE IF NOT EXISTS subscribers (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      name TEXT,
      status TEXT DEFAULT 'active',
      tags TEXT[] DEFAULT '{}',
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  await step("create email_campaigns table", () => sql`
    CREATE TABLE IF NOT EXISTS email_campaigns (
      id SERIAL PRIMARY KEY,
      subject TEXT NOT NULL,
      from_name TEXT DEFAULT 'GrowMos',
      reply_to TEXT,
      html_body TEXT NOT NULL,
      text_body TEXT,
      status TEXT DEFAULT 'draft',
      recipient_count INTEGER DEFAULT 0,
      sent_count INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      sent_at TIMESTAMPTZ
    )
  `);

  await step("create contact_submissions table", () => sql`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      service TEXT,
      message TEXT NOT NULL,
      read BOOLEAN DEFAULT false,
      replied BOOLEAN DEFAULT false,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  await step("create received_emails table", () => sql`
    CREATE TABLE IF NOT EXISTS received_emails (
      id SERIAL PRIMARY KEY,
      from_address TEXT NOT NULL,
      from_name TEXT,
      to_address TEXT,
      subject TEXT,
      html TEXT,
      text TEXT,
      read BOOLEAN DEFAULT false,
      received_at TIMESTAMPTZ DEFAULT NOW(),
      message_id TEXT UNIQUE
    )
  `);

  await step("add message_id column", () => sql`
    ALTER TABLE received_emails ADD COLUMN IF NOT EXISTS message_id TEXT
  `);
  await step("create message_id index", () => sql`
    CREATE UNIQUE INDEX IF NOT EXISTS received_emails_message_id_idx
    ON received_emails (message_id) WHERE message_id IS NOT NULL
  `);

  await step("create data_maturity_leads table", () => sql`
    CREATE TABLE IF NOT EXISTS data_maturity_leads (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT,
      role TEXT,
      company_size TEXT,
      current_stack TEXT,
      biggest_pain TEXT,
      source TEXT DEFAULT 'data-maturity-assessment',
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);
}
