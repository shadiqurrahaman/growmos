"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MarkdownEditor from "./MarkdownEditor";

export type Post = {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  image_url: string | null;
  image_alt: string | null;
  category: string;
  author: string;
  published: boolean;
  sort_order: number;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
  // CMS v2
  target_url: string | null;
  meta_description: string | null;
  author_name: string | null;
  author_url: string | null;
  date_published: string | null;
  date_modified: string | null;
  hero_image_url: string | null;
  hero_image_alt: string | null;
  body_markdown: string | null;
  schema_jsonld: string | null;
  status: string | null;
  created_at: string;
  updated_at?: string | null;
};

type Status = "draft" | "review" | "published";

type FormState = {
  title: string;
  slug: string;
  excerpt: string;
  image_url: string;
  image_alt: string;
  category: string;
  author: string;
  published: boolean;
  sort_order: number;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  target_url: string;
  meta_description: string;
  author_name: string;
  author_url: string;
  date_published: string;
  date_modified: string;
  hero_image_url: string;
  hero_image_alt: string;
  body_markdown: string;
  schema_jsonld: string;
  status: Status;
};

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function isoDate(s: string | null | undefined): string {
  if (!s) return "";
  // Accept ISO date or anything Date can parse; return YYYY-MM-DD.
  const d = new Date(s);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

function defaultFormState(): FormState {
  return {
    title: "",
    slug: "",
    excerpt: "",
    image_url: "",
    image_alt: "",
    category: "Blog",
    author: "GrowMos Team",
    published: false,
    sort_order: 0,
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
    target_url: "",
    meta_description: "",
    author_name: "",
    author_url: "",
    date_published: todayIso(),
    date_modified: todayIso(),
    hero_image_url: "",
    hero_image_alt: "",
    body_markdown: "",
    schema_jsonld: "",
    status: "draft",
  };
}

function postToFormState(p: Post): FormState {
  return {
    title: p.title || "",
    slug: p.slug || "",
    excerpt: p.excerpt || "",
    image_url: p.image_url || "",
    image_alt: p.image_alt || "",
    category: p.category || "Blog",
    author: p.author || "GrowMos Team",
    published: !!p.published,
    sort_order: p.sort_order ?? 0,
    seo_title: p.seo_title || "",
    seo_description: p.seo_description || "",
    seo_keywords: p.seo_keywords || "",
    target_url: p.target_url || "",
    meta_description: p.meta_description || "",
    author_name: p.author_name || "",
    author_url: p.author_url || "",
    date_published: isoDate(p.date_published) || isoDate(p.created_at) || todayIso(),
    date_modified: isoDate(p.date_modified) || todayIso(),
    hero_image_url: p.hero_image_url || "",
    hero_image_alt: p.hero_image_alt || "",
    body_markdown: p.body_markdown ?? "",
    schema_jsonld: p.schema_jsonld || "",
    status: (p.status as Status) || (p.published ? "published" : "draft"),
  };
}

type Props = {
  mode: "new" | "edit";
  initialPost?: Post;
};

export default function PostForm({ mode, initialPost }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(() =>
    mode === "edit" && initialPost ? postToFormState(initialPost) : defaultFormState()
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingBodyImage, setUploadingBodyImage] = useState(false);
  const [previewing, setPreviewing] = useState(false);

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80);
  }

  async function uploadImage(file: File): Promise<string | null> {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (!res.ok || !data.url) {
      setError(data.error || "Image upload failed.");
      return null;
    }
    return data.url as string;
  }

  async function handleHeroUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingHero(true);
    try {
      const url = await uploadImage(file);
      if (url) setForm((p) => ({ ...p, hero_image_url: url }));
    } finally {
      setUploadingHero(false);
      e.target.value = "";
    }
  }

  async function handleBodyImage(file: File): Promise<string | null> {
    setUploadingBodyImage(true);
    try {
      return await uploadImage(file);
    } finally {
      setUploadingBodyImage(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload: Record<string, unknown> = {
      ...form,
      // Sync published boolean with status
      published: form.status === "published",
    };

    try {
      const url = mode === "new"
        ? "/api/posts"
        : `/api/posts/${initialPost!.id}`;
      const method = mode === "new" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        const d = await res.json().catch(() => ({}));
        setError(d.error || `Save failed (${res.status}).`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  async function handlePreview() {
    setPreviewing(true);
    setError("");
    try {
      const payload: Record<string, unknown> = {
        ...form,
        // Carry through the post id when editing so preview can use the same
        // canonical URL paths if needed.
        id: initialPost?.id,
      };
      const res = await fetch("/api/posts/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        setError(d.error || `Preview failed (${res.status}).`);
        return;
      }
      const data = await res.json();
      if (data.url) {
        window.open(data.url, "_blank", "noopener,noreferrer");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Preview failed.");
    } finally {
      setPreviewing(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4 sticky top-0 z-10">
        <Link href="/admin/dashboard" className="text-gray-400 hover:text-gray-700 transition-colors">
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
        <h1 className="font-bold text-gray-900">{mode === "new" ? "New Post" : "Edit Post"}</h1>
        {mode === "edit" && initialPost && (
          <Link
            href={initialPost.target_url || `/blog/${initialPost.slug}`}
            target="_blank"
            className="ml-auto text-xs text-blue-600 hover:underline flex items-center gap-1"
          >
            <i className="fa-solid fa-arrow-up-right-from-square"></i> View post
          </Link>
        )}
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            <i className="fa-solid fa-circle-exclamation mr-2"></i>{error}
          </div>
        )}

        {/* ── IDENTITY ─────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
          <h2 className="font-semibold text-sm uppercase tracking-wide text-gray-500">Identity</h2>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Title *</label>
            <input
              type="text" required
              value={form.title}
              onChange={(e) => {
                const t = e.target.value;
                setForm((p) => ({
                  ...p,
                  title: t,
                  slug: mode === "new" && !slugManuallyEdited ? generateSlug(t) : p.slug,
                }));
              }}
              placeholder="Enter post title"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Slug *</label>
              <input
                type="text" required
                value={form.slug}
                onChange={(e) => {
                  setSlugManuallyEdited(true);
                  setForm((p) => ({ ...p, slug: e.target.value }));
                }}
                placeholder="post-url-slug"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Target URL
              </label>
              <input
                type="text"
                value={form.target_url}
                onChange={(e) => setForm((p) => ({ ...p, target_url: e.target.value }))}
                placeholder={`/blog/${form.slug || "post-slug"}`}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm"
              />
              <p className="text-xs text-gray-400 mt-1">Leave blank to use /blog/{form.slug || "…"}</p>
            </div>
          </div>
        </div>

        {/* ── SEO & SHARING ────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-sm uppercase tracking-wide text-gray-500">SEO & Sharing</h2>
            <span className="text-xs text-gray-400">Used in &lt;title&gt;, meta, and OG tags</span>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Meta description <span className="text-gray-400 font-normal">({form.meta_description.length}/150)</span>
            </label>
            <textarea
              rows={2}
              maxLength={160}
              value={form.meta_description}
              onChange={(e) => setForm((p) => ({ ...p, meta_description: e.target.value }))}
              placeholder="Shown under your title in Google results (≤ 150 chars)"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            />
          </div>

          <details className="group">
            <summary className="text-xs font-semibold text-gray-500 cursor-pointer hover:text-gray-700 flex items-center gap-1">
              <i className="fa-solid fa-chevron-right text-[10px] transition-transform group-open:rotate-90"></i>
              Advanced SEO overrides (seo_title / seo_description / seo_keywords)
            </summary>
            <div className="mt-3 space-y-3 pl-4 border-l-2 border-gray-100">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  SEO title override <span className="text-gray-400 font-normal">({form.seo_title.length}/60)</span>
                </label>
                <input
                  type="text"
                  maxLength={70}
                  value={form.seo_title}
                  onChange={(e) => setForm((p) => ({ ...p, seo_title: e.target.value }))}
                  placeholder="Optional — defaults to title"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  SEO description override <span className="text-gray-400 font-normal">({form.seo_description.length}/155)</span>
                </label>
                <textarea
                  rows={2}
                  maxLength={170}
                  value={form.seo_description}
                  onChange={(e) => setForm((p) => ({ ...p, seo_description: e.target.value }))}
                  placeholder="Optional — defaults to meta_description"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Keywords</label>
                <input
                  type="text"
                  value={form.seo_keywords}
                  onChange={(e) => setForm((p) => ({ ...p, seo_keywords: e.target.value }))}
                  placeholder="e.g. data engineering, dbt, bigquery"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </details>
        </div>

        {/* ── AUTHOR & DATES ───────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="font-semibold text-sm uppercase tracking-wide text-gray-500">Author & Dates</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Author name</label>
              <input
                type="text"
                value={form.author_name}
                onChange={(e) => setForm((p) => ({ ...p, author_name: e.target.value }))}
                placeholder="Defaults to: GrowMos Team"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Author URL</label>
              <input
                type="text"
                value={form.author_url}
                onChange={(e) => setForm((p) => ({ ...p, author_url: e.target.value }))}
                placeholder="/about or https://…"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Date published</label>
              <input
                type="date"
                value={form.date_published}
                onChange={(e) => setForm((p) => ({ ...p, date_published: e.target.value }))}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Date modified</label>
              <input
                type="date"
                value={form.date_modified}
                onChange={(e) => setForm((p) => ({ ...p, date_modified: e.target.value }))}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <p className="text-xs text-gray-400 mt-1">Auto-bumped on save unless set explicitly.</p>
            </div>
          </div>
        </div>

        {/* ── HERO IMAGE ───────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="font-semibold text-sm uppercase tracking-wide text-gray-500">Hero Image</h2>
          <p className="text-xs text-gray-400">Used as the article hero, &lt;og:image&gt;, and Twitter card image.</p>
          <div className="flex items-start gap-4">
            {form.hero_image_url && (
              <div className="w-40 h-24 rounded-xl overflow-hidden border border-gray-200 flex-shrink-0 bg-gray-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.hero_image_url} alt={form.hero_image_alt || "Hero"} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex-1 space-y-2">
              <label className="cursor-pointer inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
                <i className={`fa-solid ${uploadingHero ? "fa-spinner fa-spin" : "fa-cloud-arrow-up"}`}></i>
                {uploadingHero ? "Uploading…" : "Upload Image"}
                <input type="file" accept="image/*" onChange={handleHeroUpload} className="hidden" disabled={uploadingHero} />
              </label>
              <p className="text-xs text-gray-400">JPG, PNG, WebP up to 10MB · auto webp @ 1600×900</p>
              {form.hero_image_url && (
                <button
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, hero_image_url: "" }))}
                  className="block text-xs text-red-500 hover:text-red-700 transition-colors"
                >
                  Remove image
                </button>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Hero image alt text *</label>
            <input
              type="text"
              required={!!form.hero_image_url}
              value={form.hero_image_alt}
              onChange={(e) => setForm((p) => ({ ...p, hero_image_alt: e.target.value }))}
              placeholder="Describe the image for screen readers and SEO"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* ── BODY (Markdown) ──────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <div>
            <h2 className="font-semibold text-sm uppercase tracking-wide text-gray-500">Body *</h2>
            <p className="text-xs text-gray-400 mt-1">Write in Markdown. Live preview on the right. Saved as compiled, sanitized HTML.</p>
          </div>
          <MarkdownEditor
            value={form.body_markdown}
            onChange={(md) => setForm((p) => ({ ...p, body_markdown: md }))}
            placeholder="# Start writing…\n\nMarkdown is supported (headings, lists, links, images, code blocks)."
            onUploadImage={handleBodyImage}
          />
        </div>

        {/* ── SCHEMA.ORG JSON-LD ───────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-sm uppercase tracking-wide text-gray-500">Schema.org JSON-LD</h2>
            <span className="text-xs text-gray-400">Optional — injected into &lt;head&gt;</span>
          </div>
          <textarea
            rows={6}
            value={form.schema_jsonld}
            onChange={(e) => setForm((p) => ({ ...p, schema_jsonld: e.target.value }))}
            placeholder={`{\n  "@context": "https://schema.org",\n  "@type": "BlogPosting",\n  "headline": "..."\n}`}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-xs resize-y"
          />
          <p className="text-xs text-gray-400">
            Validated server-side: must be JSON, include <code>@context</code> and <code>@type</code>, &lt; 20KB. Dangerous types (script/iframe/style/object/embed) are rejected.
            Leave blank to use the auto-generated BlogPosting schema.
          </p>
        </div>

        {/* ── STATUS ───────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
          <h2 className="font-semibold text-sm uppercase tracking-wide text-gray-500">Status</h2>
          <div className="flex items-center gap-2">
            {(["draft", "review", "published"] as Status[]).map((s) => {
              const colors: Record<Status, string> = {
                draft:     "bg-gray-100 text-gray-700 hover:bg-gray-200",
                review:    "bg-amber-100 text-amber-800 hover:bg-amber-200",
                published: "bg-green-100 text-green-800 hover:bg-green-200",
              };
              const active = form.status === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, status: s }))}
                  className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all capitalize ${active ? `${colors[s]} ring-2 ring-offset-1 ring-purple-500` : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"}`}
                >
                  {s}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-gray-400">
            Only <strong>Published</strong> posts are visible on the public site. Drafts and Review are admin-only.
          </p>
        </div>

        {/* ── BOTTOM ACTIONS ───────────────────────────────────────── */}
        <div className="flex items-center gap-3 justify-between pb-8 flex-wrap">
          <button
            type="button"
            onClick={handlePreview}
            disabled={previewing || saving || !form.title || !form.slug}
            title={!form.title || !form.slug ? "Add a title and slug first" : "Open public-page preview in a new tab"}
            className="px-5 py-2.5 text-sm font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed border border-purple-200 rounded-xl transition-colors flex items-center gap-2"
          >
            {previewing ? (
              <><i className="fa-solid fa-spinner fa-spin"></i> Generating…</>
            ) : (
              <><i className="fa-solid fa-eye"></i> Preview public page</>
            )}
          </button>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/dashboard"
              className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 bg-white border border-gray-200 rounded-xl transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving || uploadingBodyImage}
              className="px-6 py-2.5 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-60 rounded-xl transition-colors flex items-center gap-2"
            >
              {saving ? (
                <><i className="fa-solid fa-spinner fa-spin"></i> Saving…</>
              ) : (
                <><i className="fa-solid fa-check"></i> {mode === "new" ? "Save Post" : "Save Changes"}</>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}