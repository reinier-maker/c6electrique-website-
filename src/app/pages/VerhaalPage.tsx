import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, ArrowLeft, Sparkles, Zap, Leaf, Quote } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { Animate } from "../components/Animate";
import { useLanguage } from "../lib/useLanguage";
import ec6Hero from "../../assets/ec6-verhaal-hero.png";
import ec634 from "../../assets/ec6-34aanzicht.webp";
import ec6Zij from "../../assets/ec6-zijaanzicht.webp";
import ec6Onder from "../../assets/ec6-onderaanzicht.webp";
import ec6MissionE from "../../assets/ec6-mission-e.jpeg";
import ec6Werkplaats from "../../assets/ec6-werkplaats.jpeg";
import ec6DashboardRijdend from "../../assets/ec6-dashboard-rijdend.jpeg";
import ec6Instrumenten from "../../assets/ec6-instrumenten.jpeg";

function useHighlights() {
  const { tk } = useLanguage();
  return [
    {
      icon: Sparkles,
      title: tk("verhaal.highlights.h1_title", "Authentiek design", "Authentic design"),
      text: tk("verhaal.highlights.h1_text",
        "De tijdloze uitstraling van de Citroën C6 blijft volledig behouden.",
        "The timeless look of the Citroën C6 is fully preserved."),
    },
    {
      icon: Zap,
      title: tk("verhaal.highlights.h2_title", "Elektrische aandrijving", "Electric drivetrain"),
      text: tk("verhaal.highlights.h2_text",
        "Krachtig & duurzaam. Direct koppel, soepel vermogen, stil rijden.",
        "Powerful & sustainable. Instant torque, smooth power, silent driving."),
    },
    {
      icon: Leaf,
      title: tk("verhaal.highlights.h3_title", "Geen uitstoot", "Zero emissions"),
      text: tk("verhaal.highlights.h3_text",
        "Lokaal emissievrij rijden, zonder compromissen op comfort of luxe.",
        "Locally emission-free driving, without compromise on comfort or luxury."),
    },
  ];
}

type TechItem = { img: string; label: string; desc: string };

