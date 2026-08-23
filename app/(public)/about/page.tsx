import Link from "next/link";
import type { Metadata } from "next";
import Team from "@/components/Team";
import { siteUrl, siteName, siteFounder, pageUrl, buildPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/lib/jsonld";

export const metadata: Metadata = buildPageMetadata({
  title: "About | The Team Behind Your Data Platform",
  description:
    "GrowMos was founded in 2022 with one belief: data work should ship, stay shipped, and pay for itself within a quarter. Senior engineers and strategists behind every B2B data engagement.",
  path: "/about",
  type: "website",
  keywords: [
    "about GrowMos",
    "data engineering team",
    "B2B data consultancy",
    "dbt consultants",
    "Power BI consultants",
  ],
  image: "/images/team_coloboration.jpg",
  imageAlt: "The GrowMos team",
  ogDescription:
    "Real engineers, real strategists. The team behind every GrowMos B2B data engagement.",
});

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}#founder`,
  name: siteFounder.name,
  jobTitle: siteFounder.jobTitle,
  description: siteFounder.bio,
  knowsAbout: siteFounder.expertise,
  worksFor: {
    "@type": "Organization",
    "@id": `${siteUrl}#organization`,
    name: siteName,
    url: siteUrl,
  },
  url: pageUrl("/about"),
  // Entity disambiguation: link founder to every platform where GrowMos
  // (or the founder personally) has a verified presence. Helps AI
  // search engines and Google's Knowledge Graph match the entity.
  sameAs: [
    siteFounder.linkedinUrl,
    "https://www.crunchbase.com/organization/growmos",
    "https://g2.com/products/growmos",
    "https://clutch.co/profile/growmos",
    "https://www.linkedin.com/company/growmos",
  ],
};

export default function AboutPage() {
  return (
    <main className="main">
      <JsonLd data={personJsonLd} />

      <section className="page-hero">
        <div className="hero__bg-shapes">
          <div className="shape shape--1"></div>
          <div className="shape shape--2"></div>
        </div>
        <div className="container">
          <div className="page-hero__content">
            <span className="page-hero__badge">About GrowMos</span>
            <h1 className="page-hero__title">
              <span>We exist for B2B teams that need a data foundation that </span>
              <span className="gradient-text">actually ships.</span>
            </h1>
            <p className="page-hero__description">
              GrowMos was founded in 2022 with one belief: data work should ship,
              stay shipped, and pay for itself within a quarter. We exist for B2B
              operations leaders who need a data foundation that actually works —
              built by real engineers, owned by you, measured by outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Why GrowMos exists — three pillars */}
      <section className="about-pillars" id="why-growmos">
        <div className="container">
          <div className="section__header">
            <span className="section__badge">Why We Exist</span>
            <h2 className="section__title">
              Three things we <span className="gradient-text">won&apos;t compromise on</span>
            </h2>
            <p className="section__subtitle">
              The principles that decide what we take on, how we work, and who we hire.
            </p>
          </div>
          <div className="about-pillars__grid">
            <article className="about-pillar">
              <div
                className="about-pillar__icon about-pillar__icon--blue"
                aria-hidden="true"
              >
                <i className="fa-solid fa-rocket"></i>
              </div>
              <h3 className="about-pillar__title">Ship, then keep shipping</h3>
              <p className="about-pillar__body">
                A dashboard nobody trusts is worse than no dashboard. Every
                engagement has a definition of done measured in working queries,
                refreshed models, and decisions made from the output.
              </p>
            </article>
            <article className="about-pillar">
              <div
                className="about-pillar__icon about-pillar__icon--green"
                aria-hidden="true"
              >
                <i className="fa-solid fa-users-gear"></i>
              </div>
              <h3 className="about-pillar__title">Real team, not subcontractors</h3>
              <p className="about-pillar__body">
                Your engagement is staffed by named GrowMos engineers — not a
                marketplace of freelancers. The same people who scope your work
                are the ones who deliver it, support it, and answer your email.
              </p>
            </article>
            <article className="about-pillar">
              <div
                className="about-pillar__icon about-pillar__icon--purple"
                aria-hidden="true"
              >
                <i className="fa-solid fa-chart-line"></i>
              </div>
              <h3 className="about-pillar__title">Outcomes over output</h3>
              <p className="about-pillar__body">
                We bill against deliverables your team uses, not tickets closed.
                If a model isn&apos;t driving a decision in 90 days, we re-scope —
                not invoice for the next sprint.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Team grid (reuses components/Team.tsx) */}
      <Team />

      {/* CTA */}
      <section className="cta" id="contact">
        <div className="cta__bg-shapes">
          <div className="cta__shape cta__shape--1"></div>
          <div className="cta__shape cta__shape--2"></div>
        </div>
        <div className="container">
          <div className="cta__content">
            <h2 className="cta__title">
              Want to talk to the team
              <br />
              <span className="gradient-text">before you book?</span>
            </h2>
            <p className="cta__description">
              Drop us a note with what you&apos;re trying to figure out. A real
              engineer — not a sales rep — will reply within one business day.
            </p>
            <div className="cta__actions">
              <Link href="/contact" className="btn btn--primary btn--lg">
                Get in touch <i className="fa-solid fa-arrow-right"></i>
              </Link>
              <a
                href="https://calendly.com/hello-growmos/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--ghost btn--lg"
              >
                Book a 30-min call <i className="fa-solid fa-calendar-check"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}