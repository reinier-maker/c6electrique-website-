import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, ArrowLeft, Mail, Bell, Calendar, Check } from "lucide-react";
import { Animate } from "../components/Animate";
import { useLanguage, useSite } from "../lib/useLanguage";

function useBenefits() {
  const { tk } = useLanguage();
  return [
    {
      icon: Bell,
      title: tk("nieuwsbrief.benefit1.title", "Als eerste nieuws", "News first"),
      text: tk("nieuwsbrief.benefit1.text",
        "Primeurs over de lancering, openbare testritten en events — rechtstreeks in je inbox.",
        "Scoops about the launch, public test drives and events — straight to your inbox."),
    },
    {
      icon: Calendar,
      title: tk("nieuwsbrief.benefit2.title", "Exclusieve uitnodigingen", "Exclusive invitations"),
      text: tk("nieuwsbrief.benefit2.text",
        "Toegang tot besloten previews en ontmoet het team achter de C6électrique.",
        "Access to private previews and meet the team behind the C6électrique."),
    },
    {
      icon: Check,
      title: tk("nieuwsbrief.benefit3.title", "Geen spam", "No spam"),
      text: tk("nieuwsbrief.benefit3.text",
        "Alleen relevante updates over de C6électrique. Je kunt op ieder moment uitschrijven.",
        "Only relevant updates about the C6électrique. You can unsubscribe at any time."),
    },
  ];
}

export function NieuwsbriefPage() {
  const { t, tk } = useLanguage();
  const { email: siteEmail, mailto } = useSite();
  const benefits = useBenefits();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const subject = encodeURIComponent("Aanmelding nieuwsbrief C6électrique");
    const body = encodeURIComponent(
      `Hallo René,\n\nIk wil graag op de hoogte blijven van de lancering van de C6électrique.\n\nMijn e-mailadres: ${email}\n\nMet vriendelijke groet.`
    );
    window.location.href = `${mailto}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-white min-h-[calc(100svh-81px)] flex items-start">
        {/* Decorative curve */}
        <div className="absolute inset-0 pointer-events-none">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1600 800"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="nbGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4157FF" stopOpacity="0.05" />
                <stop offset="50%" stopColor="#4157FF" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#01CEF4" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path
              d="M 0 620 Q 500 150 1600 220"
              fill="none"
              stroke="url(#nbGrad)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="relative w-full max-w-[1100px] mx-auto px-6 lg:px-10 pt-4 lg:pt-8 pb-10 lg:pb-14">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-[#4C4C4B] hover:text-[#4157FF] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("Terug naar home", "Back to home")}
          </Link>

          <div className="max-w-2xl">
            <Animate>
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#4157FF] bg-[#4157FF]/10 px-4 py-1.5 rounded-full mb-5 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4157FF] animate-pulse" />
              {tk("nieuwsbrief.hero.eyebrow", "Blijf op de hoogte!", "Stay updated!")}
            </span>
            <h1 className="text-[#1E1E1C] font-semibold leading-[1.05] text-[40px] lg:text-[60px] mb-6 whitespace-pre-line">
              {(() => {
                const title = tk("nieuwsbrief.hero.title",
                  "Wil jij als eerste\nalles weten over\nde lancering?",
                  "Want to be the first\nto know everything\nabout the launch?");
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
            <p className="text-lg lg:text-xl text-[#4C4C4B] mb-10 max-w-xl">
              {tk("nieuwsbrief.hero.subtitle",
                "Meld je aan voor onze nieuwsbrief en ontvang updates over de moderne elektrische klassieker direct in je inbox.",
                "Sign up for our newsletter and get updates about the modern electric classic straight to your inbox.")}
            </p>
            </Animate>

            <Animate delay={150}>
            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl border border-[#EAEAE7] card-soft p-6 lg:p-8 max-w-xl"
            >
              <label className="block text-[11px] uppercase tracking-widest text-[#989896] font-semibold mb-2">
                {t("E-mailadres", "Email address")}
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jouw@emailadres.nl"
                  className="flex-1 bg-[#F5F5F2] rounded-full px-6 py-3.5 text-[15px] placeholder:text-[#989896] focus:outline-none focus:ring-2 focus:ring-[#4157FF] text-[#1E1E1C] border border-transparent focus:border-[#4157FF]"
                />
                <button type="submit" className="btn-primary justify-center whitespace-nowrap">
                  {submitted ? t("Verzonden", "Sent") : t("Aanmelden", "Sign up")}
                  <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                </button>
              </div>
              <p className="text-xs text-[#989896] mt-4 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" />
                {t("Of stuur direct een e-mail naar ", "Or send an email directly to ")}
                <a
                  href={mailto}
                  className="text-[#4157FF] hover:underline font-semibold"
                >
                  {siteEmail}
                </a>
              </p>
            </form>
            </Animate>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-14 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Animate>
            <div className="text-center mb-12 max-w-xl mx-auto">
              <span className="text-xs uppercase tracking-widest text-[#4157FF] mb-2 block font-semibold">
                {t("Wat krijg je", "What you get")}
              </span>
              <h2 className="text-[#1E1E1C]">{t("Wat je kunt verwachten", "What to expect")}</h2>
            </div>
          </Animate>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <Animate key={i} delay={i * 100}>
                  <div className="relative bg-white rounded-2xl border border-[#EAEAE7] p-8 hover:shadow-xl hover:-translate-y-1 transition-all group">
                    <div className="w-14 h-14 rounded-2xl bg-[#4157FF]/10 flex items-center justify-center mb-6 group-hover:bg-[#4157FF] transition-colors">
                      <Icon className="w-6 h-6 text-[#4157FF] group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-[#1E1E1C] text-xl font-semibold mb-3">
                      {b.title}
                    </h3>
                    <p className="text-[#4C4C4B] leading-relaxed">{b.text}</p>
                  </div>
                </Animate>
              );
            })}
          </div>

          <Animate delay={benefits.length * 100}>
            <div className="text-center mt-10">
              <Link
                to="/nieuwsbrief/archief"
                className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#4157FF] hover:underline"
              >
                {t("Bekijk eerdere nieuwsbrieven", "View previous newsletters")}
                <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
              </Link>
            </div>
          </Animate>
        </div>
      </section>
    </div>
  );
}
