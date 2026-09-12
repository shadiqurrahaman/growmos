import postgres from "postgres";

let _sql: ReturnType<typeof postgres> | null = null;
let _initPromise: Promise<void> | null = null;

/**
 * Initialize the SQL client once per process. Safe to call multiple times.
 * On the very first call, also kicks off `initDB()` so schema migrations are
 * applied lazily. Callers that need migrations to be done should use
 * `ensureDB()` instead of `getDB()`.
 */
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
  // Kick off initDB on first use per process. CRITICAL: assign `_initPromise`
  // to a placeholder *before* invoking initDB() so that initDB's internal
  // getDB() call (or anything else re-entering through ensureDB/getDB) sees a
  // non-null _initPromise and does NOT recursively start another initDB run.
  // Without this guard initDB and getDB mutually recurse and blow the stack.
  if (!_initPromise) {
    _initPromise = (async () => {
      try {
        await initDB();
      } catch (err) {
        console.error("initDB failed:", err);
        _initPromise = null; // allow retry on next call
        throw err;
      }
    })();
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
  // Use _sql directly (it was set by the caller — getDB or ensureDB). Calling
  // getDB() from here used to recurse forever because _initPromise hadn't been
  // assigned yet at the moment initDB ran. We now own the assignment in getDB
  // via the placeholder promise above, so _sql is guaranteed to be set here.
  if (!_sql) {
    throw new Error("initDB called before SQL client was initialized");
  }
  const sql = _sql;

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
      target_url TEXT,
      meta_description TEXT,
      author_name TEXT,
      author_url TEXT,
      date_published DATE,
      date_modified DATE,
      hero_image_url TEXT,
      hero_image_alt TEXT,
      body_markdown TEXT,
      schema_jsonld TEXT,
      status TEXT DEFAULT 'draft',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  // ── Idempotent migrations for older databases (run independently) ────────
  await step("add image_alt column",       () => sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS image_alt TEXT`);
  await step("add seo_title column",       () => sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS seo_title TEXT`);
  await step("add seo_description column", () => sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS seo_description TEXT`);
  await step("add seo_keywords column",    () => sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS seo_keywords TEXT`);

  // ── CMS v2 fields (additive — no destructive changes) ───────────────────
  await step("add target_url column",      () => sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS target_url TEXT`);
  await step("add meta_description column",() => sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS meta_description TEXT`);
  await step("add author_name column",     () => sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS author_name TEXT`);
  await step("add author_url column",      () => sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS author_url TEXT`);
  await step("add date_published column",  () => sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS date_published DATE`);
  await step("add date_modified column",   () => sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS date_modified DATE`);
  await step("add hero_image_url column",  () => sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS hero_image_url TEXT`);
  await step("add hero_image_alt column",  () => sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS hero_image_alt TEXT`);
  await step("add body_markdown column",   () => sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS body_markdown TEXT`);
  await step("add schema_jsonld column",   () => sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS schema_jsonld TEXT`);
  await step("add status column",          () => sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'draft'`);

  // Indexes come AFTER column-add (idempotent CREATE INDEX IF NOT EXISTS).
  await step("create posts_target_url unique index", () => sql`
    CREATE UNIQUE INDEX IF NOT EXISTS posts_target_url_unique
    ON posts (target_url) WHERE target_url IS NOT NULL
  `);
  await step("create posts_status index", () => sql`
    CREATE INDEX IF NOT EXISTS posts_status_idx ON posts (status)
  `);

  // Backfill existing rows: set status + date_published from legacy columns.
  await step("backfill status from published", async () => {
    await sql`UPDATE posts SET status = 'published' WHERE published = true AND (status IS NULL OR status = 'draft')`;
    await sql`UPDATE posts SET status = 'draft'     WHERE (published = false OR published IS NULL) AND status IS NULL`;
  });
  await step("backfill date_published from created_at", () =>
    sql`UPDATE posts SET date_published = created_at::date WHERE date_published IS NULL`
  );

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

  // ── Post previews (short-lived unsaved drafts for the public preview) ───
  // Backing store for /api/posts/preview → /admin/preview/[token]. Postgres
  // is used (not an in-memory Map) because Vercel/serverless invocations may
  // each get a fresh runtime, so a Map-based cache silently loses previews
  // between the POST that creates them and the GET that renders them.
  await step("create post_previews table", () => sql`
    CREATE TABLE IF NOT EXISTS post_previews (
      token TEXT PRIMARY KEY,
      post JSONB NOT NULL,
      expires_at TIMESTAMPTZ NOT NULL
    )
  `);
  await step("create post_previews_expires_at index", () => sql`
    CREATE INDEX IF NOT EXISTS post_previews_expires_at_idx
    ON post_previews (expires_at)
  `);
}
