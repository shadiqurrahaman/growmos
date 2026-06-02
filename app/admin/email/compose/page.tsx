"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ComposeCampaign() {
  const router = useRouter();
  const [form, setForm] = useState({
    subject: "",
    from_name: "GrowMos",
    reply_to: "",
    html_body: "",
    text_body: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState(false);

  function set(key: string, val: string) {
    setForm(p => ({ ...p, [key]: val }));
  }

  async function saveDraft() {
    if (!form.subject || !form.html_body) {
      setError("Subject and email body are required.");
      return;
    }
    setSaving(true);
    setError(null);
    const res = await fetch("/api/email/campaigns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setSaving(false);
    if (res.ok) {
      router.push("/admin/email");
    } else {
      setError(data.error || "Failed to save campaign");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link href="/admin/email" className="text-gray-400 hover:text-gray-700 transition-colors">
            <i className="fa-solid fa-arrow-left"></i>
          </Link>
          <div>
            <h1 className="font-bold text-gray-900">New Campaign</h1>
            <p className="text-xs text-gray-500">Compose an email broadcast</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPreview(!preview)}
            className="text-sm px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors"
          >
            <i className={`fa-solid fa-${preview ? "pen" : "eye"} mr-1.5`}></i>
            {preview ? "Edit" : "Preview"}
          </button>
          <button
            onClick={saveDraft}
            disabled={saving}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            {saving ? "Saving…" : "Save as Draft"}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200 rounded-lg px-4 py-3 text-sm mb-5">{error}</div>
        )}

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Header fields */}
          <div className="divide-y divide-gray-100">
            <div className="flex items-center px-6 py-3">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide w-24 flex-shrink-0">Subject</span>
              <input
                type="text"
                value={form.subject}
                onChange={e => set("subject", e.target.value)}
                placeholder="Email subject line…"
                className="flex-1 text-sm text-gray-900 border-0 focus:outline-none focus:ring-0 bg-transparent"
              />
            </div>
            <div className="flex items-center px-6 py-3">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide w-24 flex-shrink-0">From name</span>
              <input
                type="text"
                value={form.from_name}
                onChange={e => set("from_name", e.target.value)}
                placeholder="GrowMos"
                className="flex-1 text-sm text-gray-900 border-0 focus:outline-none focus:ring-0 bg-transparent"
              />
            </div>
            <div className="flex items-center px-6 py-3">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide w-24 flex-shrink-0">Reply-To</span>
              <input
                type="email"
                value={form.reply_to}
                onChange={e => set("reply_to", e.target.value)}
                placeholder="hello@growmos.com (optional)"
                className="flex-1 text-sm text-gray-900 border-0 focus:outline-none focus:ring-0 bg-transparent"
              />
            </div>
          </div>

          {/* Body */}
          <div className="border-t border-gray-200">
            {preview ? (
              <div className="min-h-[400px] p-6">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">Preview</p>
                {form.html_body ? (
                  <iframe
                    srcDoc={form.html_body}
                    className="w-full border border-gray-100 rounded-lg"
                    style={{ height: "500px" }}
                    sandbox="allow-same-origin"
                  />
                ) : (
                  <p className="text-gray-400 text-sm">No content to preview yet.</p>
                )}
              </div>
            ) : (
              <div>
                <div className="px-6 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">HTML Body</span>
                  <span className="text-xs text-gray-400">Paste HTML or write plain content below</span>
                </div>
                <textarea
                  rows={18}
                  value={form.html_body}
                  onChange={e => set("html_body", e.target.value)}
                  placeholder={`<h1>Hello {{name}},</h1>\n<p>Your campaign content here…</p>\n\n<p>Best regards,<br/>The GrowMos Team</p>`}
                  className="w-full px-6 py-4 text-sm font-mono text-gray-800 border-0 focus:outline-none resize-none bg-white"
                />
                <div className="border-t border-gray-100 px-6 py-3 bg-gray-50">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Plain Text (optional)</span>
                </div>
                <textarea
                  rows={5}
                  value={form.text_body}
                  onChange={e => set("text_body", e.target.value)}
                  placeholder="Plain text fallback for email clients that don't support HTML…"
                  className="w-full px-6 py-4 text-sm text-gray-700 border-0 focus:outline-none resize-none bg-white"
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl px-5 py-4">
          <p className="text-sm font-semibold text-blue-700 mb-1">How to send</p>
          <ol className="text-sm text-blue-600 space-y-1 list-decimal list-inside">
            <li>Save this as a draft</li>
            <li>Go to the Campaigns tab</li>
            <li>Click <strong>Send Now</strong> — it will broadcast to all active subscribers</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
