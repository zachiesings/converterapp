"use client";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

export function DownloadButton({
  url,
  name,
  label = "Download hasil",
  className,
}: {
  url: string;
  name: string;
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={url}
      download={name}
      className={cn(
        "inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 text-sm font-semibold text-white shadow-[0_0_30px_-8px_rgba(16,185,129,0.5)] transition-all hover:-translate-y-0.5",
        className
      )}
    >
      <Download className="h-4 w-4" /> {label}
    </a>
  );
}
