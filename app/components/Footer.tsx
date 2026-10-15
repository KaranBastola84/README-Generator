import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#726c6c] border-t border-white/10 relative z-20">
      <div className="w-full px-margin py-6 md:py-8 md:px-margin-desktop">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3  font-body-md text-white">
          <div className="flex items-center gap-2">
            <span className="font-code text-lg uppercase tracking-wide font-bold">
              Made with
            </span>
            <Heart size={16} className="text-[#] fill-[#e53e3e]/30" />
            <a
              href="https://github.com/KaranBastola84"
              rel="noopener noreferrer"
              target="_blank"
              className="font-code text-lg uppercase tracking-wide font-bold"
            >
              Karan Bastola
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
