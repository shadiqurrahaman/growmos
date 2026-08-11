"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const stack = [
 {
 n: "01",
 title: "Sources",
 icon: "fa-solid fa-database",
 tools: ["Salesforce", "HubSpot", "Shopify", "Stripe", "Postgres", "Ad platforms"],
 desc: "Pull data from every system that runs your business.",
 color: "#6366f1",
 colorSoft: "#a5b4fc",
 },
 {
 n: "02",
 title: "Ingestion",
 icon: "fa-solid fa-arrows-rotate",
 tools: ["Fivetran", "Airbyte"],
 desc: "Automated, reliable pipelines that keep your warehouse in sync.",
 color: "#10b981",
 colorSoft: "#6ee7b7",
 },
 {
 n: "03",
 title: "Transformation",
 icon: "fa-solid fa-gears",
 tools: ["dbt"],
 desc: "Modelled, tested, and documented the back-end of every good report.",
 color: "#f59e0b",
 colorSoft: "#fcd34d",
 },
 {
 n: "04",
 title: "Warehouse",
 icon: "fa-solid fa-cube",
 tools: ["BigQuery", "Microsoft Fabric", "Snowflake"],
 desc: "A single source of truth, optimised for cost and speed.",
 color: "#3b82f6",
 colorSoft: "#93c5fd",
 },
 {
 n: "05",
 title: "BI & Activation",
 icon: "fa-solid fa-chart-line",
 tools: ["Power BI", "Metabase", "Hightouch", "Census"],
 desc: "Dashboards your team uses and insights pushed back into the tools they live in.",
 color: "#ec4899",
 colorSoft: "#f9a8d4",
 },
];

export default function DataStack() {
 const [vertical, setVertical] = useState(false);
 const [revealed, setRevealed] = useState(false);
 const sectionRef = useRef<HTMLElement | null>(null);

 // Detect narrow viewport to switch rail to vertical mode.
 useEffect(() => {
 const mq = window.matchMedia("(max-width: 720px)");
 const update = () => setVertical(mq.matches);
 update();
 mq.addEventListener("change", update);
 return () => mq.removeEventListener("change", update);
 }, []);

 // Trigger entrance animation when section scrolls into view.
 useEffect(() => {
 const el = sectionRef.current;
 if (!el) return;
 const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 if (reduced) {
 setRevealed(true);
 return;
 }
 const obs = new IntersectionObserver(
 (entries) => {
 entries.forEach((e) => {
 if (e.isIntersecting) {
 setRevealed(true);
 obs.disconnect();
 }
 });
 },
 { threshold: 0.2 }
 );
 obs.observe(el);
 return () => obs.disconnect();
 }, []);

 const total = stack.length;

 return (
 <section
 ref={sectionRef}
 className={`stack-section ${revealed ? "is-revealed" : ""} ${vertical ? "is-vertical" : ""}`}
 id="data-stack"
 >
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

 <div className="stack-stage">
 {/* Connector rail (SVG) */}
 <div className="stack-rail" aria-hidden="true">
 <svg
 className="stack-rail__svg"
 viewBox="0 0 100 4"
 preserveAspectRatio="none"
 xmlns="http://www.w3.org/2000/svg"
 >
 <defs>
 <linearGradient id="stackGradient" x1="0%" y1="0%" x2="100%" y2="0%">
 {stack.map((s, i) => (
 <stop
 key={s.n}
 offset={`${(i / (total - 1)) * 100}%`}
 stopColor={s.color}
 />
 ))}
 </linearGradient>
 </defs>
 <line
 className="stack-rail__line"
 x1="0"
 y1="2"
 x2="100"
 y2="2"
 stroke="url(#stackGradient)"
 strokeWidth="0.18"
 strokeLinecap="round"
 />
 </svg>

 {/* Animated data packet */}
 <div className="stack-packet">
 <span className="stack-packet__dot" />
 </div>
 </div>

 {/* Cards */}
 <div className="stack-grid">
 {stack.map((step) => (
 <div
 key={step.n}
 className="stack-step"
 style={
 {
 "--step-color": step.color,
 "--step-color-soft": step.colorSoft,
 } as React.CSSProperties
 }
 >
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
 </div>
 ))}
 </div>
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
