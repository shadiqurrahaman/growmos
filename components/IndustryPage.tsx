import Link from "next/link";

export interface IndustryPageData {
  accent: string;
  badge: string;
  titleTop: string;
  titleGradient: string;
  description: string;
  stats: { value: string; label: string }[];
  challengesBadge: string;
  challengesTitle: string;
  challengesGradient: string;
  challengesSubtitle: string;
  challenges: { icon: string; title: string; desc: string }[];
  solutionsBadge: string;
  solutionsTitle: string;
  solutionsGradient: string;
  solutionsSubtitle: string;
  solutions: { icon: string; title: string; desc: string; href?: string }[];
  processBadge: string;
  processTitle: string;
  processGradient: string;
  processSubtitle: string;
  process: { n: string; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  ctaTitle: string;
  ctaGradient: string;
  ctaText: string;
}

export default function IndustryPage(data: IndustryPageData) {
  return (
    <main className="main industry" style={{ ["--ind-accent" as string]: data.accent }}>
      {/* Hero */}
      <section className="page-hero industry-hero">
        <div className="hero__bg-shapes">
          <div className="shape shape--1"></div>
          <div className="shape shape--2"></div>
        </div>
        <div className="container">
          <div className="page-hero__content">
            <span className="page-hero__badge industry-badge">{data.badge}</span>
            <h1 className="page-hero__title">
              {data.titleTop}
              <br />
              <span className="gradient-text industry-gradient">{data.titleGradient}</span>
            </h1>
            <p className="page-hero__description">{data.description}</p>
            <div className="page-hero__actions">
              <Link href="/contact" className="btn btn--primary btn--lg">
                Book a Free Industry Briefing <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>
          <div className="industry-stats">
            {data.stats.map((s, i) => (
              <div key={i} className="industry-stat">
                <span className="industry-stat__value">{s.value}</span>
                <span className="industry-stat__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="industry-challenges">
        <div className="container">
          <div className="section__header">
            <span className="section__badge">{data.challengesBadge}</span>
            <h2 className="section__title">
              {data.challengesTitle}{" "}
              <span className="gradient-text industry-gradient">{data.challengesGradient}</span>
            </h2>
            <p className="section__subtitle">{data.challengesSubtitle}</p>
          </div>
          <div className="industry-challenges__grid">
            {data.challenges.map((c, i) => (
              <div key={i} className="industry-card">
                <div className="industry-card__icon">
                  <i className={c.icon}></i>
                </div>
                <h3 className="industry-card__title">{c.title}</h3>
                <p className="industry-card__desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="industry-solutions">
        <div className="container">
          <div className="section__header">
            <span className="section__badge">{data.solutionsBadge}</span>
            <h2 className="section__title">
              {data.solutionsTitle}{" "}
              <span className="gradient-text industry-gradient">{data.solutionsGradient}</span>
            </h2>
            <p className="section__subtitle">{data.solutionsSubtitle}</p>
          </div>
          <div className="industry-solutions__grid">
            {data.solutions.map((s, i) => (
              <div key={i} className="industry-solution">
                <div className="industry-solution__icon">
                  <i className={s.icon}></i>
                </div>
                <div>
                  <h3 className="industry-solution__title">{s.title}</h3>
                  <p className="industry-solution__desc">{s.desc}</p>
                  {s.href && (
                    <Link href={s.href} className="industry-solution__link">
                      Learn more <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="industry-process">
        <div className="container">
          <div className="section__header">
            <span className="section__badge">{data.processBadge}</span>
            <h2 className="section__title">
              {data.processTitle}{" "}
              <span className="gradient-text industry-gradient">{data.processGradient}</span>
            </h2>
            <p className="section__subtitle">{data.processSubtitle}</p>
          </div>
          <div className="industry-process__grid">
            {data.process.map((p, i) => (
              <div key={i} className="industry-step">
                <div className="industry-step__num">{p.n}</div>
                <h3 className="industry-step__title">{p.title}</h3>
                <p className="industry-step__desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="industry-faq">
        <div className="container">
          <div className="section__header">
            <span className="section__badge">Common Questions</span>
            <h2 className="section__title">
              {data.badge} <span className="gradient-text industry-gradient">FAQ</span>
            </h2>
          </div>
          <div className="industry-faq__list">
            {data.faqs.map((f, i) => (
              <details key={i} className="industry-faq__item">
                <summary>
                  {f.q}
                  <i className="fa-solid fa-plus industry-faq__icon"></i>
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
              <span className="gradient-text industry-gradient">{data.ctaGradient}</span>
            </h2>
            <p className="cta__description">{data.ctaText}</p>
            <div className="cta__actions">
              <Link href="/contact" className="btn btn--primary btn--lg">
                Book Your Free Briefing <i className="fa-solid fa-calendar-check"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}