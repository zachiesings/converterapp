"use client";
import { motion } from "framer-motion";
import { AlertOctagon, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ErrorState({
  title = "Something went wrong",
  description = "Try again or use a different file.",
  onRetry,
  className,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex flex-col items-center justify-center px-6 py-12 text-center", className)}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/15 text-rose-500">
        <AlertOctagon className="h-6 w-6" />
      </div>
      <h3 className="text-base font-bold">{title}</h3>
      <p className="mt-1.5 max-w-xs text-sm text-muted-foreground">{description}</p>
      {onRetry && (
        <Button variant="outline" size="sm" className="mt-5" onClick={onRetry}>
          <RotateCcw className="h-4 w-4" /> Try again
        </Button>
      )}
    </motion.div>
  );
}
