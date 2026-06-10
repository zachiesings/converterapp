"use client";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/lib/tools";
import { cn } from "@/lib/utils";

export function CategoryTabs({
  active,
  onChange,
}: {
  active: string;
  onChange: (id: string) => void;
}) {
  const tabs = [{ id: "all", label: "Semua" }, ...CATEGORIES.map((c) => ({ id: c.id, label: c.label }))];

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {tabs.map((t) => {
        const on = active === t.id;
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={cn(
              "relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition",
              on ? "text-white" : "glass text-muted-foreground hover:text-foreground"
            )}
          >
            {on && (
              <motion.span
                layoutId="cat-active"
                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 shadow-glow"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
