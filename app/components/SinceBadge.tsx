import { Terminal, Copy } from "lucide-react";

export default function SinceBadge() {
  return (
    <section
      className="w-full px-margin md:px-margin-desktop py-space-xl bg-surface-container-low/80 relative overflow-hidden border-b border-outline-variant/60"
      id="since-badge"
    >
      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          {/* Left: copy & explanations */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="font-code text-label-sm text-primary uppercase tracking-widest mb-1 flex items-center gap-2">
              <span className="inline-block w-2.5 h-0.5 bg-primary" />
              <span>SIGNATURE INNOVATION</span>

            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
              The “GitHub Since” Badge
            </h2>
            <p className="font-body-lg text-body-lg text-secondary mt-space-sm leading-relaxed">
              Proof of tenure matters in technical ecosystems. Generate a dynamic,
              vectorized badge highlighting exactly how long you&apos;ve been
              contributing to open source. Updated automatically without rebuilding
              your repository.
            </p>

            {/* 4-formats matrix */}
            <div className="mt-space-lg grid grid-cols-2 gap-space-sm">
              <FormatCard label="Format: Year" value="Since 2021" />
              <FormatCard label="Format: Duration" value="3y 4m" highlight />
              <FormatCard label="Format: Full" value="3 years, 4 months" />
              <FormatCard label="Format: Days" value="1,218 days" />
            </div>
          </div>

          {/* Right: interactive SVG preview card */}
          <div className="lg:col-span-6 bg-surface-container-lowest rounded-xl p-space-lg border border-outline-variant/80 shadow-md card-tactile relative">
            {/* Decorative corner brackets */}
            <span className="absolute top-2 left-2 font-code text-xs text-primary/40">┌</span>
            <span className="absolute top-2 right-2 font-code text-xs text-primary/40">┐</span>
            <span className="absolute bottom-2 left-2 font-code text-xs text-primary/40">└</span>
            <span className="absolute bottom-2 right-2 font-code text-xs text-primary/40">┘</span>

            <div className="flex items-center justify-between pb-space-sm mb-space-md border-b border-outline-variant/40">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                <span className="font-code text-label-sm text-on-surface font-semibold uppercase">
                  Badge Output Simulator
                </span>
              </div>
            </div>

            {/* Live SVG visual showcase */}
            <div className="py-space-xl bg-surface/80 border border-outline-variant/50 flex flex-col items-center justify-center rounded gap-space-md relative overflow-hidden">
              <div className="absolute inset-0 grid-pattern-matrix opacity-40 pointer-events-none" />

              {/* Primary badge representation */}
              <div className="inline-flex items-center rounded overflow-hidden shadow-sm border border-secondary/30 relative z-10 hover:scale-105 transition-transform cursor-pointer">
                <div className="bg-secondary px-4 py-2 text-on-primary font-code text-label-md font-semibold tracking-wider flex items-center gap-1.5">
                  <Terminal size={16} />
                  GITHUB SINCE
                </div>
                <div className="bg-primary px-4 py-2 text-on-primary font-code text-label-md font-bold">
                  2021 • 3y 4m
                </div>
              </div>

              {/* Alternative compact badge */}
              <div className="inline-flex items-center rounded overflow-hidden shadow-sm border border-outline-variant/80 relative z-10 hover:scale-105 transition-transform cursor-pointer">
                <div className="bg-on-surface px-3 py-1.5 text-surface-container-lowest font-code text-label-sm font-semibold tracking-wider">
                  CONTRIBUTOR
                </div>
                <div className="bg-primary-container px-3 py-1.5 text-on-primary font-code text-label-sm font-bold">
                  1,218 DAYS
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function FormatCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="p-space-sm bg-surface-container-lowest rounded border border-outline-variant/60 card-tactile">
      <span className="font-label-sm text-label-sm uppercase text-secondary font-semibold block">
        {label}
      </span>
      <span
        className={`font-code text-body-md font-bold mt-1 block ${
          highlight ? "text-primary" : "text-on-surface"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
