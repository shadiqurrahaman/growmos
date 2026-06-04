"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function UnsubscribeForm() {
  const params = useSearchParams();
  const email = params.get("email") || "";
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  useEffect(() => {
    if (!email) return;
    setStatus("loading");
    fetch("/api/subscribers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, status: "unsubscribed" }),
    })
      .then(async (r) => {
        if (r.ok) setStatus("done");
        else setStatus("error");
      })
      .catch(() => setStatus("error"));
  }, [email]);

  async function unsubscribeViaUpdate() {
    setStatus("loading");
    const res = await fetch("/api/subscribers/unsubscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setStatus(res.ok ? "done" : "error");
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif", background: "#f9fafb" }}>
      <div style={{ background: "white", borderRadius: 12, padding: 40, maxWidth: 480, width: "100%", textAlign: "center", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
        <h1 style={{ fontSize: 24, marginBottom: 12 }}>Unsubscribe</h1>
        {!email ? (
          <p style={{ color: "#666" }}>No email address provided.</p>
        ) : status === "loading" ? (
          <p style={{ color: "#666" }}>Processing…</p>
        ) : status === "done" ? (
          <p style={{ color: "#22c55e" }}>✓ You have been unsubscribed from GrowMos emails.</p>
        ) : status === "error" ? (
          <p style={{ color: "#ef4444" }}>Something went wrong. Please contact us at hello@growmos.com</p>
        ) : (
          <>
            <p style={{ color: "#444", marginBottom: 20 }}>You&apos;re about to unsubscribe <strong>{email}</strong> from GrowMos marketing emails.</p>
            <button onClick={unsubscribeViaUpdate} style={{ background: "#ef4444", color: "white", border: "none", borderRadius: 8, padding: "12px 28px", cursor: "pointer", fontSize: 15 }}>
              Confirm Unsubscribe
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense>
      <UnsubscribeForm />
    </Suspense>
  );
}
