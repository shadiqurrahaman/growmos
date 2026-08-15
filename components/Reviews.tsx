import Link from "next/link";
import Image from "next/image";
import { reviews } from "@/lib/reviews";

export default function Reviews() {
 return (
 <section className="reviews-section" id="reviews">
 <div className="container">
 <header className="reviews-section__header">
 <span className="reviews-section__kicker">Selected outcomes</span>
 <h2 className="reviews-section__title">
 See why teams <span className="gradient-text">trust GrowMos</span> with their data
 </h2>
 <p className="reviews-section__sub">
 20+ clients across B2B SaaS, e-commerce, and agencies. Real pipelines, real
 dashboards, real numbers not generic praise.
 </p>
 </header>

 <div className="reviews-section__grid">
 {reviews.map((r) => (
 <article className="reviews-card" key={r.initials}>
 <div className="reviews-card__quote-mark" aria-hidden="true">
 &ldquo;
 </div>
 <p className="reviews-card__quote">{r.quote}</p>
 {r.metric && (
 <div className="reviews-card__metric">{r.metric}</div>
 )}
 <footer className="reviews-card__author">
 <div className="reviews-card__avatar">
 <Image
 src={r.avatar}
 alt={`${r.name}, ${r.role} at ${r.company}`}
 width={44}
 height={44}
 className="reviews-card__avatar-img"
 onError={(e) => {
 const target = e.currentTarget as HTMLImageElement;
 target.style.display = "none";
 const sibling = target.nextElementSibling as HTMLElement | null;
 if (sibling) sibling.style.display = "flex";
 }}
 />
 <span
 className="reviews-card__initials"
 style={{ display: "none" }}
 aria-hidden="true"
 >
 {r.initials}
 </span>
 </div>
 <div className="reviews-card__author-meta">
 <strong className="reviews-card__name">{r.name}</strong>
 <span className="reviews-card__role">{r.role}</span>
 <span className="reviews-card__industry">{r.company}</span>
 </div>
 </footer>
 </article>
 ))}
 </div>

 <div className="reviews-section__cta">
 <Link href="/contact" className="btn btn--primary">
 Book a similar project <i className="fa-solid fa-arrow-right"></i>
 </Link>
 </div>
 </div>
 </section>
 );
}