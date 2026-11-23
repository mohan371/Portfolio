"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/admin/ToastContext";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { playTactileClick } from "@/lib/sound";
import { journalData } from "@/content/data/journal";
import { JournalPost } from "@/types";
import { saveArticleAction, deleteArticleAction } from "@/app/admin/actions";
import {
  BookOpen,
  Plus,
  Search,
  Edit2,
  Trash2,
  Calendar,
  Clock,
  X,
  FileText,
} from "lucide-react";

export default function AdminJournalPage() {
  const { toast } = useToast();
  const [articles, setArticles] = useState<JournalPost[]>(journalData);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteConfirmArticle, setDeleteConfirmArticle] = useState<JournalPost | null>(null);

  const [editingArticle, setEditingArticle] = useState<Partial<JournalPost>>({
    title: "",
    slug: "",
    excerpt: "",
    contentMarkdown: "",
    readTimeMinutes: 5,
    tags: ["Engineering", "Architecture"],
    publishedAt: new Date().toISOString().split("T")[0],
    featured: true,
  });

  const filteredArticles = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleOpenCreate = () => {
    playTactileClick();
    setEditingArticle({
      title: "",
      slug: "",
      excerpt: "",
      contentMarkdown: "# Article Title\n\nWrite your technical deep dive here...",
      readTimeMinutes: 6,
      tags: ["Distributed Systems", "PostgreSQL"],
      publishedAt: new Date().toISOString().split("T")[0],
      featured: true,
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (article: JournalPost) => {
    playTactileClick();
    setEditingArticle({ ...article });
    setIsFormOpen(true);
  };

  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    playTactileClick();

    if (!editingArticle.title || !editingArticle.slug) {
      toast.error("Validation Error", "Title and Slug are required.");
      return;
    }

    const payload = {
      id: editingArticle.id,
      title: editingArticle.title,
      slug: editingArticle.slug,
      excerpt: editingArticle.excerpt || "Technical deep dive.",
      content_markdown: editingArticle.contentMarkdown || "# Content",
      category: "Engineering Architecture",
      read_time_minutes: editingArticle.readTimeMinutes || 5,
      tags: editingArticle.tags || [],
      is_published: true,
      published_at: editingArticle.publishedAt || new Date().toISOString(),
    };

    const res = await saveArticleAction(payload);
    if (res.success) {
      if (editingArticle.id) {
        setArticles((prev) =>
          prev.map((a) => (a.id === editingArticle.id ? ({ ...a, ...editingArticle } as JournalPost) : a))
        );
      } else {
        const newArt = { ...editingArticle, id: `art-${Date.now()}` } as JournalPost;
        setArticles((prev) => [newArt, ...prev]);
      }
      setIsFormOpen(false);
      toast.success("Article Saved", res.message);
    } else {
      toast.error("Save Failed", res.error);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirmArticle) return;
    playTactileClick();

    const res = await deleteArticleAction(deleteConfirmArticle.id, deleteConfirmArticle.slug);
    if (res.success) {
      setArticles((prev) => prev.filter((a) => a.id !== deleteConfirmArticle.id));
      toast.success("Article Deleted", deleteConfirmArticle.title);
    } else {
      toast.error("Delete Failed", res.error);
    }
    setDeleteConfirmArticle(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-hairline">
        <div>
          <span className="text-xs font-mono text-violet-accent uppercase tracking-widest block mb-1">
            CMS // PUBLICATIONS
          </span>
          <h1 className="font-display font-bold text-3xl text-white">
            Engineering Journal CMS
          </h1>
          <p className="text-xs text-silver-mid font-light mt-1">
            Author, edit, and publish technical engineering essays, database case studies, and architecture insights.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={handleOpenCreate}
          className="gap-2 text-xs font-mono font-bold bg-violet-500 text-white hover:bg-violet-600 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          WRITE ARTICLE
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-silver-dark absolute left-3 top-3" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search journal essays by title, tags, or content..."
          className="w-full bg-surface-1 border border-hairline rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-white outline-none focus:border-violet-500"
        />
      </div>

      {/* Articles Table */}
      <Card hasDatumCorners className="bg-obsidian border-hairline overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-hairline bg-surface-1 text-silver-dark text-[11px]">
                <th className="py-3 px-4">Article Title</th>
                <th className="py-3 px-4">Publication Date</th>
                <th className="py-3 px-4">Read Time</th>
                <th className="py-3 px-4">Tags</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {filteredArticles.map((a) => (
                <tr key={a.id} className="hover:bg-surface-1/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-sans font-bold text-sm text-white">{a.title}</div>
                    <div className="text-[10px] text-silver-dark font-mono mt-0.5">/{a.slug}</div>
                  </td>
                  <td className="py-3.5 px-4 text-silver-mid">{a.publishedAt}</td>
                  <td className="py-3.5 px-4 text-silver-mid">{a.readTimeMinutes} min</td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {a.tags.map((t) => (
                        <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-carbon border border-hairline text-silver-light">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenEdit(a)}
                        className="p-1.5 h-8 w-8 text-violet-400 hover:border-violet-500"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDeleteConfirmArticle(a)}
                        className="p-1.5 h-8 w-8 text-red-400 hover:border-red-500 hover:bg-red-950/30"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Editor Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/85 backdrop-blur-md overflow-y-auto">
          <div className="max-w-4xl w-full rounded-2xl border border-hairline bg-surface-1 p-6 sm:p-8 shadow-2xl my-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-hairline">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-violet-accent" />
                <h3 className="font-display font-bold text-xl text-white">
                  {editingArticle.id ? "Edit Journal Article" : "Write Technical Article"}
                </h3>
              </div>
              <button onClick={() => setIsFormOpen(false)} className="text-silver-dark hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-silver-dark uppercase mb-1">Article Title</label>
                  <input
                    type="text"
                    required
                    value={editingArticle.title || ""}
                    onChange={(e) =>
                      setEditingArticle({
                        ...editingArticle,
                        title: e.target.value,
                        slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                      })
                    }
                    className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-white outline-none focus:border-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-silver-dark uppercase mb-1">Slug</label>
                  <input
                    type="text"
                    required
                    value={editingArticle.slug || ""}
                    onChange={(e) => setEditingArticle({ ...editingArticle, slug: e.target.value })}
                    className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-white outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-silver-dark uppercase mb-1">Excerpt</label>
                <input
                  type="text"
                  required
                  value={editingArticle.excerpt || ""}
                  onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                  className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-white outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block text-silver-dark uppercase mb-1">Markdown Content</label>
                <textarea
                  rows={10}
                  required
                  value={editingArticle.contentMarkdown || ""}
                  onChange={(e) => setEditingArticle({ ...editingArticle, contentMarkdown: e.target.value })}
                  className="w-full bg-carbon border border-hairline rounded-xl p-3 text-white font-mono text-xs outline-none focus:border-violet-500 leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-silver-dark uppercase mb-1">Read Time (Minutes)</label>
                  <input
                    type="number"
                    min={1}
                    value={editingArticle.readTimeMinutes || 5}
                    onChange={(e) => setEditingArticle({ ...editingArticle, readTimeMinutes: Number(e.target.value) })}
                    className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-white outline-none focus:border-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-silver-dark uppercase mb-1">Tags (Comma Separated)</label>
                  <input
                    type="text"
                    value={editingArticle.tags ? editingArticle.tags.join(", ") : ""}
                    onChange={(e) =>
                      setEditingArticle({
                        ...editingArticle,
                        tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                      })
                    }
                    className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-white outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-hairline">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsFormOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" className="bg-violet-500 text-white hover:bg-violet-600 font-bold">
                  Save Article
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={Boolean(deleteConfirmArticle)}
        title="Delete Article?"
        description={`Are you sure you want to delete '${deleteConfirmArticle?.title}'? This action cannot be undone.`}
        confirmLabel="Delete Permanently"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteConfirmArticle(null)}
      />
    </div>
  );
}
