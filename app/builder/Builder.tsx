"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Terminal } from "lucide-react";
import { createDefaultData, type ReadmeData } from "@/lib/types";
import { generateMarkdown } from "@/lib/generateMarkdown";

type SectionKey = keyof ReadmeData["blocks"];
type MobileTab = "edit" | "preview";

/**
 * Only sections that have a block in `lib/blocks` are listed here, so every
 * switch changes the Markdown. Stats, visitors and the "since" badge get a
 * switch when their blocks exist.
 */
const SECTIONS: ReadonlyArray<{
  key: SectionKey;
  label: string;
  hint: string;
}> = [
  {
    key: "intro",
    label: "Intro",
    hint: "Name and tagline as the README title.",
  },
  { key: "about", label: "About", hint: "The ## About section." },
  { key: "skills", label: "Skills", hint: "The ## Skills list." },
  { key: "socials", label: "Connect", hint: "The ## Connect links." },
  {
    key: "projects",
    label: "Featured Projects",
    hint: "The ## Featured Projects list.",
  },
];

export default function Builder() {
  const [data, setData] = useState<ReadmeData>(createDefaultData);
  const [tab, setTab] = useState<MobileTab>("edit");

  const markdown = useMemo(() => generateMarkdown(data), [data]);

  function setText(field: "name" | "tagline" | "about", value: string) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  function toggleSection(key: SectionKey) {
    setData((prev) => ({
      ...prev,
      blocks: { ...prev.blocks, [key]: !prev.blocks[key] },
    }));
  }

  return (
    <div className="min-h-screen w-full bg-ink-bg font-sans text-ink-text">
      <div
        className="pointer-events-none fixed inset-0 z-0 grid-pattern-ink opacity-60"
        aria-hidden="true"
      />

      <header className="sticky top-0 z-30 border-b border-ink-line bg-ink-bg/90 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-margin md:px-margin-desktop">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-control px-1 py-1 font-mono text-xs uppercase tracking-widest text-ink-muted transition-colors hover:text-ink-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink-bg"
          >
            <Terminal size={16} aria-hidden="true" />
            GitCraft
          </Link>
          <span className="font-mono text-xs uppercase tracking-widest text-ink-dim">
            profile-readme.md
          </span>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-6xl px-margin py-space-lg md:px-margin-desktop md:py-space-xl">
        <div className="max-w-2xl">
          <p className="mb-2 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-accent">
            <span className="inline-block h-0.5 w-2.5 bg-ink-accent" />
            Workbench
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-ink-text">
            Build your profile README
          </h1>
          <p className="mt-space-sm max-w-2xl text-base leading-relaxed text-ink-muted">
            Fill in the basics and switch sections on or off. The Markdown panel
            updates as you type — nothing is sent anywhere.
          </p>
        </div>

        {/* Mobile view switch (FR-12) */}
        <div className="mt-space-lg md:hidden">
          <div
            role="group"
            aria-label="Builder view"
            className="grid grid-cols-2 gap-1 rounded-control border border-ink-line bg-ink-surface p-1"
          >
            <TabButton
              selected={tab === "edit"}
              onClick={() => setTab("edit")}
            >
              Edit
            </TabButton>
            <TabButton
              selected={tab === "preview"}
              onClick={() => setTab("preview")}
            >
              Preview
            </TabButton>
          </div>
        </div>

        <div className="mt-space-md grid items-start gap-space-md md:mt-space-xl md:grid-cols-2">
          {/* Edit panel */}
          <section
            aria-label="README fields"
            className={`overflow-hidden rounded-panel border border-ink-line bg-ink-surface ${
              tab === "preview" ? "hidden md:block" : "block"
            }`}
          >
            <PanelHeader index="01" title="Basics" />

            <div className="space-y-space-md px-space-md py-space-md md:px-space-lg">
              <Field
                id="field-name"
                label="Name"
                hint="Used as the README heading."
              >
                <input
                  id="field-name"
                  type="text"
                  value={data.name}
                  maxLength={120}
                  autoComplete="name"
                  onChange={(e) => setText("name", e.target.value)}
                  placeholder="Ada Lovelace"
                  className={inputClass}
                />
              </Field>

              <Field
                id="field-tagline"
                label="Tagline"
                hint="One line under the heading."
              >
                <input
                  id="field-tagline"
                  type="text"
                  value={data.tagline}
                  maxLength={120}
                  onChange={(e) => setText("tagline", e.target.value)}
                  placeholder="Backend developer · Rust and TypeScript"
                  className={inputClass}
                />
              </Field>

              <Field
                id="field-about"
                label="About"
                hint="Markdown is allowed here."
              >
                <textarea
                  id="field-about"
                  value={data.about}
                  rows={8}
                  onChange={(e) => setText("about", e.target.value)}
                  placeholder={
                    "I build small tools that solve my own problems.\n\n- Currently learning Go\n- Based in Kathmandu"
                  }
                  className={`${inputClass} resize-y leading-relaxed`}
                />
              </Field>
            </div>

            <div className="border-t border-ink-line">
              <PanelHeader index="02" title="Sections" />
              <div className="px-space-md pb-space-md md:px-space-lg">
                <ul>
                  {SECTIONS.map((section) => {
                    const enabled = data.blocks[section.key];
                    const labelId = `section-${section.key}-label`;
                    return (
                      <li
                        key={section.key}
                        className="flex items-start justify-between gap-space-md border-t border-ink-line py-3 first:border-t-0 first:pt-1"
                      >
                        <div className="min-w-0">
                          <p
                            id={labelId}
                            className="text-sm font-medium text-ink-text"
                          >
                            {section.label}
                          </p>
                          <p className="text-xs text-ink-muted">
                            {section.hint}
                          </p>
                        </div>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={enabled}
                          aria-labelledby={labelId}
                          onClick={() => toggleSection(section.key)}
                          className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink-surface ${
                            enabled
                              ? "border-ink-accent bg-ink-accent"
                              : "border-ink-line-strong bg-ink-raised"
                          }`}
                        >
                          <span
                            aria-hidden="true"
                            className={`inline-block h-4 w-4 rounded-full shadow-sm transition-transform ${
                              enabled
                                ? "translate-x-6 bg-ink-on-accent"
                                : "translate-x-1 bg-ink-muted"
                            }`}
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-space-sm border-t border-ink-line pt-space-sm text-xs text-ink-dim">
                  Sections with no content are left out of the output.
                </p>
              </div>
            </div>
          </section>

          {/* Markdown panel */}
          <section
            aria-label="Raw Markdown output"
            className={`overflow-hidden rounded-panel border border-ink-line bg-ink-surface md:sticky md:top-20 ${
              tab === "edit" ? "hidden md:block" : "block"
            }`}
          >
            <div className="flex h-11 items-center justify-between gap-space-sm border-b border-ink-line bg-ink-raised/60 px-space-md md:px-space-lg">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-ink-text">
                Raw Markdown
              </h2>
              <span className="rounded-control border border-ink-line-strong px-2 py-0.5 font-mono text-xs uppercase tracking-widest text-ink-muted">
                README.md
              </span>
            </div>

            <div className="bg-ink-bg/60 px-space-md py-space-md md:px-space-lg">
              {markdown ? (
                <pre className="max-h-[62vh] overflow-auto whitespace-pre-wrap break-words font-mono text-xs leading-relaxed text-ink-text">
                  {markdown}
                </pre>
              ) : (
                <p className="py-space-lg text-sm text-ink-muted">
                  Nothing to show yet. Start with your name and tagline.
                </p>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

const inputClass =
  "w-full rounded-control border border-ink-line-strong bg-ink-bg px-3 py-2.5 text-sm text-ink-text placeholder:text-ink-dim focus:border-ink-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ink-accent/50";

function PanelHeader({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex h-11 items-center gap-space-sm border-b border-ink-line px-space-md md:px-space-lg">
      <span className="font-mono text-xs text-ink-dim">{index}</span>
      <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-ink-text">
        {title}
      </h2>
      <span className="h-px flex-1 bg-ink-line" aria-hidden="true" />
    </div>
  );
}

function Field({
  id,
  label,
  hint,
  children,
}: {
  id: string;
  label: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-medium text-ink-text"
      >
        {label}
      </label>
      {children}
      <p className="mt-1 text-xs text-ink-muted">{hint}</p>
    </div>
  );
}

function TabButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`rounded-control px-3 py-2 font-mono text-xs uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink-surface ${
        selected
          ? "bg-ink-accent text-ink-on-accent"
          : "text-ink-muted hover:text-ink-text"
      }`}
    >
      {children}
    </button>
  );
}
