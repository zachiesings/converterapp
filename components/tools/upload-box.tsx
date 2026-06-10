"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

export function UploadBox({
  accept,
  multiple,
  maxSizeMB,
  label,
  onFiles,
}: {
  accept: string;
  multiple: boolean;
  maxSizeMB?: number;
  label: string;
  onFiles: (files: File[]) => void;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [drag, setDrag] = React.useState(false);

  const handle = (list: FileList | null) => {
    if (list && list.length) onFiles(Array.from(list));
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setDrag(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        handle(e.dataTransfer.files);
      }}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-3xl border-2 border-dashed p-8 text-center transition-all duration-300 sm:p-12",
        drag
          ? "scale-[1.01] border-brand-400 bg-brand-500/5 shadow-glow"
          : "glass border-border hover:border-brand-400/60 hover:shadow-glow"
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          handle(e.target.files);
          e.target.value = "";
        }}
      />

      {/* glow when dragging */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/0 via-violet-500/0 to-cyan-400/0 transition-opacity duration-300",
          drag && "from-indigo-500/10 via-violet-500/10 to-cyan-400/10"
        )}
      />

      <motion.div animate={drag ? { y: -4 } : { y: 0 }} className="relative">
        <motion.div
          animate={drag ? { scale: 1.08, rotate: -4 } : { scale: 1, rotate: 0 }}
          className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 text-white shadow-glow"
        >
          <UploadCloud className="h-8 w-8" />
        </motion.div>
        <p className="text-base font-bold">
          {drag ? "Drop your file here ✨" : "Drag & drop a file, or click to choose"}
        </p>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {label}
          {maxSizeMB ? ` · Max ${maxSizeMB} MB` : ""}
          {multiple ? " · Multiple files allowed" : ""}
        </p>
      </motion.div>
    </div>
  );
}