function TechCarousel({ items }: { items: TechItem[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <>
      <div className="hidden md:grid grid-cols-3 gap-5">
        {items.map((item, i) => (
          <Animate key={i} delay={i * 100}>
            <figure className="group bg-white rounded-2xl overflow-hidden border border-[#EAEAE7] hover:shadow-xl transition-all card-hover">
              <div className="aspect-[4/3] bg-white flex items-center justify-center p-4 overflow-hidden">
                <img src={item.img} alt={item.label} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
              </div>
              <figcaption className="px-6 py-4 border-t border-[#EAEAE7]">
                <div className="text-xs uppercase tracking-widest text-[#4157FF] font-semibold mb-1">{item.label}</div>
                <div className="text-sm text-[#4C4C4B]">{item.desc}</div>
              </figcaption>
            </figure>
          </Animate>
        ))}
      </div>

      <div className="md:hidden">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {items.map((item, i) => (
              <div key={i} className="shrink-0 grow-0 basis-[85%]">
                <figure className="bg-white rounded-2xl overflow-hidden border border-[#EAEAE7]">
                  <div className="aspect-[4/3] bg-white flex items-center justify-center p-4">
                    <img src={item.img} alt={item.label} className="w-full h-full object-contain" />
                  </div>
                  <figcaption className="px-5 py-3 border-t border-[#EAEAE7]">
                    <div className="text-xs uppercase tracking-widest text-[#4157FF] font-semibold mb-1">{item.label}</div>
                    <div className="text-sm text-[#4C4C4B]">{item.desc}</div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-1.5 rounded-full transition-all ${i === selected ? "w-6 bg-[#4157FF]" : "w-3 bg-[#CBCBC9]"}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}

// ── Reusable Quote block ──
function QuoteText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-[22px] lg:text-[28px] leading-[1.3] font-medium text-[#1E1E1C] tracking-tight ${className}`}>
      <span className="text-[#4157FF] mr-1">"</span>
      {children}
      <span className="text-[#4157FF] ml-0.5">"</span>
    </p>
  );
}

// ── Zigzag story block ──
type ZigzagBlock = {
  image: string;
  imageAlt: string;
  imageLabel?: string;
  quotes: string[];
  imageFirst?: boolean;
};

function ZigzagBlock({ image, imageAlt, imageLabel, quotes, imageFirst = true }: ZigzagBlock) {
  const displayed = quotes;
  const ImagePart = (
    <Animate>
      <div className="relative group overflow-hidden rounded-2xl lg:rounded-3xl bg-[#1E1E1C] aspect-[4/3]">
        <img
          src={image}
          alt={imageAlt}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        {imageLabel && (
          <div className="absolute bottom-4 left-4 text-white">
            <div className="text-[10px] uppercase tracking-widest text-white/70 font-medium">
              {imageLabel}
            </div>
          </div>
        )}
      </div>
    </Animate>
  );

  const QuotePart = (
    <div className="flex flex-col justify-center space-y-6">
      <Animate delay={100}>
        <Quote className="w-8 h-8 text-[#4157FF] opacity-60" strokeWidth={1.5} />
      </Animate>
      {displayed.map((q, i) => (
        <Animate key={i} delay={200 + i * 100}>
          <QuoteText>{q}</QuoteText>
        </Animate>
      ))}
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
      {imageFirst ? (
        <>
          {ImagePart}
          {QuotePart}
        </>
      ) : (
        <>
          <div className="lg:order-2">{ImagePart}</div>
          <div className="lg:order-1">{QuotePart}</div>
        </>
      )}
    </div>
  );
}

export function VerhaalPage() {
  const { t, tk } = useLanguage();
  const highlights = useHighlights();
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-white min-h-[calc(100svh-81px)] flex flex-col">
        <div className="absolute inset-0 pointer-events-none z-20">
          <svg
            className="hero-curve absolute inset-0 w-full h-full"
            viewBox="0 0 1600 700"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="vGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4157FF" stopOpacity="0.05" />
                <stop offset="50%" stopColor="#4157FF" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#01CEF4" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path
              d="M 0 550 Q 500 120 1600 180"
              fill="none"
              stroke="url(#vGrad)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="relative w-full max-w-[1400px] mx-auto px-6 lg:px-10 pt-6 lg:pt-10 pb-12 lg:pb-16 flex-1 flex flex-col">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-[#4C4C4B] hover:text-[#4157FF] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("Terug naar home", "Back to home")}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center flex-1">
            <div className="relative z-10">
              <Animate>
                <span className="inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.2em] text-[#989896] mb-5 font-medium">
                  <span className="w-5 h-[1.5px] bg-[#4157FF] rounded-full" />
                  {tk("verhaal.hero.eyebrow", "Ons verhaal", "Our story")}
                </span>
              </Animate>
              <Animate delay={100}>
                <h1 className="text-[#1E1E1C] font-medium leading-[1.05] text-[40px] lg:text-[60px] mb-6 whitespace-pre-line">
                  {(() => {
                    const title = tk("verhaal.hero.title",
                      "Een klassieker,\naangedreven door\nde toekomst",
                      "A classic,\npowered by\nthe future");
                    const lines = title.split("\n");
                    const last = lines.pop();
                    return (
                      <>
                        {lines.join("\n")}
                        {lines.length > 0 ? "\n" : ""}
                        <span className="text-[#4157FF]">{last}</span>
                      </>
                    );
                  })()}
                </h1>
              </Animate>
              <Animate delay={200}>
                <p className="text-lg lg:text-xl text-[#4C4C4B] max-w-lg">
                  {tk("verhaal.hero.subtitle",
                    "De Citroën C6 behoudt zijn tijdloze uitstraling, maar krijgt een hart dat klopt op de cadans van morgen.",
                    "The Citroën C6 keeps its timeless look, but gets a heart that beats to the rhythm of tomorrow.")}
                </p>
              </Animate>
            </div>

            <Animate delay={300}>
              <div className="relative">
                <img
                  src={ec6Hero}
                  alt="De Citroën C6électrique"
                  className="w-full max-w-[680px] h-auto object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
                />
              </div>
            </Animate>
          </div>
        </div>
      </section>

      {/* OPENER — 3 quotes */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[900px] mx-auto px-6 lg:px-10">
          <Animate>
            <span className="inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.2em] text-[#989896] mb-8 font-medium">
              <span className="w-5 h-[1.5px] bg-[#4157FF] rounded-full" />
              {tk("verhaal.opener.section_label", "Hoe het begon", "How it began")}
            </span>
          </Animate>
          <div className="space-y-8 lg:space-y-10">
            <Animate delay={100}>
              <QuoteText className="text-[28px] lg:text-[36px]">
                {tk("verhaal.opener.quote1",
                  "Niets rijdt beter dan elektrisch — maar dit moest anders dan alles wat er al was.",
                  "Nothing drives better than electric — but this had to be different from everything that came before.")}
              </QuoteText>
            </Animate>
            <Animate delay={200}>
              <p className="text-xl lg:text-2xl text-[#4C4C4B] leading-relaxed">
                {tk("verhaal.opener.quote2",
                  "Geen Chinees, geen Koreaan, geen gewone Europeaan. Een C6.",
                  "No Chinese, no Korean, no ordinary European. A C6.")}
              </p>
            </Animate>
            <Animate delay={300}>
              <p className="text-lg lg:text-xl text-[#4C4C4B] leading-relaxed">
                {tk("verhaal.opener.quote3",
                  "Lease afgekocht, blanco blad — en toen begon het avontuur.",
                  "Lease bought out, blank slate — and then the adventure began.")}
              </p>
            </Animate>
          </div>
        </div>
      </section>

      {/* ZIGZAG MIDDLE — alternating image + quotes */}
      <section className="py-14 lg:py-20 bg-[#FAFAF9]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 space-y-20 lg:space-y-28">
          <ZigzagBlock
            image={ec6Werkplaats}
            imageAlt="De C6électrique in de werkplaats"
            imageLabel={tk("verhaal.block1.label", "In de werkplaats", "In the workshop")}
            imageFirst={true}
            quotes={[
              tk("verhaal.block1.quote1",
                "Het enige uiterlijke verschil tussen die twee C6's is de uitlaat.",
                "The only visible difference between those two C6s is the exhaust."),
              tk("verhaal.block1.quote2",
                "De C6 blijft ook elektrisch een C6 — want daar begint het.",
                "The C6 remains a C6, even electric — because that's where it begins."),
            ]}
          />

          <ZigzagBlock
            image={ec6MissionE}
            imageAlt="Mission-E aandrijflijn onder de motorkap"
            imageLabel={tk("verhaal.block2.label", "Mission-E", "Mission-E")}
            imageFirst={false}
            quotes={[
              tk("verhaal.block2.quote1",
                "Geen one-off. Een verkoopbare propositie — dat was de lat.",
                "No one-off. A marketable proposition — that was the bar."),
              tk("verhaal.block2.quote2",
                "Gebruik wat er op de markt is, en maak er iets bijzonders van.",
                "Use what's available on the market, and turn it into something remarkable."),
              tk("verhaal.block2.quote3",
                "Specificaties gelijkwaardig aan een Model 3 of Y — in een auto uit 2006.",
                "Specifications equivalent to a Model 3 or Y — in a car from 2006."),
            ]}
          />

          <ZigzagBlock
            image={ec6Instrumenten}
            imageAlt="Instrumentenpaneel van de C6électrique"
            imageLabel={tk("verhaal.block3.label", "In het interieur", "In the interior")}
            imageFirst={true}
            quotes={[
              tk("verhaal.block3.quote1",
                "Dit project is niet alleen een vervanging van een aandrijving, maar een integratie met de ziel van de auto.",
                "This project isn't just a drivetrain replacement — it's an integration with the soul of the car."),
              tk("verhaal.block3.quote2",
                "Sensoren, software en computers in overvloed — herbouwen is geen sinecure.",
                "Sensors, software and computers in abundance — rebuilding is no small feat."),
            ]}
          />
        </div>
      </section>

      {/* STATS */}
      <section className="py-14 lg:py-20">
        <div className="max-w-[820px] mx-auto px-6 lg:px-10">
          <Animate>
            <div className="grid grid-cols-3 gap-6 py-8 border-y border-[#EAEAE7]">
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-[#4157FF]">0</div>
                <div className="text-xs text-[#989896] uppercase tracking-wide mt-2">{t("Emissie", "Emission")}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-[#4157FF]">100%</div>
                <div className="text-xs text-[#989896] uppercase tracking-wide mt-2">{t("Elektrisch", "Electric")}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-[#4157FF]">∞</div>
                <div className="text-xs text-[#989896] uppercase tracking-wide mt-2">{t("Karakter", "Character")}</div>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* TECH GALLERY — X-ray renders */}
      <section className="py-14 lg:py-20 bg-[#FAFAF9]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Animate>
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.2em] text-[#989896] mb-3 font-medium justify-center">
                <span className="w-5 h-[1.5px] bg-[#4157FF] rounded-full" />
                {tk("verhaal.tech.eyebrow", "Techniek in beeld", "Engineering in view")}
              </span>
              <h2 className="text-[#1E1E1C]">{tk("verhaal.tech.title", "Onder de huid van de C6électrique", "Under the skin of the C6électrique")}</h2>
            </div>
          </Animate>

          <TechCarousel items={[
            { img: ec634, label: "3/4 aanzicht", desc: "Batterijpakket en aandrijflijn in positie" },
            { img: ec6Zij, label: "Zijaanzicht", desc: "Gewichtsverdeling en lage zwaartepunt" },
            { img: ec6Onder, label: "Onderaanzicht", desc: "Motor vooraan, batterij gecentreerd" },
          ]} />
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="py-14 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Animate>
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-widest text-[#4157FF] mb-2 block font-semibold">
                {tk("verhaal.highlights.eyebrow", "Waarom de C6électrique", "Why the C6électrique")}
              </span>
              <h2 className="text-[#1E1E1C]">{tk("verhaal.highlights.title", "Drie redenen, geen compromissen", "Three reasons, no compromises")}</h2>
            </div>
          </Animate>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((h, i) => {
              const Icon = h.icon;
              return (
                <Animate key={i} delay={i * 100}>
                  <div className="relative bg-white rounded-2xl border border-[#EAEAE7] p-8 hover:shadow-xl hover:-translate-y-1 transition-all group">
                    <div className="w-14 h-14 rounded-2xl bg-[#4157FF]/10 flex items-center justify-center mb-6 group-hover:bg-[#4157FF] transition-colors">
                      <Icon className="w-6 h-6 text-[#4157FF] group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-[#1E1E1C] text-xl font-semibold mb-3">{h.title}</h3>
                    <p className="text-[#4C4C4B] leading-relaxed">{h.text}</p>
                  </div>
                </Animate>
              );
            })}
          </div>
        </div>
      </section>

      {/* CLOSER QUOTE */}
      <section className="py-16 lg:py-24 bg-[#FAFAF9]">
        <div className="max-w-[900px] mx-auto px-6 lg:px-10 text-center">
          <Animate>
            <div className="flex justify-center mb-6">
              <div className="w-12 h-[1.5px] bg-[#4157FF] rounded-full" />
            </div>
          </Animate>
          <Animate delay={100}>
            <p className="text-[26px] lg:text-[40px] leading-[1.2] font-medium text-[#1E1E1C] tracking-tight">
              <span className="text-[#4157FF]">"</span>
              {tk("verhaal.closer.quote",
                "Uit liefde voor een iconische auto — opnieuw geboren.",
                "Out of love for an iconic car — reborn.")}
              <span className="text-[#4157FF]">"</span>
            </p>
          </Animate>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 lg:py-20">
        <div className="max-w-[900px] mx-auto px-6 lg:px-10">
          <Animate>
            <div className="relative overflow-hidden rounded-3xl bg-[#1E1E1C] text-white p-10 lg:p-14 text-center">
              <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#4157FF] opacity-20 blur-3xl pointer-events-none" />
              <div className="relative">
                <h2 className="text-white mb-4">{tk("verhaal.cta.title", "Wil je als eerste de C6électrique zien?", "Want to be the first to see the C6électrique?")}</h2>
                <p className="text-[#B2B2B0] text-lg mb-8 max-w-md mx-auto">
                  {tk("verhaal.cta.subtitle", "Meld je aan voor de nieuwsbrief of neem direct contact op.", "Sign up for the newsletter or get in touch directly.")}
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Link to="/nieuwsbrief" className="btn-primary">
                    {tk("verhaal.cta.btn_primary", "Blijf op de hoogte", "Stay updated")}
                    <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                  </Link>
                  <Link to="/contact" className="btn-pill bg-white text-[#1E1E1C] px-6 py-3 hover:bg-[#F5F5F2]">
                    {tk("verhaal.cta.btn_secondary", "Neem contact op", "Get in touch")}
                  </Link>
                </div>
              </div>
            </div>
          </Animate>
        </div>
      </section>
    </div>
  );
}
