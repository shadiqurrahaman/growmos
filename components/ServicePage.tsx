import Link from "next/link";
import { JsonLd } from "@/lib/jsonld";
import { siteUrl, siteName, pageUrl } from "@/lib/seo";
import { reviews } from "@/lib/reviews";

export interface ServiceCapability {
  id: string;
  icon: string;
  title: string;
  desc: string;
  points: string[];
}

export interface ServiceStep {
  n: string;
  title: string;
  desc: string;
}

export interface ServiceBenefit {
  icon: string;
  title: string;
  desc: string;
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServicePageData {
  accent: string;
  badge: string;
  titleTop: string;
  titleGradient: string;
  description: string;
  stats: { value: string; label: string }[];
  introHeading: string;
  introGradient: string;
  introText: string;
  introList: string[];
  capabilitiesBadge: string;
  capabilitiesTitle: string;
  capabilitiesGradient: string;
  capabilitiesSubtitle: string;
  capabilities: ServiceCapability[];
  processBadge: string;
  processTitle: string;
  processGradient: string;
  processSubtitle: string;
  process: ServiceStep[];
  benefitsBadge: string;
  benefitsTitle: string;
  benefitsGradient: string;
  benefitsSubtitle: string;
  benefits: ServiceBenefit[];
  faqs: ServiceFaq[];
  ctaTitle: string;
  ctaGradient: string;
  ctaText: string;
  // Optional fields used for schema generation. If omitted, defaults
  // are derived from the existing data (badge / titleTop+titleGradient).
  path?: string;            // e.g. "/data-pipeline-engineering"
  serviceType?: string;     // e.g. "Data Engineering"
  pageTitle?: string;       // Full <title>, used as Service.name
  parentSection?: {
    name: string;          // e.g. "Services"
    path: string;          // e.g. "/#services"
  };
}

export default function ServicePage(data: ServicePageData) {
  // Derive schema fields when not explicitly passed.
  const derivedPath = data.path ?? "/";
  const derivedTitle = data.pageTitle ?? `${data.titleTop} ${data.titleGradient}`.trim();
  const derivedServiceType = data.serviceType ?? data.badge;
  const derivedParent = data.parentSection ?? { name: "Home", path: "/" };

  const pageUrlAbsolute = pageUrl(derivedPath);
  // Schema.org structured data for capability pages.
  // Three blocks: Service, FAQPage, BreadcrumbList — all server-rendered
  // so every crawler (including non-Google AI crawlers) sees them in
  // the static HTML.
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
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${siteName} ${derivedServiceType} Capabilities`,
      itemListElement: data.capabilities.map((c) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: c.title,
          description: c.desc,
        },
      })),
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
        name: derivedParent.name,
        item: pageUrl(derivedParent.path),
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
    <main className="main sp" style={{ ["--sp-accent" as string]: data.accent }}>
      <JsonLd data={[serviceJsonLd, faqJsonLd, breadcrumbJsonLd]} />
      {/* Hero */}
      <section className="page-hero sp-hero">
        <div className="hero__bg-shapes">
          <div className="shape shape--1"></div>
          <div className="shape shape--2"></div>
        </div>
        <div className="container">
          <div className="page-hero__content">
            <span className="page-hero__badge sp-badge">{data.badge}</span>
            <h1 className="page-hero__title">
              <span className="page-hero__title-line">{data.titleTop}</span>{" "}
              <span className="gradient-text sp-gradient">{data.titleGradient}</span>
            </h1>
            <p className="page-hero__description">{data.description}</p>
            <div className="page-hero__actions sp-hero__actions">
              <Link href="/contact" className="btn btn--primary btn--lg">
                Get a Free Strategy Call <i className="fa-solid fa-arrow-right"></i>
              </Link>
              <a href="#capabilities" className="btn btn--ghost btn--lg sp-btn-ghost">
                See What&apos;s Included
              </a>
            </div>
          </div>
          <div className="sp-stats">
            {data.stats.map((s, i) => (
              <div key={i} className="sp-stat">
                <span className="sp-stat__value">{s.value}</span>
                <span className="sp-stat__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro / value */}
      <section className="sp-intro">
        <div className="container">
          <div className="sp-intro__grid">
            <div className="sp-intro__text">
              <h2 className="section__title">
                {data.introHeading}{" "}
                <span className="gradient-text sp-gradient">{data.introGradient}</span>
              </h2>
              <p className="sp-intro__desc">{data.introText}</p>
            </div>
            <ul className="sp-intro__list">
              {data.introList.map((item, i) => (
                <li key={i}>
                  <i className="fa-solid fa-circle-check"></i> <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="sp-cap" id="capabilities">
        <div className="container">
          <div className="section__header">
            <span className="section__badge">{data.capabilitiesBadge}</span>
            <h2 className="section__title">
              {data.capabilitiesTitle}{" "}
              <span className="gradient-text sp-gradient">{data.capabilitiesGradient}</span>
            </h2>
            <p className="section__subtitle">{data.capabilitiesSubtitle}</p>
          </div>
          <div className="sp-cap__grid">
            {data.capabilities.map((c, i) => (
              <div key={i} className="sp-cap__card" id={c.id}>
                <div className="sp-cap__icon">
                  <i className={c.icon}></i>
                </div>
                <h3 className="sp-cap__title">{c.title}</h3>
                <p className="sp-cap__desc">{c.desc}</p>
                <ul className="sp-cap__points">
                  {c.points.map((p, j) => (
                    <li key={j}>
                      <i className="fa-solid fa-check"></i> {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="sp-process">
        <div className="container">
          <div className="section__header">
            <span className="section__badge">{data.processBadge}</span>
            <h2 className="section__title">
              {data.processTitle}{" "}
              <span className="gradient-text sp-gradient">{data.processGradient}</span>
            </h2>
            <p className="section__subtitle">{data.processSubtitle}</p>
          </div>
          <div className="sp-process__grid">
            {data.process.map((s, i) => (
              <div key={i} className="sp-step">
                <div className="sp-step__num">{s.n}</div>
                <h3 className="sp-step__title">{s.title}</h3>
                <p className="sp-step__desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="sp-benefits">
        <div className="container">
          <div className="section__header">
            <span className="section__badge">{data.benefitsBadge}</span>
            <h2 className="section__title">
              {data.benefitsTitle}{" "}
              <span className="gradient-text sp-gradient">{data.benefitsGradient}</span>
            </h2>
            <p className="section__subtitle">{data.benefitsSubtitle}</p>
          </div>
          <div className="sp-benefits__grid">
            {data.benefits.map((b, i) => (
              <div key={i} className="sp-benefit">
                <div className="sp-benefit__icon">
                  <i className={b.icon}></i>
                </div>
                <div>
                  <h3 className="sp-benefit__title">{b.title}</h3>
                  <p className="sp-benefit__desc">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quantified proof — real client outcomes tied to this service */}
      <section className="sp-proof">
        <div className="container">
          <div className="section__header">
            <span className="section__badge">Selected Outcomes</span>
            <h2 className="section__title">
              Numbers from <span className="gradient-text sp-gradient">real engagements</span>
            </h2>
            <p className="section__subtitle">
              The metrics below come from named clients in B2B SaaS,
              e-commerce, and logistics. Names and figures published with
              their consent.
            </p>
          </div>
          <div className="sp-proof__grid">
            {reviews.map((r) => (
              <article className="sp-proof__card" key={r.initials}>
                {r.metric && (
                  <div className="sp-proof__metric">{r.metric}</div>
                )}
                <p className="sp-proof__quote">&ldquo;{r.quote}&rdquo;</p>
                <footer className="sp-proof__attrib">
                  <strong>{r.name}</strong>
                  <span>{r.role}, {r.company}</span>
                </footer>
              </article>
            ))}
          </div>
          <div className="sp-proof__cta">
            <Link href="/contact" className="btn btn--primary">
              Book a similar engagement <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sp-faq">
        <div className="container">
          <div className="section__header">
            <span className="section__badge">Good to Know</span>
            <h2 className="section__title">
              Frequently Asked <span className="gradient-text sp-gradient">Questions</span>
            </h2>
          </div>
          <div className="sp-faq__list">
            {data.faqs.map((f, i) => (
              <details key={i} className="sp-faq__item">
                <summary>
                  {f.q}
                  <i className="fa-solid fa-plus sp-faq__icon"></i>
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
              <span className="gradient-text sp-gradient">{data.ctaGradient}</span>
            </h2>
            <p className="cta__description">{data.ctaText}</p>
            <div className="cta__actions">
              <Link href="/contact" className="btn btn--primary btn--lg">
                Book Your Free Call <i className="fa-solid fa-calendar-check"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
