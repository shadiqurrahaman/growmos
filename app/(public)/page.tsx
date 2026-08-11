"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DataStack from "@/components/DataStack";
import Reviews from "@/components/Reviews";
import Product from "@/components/Product";
import Pricing from "@/components/Pricing";

const workedLogos = [
 { file: "Logo - GJW.webp", alt: "GJW Direct" },
 { file: "Logo - Caeserstone.webp", alt: "Caesarstone" },
 { file: "Logo - Moda.webp", alt: "Moda" },
 { file: "Logo - Aspinall.webp", alt: "The Aspinall Foundation" },
 { file: "Logo - Fusion21.webp", alt: "Fusion21" },
 { file: "Logo - iVendi.webp", alt: "iVendi" },
 { file: "Logo - Orega.webp", alt: "Orega" },
 { file: "Logo - Credera.png", alt: "Credera" },
 { file: "Logo - Lowell.webp", alt: "Lowell" },
];

const dataStack = [
 { src: "/images/stack/fivetran.png", label: "Fivetran" },
 { src: "/images/stack/airbyte.svg", label: "Airbyte" },
 { src: "/images/stack/dbt.svg", label: "dbt" },
 { src: "/images/stack/bigquery.svg", label: "BigQuery" },
 { src: "/images/stack/snowflake.svg", label: "Snowflake" },
 { src: "/images/stack/fabric.png", label: "Fabric" },
 { src: "/images/stack/power-bi.svg", label: "Power BI" },
 { src: "/images/stack/metabase.svg", label: "Metabase" },
 { src: "/images/stack/salesforce.svg", label: "Salesforce" },
 { src: "/images/stack/hubspot.svg", label: "HubSpot" },
 { src: "/images/stack/postgresql.svg", label: "PostgreSQL" },
 { src: "/images/stack/python.svg", label: "Python" },
];

const industries = [
 { icon: "fa-solid fa-cloud", name: "SaaS", sub: "Product analytics, attribution & warehouse foundations", color: "indigo" },
 { icon: "fa-solid fa-cart-shopping", name: "E-commerce", sub: "Multi-channel attribution, LTV & inventory analytics", color: "blue" },
 { icon: "fa-solid fa-graduation-cap", name: "EdTech", sub: "Learner analytics, dashboards & engagement pipelines", color: "amber" },
 { icon: "fa-solid fa-store", name: "Retail", sub: "POS, inventory & unified customer data platforms", color: "purple" },
 { icon: "fa-solid fa-heart-pulse", name: "Healthcare", sub: "Patient platforms & clinic management software", color: "green" },
 { icon: "fa-solid fa-building-columns", name: "Finance", sub: "FinTech apps, dashboards & compliance systems", color: "teal" },
 { icon: "fa-solid fa-truck-fast", name: "Logistics", sub: "Fleet tracking, route ops & supply chain tech", color: "orange" },
 { icon: "fa-solid fa-utensils", name: "Food & Beverage", sub: "Ordering platforms, POS & loyalty programmes", color: "red" },
];

const faqs = [
 { q: "What does GrowMos actually do?", a: "We design, build, and maintain modern data platforms for B2B companies from ingestion (Fivetran, Airbyte) through transformation (dbt) to warehouse (BigQuery, Microsoft Fabric) and dashboards (Power BI, Metabase). We also integrate CRM and ad data, and surface insights through BI and AI." },
 { q: "Who do you typically work with?", a: "Founders, decision-makers, and marketing leaders at SaaS, E-commerce, EdTech, and Retail companies usually teams that have outgrown spreadsheets but don't want to staff a full in-house data team yet." },
 { q: "Which tools do you work with?", a: "Our core stack is Fivetran / Airbyte for ingestion, dbt for transformation, BigQuery / Microsoft Fabric / Snowflake for the warehouse, and Power BI / Metabase for dashboards. We also build custom integrations with Salesforce, HubSpot, Shopify, and ad platforms." },
 { q: "How is a data engagement structured?", a: "Most engagements start with a discovery sprint (2–3 weeks) to map your sources, define KPIs, and design the warehouse. Then we build the pipeline in 4–8 weeks, hand off with documentation, and offer ongoing support. Detailed scope is set in a written proposal." },
];

type Post = { id: number; title: string; slug: string; excerpt: string; image_url: string | null; category: string; author: string; created_at: string };

