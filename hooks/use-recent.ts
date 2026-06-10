"use client";
import { useCallback, useEffect, useState } from "react";
import type { RecentItem } from "@/types";

const KEY = "ptk_recent";

export function useRecent() {
  const [items, setItems] = useState<RecentItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  const add = useCallback((item: RecentItem) => {
    setItems((prev) => {
      const next = [item, ...prev].slice(0, 8);
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    try {
      localStorage.removeItem(KEY);
    } catch {}
    setItems([]);
  }, []);

  return { items, add, clear };
}
