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
  { id: "security", label: "Security PDF", icon: ShieldCheck, gradient: "from-rose-500 to-red-500" },
  { id: "ocr", label: "OCR & Scan", icon: ScanText, gradient: "from-cyan-500 to-teal-500" },
  { id: "image", label: "Image Tools", icon: ImageIcon, gradient: "from-violet-500 to-purple-600" },
];

export const TOOLS: Tool[] = [
  {
    slug: "pdf-to-word", name: "PDF to Word", description: "Ubah PDF jadi dokumen Word (.docx) yang bisa diedit.",
    icon: FileText, category: "convert", accept: ".pdf", acceptLabel: "PDF", multiple: false,
    gradient: "from-blue-500 to-indigo-500", outputExt: "docx", badge: "Populer", maxSizeMB: 50,
  },
  {
    slug: "word-to-pdf", name: "Word to PDF", description: "Konversi file Word (.doc/.docx) menjadi PDF rapi.",
    icon: FileType2, category: "office", accept: ".doc,.docx", acceptLabel: "Word", multiple: false,
    gradient: "from-sky-500 to-blue-600", outputExt: "pdf", badge: "Populer", maxSizeMB: 50,
  },
  {
    slug: "pdf-to-powerpoint", name: "PDF to PowerPoint", description: "Ubah PDF menjadi slide PowerPoint (.pptx).",
    icon: FileText, category: "convert", accept: ".pdf", acceptLabel: "PDF", multiple: false,
    gradient: "from-orange-500 to-red-500", outputExt: "pptx", maxSizeMB: 50,
  },
  {
    slug: "powerpoint-to-pdf", name: "PowerPoint to PDF", description: "Konversi slide PowerPoint menjadi PDF.",
    icon: Presentation, category: "office", accept: ".ppt,.pptx", acceptLabel: "PowerPoint", multiple: false,
    gradient: "from-orange-500 to-amber-500", outputExt: "pdf", maxSizeMB: 50,
  },
  {
    slug: "pdf-to-excel", name: "PDF to Excel", description: "Ekstrak tabel dari PDF ke spreadsheet Excel (.xlsx).",
    icon: FileSpreadsheet, category: "convert", accept: ".pdf", acceptLabel: "PDF", multiple: false,
    gradient: "from-emerald-500 to-green-600", outputExt: "xlsx", maxSizeMB: 50,
  },
  {
    slug: "excel-to-pdf", name: "Excel to PDF", description: "Konversi spreadsheet Excel menjadi PDF.",
    icon: Sheet, category: "office", accept: ".xls,.xlsx", acceptLabel: "Excel", multiple: false,
    gradient: "from-green-500 to-emerald-600", outputExt: "pdf", maxSizeMB: 50,
  },
  {
    slug: "pdf-to-image", name: "PDF to Image", description: "Render tiap halaman PDF menjadi gambar PNG/JPG.",
    icon: ImageIcon, category: "image", accept: ".pdf", acceptLabel: "PDF", multiple: false,
    gradient: "from-violet-500 to-purple-600", outputExt: "zip", maxSizeMB: 50,
    settings: [
      { key: "format", label: "Format gambar", type: "select", default: "png",
        options: [{ label: "PNG", value: "png" }, { label: "JPG", value: "jpg" }] },
      { key: "dpi", label: "Kualitas (DPI)", type: "range", min: 72, max: 300, step: 1, default: 150,
        hint: "Makin tinggi makin tajam, tapi file lebih besar." },
    ],
  },
  {
    slug: "image-to-pdf", name: "Image to PDF", description: "Gabungkan beberapa gambar menjadi satu file PDF.",
    icon: FileImage, category: "image", accept: "image/*", acceptLabel: "Gambar", multiple: true,
    gradient: "from-fuchsia-500 to-pink-500", outputExt: "pdf", maxSizeMB: 25, aggregate: true, real: true,
  },
  {
    slug: "merge-pdf", name: "Merge PDF", description: "Gabungkan beberapa PDF menjadi satu dokumen.",
    icon: Combine, category: "organize", accept: ".pdf", acceptLabel: "PDF", multiple: true,
    gradient: "from-sky-500 to-cyan-500", outputExt: "pdf", badge: "Populer", maxSizeMB: 50, aggregate: true, real: true,
  },
  {
    slug: "split-pdf", name: "Split PDF", description: "Pisahkan PDF berdasarkan rentang atau per halaman.",
    icon: Scissors, category: "organize", accept: ".pdf", acceptLabel: "PDF", multiple: false,
    gradient: "from-blue-500 to-sky-500", outputExt: "zip", maxSizeMB: 50,
    settings: [
      { key: "mode", label: "Mode", type: "select", default: "range",
        options: [{ label: "Rentang halaman", value: "range" }, { label: "Per halaman", value: "each" }] },
      { key: "range", label: "Rentang (mis. 1-5)", type: "text", placeholder: "1-5", default: "" },
    ],
  },
  {
    slug: "compress-pdf", name: "Compress PDF", description: "Perkecil ukuran file PDF tanpa kehilangan kualitas berarti.",
    icon: Minimize2, category: "optimize", accept: ".pdf", acceptLabel: "PDF", multiple: false,
    gradient: "from-fuchsia-500 to-pink-600", outputExt: "pdf", maxSizeMB: 100,
    settings: [
      { key: "level", label: "Tingkat kompresi", type: "select", default: "recommended",
        options: [
          { label: "Ekstrem (terkecil)", value: "extreme" },
          { label: "Disarankan", value: "recommended" },
          { label: "Ringan (kualitas tinggi)", value: "low" },
        ] },
    ],
  },
  {
    slug: "rotate-pdf", name: "Rotate PDF", description: "Putar halaman PDF ke orientasi yang benar.",
    icon: RotateCw, category: "organize", accept: ".pdf", acceptLabel: "PDF", multiple: false,
    gradient: "from-blue-500 to-indigo-500", outputExt: "pdf", maxSizeMB: 50,
    settings: [
      { key: "angle", label: "Sudut putar", type: "select", default: "90",
        options: [{ label: "90°", value: "90" }, { label: "180°", value: "180" }, { label: "270°", value: "270" }] },
    ],
  },
  {
    slug: "reorder-pages", name: "Reorder Pages", description: "Susun ulang urutan halaman dalam PDF.",
    icon: ArrowLeftRight, category: "organize", accept: ".pdf", acceptLabel: "PDF", multiple: false,
    gradient: "from-sky-500 to-blue-500", outputExt: "pdf", maxSizeMB: 50,
  },
  {
    slug: "delete-pages", name: "Delete Pages", description: "Hapus halaman tertentu dari dokumen PDF.",
    icon: Trash2, category: "organize", accept: ".pdf", acceptLabel: "PDF", multiple: false,
    gradient: "from-rose-500 to-red-500", outputExt: "pdf", maxSizeMB: 50,
    settings: [{ key: "pages", label: "Halaman yang dihapus", type: "text", placeholder: "2, 5, 8-10", default: "" }],
  },
  {
    slug: "add-watermark", name: "Add Watermark", description: "Tambahkan watermark teks ke setiap halaman PDF.",
    icon: Stamp, category: "edit", accept: ".pdf", acceptLabel: "PDF", multiple: false,
    gradient: "from-amber-500 to-orange-500", outputExt: "pdf", maxSizeMB: 50,
    settings: [
      { key: "text", label: "Teks watermark", type: "text", placeholder: "CONFIDENTIAL", default: "RAHASIA" },
      { key: "opacity", label: "Transparansi", type: "range", min: 10, max: 100, step: 5, default: 40 },
    ],
  },
  {
    slug: "add-page-numbers", name: "Add Page Numbers", description: "Sisipkan nomor halaman otomatis ke PDF.",
    icon: Hash, category: "edit", accept: ".pdf", acceptLabel: "PDF", multiple: false,
    gradient: "from-amber-500 to-yellow-500", outputExt: "pdf", maxSizeMB: 50,
    settings: [
      { key: "position", label: "Posisi", type: "select", default: "bottom-center",
        options: [
          { label: "Bawah tengah", value: "bottom-center" },
          { label: "Bawah kanan", value: "bottom-right" },
          { label: "Atas kanan", value: "top-right" },
        ] },
    ],
  },
  {
    slug: "protect-pdf", name: "Protect PDF", description: "Kunci PDF dengan kata sandi agar aman.",
    icon: Lock, category: "security", accept: ".pdf", acceptLabel: "PDF", multiple: false,
    gradient: "from-rose-500 to-pink-600", outputExt: "pdf", maxSizeMB: 50,
    settings: [{ key: "password", label: "Kata sandi", type: "password", placeholder: "••••••••", default: "" }],
  },
  {
    slug: "unlock-pdf", name: "Unlock PDF", description: "Hapus kata sandi dari PDF yang terkunci.",
    icon: Unlock, category: "security", accept: ".pdf", acceptLabel: "PDF", multiple: false,
    gradient: "from-red-500 to-rose-500", outputExt: "pdf", maxSizeMB: 50,
    settings: [{ key: "password", label: "Kata sandi saat ini", type: "password", placeholder: "••••••••", default: "" }],
  },
  {
    slug: "sign-pdf", name: "Sign PDF", description: "Tambahkan tanda tangan ke dokumen PDF.",
    icon: PenTool, category: "security", accept: ".pdf", acceptLabel: "PDF", multiple: false,
    gradient: "from-pink-500 to-rose-500", outputExt: "pdf", maxSizeMB: 50,
  },
  {
    slug: "ocr-pdf", name: "OCR PDF", description: "Jadikan PDF hasil scan bisa dicari & disalin (OCR).",
    icon: ScanText, category: "ocr", accept: ".pdf", acceptLabel: "PDF", multiple: false,
    gradient: "from-cyan-500 to-teal-500", outputExt: "pdf", maxSizeMB: 50,
    settings: [
      { key: "lang", label: "Bahasa", type: "select", default: "ind",
        options: [{ label: "Indonesia", value: "ind" }, { label: "Inggris", value: "eng" }, { label: "Jepang", value: "jpn" }] },
    ],
  },
  {
    slug: "edit-metadata", name: "Edit Metadata", description: "Ubah judul, penulis, dan info dokumen PDF.",
    icon: Info, category: "edit", accept: ".pdf", acceptLabel: "PDF", multiple: false,
    gradient: "from-orange-500 to-amber-500", outputExt: "pdf", maxSizeMB: 50,
    settings: [
      { key: "title", label: "Judul", type: "text", placeholder: "Judul dokumen", default: "" },
      { key: "author", label: "Penulis", type: "text", placeholder: "Nama penulis", default: "" },
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
