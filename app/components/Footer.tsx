import { GitFork, ArrowUpRight, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-surface border-t border-outline-variant/80 relative z-20">
      <div className="w-full px-margin py-6 md:py-8 md:px-margin-desktop">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 font-body-sm text-body-sm text-on-surface-variant">
          <div className="flex items-center gap-1.5">
            <Heart size={13} className="text-primary fill-primary/20" />
            <span className="font-code text-[11px] uppercase text-primary font-bold">
              GitCraft Engine
            </span>
            <span>© Karan Bastola.</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              className="hover:text-primary transition-colors flex items-center gap-1"
              href="https://github.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <GitFork size={15} />
              Repository
            </a>
            <a
              className="hover:text-primary transition-colors flex items-center gap-1"
              href="https://karanbastola.com.np/tools"
              rel="noopener noreferrer"
              target="_blank"
            >
              More Tools
              <ArrowUpRight size={13} className="ml-0.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
