import { Metadata } from "next";
import { getProjects, getAllCategories, getAllTechnologies } from "@/lib/data/projects";
import { SectionHeader } from "@/components/creative/SectionHeader";
import { ProjectCatalog } from "@/components/projects/ProjectCatalog";

export const metadata: Metadata = {
  title: "Projects Archive",
  description: "Browse Mohan N.V.'s software projects across Go, PostgreSQL, React, Next.js, WebSockets, and Flutter.",
};

export default async function ProjectsPage() {
  const [projects, categories, technologies] = await Promise.all([
    getProjects({ sortBy: "featured" }),
    getAllCategories(),
    getAllTechnologies(),
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <SectionHeader
        index="PROJECTS"
        tag="Engineering Showcase"
        title="Verified Systems &amp; Digital Products"
        description="Search, filter, and explore production-tested software systems spanning real-time geofencing, educational platforms, and multi-tenant SaaS applications."
      />

      <ProjectCatalog
        initialProjects={projects}
        categories={categories}
        technologies={technologies}
      />
    </div>
  );
}
