"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/admin/ToastContext";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { playTactileClick } from "@/lib/sound";
import { skillsData } from "@/content/data/skills";
import { experienceData } from "@/content/data/experience";
import { siteConfig } from "@/content/data/site-config";
import {
  saveSkillAction,
  deleteSkillAction,
  saveExperienceAction,
  deleteExperienceAction,
} from "@/app/admin/actions";
import {
  Layers,
  Briefcase,
  GraduationCap,
  Quote,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
} from "lucide-react";

type ContentTab = "skills" | "experience" | "education" | "testimonials";

export default function AdminContentPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<ContentTab>("skills");

  // Flattened initial skills list
  const initialSkills = skillsData.flatMap((cat) =>
    cat.skills.map((s) => ({
      id: `skill-${s.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      name: s.name,
      level: "Proficient",
      category: cat.title,
      focus: s.focus,
    }))
  );

  const [skills, setSkills] = useState(initialSkills);
  const [experiences, setExperiences] = useState(experienceData);
  const [education, setEducation] = useState(siteConfig.education);

  // Modal states
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [newSkill, setNewSkill] = useState({
    name: "",
    category: "languages" as const,
    level: "Advanced" as const,
    years_of_experience: 3,
  });

  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string; type: string } | null>(null);

  const handleTabChange = (tab: ContentTab) => {
    playTactileClick();
    setActiveTab(tab);
  };

  const handleCreateSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    playTactileClick();

    if (!newSkill.name) return;

    const res = await saveSkillAction({
      name: newSkill.name,
      slug: newSkill.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category: newSkill.category,
      level: newSkill.level,
      years_of_experience: newSkill.years_of_experience,
      is_featured: true,
      sort_order: skills.length + 1,
    });

    if (res.success) {
      setSkills((prev) => [
        {
          id: `skill-${Date.now()}`,
          name: newSkill.name,
          level: newSkill.level,
          category: newSkill.category,
          focus: "Production stack competency",
        },
        ...prev,
      ]);
      setIsSkillModalOpen(false);
      setNewSkill({ name: "", category: "languages", level: "Advanced", years_of_experience: 3 });
      toast.success("Skill Added", newSkill.name);
    } else {
      toast.error("Failed to Add Skill", res.error);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    playTactileClick();

    if (deleteTarget.type === "skill") {
      await deleteSkillAction(deleteTarget.id);
      setSkills((prev) => prev.filter((s) => s.id !== deleteTarget.id));
      toast.success("Skill Removed", deleteTarget.name);
    } else if (deleteTarget.type === "experience") {
      await deleteExperienceAction(deleteTarget.id);
      setExperiences((prev) => prev.filter((e) => e.id !== deleteTarget.id));
      toast.success("Experience Removed", deleteTarget.name);
    }

    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-hairline">
        <div>
          <span className="text-xs font-mono text-cyan-accent uppercase tracking-widest block mb-1">
            CMS // CHRONOLOGY &amp; ASSETS
          </span>
          <h1 className="font-display font-bold text-3xl text-white">
            Content &amp; Chronology
          </h1>
          <p className="text-xs text-silver-mid font-light mt-1">
            Manage your verified skills inventory, professional journey (Gabriel India Ltd), academic credentials (Adhiyamaan &amp; MGR), and recommendations.
          </p>
        </div>

        {activeTab === "skills" && (
          <Button
            variant="primary"
            onClick={() => {
              playTactileClick();
              setIsSkillModalOpen(true);
            }}
            className="gap-2 text-xs font-mono font-bold bg-cyan-400 text-obsidian hover:bg-cyan-300"
          >
            <Plus className="w-4 h-4" />
            ADD SKILL
          </Button>
        )}
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-2 p-1.5 rounded-xl bg-surface-1 border border-hairline font-mono text-xs overflow-x-auto">
        <button
          onClick={() => handleTabChange("skills")}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
            activeTab === "skills"
              ? "bg-cyan-950/60 border border-cyan-500/50 text-cyan-accent font-bold"
              : "text-silver-mid hover:text-white"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Skills Inventory ({skills.length})</span>
        </button>

        <button
          onClick={() => handleTabChange("experience")}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
            activeTab === "experience"
              ? "bg-cyan-950/60 border border-cyan-500/50 text-cyan-accent font-bold"
              : "text-silver-mid hover:text-white"
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Professional Experience ({experiences.length})</span>
        </button>

        <button
          onClick={() => handleTabChange("education")}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
            activeTab === "education"
              ? "bg-cyan-950/60 border border-cyan-500/50 text-cyan-accent font-bold"
              : "text-silver-mid hover:text-white"
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Education Credentials ({education.length})</span>
        </button>
      </div>

      {/* Tab 1: Skills View */}
      {activeTab === "skills" && (
        <Card hasDatumCorners className="bg-obsidian border-hairline overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-hairline bg-surface-1 text-silver-dark text-[11px]">
                  <th className="py-3 px-4">Technology</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Level</th>
                  <th className="py-3 px-4">Technical Focus</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {skills.map((s) => (
                  <tr key={s.id} className="hover:bg-surface-1/50">
                    <td className="py-3.5 px-4 font-bold text-white">{s.name}</td>
                    <td className="py-3.5 px-4 text-silver-mid">{s.category}</td>
                    <td className="py-3.5 px-4">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-accent border border-cyan-800">
                        {s.level}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-silver-dark max-w-xs truncate">{s.focus}</td>
                    <td className="py-3.5 px-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDeleteTarget({ id: s.id, name: s.name, type: "skill" })}
                        className="p-1.5 h-7 w-7 text-red-400 hover:border-red-500 hover:bg-red-950/30"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Tab 2: Experience View */}
      {activeTab === "experience" && (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <Card key={exp.id} hasDatumCorners className="p-6 bg-obsidian border-hairline space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-hairline gap-2">
                <div>
                  <h3 className="font-display font-bold text-lg text-white">{exp.role}</h3>
                  <div className="text-xs font-mono text-cyan-accent">
                    {exp.company} // {exp.location}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="cyan">{exp.period}</Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeleteTarget({ id: exp.id, name: exp.company, type: "experience" })}
                    className="p-1.5 h-7 w-7 text-red-400 hover:border-red-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>

              <p className="text-xs text-silver-mid font-light leading-relaxed">{exp.description}</p>

              <div className="space-y-1 pt-2">
                <span className="text-[10px] font-mono text-silver-dark uppercase">KEY HIGHLIGHTS:</span>
                <ul className="list-disc list-inside text-xs font-mono text-silver-light space-y-1">
                  {(exp.achievements || (exp as any).highlights || []).map((h: string, i: number) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Tab 3: Education View */}
      {activeTab === "education" && (
        <div className="space-y-4">
          {education.map((edu) => (
            <Card key={edu.id} hasDatumCorners className="p-6 bg-obsidian border-hairline space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-hairline gap-2">
                <div>
                  <h3 className="font-display font-bold text-lg text-white">{edu.degree}</h3>
                  <div className="text-xs font-mono text-silver-dark">{edu.institution}</div>
                </div>
                <Badge variant="violet">{edu.year}</Badge>
              </div>

              <p className="text-xs font-mono text-silver-mid">{edu.field}</p>

              <div className="space-y-1 pt-2">
                <span className="text-[10px] font-mono text-silver-dark uppercase">ACADEMIC HIGHLIGHTS:</span>
                <ul className="list-disc list-inside text-xs font-mono text-silver-light space-y-1">
                  {edu.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal: Add Skill */}
      {isSkillModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/85 backdrop-blur-md">
          <div className="max-w-md w-full rounded-2xl border border-hairline bg-surface-1 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-hairline">
              <h3 className="font-display font-bold text-lg text-white">Add Technology Skill</h3>
              <button onClick={() => setIsSkillModalOpen(false)} className="text-silver-dark hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSkill} className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-silver-dark uppercase mb-1">Skill Name</label>
                <input
                  type="text"
                  required
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  placeholder="e.g. Go, Java, Docker, React"
                  className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-silver-dark uppercase mb-1">Category</label>
                <select
                  value={newSkill.category}
                  onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value as any })}
                  className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-white outline-none"
                >
                  <option value="languages">Languages</option>
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="databases">Databases</option>
                  <option value="devops">DevOps</option>
                  <option value="architecture">Architecture</option>
                </select>
              </div>

              <div>
                <label className="block text-silver-dark uppercase mb-1">Proficiency Level</label>
                <select
                  value={newSkill.level}
                  onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value as any })}
                  className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-white outline-none"
                >
                  <option value="Expert">Expert</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Proficient">Proficient</option>
                  <option value="Familiar">Familiar</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-hairline">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsSkillModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" className="bg-cyan-400 text-obsidian font-bold">
                  Add Skill
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title={`Remove ${deleteTarget?.type}?`}
        description={`Are you sure you want to delete '${deleteTarget?.name}'?`}
        confirmLabel="Remove"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
