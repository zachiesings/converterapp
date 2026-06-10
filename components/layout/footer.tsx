import Link from "next/link";
import { Logo } from "./logo";
import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Konverter & alat dokumen all-in-one. Cepat, aman, dan mudah digunakan.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs font-medium text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-emerald-500" /> File diproses dengan aman
          </div>
        </div>
        {[
          { title: "Produk", links: ["Semua Tools", "Dashboard", "Harga", "Changelog"] },
          { title: "Perusahaan", links: ["Tentang", "Blog", "Karier", "Kontak"] },
          { title: "Legal", links: ["Privasi", "Ketentuan", "Keamanan", "Cookie"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-bold">{col.title}</h4>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l}>
                  <Link href="#" className="text-sm text-muted-foreground transition hover:text-foreground">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center text-xs text-muted-foreground sm:px-6 lg:px-8">
          © 2026 PDF Toolkit. Dibuat dengan ❤️ untuk produktivitas dokumen.
        </div>
      </div>
    </footer>
  );
}
