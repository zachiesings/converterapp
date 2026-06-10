const isProd = process.env.NODE_ENV === "production";
// Nama repo GitHub Pages (project site di /converterapp). Kosong saat dev.
const repo = "converterapp";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ekspor jadi situs statis (HTML/CSS/JS) → bisa dibuka/host di mana saja (GitHub Pages).
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
};

export default nextConfig;
