import type { ReadmeData } from "../types";
import { normalizeAbout } from "../sanitize";

export const about = {
  key: "about",
  render(data: ReadmeData): string {
    if (!data.blocks.about) return "";
    const about = normalizeAbout(data.about);
    if (!about) return "";
    return "## About\n" + about + "\n";
  },
} as const;
