"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

type PostForm = {
  title: string; slug: string; content: string; excerpt: string;
  image_url: string; category: string; author: string;
  published: boolean; sort_order: number;
};

export default function EditPostPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const [form, setForm] = useState<PostForm>({ title:"", slug:"", content:"", excerpt:"", image_url:"", category:"Blog", author:"GrowMos Team", published:false, sort_order:0 });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then(r => r.json())
      .then(d => {
        if (d.post) {
          const p = d.post;
          setForm({ title:p.title, slug:p.slug, content:p.content, excerpt:p.excerpt||"", image_url:p.image_url||"", category:p.category, author:p.author, published:p.published, sort_order:p.sort_order });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) setForm(p => ({ ...p, image_url: data.url }));
      else setError("Upload failed.");
    } catch { setError("Upload failed."); }
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) router.push("/admin/dashboard");
      else { const d = await res.json(); setError(d.error || "Save failed."); }
    } catch { setError("Something went wrong."); }
    setSaving(false);
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <i className="fa-solid fa-spinner fa-spin text-purple-600 text-3xl"></i>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4 sticky top-0 z-10">
        <Link href="/admin/dashboard" className="text-gray-400 hover:text-gray-700 transition-colors">
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
        <h1 className="font-bold text-gray-900">Edit Post</h1>
        <Link href={`/blog/${form.slug}`} target="_blank" className="ml-auto text-xs text-blue-600 hover:underline flex items-center gap-1">
          <i className="fa-solid fa-arrow-up-right-from-square"></i> View post
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            <i className="fa-solid fa-circle-exclamation mr-2"></i>{error}
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
          <h2 className="font-semibold text-sm uppercase tracking-wide text-gray-500">Post Details</h2>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Title *</label>
            <input type="text" required value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Slug *</label>
            <input type="text" required value={form.slug} onChange={e => setForm(p => ({ ...p, slug: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
              <input type="text" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Author</label>
              <input type="text" value={form.author} onChange={e => setForm(p => ({ ...p, author: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Excerpt</label>
            <textarea rows={2} value={form.excerpt} onChange={e => setForm(p => ({ ...p, excerpt: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="font-semibold text-sm uppercase tracking-wide text-gray-500">Featured Image</h2>
          <div className="flex items-start gap-4">
            {form.image_url && (
              <div className="w-32 h-20 rounded-xl overflow-hidden border border-gray-200 flex-shrink-0">
                <img src={form.image_url} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex-1">
              <label className="cursor-pointer inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
                <i className={`fa-solid ${uploading ? "fa-spinner fa-spin" : "fa-cloud-arrow-up"}`}></i>
                {uploading ? "Uploading…" : "Upload Image"}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
              {form.image_url && <button type="button" onClick={() => setForm(p => ({ ...p, image_url: "" }))} className="block text-xs text-red-500 hover:text-red-700 mt-1.5 transition-colors">Remove image</button>}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="font-semibold text-sm uppercase tracking-wide text-gray-500">Content *</h2>
          <p className="text-xs text-gray-400">HTML is supported.</p>
          <textarea required rows={16} value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm resize-y" />
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-sm uppercase tracking-wide text-gray-500 mb-0.5">Publish</h2>
              <p className="text-xs text-gray-400">Make this post visible on the site</p>
            </div>
            <button type="button" onClick={() => setForm(p => ({ ...p, published: !p.published }))} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.published ? "bg-purple-600" : "bg-gray-200"}`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${form.published ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 justify-end pb-8">
          <Link href="/admin/dashboard" className="px-5 py-2.5 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">Cancel</Link>
          <button type="submit" disabled={saving} className="px-6 py-2.5 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-60 rounded-xl transition-colors flex items-center gap-2">
            {saving ? <><i className="fa-solid fa-spinner fa-spin"></i> Saving…</> : <><i className="fa-solid fa-check"></i> Save Changes</>}
          </button>
        </div>
      </form>
    </div>
  );
}
