/**
 * Seed the database with 3 placeholder blog posts.
 *
 * Idempotent: re-running won't duplicate posts (ON CONFLICT on slug).
 * Requires DATABASE_URL in the environment.
 *
 * Run with: npm run seed-posts
 *
 * Reads .env (and .env.local) via Node's built-in --env-file flag.
 */

import { getDB } from "../lib/db.ts";

const posts = [
  {
    title: "Power BI vs Metabase: Which BI Tool Fits Your B2B?",
    slug: "power-bi-vs-metabase",
    category: "BI & Analytics",
    excerpt:
      "Both Power BI and Metabase are excellent — but they shine in different settings. Here's how to pick the right one for your team.",
    content: `
<p>If you're a B2B company picking a BI tool today, you'll almost certainly end up choosing between <strong>Power BI</strong> and <strong>Metabase</strong>. Both are excellent. Both are widely adopted. Both handle bigquery, snowflake, postgres, and most modern warehouses out of the box. But they optimise for very different things — and the "right" answer depends on your team, your stack, and your governance posture.</p>

<h2>The short version</h2>
<ul>
  <li><strong>Power BI</strong> wins when you're a Microsoft shop, you need enterprise governance, and your analysts are comfortable with a desktop authoring tool.</li>
  <li><strong>Metabase</strong> wins when you want a modern, friendly UX, faster iteration, and self-serve for non-technical users.</li>
</ul>

<h2>When Power BI is the right choice</h2>
<p>If your business already runs on Microsoft 365, you've probably already paid for Power BI in some form. The Pro and Premium tiers cover most B2B needs, and the integration with Excel, Teams, and SharePoint is genuinely useful. Power BI also handles complex enterprise governance better than almost any alternative — row-level security, deployment pipelines, and certified datasets are first-class.</p>
<p>The trade-off: authoring is heavy. Power BI Desktop is a powerful but dense tool, and most teams end up with one or two power users doing most of the modelling. Self-serve for non-technical users is harder.</p>

<h2>When Metabase is the right choice</h2>
<p>If your team values speed, a clean UX, and the ability for anyone to answer their own questions — Metabase is hard to beat. Setup takes minutes. Embedding is straightforward. The newssletter and alerting features are genuinely useful for non-analysts.</p>
<p>Metabase's open-source edition is also worth considering if you want full control over your data and are comfortable running a small service. For most B2B companies, the paid cloud edition removes most of the ops overhead.</p>

<h2>A practical decision framework</h2>
<ul>
  <li><strong>Team</strong> — analyst-heavy or generalist? Power BI favours the former; Metabase favours the latter.</li>
  <li><strong>Stack</strong> — already Microsoft 365? Power BI pays for itself. AWS/GCP pure-play? Metabase usually fits better.</li>
  <li><strong>Governance</strong> — regulated industry with strict row-level security? Power BI. Otherwise, Metabase is enough.</li>
  <li><strong>Embed</strong> — if you're building customer-facing analytics, both work, but Metabase's embed flow is faster.</li>
</ul>

<h2>How we help</h2>
<p>Most of our B2B clients end up with <strong>both</strong>: Power BI for executive and finance dashboards where governance matters; Metabase for the wider team and ad-hoc exploration. That's a totally normal architecture, and it's where the modern data stack shines — the warehouse is the source of truth, and the BI tool is just the lens.</p>

<p>Want help picking or implementing either? <a href="/contact">Book a free 30-minute call</a> and we'll walk through your stack and team.</p>
`.trim(),
    author: "GrowMos Team",
  },
  {
    title: "Why dbt Is the Backbone of Modern Data Transformation",
    slug: "dbt-backbone-modern-data-transformation",
    category: "Data Engineering",
    excerpt:
      "If you're building a modern data warehouse, you should almost certainly be using dbt. Here's what it actually does — and why we use it on every engagement.",
    content: `
<p>A decade ago, the hard part of data engineering was <em>getting</em> the data into your warehouse. Today, the hard part is <em>what you do with it once it's there</em> — and that's exactly the problem <strong>dbt</strong> was built to solve.</p>

<h2>What dbt actually is</h2>
<p>dbt (data build tool) is a transformation framework that lets you write SQL <code>SELECT</code> statements and turn them into a tested, documented, version-controlled data model. You write models in <code>.sql</code> files. dbt handles dependency resolution, runs them in the right order, and produces a clean lineage graph you can actually show stakeholders.</p>

<h2>Why every B2B data team should use it</h2>
<ul>
  <li><strong>SQL is enough.</strong> No Python, no Scala, no proprietary DSL. If your team can write SELECT, they can ship a dbt model.</li>
  <li><strong>Tests are first-class.</strong> Every model can declare tests on its columns — uniqueness, not-null, referential integrity, custom business rules. Bad data gets caught before it reaches a dashboard.</li>
  <li><strong>Documentation is automatic.</strong> Every model, every column, gets a doc page. Lineage is visual.</li>
  <li><strong>Version control.</strong> dbt projects live in git. Code reviews work. CI/CD works.</li>
  <li><strong>It's free and open source.</strong> dbt Core is Apache-licensed; dbt Cloud adds a hosted UI.</li>
</ul>

<h2>What dbt doesn't do</h2>
<p>dbt doesn't extract data from sources (use Fivetran or Airbyte for that) and it doesn't build dashboards (use Power BI or Metabase for that). dbt owns the layer in between: <strong>transformation</strong>. That's also why it's become the de facto backbone — because it's laser-focused on the layer that used to be the messiest part of any warehouse.</p>

<h2>Our standard dbt project layout</h2>
<p>On every engagement, we structure the dbt project the same way:</p>
<ul>
  <li><strong>staging/</strong> — one model per source table, lightly typed, renamed for consistency.</li>
  <li><strong>intermediate/</strong> — joins, aggregations, and business logic that don't belong in staging or marts.</li>
  <li><strong>marts/</strong> — the dashboards-friendly tables: <code>fct_revenue</code>, <code>dim_customer</code>, <code>fct_subscription_event</code>.</li>
</ul>
<p>Every model gets a description, every column gets a description, every model gets at least one test. We use <code>dbt-utils</code> for common macros and we run everything in CI before merge.</p>

<h2>Should you adopt it?</h2>
<p>If you have a modern warehouse (BigQuery, Snowflake, Fabric, Redshift, Postgres) and you're not yet using dbt, the answer is almost certainly yes. The cost of adoption is days; the cost of running a warehouse without it is months of accumulated technical debt.</p>

<p><a href="/data-pipeline-engineering">See how we build dbt projects from scratch</a> — or <a href="/resources/data-maturity-assessment">take the free data maturity assessment</a> to see where your warehouse sits today.</p>
`.trim(),
    author: "GrowMos Team",
  },
  {
    title: "Fivetran vs Airbyte: Which Fits Your Data Stack?",
    slug: "fivetran-vs-airbyte",
    category: "Data Engineering",
    excerpt:
      "Both are excellent ingestion tools. The right answer depends on your team size, budget, and appetite for self-hosting.",
    content: `
<p>Once you've decided to centralise your data in a modern warehouse, the next question is: <em>how does the data get there?</em> Two tools dominate the conversation: <strong>Fivetran</strong> and <strong>Airbyte</strong>. Both work. Both have hundreds of pre-built connectors. But they're built on very different philosophies.</p>

<h2>Fivetran: managed, premium, opinionated</h2>
<p>Fivetran is a fully managed SaaS. You pay per monthly active row (MAR). You pick a connector, give Fivetran credentials, and data starts flowing into your warehouse within hours. Fivetran handles schema drift, incremental loads, history, and most of the operational edge cases.</p>
<p><strong>The upside:</strong> it just works. You almost never need to write custom code. The connectors are usually the best in class.</p>
<p><strong>The downside:</strong> cost. Fivetran gets expensive at scale. A small SaaS might pay a few hundred a month; a large one can easily pay five figures. And you're locked in to Fivetran's pricing model.</p>

<h2>Airbyte: open source, flexible, more work</h2>
<p>Airbyte is open source (with a managed cloud option). You can self-host the control plane, or use Airbyte Cloud. The connector catalog is similar in size to Fivetran's, and you can write custom connectors in Python when one doesn't exist.</p>
<p><strong>The upside:</strong> cost, especially at scale. Flexibility. The ability to fork and modify connectors.</p>
<p><strong>The downside:</strong> more work. Self-hosting Airbyte means running another service. Connector quality is more variable than Fivetran's.</p>

<h2>Our recommendation framework</h2>
<ul>
  <li><strong>Choose Fivetran</strong> if you have a small data team, you want the easiest possible setup, and you're okay paying a premium for that simplicity.</li>
  <li><strong>Choose Airbyte</strong> if cost is a major factor, you need a custom connector, or you have the engineering capacity to self-host.</li>
  <li><strong>Mix the two</strong> if you have a heterogeneous stack — Airbyte for the long tail, Fivetran for the high-volume sources where reliability matters most.</li>
</ul>

<h2>What we actually do for clients</h2>
<p>About 60% of our clients land on Fivetran. 30% land on Airbyte (mostly because of cost or a specific connector need). 10% mix the two. The tool rarely matters as much as the <strong>modeling on top</strong> — and that's where dbt does the heavy lifting either way.</p>

<p>Need help choosing? <a href="/data-pipeline-engineering">See our data pipeline service</a>, or <a href="/contact">book a free 30-minute call</a> to talk through your stack.</p>
`.trim(),
    author: "GrowMos Team",
  },
];

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set. Aborting.");
    process.exit(1);
  }

  const sql = getDB();

  console.log(`Seeding ${posts.length} posts…`);
  for (let index = 0; index < posts.length; index++) {
    const p = posts[index];
    try {
      await sql`
        INSERT INTO posts (title, slug, content, excerpt, category, author, published, sort_order)
        VALUES (
          ${p.title},
          ${p.slug},
          ${p.content},
          ${p.excerpt},
          ${p.category},
          ${p.author},
          true,
          ${posts.length - index}
        )
        ON CONFLICT (slug) DO NOTHING
      `;
      console.log(`  ✓ ${p.slug}`);
    } catch (err) {
      console.error(`  ✗ ${p.slug}:`, err);
    }
  }

  console.log("Done.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});