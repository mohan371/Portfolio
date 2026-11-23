import { TextReveal } from "@/components/creative/TextReveal";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  index: string; // e.g. "01", "02"
  tag: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  index,
  tag,
  title,
  description,
  className,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col mb-12 sm:mb-16",
        align === "center" ? "items-center text-center max-w-3xl mx-auto" : "items-start",
        className
      )}
    >
      {/* Index & Tag Telemetry */}
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-xs text-silver-dark tracking-widest">
          [ {index} ]
        </span>
        <Badge variant="cyan" dot>
          {tag}
        </Badge>
      </div>

      {/* Oversized Editorial Title */}
      <TextReveal
        text={title}
        as="h2"
        className="type-display uppercase text-white font-bold tracking-tight"
      />

      {/* Descriptive Paragraph */}
      {description && (
        <p className="mt-4 text-sm sm:text-base text-silver-mid font-light leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
