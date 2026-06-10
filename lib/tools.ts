import {
  FileText, FileType2, FileSpreadsheet, Presentation, Sheet, Image as ImageIcon,
  FileImage, Combine, Scissors, Minimize2, RotateCw, ArrowLeftRight, Trash2,
  Stamp, Hash, Lock, Unlock, PenTool, ScanText, Info, Repeat, Briefcase,
  PencilLine, LayoutGrid, Gauge, ShieldCheck,
} from "lucide-react";
import type { Category, Tool } from "@/types";

export const CATEGORIES: Category[] = [
  { id: "convert", label: "Convert PDF", icon: Repeat, gradient: "from-indigo-500 to-violet-500" },
  { id: "office", label: "Office Tools", icon: Briefcase, gradient: "from-emerald-500 to-teal-500" },
  { id: "edit", label: "Edit PDF", icon: PencilLine, gradient: "from-amber-500 to-orange-500" },
  { id: "organize", label: "Organize PDF", icon: LayoutGrid, gradient: "from-sky-500 to-blue-600" },
  { id: "optimize", label: "Optimize PDF", icon: Gauge, gradient: "from-fuchsia-500 to-pink-500" },
  { id: "security", label: "Secure PDF", icon: ShieldCheck, gradient: "from-rose-500 to-red-500" },
  { id: "ocr", label: "OCR & Scan", icon: ScanText, gradient: "from-cyan-500 to-teal-500" },
  { id: "image", label: "Image Tools", icon: ImageIcon, gradient: "from-violet-500 to-purple-600" },
];

