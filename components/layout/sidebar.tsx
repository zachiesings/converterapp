"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Grid3x3, ShieldCheck } from "lucide-react";
import { CATEGORIES } from "@/lib/tools";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

const MAIN = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/tools", label: "Semua Tools", icon: Grid3x3 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border/60 p-4 lg:flex">
      <div className="px-2 py-3">
        <Logo />
      </div>

      <nav className="mt-4 space-y-1">
        {MAIN.map((m) => {
          const active = pathname === m.href;
          const Icon = m.icon;
          return (
            <Link
              key={m.href}
              href={m.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                active ? "glass text-foreground shadow-soft" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" /> {m.label}
            </Link>
          );
        })}
      </nav>

      <p className="mt-6 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Kategori</p>
      <nav className="mt-2 space-y-0.5 overflow-y-auto">
        {CATEGORIES.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.id}
              href={`/tools?cat=${c.id}`}
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              <span className={cn("flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br text-white", c.gradient)}>
                <Icon className="h-3.5 w-3.5" />
              </span>
              {c.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl glass p-4">
        <div className="flex items-center gap-2 text-emerald-500">
          <ShieldCheck className="h-4 w-4" />
          <span className="text-xs font-bold">Aman & Privat</span>
        </div>
        <p className="mt-1.5 text-xs text-muted-foreground">
          File diproses sesuai kebutuhan dan tidak disimpan permanen tanpa izin.
        </p>
      </div>
    </aside>
  );
}
