"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

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

const techStack = [
  { icon: "fa-brands fa-laravel", label: "Laravel" },
  { icon: "fa-brands fa-react", label: "React" },
  { icon: "fa-brands fa-php", label: "PHP" },
  { icon: "fa-brands fa-java", label: "Java" },
  { icon: "fa-brands fa-python", label: "Python" },
  { icon: "fa-brands fa-vuejs", label: "Vue.js" },
  { icon: "fa-brands fa-golang", label: "Go" },
  { icon: "fa-brands fa-microsoft", label: ".Net" },
  { icon: "fa-brands fa-aws", label: "AWS" },
  { icon: "fa-brands fa-node-js", label: "Node.js" },
  { icon: "fa-brands fa-angular", label: "Angular" },
  { icon: "fa-brands fa-flutter", label: "Flutter" },
];

const industries = [
  { icon: "fa-solid fa-cart-shopping", name: "E-commerce", sub: "Paid growth, storefronts & conversion optimisation", color: "blue" },
  { icon: "fa-solid fa-heart-pulse", name: "Healthcare", sub: "Patient platforms & clinic management software", color: "green" },
  { icon: "fa-solid fa-graduation-cap", name: "Education", sub: "eLearning tools, LMS & student engagement apps", color: "amber" },
  { icon: "fa-solid fa-building-columns", name: "Finance", sub: "FinTech apps, dashboards & compliance systems", color: "purple" },
  { icon: "fa-solid fa-truck-fast", name: "Logistics", sub: "Fleet tracking, route ops & supply chain tech", color: "orange" },
  { icon: "fa-solid fa-utensils", name: "Food & Beverage", sub: "Ordering platforms, POS & loyalty programmes", color: "red" },
  { icon: "fa-solid fa-concierge-bell", name: "Hospitality", sub: "Booking systems, reviews & guest experience", color: "teal" },
  { icon: "fa-solid fa-cloud", name: "SaaS", sub: "Product dev, AI feature builds & user growth", color: "indigo" },
];

const faqs = [
  { q: "What makes GrowMos a top business service development company in Bangladesh?", a: 'We combine world-class talent with the "Boss Model" approach, ensuring you focus on strategy while we handle execution.' },
  { q: "How does the custom software development process work at GrowMos?", a: "Our process starts with deep discovery to understand your needs, followed by strategic planning, agile development, rigorous testing, and continuous support." },
  { q: "What industries does your custom software development serve?", a: "We serve diverse industries including E-commerce, Healthcare, Education, Finance, Logistics, Food & Beverage, Hospitality, and SaaS." },
  { q: "How do you ensure quality in custom software development?", a: "Quality is ensured through our rigorous process: code reviews, automated testing, continuous integration, and dedicated QA teams." },
];

type Post = { id: number; title: string; slug: string; excerpt: string; image_url: string | null; category: string; author: string; created_at: string };

function useCounter(target: number, trigger: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let cur = 0;
    const step = Math.max(1, Math.ceil(target / 80));
    const t = setInterval(() => { cur = Math.min(cur + step, target); setCount(cur); if (cur >= target) clearInterval(t); }, 20);
    return () => clearInterval(t);
  }, [target, trigger]);
  return count;
}

