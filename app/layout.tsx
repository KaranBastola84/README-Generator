import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GitCraft",
  description: "Generate a GitHub profile README live.",
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