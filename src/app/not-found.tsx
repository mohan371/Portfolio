import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="p-3 rounded-full bg-carbon border border-hairline mb-4 text-cyan-accent">
        <Terminal className="w-6 h-6" />
      </div>

      <span className="text-xs font-mono text-cyan-accent uppercase tracking-widest mb-2">
        ERROR_CODE // 404_PAGE_NOT_FOUND
      </span>

      <h1 className="font-display text-4xl sm:text-6xl font-bold uppercase text-white tracking-tight">
        Null Coordinate
      </h1>

      <p className="mt-4 text-sm sm:text-base text-silver-mid font-light max-w-md leading-relaxed">
        The requested system route does not exist or has been relocated to another memory address.
      </p>

      <div className="mt-8">
        <Link href="/">
          <Button variant="primary" size="md">
            <ArrowLeft className="w-3.5 h-3.5 mr-1 text-black" />
            Return to Headquarters
          </Button>
        </Link>
      </div>
    </div>
  );
}
