import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Background } from "@/components/layout/background";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "PDF Toolkit — All-in-one PDF & Document Converter",
  description:
    "Konversi PDF ke Word, Word ke PDF, dan 20+ alat dokumen lainnya. Cepat, aman, dan mudah digunakan.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning className={inter.variable}>
      <body className="font-sans antialiased">
        <Providers>
          <Background />
          {children}
        </Providers>
      </body>
    </html>
  );
}
