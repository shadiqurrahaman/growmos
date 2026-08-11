import Link from "next/link";
import type { Metadata } from "next";
import MaturityForm from "./MaturityForm";

export const metadata: Metadata = {
 title: "Free Data Maturity Assessment | GrowMos",
 description:
 "Find out where your data platform sits on the maturity curve and what to do next. Free 10-minute assessment from GrowMos.",
};

export default function DataMaturityAssessmentPage() {
 return (
 <main>
 <section
 style={{
 paddingTop: "8rem",
 paddingBottom: "3rem",
 background: "var(--secondary)",
 textAlign: "center",
 }}
 >
 <div className="container">
 <span className="section__badge" style={{ margin: "0 auto 1rem" }}>
 Free Resource
 </span>
 <h1
 style={{
 color: "#fff",
 fontSize: "var(--font-size-5xl)",
 fontWeight: 800,
 marginBottom: "1rem",
 lineHeight: 1.15,
 }}
 >
 Data Maturity Assessment
 </h1>
 <p
 style={{
 color: "rgba(255,255,255,0.75)",
 maxWidth: "640px",
 margin: "0 auto",
 fontSize: "1.05rem",
 lineHeight: 1.6,
 }}
 >
 Find out where your data platform sits on the maturity curve and what to
 prioritise next. Takes 5 minutes. We&apos;ll send a tailored write-up within
 48 hours.
 </p>
 </div>
 </section>

 <section style={{ padding: "4rem 0" }}>
 <div className="container" style={{ maxWidth: "920px" }}>
 <div className="magnet-layout">
 <aside className="magnet-side">
 <h2 className="magnet-side__title">What you&apos;ll get</h2>
 <ul className="magnet-side__list">
 <li>
 <i className="fa-solid fa-circle-check"></i>
 <span>A maturity score across 5 dimensions (sources, ingestion, transformation, warehouse, BI)</span>
 </li>
 <li>
 <i className="fa-solid fa-circle-check"></i>
 <span>The 3 highest-ROI improvements for your current stack</span>
 </li>
 <li>
 <i className="fa-solid fa-circle-check"></i>
 <span>A short read on where you sit vs. peers in your industry</span>
 </li>
 <li>
 <i className="fa-solid fa-circle-check"></i>
 <span>No sales pressure. Unsubscribe anytime.</span>
 </li>
 </ul>
 <p className="magnet-side__note">
 Not ready for the full assessment? <Link href="/contact">Book a 30-minute call instead →</Link>
 </p>
 </aside>

 <div className="magnet-card">
 <MaturityForm />
 </div>
 </div>
 </div>
 </section>
 </main>
 );
}
