"use client";
import * as React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { SearchX } from "lucide-react";
import { TOOLS } from "@/lib/tools";
import { SearchTools } from "@/components/tools/search-tools";
import { CategoryTabs } from "@/components/tools/category-tabs";
import { ToolGrid } from "@/components/tools/tool-grid";
import { EmptyState } from "@/components/empty-state";

function Browser() {
  const params = useSearchParams();
  const [cat, setCat] = React.useState(params.get("cat") || "all");
  const [q, setQ] = React.useState("");

  React.useEffect(() => {
    setCat(params.get("cat") || "all");
  }, [params]);

  const filtered = TOOLS.filter(
    (t) =>
      (cat === "all" || t.category === cat) &&
      (q.trim() === "" || `${t.name} ${t.description}`.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div>
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-extrabold">
          All <span className="text-gradient">Tools</span>
        </motion.h1>
        <p className="mt-1 text-muted-foreground">{TOOLS.length} document tools — pick, upload, and process.</p>
      </div>

      <SearchTools value={q} onChange={setQ} />
      <CategoryTabs active={cat} onChange={setCat} />

      <div key={`${cat}-${q}`}>
        {filtered.length > 0 ? (
          <ToolGrid tools={filtered} />
        ) : (
          <EmptyState icon={SearchX} title="No matching tools" description="Try a different keyword or category." />
        )}
      </div>
    </div>
  );
}

export default function ToolsPage() {
  return (
    <Suspense fallback={<div className="h-40" />}>
      <Browser />
    </Suspense>
  );
}
