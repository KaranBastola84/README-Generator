import { describe, it, expect } from "vitest";
import { generateMarkdown } from "./generateMarkdown";
import { createDefaultData } from "./types";
import {
  sanitizePlain,
  sanitizeUrl,
  normalizeAbout,
} from "./sanitize";

function data(overrides: Partial<ReturnType<typeof createDefaultData>> = {}) {
  return { ...createDefaultData(), ...overrides };
}

describe("generateMarkdown", () => {
  it("returns empty string when no blocks are enabled and no data", () => {
    const out = generateMarkdown(
      data({ blocks: { intro: false, about: false, skills: false, socials: false, projects: false, stats: false, visitors: false, since: false } })
    );
    expect(out).toBe("");
  });

  it("returns empty string when intro block is on but name and tagline are empty", () => {
    expect(generateMarkdown(data({ blocks: { intro: true, about: false, skills: false, socials: false, projects: false, stats: false, visitors: false, since: false } }))).toBe("");
  });

  it("returns intro text when name is provided", () => {
    const out = generateMarkdown(
      data({ name: "Karan", tagline: "Developer", blocks: { intro: true, about: false, skills: false, socials: false, projects: false, stats: false, visitors: false, since: false } })
    );
    expect(out).toContain("# Karan");
    expect(out).toContain("Dev");
  });

  it("returns about section when about text is provided", () => {
    const out = generateMarkdown(
      data({
        name: "Karan",
        about: "I build tools.",
        blocks: { intro: false, about: true, skills: false, socials: false, projects: false, stats: false, visitors: false, since: false },
      })
    );
    expect(out).toContain("## About");
    expect(out).toContain("I build tools.");
  });

  it("returns empty string when about block is on but about text is empty", () => {
    const out = generateMarkdown(
      data({
        name: "Karan",
        blocks: { intro: false, about: true, skills: false, socials: false, projects: false, stats: false, visitors: false, since: false },
      })
    );
    expect(out).toBe("");
  });

  it("returns skills list when skills are provided", () => {
    const out = generateMarkdown(
      data({
        skills: ["TypeScript", "Rust"],
        blocks: { intro: false, about: false, skills: true, socials: false, projects: false, stats: false, visitors: false, since: false },
      })
    );
    expect(out).toContain("## Skills");
    expect(out).toContain("- TypeScript");
    expect(out).toContain("- Rust");
  });

  it("returns empty string when skills block is on but list is empty", () => {
    const out = generateMarkdown(
      data({
        blocks: { intro: false, about: false, skills: true, socials: false, projects: false, stats: false, visitors: false, since: false },
      })
    );
    expect(out).toBe("");
  });

  it("returns social links when provided", () => {
    const out = generateMarkdown(
      data({
        socials: { github: "https://github.com/karan", linkedin: "https://linkedin.com/in/karan" },
        blocks: { intro: false, about: false, skills: false, socials: true, projects: false, stats: false, visitors: false, since: false },
      })
    );
    expect(out).toContain("## Connect");
    expect(out).toContain("[**GitHub**](https://github.com/karan)");
    expect(out).toContain("[**LinkedIn**](https://linkedin.com/in/karan)");
  });

  it("returns empty string when socials block is on but no links given", () => {
    const out = generateMarkdown(
      data({
        blocks: { intro: false, about: false, skills: false, socials: true, projects: false, stats: false, visitors: false, since: false },
      })
    );
    expect(out).toBe("");
  });

  it("returns projects list when provided", () => {
    const out = generateMarkdown(
      data({
        projects: [
          { title: "App", description: "A tool", link: "https://example.com" },
          { title: "Lib", description: "", link: "https://example.com/lib" },
        ],
        blocks: { intro: false, about: false, skills: false, socials: false, projects: true, stats: false, visitors: false, since: false },
      })
    );
    expect(out).toContain("## Featured Projects");
    expect(out).toContain("[App](https://example.com) A tool");
    expect(out).toContain("[Lib](https://example.com/lib)");
  });

  it("renders a project title without a link when link is omitted", () => {
    const out = generateMarkdown(
      data({
        projects: [{ title: "My Project", description: "A cool thing", link: "" }],
        blocks: { intro: false, about: false, skills: false, socials: false, projects: true, stats: false, visitors: false, since: false },
      })
    );
    expect(out).toContain("## Featured Projects");
    expect(out).toContain("- My Project A cool thing");
    expect(out).not.toContain("[My Project](#)");
  });

  it("renders a project title alone when link and description are empty", () => {
    const out = generateMarkdown(
      data({
        projects: [{ title: "Untitled", description: "", link: "" }],
        blocks: { intro: false, about: false, skills: false, socials: false, projects: true, stats: false, visitors: false, since: false },
      })
    );
    expect(out).toContain("- Untitled");
    expect(out).not.toContain("[Untitled](#)");
  });

  it("returns empty string when projects block is on but list is empty", () => {
    const out = generateMarkdown(
      data({
        blocks: { intro: false, about: false, skills: false, socials: false, projects: true, stats: false, visitors: false, since: false },
      })
    );
    expect(out).toBe("");
  });

  it("never renders [title](#) for a project without a link", () => {
    const out = generateMarkdown(
      data({
        projects: [
          { title: "A", description: "", link: "" },
          { title: "B", description: "", link: "" },
        ],
        blocks: { intro: false, about: false, skills: false, socials: false, projects: true, stats: false, visitors: false, since: false },
      })
    );
    expect(out).not.toContain("[A](#)");
    expect(out).not.toContain("[B](#)");
  });

  it("renders the full README from all fields filled (inline snapshot)", () => {
    const out = generateMarkdown(
      data({
        name: "Karan Bastola",
        tagline: "Building tools that matter.",
        about: "I build developer tools. *Updated daily.*",
        skills: ["TypeScript", "Rust", "Python"],
        socials: {
          github: "https://github.com/KaranBastola84",
          linkedin: "https://linkedin.com/in/karan",
          portfolio: "https://karanbastola.com.np",
        },
        projects: [
          {
            title: "README Generator",
            description: "A live Markdown writer for GitHub profile READMEs.",
            link: "https://github.com/KaranBastola84/readme-generator",
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
      })
    );    expect(out).toMatchInlineSnapshot(`
      "# Karan Bastola
      Building tools that matter.

      ## About
      I build developer tools. *Updated daily.*

      ## Skills
      - TypeScript
      - Rust
      - Python

      ## Connect
      - [**GitHub**](https://github.com/KaranBastola84)
      - [**LinkedIn**](https://linkedin.com/in/karan)
      - [**Portfolio**](https://karanbastola.com.np)

      ## Featured Projects
      - [README Generator](https://github.com/KaranBastola84/readme-generator) A live Markdown writer for GitHub profile READMEs.
      "
    `);
  });

  it("renders sections in the registry order, no extras, no missing", () => {
    const out = generateMarkdown(
      data({
        name: "K",
        about: "about",
        skills: ["S"],
        socials: { github: "https://github.com/k" },
        projects: [{ title: "P", description: "", link: "#" }],
        blocks: { intro: true, about: true, skills: true, socials: true, projects: true, stats: false, visitors: false, since: false },
      })
    );
    // Intro has no ## header; the rest appear in registry order.
    const sections = out
      .split("\n")
      .filter((line) => /^#{1,6} /m.test(line))
      .map((line) => line.trim());
    expect(sections).toEqual(["# K", "## About", "## Skills", "## Connect", "## Featured Projects"]);
  });

  it("joins enabled blocks in order with no missing sections", () => {
    const out = generateMarkdown(
      data({
        name: "Karan",
        tagline: "Dev",
        about: "About me.",
        skills: ["TS"],
        socials: { github: "https://github.com/karan" },
        projects: [{ title: "P", description: "", link: "#" }],
        blocks: { intro: true, about: true, skills: true, socials: true, projects: true, stats: false, visitors: false, since: false },
      })
    );
    expect(out).toContain("# Karan");
    expect(out).toContain("Dev");
    expect(out).toContain("## About");
    expect(out).toContain("About me.");
    expect(out).toContain("## Skills");
    expect(out).toContain("- TS");
    expect(out).toContain("## Connect");
    expect(out).toContain("## Featured Projects");
  });

  // ---- Input safety (lib/sanitize) ----

  it("sanitizePlain escapes Markdown-significant characters and collapses whitespace", () => {
    expect(sanitizePlain("Karan\n## Injected")).toBe("Karan \\#\\# Injected");
  });

  it("sanitizePlain escapes every Markdown-significant char in a label", () => {
    const result = sanitizePlain("**](http://x)");
    // Each special char becomes backslash + char, in the same order as the input.
    expect(result).toContain("\\*");
    expect(result).toContain("\\]");
    expect(result).toContain("\\(");
    expect(result.split("\\*").length).toBe(3);
    expect(result.split("\\]").length).toBe(2);
    expect(result.split("\\(").length).toBe(2);
  });

  it("sanitizeUrl rejects javascript: and other non-whitelisted schemes", () => {
    expect(sanitizeUrl("javascript:alert(1)")).toBe("");
    expect(sanitizeUrl("data:text/html,<h1>x</h1>")).toBe("");
    expect(sanitizeUrl("ftp://example.com")).toBe("");
  });

  it("sanitizeUrl percent-encodes spaces and parentheses in the path", () => {
    expect(sanitizeUrl("https://example.com/a)b")).toBe("https://example.com/a%29b");
    expect(sanitizeUrl("https://example.com/a b")).toBe("https://example.com/a%20b");
  });

  it("sanitizeUrl encodes a quote in the path but leaves < and >", () => {
    // Only spaces, ( ) [ ] " ' are percent-encoded. < and > are not.
    expect(sanitizeUrl('https://example.com/"><x')).toBe("https://example.com/%22><x");
  });

  it("sanitizeUrl accepts mailto: links", () => {
    expect(sanitizeUrl("mailto:hi@example.com")).toBe("mailto:hi@example.com");
  });

  it("socials block escapes an injected label and rejects an injected URL", () => {
    const out = generateMarkdown(
      data({
        socials: { github: "javascript:alert(1)" },
        blocks: { intro: false, about: false, skills: false, socials: true, projects: false, stats: false, visitors: false, since: false },
      })
    );
    // javascript: is rejected -> no link, so no ## Connect section
    expect(out).toBe("");
  });

  it("projects block escapes an injected title and rejects an injected link", () => {
    const out = generateMarkdown(
      data({
        projects: [
          { title: "**[evil](http://x)", description: "", link: "javascript:alert(1)" },
        ],
        blocks: { intro: false, about: false, skills: false, socials: false, projects: true, stats: false, visitors: false, since: false },
      })
    );
    // title is escaped (each Markdown char prefixed with backslash), link is rejected -> plain title line, no link
    expect(out).toContain("- ");
    expect(out).toContain("\\*");
    expect(out).toContain("\\[");
    expect(out).toContain("\\]");
    expect(out).toContain("evil");
    expect(out).toContain("\\(");
    expect(out).toContain("http://x");
    expect(out).toContain("\\)");
    expect(out).not.toContain("javascript:");
    expect(out).not.toContain("[**");
    expect(out).not.toContain("](http");
  });

  it("about block keeps Markdown but normalises line endings", () => {
    expect(normalizeAbout("Line one\r\nLine two\r\n")).toBe("Line one\nLine two");
  });

  it("has no double blank lines", () => {
    const out = generateMarkdown(
      data({
        name: "Karan",
        tagline: "Dev",
        about: "About me.",
        skills: [],
        socials: {},
        projects: [],
        blocks: { intro: true, about: true, skills: true, socials: true, projects: true, stats: false, visitors: false, since: false },
      })
    );
    expect(out).not.toMatch(/\n\n\n/);
  });

  it("ends with exactly one newline", () => {
    const out = generateMarkdown(
      data({
        name: "Karan",
        blocks: { intro: true, about: false, skills: false, socials: false, projects: false, stats: false, visitors: false, since: false },
      })
    );
    expect(out).toBeTruthy();
    expect(out).toMatch(/[^\n]\n$/);
    expect(out).not.toMatch(/\n\n$/);
  });

  it("returns empty string when no data and only intro block on (edge case)", () => {
    const out = generateMarkdown(createDefaultData());
    expect(out).toBe("");
  });
});
