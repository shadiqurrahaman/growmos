"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Status = "draft" | "review" | "published";

type Post = {
  id: number;
  title: string;
  slug: string;
  category: string;
  author: string;
  published: boolean;
  sort_order: number;
  status: Status | string | null;
  date_published: string | null;
  created_at: string;
  updated_at?: string | null;
};

type SortMode = "recent" | "default";
type StatusFilter = "all" | Status;

const STATUS_CYCLE: Record<Status, Status> = {
  draft: "review",
  review: "published",
  published: "draft",
};

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [sort, setSort] = useState<SortMode>("recent");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const router = useRouter();

  async function fetchPosts() {
    setLoading(true);
    const res = await fetch(`/api/posts?sort=${sort}`);
    const data = await res.json();
    setPosts(data.posts || []);
    setLoading(false);
  }

  useEffect(() => { fetchPosts(); /* eslint-disable-line react-hooks/set-state-in-effect */ }, [sort]);

  async function cycleStatus(post: Post) {
    const current = (post.status as Status) || (post.published ? "published" : "draft");
    const next = STATUS_CYCLE[current] || "draft";
    await fetch(`/api/posts/${post.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    fetchPosts();
  }

  async function deletePost(id: number) {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    setDeleting(id);
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    fetchPosts();
    setDeleting(null);
  }

  async function moveSortOrder(post: Post, direction: "up" | "down") {
    const newOrder = direction === "up" ? post.sort_order + 1 : post.sort_order - 1;
    await fetch(`/api/posts/${post.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sort_order: newOrder }),
    });
    fetchPosts();
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const visiblePosts = posts.filter((p) => {
    if (statusFilter === "all") return true;
    const s = (p.status as Status) || (p.published ? "published" : "draft");
    return s === statusFilter;
  });

  function statusChipClass(s: Status): string {
    switch (s) {
      case "published": return "bg-green-100 text-green-700 hover:bg-green-200";
      case "review":    return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      case "draft":     return "bg-gray-100 text-gray-600 hover:bg-gray-200";
    }
  }

  function statusDot(s: Status): string {
    switch (s) {
      case "published": return "bg-green-500";
      case "review":    return "bg-amber-500";
      case "draft":     return "bg-gray-400";
    }
  }

  function displayStatus(p: Post): Status {
    return (p.status as Status) || (p.published ? "published" : "draft");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <i className="fa-solid fa-pen-to-square text-white text-sm"></i>
          </div>
          <div>
            <h1 className="font-bold text-gray-900">Blog Dashboard</h1>
            <p className="text-xs text-gray-500">{posts.length} post{posts.length !== 1 ? "s" : ""} total</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/posts/new" className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
            <i className="fa-solid fa-plus"></i> New Post
          </Link>
          <Link href="/admin/email" className="text-gray-500 hover:text-indigo-600 text-sm px-3 py-2 rounded-lg hover:bg-indigo-50 transition-colors flex items-center gap-1.5">
            <i className="fa-solid fa-envelope"></i> Email
          </Link>
          <Link href="/" className="text-gray-500 hover:text-gray-700 text-sm px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors" target="_blank">
            <i className="fa-solid fa-arrow-up-right-from-square mr-1"></i> View Site
          </Link>
          <button onClick={handleLogout} className="text-gray-500 hover:text-red-600 text-sm px-3 py-2 rounded-lg hover:bg-red-50 transition-colors">
            <i className="fa-solid fa-arrow-right-from-bracket mr-1"></i> Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Sort + Filter row */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200 p-1">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${statusFilter === "all" ? "bg-purple-600 text-white" : "text-gray-600 hover:text-gray-900"}`}
              >
                All
              </button>
              {(["draft", "review", "published"] as Status[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors capitalize ${statusFilter === s ? "bg-purple-600 text-white" : "text-gray-600 hover:text-gray-900"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200 p-1">
              <button
                onClick={() => setSort("recent")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${sort === "recent" ? "bg-purple-600 text-white" : "text-gray-600 hover:text-gray-900"}`}
              >
                <i className="fa-solid fa-clock-rotate-left mr-1.5"></i>Most recent
              </button>
              <button
                onClick={() => setSort("default")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${sort === "default" ? "bg-purple-600 text-white" : "text-gray-600 hover:text-gray-900"}`}
              >
                <i className="fa-solid fa-arrow-down-wide-short mr-1.5"></i>Manual order
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <i className="fa-solid fa-spinner fa-spin text-purple-600 text-3xl mb-3 block"></i>
              <p className="text-gray-500">Loading posts…</p>
            </div>
          </div>
        ) : visiblePosts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
            <i className="fa-solid fa-newspaper text-gray-300 text-5xl mb-4 block"></i>
            <h3 className="font-semibold text-gray-700 text-lg mb-1">
              {statusFilter === "all" ? "No posts yet" : `No ${statusFilter} posts`}
            </h3>
            <p className="text-gray-500 mb-4">
              {statusFilter === "all"
                ? "Create your first blog post to get started."
                : `Try a different filter or create a new post.`}
            </p>
            <Link href="/admin/posts/new" className="bg-purple-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors">
              Create First Post
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-4">Title</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-4">Category</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-4">Author</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-4">Status</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-4">Order</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-4">Date</th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {visiblePosts.map((post) => {
                  const status = displayStatus(post);
                  return (
                    <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900 text-sm">{post.title}</div>
                        <div className="text-xs text-gray-400 mt-0.5">/{post.slug}</div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">{post.category}</span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">{post.author}</td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => cycleStatus(post)}
                          title={`Click to change status (current: ${status})`}
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors capitalize ${statusChipClass(status)}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${statusDot(status)}`}></span>
                          {status}
                        </button>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1">
                          <button onClick={() => moveSortOrder(post, "up")} className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors text-xs">
                            <i className="fa-solid fa-chevron-up"></i>
                          </button>
                          <span className="text-xs font-mono text-gray-500 w-6 text-center">{post.sort_order}</span>
                          <button onClick={() => moveSortOrder(post, "down")} className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors text-xs">
                            <i className="fa-solid fa-chevron-down"></i>
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-xs text-gray-500">
                        {(() => {
                          const created = new Date(post.created_at).getTime();
                          const updated = post.updated_at ? new Date(post.updated_at).getTime() : 0;
                          const wasEdited = updated > created + 1000;
                          const dateForShow = post.date_published
                            ? post.date_published
                            : (wasEdited ? post.updated_at! : post.created_at);
                          const label = wasEdited && !post.date_published ? "updated" : "created";
                          return (
                            <div>
                              <div className="text-gray-700 font-medium">
                                {new Date(dateForShow).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                              </div>
                              <div className={`text-[10px] uppercase tracking-wide ${wasEdited && !post.date_published ? "text-amber-600" : "text-gray-400"}`}>
                                {label}
                              </div>
                            </div>
                          );
                        })()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/blog/${post.slug}`} target="_blank" className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors text-sm">
                            <i className="fa-solid fa-eye"></i>
                          </Link>
                          <Link href={`/admin/posts/${post.id}`} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-purple-50 text-gray-400 hover:text-purple-600 transition-colors text-sm">
                            <i className="fa-solid fa-pen"></i>
                          </Link>
                          <button
                            onClick={() => deletePost(post.id)}
                            disabled={deleting === post.id}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors text-sm"
                          >
                            {deleting === post.id ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-trash"></i>}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}