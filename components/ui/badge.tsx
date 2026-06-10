import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  gradient,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { gradient?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        gradient
          ? `text-white bg-gradient-to-r ${gradient}`
          : "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300",
        className
      )}
      {...props}
    />
  );
}