function StatCard({ label, target, color, cls }: { label: string; target: number; color: string; cls: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const count = useCounter(target, vis);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.5 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return (
    <div ref={ref} className={`bento-item ${cls} bento-stat bento-stat--${color}`}>
      <span className="bento-stat__label">{label}</span>
      <span className="bento-stat__number">{count}<span className="bento-stat__plus">+</span></span>
    </div>
  );
}

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle"|"sending"|"ok"|"err">("idle");
  const floatRef = useRef<HTMLDivElement>(null);

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

  return (
    <main className="main">
      {/* Hero */}
      <section className="hero-new" id="hero">
        <div className="hero-new__bg-shapes">
          <div className="hero-new__shape hero-new__shape--1"></div>
          <div className="hero-new__shape hero-new__shape--2"></div>
        </div>
        <div className="container">
          <div className="hero-new__content">
            <span className="hero-new__badge">Top Business Management Agency</span>
            <h1 className="hero-new__title">AI Driven Business Growth <br />And Marketing Solution</h1>
            <p className="hero-new__description">From concept to code GrowMos delivers tailored business solutions as your most trusted business growth solution provider.</p>
            <div className="hero-new__actions">
              <Link href="/contact" className="btn btn--primary btn--lg">Hire The Best Team <i className="fa-solid fa-arrow-right"></i></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="bento-section">
        <div className="bento-grid">
          <div className="bento-item bento-item--1"><div className="placeholder-image placeholder-image--bento" style={{position:"relative"}}><Image src="/images/team_coloboration.jpg" alt="Team Collaboration" fill style={{objectFit:"cover"}} /></div></div>
          <StatCard label="Top Talents" target={300} color="blue" cls="bento-item--2" />
          <div className="bento-item bento-item--3"><div className="placeholder-image placeholder-image--bento" style={{position:"relative"}}><Image src="/images/web_developer.jpg" alt="Web developer" fill style={{objectFit:"cover"}} /></div></div>
          <div className="bento-item bento-item--4"><div className="placeholder-image placeholder-image--bento placeholder-image--accent" style={{position:"relative"}}><Image src="/images/CEO.jpg" alt="CEO" fill style={{objectFit:"cover"}} /></div></div>
          <StatCard label="Projects" target={80} color="pink" cls="bento-item--5" />
          <div className="bento-item bento-item--6"><div className="placeholder-image placeholder-image--bento" style={{position:"relative"}}><Image src="/images/web_development2.png" alt="Web development" fill style={{objectFit:"cover"}} /></div></div>
          <div className="bento-item bento-item--7"><div className="placeholder-image placeholder-image--bento placeholder-image--accent" style={{position:"relative"}}><Image src="/images/social_media_marketing.jpg" alt="Social media" fill style={{objectFit:"cover"}} /></div></div>
          <StatCard label="Experience" target={8} color="green" cls="bento-item--8" />
          <StatCard label="Tech Stack" target={20} color="purple" cls="bento-item--9" />
          <div className="bento-item bento-item--10"><div className="placeholder-image placeholder-image--bento" style={{position:"relative"}}><Image src="/images/devteam.jpg" alt="Dev team" fill style={{objectFit:"cover"}} /></div></div>
        </div>
        <div ref={floatRef} className="hero-new__floating-cta">
          <div className="floating-cta__avatar"><i className="fa-solid fa-user"></i></div>
          <span>Get Free Consultancy</span>
          <button className="floating-cta__close" onClick={() => { if (floatRef.current) floatRef.current.style.display = "none"; }}><i className="fa-solid fa-xmark"></i></button>
        </div>
      </section>

      {/* Worked With */}
      <section className="worked-section">
        <div className="worked-marquee">
          <div className="worked-track">
            {[...workedLogos, ...workedLogos].map((logo, i) => (
              <div className="worked-logo" key={i} aria-hidden={i >= workedLogos.length ? "true" : undefined}>
                <Image src={`/images/workedlogos/${logo.file}`} alt={i < workedLogos.length ? logo.alt : ""} width={120} height={48} style={{objectFit:"contain"}} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="roadmap" id="roadmap">
        <div className="container">
          <div className="section__header">
            <span className="section__badge">Your Journey</span>
            <h2 className="section__title">How We Transform Your <span className="gradient-text">Business</span></h2>
            <p className="section__subtitle">A clear roadmap from concept to success with GrowMos</p>
          </div>
          <div className="roadmap__image-wrap">
            <picture>
              <source media="(max-width: 767px)" srcSet="/images/org-chart-mobile.png" />
              <img src="/images/org-chart.png" alt="GrowMos Team Structure" className="roadmap__image" />
            </picture>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="method-section" id="methodology">
        <div className="container">
          <header className="method-header">
            <h2 className="method-title">Our Methodology to<br />Collaboration</h2>
            <p className="method-description">We follow an agile development methodology and guarantee the timely delivery of high-quality services.</p>
          </header>
          <div className="method-cards-grid">
            {[
              { color:"pink", num:"01", title:"Requirements Discussion" },
              { color:"green", num:"02", title:"MVP Services" },
              { color:"blue", num:"03", title:"End to End Development" },
              { color:"purple", num:"04", title:"Testing and Maintenance" },
            ].map((c, i) => (
              <div key={i} className={`method-card method-card-${c.color}`}>
                <div className="method-card-top">
                  <div className="method-icon-container">
                    <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                  </div>
                  <span className="method-number">{c.num}</span>
                </div>
                <h3 className="method-card-title">{c.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="svc-section" id="services">
        <div className="container">
          <div className="svc-header">
            <div className="svc-header__label">What We Do</div>
            <h2 className="svc-title">Services Built to<br />Grow Your Business</h2>
          </div>
          <div className="svc-grid">
            {[
              { img:"/images/svc-digital-marketing.jpg", icon:"fa-brands fa-meta", title:"AI-driven Meta Ads", desc:"AI-powered Facebook & Instagram campaigns that target the right audience and maximise ROAS.", subs:["Audience Research & Targeting","Meta Pixel & Conversions API Setup","Campaign Strategy & Funnel Building","Account Management"], href:"/meta-ads" },
              { img:"/images/svc-boss-model.jpg", icon:"fa-brands fa-google", title:"AI-driven Google Ads", desc:"Capture high-intent buyers the moment they search — with AI-optimised campaigns across all Google channels.", subs:["Search Ads Setup & Management","Google Shopping & Merchant Center","Keyword Research & Competitor Analysis","Performance Max (PMax) Management"], href:"/google-ads" },
              { img:"/images/svc-software-dev.jpg", icon:"fa-solid fa-code", title:"Software Dev & AI Integration", desc:"Custom-built software and AI systems that streamline operations and give your business a competitive edge.", subs:["Web Development","Custom AI Assistants & RAG Systems","AI Workflow Automation","Mobile App Development"], href:"/custom-software-development" },
              { img:"/images/svc-bi-ai.jpg", icon:"fa-solid fa-film", title:"AI Video & Editing", desc:"Stop-scroll video content powered by AI that converts viewers into customers across every platform.", subs:["AI Video Generation","UGC Ad Editing","E-Commerce Product Video Ads","AI Workflow Integration"], href:"/ai-video-editing" },
              { img:"/images/web_analytics.jpg", icon:"fa-solid fa-chart-pie", title:"Web Analytics & BI", desc:"Turn raw data into clear decisions with intelligent dashboards, event tracking, and AI-powered insights.", subs:["GA4 & Google Tag Manager Setup","Custom Event & E-commerce Tracking","E-commerce Funnel Analysis","Dashboard Creation"], href:"/bi-reporting-ai" },
              { img:"/images/social-media-management.jpg", icon:"fa-solid fa-share-nodes", title:"Social Media Management", desc:"Full-service social media management that grows your audience and turns followers into paying customers.", subs:["Social Media Strategy & Consulting","Visual Branding & Template Design","Platform-Specific Niche Management","Creator & Influencer Operations"], href:"/social-media-management" },
            ].map((svc, i) => (
              <div className="svc-card" key={i}>
                <div className="svc-card__image-wrap">
                  <img className="svc-card__image" src={svc.img} alt={svc.title} />
                  <div className="svc-card__overlay"></div>
                  <div className="svc-card__icon"><i className={svc.icon}></i></div>
                </div>
                <div className="svc-card__body">
                  <h3 className="svc-card__title">{svc.title}</h3>
                  <p className="svc-card__desc">{svc.desc}</p>
                  <ul className="svc-card__subs">
                    {svc.subs.map((s, j) => <li key={j}><i className="fa-solid fa-circle-check"></i> {s}</li>)}
                  </ul>
                  <Link href={svc.href} className="svc-card__cta">Learn More <i className="fa-solid fa-arrow-right"></i></Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Works */}
      <section className="works-section" id="recent-works">
        <div className="container">
          <div className="works-header">
            <div className="works-header__left">
              <span className="works-badge">Recent Work</span>
              <h2 className="works-title">Results We&apos;ve<br />Delivered</h2>
            </div>
            <div className="works-header__right">
              <p className="works-desc">From full-stack builds to paid media — here&apos;s the impact we&apos;ve made across real businesses.</p>
            </div>
          </div>
        </div>
        <div className="works-strip"><div className="works-track">
          <div className="works-card">
            <div className="works-card__screen works-card__screen--purple">
              <div className="works-screen__chrome"><div className="works-screen__dots"><span className="works-screen__dot"></span><span className="works-screen__dot"></span><span className="works-screen__dot"></span></div><div className="works-screen__url"></div></div>
              <div className="works-screen__body">
                <div className="wk-web__banner"><div className="wk-web__banner-text"></div><div className="wk-web__banner-btn"></div></div>
                <div className="wk-web__products">{[0,1,2].map(i=><div key={i} className="wk-web__product"><div className="wk-web__product-img"></div><div className="wk-web__product-info"></div><div className="wk-web__product-price"></div></div>)}</div>
              </div>
            </div>
            <div className="works-card__body">
              <span className="works-card__tag works-card__tag--purple">Web Development</span>
              <h3 className="works-card__title">E-Commerce Platform Rebuild</h3>
              <p className="works-card__desc">Rebuilt an outdated online store into a fast, conversion-focused platform with custom UX and a streamlined checkout.</p>
              <div className="works-card__metrics"><div className="works-metric"><span className="works-metric__val">3.2×</span><span className="works-metric__lbl">Faster Load Time</span></div><div className="works-metric__divider"></div><div className="works-metric"><span className="works-metric__val">+38%</span><span className="works-metric__lbl">Conversion Rate</span></div></div>
            </div>
          </div>
          <div className="works-card">
            <div className="works-card__screen works-card__screen--orange">
              <div className="works-screen__chrome"><div className="works-screen__dots"><span className="works-screen__dot"></span><span className="works-screen__dot"></span><span className="works-screen__dot"></span></div><div className="works-screen__url"></div></div>
              <div className="works-screen__body">
                <div className="wk-meta__toprow">{[{v:"4.1×",l:"ROAS"},{v:"£45k",l:"Mo. Spend"},{v:"2.8%",l:"CTR"}].map((k,i)=><div key={i} className="wk-meta__kpi"><div className="wk-meta__kpi-val">{k.v}</div><div className="wk-meta__kpi-lbl">{k.l}</div></div>)}</div>
                <div className="wk-meta__chart"><div className="wk-meta__bars">{[50,65,48,82,72,100,90].map((h,i)=><div key={i} className={`wk-meta__bar${h===100?" wk-meta__bar--peak":""}`} style={{height:`${h}%`}}></div>)}</div></div>
              </div>
            </div>
            <div className="works-card__body">
              <span className="works-card__tag works-card__tag--orange">Meta Ads</span>
              <h3 className="works-card__title">D2C Brand Paid Social Scale</h3>
              <p className="works-card__desc">Scaled a D2C brand from £8k to £45k monthly ad spend while maintaining a strong return on ad spend throughout.</p>
              <div className="works-card__metrics"><div className="works-metric"><span className="works-metric__val">4.1×</span><span className="works-metric__lbl">ROAS</span></div><div className="works-metric__divider"></div><div className="works-metric"><span className="works-metric__val">5.6×</span><span className="works-metric__lbl">Spend Scaled</span></div></div>
            </div>
          </div>
          <div className="works-card">
            <div className="works-card__screen works-card__screen--teal">
              <div className="works-screen__chrome"><div className="works-screen__dots"><span className="works-screen__dot"></span><span className="works-screen__dot"></span><span className="works-screen__dot"></span></div><div className="works-screen__url"></div></div>
              <div className="works-screen__body">
                <div className="wk-gads__searchbar"><div className="wk-gads__search-icon"><i className="fa-brands fa-google" style={{fontSize:"10px",color:"rgba(255,255,255,0.6)"}}></i></div><div className="wk-gads__search-text"></div></div>
                <div className="wk-gads__results">{[0,1].map(i=><div key={i} className="wk-gads__result"><div className="wk-gads__result-ad">Ad</div><div className="wk-gads__result-lines"><div className="wk-gads__result-title"></div><div className="wk-gads__result-url"></div><div className="wk-gads__result-desc"></div></div></div>)}</div>
                <div className="wk-gads__perf"><div className="wk-gads__perf-row"><div className="wk-gads__perf-lbl"></div><div className="wk-gads__perf-track"><div className="wk-gads__perf-fill" style={{width:"38%"}}></div></div></div><div className="wk-gads__perf-row"><div className="wk-gads__perf-lbl"></div><div className="wk-gads__perf-track"><div className="wk-gads__perf-fill wk-gads__perf-fill--bright" style={{width:"91%"}}></div></div></div></div>
              </div>
            </div>
            <div className="works-card__body">
              <span className="works-card__tag works-card__tag--teal">Google Ads</span>
              <h3 className="works-card__title">B2B SaaS Lead Generation</h3>
              <p className="works-card__desc">Restructured Google Search campaigns for a B2B SaaS product — cutting wasted spend and tripling qualified leads.</p>
              <div className="works-card__metrics"><div className="works-metric"><span className="works-metric__val">−62%</span><span className="works-metric__lbl">Cost Per Lead</span></div><div className="works-metric__divider"></div><div className="works-metric"><span className="works-metric__val">3×</span><span className="works-metric__lbl">Qualified Leads</span></div></div>
            </div>
          </div>
          <div className="works-card">
            <div className="works-card__screen works-card__screen--green">
              <div className="works-screen__chrome"><div className="works-screen__dots"><span className="works-screen__dot"></span><span className="works-screen__dot"></span><span className="works-screen__dot"></span></div><div className="works-screen__url"></div></div>
              <div className="works-screen__body">
                <div className="wk-ai__pipeline"><div className="wk-ai__node"><i className="fa-solid fa-database" style={{fontSize:"12px"}}></i></div><div className="wk-ai__connector"></div><div className="wk-ai__node wk-ai__node--main"><i className="fa-solid fa-microchip" style={{fontSize:"14px"}}></i></div><div className="wk-ai__connector"></div><div className="wk-ai__node"><i className="fa-solid fa-chart-bar" style={{fontSize:"12px"}}></i></div></div>
                <div className="wk-ai__metrics">{[{w:"95%",p:"95%"},{w:"88%",p:"88%"},{w:"72%",p:"72%"}].map((r,i)=><div key={i} className="wk-ai__row"><div className="wk-ai__row-lbl"></div><div className="wk-ai__row-track"><div className="wk-ai__row-fill" style={{width:r.w}}></div></div><span className="wk-ai__row-pct">{r.p}</span></div>)}</div>
                <div className="wk-ai__status"><span className="wk-ai__status-dot"></span><div className="wk-ai__status-text"></div></div>
              </div>
            </div>
            <div className="works-card__body">
              <span className="works-card__tag works-card__tag--green">AI Integration</span>
              <h3 className="works-card__title">Automated Reporting Pipeline</h3>
              <p className="works-card__desc">Built a custom AI pipeline that automated client reporting and data processing — eliminating manual weekly work entirely.</p>
              <div className="works-card__metrics"><div className="works-metric"><span className="works-metric__val">12hrs</span><span className="works-metric__lbl">Saved Per Week</span></div><div className="works-metric__divider"></div><div className="works-metric"><span className="works-metric__val">95%</span><span className="works-metric__lbl">Accuracy Rate</span></div></div>
            </div>
          </div>
        </div></div>
      </section>

      {/* Tech Stack */}
      <section className="tech-stack" id="tech-stack">
        <div className="container">
          <div className="section__header"><h2 className="section__title">We Serve All Tech Stacks</h2></div>
          <div className="tech-stack__grid">
            {techStack.map((t, i) => <div key={i} className="tech-item"><i className={t.icon}></i><span>{t.label}</span></div>)}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="exp-section" id="industries">
        <div className="container">
          <div className="exp-head">
            <div className="exp-head__left">
              <span className="exp-badge">Our Expertise</span>
              <h2 className="exp-title">Industries We<br /><span className="exp-title__accent">Transform</span></h2>
            </div>
            <div className="exp-head__right">
              <p className="exp-desc">We bring deep domain knowledge and proven execution across the sectors that shape today&apos;s economy.</p>
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
                <li><span className="contact-us__detail-icon contact-us__detail-icon--whatsapp"><i className="fa-brands fa-whatsapp"></i></span><div><strong>WhatsApp Us</strong><a href="https://wa.me/8801731438768" target="_blank" rel="noopener noreferrer">+880 1731 438768</a></div></li>
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
