import type { ReadmeData } from "../types";
import { sanitizePlain, sanitizeUrl } from "../sanitize";

function socialLine(label: string, url: string): string {
  if (!url) return "";
  const safeLabel = sanitizePlain(label);
  const safeUrl = sanitizeUrl(url);
  if (!safeUrl) return "";
  return `- [**${safeLabel}**](${safeUrl})`;
}

export const socials = {
  key: "socials",
  render(data: ReadmeData): string {
    if (!data.blocks.socials) return "";
    const socials = data.socials;
    const lines: string[] = [];
    const maybePush = (line: string) => {
      if (line) lines.push(line);
    };
    if (socials.github) maybePush(socialLine("GitHub", socials.github));
    if (socials.linkedin) maybePush(socialLine("LinkedIn", socials.linkedin));
    if (socials.portfolio) maybePush(socialLine("Portfolio", socials.portfolio));
    if (socials.twitter) maybePush(socialLine("Twitter", socials.twitter));
    if (socials.youtube) maybePush(socialLine("YouTube", socials.youtube));
    if (socials.devto) maybePush(socialLine("Dev.to", socials.devto));
    if (socials.medium) maybePush(socialLine("Medium", socials.medium));
    for (const o of socials.other ?? []) {
      if (o.label && o.url) maybePush(socialLine(o.label, o.url));
    }
    if (lines.length === 0) return "";
    return "## Connect" + "\n" + lines.join("\n") + "\n";
  },
} as const;
