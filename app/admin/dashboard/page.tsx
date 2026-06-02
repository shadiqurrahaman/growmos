"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Post = {
  id: number;
  title: string;
  slug: string;
  category: string;
  author: string;
  published: boolean;
  sort_order: number;
  created_at: string;
};

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);
  const router = useRouter();

  async function fetchPosts() {
    setLoading(true);
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data.posts || []);
    setLoading(false);
  }

  useEffect(() => { fetchPosts(); }, []);

  async function togglePublished(post: Post) {
    await fetch(`/api/posts/${post.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !post.published }),
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

      <div className="max-w-6xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <i className="fa-solid fa-spinner fa-spin text-purple-600 text-3xl mb-3 block"></i>
              <p className="text-gray-500">Loading posts…</p>
            </div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
            <i className="fa-solid fa-newspaper text-gray-300 text-5xl mb-4 block"></i>
            <h3 className="font-semibold text-gray-700 text-lg mb-1">No posts yet</h3>
            <p className="text-gray-500 mb-4">Create your first blog post to get started.</p>
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
                {posts.map((post) => (
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
                        onClick={() => togglePublished(post)}
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                          post.published
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${post.published ? "bg-green-500" : "bg-gray-400"}`}></span>
                        {post.published ? "Published" : "Draft"}
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
                      {new Date(post.created_at).toLocaleDateString("en-US", { month:"short", day:"numeric", year:"numeric" })}
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
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
