"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Tab = "inbox" | "compose" | "campaigns" | "subscribers" | "contacts";

type InboxEmail = {
  uid: number;
  subject: string;
  from: { name?: string; address?: string } | null;
  date: string | null;
  read: boolean;
};

type Campaign = {
  id: number;
  subject: string;
  from_name: string;
  status: string;
  recipient_count: number;
  sent_count: number;
  created_at: string;
  sent_at: string | null;
};

type Subscriber = {
  id: number;
  email: string;
  name: string | null;
  status: string;
  created_at: string;
};

type ContactSubmission = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  read: boolean;
  replied: boolean;
  created_at: string;
};

function formatDate(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    draft: "bg-gray-100 text-gray-600",
    sending: "bg-yellow-100 text-yellow-700",
    sent: "bg-green-100 text-green-700",
    failed: "bg-red-100 text-red-700",
    active: "bg-green-100 text-green-700",
    unsubscribed: "bg-gray-100 text-gray-500",
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${map[status] || "bg-gray-100 text-gray-500"}`}>
      {status}
    </span>
  );
}

// ── Inbox Tab ───────────────────────────────────────────────────────────────

function InboxTab() {
  const [emails, setEmails] = useState<InboxEmail[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [body, setBody] = useState<{ html?: string; text?: string; from?: object; date?: string; subject?: string } | null>(null);
  const [bodyLoading, setBodyLoading] = useState(false);
  const [replyTo, setReplyTo] = useState("");
  const [replyBody, setReplyBody] = useState("");
  const [replying, setReplying] = useState(false);
  const [replyStatus, setReplyStatus] = useState<"idle" | "ok" | "err">("idle");

  const fetchInbox = useCallback(async (pg = 1, append = false) => {
    append ? setLoadingMore(true) : setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/email/inbox?limit=50&page=${pg}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setEmails(prev => append ? [...prev, ...(data.emails || [])] : (data.emails || []));
      setPage(pg);
      setTotalPages(data.pages || 1);
      setTotal(data.total || 0);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error loading inbox");
    } finally {
      append ? setLoadingMore(false) : setLoading(false);
    }
  }, []);

  useEffect(() => { fetchInbox(1); }, [fetchInbox]);

  async function openEmail(uid: number) {
    setSelected(uid);
    setBody(null);
    setReplyStatus("idle");
    setReplyBody("");
    setBodyLoading(true);
    try {
      const res = await fetch(`/api/email/inbox/${uid}`);
      const data = await res.json();
      setBody(data.email || null);
      const fromAddr = (data.email?.from as { address?: string })?.address || "";
      setReplyTo(fromAddr);
      setEmails(prev => prev.map(e => e.uid === uid ? { ...e, read: true } : e));
    } finally {
      setBodyLoading(false);
    }
  }

  async function sendReply() {
    if (!body || !replyTo || !replyBody) return;
    setReplying(true);
    const res = await fetch("/api/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: replyTo,
        subject: `Re: ${body.subject || ""}`,
        html: `<p>${replyBody.replace(/\n/g, "<br>")}</p>`,
        text: replyBody,
      }),
    });
    setReplying(false);
    setReplyStatus(res.ok ? "ok" : "err");
    if (res.ok) setReplyBody("");
  }

  if (loading) return <p className="text-gray-400 py-10 text-center">Loading inbox…</p>;
  if (error) return (
    <div className="text-center py-10">
      <p className="text-red-500 mb-3">{error}</p>
      <p className="text-sm text-gray-400">Check IMAP_HOST, IMAP_USER, IMAP_PASS env vars.</p>
      <button onClick={() => fetchInbox(1)} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm">Retry</button>
    </div>
  );

  return (
    <div className="flex gap-0 h-[600px] border border-gray-200 rounded-xl overflow-hidden">
      {/* Email list */}
      <div className="w-80 flex-shrink-0 border-r border-gray-200 overflow-y-auto bg-white">
        <div className="sticky top-0 bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Inbox {total > 0 && <span className="ml-1 text-gray-400 font-normal normal-case">({total})</span>}
          </span>
          <button onClick={() => fetchInbox(1)} className="text-gray-400 hover:text-indigo-600 text-xs">Refresh</button>
        </div>
        {emails.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-10">No emails found</p>
        ) : emails.map(em => (
          <button
            key={em.uid}
            onClick={() => openEmail(em.uid)}
            className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-indigo-50 transition-colors ${selected === em.uid ? "bg-indigo-50 border-l-2 border-l-indigo-500" : ""}`}
          >
            <div className="flex items-center justify-between mb-0.5">
              <span className={`text-sm truncate max-w-[160px] ${!em.read ? "font-semibold text-gray-900" : "text-gray-600"}`}>
                {em.from?.name || em.from?.address || "Unknown"}
              </span>
              {!em.read && <span className="w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0"></span>}
            </div>
            <p className={`text-xs truncate ${!em.read ? "font-medium text-gray-800" : "text-gray-500"}`}>{em.subject}</p>
            <p className="text-xs text-gray-400 mt-0.5">{formatDate(em.date)}</p>
          </button>
        ))}
        {page < totalPages && (
          <button
            onClick={() => fetchInbox(page + 1, true)}
            disabled={loadingMore}
            className="w-full py-3 text-xs text-indigo-600 hover:bg-indigo-50 font-semibold border-t border-gray-100 transition-colors disabled:opacity-50"
          >
            {loadingMore ? "Loading…" : `Load older emails (${total - emails.length} more)`}
          </button>
        )}
      </div>

      {/* Email body */}
      <div className="flex-1 overflow-y-auto bg-white flex flex-col">
        {!selected ? (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <i className="fa-solid fa-envelope-open text-4xl mb-3 text-gray-200"></i>
              <p>Select an email to read</p>
            </div>
          </div>
        ) : bodyLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <i className="fa-solid fa-spinner fa-spin text-indigo-500 text-2xl"></i>
          </div>
        ) : body ? (
          <div className="flex-1 flex flex-col">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
              <h3 className="font-semibold text-gray-900 text-base mb-1">{body.subject}</h3>
              <p className="text-xs text-gray-500">
                From: <span className="font-medium">{(body.from as { name?: string; address?: string })?.name || (body.from as { address?: string })?.address}</span>
                {" · "}{formatDate(body.date || null)}
              </p>
            </div>
            <div className="flex-1 px-6 py-4 overflow-y-auto">
              {body.html ? (
                <iframe
                  srcDoc={body.html}
                  className="w-full border-0 min-h-[300px]"
                  sandbox="allow-same-origin"
                  style={{ height: "300px" }}
                />
              ) : (
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">{body.text}</pre>
              )}
            </div>
            {/* Reply box */}
            <div className="border-t border-gray-100 px-6 py-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Reply</p>
              <input
                type="email"
                value={replyTo}
                onChange={e => setReplyTo(e.target.value)}
                placeholder="To: email@example.com"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-2 focus:outline-none focus:ring-1 focus:ring-indigo-400"
              />
              <textarea
                rows={4}
                value={replyBody}
                onChange={e => setReplyBody(e.target.value)}
                placeholder="Type your reply…"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-indigo-400"
              />
              <div className="flex items-center justify-between mt-2">
                <button
                  onClick={sendReply}
                  disabled={replying || !replyBody.trim()}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  {replying ? "Sending…" : "Send Reply"}
                </button>
                {replyStatus === "ok" && <span className="text-green-600 text-sm">Sent!</span>}
                {replyStatus === "err" && <span className="text-red-500 text-sm">Send failed</span>}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

// ── Compose Tab ──────────────────────────────────────────────────────────────

function ComposeTab() {
  const [form, setForm] = useState({ to: "", subject: "", body: "" });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [errMsg, setErrMsg] = useState("");

  function reset() {
    setForm({ to: "", subject: "", body: "" });
    setStatus("idle");
    setErrMsg("");
  }

  async function send(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setStatus("idle");
    setErrMsg("");
    try {
      const res = await fetch("/api/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: form.to,
          subject: form.subject,
          html: `<div style="font-family:sans-serif;font-size:15px;line-height:1.6;color:#333">${form.body.replace(/\n/g, "<br>")}</div>`,
          text: form.body,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("ok");
        setForm({ to: "", subject: "", body: "" });
      } else {
        setErrMsg(data.error || "Failed to send");
        setStatus("err");
      }
    } catch {
      setErrMsg("Network error");
      setStatus("err");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="max-w-2xl">
      {status === "ok" && (
        <div className="flex items-center justify-between bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm mb-5">
          <span><i className="fa-solid fa-circle-check mr-2"></i>Email sent successfully.</span>
          <button onClick={reset} className="text-green-600 hover:text-green-800 font-semibold">Compose another</button>
        </div>
      )}
      {status === "err" && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm mb-5">
          <i className="fa-solid fa-circle-exclamation mr-2"></i>{errMsg}
        </div>
      )}

      <form onSubmit={send} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-100">
          <div className="flex items-center px-5 py-3">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide w-20 flex-shrink-0">To</span>
            <input
              type="email"
              required
              value={form.to}
              onChange={e => setForm(p => ({ ...p, to: e.target.value }))}
              placeholder="recipient@example.com"
              className="flex-1 text-sm text-gray-900 border-0 focus:outline-none focus:ring-0 bg-transparent"
            />
          </div>
          <div className="flex items-center px-5 py-3">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide w-20 flex-shrink-0">Subject</span>
            <input
              type="text"
              required
              value={form.subject}
              onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
              placeholder="Email subject…"
              className="flex-1 text-sm text-gray-900 border-0 focus:outline-none focus:ring-0 bg-transparent"
            />
          </div>
        </div>
        <div className="border-t border-gray-200">
          <textarea
            required
            rows={14}
            value={form.body}
            onChange={e => setForm(p => ({ ...p, body: e.target.value }))}
            placeholder="Write your message here…"
            className="w-full px-5 py-4 text-sm text-gray-800 border-0 focus:outline-none resize-none bg-white"
          />
        </div>
        <div className="border-t border-gray-100 px-5 py-3 bg-gray-50 flex items-center justify-between">
          <p className="text-xs text-gray-400">Sends from <span className="font-medium">hello@growmos.com</span></p>
          <button
            type="submit"
            disabled={sending}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            {sending
              ? <><i className="fa-solid fa-spinner fa-spin"></i> Sending…</>
              : <><i className="fa-solid fa-paper-plane"></i> Send Email</>}
          </button>
        </div>
      </form>
    </div>
  );
}

// ── Campaigns Tab ────────────────────────────────────────────────────────────

function CampaignsTab() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState<number | null>(null);
  const [sendResult, setSendResult] = useState<Record<number, string>>({});
  const router = useRouter();

  async function fetchCampaigns() {
    setLoading(true);
    const res = await fetch("/api/email/campaigns");
    const data = await res.json();
    setCampaigns(data.campaigns || []);
    setLoading(false);
  }

  useEffect(() => { fetchCampaigns(); }, []);

  async function sendCampaign(id: number) {
    if (!confirm("Send this campaign to all active subscribers now?")) return;
    setSending(id);
    const res = await fetch(`/api/email/campaigns/${id}`, { method: "PATCH" });
    const data = await res.json();
    setSendResult(prev => ({
      ...prev,
      [id]: res.ok ? `Sent to ${data.sent}/${data.total} subscribers` : data.error,
    }));
    setSending(null);
    fetchCampaigns();
  }

  async function deleteCampaign(id: number) {
    if (!confirm("Delete this draft campaign?")) return;
    await fetch(`/api/email/campaigns/${id}`, { method: "DELETE" });
    fetchCampaigns();
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Link href="/admin/email/compose" className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
          <i className="fa-solid fa-plus"></i> New Campaign
        </Link>
      </div>
      {loading ? (
        <p className="text-gray-400 text-center py-10">Loading…</p>
      ) : campaigns.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-200">
          <i className="fa-solid fa-paper-plane text-gray-200 text-5xl mb-3 block"></i>
          <p className="text-gray-500">No campaigns yet. Create one to get started.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {["Subject", "Status", "Recipients", "Sent", "Created", ""].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {campaigns.map(c => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-sm text-gray-900">{c.subject}</p>
                    <p className="text-xs text-gray-400">From: {c.from_name}</p>
                    {sendResult[c.id] && <p className="text-xs mt-1 text-indigo-600">{sendResult[c.id]}</p>}
                  </td>
                  <td className="px-5 py-4"><StatusBadge status={c.status} /></td>
                  <td className="px-5 py-4 text-sm text-gray-600">{c.recipient_count}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{c.sent_count}</td>
                  <td className="px-5 py-4 text-xs text-gray-400">{formatDate(c.created_at)}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      {c.status === "draft" && (
                        <>
                          <button
                            onClick={() => sendCampaign(c.id)}
                            disabled={sending === c.id}
                            className="text-xs font-semibold bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-3 py-1.5 rounded-lg transition-colors"
                          >
                            {sending === c.id ? "Sending…" : "Send Now"}
                          </button>
                          <button
                            onClick={() => deleteCampaign(c.id)}
                            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 text-sm"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </>
                      )}
                      {c.status === "sent" && (
                        <span className="text-xs text-gray-400">{formatDate(c.sent_at)}</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ── Subscribers Tab ──────────────────────────────────────────────────────────

function SubscribersTab() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ email: "", name: "" });
  const [adding, setAdding] = useState(false);
  const [addStatus, setAddStatus] = useState<"idle" | "ok" | "err">("idle");
  const [csvText, setCsvText] = useState("");
  const [importing, setImporting] = useState(false);

  async function fetchSubs() {
    setLoading(true);
    const res = await fetch("/api/subscribers");
    const data = await res.json();
    setSubscribers(data.subscribers || []);
    setLoading(false);
  }

  useEffect(() => { fetchSubs(); }, []);

  async function addSubscriber(e: React.FormEvent) {
    e.preventDefault();
    setAdding(true);
    const res = await fetch("/api/subscribers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setAdding(false);
    if (res.ok) { setAddStatus("ok"); setForm({ email: "", name: "" }); fetchSubs(); }
    else setAddStatus("err");
  }

  async function toggleStatus(sub: Subscriber) {
    const newStatus = sub.status === "active" ? "unsubscribed" : "active";
    await fetch(`/api/subscribers/${sub.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchSubs();
  }

  async function deleteSub(id: number) {
    if (!confirm("Delete this subscriber?")) return;
    await fetch(`/api/subscribers/${id}`, { method: "DELETE" });
    fetchSubs();
  }

  async function importCsv() {
    const lines = csvText.trim().split("\n").filter(Boolean);
    if (lines.length === 0) return;
    setImporting(true);
    for (const line of lines) {
      const [email, name] = line.split(",").map(s => s.trim().replace(/^"|"$/g, ""));
      if (!email || !email.includes("@")) continue;
      await fetch("/api/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: name || null }),
      });
    }
    setImporting(false);
    setCsvText("");
    fetchSubs();
  }

  const active = subscribers.filter(s => s.status === "active").length;

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide">Total</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{subscribers.length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide">Active</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{active}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide">Unsubscribed</p>
          <p className="text-2xl font-bold text-gray-400 mt-1">{subscribers.length - active}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Add single */}
        <form onSubmit={addSubscriber} className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-sm font-semibold text-gray-700 mb-3">Add Subscriber</p>
          <input
            type="email" required placeholder="Email address"
            value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-2 focus:outline-none focus:ring-1 focus:ring-indigo-400"
          />
          <input
            type="text" placeholder="Name (optional)"
            value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:ring-1 focus:ring-indigo-400"
          />
          <button type="submit" disabled={adding} className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-semibold py-2 rounded-lg transition-colors">
            {adding ? "Adding…" : "Add"}
          </button>
          {addStatus === "ok" && <p className="text-xs text-green-600 mt-2">Added!</p>}
          {addStatus === "err" && <p className="text-xs text-red-500 mt-2">Failed</p>}
        </form>

        {/* CSV import */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-sm font-semibold text-gray-700 mb-1">CSV Import</p>
          <p className="text-xs text-gray-400 mb-2">One per line: email,name</p>
          <textarea
            rows={4}
            value={csvText}
            onChange={e => setCsvText(e.target.value)}
            placeholder={"john@example.com,John Smith\njane@example.com,Jane Doe"}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none mb-3 font-mono focus:outline-none focus:ring-1 focus:ring-indigo-400"
          />
          <button
            onClick={importCsv}
            disabled={importing || !csvText.trim()}
            className="w-full bg-gray-800 hover:bg-gray-900 disabled:opacity-50 text-white text-sm font-semibold py-2 rounded-lg transition-colors"
          >
            {importing ? "Importing…" : "Import CSV"}
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-400 text-center py-6">Loading…</p>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {["Email", "Name", "Status", "Added", ""].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {subscribers.map(sub => (
                <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 text-sm text-gray-900">{sub.email}</td>
                  <td className="px-5 py-3 text-sm text-gray-600">{sub.name || "—"}</td>
                  <td className="px-5 py-3"><StatusBadge status={sub.status} /></td>
                  <td className="px-5 py-3 text-xs text-gray-400">{formatDate(sub.created_at)}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => toggleStatus(sub)}
                        className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-600 transition-colors"
                      >
                        {sub.status === "active" ? "Unsubscribe" : "Reactivate"}
                      </button>
                      <button onClick={() => deleteSub(sub.id)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 text-sm">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ── Contacts Tab ─────────────────────────────────────────────────────────────

function ContactsTab() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ContactSubmission | null>(null);
  const [replyBody, setReplyBody] = useState("");
  const [replying, setReplying] = useState(false);
  const [replyStatus, setReplyStatus] = useState<"idle" | "ok" | "err">("idle");

  async function fetchSubs() {
    setLoading(true);
    const res = await fetch("/api/contact-submissions");
    const data = await res.json();
    setSubmissions(data.submissions || []);
    setLoading(false);
  }

  useEffect(() => { fetchSubs(); }, []);

  async function markRead(id: number) {
    await fetch("/api/contact-submissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, read: true }),
    });
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, read: true } : s));
  }

  async function openContact(sub: ContactSubmission) {
    setSelected(sub);
    setReplyBody("");
    setReplyStatus("idle");
    if (!sub.read) markRead(sub.id);
  }

  async function sendReply() {
    if (!selected || !replyBody.trim()) return;
    setReplying(true);
    const res = await fetch("/api/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: selected.email,
        subject: `Re: Your enquiry – GrowMos`,
        html: `<p>Hi ${selected.name},</p><p>${replyBody.replace(/\n/g, "<br>")}</p><br><p>Best regards,<br>GrowMos Team</p>`,
        text: `Hi ${selected.name},\n\n${replyBody}\n\nBest regards,\nGrowMos Team`,
      }),
    });
    if (res.ok) {
      await fetch("/api/contact-submissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selected.id, replied: true }),
      });
      setSubmissions(prev => prev.map(s => s.id === selected.id ? { ...s, replied: true } : s));
      setSelected(prev => prev ? { ...prev, replied: true } : prev);
    }
    setReplying(false);
    setReplyStatus(res.ok ? "ok" : "err");
    if (res.ok) setReplyBody("");
  }

  const unread = submissions.filter(s => !s.read).length;

  return (
    <div className="flex gap-0 h-[600px] border border-gray-200 rounded-xl overflow-hidden">
      <div className="w-80 flex-shrink-0 border-r border-gray-200 overflow-y-auto bg-white">
        <div className="sticky top-0 bg-gray-50 border-b border-gray-200 px-4 py-3">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Contact Submissions {unread > 0 && <span className="ml-1 bg-indigo-500 text-white text-xs rounded-full px-1.5 py-0.5">{unread}</span>}
          </span>
        </div>
        {loading ? <p className="text-gray-400 text-sm text-center py-6">Loading…</p> :
          submissions.length === 0 ? <p className="text-gray-400 text-sm text-center py-6">No submissions yet</p> :
          submissions.map(sub => (
            <button
              key={sub.id}
              onClick={() => openContact(sub)}
              className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-indigo-50 transition-colors ${selected?.id === sub.id ? "bg-indigo-50 border-l-2 border-l-indigo-500" : ""}`}
            >
              <div className="flex items-center justify-between mb-0.5">
                <span className={`text-sm truncate max-w-[140px] ${!sub.read ? "font-semibold text-gray-900" : "text-gray-600"}`}>{sub.name}</span>
                <div className="flex items-center gap-1">
                  {sub.replied && <i className="fa-solid fa-reply text-green-500 text-xs"></i>}
                  {!sub.read && <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>}
                </div>
              </div>
              <p className="text-xs text-gray-400 truncate">{sub.email}</p>
              <p className="text-xs text-gray-500 truncate mt-0.5">{sub.service || "General"}</p>
              <p className="text-xs text-gray-400 mt-0.5">{formatDate(sub.created_at)}</p>
            </button>
          ))
        }
      </div>

      <div className="flex-1 overflow-y-auto bg-white flex flex-col">
        {!selected ? (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <i className="fa-solid fa-inbox text-4xl mb-3 text-gray-200"></i>
              <p>Select a contact to view</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{selected.name}</h3>
                  <p className="text-xs text-gray-500">{selected.email} · {selected.phone || "no phone"}</p>
                </div>
                <div className="flex items-center gap-2">
                  {selected.service && <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-medium">{selected.service}</span>}
                  {selected.replied && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Replied</span>}
                </div>
              </div>
            </div>
            <div className="px-6 py-4 flex-1">
              <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{selected.message}</p>
            </div>
            <div className="border-t border-gray-100 px-6 py-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Reply to {selected.name}</p>
              <textarea
                rows={4}
                value={replyBody}
                onChange={e => setReplyBody(e.target.value)}
                placeholder={`Hi ${selected.name},\n\nThank you for reaching out…`}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-indigo-400"
              />
              <div className="flex items-center justify-between mt-2">
                <button
                  onClick={sendReply}
                  disabled={replying || !replyBody.trim()}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  {replying ? "Sending…" : "Send Reply"}
                </button>
                {replyStatus === "ok" && <span className="text-green-600 text-sm">Sent!</span>}
                {replyStatus === "err" && <span className="text-red-500 text-sm">Failed</span>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────

export default function EmailDashboard() {
  const [tab, setTab] = useState<Tab>("inbox");
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "inbox", label: "Inbox", icon: "fa-solid fa-inbox" },
    { id: "compose", label: "Compose", icon: "fa-solid fa-pen-to-square" },
    { id: "campaigns", label: "Campaigns", icon: "fa-solid fa-paper-plane" },
    { id: "subscribers", label: "Subscribers", icon: "fa-solid fa-users" },
    { id: "contacts", label: "Contact Forms", icon: "fa-solid fa-envelope-open-text" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <i className="fa-solid fa-envelope text-white text-sm"></i>
          </div>
          <div>
            <h1 className="font-bold text-gray-900">Email Dashboard</h1>
            <p className="text-xs text-gray-500">Inbox · Campaigns · Subscribers</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="text-gray-500 hover:text-gray-700 text-sm px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
            <i className="fa-solid fa-blog mr-1"></i> Blog Admin
          </Link>
          <Link href="/" target="_blank" className="text-gray-500 hover:text-gray-700 text-sm px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
            <i className="fa-solid fa-arrow-up-right-from-square mr-1"></i> View Site
          </Link>
          <button onClick={handleLogout} className="text-gray-500 hover:text-red-600 text-sm px-3 py-2 rounded-lg hover:bg-red-50 transition-colors">
            <i className="fa-solid fa-arrow-right-from-bracket mr-1"></i> Logout
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-6 w-fit">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${tab === t.id ? "bg-indigo-600 text-white shadow-sm" : "text-gray-600 hover:bg-gray-100"}`}
            >
              <i className={t.icon}></i>
              {t.label}
            </button>
          ))}
        </div>

        {tab === "inbox" && <InboxTab />}
        {tab === "compose" && <ComposeTab />}
        {tab === "campaigns" && <CampaignsTab />}
        {tab === "subscribers" && <SubscribersTab />}
        {tab === "contacts" && <ContactsTab />}
      </div>
    </div>
  );
}
