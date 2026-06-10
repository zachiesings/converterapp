import type { LucideIcon } from "lucide-react";

export type CategoryId =
  | "convert"
  | "office"
  | "edit"
  | "organize"
  | "optimize"
  | "security"
  | "ocr"
  | "image";

export interface Category {
  id: CategoryId;
  label: string;
  icon: LucideIcon;
  gradient: string;
}

export interface ToolSetting {
  key: string;
  label: string;
  type: "select" | "toggle" | "text" | "range" | "password";
  options?: { label: string; value: string }[];
  min?: number;
  max?: number;
  step?: number;
  default?: string | number | boolean;
  placeholder?: string;
  hint?: string;
}

export interface Tool {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
  category: CategoryId;
  accept: string;
  acceptLabel: string;
  multiple: boolean;
  gradient: string;
  outputExt: string;
  settings?: ToolSetting[];
  badge?: string;
  maxSizeMB?: number;
  /** true = banyak file digabung jadi SATU hasil (mis. Merge, Image→PDF) */
  aggregate?: boolean;
  /** true = konversi asli (pdf-lib), bukan simulasi */
  real?: boolean;
}

export type FileStatus = "waiting" | "processing" | "success" | "failed";

export interface UploadFile {
  id: string;
  file: File;
  name: string;
  size: number;
  status: FileStatus;
  progress: number;
  resultUrl?: string;
  resultName?: string;
  error?: string;
  pages?: number;
}

export interface RecentItem {
  id: string;
  tool: string;
  toolSlug: string;
  fileName: string;
  at: number;
  status: FileStatus;
}
