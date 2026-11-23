"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/admin/ToastContext";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { playTactileClick } from "@/lib/sound";
import { projectsData } from "@/content/data/projects";
import { Project } from "@/types";
import {
  saveProjectAction,
  deleteProjectAction,
  toggleProjectFlagsAction,
} from "@/app/admin/actions";
import {
  FolderGit2,
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  Star,
  Check,
  X,
  UploadCloud,
  Layers,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";

export default function AdminProjectsPage() {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [deleteConfirmProject, setDeleteConfirmProject] = useState<Project | null>(null);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);

  // Form editing state
  const [editingProject, setEditingProject] = useState<Partial<Project>>({
    title: "",
    slug: "",
    shortDescription: "",
    detailedDescription: "",
    category: "Distributed Systems / IoT",
    status: "Completed",
    featured: false,
    technologies: ["Go", "PostgreSQL"],
    thumbnail: "/images/projects/mapup-thumb.jpg",
    problemStatement: "",
    solution: "",
    architecture: { summary: "", nodes: [] },
    keyFeatures: [],
    engineeringChallenges: [],
    lessonsLearned: [],
  });

  // Filtered projects
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = categoryFilter === "all" || p.category.toLowerCase().includes(categoryFilter.toLowerCase());
    return matchesSearch && matchesCat;
  });

  const handleOpenCreate = () => {
    playTactileClick();
    setEditingProject({
      title: "",
      slug: "",
      shortDescription: "",
      detailedDescription: "",
      category: "Distributed Systems / IoT",
      status: "Completed",
      featured: false,
      technologies: ["Go", "PostgreSQL", "Docker"],
      thumbnail: "/images/projects/placeholder.jpg",
      problemStatement: "",
      solution: "",
      architecture: { summary: "", nodes: [] },
      keyFeatures: ["High throughput ingestion", "ACID transactions"],
      engineeringChallenges: [],
      lessonsLearned: [],
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    playTactileClick();
    setEditingProject({ ...project });
    setIsFormOpen(true);
  };

  const handleOpenPreview = (project: Project) => {
    playTactileClick();
    setPreviewProject(project);
    setIsPreviewOpen(true);
  };

  const handleTogglePublish = async (project: Project) => {
    playTactileClick();
    const updatedStatus = project.status === "Completed" ? "Archived" : "Completed";
    const res = await toggleProjectFlagsAction(project.id, {
      is_published: updatedStatus === "Completed",
    });

    if (res.success) {
      setProjects((prev) =>
        prev.map((p) => (p.id === project.id ? { ...p, status: updatedStatus } : p))
      );
      toast.success("Project Status Updated", `${project.title} marked as ${updatedStatus}.`);
    } else {
      toast.error("Update Failed", res.error);
    }
  };

  const handleToggleFeatured = async (project: Project) => {
    playTactileClick();
    const nextFeatured = !project.featured;
    const res = await toggleProjectFlagsAction(project.id, {
      is_featured: nextFeatured,
    });

    if (res.success) {
      setProjects((prev) =>
        prev.map((p) => (p.id === project.id ? { ...p, featured: nextFeatured } : p))
      );
      toast.success(
        nextFeatured ? "Added to Featured" : "Removed from Featured",
        project.title
      );
    } else {
      toast.error("Update Failed", res.error);
    }
  };

  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    playTactileClick();

    if (!editingProject.title || !editingProject.slug) {
      toast.error("Validation Error", "Title and Slug are required.");
      return;
    }

    const payload = {
      id: editingProject.id,
      title: editingProject.title,
      slug: editingProject.slug,
      short_description: editingProject.shortDescription || "Software engineering project.",
      detailed_description: editingProject.detailedDescription || "Comprehensive engineering case study.",
      category: editingProject.category || "Full-Stack Software",
      thumbnail_url: editingProject.thumbnail || "/images/projects/mapup-thumb.jpg",
      status: editingProject.status || "Completed",
      is_featured: Boolean(editingProject.featured),
      is_published: editingProject.status !== "Archived",
      problem_statement: editingProject.problemStatement || "",
      solution: editingProject.solution || "",
      architecture_summary: editingProject.architecture?.summary || "",
      key_features: editingProject.keyFeatures || [],
      lessons_learned: editingProject.lessonsLearned || [],
      technologies: editingProject.technologies || [],
      sort_order: 1,
    };

    const res = await saveProjectAction(payload);
    if (res.success) {
      if (editingProject.id) {
        setProjects((prev) =>
          prev.map((p) => (p.id === editingProject.id ? ({ ...p, ...editingProject } as Project) : p))
        );
      } else {
        const newProj = {
          ...editingProject,
          id: `proj-${Date.now()}`,
        } as Project;
        setProjects((prev) => [newProj, ...prev]);
      }
      setIsFormOpen(false);
      toast.success("Project Saved", res.message);
    } else {
      toast.error("Save Failed", res.error);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirmProject) return;
    playTactileClick();

    const res = await deleteProjectAction(deleteConfirmProject.id, deleteConfirmProject.slug);
    if (res.success) {
      setProjects((prev) => prev.filter((p) => p.id !== deleteConfirmProject.id));
      toast.success("Project Deleted", deleteConfirmProject.title);
    } else {
      toast.error("Delete Failed", res.error);
    }
    setDeleteConfirmProject(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-hairline">
        <div>
          <span className="text-xs font-mono text-cyan-accent uppercase tracking-widest block mb-1">
            CMS // REPOSITORIES
          </span>
          <h1 className="font-display font-bold text-3xl text-white">
            Project Management
          </h1>
          <p className="text-xs text-silver-mid font-light mt-1">
            Author, edit, publish, feature, and preview full engineering case studies and technical architectures.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={handleOpenCreate}
          className="gap-2 text-xs font-mono font-bold bg-cyan-400 text-obsidian hover:bg-cyan-300 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          CREATE PROJECT
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-silver-dark absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by title, stack, or keywords..."
            className="w-full bg-surface-1 border border-hairline rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-white outline-none focus:border-cyan-500"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-surface-1 border border-hairline text-silver-mid font-mono text-xs px-3 py-2 rounded-xl outline-none cursor-pointer"
        >
          <option value="all">All Categories ({projects.length})</option>
          <option value="Distributed Systems">Distributed Systems / IoT</option>
          <option value="Web Application">Web Applications</option>
          <option value="SaaS">SaaS / Multi-Tenant</option>
          <option value="Finance">Enterprise Finance</option>
        </select>
      </div>

      {/* Projects Data Table */}
      <Card hasDatumCorners className="bg-obsidian border-hairline overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-hairline bg-surface-1 text-silver-dark text-[11px]">
                <th className="py-3 px-4">Project</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Technologies</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Featured</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {filteredProjects.map((p) => (
                <tr key={p.id} className="hover:bg-surface-1/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-sans font-bold text-sm text-white">{p.title}</div>
                    <div className="text-[10px] text-silver-dark font-mono truncate max-w-xs mt-0.5">
                      /{p.slug}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-silver-mid">{p.category}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {p.technologies.slice(0, 3).map((t) => (
                        <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-carbon border border-hairline text-silver-light">
                          {t}
                        </span>
                      ))}
                      {p.technologies.length > 3 && (
                        <span className="text-[9px] text-silver-dark">
                          +{p.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleTogglePublish(p)}
                      title="Click to toggle publish status"
                      className="cursor-pointer"
                    >
                      <Badge variant={p.status === "Completed" ? "cyan" : "default"} dot>
                        {p.status}
                      </Badge>
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleToggleFeatured(p)}
                      title="Toggle featured flag"
                      className={`p-1.5 rounded-lg border transition-all ${
                        p.featured
                          ? "bg-amber-950/60 border-amber-500/60 text-amber-accent"
                          : "bg-carbon border-hairline text-silver-dark hover:text-white"
                      }`}
                    >
                      <Star className={`w-3.5 h-3.5 ${p.featured ? "fill-amber-400" : ""}`} />
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenPreview(p)}
                        title="Live Case Study Preview"
                        className="p-1.5 h-8 w-8"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenEdit(p)}
                        title="Edit Project"
                        className="p-1.5 h-8 w-8 text-cyan-accent hover:border-cyan-500"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDeleteConfirmProject(p)}
                        title="Delete Project"
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

      {/* Create / Edit Project Modal Drawer */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/85 backdrop-blur-md overflow-y-auto">
          <div className="max-w-3xl w-full rounded-2xl border border-hairline bg-surface-1 p-6 sm:p-8 shadow-2xl my-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-hairline">
              <div className="flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-cyan-accent" />
                <h3 className="font-display font-bold text-xl text-white">
                  {editingProject.id ? "Edit Engineering Project" : "Create New Project"}
                </h3>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-silver-dark hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-silver-dark uppercase mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title || ""}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        title: e.target.value,
                        slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                      })
                    }
                    placeholder="MapUp Fleet Geofencing"
                    className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-silver-dark uppercase mb-1">URL Slug</label>
                  <input
                    type="text"
                    required
                    value={editingProject.slug || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                    className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-silver-dark uppercase mb-1">Short Description</label>
                <input
                  type="text"
                  required
                  value={editingProject.shortDescription || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
                  placeholder="One sentence summary of the engineering accomplishment..."
                  className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-silver-dark uppercase mb-1">Detailed Case Study</label>
                <textarea
                  rows={4}
                  value={editingProject.detailedDescription || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, detailedDescription: e.target.value })}
                  placeholder="Comprehensive description of problem, architecture, and resolution..."
                  className="w-full bg-carbon border border-hairline rounded-xl p-3 text-white outline-none focus:border-cyan-500 font-sans text-xs leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-silver-dark uppercase mb-1">Category</label>
                  <input
                    type="text"
                    value={editingProject.category || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    placeholder="Distributed Systems / IoT"
                    className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-silver-dark uppercase mb-1">Status</label>
                  <select
                    value={editingProject.status || "Completed"}
                    onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as any })}
                    className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-white outline-none"
                  >
                    <option value="Completed">Completed</option>
                    <option value="In Development">In Development</option>
                    <option value="Production">Production</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-silver-dark uppercase mb-1">Thumbnail Asset URL</label>
                  <input
                    type="text"
                    value={editingProject.thumbnail || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, thumbnail: e.target.value })}
                    className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-silver-dark uppercase mb-1">GitHub Repository URL</label>
                  <input
                    type="text"
                    value={editingProject.githubUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                    placeholder="https://github.com/mohannv/..."
                    className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-silver-dark uppercase mb-1">
                  Technologies (Comma Separated)
                </label>
                <input
                  type="text"
                  value={editingProject.technologies ? editingProject.technologies.join(", ") : ""}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      technologies: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  placeholder="Go, PostgreSQL, WebSockets, Docker, React"
                  className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-cyan-accent outline-none focus:border-cyan-500"
                />
              </div>

              {/* Case Study Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-hairline">
                <div>
                  <label className="block text-silver-dark uppercase mb-1">Problem Statement</label>
                  <textarea
                    rows={2}
                    value={editingProject.problemStatement || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, problemStatement: e.target.value })}
                    className="w-full bg-carbon border border-hairline rounded-xl p-2.5 text-white outline-none text-xs"
                  />
                </div>
                <div>
                  <label className="block text-silver-dark uppercase mb-1">Engineering Solution</label>
                  <textarea
                    rows={2}
                    value={editingProject.solution || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
                    className="w-full bg-carbon border border-hairline rounded-xl p-2.5 text-white outline-none text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3">
                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={Boolean(editingProject.featured)}
                    onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                    className="accent-cyan-400"
                  />
                  <span>Featured Project (Highlighted on Home Page)</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-hairline">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFormOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="bg-cyan-400 text-obsidian hover:bg-cyan-300 font-bold"
                >
                  Save Project Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Live Case Study Preview Modal */}
      {isPreviewOpen && previewProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/90 backdrop-blur-md overflow-y-auto">
          <div className="max-w-4xl w-full rounded-2xl border border-hairline bg-surface-1 p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-hairline">
              <div>
                <span className="text-[10px] font-mono text-cyan-accent uppercase">
                  CASE STUDY LIVE PREVIEW
                </span>
                <h2 className="font-display font-bold text-2xl text-white">
                  {previewProject.title}
                </h2>
              </div>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="text-silver-dark hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <p className="text-sm text-silver-light leading-relaxed font-light">
                {previewProject.detailedDescription}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-xl bg-carbon border border-hairline">
                <div>
                  <h5 className="font-mono text-xs font-bold text-cyan-accent uppercase mb-2">
                    01 // THE ENGINEERING CHALLENGE
                  </h5>
                  <p className="text-xs text-silver-mid font-light leading-relaxed">
                    {previewProject.problemStatement || "Technical challenge specification."}
                  </p>
                </div>
                <div>
                  <h5 className="font-mono text-xs font-bold text-emerald-accent uppercase mb-2">
                    02 // ARCHITECTURAL RESOLUTION
                  </h5>
                  <p className="text-xs text-silver-mid font-light leading-relaxed">
                    {previewProject.solution || "Architectural implementation specification."}
                  </p>
                </div>
              </div>

              <div>
                <h5 className="font-mono text-xs font-bold text-white uppercase mb-2">
                  VERIFIED TECHNOLOGY STACK
                </h5>
                <div className="flex flex-wrap gap-2">
                  {previewProject.technologies.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-md bg-surface-2 border border-hairline text-xs font-mono text-cyan-accent">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-hairline">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPreviewOpen(false)}
                className="text-xs font-mono"
              >
                Close Preview
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deleteConfirmProject)}
        title="Delete Project?"
        description={`Are you sure you want to delete '${deleteConfirmProject?.title}'? This action removes the project and its gallery records permanently.`}
        confirmLabel="Delete Permanently"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteConfirmProject(null)}
      />
    </div>
  );
}
