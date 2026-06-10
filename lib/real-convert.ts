import { PDFDocument } from "pdf-lib";

/** Conversion result: object URL + file name. */
export type ConvertResult = { url: string; name: string };

function toResult(bytes: Uint8Array, name: string): ConvertResult {
  // Copy into a fresh ArrayBuffer so the Blob type is valid (avoids SharedArrayBuffer issues).
  const copy = new Uint8Array(bytes);
  const blob = new Blob([copy], { type: "application/pdf" });
  return { url: URL.createObjectURL(blob), name };
}

/** Merge several PDFs into one (REAL conversion via pdf-lib). */
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
  return toResult(saved, "merged.pdf");
}

/** Combine several images (PNG/JPG) into one PDF (REAL conversion). */
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
  return toResult(saved, "images.pdf");
}

/** Pick the real conversion function based on the tool slug, or null if none exists yet. */
export function getRealAggregate(
  slug: string
): ((files: File[], onProgress: (pct: number) => void) => Promise<ConvertResult>) | null {
  if (slug === "merge-pdf") return mergePdfs;
  if (slug === "image-to-pdf") return imagesToPdf;
  return null;
}
