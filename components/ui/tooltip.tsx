import * as React from "react";
import { cn } from "@/lib/utils";

export function Tooltip({
  label,
  children,
  side = "top",
  className,
}: {
  label: string;
  children: React.ReactNode;
  side?: "top" | "bottom";
  className?: string;
}) {
  return (
    <span className="group/tt relative inline-flex">
      {children}
      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-medium",
          "bg-slate-900 text-white shadow-lg opacity-0 scale-95 transition-all duration-150",
          "group-hover/tt:opacity-100 group-hover/tt:scale-100",
          side === "top" ? "bottom-full mb-2" : "top-full mt-2",
          className
        )}
      >
        {label}
      </span>
    </span>
  );
}
