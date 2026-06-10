"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileCheck2, Layers, Sparkles, Clock, ArrowRight, Star } from "lucide-react";
import type { Tool } from "@/types";
import { TOOLS, POPULAR_SLUGS, getTool } from "@/lib/tools";
import { DashboardStats } from "@/components/dashboard-stats";
import { RecentFiles } from "@/components/recent-files";
import { ToolCard } from "@/components/tools/tool-card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/empty-state";
import { useRecent } from "@/hooks/use-recent";
import { useFavorites } from "@/hooks/use-favorites";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const { items, clear } = useRecent();
  const { favs } = useFavorites();

  const popular = POPULAR_SLUGS.map(getTool).filter((t): t is Tool => Boolean(t));
  const favTools = favs.map(getTool).filter((t): t is Tool => Boolean(t));

  const stats = [
    { label: "Files processed", value: items.length, icon: FileCheck2, gradient: "from-emerald-500 to-teal-500" },
    { label: "Tools available", value: TOOLS.length, icon: Layers, gradient: "from-indigo-500 to-violet-500" },
    { label: "Favorite tools", value: favs.length, icon: Star, gradient: "from-amber-500 to-orange-500" },
    { label: "Last used", value: items[0]?.tool ?? "—", icon: Clock, gradient: "from-fuchsia-500 to-pink-500" },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-700 p-7 text-white shadow-glow-lg sm:p-9"
      >
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/15 blur-3xl" />
        <div className="absolute -bottom-12 left-1/3 h-44 w-44 rounded-full bg-cyan-400/30 blur-3xl" />
        <div className="relative">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" /> Dashboard
          </p>
          <h1 className="mt-3 text-2xl font-extrabold sm:text-3xl">Welcome back 👋</h1>
          <p className="mt-1.5 max-w-lg text-white/80">
            Pick a tool, upload your file, and let us do the work. Fast, secure, and tidy.
          </p>
          <Link href="/tools" className="mt-5 inline-block">
            <Button variant="secondary" className="bg-white text-indigo-700 hover:bg-white">
              Start Converting <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </motion.div>

      <DashboardStats stats={stats} />

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">Quick Actions</h2>
          <Link href="/tools" className="text-sm text-brand-500 hover:underline">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((t, i) => (
            <ToolCard key={t.slug} tool={t} index={i} />
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentFiles items={items} onClear={clear} />

        <div className="rounded-3xl glass p-5 shadow-soft dark:shadow-soft-dark">
          <h3 className="mb-4 flex items-center gap-2 text-base font-bold">
            <Star className="h-4 w-4 text-amber-400" /> Favorite Tools
          </h3>
          {favTools.length === 0 ? (
            <EmptyState icon={Star} title="No favorites yet" description="Star a tool with the star icon for quick access." />
          ) : (
            <div className="space-y-1.5">
              {favTools.map((t) => {
                const Icon = t.icon;
                return (
                  <Link key={t.slug} href={`/tools/${t.slug}`} className="flex items-center gap-3 rounded-2xl p-3 transition hover:bg-muted">
                    <span className={cn("flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br text-white", t.gradient)}>
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-semibold">{t.name}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
