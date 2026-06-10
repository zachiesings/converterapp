import type { Tool } from "@/types";
import { baseName, sleep } from "./utils";

/**
 * Simulated (dummy) conversion process.
 *
 * Replace the body of this function with a real API/library call later — the
 * interface (onProgress + return { url, name }) is designed so the UI
 * components won't need to change when the real backend is wired in.
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
    if (signal?.aborted) throw new Error("Cancelled");
    pct = Math.min(100, pct + 6 + Math.random() * 14);
    onProgress(Math.round(pct));
    await sleep(140 + Math.random() * 160);
  }

  // Dummy result: a small text file. Replaced with real output later.
  const content =
    `PDF Toolkit — simulated result\n\n` +
    `Tool   : ${tool.name}\n` +
    `Source : ${file.name}\n` +
    `Size   : ${file.size} bytes\n\n` +
    `This is a placeholder file. Wire up the real conversion in lib/dummy-convert.ts.`;
  const blob = new Blob([content], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  return { url, name: `${baseName(file.name)}.${tool.outputExt}` };
}
