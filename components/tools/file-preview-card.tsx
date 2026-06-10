"use client";
import { motion } from "framer-motion";
import { FileText, X } from "lucide-react";
import type { UploadFile } from "@/types";
import { formatBytes } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { ConversionStatus } from "./conversion-status";
import { DownloadButton } from "./download-button";

export function FilePreviewCard({
  uf,
  onRemove,
}: {
  uf: UploadFile;
  onRemove: (id: string) => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className="rounded-2xl glass p-4"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/15 to-violet-500/10">
          <FileText className="h-5 w-5 text-brand-500" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{uf.name}</p>
          <p className="text-xs text-muted-foreground">
            {formatBytes(uf.size)}
            {uf.pages ? ` · ${uf.pages} halaman` : ""}
          </p>
        </div>
        <ConversionStatus status={uf.status} />
        {uf.status !== "processing" && (
          <button
            onClick={() => onRemove(uf.id)}
            className="rounded-lg p-1.5 text-muted-foreground transition hover:bg-rose-500/10 hover:text-rose-500"
            aria-label="Hapus file"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {uf.status === "processing" && (
        <div className="mt-3">
          <Progress value={uf.progress} />
          <p className="mt-1.5 text-right text-xs font-medium text-muted-foreground">{uf.progress}%</p>
        </div>
      )}

      {uf.status === "success" && uf.resultUrl && (
        <div className="mt-3">
          <DownloadButton url={uf.resultUrl} name={uf.resultName!} label={`Download ${uf.resultName}`} />
        </div>
      )}

      {uf.status === "failed" && (
        <p className="mt-2 text-xs font-medium text-rose-500">{uf.error || "Gagal memproses file."}</p>
      )}
    </motion.div>
  );
}
