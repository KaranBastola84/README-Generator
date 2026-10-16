import type { ReadmeData } from "../types";
import { sanitizePlain, sanitizeUrl } from "../sanitize";

export const projects = {
  key: "projects",
  render(data: ReadmeData): string {
    if (!data.blocks.projects) return "";
    if (data.projects.length === 0) return "";
    const lines = ["## Featured Projects"];
    for (const p of data.projects) {
      const safeTitle = sanitizePlain(p.title);
      const safeLink = sanitizeUrl(p.link);
      const desc = p.description ? ` ${p.description}` : "";
      if (safeLink) {
        lines.push(`- [${safeTitle}](${safeLink})${desc}`);
      } else if (safeTitle) {
        lines.push(`- ${safeTitle}${desc}`);
      }
    }
    if (lines.length === 0) return "";
    return lines.join("\n") + "\n";
  },
} as const;
