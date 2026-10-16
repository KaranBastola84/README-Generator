import type { ReadmeData } from "./types";
import { BLOCKS, type BlockDefinition } from "./blocks";

export function generateMarkdown(data: ReadmeData): string {
  const parts: string[] = [];

  for (const block of BLOCKS as readonly BlockDefinition[]) {
    const rendered = block.render(data);
    if (rendered) parts.push(rendered);
  }

  const raw = parts.join("\n");

  const cleaned = raw
    .split("\n")
    .map((l) => l.trimEnd())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return cleaned ? `${cleaned}\n` : "";
}
