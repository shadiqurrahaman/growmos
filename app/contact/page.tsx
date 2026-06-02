"use client";
import { useState } from "react";
import Image from "next/image";

export default function ContactPage() {
  const [form, setForm] = useState({ firstName:"", lastName:"", email:"", phone:"", service:"", message:"" });
  const [status, setStatus] = useState<"idle"|"sending"|"ok"|"err">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: `${form.firstName} ${form.lastName}`, ...form }),
      });
      setStatus(res.ok ? "ok" : "err");
    } catch { setStatus("err"); }
  }

  return (
    <main>
      <section className="contact-hero">
        <div className="contact-hero__shapes">
          <div className="contact-hero__shape contact-hero__shape--1"></div>
          <div className="contact-hero__shape contact-hero__shape--2"></div>
        </div>
        <div className="container">
          <div className="contact-hero__content">
            <span className="contact-hero__badge"><i className="fa-solid fa-paper-plane"></i> Let&apos;s Talk</span>
            <h1 className="contact-hero__title">Get in Touch with Our Team</h1>
            <p className="contact-hero__subtitle">Ready to scale your business with a world-class tech team? Tell us about your project and we&apos;ll get back to you within 24 hours.</p>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="contact-quick">
            <div className="contact-quick__items">
              <div className="contact-quick__item">
                <div className="contact-quick__icon contact-quick__icon--blue"><i className="fa-solid fa-envelope"></i></div>
                <div><p className="contact-quick__label">Email</p><p className="contact-quick__value"><a href="mailto:hello@growmos.com">hello@growmos.com</a></p></div>
              </div>
              <div className="contact-quick__item">
                <div className="contact-quick__icon contact-quick__icon--green"><i className="fa-solid fa-phone"></i></div>
                <div><p className="contact-quick__label">Call Us</p><p className="contact-quick__value"><a href="tel:+8801731438768">+880 1731 438768</a></p></div>
              </div>
              <div className="contact-quick__item">
                <div className="contact-quick__icon contact-quick__icon--purple"><i className="fa-solid fa-location-dot"></i></div>
                <div><p className="contact-quick__label">Location</p><p className="contact-quick__value">Remote-first, Global Team</p></div>
              </div>
            </div>
            <div className="contact-quick__social">
              <a href="#" className="contact-quick__social-link" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
              <a href="#" className="contact-quick__social-link" aria-label="Twitter"><i className="fa-brands fa-x-twitter"></i></a>
              <a href="#" className="contact-quick__social-link" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="contact-quick__social-link" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
            </div>
          </div>

          <div className="contact-grid">
            <div className="contact-whatsapp">
              <div className="contact-whatsapp__header">
                <div className="contact-whatsapp__icon"><i className="fa-brands fa-whatsapp"></i></div>
                <h3 className="contact-whatsapp__title">Chat on WhatsApp</h3>
              </div>
              <div className="contact-whatsapp__qr">
                <Image src="/images/whatsapp-qr.png" alt="Scan to chat on WhatsApp" width={200} height={200} />
              </div>
              <p className="contact-whatsapp__text">Scan the QR code to start a<br /><strong>WhatsApp conversation</strong> with us instantly</p>
              <a href="https://wa.me/8801731438768" target="_blank" rel="noopener noreferrer" className="contact-whatsapp__btn">
                <i className="fa-brands fa-whatsapp"></i> Open WhatsApp
              </a>
            </div>

            <div className="contact-form-card">
              <h3 className="contact-form__title">Send Us a Message</h3>
              {status === "ok" ? (
                <div className="text-center py-8">
                  <i className="fa-solid fa-circle-check" style={{fontSize:"3rem",color:"var(--success)"}}></i>
                  <p className="mt-4" style={{fontSize:"1.1rem",fontWeight:600}}>Message sent!</p>
                  <p style={{color:"var(--gray-600)"}}>We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="contact-form__row">
                    <div className="contact-form__group">
                      <label className="contact-form__label">First Name</label>
                      <input type="text" className="contact-form__input" placeholder="John" required value={form.firstName} onChange={e=>setForm(p=>({...p,firstName:e.target.value}))} />
                    </div>
                    <div className="contact-form__group">
                      <label className="contact-form__label">Last Name</label>
                      <input type="text" className="contact-form__input" placeholder="Doe" required value={form.lastName} onChange={e=>setForm(p=>({...p,lastName:e.target.value}))} />
                    </div>
                  </div>
                  <div className="contact-form__row">
                    <div className="contact-form__group">
                      <label className="contact-form__label">Email Address</label>
                      <input type="email" className="contact-form__input" placeholder="john@company.com" required value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} />
                    </div>
                    <div className="contact-form__group">
                      <label className="contact-form__label">Phone Number</label>
                      <input type="tel" className="contact-form__input" placeholder="+1 (234) 567-890" value={form.phone} onChange={e=>setForm(p=>({...p,phone:e.target.value}))} />
                    </div>
                  </div>
                  <div className="contact-form__group">
                    <label className="contact-form__label">Service You&apos;re Interested In</label>
                    <select className="contact-form__select" value={form.service} onChange={e=>setForm(p=>({...p,service:e.target.value}))}>
                      <option value="" disabled>Select a service</option>
                      <option value="digital-marketing">Digital Marketing</option>
                      <option value="software-development">Custom Software Development</option>
                      <option value="bi-reporting-ai">BI, Reporting &amp; AI Integration</option>
                      <option value="boss-model">The Boss Model (Full Team)</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="contact-form__group">
                    <label className="contact-form__label">Tell Us About Your Project</label>
                    <textarea className="contact-form__textarea" placeholder="Describe your project, goals, and timeline..." required value={form.message} onChange={e=>setForm(p=>({...p,message:e.target.value}))}></textarea>
                  </div>
                  {status === "err" && <p style={{color:"var(--error)",marginBottom:"1rem"}}>Something went wrong. Please try again.</p>}
                  <button type="submit" className="contact-form__submit" disabled={status==="sending"}>
                    {status==="sending"?"Sending…":"Send Message"} <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="contact-why">
        <div className="container">
          <div className="contact-why__header">
            <h2 className="contact-why__title">Why Work with GrowMos?</h2>
            <p className="contact-why__subtitle">We don&apos;t just deliver services — we become your dedicated tech partner.</p>
          </div>
          <div className="contact-why__grid">
            {[
              { icon:"fa-solid fa-clock", color:"blue", title:"24-Hour Response", text:"We respond to every inquiry within 24 hours with a tailored plan for your needs." },
              { icon:"fa-solid fa-users", color:"green", title:"Dedicated Teams", text:"Get a full tech team assigned to your project — developers, marketers, and analysts." },
              { icon:"fa-solid fa-rocket", color:"purple", title:"Fast Launch", text:"Go from first call to a running team in as little as 2 weeks. No long onboarding." },
            ].map((c, i) => (
              <div key={i} className="contact-why__card">
                <div className={`contact-why__icon contact-why__icon--${c.color}`}><i className={c.icon}></i></div>
                <h3 className="contact-why__card-title">{c.title}</h3>
                <p className="contact-why__card-text">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
