import { Link } from "react-router";
import { useLanguage } from "../lib/useLanguage";
import logoDefault from "../../assets/c6electrique-logo-new.png";

type LogoProps = {
  tone?: "dark" | "light";
};

export function Logo({ tone = "dark" }: LogoProps) {
  const { logo } = useLanguage();
  // Custom logo uit dashboard, anders het standaard (bundled) logo.
  const src = logo || logoDefault;

  return (
    <Link
      to="/"
      data-nav="home"
      aria-label="C6électrique — home"
      className="inline-flex items-center select-none shrink-0"
    >
      <img
        src={src}
        alt="C6électrique"
        className="h-9 lg:h-11 w-auto"
        draggable={false}
        // Op de donkere footer het logo wit maken (werkt voor elk geüpload logo).
        style={tone === "light" ? { filter: "brightness(0) invert(1)" } : undefined}
      />
    </Link>
  );
}
