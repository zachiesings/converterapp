"use client";
import { Search } from "lucide-react";

export function SearchTools({
  value,
  onChange,
  placeholder = "Cari tools… (mis. word, kompres, gambar)",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-2xl glass pl-11 pr-4 text-sm outline-none transition placeholder:text-muted-foreground/70 focus:shadow-glow focus:ring-2 focus:ring-brand-400/40"
      />
    </div>
  );
}
