"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileClock, Trash2 } from "lucide-react";
import type { RecentItem } from "@/types";
import { ConversionStatus } from "@/components/tools/conversion-status";
import { EmptyState } from "@/components/empty-state";

function timeAgo(ts: number): string {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)} min ago`;
  if (s < 86400) return `${Math.floor(s / 3600)} hours ago`;
  return `${Math.floor(s / 86400)} days ago`;
}

export function RecentFiles({ items, onClear }: { items: RecentItem[]; onClear: () => void }) {
  return (
    <div className="rounded-3xl glass p-5 shadow-soft dark:shadow-soft-dark">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-base font-bold">
          <FileClock className="h-4 w-4 text-brand-500" /> Recent Conversions
        </h3>
        {items.length > 0 && (
          <button onClick={onClear} className="inline-flex items-center gap-1 text-xs text-muted-foreground transition hover:text-rose-500">
            <Trash2 className="h-3.5 w-3.5" /> Clear
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <EmptyState icon={FileClock} title="No activity yet" description="Your first conversion will show up here." />
      ) : (
        <div className="space-y-2">
          {items.map((it, i) => (
            <motion.div
              key={it.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                href={`/tools/${it.toolSlug}`}
                className="flex items-center gap-3 rounded-2xl p-3 transition hover:bg-muted"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/15 to-violet-500/10 text-xs font-bold text-brand-500">
                  {it.tool.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{it.fileName}</p>
                  <p className="text-xs text-muted-foreground">
                    {it.tool} · {timeAgo(it.at)}
                  </p>
                </div>
                <ConversionStatus status={it.status} />
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
