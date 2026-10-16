/**
 * Returns a fresh default ReadmeData on every call.
 *
 * Do not reuse a single shared object as form state or as a merge target
 * for saved data — mutable defaults shared by reference cause subtle bugs
 * when one consumer mutates the object.
 */
export function createDefaultData(): ReadmeData {
  return {
    version: 1,
    name: "",
    tagline: "",
    about: "",
    githubUsername: "",
    skills: [],
    socials: {},
    projects: [],
    blocks: {
      intro: true,
      about: true,
      skills: true,
      socials: true,
      projects: false,
      stats: false,
      visitors: false,
      since: false,
    },
  };
}

export interface SocialLink {
  github?: string;
  linkedin?: string;
  portfolio?: string;
  twitter?: string;
  youtube?: string;
  devto?: string;
  medium?: string;
  other?: { label: string; url: string }[];
}

export interface Project {
  title: string;
  description: string;
  link: string;
}

export interface ReadmeData {
  version: 1;
  name: string;
  tagline: string;
  about: string;
  githubUsername: string;
  skills: string[];
  socials: SocialLink;
  projects: Project[];
  blocks: {
    intro: boolean;
    about: boolean;
    skills: boolean;
    socials: boolean;
    projects: boolean;
    stats: boolean;
    visitors: boolean;
    since: boolean;
  };
}


