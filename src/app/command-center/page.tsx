import { Metadata } from "next";
import { SectionHeader } from "@/components/creative/SectionHeader";
import { CommandCenterView } from "@/components/command-center/CommandCenterView";
import { getLiveCommandCenterData } from "@/content/data/command-center";

export const metadata: Metadata = {
  title: "ENGINEERING COMMAND CENTER // Mohan N.V.",
  description:
    "Live activity dashboard of Mohan N.V.: active software engineering pipelines, systems R&D, verified open-source commits, and production telemetry dispatches.",
};

export default async function CommandCenterPage() {
  const initialData = await getLiveCommandCenterData();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <SectionHeader
        index="ACTIVITY"
        tag="Engineering Hub"
        title="Engineering Command Center"
        description="A transparent, real-time window into my active engineering workload, production pipelines at Veda Scholars, systems R&amp;D, and open-source contributions."
      />

      <CommandCenterView initialData={initialData} />
    </div>
  );
}
