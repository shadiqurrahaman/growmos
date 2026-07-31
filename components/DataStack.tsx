import Link from "next/link";

const stack = [
  {
    n: "01",
    title: "Sources",
    icon: "fa-solid fa-database",
    tools: ["Salesforce", "HubSpot", "Shopify", "Stripe", "Postgres", "Ad platforms"],
    desc: "Pull data from every system that runs your business.",
  },
  {
    n: "02",
    title: "Ingestion",
    icon: "fa-solid fa-arrows-rotate",
    tools: ["Fivetran", "Airbyte"],
    desc: "Automated, reliable pipelines that keep your warehouse in sync.",
  },
  {
    n: "03",
    title: "Transformation",
    icon: "fa-solid fa-gears",
    tools: ["dbt"],
    desc: "Modelled, tested, and documented — the back-end of every good report.",
  },
  {
    n: "04",
    title: "Warehouse",
    icon: "fa-solid fa-cube",
    tools: ["BigQuery", "Microsoft Fabric", "Snowflake"],
    desc: "A single source of truth, optimised for cost and speed.",
  },
  {
    n: "05",
    title: "BI & Activation",
    icon: "fa-solid fa-chart-line",
    tools: ["Power BI", "Metabase", "Hightouch", "Census"],
    desc: "Dashboards your team uses — and insights pushed back into the tools they live in.",
  },
];

export default function DataStack() {
  return (
    <section className="stack-section" id="data-stack">
      <div className="container">
        <div className="section__header">
          <span className="section__badge">The Pipeline</span>
          <h2 className="section__title">
            From Scattered Sources to <span className="gradient-text">Decisions</span>
          </h2>
          <p className="section__subtitle">
            Five stages, one modern data stack. Built, monitored, and maintained by GrowMos.
          </p>
        </div>
        <div className="stack-grid">
          {stack.map((step, i) => (
            <div key={step.n} className={`stack-step stack-step--${step.n}`}>
              <div className="stack-step__num">{step.n}</div>
              <div className="stack-step__icon">
                <i className={step.icon}></i>
              </div>
              <h3 className="stack-step__title">{step.title}</h3>
              <p className="stack-step__desc">{step.desc}</p>
              <ul className="stack-step__tools">
                {step.tools.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              {i < stack.length - 1 && (
                <div className="stack-arrow" aria-hidden="true">
                  <i className="fa-solid fa-arrow-right"></i>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="stack-section__cta">
          <Link href="/data-pipeline-engineering" className="btn btn--primary btn--lg">
            See the Pipeline in Detail <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
