"use client";
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { RotateCcw, Play, Download, Loader2, CheckCircle2 } from "lucide-react";
import type { ToolSetting, UploadFile } from "@/types";
import { UploadBox } from "./upload-box";
import { FilePreviewCard } from "./file-preview-card";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/confirm-modal";
import { dummyConvert } from "@/lib/dummy-convert";
import { getRealAggregate } from "@/lib/real-convert";
import { DownloadButton } from "./download-button";
import { getTool } from "@/lib/tools";
import { uid, fileExt, cn } from "@/lib/utils";
import { useRecent } from "@/hooks/use-recent";

function matchesAccept(file: File, accept: string) {
  if (accept.includes("image/*")) return file.type.startsWith("image/");
  const exts = accept.split(",").map((s) => s.trim().replace(".", "").toLowerCase());
  return exts.includes(fileExt(file.name));
}

export function ToolRunner({ slug }: { slug: string }) {
  const tool = getTool(slug)!;
  const [files, setFiles] = React.useState<UploadFile[]>([]);
  const [running, setRunning] = React.useState(false);
  const [confirmId, setConfirmId] = React.useState<string | null>(null);
  const [agg, setAgg] = React.useState<{ url: string; name: string } | null>(null);
  const { add: addRecent } = useRecent();

  const [settings, setSettings] = React.useState<Record<string, string | number | boolean>>(() => {
    const init: Record<string, string | number | boolean> = {};
    tool.settings?.forEach((s) => {
      init[s.key] = s.default ?? (s.type === "toggle" ? false : "");
    });
    return init;
  });

  const update = (id: string, patch: Partial<UploadFile>) =>
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f)));

  const addFiles = (incoming: File[]) => {
    const valid: UploadFile[] = [];
    for (const file of incoming) {
      if (!matchesAccept(file, tool.accept)) {
        toast.error(`Unsupported format: ${file.name}`);
        continue;
      }
      if (tool.maxSizeMB && file.size > tool.maxSizeMB * 1024 * 1024) {
        toast.error(`File too large (max ${tool.maxSizeMB} MB): ${file.name}`);
        continue;
      }
      valid.push({
        id: uid(),
        file,
        name: file.name,
        size: file.size,
        status: "waiting",
        progress: 0,
        pages: fileExt(file.name) === "pdf" ? Math.floor(Math.random() * 20) + 1 : undefined,
      });
    }
    if (!valid.length) return;
    setFiles((prev) => (tool.multiple ? [...prev, ...valid] : valid.slice(-1)));
    toast.success(`${valid.length} file(s) added`);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const f = prev.find((x) => x.id === id);
      if (f?.resultUrl) URL.revokeObjectURL(f.resultUrl);
      return prev.filter((x) => x.id !== id);
    });
  };

  const runOne = async (uf: UploadFile) => {
    update(uf.id, { status: "processing", progress: 0 });
    try {
      const res = await dummyConvert(uf.file, tool, (p) => update(uf.id, { progress: p }));
      update(uf.id, { status: "success", progress: 100, resultUrl: res.url, resultName: res.name });
      addRecent({ id: uid(), tool: tool.name, toolSlug: tool.slug, fileName: uf.name, at: Date.now(), status: "success" });
    } catch (e) {
      update(uf.id, { status: "failed", error: e instanceof Error ? e.message : "Failed" });
    }
  };

  const aggregateRun = async () => {
    const real = getRealAggregate(tool.slug);
    if (!real) return;
    setRunning(true);
    setAgg(null);
    setFiles((prev) => prev.map((f) => ({ ...f, status: "processing", progress: 5 })));
    try {
      const res = await real(
        files.map((f) => f.file),
        (p) => setFiles((prev) => prev.map((f) => ({ ...f, progress: p })))
      );
      setFiles((prev) => prev.map((f) => ({ ...f, status: "success", progress: 100 })));
      setAgg(res);
      addRecent({ id: uid(), tool: tool.name, toolSlug: tool.slug, fileName: `${files.length} files`, at: Date.now(), status: "success" });
      toast.success("Successfully processed! 🎉");
    } catch (e) {
      setFiles((prev) => prev.map((f) => ({ ...f, status: "failed", error: e instanceof Error ? e.message : "Failed" })));
      toast.error("Failed to process file");
    }
    setRunning(false);
  };

  const convertAll = async () => {
    const waiting = files.filter((f) => f.status === "waiting");
    if (!waiting.length) {
      toast.error("Please add a file first");
      return;
    }
    if (tool.aggregate) {
      if (tool.slug === "merge-pdf" && files.length < 2) {
        toast.error("Add at least 2 PDFs to merge");
        return;
      }
      await aggregateRun();
      return;
    }
    setRunning(true);
    for (const uf of waiting) await runOne(uf);
    setRunning(false);
    toast.success("Processing complete! 🎉");
  };

  const reset = () => {
    files.forEach((f) => f.resultUrl && URL.revokeObjectURL(f.resultUrl));
    if (agg) URL.revokeObjectURL(agg.url);
    setAgg(null);
    setFiles([]);
  };

  const downloadAll = () => {
    files
      .filter((f) => f.status === "success" && f.resultUrl)
      .forEach((f, i) =>
        setTimeout(() => {
          const a = document.createElement("a");
          a.href = f.resultUrl!;
          a.download = f.resultName!;
          a.click();
        }, i * 250)
      );
  };

  const successCount = files.filter((f) => f.status === "success").length;
  const canAddMore = tool.multiple || files.length === 0;
  const allDone = files.length > 0 && successCount === files.length && !running;

  return (
    <div className="space-y-5">
      {canAddMore && (
        <UploadBox
          accept={tool.accept}
          multiple={tool.multiple}
          maxSizeMB={tool.maxSizeMB}
          label={`${tool.acceptLabel} format`}
          onFiles={addFiles}
        />
      )}

      {tool.settings && files.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl glass p-5">
          <p className="mb-4 text-sm font-bold">Settings</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {tool.settings.map((s) => (
              <SettingField
                key={s.key}
                setting={s}
                value={settings[s.key]}
                onChange={(v) => setSettings((p) => ({ ...p, [s.key]: v }))}
              />
            ))}
          </div>
        </motion.div>
      )}

      <AnimatePresence initial={false}>
        {files.length > 0 && (
          <motion.div layout className="space-y-3">
            {files.map((f) => (
              <FilePreviewCard key={f.id} uf={f} onRemove={(id) => setConfirmId(id)} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {agg && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl glass p-4"
          >
            <div className="mb-3 flex items-center gap-2 text-sm font-bold">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Result ready to download
            </div>
            <DownloadButton url={agg.url} name={agg.name} label={`Download ${agg.name}`} />
          </motion.div>
        )}
      </AnimatePresence>

      {files.length > 0 && (
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={convertAll}
            disabled={running || files.every((f) => f.status !== "waiting")}
            className="min-w-[10rem]"
          >
            {running ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Processing…
              </>
            ) : (
              <>
                <Play className="h-4 w-4" /> Convert{tool.multiple ? " All" : ""}
              </>
            )}
          </Button>
          {successCount > 0 && !tool.aggregate && (
            <Button variant="secondary" onClick={downloadAll}>
              <Download className="h-4 w-4" /> Download all ({successCount})
            </Button>
          )}
          <Button variant="outline" onClick={reset}>
            <RotateCcw className="h-4 w-4" /> Reset
          </Button>
        </div>
      )}

      <AnimatePresence>
        {allDone && !tool.aggregate && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 rounded-2xl bg-emerald-500/10 p-4 text-emerald-600 dark:text-emerald-400"
          >
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <span className="text-sm font-semibold">
              All files processed successfully! Download from each card or via “Download all”.
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <ConfirmModal
        open={confirmId !== null}
        title="Remove file"
        message="Remove this file from the list? This action cannot be undone."
        onConfirm={() => confirmId && removeFile(confirmId)}
        onClose={() => setConfirmId(null)}
      />
    </div>
  );
}

function SettingField({
  setting: s,
  value,
  onChange,
}: {
  setting: ToolSetting;
  value: string | number | boolean;
  onChange: (v: string | number | boolean) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">{s.label}</span>

      {s.type === "select" && (
        <select
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 w-full rounded-xl border border-border bg-card px-3 text-sm outline-none transition focus:ring-2 focus:ring-brand-400/40"
        >
          {s.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      )}

      {(s.type === "text" || s.type === "password") && (
        <input
          type={s.type}
          value={String(value)}
          placeholder={s.placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 w-full rounded-xl glass px-3 text-sm outline-none transition focus:ring-2 focus:ring-brand-400/40"
        />
      )}

      {s.type === "range" && (
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={s.min}
            max={s.max}
            step={s.step}
            value={Number(value)}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full accent-brand-500"
          />
          <span className="w-12 text-right text-sm font-semibold text-brand-500">{String(value)}</span>
        </div>
      )}

      {s.type === "toggle" && (
        <button
          type="button"
          onClick={() => onChange(!value)}
          className={cn("relative h-7 w-12 rounded-full transition", value ? "bg-brand-500" : "bg-muted")}
        >
          <span className={cn("absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all", value ? "left-6" : "left-1")} />
        </button>
      )}

      {s.hint && <span className="mt-1 block text-xs text-muted-foreground">{s.hint}</span>}
    </label>
  );
}
