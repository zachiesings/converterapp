"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { Tool } from "@/types";
import { Badge } from "@/components/ui/badge";
import { useFavorites } from "@/hooks/use-favorites";
import { cn } from "@/lib/utils";

export function ToolCard({ tool, index = 0 }: { tool: Tool; index?: number }) {
  const { isFav, toggle } = useFavorites();
  const Icon = tool.icon;
  const fav = isFav(tool.slug);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3) }}
      className="h-full"
    >
      <Link href={`/tools/${tool.slug}`} className="group relative block h-full">
        <div className="relative h-full overflow-hidden rounded-3xl glass p-5 shadow-soft transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-glow dark:shadow-soft-dark">
          <div
            className={cn(
              "pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-40",
              tool.gradient
            )}
          />
          <div className="flex items-start justify-between">
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition-transform duration-300 group-hover:scale-110",
                tool.gradient
              )}
            >
              <Icon className="h-6 w-6" />
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                toggle(tool.slug);
              }}
              className="rounded-lg p-1.5 text-muted-foreground transition hover:text-amber-400"
              aria-label="Mark as favorite"
            >
              <Star className={cn("h-4 w-4", fav && "fill-amber-400 text-amber-400")} />
            </button>
          </div>
          <h3 className="mt-4 flex flex-wrap items-center gap-2 text-base font-bold">
            {tool.name}
            {tool.badge && <Badge gradient={tool.gradient}>{tool.badge}</Badge>}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{tool.description}</p>
        </div>
      </Link>
    </motion.div>
  );
}
