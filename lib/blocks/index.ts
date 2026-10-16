import { intro } from "./intro";
import { about } from "./about";
import { skills } from "./skills";
import { socials } from "./socials";
import { projects } from "./projects";

/**
 * Ordered list of block definitions.
 *
 * To add a new block:
 * 1. Create `lib/blocks/<name>.ts` exporting `{ key: \"<name>\", render }`.
 * 2. Import it here and add it to this array in the desired position.
 * 3. Add its `true/false` toggle to `ReadmeData.blocks` in `lib/types.ts`.
 *
 * `generateMarkdown` maps over this array, so no change is needed there
 * when a new block is added.
 */
export const BLOCKS = [intro, about, skills, socials, projects] as const;

export type BlockDefinition = typeof BLOCKS[number];
