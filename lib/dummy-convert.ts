import type { Tool } from "@/types";
import { baseName, sleep } from "./utils";

/**
 * Simulasi proses konversi (dummy).
 *
 * Ganti isi fungsi ini dengan pemanggilan API/library asli nanti — antarmuka
 * (onProgress + return { url, name }) sudah dirancang agar tidak perlu mengubah
 * komponen UI saat backend asli dipasang.
 */
export async function dummyConvert(
  file: File,
  tool: Tool,
  onProgress: (pct: number) => void,
  signal?: AbortSignal
): Promise<{ url: string; name: string }> {
  let pct = 0;
  onProgress(0);
  while (pct < 100) {
    if (signal?.aborted) throw new Error("Dibatalkan");
    pct = Math.min(100, pct + 6 + Math.random() * 14);
    onProgress(Math.round(pct));
    await sleep(140 + Math.random() * 160);
  }

  // Hasil dummy: file teks kecil. Diganti dengan output asli nanti.
  const content =
    `PDF Toolkit — hasil simulasi\n\n` +
    `Tool   : ${tool.name}\n` +
    `Sumber : ${file.name}\n` +
    `Ukuran : ${file.size} bytes\n\n` +
    `Ini adalah berkas placeholder. Pasang konversi asli pada lib/dummy-convert.ts.`;
  const blob = new Blob([content], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  return { url, name: `${baseName(file.name)}.${tool.outputExt}` };
}
