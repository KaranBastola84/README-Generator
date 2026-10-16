import type { ReadmeData } from "../types";
import { sanitizePlain } from "../sanitize";

export const intro = {
  key: "intro",
  render(data: ReadmeData): string {
    if (!data.blocks.intro) return "";
    const safeName = sanitizePlain(data.name);
    const safeTagline = sanitizePlain(data.tagline);
    const lines: string[] = [];
    if (safeName) lines.push(`# ${safeName}`);
    if (safeTagline) lines.push(safeTagline);
    if (lines.length === 0) return "";
    return lines.join("\n") + "\n";
  },
} as const;
