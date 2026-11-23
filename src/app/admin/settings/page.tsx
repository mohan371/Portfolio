"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/admin/ToastContext";
import { playTactileClick } from "@/lib/sound";
import { siteConfig } from "@/content/data/site-config";
import { saveSettingAction } from "@/app/admin/actions";
import {
  Settings,
  User,
  Share2,
  FileText,
  Briefcase,
  Globe,
  Save,
  CheckCircle2,
} from "lucide-react";

export default function AdminSettingsPage() {
  const { toast } = useToast();

  const [personalInfo, setPersonalInfo] = useState({
    name: siteConfig.name,
    role: siteConfig.role,
    title: siteConfig.title,
    bio: siteConfig.bio,
    city: siteConfig.location.city,
    country: siteConfig.location.country,
    coordinates: siteConfig.location.coordinates,
  });

  const [socials, setSocials] = useState({
    github: siteConfig.socials.github,
    linkedin: siteConfig.socials.linkedin,
    twitter: siteConfig.socials.twitter,
    email: siteConfig.socials.email,
  });

  const [resumeConfig, setResumeConfig] = useState({
    downloadUrl: siteConfig.resumeUrl,
    fileName: "Mohan_NV_Resume.pdf",
    version: "2026.11",
  });

  const [availability, setAvailability] = useState({
    openToWork: true,
    noticePeriod: "Immediate",
    preferredRoles: "Full-Stack Developer, Software Engineer, Backend Engineer",
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault();
    playTactileClick();
    setIsSaving(true);

    try {
      await saveSettingAction("personal_info", personalInfo, true);
      await saveSettingAction("social_links", socials, true);
      await saveSettingAction("resume_config", resumeConfig, true);
      await saveSettingAction("availability_status", availability, true);
      toast.success("Settings Saved", "Global settings updated in database.");
    } catch (err: any) {
      toast.error("Save Error", err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-hairline">
        <div>
          <span className="text-xs font-mono text-cyan-accent uppercase tracking-widest block mb-1">
            CMS // CONFIGURATION
          </span>
          <h1 className="font-display font-bold text-3xl text-white">
            Website &amp; Profile Settings
          </h1>
          <p className="text-xs text-silver-mid font-light mt-1">
            Configure global portfolio identity, social links, resume download URL, career availability, and SEO parameters.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={handleSaveAll}
          disabled={isSaving}
          className="gap-2 text-xs font-mono font-bold bg-cyan-400 text-obsidian hover:bg-cyan-300"
        >
          <Save className="w-4 h-4" />
          {isSaving ? "SAVING..." : "SAVE ALL SETTINGS"}
        </Button>
      </div>

      <form onSubmit={handleSaveAll} className="space-y-6">
        {/* Personal Details */}
        <Card hasDatumCorners className="p-6 bg-obsidian border-hairline">
          <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-cyan-accent" />
            Personal &amp; Brand Identity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
            <div>
              <label className="block text-silver-dark uppercase mb-1">Full Name</label>
              <input
                type="text"
                value={personalInfo.name}
                onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-silver-dark uppercase mb-1">Primary Role</label>
              <input
                type="text"
                value={personalInfo.role}
                onChange={(e) => setPersonalInfo({ ...personalInfo, role: e.target.value })}
                className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-silver-dark uppercase mb-1">Location City</label>
              <input
                type="text"
                value={personalInfo.city}
                onChange={(e) => setPersonalInfo({ ...personalInfo, city: e.target.value })}
                className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="mt-4 font-mono text-xs">
            <label className="block text-silver-dark uppercase mb-1">Editorial Biography</label>
            <textarea
              rows={3}
              value={personalInfo.bio}
              onChange={(e) => setPersonalInfo({ ...personalInfo, bio: e.target.value })}
              className="w-full bg-carbon border border-hairline rounded-xl p-3 text-white outline-none focus:border-cyan-500 leading-relaxed font-sans text-xs"
            />
          </div>
        </Card>

        {/* Social Links */}
        <Card hasDatumCorners className="p-6 bg-obsidian border-hairline">
          <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2">
            <Share2 className="w-4 h-4 text-violet-accent" />
            Social &amp; Communication Channels
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            <div>
              <label className="block text-silver-dark uppercase mb-1">GitHub Profile URL</label>
              <input
                type="url"
                value={socials.github}
                onChange={(e) => setSocials({ ...socials, github: e.target.value })}
                className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-silver-dark uppercase mb-1">LinkedIn Profile URL</label>
              <input
                type="url"
                value={socials.linkedin}
                onChange={(e) => setSocials({ ...socials, linkedin: e.target.value })}
                className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-silver-dark uppercase mb-1">Twitter / X URL</label>
              <input
                type="url"
                value={socials.twitter}
                onChange={(e) => setSocials({ ...socials, twitter: e.target.value })}
                className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-silver-dark uppercase mb-1">Primary Email</label>
              <input
                type="email"
                value={socials.email}
                onChange={(e) => setSocials({ ...socials, email: e.target.value })}
                className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </Card>

        {/* Resume & Availability */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card hasDatumCorners className="p-6 bg-obsidian border-hairline space-y-4 font-mono text-xs">
            <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-accent" />
              Resume Download Configuration
            </h3>

            <div>
              <label className="block text-silver-dark uppercase mb-1">Download URL Path</label>
              <input
                type="text"
                value={resumeConfig.downloadUrl}
                onChange={(e) => setResumeConfig({ ...resumeConfig, downloadUrl: e.target.value })}
                className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-silver-dark uppercase mb-1">File Name</label>
              <input
                type="text"
                value={resumeConfig.fileName}
                onChange={(e) => setResumeConfig({ ...resumeConfig, fileName: e.target.value })}
                className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500"
              />
            </div>
          </Card>

          <Card hasDatumCorners className="p-6 bg-obsidian border-hairline space-y-4 font-mono text-xs">
            <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-amber-accent" />
              Career Availability
            </h3>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={availability.openToWork}
                  onChange={(e) => setAvailability({ ...availability, openToWork: e.target.checked })}
                  className="accent-cyan-400"
                />
                <span className="text-white font-bold">Actively Open to Opportunities</span>
              </label>
            </div>

            <div>
              <label className="block text-silver-dark uppercase mb-1">Notice Period</label>
              <input
                type="text"
                value={availability.noticePeriod}
                onChange={(e) => setAvailability({ ...availability, noticePeriod: e.target.value })}
                className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-silver-dark uppercase mb-1">Target Roles</label>
              <input
                type="text"
                value={availability.preferredRoles}
                onChange={(e) => setAvailability({ ...availability, preferredRoles: e.target.value })}
                className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500"
              />
            </div>
          </Card>
        </div>
      </form>
    </div>
  );
}
