import { describe, it, expect } from "vitest";
import { createDefaultData } from "./types";

describe("createDefaultData", () => {
  it("returns a new object on every call", () => {
    const first = createDefaultData();
    const second = createDefaultData();

    expect(first).not.toBe(second);
    expect(first.blocks).not.toBe(second.blocks);
    expect(first.skills).not.toBe(second.skills);
    expect(first.socials).not.toBe(second.socials);
    expect(first.projects).not.toBe(second.projects);
  });

  it("does not leak mutations between calls", () => {
    const first = createDefaultData();
    first.name = "Changed";
    first.skills.push("TypeScript");
    first.projects.push({ title: "P", description: "", link: "" });
    first.blocks.intro = false;
    first.socials.github = "https://github.com/example";

    const second = createDefaultData();
    expect(second.name).toBe("");
    expect(second.skills).toEqual([]);
    expect(second.projects).toEqual([]);
    expect(second.blocks.intro).toBe(true);
    expect(second.socials).toEqual({});
  });

  it("starts with the documented defaults", () => {
    const data = createDefaultData();

    expect(data.version).toBe(1);
    expect(data.name).toBe("");
    expect(data.tagline).toBe("");
    expect(data.about).toBe("");
    expect(data.githubUsername).toBe("");
    expect(data.blocks).toEqual({
      intro: true,
      about: true,
      skills: true,
      socials: true,
      projects: false,
      stats: false,
      visitors: false,
      since: false,
    });
  });
});
