import { useState } from "react";
import { Link } from "react-router";
import { Logo } from "./Logo";
import { Menu, X } from "lucide-react";
import { useLanguage } from "../lib/useLanguage";

export function Header() {
  const [open, setOpen] = useState(false);
  const { lang, setLang, t, tk } = useLanguage();

  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl backdrop-saturate-150 border-b border-black/[0.04]">
      <div className="max-w-[1800px] mx-auto px-5 lg:px-10 2xl:px-20 py-4 lg:py-5 flex items-center justify-between">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          <Link
            to="/#ec6"
            className="text-[14px] font-medium text-[#4C4C4B] hover:text-[#1E1E1C] transition-colors"
          >
            {tk("nav.ec6", "De C6électrique", "The C6électrique")}
          </Link>
          <Link
            to="/verhaal"
            className="text-[14px] font-medium text-[#4C4C4B] hover:text-[#1E1E1C] transition-colors"
          >
            {tk("nav.verhaal", "Ons verhaal", "Our story")}
          </Link>
          <Link
            to="/nieuwsbrief"
            className="text-[14px] font-medium text-[#4C4C4B] hover:text-[#1E1E1C] transition-colors"
          >
            {tk("nav.nieuwsbrief", "Nieuwsbrief", "Newsletter")}
          </Link>

          {/* Language toggle */}
          <div className="flex items-center gap-1 border border-[#EAEAE7] rounded-full p-0.5">
            <button
              onClick={() => setLang("nl")}
              className={`text-[11px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full transition-colors ${
                lang === "nl"
                  ? "bg-[#1E1E1C] text-white"
                  : "text-[#989896] hover:text-[#1E1E1C]"
              }`}
              aria-label="Nederlands"
            >
              NL
            </button>
            <button
              onClick={() => setLang("en")}
              className={`text-[11px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full transition-colors ${
                lang === "en"
                  ? "bg-[#1E1E1C] text-white"
                  : "text-[#989896] hover:text-[#1E1E1C]"
              }`}
              aria-label="English"
            >
              EN
            </button>
          </div>

          <a
            href="/contact"
            className="btn-primary text-[13px] py-2.5 px-6"
          >
            {tk("nav.contact", "Contact", "Contact")}
          </a>
        </nav>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-2">
          {/* Mini language toggle */}
          <div className="flex items-center gap-1 border border-[#EAEAE7] rounded-full p-0.5">
            <button
              onClick={() => setLang("nl")}
              className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full transition-colors ${
                lang === "nl" ? "bg-[#1E1E1C] text-white" : "text-[#989896]"
              }`}
              aria-label="Nederlands"
            >
              NL
            </button>
            <button
              onClick={() => setLang("en")}
              className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full transition-colors ${
                lang === "en" ? "bg-[#1E1E1C] text-white" : "text-[#989896]"
              }`}
              aria-label="English"
            >
              EN
            </button>
          </div>

          <button
            className="p-2 -mr-2"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? (
              <X className="w-5 h-5 text-[#1E1E1C]" strokeWidth={2} />
            ) : (
              <Menu className="w-5 h-5 text-[#1E1E1C]" strokeWidth={2} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-black/[0.04]">
          <nav className="flex flex-col px-5 py-4 gap-1">
            <Link
              to="/#ec6"
              className="py-3 text-[15px] font-medium text-[#1E1E1C]"
              onClick={() => setOpen(false)}
            >
              {tk("nav.ec6", "De C6électrique", "The C6électrique")}
            </Link>
            <Link
              to="/verhaal"
              className="py-3 text-[15px] font-medium text-[#1E1E1C]"
              onClick={() => setOpen(false)}
            >
              {tk("nav.verhaal", "Ons verhaal", "Our story")}
            </Link>
            <Link
              to="/nieuwsbrief"
              className="py-3 text-[15px] font-medium text-[#1E1E1C]"
              onClick={() => setOpen(false)}
            >
              {tk("nav.nieuwsbrief", "Nieuwsbrief", "Newsletter")}
            </Link>
            <a
              href="/contact"
              className="btn-primary justify-center mt-2 text-[14px]"
              onClick={() => setOpen(false)}
            >
              {tk("nav.contact", "Contact", "Contact")}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
