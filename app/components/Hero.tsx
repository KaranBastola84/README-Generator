import { Terminal, ExternalLink, CheckCircle, Shield, Download, Check } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full px-margin md:px-margin-desktop pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden border-b border-outline-variant/50">
      {/* Ambient light glows behind hero */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[480px] bg-gradient-to-tr from-sky-200/40 via-primary-fixed/30 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
         {/* Straw Hat captain silhouette — left accent (xl+) */}
      <div className="absolute -left-12 top-1/4 w-64 h-64 pointer-events-none hidden xl:block opacity-45 animate-float">
        <svg
          className="w-full h-full text-primary/40 animate-spin-slow"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          viewBox="0 0 200 200"
        >
          {/* Hat brim — wide ellipse */}
          <ellipse cx="100" cy="130" rx="88" ry="14" strokeWidth="1.2" />
          {/* Crown / body of the hat — trapezoid bucket shape */}
          <path
            d="M 40 130
               L 48 78
               Q 50 70 58 68
               L 142 68
               Q 150 70 152 78
               L 160 130"
            strokeWidth="1.5"
          />
          {/* Top opening ellipse */}
          <ellipse cx="100" cy="68" rx="50" ry="9" strokeWidth="1.2" />
          {/* Stitch / seam detail across the crown */}
          <path
            d="M 58 88 L 142 88"
            strokeWidth="0.8"
            strokeDasharray="3 3"
          />
          <path
            d="M 56 100 L 144 100"
            strokeWidth="0.8"
            strokeDasharray="2 4"
          />
          {/* Ribbon / strap band across the hat */}
          <path
            d="M 48 108 L 152 108"
            strokeWidth="1.1"
          />
          {/* Small crosshair detail on the hat front */}
          <circle cx="100" cy="98" r="3" fill="currentColor" stroke="none" />
          {/* Subtle brim edge tick marks */}
          <line strokeWidth="0.7" x1="52" x2="48" y1="130" y2="130" />
          <line strokeWidth="0.7" x1="148" x2="152" y1="130" y2="130" />
        </svg>
        <span className="font-code text-[9px] text-outline absolute -bottom-2 left-6 tracking-widest">
          [ STRaw HAT // CAPTAIN ]
        </span>
      </div>

      {/* Straw Hat — elevated rotated view, right accent (xl+) */}
      <div className="absolute -right-12 top-1/3 w-72 h-72 pointer-events-none hidden xl:block opacity-45 animate-float-delayed">
        <svg
          className="w-full h-full text-tertiary/40 animate-reverse-spin"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          viewBox="0 0 200 200"
        >
          {/* Tilted brim ellipse — shows 3D perspective */}
          <ellipse
            cx="100"
            cy="120"
            rx="90"
            ry="16"
            strokeWidth="1.1"
            transform="rotate(-12 100 120)"
          />
          {/* Crown — drawn slightly tilted */}
          <path
            d="M 38 120
               L 46 74
               Q 48 66 56 64
               L 144 64
               Q 152 66 154 74
               L 162 120"
            strokeWidth="1.5"
            transform="rotate(-12 100 92)"
          />
          {/* Top opening — perspective ellipse */}
          <ellipse
            cx="100"
            cy="64"
            rx="48"
            ry="9"
            strokeWidth="1.2"
            transform="rotate(-12 100 64)"
          />
          {/* Stitch seams */}
          <path
            d="M 56 84 L 144 84"
            strokeWidth="0.8"
            strokeDasharray="3 3"
            transform="rotate(-12 100 84)"
          />
          <path
            d="M 54 96 L 146 96"
            strokeWidth="0.8"
            strokeDasharray="2 4"
            transform="rotate(-12 100 96)"
          />
          {/* Ribbon band */}
          <path
            d="M 46 104 L 154 104"
            strokeWidth="1.1"
            transform="rotate(-12 100 104)"
          />
          {/* Center crosshair on front */}
          <circle cx="100" cy="94" r="3" fill="currentColor" stroke="none" transform="rotate(-12 100 94)" />
          {/* Brim tick marks */}
          <line strokeWidth="0.7" x1="50" x2="46" y1="120" y2="120" transform="rotate(-12 100 120)" />
          <line strokeWidth="0.7" x1="150" x2="154" y1="120" y2="120" transform="rotate(-12 100 120)" />
        </svg>
        <span className="font-code text-[9px] text-outline absolute -bottom-2 right-6 tracking-widest">
          [ KING OF THE PIRATES ]
        </span>
      </div>

      {/* Centered hero content */}
      <div className="relative max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Tactile status pill */}
        

        {/* Main headline */}
        <div className="relative">
          {/* Architectural corner crosshairs (desktop) */}
          <span className="hidden md:block absolute -top-4 -left-8 font-code text-xs text-primary/40">
            ┌──
          </span>
          <span className="hidden md:block absolute -top-4 -right-8 font-code text-xs text-primary/40">
            ──┐
          </span>
          <span className="hidden md:block absolute -bottom-3 -left-8 font-code text-xs text-primary/40">
            └──
          </span>
          <span className="hidden md:block absolute -bottom-3 -right-8 font-code text-xs text-primary/40">
            ──┘
          </span>

          <h1 className="font-display text-display text-on-surface tracking-tight max-w-4xl font-extrabold sm:text-[54px] sm:leading-[62px]">
            Build Your GitHub Profile README.
            <br className="hidden sm:inline" />
            <span className="relative inline-block text-primary">
              Live as You Type.
              {/* Underline geometric hatch */}
              <span className="absolute left-0 -bottom-1 w-full h-1 bg-gradient-to-r from-primary via-primary-container to-tertiary rounded-full opacity-80" />
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="mt-space-md max-w-2xl font-body-lg text-body-lg text-secondary leading-relaxed">
          No Markdown knowledge required. Fill the modular form, preview changes
          in real time, generate your custom “GitHub Since” badge,
          and copy valid CommonMark with zero lock-in.
        </p>

        {/* High-contrast CTAs */}
        <div className="mt-space-xl flex flex-wrap items-center justify-center gap-space-md">
          <a
            className="relative group inline-flex items-center gap-space-xs px-space-xl py-3.5 bg-on-surface hover:bg-primary text-surface-container-lowest font-body-md text-body-md rounded shadow-sm hover:shadow-md transition-all duration-150"
            href="#workbench"
          >
            <span className="absolute -top-1 -left-1 text-[9px] text-primary-fixed font-code leading-none group-hover:scale-125 transition-transform">
              ┌
            </span>
            <span className="absolute -bottom-1 -right-1 text-[9px] text-primary-fixed font-code leading-none group-hover:scale-125 transition-transform">
              ┘
            </span>
            <span className="font-medium">Start Crafting</span>
            <Terminal size={18} />
          </a>

         
        </div>

        {/* Micro-reassurance row */}
        <div className="mt-space-lg flex flex-wrap items-center justify-center gap-y-2 gap-x-space-lg text-secondary font-label-md text-label-md uppercase tracking-wider">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface/70 border border-outline-variant/40">
            <CheckCircle size={15} className="text-primary" />
            <span>100% Free forever</span>
          </div>
          <div className="hidden sm:block text-outline-variant font-code text-xs">+</div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface/70 border border-outline-variant/40">
            <Shield size={15} className="text-primary" />
            <span>Zero user tracking & no database</span>
          </div>
          <div className="hidden sm:block text-outline-variant font-code text-xs">+</div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface/70 border border-outline-variant/40">
            <Download size={15} className="text-primary" />
            <span>Instant Markdown & .md download</span>
          </div>
        </div>
      </div>
    </section>
  );
}
