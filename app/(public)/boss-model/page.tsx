import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Boss Model | GrowMos",
  description: "You run the business. We run everything else. Our management operating system gives you a dedicated team.",
};

export default function BossModelPage() {
  return (
    <main className="main">
      <section className="page-hero">
        <div className="hero__bg-shapes">
          <div className="shape shape--1"></div>
          <div className="shape shape--2"></div>
        </div>
        <div className="container">
          <div className="page-hero__content">
            <span className="page-hero__badge">The &quot;Boss&quot; Model</span>
            <h1 className="page-hero__title">You Run the Business.<br /><span className="gradient-text">We Run Everything Else.</span></h1>
            <p className="page-hero__description">Stop managing tasks and start being the boss. Our management operating system gives you a dedicated team that handles tech, marketing, operations, and data &mdash; so you can focus on what matters most: growing your business.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="boss-steps" id="how-it-works">
        <div className="container">
          <div className="section__header">
            <span className="section__badge">How It Works</span>
            <h2 className="section__title">Four Simple Steps to <span className="gradient-text">Freedom</span></h2>
            <p className="section__subtitle">From first call to full operations in weeks, not months</p>
          </div>
          <div className="boss-steps__grid">
            {[
              { n:1, icon:"fa-solid fa-phone-volume", title:"Discovery Call", desc:"We learn about your business, goals, and pain points. No sales pitch — just an honest conversation about where you are and where you want to be." },
              { n:2, icon:"fa-solid fa-sitemap", title:"Custom Roadmap", desc:"We design a tailored plan with the exact team structure, tools, and milestones your business needs to hit the next level." },
              { n:3, icon:"fa-solid fa-people-group", title:"Team Deployment", desc:"Your dedicated team of developers, marketers, analysts, and support specialists is assembled and hits the ground running." },
              { n:4, icon:"fa-solid fa-chart-line", title:"You Lead, We Execute", desc:"You make the big decisions. We handle the execution, report progress, and continuously optimize everything under the hood." },
            ].map((s, i) => (
              <div key={i} className="boss-step">
                <div className="boss-step__number">{s.n}</div>
                <div className="boss-step__icon"><i className={s.icon}></i></div>
                <h3 className="boss-step__title">{s.title}</h3>
                <p className="boss-step__desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* You vs We */}
      <section className="boss-split" id="your-role">
        <div className="container">
          <div className="section__header">
            <span className="section__badge">Clear Roles</span>
            <h2 className="section__title">What You Handle vs. <span className="gradient-text">What We Handle</span></h2>
            <p className="section__subtitle">A clear division so nothing falls through the cracks</p>
          </div>
          <div className="boss-split__grid">
            <div className="boss-split__card boss-split__card--you">
              <div className="boss-split__card-header">
                <div className="boss-split__card-icon"><i className="fa-solid fa-crown"></i></div>
                <h3 className="boss-split__card-title">You &mdash; The Boss</h3>
              </div>
              <ul className="boss-split__list">
                {["Set the vision and business direction","Make high-level strategic decisions","Approve milestones and deliverables","Focus on client relationships","Grow your revenue and network","Review weekly progress reports"].map((item, i) => (
                  <li key={i}><i className="fa-solid fa-check"></i> <span>{item}</span></li>
                ))}
              </ul>
            </div>
            <div className="boss-split__divider"><div className="boss-split__vs">VS</div></div>
            <div className="boss-split__card boss-split__card--we">
              <div className="boss-split__card-header">
                <div className="boss-split__card-icon"><i className="fa-solid fa-gears"></i></div>
                <h3 className="boss-split__card-title">We &mdash; GrowMos</h3>
              </div>
              <ul className="boss-split__list">
                {["Build and maintain your tech stack","Run digital marketing campaigns","Manage operations and workflows","Collect, analyze, and report data","Handle customer support systems","Optimize performance continuously"].map((item, i) => (
                  <li key={i}><i className="fa-solid fa-check"></i> <span>{item}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Structure */}
      <section className="boss-team" id="team-structure">
        <div className="container">
          <div className="section__header">
            <span className="section__badge">Your Dedicated Team</span>
            <h2 className="section__title">Four Teams, One <span className="gradient-text">Mission</span></h2>
            <p className="section__subtitle">Every team reports to you. Every team is dedicated to your success.</p>
          </div>
          <div className="boss-team__grid">
            {[
              { icon:"fa-solid fa-laptop-code", color:"product", title:"Product Team", role:"Developers & Designers", tasks:["App & website development","UI/UX design & prototyping","Bug fixes & security","Performance optimization"] },
              { icon:"fa-solid fa-rocket", color:"growth", title:"Growth Team", role:"Marketers & Strategists", tasks:["SEO & paid advertising","Social media marketing","Content & email campaigns","Conversion optimization"] },
              { icon:"fa-solid fa-handshake", color:"success", title:"Success Team", role:"Support & Operations", tasks:["Customer support setup","Onboarding workflows","Process automation","Communication protocols"] },
              { icon:"fa-solid fa-brain", color:"data", title:"Data Team", role:"Analysts & BI Specialists", tasks:["KPI tracking & dashboards","Business intelligence","Data-driven insights","Performance reporting"] },
            ].map((t, i) => (
              <div key={i} className="boss-team__card">
                <div className={`boss-team__card-icon boss-team__card-icon--${t.color}`}><i className={t.icon}></i></div>
                <h3 className="boss-team__card-title">{t.title}</h3>
                <p className="boss-team__card-role">{t.role}</p>
                <ul className="boss-team__card-tasks">{t.tasks.map((task, j) => <li key={j}>{task}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="boss-method" id="methodology">
        <div className="container">
          <div className="section__header">
            <span className="section__badge">Our Approach</span>
            <h2 className="section__title">How We <span className="gradient-text">Collaborate</span></h2>
            <p className="section__subtitle">Four engagement models tailored to your needs</p>
          </div>
          <div className="boss-method__grid">
            {[
              { n:"01", title:"Team Augmentation", desc:"Plug skilled professionals directly into your existing team. Fill skill gaps instantly without the overhead of hiring full-time." },
              { n:"02", title:"MVP Services", desc:"Launch fast with a minimum viable product. We validate your idea, build the core features, and get you to market quickly." },
              { n:"03", title:"End-to-End Development", desc:"Full project ownership from concept to launch. We handle design, development, testing, deployment, and ongoing maintenance." },
              { n:"04", title:"Offshore Office Expansion", desc:"Build a dedicated offshore team that operates as an extension of your business. Same culture, same standards, lower costs." },
            ].map((m, i) => (
              <div key={i} className="boss-method__card">
                <div className="boss-method__number">{m.n}</div>
                <h3 className="boss-method__card-title">{m.title}</h3>
                <p className="boss-method__card-desc">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="boss-benefits" id="why-it-works">
        <div className="container">
          <div className="section__header">
            <span className="section__badge">Why It Works</span>
            <h2 className="section__title">The Benefits of Being <span className="gradient-text">The Boss</span></h2>
            <p className="section__subtitle">Why business owners choose the Boss Model</p>
          </div>
          <div className="boss-benefits__grid">
            {[
              { icon:"fa-solid fa-clock", title:"Save 30+ Hours Per Week", desc:"Stop juggling tools, managing freelancers, and putting out tech fires. Get your time back to focus on strategy and growth." },
              { icon:"fa-solid fa-piggy-bank", title:"Cut Costs by 60%", desc:"Get an entire management team for a fraction of the cost of hiring in-house. No salaries, benefits, or office space needed." },
              { icon:"fa-solid fa-bolt", title:"Launch Faster", desc:"With a ready-made team, there's no ramp-up time. We start executing from day one and deliver results within weeks." },
              { icon:"fa-solid fa-arrows-up-down-left-right", title:"Scale On Demand", desc:"Need more developers? More marketers? Scale your team up or down as your business needs change. No contracts, no hassle." },
              { icon:"fa-solid fa-shield-halved", title:"Reduce Risk", desc:"No bad hires. No failed projects. Our proven processes and experienced teams deliver consistent, reliable results every time." },
              { icon:"fa-solid fa-eye", title:"Full Transparency", desc:"Weekly reports, real-time dashboards, and open communication. You always know exactly what's happening and where your money goes." },
            ].map((b, i) => (
              <div key={i} className="boss-benefit">
                <div className="boss-benefit__icon"><i className={b.icon}></i></div>
                <div><h3 className="boss-benefit__title">{b.title}</h3><p className="boss-benefit__desc">{b.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta" id="contact">
        <div className="cta__bg-shapes">
          <div className="cta__shape cta__shape--1"></div>
          <div className="cta__shape cta__shape--2"></div>
        </div>
        <div className="container">
          <div className="cta__content">
            <h2 className="cta__title">Ready to become<br /><span className="gradient-text">The Boss?</span></h2>
            <p className="cta__description">Book a free discovery call and see how the Boss Model can transform the way you run your business. No commitment, no pressure.</p>
            <div className="cta__actions">
              <Link href="/contact" className="btn btn--primary btn--lg">Book Your Free Discovery Call <i className="fa-solid fa-calendar-check"></i></Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
