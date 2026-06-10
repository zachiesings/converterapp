import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, HelpCircle, ShieldCheck, Zap, Lock } from "lucide-react";
import { getTool, TOOLS, categoryLabel, toolsByCategory } from "@/lib/tools";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { ToolRunner } from "@/components/tools/tool-runner";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const tool = getTool(params.slug);
  return { title: tool ? `${tool.name} — PDF Toolkit` : "Tool — PDF Toolkit" };
}

const FAQ = [
  { q: "Are my files safe?", a: "Yes. Files are processed only as needed and are never stored permanently without your permission." },
  { q: "What is the maximum file size?", a: "It depends on the tool — the limit is shown in the upload area. Files that exceed the limit will be rejected." },
  { q: "Is it free?", a: "All the core tools are free to use right in your browser." },
];

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = getTool(params.slug);
  if (!tool) notFound();

  const Icon = tool.icon;
  const related = toolsByCategory(tool.category).filter((t) => t.slug !== tool.slug).slice(0, 3);

  return (
    <div className="space-y-8">
      <Breadcrumb
        items={[
          { label: "Tools", href: "/tools" },
          { label: categoryLabel(tool.category), href: `/tools?cat=${tool.category}` },
          { label: tool.name },
        ]}
      />

      {/* header */}
      <div className="relative overflow-hidden rounded-3xl glass p-6 sm:p-8 shadow-soft dark:shadow-soft-dark">
        <div className={cn("pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-gradient-to-br opacity-25 blur-3xl", tool.gradient)} />
        <Link href="/tools" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground transition hover:text-foreground">
          <ChevronLeft className="h-4 w-4" /> All tools
        </Link>
        <div className="flex items-start gap-4">
          <div className={cn("flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-glow", tool.gradient)}>
            <Icon className="h-7 w-7" />
          </div>
          <div>
            <h1 className="flex flex-wrap items-center gap-2 text-2xl font-extrabold sm:text-3xl">
              {tool.name}
              {tool.badge && <Badge gradient={tool.gradient}>{tool.badge}</Badge>}
            </h1>
            <p className="mt-1.5 max-w-2xl text-muted-foreground">{tool.description}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr,18rem]">
        {/* runner */}
        <div>
          <ToolRunner slug={tool.slug} />
        </div>

        {/* side info */}
        <aside className="space-y-4">
          <div className="rounded-2xl glass p-5">
            <p className="text-sm font-bold">Why this tool?</p>
            <ul className="mt-3 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2.5"><Zap className="h-4 w-4 text-amber-500" /> Fast processing</li>
              <li className="flex items-center gap-2.5"><ShieldCheck className="h-4 w-4 text-emerald-500" /> Secure files</li>
              <li className="flex items-center gap-2.5"><Lock className="h-4 w-4 text-brand-500" /> Private & not stored</li>
            </ul>
          </div>

          {related.length > 0 && (
            <div className="rounded-2xl glass p-5">
              <p className="text-sm font-bold">Related tools</p>
              <div className="mt-3 space-y-1.5">
                {related.map((r) => {
                  const RIcon = r.icon;
                  return (
                    <Link key={r.slug} href={`/tools/${r.slug}`} className="flex items-center gap-2.5 rounded-xl p-2 text-sm transition hover:bg-muted">
                      <span className={cn("flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br text-white", r.gradient)}>
                        <RIcon className="h-3.5 w-3.5" />
                      </span>
                      {r.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* FAQ */}
      <div className="rounded-3xl glass p-6 sm:p-8 shadow-soft dark:shadow-soft-dark">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <HelpCircle className="h-5 w-5 text-brand-500" /> Common questions
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {FAQ.map((f) => (
            <div key={f.q} className="rounded-2xl bg-muted/50 p-4">
              <p className="text-sm font-semibold">{f.q}</p>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
