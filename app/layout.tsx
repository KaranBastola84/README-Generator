import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GitCraft — Build Your GitHub Profile README",
  description: "Generate a production-grade GitHub profile README live, with a signature GitHub Since badge — zero signup.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="scroll-smooth"
    >
      <body className="bg-surface-container-lowest font-body-md text-on-surface antialiased relative selection:bg-primary-fixed selection:text-primary">
        {children}
      </body>
    </html>
  );
}
