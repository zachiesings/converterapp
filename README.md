# PDF Toolkit — Web (Next.js)

Aplikasi web SaaS premium untuk konversi & olah dokumen: **PDF ⇄ Word, PDF ⇄ Image, Merge, Split, Compress, OCR, Sign, Protect**, dan 20+ tools lainnya. UI modern (glassmorphism, gradient mesh, Framer Motion), dark/light mode, drag & drop upload, progress, toast, dan halaman detail penuh untuk **setiap** tool.

> Proses konversi saat ini memakai **dummy handler** (`lib/dummy-convert.ts`). Antarmuka sudah dirancang agar tinggal diganti dengan API/library asli tanpa mengubah UI.

## Stack
- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (design system + glassmorphism)
- **Framer Motion** (animasi & micro-interaction)
- **lucide-react** (ikon), **next-themes** (dark/light), **sonner** (toast)

## Menjalankan
```bash
npm install        # pasang dependencies
npm run dev        # mode development → http://localhost:3000
# atau produksi:
npm run build
npm start
```

## Struktur folder
```
app/
  layout.tsx              # root: tema, background dekoratif
  page.tsx                # landing page
  (app)/
    layout.tsx            # shell: sidebar + navbar
    dashboard/page.tsx    # dashboard (stats, recent, favorit)
    tools/page.tsx        # grid semua tools (search + filter kategori)
    tools/[slug]/page.tsx # halaman detail per tool (dinamis)
components/
  ui/                     # Button, Card, Badge, Progress, Modal, Tooltip, Skeleton
  layout/                 # Navbar, Sidebar, Footer, Breadcrumb, ThemeToggle, Background, Logo
  tools/                  # UploadBox, FilePreviewCard, ToolCard, ToolGrid, ToolRunner,
                          # SearchTools, CategoryTabs, ConversionStatus, DownloadButton
  dashboard-stats.tsx, recent-files.tsx, empty-state.tsx, error-state.tsx, confirm-modal.tsx
lib/
  tools.ts                # registry 21 tools + 8 kategori (sumber tunggal)
  dummy-convert.ts        # simulasi konversi — GANTI dengan API asli di sini
  utils.ts                # helper (cn, formatBytes, dst.)
hooks/                    # use-favorites, use-recent
types/                    # tipe Tool, UploadFile, dst.
```

## Menambah tool baru
Cukup tambahkan satu objek di `lib/tools.ts` (`TOOLS`). Halaman detail, upload, progress,
dan hasil otomatis tersedia di `/tools/<slug>` — **tanpa membuat file halaman baru**.

## Memasang konversi asli
Ganti isi `dummyConvert()` di `lib/dummy-convert.ts` dengan pemanggilan API/library asli.
Pertahankan kontrak: `onProgress(pct)` untuk progress bar, dan kembalikan `{ url, name }`
untuk tombol download. Komponen UI tidak perlu diubah.

## Catatan
- Semua tool memiliki halaman fungsional (upload → proses → hasil), bukan tombol kosong.
- Validasi format & ukuran file dijalankan sebelum proses; error tampil via toast.
- File diproses di sisi klien (dummy) dan tidak diunggah ke mana pun pada tahap ini.
