import Link from "next/link";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <Link href="/" className={cn("group flex items-center gap-2.5", className)}>
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 shadow-glow transition-transform group-hover:scale-105">
        <FileText className="h-5 w-5 text-white" />
        <span className="absolute inset-0 rounded-xl bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
      </span>
      {!compact && (
        <span className="text-lg font-extrabold tracking-tight">
          PDF<span className="text-gradient">Toolkit</span>
        </span>
      )}
    </Link>
  );
}
