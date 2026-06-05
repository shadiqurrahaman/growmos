import postgres from "postgres";

let _sql: ReturnType<typeof postgres> | null = null;

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
    });
  }
  return _sql;
}

export async function initDB() {
  const sql = getDB();

  await sql`
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      content TEXT NOT NULL,
      excerpt TEXT,
      image_url TEXT,
      category TEXT DEFAULT 'Blog',
      author TEXT DEFAULT 'GrowMos Team',
      published BOOLEAN DEFAULT false,
      sort_order INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS subscribers (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      name TEXT,
      status TEXT DEFAULT 'active',
      tags TEXT[] DEFAULT '{}',
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
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
  `;

  await sql`
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
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS received_emails (
      id SERIAL PRIMARY KEY,
      from_address TEXT NOT NULL,
      from_name TEXT,
      to_address TEXT,
      subject TEXT,
      html TEXT,
      text TEXT,
      read BOOLEAN DEFAULT false,
      received_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}
