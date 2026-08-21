import { Logo } from "./Logo";
import { useSite } from "../lib/useLanguage";

export function Footer() {
  const { email, mailto, phone, tel, url, urlHref, company } = useSite();
  return (
    <footer className="bg-[#1E1E1C] text-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <Logo tone="light" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 lg:gap-6 text-sm text-white/60">
            <a
              href={mailto}
              className="hover:text-white transition-colors"
            >
              {email}
            </a>
            <a
              href={tel}
              className="hover:text-white transition-colors"
            >
              {phone}
            </a>
            <a
              href={urlHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              {url}
            </a>
          </div>

          <div className="text-xs text-white/40">
            © {new Date().getFullYear()} {company}
          </div>
        </div>

        {/* Outlight Systems credit */}
        <div className="mt-6 pt-6 border-t border-white/5 text-center text-[11px] text-white/30">
          Made by{" "}
          <a
            href="https://outlightsystems.nl"
            target="_blank"
            rel="noopener"
            className="text-white/50 hover:text-white transition-colors"
          >
            outlightsystems.nl
          </a>
        </div>
      </div>
    </footer>
  );
}
