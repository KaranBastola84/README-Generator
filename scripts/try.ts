import { generateMarkdown } from "../lib/generateMarkdown";
import { createDefaultData } from "../lib/types";

const sample = {
  ...createDefaultData(),
  name: "Ada Lovelace",
  tagline: "First computer programmer.",
  about:
    "Ada Lovelace was an English mathematician and writer, known for her work on the Analytical Engine.",
  githubUsername: "ada-lovelace",
  skills: ["Python", "TypeScript", "Rust"],
  socials: {
    github: "https://github.com/ada-lovelace",
    linkedin: "https://linkedin.com/in/ada",
    portfolio: "https://adalovelace.dev",
  },
  projects: [
    {
      title: "Analytical Engine Notes",
      description: "Translation and notes on Babbage's Engine.",
      link: "https://example.com/notes",
    },
    {
      title: "Algorithm Studies",
      description: "Early algorithm research.",
      link: "https://example.com/algorithms",
    },
  ],
  blocks: {
    intro: true,
    about: true,
    skills: true,
    socials: true,
    projects: true,
    stats: false,
    visitors: false,
    since: false,
  },
};

console.log("===== GENERATED README =====");
console.log(generateMarkdown(sample));
console.log("===== END =====");
