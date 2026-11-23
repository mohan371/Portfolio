import { Metadata } from "next";
import { siteConfig } from "@/content/data/site-config";
import { ResumeView } from "@/components/resume/ResumeView";

export const metadata: Metadata = {
  title: "Resume // Curriculum Vitae",
  description: `Official Curriculum Vitae and verified Resume PDF of ${siteConfig.name} — ${siteConfig.role}. Download PDF or preview embedded document online.`,
  openGraph: {
    title: `Resume — ${siteConfig.name}`,
    description: `Official Curriculum Vitae and verified Resume PDF of ${siteConfig.name} — ${siteConfig.role}.`,
    url: "https://mohannv.dev/resume",
    type: "profile",
  },
};

export default function ResumePage() {
  return <ResumeView />;
}
