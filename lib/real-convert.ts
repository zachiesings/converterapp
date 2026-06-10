import { PDFDocument } from "pdf-lib";

/** Hasil konversi: object URL + nama file. */
export type ConvertResult = { url: string; name: string };

function toResult(bytes: Uint8Array, name: string): ConvertResult {
  // Salin ke ArrayBuffer baru agar tipe Blob valid (hindari isu SharedArrayBuffer).
  const copy = new Uint8Array(bytes);
  const blob = new Blob([copy], { type: "application/pdf" });
  return { url: URL.createObjectURL(blob), name };
}

/** Gabungkan beberapa PDF menjadi satu (konversi ASLI via pdf-lib). */
export async function mergePdfs(
  files: File[],
  onProgress: (pct: number) => void
): Promise<ConvertResult> {
  const out = await PDFDocument.create();
  for (let i = 0; i < files.length; i++) {
    const bytes = new Uint8Array(await files[i].arrayBuffer());
    const src = await PDFDocument.load(bytes, { ignoreEncryption: true });
    const pages = await out.copyPages(src, src.getPageIndices());
    pages.forEach((p) => out.addPage(p));
    onProgress(Math.round(((i + 1) / files.length) * 95));
  }
  const saved = await out.save();
  onProgress(100);
  return toResult(saved, "gabungan.pdf");
}

/** Gabungkan beberapa gambar (PNG/JPG) menjadi satu PDF (konversi ASLI). */
export async function imagesToPdf(
  files: File[],
  onProgress: (pct: number) => void
): Promise<ConvertResult> {
  const out = await PDFDocument.create();
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const bytes = new Uint8Array(await file.arrayBuffer());
    const isPng = file.type.includes("png") || file.name.toLowerCase().endsWith(".png");
    const img = isPng ? await out.embedPng(bytes) : await out.embedJpg(bytes);
    const page = out.addPage([img.width, img.height]);
    page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
    onProgress(Math.round(((i + 1) / files.length) * 95));
  }
  const saved = await out.save();
  onProgress(100);
  return toResult(saved, "gambar.pdf");
}

/** Pilih fungsi konversi asli berdasarkan slug tool, atau null jika belum ada. */
export function getRealAggregate(
  slug: string
): ((files: File[], onProgress: (pct: number) => void) => Promise<ConvertResult>) | null {
  if (slug === "merge-pdf") return mergePdfs;
  if (slug === "image-to-pdf") return imagesToPdf;
  return null;
}