export const TOOLS: Tool[] = [
  {
    slug: "pdf-to-word", name: "PDF to Word", description: "Turn your PDF into an editable Word document (.docx).",
    icon: FileText, category: "convert", accept: ".pdf", acceptLabel: "PDF", multiple: false,
    gradient: "from-blue-500 to-indigo-500", outputExt: "docx", badge: "Popular", maxSizeMB: 50,
  },
  {
    slug: "word-to-pdf", name: "Word to PDF", description: "Convert Word files (.doc/.docx) into clean, polished PDFs.",
    icon: FileType2, category: "office", accept: ".doc,.docx", acceptLabel: "Word", multiple: false,
    gradient: "from-sky-500 to-blue-600", outputExt: "pdf", badge: "Popular", maxSizeMB: 50,
  },
  {
    slug: "pdf-to-powerpoint", name: "PDF to PowerPoint", description: "Turn your PDF into PowerPoint slides (.pptx).",
    icon: FileText, category: "convert", accept: ".pdf", acceptLabel: "PDF", multiple: false,
    gradient: "from-orange-500 to-red-500", outputExt: "pptx", maxSizeMB: 50,
  },
  {
    slug: "powerpoint-to-pdf", name: "PowerPoint to PDF", description: "Convert PowerPoint slides into a PDF.",
    icon: Presentation, category: "office", accept: ".ppt,.pptx", acceptLabel: "PowerPoint", multiple: false,
    gradient: "from-orange-500 to-amber-500", outputExt: "pdf", maxSizeMB: 50,
  },
  {
    slug: "pdf-to-excel", name: "PDF to Excel", description: "Extract tables from a PDF into an Excel spreadsheet (.xlsx).",
    icon: FileSpreadsheet, category: "convert", accept: ".pdf", acceptLabel: "PDF", multiple: false,
    gradient: "from-emerald-500 to-green-600", outputExt: "xlsx", maxSizeMB: 50,
  },
  {
    slug: "excel-to-pdf", name: "Excel to PDF", description: "Convert an Excel spreadsheet into a PDF.",
    icon: Sheet, category: "office", accept: ".xls,.xlsx", acceptLabel: "Excel", multiple: false,
    gradient: "from-green-500 to-emerald-600", outputExt: "pdf", maxSizeMB: 50,
  },
  {
    slug: "pdf-to-image", name: "PDF to Image", description: "Render each PDF page as a PNG/JPG image.",
    icon: ImageIcon, category: "image", accept: ".pdf", acceptLabel: "PDF", multiple: false,
    gradient: "from-violet-500 to-purple-600", outputExt: "zip", maxSizeMB: 50,
    settings: [
      { key: "format", label: "Image format", type: "select", default: "png",
        options: [{ label: "PNG", value: "png" }, { label: "JPG", value: "jpg" }] },
      { key: "dpi", label: "Quality (DPI)", type: "range", min: 72, max: 300, step: 1, default: 150,
        hint: "Higher is sharper, but the file gets larger." },
    ],
  },
  {
    slug: "image-to-pdf", name: "Image to PDF", description: "Combine multiple images into a single PDF file.",
    icon: FileImage, category: "image", accept: "image/*", acceptLabel: "Image", multiple: true,
    gradient: "from-fuchsia-500 to-pink-500", outputExt: "pdf", maxSizeMB: 25, aggregate: true, real: true,
  },
  {
    slug: "merge-pdf", name: "Merge PDF", description: "Combine several PDFs into a single document.",
    icon: Combine, category: "organize", accept: ".pdf", acceptLabel: "PDF", multiple: true,
    gradient: "from-sky-500 to-cyan-500", outputExt: "pdf", badge: "Popular", maxSizeMB: 50, aggregate: true, real: true,
  },
  {
    slug: "split-pdf", name: "Split PDF", description: "Split a PDF by page range or one page at a time.",
    icon: Scissors, category: "organize", accept: ".pdf", acceptLabel: "PDF", multiple: false,
    gradient: "from-blue-500 to-sky-500", outputExt: "zip", maxSizeMB: 50,
    settings: [
      { key: "mode", label: "Mode", type: "select", default: "range",
        options: [{ label: "Page range", value: "range" }, { label: "Every page", value: "each" }] },
      { key: "range", label: "Range (e.g. 1-5)", type: "text", placeholder: "1-5", default: "" },
    ],
  },
  {
    slug: "compress-pdf", name: "Compress PDF", description: "Shrink your PDF file size with little to no quality loss.",
    icon: Minimize2, category: "optimize", accept: ".pdf", acceptLabel: "PDF", multiple: false,
    gradient: "from-fuchsia-500 to-pink-600", outputExt: "pdf", maxSizeMB: 100,
    settings: [
      { key: "level", label: "Compression level", type: "select", default: "recommended",
        options: [
          { label: "Extreme (smallest)", value: "extreme" },
          { label: "Recommended", value: "recommended" },
          { label: "Light (high quality)", value: "low" },
        ] },
    ],
  },
  {
    slug: "rotate-pdf", name: "Rotate PDF", description: "Rotate PDF pages to the correct orientation.",
    icon: RotateCw, category: "organize", accept: ".pdf", acceptLabel: "PDF", multiple: false,
    gradient: "from-blue-500 to-indigo-500", outputExt: "pdf", maxSizeMB: 50,
    settings: [
      { key: "angle", label: "Rotation angle", type: "select", default: "90",
        options: [{ label: "90°", value: "90" }, { label: "180°", value: "180" }, { label: "270°", value: "270" }] },
    ],
  },
  {
    slug: "reorder-pages", name: "Reorder Pages", description: "Rearrange the page order within a PDF.",
    icon: ArrowLeftRight, category: "organize", accept: ".pdf", acceptLabel: "PDF", multiple: false,
    gradient: "from-sky-500 to-blue-500", outputExt: "pdf", maxSizeMB: 50,
  },
  {
    slug: "delete-pages", name: "Delete Pages", description: "Remove specific pages from a PDF document.",
    icon: Trash2, category: "organize", accept: ".pdf", acceptLabel: "PDF", multiple: false,
    gradient: "from-rose-500 to-red-500", outputExt: "pdf", maxSizeMB: 50,
    settings: [{ key: "pages", label: "Pages to delete", type: "text", placeholder: "2, 5, 8-10", default: "" }],
  },
  {
    slug: "add-watermark", name: "Add Watermark", description: "Add a text watermark to every PDF page.",
    icon: Stamp, category: "edit", accept: ".pdf", acceptLabel: "PDF", multiple: false,
    gradient: "from-amber-500 to-orange-500", outputExt: "pdf", maxSizeMB: 50,
    settings: [
      { key: "text", label: "Watermark text", type: "text", placeholder: "CONFIDENTIAL", default: "CONFIDENTIAL" },
      { key: "opacity", label: "Opacity", type: "range", min: 10, max: 100, step: 5, default: 40 },
    ],
  },
  {
    slug: "add-page-numbers", name: "Add Page Numbers", description: "Automatically insert page numbers into your PDF.",
    icon: Hash, category: "edit", accept: ".pdf", acceptLabel: "PDF", multiple: false,
    gradient: "from-amber-500 to-yellow-500", outputExt: "pdf", maxSizeMB: 50,
    settings: [
      { key: "position", label: "Position", type: "select", default: "bottom-center",
        options: [
          { label: "Bottom center", value: "bottom-center" },
          { label: "Bottom right", value: "bottom-right" },
          { label: "Top right", value: "top-right" },
        ] },
    ],
  },
  {
    slug: "protect-pdf", name: "Protect PDF", description: "Lock your PDF with a password to keep it secure.",
    icon: Lock, category: "security", accept: ".pdf", acceptLabel: "PDF", multiple: false,
    gradient: "from-rose-500 to-pink-600", outputExt: "pdf", maxSizeMB: 50,
    settings: [{ key: "password", label: "Password", type: "password", placeholder: "••••••••", default: "" }],
  },
  {
    slug: "unlock-pdf", name: "Unlock PDF", description: "Remove the password from a locked PDF.",
    icon: Unlock, category: "security", accept: ".pdf", acceptLabel: "PDF", multiple: false,
    gradient: "from-red-500 to-rose-500", outputExt: "pdf", maxSizeMB: 50,
    settings: [{ key: "password", label: "Current password", type: "password", placeholder: "••••••••", default: "" }],
  },
  {
    slug: "sign-pdf", name: "Sign PDF", description: "Add your signature to a PDF document.",
    icon: PenTool, category: "security", accept: ".pdf", acceptLabel: "PDF", multiple: false,
    gradient: "from-pink-500 to-rose-500", outputExt: "pdf", maxSizeMB: 50,
  },
  {
    slug: "ocr-pdf", name: "OCR PDF", description: "Make scanned PDFs searchable and selectable (OCR).",
    icon: ScanText, category: "ocr", accept: ".pdf", acceptLabel: "PDF", multiple: false,
    gradient: "from-cyan-500 to-teal-500", outputExt: "pdf", maxSizeMB: 50,
    settings: [
      { key: "lang", label: "Language", type: "select", default: "ind",
        options: [{ label: "Indonesian", value: "ind" }, { label: "English", value: "eng" }, { label: "Japanese", value: "jpn" }] },
    ],
  },
  {
    slug: "edit-metadata", name: "Edit Metadata", description: "Edit the title, author, and document info of a PDF.",
    icon: Info, category: "edit", accept: ".pdf", acceptLabel: "PDF", multiple: false,
    gradient: "from-orange-500 to-amber-500", outputExt: "pdf", maxSizeMB: 50,
    settings: [
      { key: "title", label: "Title", type: "text", placeholder: "Document title", default: "" },
      { key: "author", label: "Author", type: "text", placeholder: "Author name", default: "" },
    ],
  },
];

export function getTool(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function toolsByCategory(id: string): Tool[] {
  return TOOLS.filter((t) => t.category === id);
}

export function categoryLabel(id: string): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

export const POPULAR_SLUGS = ["pdf-to-word", "word-to-pdf", "merge-pdf", "compress-pdf", "pdf-to-image", "split-pdf"];
