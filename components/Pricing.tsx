"use client";

import Link from "next/link";
import { pricingTiers } from "@/lib/pricing";

export default function Pricing() {
 return (
 <section className="pricing-section" id="pricing">
 <div className="container">
 {/* Header */}
 <header className="pricing-section__header">
 <span className="section__badge">Pricing</span>
 <h2 className="pricing-section__title">
 Packages that <span className="gradient-text">scale with you</span>
 </h2>
 <p className="pricing-section__sub">
 Monthly subscriptions, not retainers. Month-to-month, no long lock-in.
 Pick the tier that fits today and move up as you grow.
 </p>
 </header>

 {/* Tier grid */}
 <div className="pricing-section__grid">
 {pricingTiers.map(function (t) {
 const cls = "pricing-tier" + (t.featured ? " pricing-tier--featured" : "");
 const btnCls = "btn " + (t.featured ? "btn--primary" : "btn--ghost") + " btn--lg pricing-tier__cta";
 return (
 <article key={t.name} className={cls}>
 {t.featured ? <div className="pricing-tier__badge">Most popular</div> : null}
 <div className="pricing-tier__head">
 <h3 className="pricing-tier__name">{t.name}</h3>
 <p className="pricing-tier__tagline">{t.tagline}</p>
 <div className="pricing-tier__price">
 <span className="pricing-tier__price-value">{t.price}</span>
 {t.priceSuffix ? <span className="pricing-tier__price-suffix">{t.priceSuffix}</span> : null}
 </div>
 {t.priceNote ? <p className="pricing-tier__price-note">{t.priceNote}</p> : null}
 </div>
 <Link href={t.ctaHref} className={btnCls}>
 {t.cta} <i className="fa-solid fa-arrow-right"></i>
 </Link>
 <ul className="pricing-tier__features">
 {t.features.map(function (f) {
 return (
 <li key={f}>
 <i className="fa-solid fa-check" aria-hidden="true"></i>
 <span>{f}</span>
 </li>
 );
 })}
 </ul>
 </article>
 );
 })}
 </div>

 {/* Trust strip */}
 <div className="pricing-section__trust">
 <div className="pricing-section__trust-item">
 <i className="fa-solid fa-shield-halved" aria-hidden="true"></i>
 <span>SOC 2 Type II in progress</span>
 </div>
 <div className="pricing-section__trust-item">
 <i className="fa-solid fa-rotate-left" aria-hidden="true"></i>
 <span>30-day cancellation</span>
 </div>
 <div className="pricing-section__trust-item">
 <i className="fa-solid fa-credit-card" aria-hidden="true"></i>
 <span>No hidden fees</span>
 </div>
 <div className="pricing-section__trust-item">
 <i className="fa-solid fa-headset" aria-hidden="true"></i>
 <span>Real humans, not chatbots</span>
 </div>
 </div>
 </div>
 </section>
 );
}