const problemsSolutions = [
 {
 problem: "Your data is everywhere and nowhere.",
 resolution: "One source of truth unified, tested, documented.",
 capability: "Data engineering",
 tone: "ink",
 },
 {
 problem: "Reports take longer to build than the decisions they inform.",
 resolution: "Live dashboards your team actually trusts.",
 capability: "BI & reporting",
 tone: "violet",
 },
];

export default function HomePage() {
 const [openFaq, setOpenFaq] = useState<number | null>(null);
 const [posts, setPosts] = useState<Post[]>([]);
 const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
 const [status, setStatus] = useState<"idle"|"sending"|"ok"|"err">("idle");

 useEffect(() => {
 fetch("/api/posts?published=true&limit=3").then(r => r.json()).then(d => setPosts(d.posts || [])).catch(() => {});
 }, []);

 async function handleContact(e: React.FormEvent) {
 e.preventDefault();
 setStatus("sending");
 try {
 const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
 setStatus(res.ok ? "ok" : "err");
 } catch { setStatus("err"); }
 }

 const faqJsonLd = {
 "@context": "https://schema.org",
 "@type": "FAQPage",
 mainEntity: faqs.map((faq) => ({
 "@type": "Question",
 name: faq.q,
 acceptedAnswer: { "@type": "Answer", text: faq.a },
 })),
 };

 return (
 <main className="main">
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
 />
 {/* Hero */}
 <section className="hero-new" id="hero">
 <div className="container">
 <div className="hero-premium">
 <div className="hero-premium__content">
 <span className="hero-new__badge"><span></span> Data systems for ambitious B2B teams</span>
 <h1 className="hero-new__title">Your business deserves<br /><em>better data.</em></h1>
 <p className="hero-new__description">We design and run the data infrastructure behind faster decisions, clearer reporting, and measurable growth without the cost of building an in-house team.</p>
 <div className="hero-new__actions">
 <a href="https://calendly.com/hello-growmos/30min" target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--lg">Book a 30-minute call <i className="fa-solid fa-arrow-right"></i></a>
 <Link href="/resources/data-maturity-assessment" className="hero-premium__secondary">Take the free data assessment <i className="fa-solid fa-arrow-right"></i></Link>
 </div>
 <div className="hero-premium__assurance">
 <span><i className="fa-solid fa-circle-check"></i> No-obligation discovery</span>
 <span><i className="fa-solid fa-circle-check"></i> Senior experts from day one</span>
 <span><i className="fa-solid fa-circle-check"></i> Clear scope and documentation</span>
 </div>
 </div>
 <div className="hero-premium__visual" aria-label="GrowMos data platform overview">
 <div className="hero-platform">
 <div className="hero-platform__header">
 <div><span className="hero-platform__eyebrow">Live data platform</span><strong>Executive overview</strong></div>
 <span className="hero-platform__status"><i></i> All systems healthy</span>
 </div>
 <div className="hero-platform__metrics">
 <div><span>Pipeline uptime</span><strong>99.9%</strong><small>Last 90 days</small></div>
 <div><span>Reporting time</span><strong>−72%</strong><small>After automation</small></div>
 <div><span>Sources unified</span><strong>18</strong><small>One source of truth</small></div>
 </div>
 <div className="hero-platform__chart">
 <div className="hero-platform__chart-head"><span>Revenue visibility</span><strong>+28.4%</strong></div>
 <svg viewBox="0 0 560 170" role="img" aria-label="Upward analytics trend">
 <defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#6c5ce7" stopOpacity=".28"/><stop offset="100%" stopColor="#6c5ce7" stopOpacity="0"/></linearGradient></defs>
 <path className="hero-platform__gridline" d="M0 30H560M0 85H560M0 140H560" />
 <path className="hero-platform__area" d="M0 146 C70 142 82 124 132 126 S205 107 252 113 S325 85 369 91 S450 53 560 30 L560 170 L0 170 Z" />
 <path className="hero-platform__line" d="M0 146 C70 142 82 124 132 126 S205 107 252 113 S325 85 369 91 S450 53 560 30" />
 </svg>
 </div>
 <div className="hero-platform__footer">
 <div className="hero-platform__stack"><span>F</span><span>dbt</span><span>BQ</span><span>BI</span></div>
 <small>Fivetran · dbt · BigQuery · Power BI</small>
 </div>
 </div>
 <div className="hero-platform__note"><i className="fa-solid fa-check"></i><span><strong>Decision-ready data</strong><small>Built, tested and documented</small></span></div>
 </div>
 </div>
 </div>
 </section>

 {/* Trusted by */}
 <section className="trusted-section" aria-label="Companies we have worked with">
 <div className="container">
 <p className="trusted-section__label">Trusted to deliver for teams at</p>
 <div className="trusted-section__logos">
 {workedLogos.slice(0, 7).map((logo) => (
 <div className="trusted-section__logo" key={logo.file}>
 <Image src={`/images/workedlogos/${logo.file}`} alt={logo.alt} width={120} height={48} style={{objectFit:"contain"}} />
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* Problems we solve */}
 <section className="problems" id="problems">
 <div className="container problems__layout">
 <header className="problems__header">
 <span className="section__badge">Problems we solve</span>
 <h2 className="problems__title">Four pains we hear on every <span className="gradient-text">first call</span>.</h2>
 <p className="problems__lede">B2B founders and marketing leaders who&apos;ve outgrown spreadsheets but can&apos;t yet staff a full in-house team. We solve the four problems that bring them to us.</p>
 </header>

 <div className="problems-grid" aria-label="Problems we solve">
 {problemsSolutions.map((p, i) => (
 <article className={`problems-card problems-card--${p.tone}`} key={p.problem}>
 <span className="problems-card__tag">{p.capability}</span>
 <h3 className="problems-card__problem">{p.problem}</h3>
 <p className="problems-card__resolution">{p.resolution}</p>
 </article>
 ))}
 </div>
 </div>
 </section>

 {/* Proof metrics */}
 <section className="proof-strip">
 <div className="container proof-strip__grid">
 <div><strong>120+</strong><span>projects delivered</span></div>
 <div><strong>20+</strong><span>specialists across data and growth</span></div>
 <div><strong>4+</strong><span>years building client systems</span></div>
 <div><strong>24h</strong><span>typical response time</span></div>
 </div>
 </section>

 {/* Product — the GrowMos platform */}
 <Product />

 {/* Pricing — packages */}
 <Pricing />

 {/* Methodology */}
 <section className="method-section" id="methodology">
 <div className="container">
 <header className="method-header">
 <span className="method-badge">Our Methodology</span>
 <h2 className="method-title">Our Methodology to Collaboration</h2>
 <p className="method-description">A clear, outcome-driven process designed for B2B founders and marketing leaders not another black-box software engagement.</p>
 </header>

 <ol className="method-timeline" aria-label="Engagement phases">
 <li className="method-timeline__rail" aria-hidden="true"></li>
 {[
 {
 num: "01",
 title: "Discovery & Data Audit",
 deliver: "A written brief current state, gaps, and a 90-day plan.",
 timeline: "1 week",
 cost: "Fixed-fee",
 outcome: null,
 icon: "fa-solid fa-magnifying-glass-chart",
 color: "blue",
 },
 {
 num: "02",
 title: "Architecture & Roadmap",
 deliver: "A blueprint covering sources, stack, KPIs, and success metrics.",
 timeline: null,
 cost: null,
 outcome: "A locked roadmap before any code is written.",
 icon: "fa-solid fa-compass-drafting",
 color: "purple",
 },
 {
 num: "03",
 title: "Build & Migrate",
 deliver: "Working dashboards in sprints, weekly demos.",
 timeline: "First dashboard in 2–3 weeks; full rollout in 6–12 weeks.",
 cost: null,
 outcome: null,
 icon: "fa-solid fa-cubes-stacked",
 color: "green",
 },
 {
 num: "04",
 title: "Validate & Launch",
 deliver: "Tested pipelines, validated metrics, full documentation, team training.",
 timeline: null,
 cost: null,
 outcome: "A platform your team can run.",
 icon: "fa-solid fa-rocket",
 color: "amber",
 },
 {
 num: "05",
 title: "Monitor & Optimize",
 deliver: "24/7 monitoring, alerting, monthly reports, quarterly reviews.",
 timeline: null,
 cost: null,
 outcome: "A trusted platform with SLAs and a long-term partner.",
 icon: "fa-solid fa-chart-line",
 color: "rose",
 },
 ].map((phase) => (
 <li className="method-step" key={phase.num}>
 <div className="method-step__node">
 <span className="method-step__num">{phase.num}</span>
 </div>
 <article className={`method-card method-card--${phase.color}`}>
 <span className="method-card__num" aria-hidden="true">{phase.num}</span>
 <div className="method-card__icon" aria-hidden="true">
 <i className={phase.icon}></i>
 </div>
 <h3 className="method-card__title">{phase.title}</h3>
 <div className="method-card__body">
 <p className="method-card__deliver">{phase.deliver}</p>
 </div>
 </article>
 </li>
 ))}
 </ol>
 </div>
 </section>

 {/* Services */}
 <section className="svc-section" id="services">
 <div className="container">
 <header className="svc-header">
 <span className="svc-header__label">What We Do</span>
 <h2 className="svc-title">Services Built to<br />Grow Your Business</h2>
 <p className="svc-description">End-to-end data services from pipelines to dashboards to long-term data operations. Built for B2B teams that need a partner, not another vendor.</p>
 </header>
 <div className="svc-grid">
 {[
 {
 num: "01",
 tone: "blue",
 icon: "fa-solid fa-database",
 title: "Data Pipeline Engineering",
 desc: "Automated, reliable data ingestion from every source your business runs on.",
 subs: ["Fivetran & Airbyte connectors", "Custom API & webhook ingestion", "Database replication (CDC)", "Schema management & monitoring"],
 href: "/data-pipeline-engineering",
 cta: "Explore Pipelines",
 img: "/images/services/data-pipeline.jpg",
 },
 {
 num: "02",
 tone: "violet",
 icon: "fa-solid fa-cube",
 title: "Data Warehousing",
 desc: "Scalable cloud data warehouses built for B2B scale without the bloat.",
 subs: ["BigQuery setup, optimization & cost control", "Microsoft Fabric implementation", "Multi-source consolidation", "Security, access control & governance"],
 href: "/cloud-data-warehousing",
 cta: "Explore Warehousing",
 img: "/images/services/data-warehousing.jpg",
 },
 {
 num: "03",
 tone: "green",
 icon: "fa-solid fa-code-branch",
 title: "Data Transformation & Modeling",
 desc: "Production-grade dbt models your analytics team can trust.",
 subs: ["dbt project setup & best-practice architecture", "Staging → intermediate → marts layered modeling", "Tests, documentation, and CI/CD", "Incremental models & performance tuning"],
 href: "/contact",
 cta: "Explore dbt Modeling",
 img: "/images/services/data-transformation.jpg",
 },
 {
 num: "04",
 tone: "amber",
 icon: "fa-solid fa-chart-line",
 title: "BI & Dashboard Development",
 desc: "Executive-grade dashboards that turn your warehouse into decisions.",
 subs: ["Power BI development & deployment", "Metabase setup & customization", "Self-serve analytics enablement", "KPI definition & metric governance"],
 href: "/bi-dashboards",
 cta: "Explore BI",
 img: "/images/services/bi-dashboard.jpg",
 },
 {
 num: "05",
 tone: "rose",
 icon: "fa-solid fa-plug",
 title: "CRM & Marketing Data Integration",
 desc: "Unify Salesforce, HubSpot, and ad platforms into a single source of truth.",
 subs: ["Salesforce & HubSpot data extraction", "Multi-touch attribution modeling", "Customer 360 & lifecycle analytics", "Paid media + CRM unified reporting"],
 href: "/crm-data-integration",
 cta: "Explore CRM Integration",
 img: "/images/services/crm-integration.jpg",
 },
 {
 num: "06",
 tone: "sage",
 icon: "fa-solid fa-gears",
 title: "Managed DataOps & Advisory",
 desc: "A long-term data partner monitoring, optimization, and strategy on retainer.",
 subs: ["24/7 pipeline monitoring & alerting", "Monthly health & cost reports", "Quarterly roadmap reviews", "Data strategy & team enablement"],
 href: "/contact",
 cta: "Explore Managed DataOps",
 img: "/images/services/managed-dataops.jpg",
 },
 ].map((svc, i) => (
 <article className={`svc-card svc-card--${svc.tone}`} key={i}>
 <span className="svc-card__num" aria-hidden="true">{svc.num}</span>
 <div className="svc-card__media">
 <Image
 src={svc.img}
 alt=""
 fill
 sizes="(max-width: 719px) 100vw, 828px"
 className="svc-card__img"
 priority={i === 0}
 />
 <div className="svc-card__media-overlay" aria-hidden="true">
 <div className="svc-card__media-tag">
 <i className={svc.icon}></i>
 <span>Service {svc.num}</span>
 </div>
 </div>
 </div>
 <div className="svc-card__body">
 <h3 className="svc-card__title">{svc.title}</h3>
 <p className="svc-card__desc">{svc.desc}</p>
 <ul className="svc-card__subs">
 {svc.subs.map((s, j) => <li key={j}><i className="fa-solid fa-circle-check"></i> {s}</li>)}
 </ul>
 <Link href={svc.href} className="svc-card__cta">{svc.cta} <i className="fa-solid fa-arrow-right"></i></Link>
 </div>
 </article>
 ))}
 </div>
 </div>
 </section>

 {/* Reviews highlighted customer outcomes (blacktwist.app pattern) */}
 <Reviews />

 {/* Tech Stack */}
 <section className="tech-stack" id="tech-stack">
 <div className="container">
 <div className="section__header">
 <span className="section__badge">Our Stack</span>
 <h2 className="section__title">The Modern Data Stack, <span className="gradient-text">Done Right</span></h2>
 <p className="section__subtitle">Best-in-class tools, integrated and maintained by our team so you don't have to.</p>
 </div>
 <div className="tech-stack__grid">
 {dataStack.map((t, i) => (
 <div key={i} className="tech-item">
 <Image src={t.src} alt={t.label} width={64} height={64} className="tech-item__logo" />
 <span>{t.label}</span>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* Data Stack Pipeline */}
 <DataStack />

 {/* Industries */}
 <section className="exp-section" id="industries">
 <div className="container">
 <div className="exp-head">
 <div className="exp-head__left">
 <span className="exp-badge">Built For</span>
 <h2 className="exp-title">Industries We<br /><span className="exp-title__accent">Transform</span></h2>
 </div>
 <div className="exp-head__right">
 <p className="exp-desc">We bring deep domain knowledge and proven execution across SaaS, E-commerce, EdTech, and Retail plus the adjacent verticals that share their data problems.</p>
 </div>
 </div>
 <div className="exp-grid">
 {industries.map((ind, i) => (
 <div key={i} className={`exp-card exp-card--${ind.color}`}>
 <div className="exp-card__icon"><i className={ind.icon}></i></div>
 <div className="exp-card__content"><h3 className="exp-card__name">{ind.name}</h3><p className="exp-card__sub">{ind.sub}</p></div>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* FAQ */}
 <section className="faq" id="faq">
 <div className="container">
 <div className="section__header">
 <span className="section__badge">Have Questions?</span>
 <h2 className="section__title">Frequently Asked Questions</h2>
 </div>
 <div className="faq__grid">
 {faqs.map((faq, i) => (
 <div key={i} className="faq__item">
 <button className="faq__question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
 <span>{faq.q}</span>
 <i className={`fa-solid fa-chevron-${openFaq === i ? "up" : "down"}`}></i>
 </button>
 {openFaq === i && <div className="faq__answer"><p>{faq.a}</p></div>}
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* Blog */}
 <section className="blog" id="blog">
 <div className="container">
 <div className="blog__header">
 <h2 className="blog__title">Our Recent Blogs</h2>
 <p className="blog__subtitle">Insights, guides and industry deep-dives from the GrowMos team.</p>
 <Link href="/blog" className="blog__view-all">View All Posts <i className="fa-solid fa-arrow-right"></i></Link>
 </div>
 <div className="blog__grid">
 {posts.length === 0 ? (
 <p className="blog__empty">No posts published yet.</p>
 ) : posts.map((post, idx) => {
 const colors = ["pink","purple","green"];
 const color = colors[idx % 3];
 return (
 <Link key={post.id} href={`/blog/${post.slug}`} className="blog-card">
 <div className="blog-card__image">
 {post.image_url ? <img src={post.image_url} alt={post.title} className="blog-card__img" /> : (
 <div className={`blog-card__placeholder blog-card__placeholder--${color}`}>
 <div className="blog-card__placeholder-badge">{post.category}</div>
 <div className="blog-card__placeholder-icon"><i className="fa-solid fa-newspaper"></i></div>
 </div>
 )}
 </div>
 <div className="blog-card__content">
 <span className={`blog-card__category blog-card__category--${color}`}>{post.category}</span>
 <h3 className="blog-card__title">{post.title}</h3>
 <p className="blog-card__excerpt">{post.excerpt}</p>
 <div className="blog-card__footer">
 <div className="blog-card__author">
 <div className="blog-card__avatar"><i className="fa-solid fa-user"></i></div>
 <div className="blog-card__author-info">
 <span className="blog-card__author-name">{post.author}</span>
 <span className="blog-card__date">{new Date(post.created_at).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}</span>
 </div>
 </div>
 <span className="blog-card__read-more">Read more <i className="fa-solid fa-arrow-right"></i></span>
 </div>
 </div>
 </Link>
 );
 })}
 </div>
 </div>
 </section>

 {/* Contact */}
 <section className="contact-us" id="contact">
 <div className="contact-us__bg"><div className="contact-us__blob contact-us__blob--1"></div><div className="contact-us__blob contact-us__blob--2"></div><div className="contact-us__blob contact-us__blob--3"></div></div>
 <div className="container">
 <div className="contact-us__layout">
 <div className="contact-us__info">
 <span className="contact-us__badge"><i className="fa-solid fa-envelope-open-text"></i> Get In Touch</span>
 <h2 className="contact-us__title">Let&apos;s Build Something <span>Great</span> Together</h2>
 <ul className="contact-us__details">
 <li><span className="contact-us__detail-icon"><i className="fa-solid fa-envelope"></i></span><div><strong>Email Us</strong><a href="mailto:hello@growmos.com">hello@growmos.com</a></div></li>
 <li><span className="contact-us__detail-icon contact-us__detail-icon--whatsapp"><i className="fa-solid fa-calendar-check"></i></span><div><strong>Schedule</strong><a href="https://calendly.com/hello-growmos/30min" target="_blank" rel="noopener noreferrer">Book a 30-minute call</a></div></li>
 </ul>
 <div className="contact-us__trust">
 <div className="contact-us__trust-item"><i className="fa-solid fa-shield-halved"></i><span>Your data is safe with us</span></div>
 <div className="contact-us__trust-item"><i className="fa-solid fa-bolt"></i><span>Response within 24 hours</span></div>
 <div className="contact-us__trust-item"><i className="fa-solid fa-star"></i><span>100+ projects delivered</span></div>
 </div>
 </div>
 <div className="contact-us__card">
 <form className="contact-us__form" noValidate onSubmit={handleContact}>
 <div className="contact-us__row">
 <div className="contact-us__field">
 <label>Full Name <span>*</span></label>
 <div className="contact-us__input-wrap"><i className="fa-solid fa-user"></i><input type="text" placeholder="John Smith" required value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} /></div>
 </div>
 <div className="contact-us__field">
 <label>Email Address <span>*</span></label>
 <div className="contact-us__input-wrap"><i className="fa-solid fa-envelope"></i><input type="email" placeholder="john@company.com" required value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} /></div>
 </div>
 </div>
 <div className="contact-us__row">
 <div className="contact-us__field">
 <label>Phone Number</label>
 <div className="contact-us__input-wrap"><i className="fa-solid fa-phone"></i><input type="tel" placeholder="+1 (234) 567-890" value={form.phone} onChange={e=>setForm(p=>({...p,phone:e.target.value}))} /></div>
 </div>
 <div className="contact-us__field">
 <label>Service Interested In</label>
 <div className="contact-us__input-wrap contact-us__input-wrap--select"><i className="fa-solid fa-briefcase"></i>
 <select value={form.service} onChange={e=>setForm(p=>({...p,service:e.target.value}))}>
 <option value="">Select a service…</option>
 <option>Custom Software Development</option>
 <option>Digital Marketing</option>
 <option>BI Reporting &amp; AI</option>
 <option>Boss Model</option>
 <option>Other</option>
 </select>
 </div>
 </div>
 </div>
 <div className="contact-us__field">
 <label>Your Message <span>*</span></label>
 <div className="contact-us__input-wrap contact-us__input-wrap--textarea"><i className="fa-solid fa-comment-dots"></i><textarea rows={5} placeholder="Tell us about your project, goals, or questions…" required value={form.message} onChange={e=>setForm(p=>({...p,message:e.target.value}))}></textarea></div>
 </div>
 <button type="submit" className="contact-us__submit" disabled={status==="sending"}>
 <span className="contact-us__submit-text">{status==="sending"?"Sending…":"Send Message"}</span>
 <i className="fa-solid fa-paper-plane"></i>
 </button>
 {status==="ok" && <div className="contact-us__feedback" style={{color:"var(--success)"}}>Message sent! We&apos;ll be in touch within 24 hours.</div>}
 {status==="err" && <div className="contact-us__feedback" style={{color:"var(--error)"}}>Something went wrong. Please try again.</div>}
 </form>
 </div>
 </div>
 </div>
 </section>
 </main>
 );
}
