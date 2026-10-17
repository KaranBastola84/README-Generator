import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-builder-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-builder-mono",
  display: "swap",
});

/**
 * The builder is the only dark surface in the app. Its fonts are loaded here
 * (Google Fonts via next/font, self-hosted at build time) so the landing page
 * keeps exactly its current typography.
 */
export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`builder-root min-h-screen bg-ink-bg font-sans ${geistSans.variable} ${geistMono.variable}`}
    >
      {children}
    </div>
  );
}
