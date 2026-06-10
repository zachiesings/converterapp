"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles, ArrowRight, Upload, MousePointerClick, Download, Zap, ShieldCheck,
  Layers, Wand2, ChevronDown,
} from "lucide-react";
import type { Tool } from "@/types";
import { TOOLS, POPULAR_SLUGS, getTool, CATEGORIES } from "@/lib/tools";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ToolCard } from "@/components/tools/tool-card";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const STEPS = [
  { icon: Upload, title: "Upload file", desc: "Tarik & letakkan atau pilih file dari perangkat Anda." },
  { icon: MousePointerClick, title: "Pilih tool", desc: "Tentukan konversi atau alat dokumen yang diinginkan." },
  { icon: Download, title: "Download hasil", desc: "Proses berjalan cepat, lalu unduh hasilnya." },
];

const REASONS = [
  { icon: Zap, title: "Proses cepat", desc: "Optimasi performa untuk konversi yang gesit.", gradient: "from-amber-500 to-orange-500" },
  { icon: ShieldCheck, title: "File aman", desc: "Diproses sesuai kebutuhan, tidak disimpan permanen.", gradient: "from-emerald-500 to-teal-500" },
  { icon: Wand2, title: "Mudah dipakai", desc: "Antarmuka bersih, tanpa langkah berbelit.", gradient: "from-violet-500 to-purple-600" },
  { icon: Layers, title: "20+ alat dokumen", desc: "Semua kebutuhan PDF & Office dalam satu tempat.", gradient: "from-indigo-500 to-blue-600" },
];

const FAQ = [
  { q: "Apakah aplikasi ini gratis?", a: "Ya, semua tool dasar dapat digunakan gratis langsung di browser tanpa instalasi." },
  { q: "Apakah file saya aman?", a: "File diproses sesuai kebutuhan dan dapat dihapus otomatis. Kami tidak menyimpan file permanen tanpa izin Anda." },
  { q: "Format apa saja yang didukung?", a: "PDF, Word, Excel, PowerPoint, serta gambar (PNG/JPG) untuk berbagai konversi." },
  { q: "Apakah perlu membuat akun?", a: "Tidak. Anda bisa langsung mengunggah dan mengonversi file tanpa mendaftar." },
];

export default function Landing() {
  const popular = POPULAR_SLUGS.map(getTool).filter((t): t is Tool => Boolean(t));

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.6 }} className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm font-medium text-muted-foreground">
            <Sparkles className="h-4 w-4 text-brand-500" /> SaaS dokumen modern · 2026
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl">
            All-in-one PDF &amp; <br className="hidden sm:block" />
            <span className="text-gradient">Document Converter</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Konversi PDF ke Word, Word ke PDF, dan 20+ alat dokumen lainnya. Cepat, aman, dan benar-benar mudah digunakan.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/tools">
              <Button size="lg">
                <Sparkles className="h-5 w-5" /> Start Converting
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="secondary">
                Lihat Dashboard <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* floating tool chips */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
        >
          {TOOLS.slice(0, 6).map((t, i) => {
            const Icon = t.icon;
            return (
              <motion.div
                key={t.slug}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                className="flex flex-col items-center gap-2 rounded-2xl glass p-4 shadow-soft dark:shadow-soft-dark"
              >
                <span className={cn("flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg", t.gradient)}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-center text-xs font-medium text-muted-foreground">{t.name}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* POPULAR TOOLS */}
      <Section title="Tools Paling Populer" subtitle="Mulai dari yang paling sering dibutuhkan.">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((t, i) => (
            <ToolCard key={t.slug} tool={t} index={i} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/tools">
            <Button variant="outline" size="lg">
              Lihat {TOOLS.length} tools <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section title="3 Langkah Mudah" subtitle="Dari file ke hasil hanya dalam hitungan detik.">
        <div className="grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative rounded-3xl glass p-6 text-center shadow-soft dark:shadow-soft-dark"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 text-white shadow-glow">
                  <Icon className="h-7 w-7" />
                </div>
                <span className="mt-4 block text-xs font-bold uppercase tracking-wider text-brand-500">Langkah {i + 1}</span>
                <h3 className="mt-1 text-lg font-bold">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* WHY CHOOSE */}
      <Section title="Kenapa PDF Toolkit?" subtitle="Dirancang untuk kecepatan, keamanan, dan kemudahan.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-3xl glass p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-glow dark:shadow-soft-dark"
              >
                <div className={cn("absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br opacity-20 blur-2xl transition group-hover:opacity-40", r.gradient)} />
                <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg", r.gradient)}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-bold">{r.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{r.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* CATEGORIES */}
      <Section title="Jelajahi per Kategori" subtitle="Temukan tool sesuai kebutuhan dokumen Anda.">
        <div className="flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.id}
                href={`/tools?cat=${c.id}`}
                className="group inline-flex items-center gap-2.5 rounded-full glass px-4 py-2.5 text-sm font-medium transition hover:-translate-y-0.5 hover:shadow-glow"
              >
                <span className={cn("flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br text-white", c.gradient)}>
                  <Icon className="h-4 w-4" />
                </span>
                {c.label}
              </Link>
            );
          })}
        </div>
      </Section>

      {/* FAQ */}
      <Section title="Pertanyaan yang Sering Diajukan" subtitle="Hal-hal yang mungkin ingin Anda ketahui.">
        <div className="mx-auto max-w-2xl space-y-3">
          {FAQ.map((f) => (
            <details key={f.q} className="group rounded-2xl glass p-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold">
                {f.q}
                <ChevronDown className="h-4 w-4 text-muted-foreground transition group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-700 p-10 text-center text-white shadow-glow-lg sm:p-16"
        >
          <div className="absolute -left-10 -top-10 h-52 w-52 rounded-full bg-cyan-400/30 blur-3xl" />
          <div className="absolute -bottom-12 right-1/4 h-52 w-52 rounded-full bg-pink-400/30 blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Siap mengubah dokumen Anda?</h2>
            <p className="mx-auto mt-3 max-w-lg text-white/80">
              Tanpa instalasi, tanpa ribet. Mulai konversi pertama Anda sekarang juga.
            </p>
            <Link href="/tools" className="mt-7 inline-block">
              <Button size="lg" variant="secondary" className="bg-white text-indigo-700 hover:bg-white">
                <Sparkles className="h-5 w-5" /> Start Converting
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mx-auto mb-10 max-w-2xl text-center"
      >
        <h2 className="text-3xl font-extrabold tracking-tight">{title}</h2>
        {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
      </motion.div>
      {children}
    </section>
  );
}
