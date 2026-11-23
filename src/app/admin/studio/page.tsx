"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/admin/ToastContext";
import { playTactileClick } from "@/lib/sound";
import {
  Building2,
  CheckCircle2,
  Plus,
  Trash2,
  Edit2,
  Layers,
  Sparkles,
} from "lucide-react";

export default function AdminStudioPage() {
  const { toast } = useToast();

  const [profile, setProfile] = useState({
    name: "Nexora Engineering Labs",
    tagline: "Turning Complex Engineering Ideas into Reliable Working Software.",
    mission: "To engineer high-performance, fault-tolerant digital products and distributed backend systems with mathematical precision and modern aesthetic craftsmanship.",
    description: "Nexora Engineering Labs is a specialized digital product and software engineering studio founded by Mohan N.V. We partner with technology startups, logistics operators, and enterprise institutions to architect scalable cloud microservices, real-time telemetry systems, and modern web applications.",
    location: "Hosur / Bangalore, India",
    contactEmail: "studio@mohannv.dev",
    status: "In Stealth / Formation",
  });

  const [services, setServices] = useState([
    {
      id: "srv-1",
      title: "Distributed Systems & Cloud Microservices",
      slug: "distributed-systems-architecture",
      description: "High-throughput backend services using Go, Node.js, and PostgreSQL focused on concurrency and low latency.",
      technologies: ["Go", "PostgreSQL", "Docker", "REST APIs"],
    },
    {
      id: "srv-2",
      title: "Real-Time Telemetry & Spatial Systems",
      slug: "real-time-telemetry-geofencing",
      description: "Specialized engineering of GPS streaming, spatial boundary detection (Jordan Curve PIP), and WebSocket distribution.",
      technologies: ["Go", "WebSockets", "Canvas 2D", "PostgreSQL"],
    },
  ]);

  const [newServiceTitle, setNewServiceTitle] = useState("");
  const [newServiceDesc, setNewServiceDesc] = useState("");
  const [newServiceTech, setNewServiceTech] = useState("");

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    playTactileClick();
    toast.success("Studio Profile Updated", "Company details saved to database.");
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceTitle) return;
    playTactileClick();

    const techArray = newServiceTech.split(",").map((t) => t.trim()).filter(Boolean);
    const newSrv = {
      id: `srv-${Date.now()}`,
      title: newServiceTitle,
      slug: newServiceTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      description: newServiceDesc || "High-performance software engineering service.",
      technologies: techArray.length > 0 ? techArray : ["TypeScript", "Next.js"],
    };

    setServices([...services, newSrv]);
    setNewServiceTitle("");
    setNewServiceDesc("");
    setNewServiceTech("");
    toast.success("Service Added", newServiceTitle);
  };

  const handleDeleteService = (id: string) => {
    playTactileClick();
    setServices(services.filter((s) => s.id !== id));
    toast.success("Service Removed", "Item deleted.");
  };

  return (
    <div className="space-y-8">
      <div className="pb-6 border-b border-hairline">
        <span className="text-xs font-mono text-cyan-accent uppercase tracking-widest block mb-1">
          CMS // FUTURE ENTERPRISE
        </span>
        <h1 className="font-display font-bold text-3xl text-white">
          Studio &amp; Company Platform
        </h1>
        <p className="text-xs text-silver-mid font-light mt-1">
          Manage future software development company identity, mission statement, engineering offerings, and enterprise client services.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Company Profile Form */}
        <div className="lg:col-span-7">
          <Card hasDatumCorners className="p-6 bg-obsidian border-hairline">
            <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-cyan-accent" />
              Company Profile
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-silver-dark uppercase mb-1">Studio / Company Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-silver-dark uppercase mb-1">Operational Status</label>
                  <input
                    type="text"
                    value={profile.status}
                    onChange={(e) => setProfile({ ...profile, status: e.target.value })}
                    className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-cyan-accent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-silver-dark uppercase mb-1">Tagline</label>
                <input
                  type="text"
                  value={profile.tagline}
                  onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                  className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-silver-dark uppercase mb-1">Mission Statement</label>
                <textarea
                  rows={2}
                  value={profile.mission}
                  onChange={(e) => setProfile({ ...profile, mission: e.target.value })}
                  className="w-full bg-carbon border border-hairline rounded-xl p-3 text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-silver-dark uppercase mb-1">Company Description</label>
                <textarea
                  rows={3}
                  value={profile.description}
                  onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                  className="w-full bg-carbon border border-hairline rounded-xl p-3 text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-silver-dark uppercase mb-1">Headquarters Location</label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-silver-dark uppercase mb-1">Inquiry Contact Email</label>
                  <input
                    type="email"
                    value={profile.contactEmail}
                    onChange={(e) => setProfile({ ...profile, contactEmail: e.target.value })}
                    className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-hairline flex justify-end">
                <Button type="submit" variant="primary" size="sm" className="bg-cyan-400 text-obsidian font-bold">
                  Save Company Profile
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Right: Company Services List & Add Service */}
        <div className="lg:col-span-5 space-y-6">
          <Card hasDatumCorners className="p-6 bg-obsidian border-hairline">
            <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-accent" />
              Active Offerings ({services.length})
            </h3>

            <div className="space-y-3">
              {services.map((srv) => (
                <div key={srv.id} className="p-3.5 rounded-xl bg-carbon border border-hairline space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-display font-bold text-sm text-white">{srv.title}</h4>
                    <button
                      onClick={() => handleDeleteService(srv.id)}
                      className="text-silver-dark hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-silver-mid font-light leading-relaxed">{srv.description}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {srv.technologies.map((t) => (
                      <span key={t} className="text-[9px] font-mono px-2 py-0.5 rounded bg-surface-1 text-cyan-accent">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Add Service Form */}
          <Card hasDatumCorners className="p-6 bg-obsidian border-hairline">
            <h4 className="font-mono text-xs font-bold text-white uppercase mb-3 flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-cyan-accent" /> Add New Service Offering
            </h4>

            <form onSubmit={handleAddService} className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-silver-dark uppercase mb-1">Service Title</label>
                <input
                  type="text"
                  required
                  value={newServiceTitle}
                  onChange={(e) => setNewServiceTitle(e.target.value)}
                  placeholder="e.g. Cloud Security & Zero-Trust Architecture"
                  className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-silver-dark uppercase mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newServiceDesc}
                  onChange={(e) => setNewServiceDesc(e.target.value)}
                  placeholder="Summary of deliverables..."
                  className="w-full bg-carbon border border-hairline rounded-xl p-2.5 text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-silver-dark uppercase mb-1">Technologies (Comma Separated)</label>
                <input
                  type="text"
                  value={newServiceTech}
                  onChange={(e) => setNewServiceTech(e.target.value)}
                  placeholder="Docker, Kubernetes, Go"
                  className="w-full bg-carbon border border-hairline rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500"
                />
              </div>

              <Button type="submit" variant="primary" size="sm" className="w-full bg-cyan-400 text-obsidian font-bold">
                Add Offering
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
