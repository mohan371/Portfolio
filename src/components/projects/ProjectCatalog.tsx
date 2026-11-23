"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Project } from "@/types";
import { InteractiveTiltCard } from "@/components/creative/InteractiveTiltCard";
import { CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, X, SlidersHorizontal, ArrowUpRight, ArrowUpDown } from "lucide-react";

interface ProjectCatalogProps {
  initialProjects: Project[];
  categories: string[];
  technologies: string[];
}

export function ProjectCatalog({
  initialProjects,
  categories,
  technologies,
}: ProjectCatalogProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTech, setSelectedTech] = useState("All");
  const [sortBy, setSortBy] = useState<"featured" | "newest" | "oldest" | "title">("featured");

  const filteredProjects = useMemo(() => {
    let list = [...initialProjects];

    // Search query
    if (search.trim() !== "") {
      const q = search.toLowerCase().trim();
      list = list.filter((p) => {
        return (
          p.title.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.detailedDescription.toLowerCase().includes(q) ||
          p.technologies.some((t) => t.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q)
        );
      });
    }

    // Category
    if (selectedCategory !== "All") {
      list = list.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Technology
    if (selectedTech !== "All") {
      list = list.filter((p) =>
        p.technologies.some((t) => t.toLowerCase() === selectedTech.toLowerCase())
      );
    }

    // Sort
    list.sort((a, b) => {
      if (sortBy === "featured") {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
      }
      if (sortBy === "newest") {
        return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
      }
      if (sortBy === "oldest") {
        return new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime();
      }
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return list;
  }, [initialProjects, search, selectedCategory, selectedTech, sortBy]);

  const hasActiveFilters = search !== "" || selectedCategory !== "All" || selectedTech !== "All";

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setSelectedTech("All");
    setSortBy("featured");
  };

  return (
    <div className="w-full space-y-8">
      {/* Search & Filter Toolbar */}
      <div className="p-4 sm:p-6 rounded-2xl bg-obsidian border border-hairline space-y-4">
        {/* Row 1: Search Bar + Sort Dropdown */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-silver-dark absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by project name, technology (e.g. Go, React, PostgreSQL)..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-carbon border border-hairline text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-accent transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-silver-dark hover:text-white"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-carbon border border-hairline text-xs font-mono text-silver-mid">
              <ArrowUpDown className="w-3.5 h-3.5 text-cyan-accent" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "featured" | "newest" | "oldest" | "title")}
                className="bg-transparent text-xs font-mono text-white focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Alphabetical (A-Z)</option>
              </select>
            </div>

            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs">
                Reset
              </Button>
            )}
          </div>
        </div>

        {/* Row 2: Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-hairline">
          <span className="text-[10px] font-mono text-silver-dark uppercase mr-1">Category:</span>
          {categories.map((cat) => {
            const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                  isSelected
                    ? "bg-cyan-950/60 border border-cyan-500/50 text-cyan-accent"
                    : "bg-carbon border border-hairline text-silver-dark hover:text-white"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Row 3: Technology Filter Dropdown & Telemetry */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-silver-dark pt-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase">Filter by Tech:</span>
            <select
              value={selectedTech}
              onChange={(e) => setSelectedTech(e.target.value)}
              className="px-2.5 py-1 rounded-lg bg-carbon border border-hairline text-xs font-mono text-white focus:outline-none focus:border-cyan-accent cursor-pointer"
            >
              {technologies.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="text-[11px] text-silver-mid">
            SHOWING <strong className="text-white">{filteredProjects.length}</strong> OF{" "}
            {initialProjects.length} PROJECTS
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 rounded-2xl bg-obsidian border border-hairline text-center flex flex-col items-center">
          <SlidersHorizontal className="w-8 h-8 text-silver-dark mb-3" />
          <h3 className="font-display font-bold text-lg text-white uppercase">No Projects Found</h3>
          <p className="text-xs text-silver-mid mt-1 max-w-sm font-light">
            No projects matched your criteria. Try adjusting your search query or resetting active filters.
          </p>
          <Button variant="outline" size="sm" onClick={clearFilters} className="mt-4">
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Link key={project.id} href={`/projects/${project.slug}`} className="block h-full group">
              <InteractiveTiltCard hasDatumCorners className="h-full flex flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant={project.featured ? "cyan" : "outline"} dot={project.featured}>
                      {project.category}
                    </Badge>
                    <span className="text-xs font-mono text-silver-dark">
                      {project.completionDate.split("-")[0]}
                    </span>
                  </div>

                  <CardTitle className="group-hover:text-cyan-accent transition-colors flex items-center justify-between text-xl leading-snug">
                    {project.title}
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-cyan-accent shrink-0 ml-2" />
                  </CardTitle>

                  <p className="mt-2 text-xs font-mono text-silver-mid line-clamp-2">
                    {project.shortDescription}
                  </p>

                  <p className="mt-4 text-xs text-silver-mid leading-relaxed line-clamp-3 font-light">
                    {project.problemStatement}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-hairline">
                  <div className="flex items-center justify-between text-[11px] font-mono text-silver-dark mb-3">
                    <span>Status:</span>
                    <span className="text-emerald-accent font-semibold">{project.status}</span>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] text-silver-mid border border-hairline"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 text-silver-dark">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </InteractiveTiltCard>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
