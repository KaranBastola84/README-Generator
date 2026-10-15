import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-surface border-t border-outline-variant/80 relative z-20">
      <div className="w-full px-margin py-6 md:py-8 md:px-margin-desktop">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 font-body-sm text-body-sm text-on-surface-variant">
          <div className="flex items-center gap-1.5">
            <Heart size={13} className="text-primary fill-primary/20" />
            <span className="font-code text-[11px] uppercase text-primary font-bold">
              Made with
            </span>
            <span className="font-code text-[11px] uppercase text-primary font-bold">
              ♡
            </span>
            <a
              href="https://github.com/KaranBastola84"
              rel="noopener noreferrer"
              target="_blank"
              className="font-code text-[11px] uppercase text-primary font-bold hover:underline"
            >
              Karan Bastola
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
