import Link from "next/link";
import { JsonLd } from "@/lib/jsonld";
import { siteUrl, siteName, pageUrl } from "@/lib/seo";

export interface IntegrationPageData {
  accent: string;
  brand: string; // "Salesforce" | "HubSpot"
  tagline: string;
  titleTop: string;
  titleGradient: string;
  description: string;
  stats: { value: string; label: string }[];
  useCases: { icon: string; title: string; desc: string }[];
  capabilities: { icon: string; title: string; desc: string }[];
  process: { n: string; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  ctaTitle: string;
  ctaGradient: string;
  ctaText: string;
  // Optional schema-rendering fields.
  path?: string;
  serviceType?: string;
  pageTitle?: string;
}

export default function IntegrationPage(data: IntegrationPageData) {
  // Derive schema fields.
  const derivedPath = data.path ?? "/";
  const derivedTitle =
    data.pageTitle ?? `${data.titleTop} ${data.titleGradient}`.trim();
  const derivedServiceType = data.serviceType ?? `${data.brand} Integration`;
  const pageUrlAbsolute = pageUrl(derivedPath);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrlAbsolute}#service`,
    name: derivedTitle,
    serviceType: derivedServiceType,
    description: data.description,
    url: pageUrlAbsolute,
    provider: { "@id": `${siteUrl}#organization` },
    areaServed: { "@type": "Place", name: "Worldwide" },
    brand: { "@type": "Brand", name: siteName },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      priceRange: "$$$",
      availability: "https://schema.org/InStock",
      url: pageUrlAbsolute,
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrlAbsolute}#faq`,
    mainEntity: data.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Integrations",
        item: pageUrl("/crm-data-integration"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: derivedTitle,
        item: pageUrlAbsolute,
      },
    ],
  };

  return (
    <main className="main integration" style={{ ["--int-accent" as string]: data.accent }}>
      <JsonLd data={[serviceJsonLd, faqJsonLd, breadcrumbJsonLd]} />
      {/* Hero */}
      <section className="page-hero integration-hero">
        <div className="hero__bg-shapes">
          <div className="shape shape--1"></div>
          <div className="shape shape--2"></div>
        </div>
        <div className="container">
          <div className="page-hero__content">
            <span className="page-hero__badge integration-badge">
              GrowMos × {data.brand}
            </span>
            <h1 className="page-hero__title">
              <span className="page-hero__title-line">{data.titleTop}</span>{" "}
              <span className="gradient-text integration-gradient">{data.titleGradient}</span>
            </h1>
            <p className="page-hero__description">{data.description}</p>
            <div className="page-hero__actions">
              <Link href="/contact" className="btn btn--primary btn--lg">
                Book a {data.brand} Briefing <i className="fa-solid fa-arrow-right"></i>
              </Link>
              <Link href="/crm-data-integration" className="btn btn--ghost btn--lg">
                See the Full CRM Integration Service
              </Link>
            </div>
          </div>
          <div className="integration-stats">
            {data.stats.map((s, i) => (
              <div key={i} className="integration-stat">
                <span className="integration-stat__value">{s.value}</span>
                <span className="integration-stat__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="integration-usecases">
        <div className="container">
          <div className="section__header">
            <span className="section__badge">Use Cases</span>
            <h2 className="section__title">
              What you can do with {data.brand} <span className="gradient-text integration-gradient">+ GrowMos</span>
            </h2>
          </div>
          <div className="integration-usecases__grid">
            {data.useCases.map((u, i) => (
              <div key={i} className="integration-card">
                <div className="integration-card__icon">
                  <i className={u.icon}></i>
                </div>
                <h3 className="integration-card__title">{u.title}</h3>
                <p className="integration-card__desc">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="integration-capabilities">
        <div className="container">
          <div className="section__header">
            <span className="section__badge">What We Deliver</span>
            <h2 className="section__title">
              Capabilities, Not <span className="gradient-text integration-gradient">Buzzwords</span>
            </h2>
          </div>
          <div className="integration-capabilities__grid">
            {data.capabilities.map((c, i) => (
              <div key={i} className="integration-capability">
                <div className="integration-capability__icon">
                  <i className={c.icon}></i>
                </div>
                <div>
                  <h3 className="integration-capability__title">{c.title}</h3>
                  <p className="integration-capability__desc">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="integration-process">
        <div className="container">
          <div className="section__header">
            <span className="section__badge">Engagement</span>
            <h2 className="section__title">
              How a {data.brand} <span className="gradient-text integration-gradient">Project Runs</span>
            </h2>
          </div>
          <div className="integration-process__grid">
            {data.process.map((p, i) => (
              <div key={i} className="integration-step">
                <div className="integration-step__num">{p.n}</div>
                <h3 className="integration-step__title">{p.title}</h3>
                <p className="integration-step__desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="integration-faq">
        <div className="container">
          <div className="section__header">
            <span className="section__badge">Good to Know</span>
            <h2 className="section__title">
              {data.brand} <span className="gradient-text integration-gradient">FAQ</span>
            </h2>
          </div>
          <div className="integration-faq__list">
            {data.faqs.map((f, i) => (
              <details key={i} className="integration-faq__item">
                <summary>
                  {f.q}
                  <i className="fa-solid fa-plus integration-faq__icon"></i>
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="cta__bg-shapes">
          <div className="cta__shape cta__shape--1"></div>
          <div className="cta__shape cta__shape--2"></div>
        </div>
        <div className="container">
          <div className="cta__content">
            <h2 className="cta__title">
              {data.ctaTitle}
              <br />
              <span className="gradient-text integration-gradient">{data.ctaGradient}</span>
            </h2>
            <p className="cta__description">{data.ctaText}</p>
            <div className="cta__actions">
              <Link href="/contact" className="btn btn--primary btn--lg">
                Book Your Briefing <i className="fa-solid fa-calendar-check"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}