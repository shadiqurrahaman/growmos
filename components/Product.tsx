import Link from "next/link";
import Image from "next/image";
import { productFeatures } from "@/lib/product";

export default function Product() {
 return (
 <section className="product-section" id="product">
 <div className="container">
 {/* Tier A — Hero band */}
 <header className="product-section__hero">
 <div className="product-section__hero-copy">
 <span className="section__badge">The Product</span>
 <h2 className="product-section__title">
 One platform. Every <span className="gradient-text">data workflow</span>.
 </h2>
 <p className="product-section__sub">
 Sources to warehouse to dashboards in one place. Built and run by
 the same team that delivers your engagement.
 </p>
 <div className="product-section__actions">
 <Link href="/contact" className="btn btn--primary">
 Book a demo <i className="fa-solid fa-arrow-right"></i>
 </Link>
 <Link href="/data-pipeline-engineering" className="btn btn--ghost">
 How it works
 </Link>
 </div>
 </div>
 <div className="product-section__hero-visual">
 <Image
 src="/images/product/platform-mockup.png"
 alt="GrowMos platform dashboard preview showing connected data sources, transformations, and live metrics"
 width={720}
 height={460}
 className="product-section__mockup"
 priority
 />
 </div>
 </header>

 {/* Tier B — Capability grid */}
 <div className="product-section__grid">
 {productFeatures.map((f) => (
 <article className="product-feature" key={f.title}>
 <div className="product-feature__icon">
 <i className={f.icon} aria-hidden="true"></i>
 </div>
 <h3 className="product-feature__title">{f.title}</h3>
 <p className="product-feature__desc">{f.desc}</p>
 <Link href={f.href} className="product-feature__link">
 Learn more <i className="fa-solid fa-arrow-right"></i>
 </Link>
 </article>
 ))}
 </div>

 {/* Tier C — Closing CTA */}
 <div className="product-section__cta">
 <h3 className="product-section__cta-title">
 See it run in your stack.
 </h3>
 <p className="product-section__cta-sub">
 20-minute demo. No commitment. Real numbers from your data.
 </p>
 <Link href="/contact" className="btn btn--primary btn--lg">
 Book a platform demo <i className="fa-solid fa-arrow-right"></i>
 </Link>
 </div>
 </div>
 </section>
 );
}