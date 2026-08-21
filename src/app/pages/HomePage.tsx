import { Link } from "react-router";
import {
  ArrowRight,
  Phone,
  Mail,
} from "lucide-react";
import { Animate } from "../components/Animate";
import { useLanguage, useSite } from "../lib/useLanguage";
import ec6Hero from "../../assets/ec6-hero-new.png";

export function HomePage() {
  const { t, lang, tk } = useLanguage();
  const { email, mailto, phone, tel, company } = useSite();
  return (
    <div>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section
        id="ec6"
        className="relative overflow-hidden grain lg:min-h-[calc(100svh-81px)] flex items-start"
      >
        {/* Decorative curve — desktop only */}
        <svg
          className="hero-curve absolute inset-0 w-full h-full pointer-events-none z-30 hidden lg:block"
          viewBox="0 0 1600 900"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4157FF" stopOpacity="0.06" />
              <stop offset="40%" stopColor="#4157FF" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#01CEF4" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <path
            d="M 0 740 Q 400 240 1550 275"
            fill="none"
            stroke="url(#heroGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>

        {/* ── MOBILE hero (< lg) ── */}
        <div className="relative z-10 w-full lg:hidden flex flex-col">
          {/* Car image — prominent at top */}
          <div className="relative w-full bg-gradient-to-b from-white to-[#F5F5F2] px-4 pt-4 pb-0">
            <img
              src={ec6Hero}
              alt="De Citroën C6électrique"
              className="w-full max-w-[380px] mx-auto h-auto object-contain drop-shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
            />
            {/* Accent line under car */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#4157FF] to-[#01CEF4] opacity-50" />
          </div>

          {/* Content */}
          <div className="px-5 pt-6 pb-8">
            <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#989896] mb-4 font-medium">
              <span className="w-4 h-[1.5px] bg-[#4157FF] rounded-full" />
              {company}
            </span>

            <h1 className="text-[28px] leading-[1.1] mb-4 whitespace-pre-line">
              {tk("home.hero.title",
                "Elektrisch rijden\nnu een Tesla\neigenlijk niet meer kan.",
                "Electric driving\nnow that a Tesla\nno longer really cuts it.")}
            </h1>

            <p className="text-[15px] text-[#4C4C4B] mb-6 leading-relaxed">
              {tk("home.hero.subtitle",
                "De Citroën C6 100% elektrisch: C6électrique, de juiste manier om een impact te maken.",
                "The Citroën C6, 100% electric: C6électrique, the right way to make an impact.")}
            </p>

            <div className="flex gap-3 mb-6">
              <Link to="/verhaal" className="btn-primary text-[14px] py-3 px-5 flex-1 justify-center">
                {tk("home.hero.cta_primary", "Ontdek de C6électrique", "Discover the C6électrique")}
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>
              <Link to="/nieuwsbrief" className="btn-outline text-[14px] py-3 px-5 flex-1 justify-center">
                {t("Nieuwsbrief", "Newsletter")}
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-[12px] text-[#989896]">
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#4157FF]" />
                {tk("home.hero.feature1", "Authentiek design", "Authentic design")}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#4157FF]" />
                {tk("home.hero.feature2", "100% elektrisch", "100% electric")}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#4157FF]" />
                {tk("home.hero.feature3", "Geen compromissen", "No compromises")}
              </span>
            </div>
          </div>
        </div>

        {/* ── DESKTOP hero (lg+) ── */}
        <div className="relative z-10 w-full max-w-[1800px] mx-auto px-10 2xl:px-20 pt-16 pb-12 flex-1 items-center hidden lg:flex">
          <div className="w-full grid grid-cols-[1fr_1.15fr] gap-16 2xl:gap-24 items-center">
            <div>
              <Animate>
                <span className="inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.2em] text-[#989896] mb-6 font-medium">
                  <span className="w-5 h-[1.5px] bg-[#4157FF] rounded-full" />
                  {tk("home.hero.eyebrow", "C6electrique B.V. presenteert", "C6electrique B.V. presents")}
                </span>
              </Animate>

              <Animate delay={100}>
                <h1 className="mb-6 text-[56px] 2xl:text-[72px] whitespace-pre-line">
                  {tk("home.hero.title",
                    "Elektrisch rijden\nnu een Tesla\neigenlijk niet meer kan.",
                    "Electric driving\nnow that a Tesla\nno longer really cuts it.")}
                </h1>
              </Animate>

              <Animate delay={200}>
                <p className="text-lg 2xl:text-xl text-[#4C4C4B] mb-8 max-w-[440px] 2xl:max-w-[520px] leading-relaxed">
                  {tk("home.hero.subtitle",
                    "De Citroën C6 100% elektrisch: C6électrique, de juiste manier om een impact te maken.",
                    "The Citroën C6, 100% electric: C6électrique, the right way to make an impact.")}
                </p>
              </Animate>

              <Animate delay={300}>
                <div className="flex flex-wrap gap-3 mb-12">
                  <Link to="/verhaal" className="btn-primary">
                    {tk("home.hero.cta_primary", "Ontdek de C6électrique", "Discover the C6électrique")}
                    <ArrowRight className="w-4 h-4" strokeWidth={2} />
                  </Link>
                  <Link to="/nieuwsbrief" className="btn-outline">
                    {tk("home.hero.cta_secondary", "Blijf op de hoogte", "Stay updated")}
                  </Link>
                </div>
              </Animate>

              <Animate delay={400}>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-[#989896]">
                  <span className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#4157FF]" />
                    {tk("home.hero.feature1", "Authentiek design", "Authentic design")}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#4157FF]" />
                    {tk("home.hero.feature2", "100% elektrisch", "100% electric")}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#4157FF]" />
                    {tk("home.hero.feature3", "Geen compromissen", "No compromises")}
                  </span>
                </div>
              </Animate>
            </div>

            <Animate delay={200}>
              <div className="relative flex items-end justify-center pt-32 2xl:pt-24">
                <img
                  src={ec6Hero}
                  alt="De Citroën C6électrique, 100% elektrisch"
                  className="relative w-full max-w-[720px] 2xl:max-w-[860px] h-auto object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.15)] img-luxe"
                />
              </div>
            </Animate>
          </div>
        </div>

        {/* Side widget — desktop only */}
        <div className="hidden xl:block absolute top-16 right-10 z-20 w-[280px]">
          <Link
            to="/nieuwsbrief"
            className="block card-glass rounded-2xl p-6 card-hover group"
          >
            <h3 className="text-[#1E1E1C] text-[18px] leading-snug mb-4">
              {tk("home.widget.title", "Wil je op de hoogte blijven?", "Want to stay updated?")}
            </h3>
            <span className="inline-flex items-center gap-2 text-[13px] font-medium text-[#1E1E1C] group-hover:text-[#4157FF] transition-colors">
              {tk("home.widget.cta", "Schrijf je in", "Sign up")}
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
            </span>
          </Link>
        </div>
      </section>

      {/* ── STORY TEASER ─────────────────────────────────── */}
      <section className="py-16 lg:py-24 grain relative">
        <div className="relative z-10 max-w-[1100px] mx-auto px-6 lg:px-10">
          <Animate>
          <Link
            to="/verhaal"
            className="group block relative rounded-[24px] bg-white border border-[#EAEAE7] p-8 lg:p-12 card-hover"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-14">
              <div className="flex-1 min-w-0">
                <span className="inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.2em] text-[#989896] mb-3 font-medium">
                  <span className="w-5 h-[1.5px] bg-[#4157FF] rounded-full" />
                  {tk("home.story.eyebrow", "Ons verhaal", "Our story")}
                </span>
                <h2 className="text-[28px] lg:text-[34px] leading-[1.15] mb-3">
                  {tk("home.story.title", "Een klassieker, aangedreven door de toekomst", "A classic, powered by the future")}
                </h2>
                <p className="text-[#989896] text-[16px] max-w-lg">
                  {tk("home.story.subtitle",
                    "Hoe onze passie voor circulariteit en elektrisch rijden leidde tot de C6électrique, stil, snel en volledig elektrisch.",
                    "How our passion for circularity and electric driving led to the C6électrique, silent, fast and fully electric.")}
                </p>
              </div>
              <div className="flex items-center gap-3 text-[#1E1E1C] font-medium shrink-0 group-hover:text-[#4157FF] group-hover:translate-x-1 transition-all text-[15px]">
                <span>{tk("home.story.cta", "Lees ons verhaal", "Read our story")}</span>
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </div>
            </div>
          </Link>
          </Animate>
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────── */}
      <section id="contact" className="py-16 lg:py-24 bg-[#FAFAF9] grain relative">
        <div className="relative z-10 max-w-[1100px] mx-auto px-6 lg:px-10">
          <Animate>
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.2em] text-[#989896] mb-3 font-medium justify-center">
                <span className="w-5 h-[1.5px] bg-[#4157FF] rounded-full" />
                Contact
              </span>
              <h2>{tk("home.contact.title", "Neem contact op", "Get in touch")}</h2>
            </div>
          </Animate>

          <Animate delay={150}>
          <div className="bg-white rounded-[24px] p-8 lg:p-14 card-soft">
            <div className="text-center mb-10">
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#989896] mb-1 font-medium">
                {company}
              </div>
              <h3 className="text-[26px] font-medium">René Savelsberg</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href={tel}
                className="flex items-center gap-4 bg-[#FAFAF9] hover:bg-[#1E1E1C] hover:text-white rounded-2xl p-5 transition-all duration-300 group card-hover"
              >
                <div className="w-11 h-11 rounded-full bg-white border border-[#EAEAE7] flex items-center justify-center shrink-0 group-hover:bg-white/10 group-hover:border-white/10 transition-colors">
                  <Phone className="w-4 h-4 text-[#1E1E1C] group-hover:text-white transition-colors" strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-wider text-[#989896] group-hover:text-white/50 transition-colors">
                    {t("Mobiel", "Mobile")}
                  </div>
                  <div className="text-[#1E1E1C] group-hover:text-white font-medium text-[15px] truncate transition-colors">
                    {phone}
                  </div>
                </div>
              </a>

              <a
                href={mailto}
                className="flex items-center gap-4 bg-[#FAFAF9] hover:bg-[#1E1E1C] hover:text-white rounded-2xl p-5 transition-all duration-300 group card-hover"
              >
                <div className="w-11 h-11 rounded-full bg-white border border-[#EAEAE7] flex items-center justify-center shrink-0 group-hover:bg-white/10 group-hover:border-white/10 transition-colors">
                  <Mail className="w-4 h-4 text-[#1E1E1C] group-hover:text-white transition-colors" strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-wider text-[#989896] group-hover:text-white/50 transition-colors">
                    {t("E-mail", "Email")}
                  </div>
                  <div className="text-[#1E1E1C] group-hover:text-white font-medium text-[15px] truncate transition-colors">
                    {email}
                  </div>
                </div>
              </a>

              <Link
                to="/nieuwsbrief"
                className="flex items-center gap-4 bg-[#FAFAF9] hover:bg-[#1E1E1C] hover:text-white rounded-2xl p-5 transition-all duration-300 group card-hover"
              >
                <div className="w-11 h-11 rounded-full bg-white border border-[#EAEAE7] flex items-center justify-center shrink-0 group-hover:bg-white/10 group-hover:border-white/10 transition-colors">
                  <ArrowRight className="w-4 h-4 text-[#1E1E1C] group-hover:text-white transition-colors" strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-wider text-[#989896] group-hover:text-white/50 transition-colors">
                    {t("Nieuwsbrief", "Newsletter")}
                  </div>
                  <div className="text-[#1E1E1C] group-hover:text-white font-medium text-[15px] truncate transition-colors">
                    {t("Schrijf je in", "Sign up")}
                  </div>
                </div>
              </Link>
            </div>

            <Link
              to="/contact"
              className="btn-primary w-full justify-center mt-6 py-4"
            >
              {tk("home.contact.button", "Stuur een bericht", "Send a message")}
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </Link>
          </div>
          </Animate>
        </div>
      </section>
    </div>
  );
}
