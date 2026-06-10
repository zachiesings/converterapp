import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5">
            {it.href && !last ? (
              <Link href={it.href} className="transition hover:text-foreground">
                {it.label}
              </Link>
            ) : (
              <span className={last ? "font-medium text-foreground" : ""}>{it.label}</span>
            )}
            {!last && <ChevronRight className="h-4 w-4 opacity-50" />}
          </span>
        );
      })}
    </nav>
  );
}
