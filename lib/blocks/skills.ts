import type { ReadmeData } from "../types";
import { sanitizePlain } from "../sanitize";

export const skills = {
  key: "skills",
  render(data: ReadmeData): string {
    if (!data.blocks.skills) return "";
    if (data.skills.length === 0) return "";
    const lines = [
      "## Skills",
      ...data.skills.map((s) => `- ${sanitizePlain(s)}`),
    ];
    return lines.join("\n") + "\n";
  },
} as const;
