"use client";

import { useState } from "react";
import Link from "next/link";

type Status = "idle" | "sending" | "ok" | "err";

export default function MaturityForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    company_size: "",
    current_stack: "",
    biggest_pain: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/leads/data-maturity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "ok" : "err");
    } catch {
      setStatus("err");
    }
  }

  if (status === "ok") {
    return (
      <div className="magnet-success">
        <i className="fa-solid fa-circle-check" style={{ fontSize: "3rem", color: "var(--success, #22c55e)" }}></i>
        <h3 style={{ marginTop: "1rem", fontSize: "1.4rem", fontWeight: 700 }}>
          Got it. We&apos;re on it.
        </h3>
        <p style={{ marginTop: "0.5rem", color: "var(--gray-600, #475569)" }}>
          We&apos;ll send your tailored write-up within 48 hours. In the meantime,
          feel free to keep exploring the site.
        </p>
        <Link href="/" className="btn btn--primary" style={{ marginTop: "1.5rem", display: "inline-flex" }}>
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="magnet-card__title">Tell us about your data platform</h3>

      <div className="magnet-row">
        <div className="magnet-field">
          <label>Name <span>*</span></label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            placeholder="Jane Doe"
          />
        </div>
        <div className="magnet-field">
          <label>Work email <span>*</span></label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            placeholder="jane@company.com"
          />
        </div>
      </div>

      <div className="magnet-row">
        <div className="magnet-field">
          <label>Company</label>
          <input
            type="text"
            value={form.company}
            onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))}
            placeholder="Acme Inc."
          />
        </div>
        <div className="magnet-field">
          <label>Your role</label>
          <input
            type="text"
            value={form.role}
            onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
            placeholder="Head of Data"
          />
        </div>
      </div>

      <div className="magnet-field">
        <label>Company size</label>
        <select
          value={form.company_size}
          onChange={(e) => setForm((p) => ({ ...p, company_size: e.target.value }))}
        >
          <option value="">Select…</option>
          <option>1–10</option>
          <option>11–50</option>
          <option>51–200</option>
          <option>201–500</option>
          <option>500+</option>
        </select>
      </div>

      <div className="magnet-field">
        <label>Current data stack</label>
        <input
          type="text"
          value={form.current_stack}
          onChange={(e) => setForm((p) => ({ ...p, current_stack: e.target.value }))}
          placeholder="e.g. Postgres, BigQuery, Looker, Segment"
        />
      </div>

      <div className="magnet-field">
        <label>Biggest data pain right now</label>
        <textarea
          rows={4}
          value={form.biggest_pain}
          onChange={(e) => setForm((p) => ({ ...p, biggest_pain: e.target.value }))}
          placeholder="What's the question you can't answer today, or the report that always breaks?"
        />
      </div>

      {status === "err" && (
        <p style={{ color: "var(--error, #ef4444)", marginBottom: "1rem" }}>
          Something went wrong. Please try again.
        </p>
      )}

      <button type="submit" className="magnet-submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send Me the Assessment"} <i className="fa-solid fa-paper-plane"></i>
      </button>

      <p className="magnet-fineprint">
        By submitting, you agree to our{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>. We&apos;ll never share
        your details.
      </p>
    </form>
  );
}
