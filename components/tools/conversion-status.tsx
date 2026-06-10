"use client";
import { Clock, Loader2, CheckCircle2, XCircle } from "lucide-react";
import type { FileStatus } from "@/types";
import { cn } from "@/lib/utils";

const MAP = {
  waiting: { label: "Waiting", icon: Clock, cls: "text-muted-foreground bg-muted" },
  processing: { label: "Processing", icon: Loader2, cls: "text-brand-500 bg-brand-500/10" },
  success: { label: "Done", icon: CheckCircle2, cls: "text-emerald-500 bg-emerald-500/10" },
  failed: { label: "Failed", icon: XCircle, cls: "text-rose-500 bg-rose-500/10" },
} as const;

export function ConversionStatus({ status }: { status: FileStatus }) {
  const m = MAP[status];
  const Icon = m.icon;
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold", m.cls)}>
      <Icon className={cn("h-3.5 w-3.5", status === "processing" && "animate-spin")} />
      {m.label}
    </span>
  );
}
