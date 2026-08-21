import { Link } from "react-router";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { Animate } from "../components/Animate";
import { useLanguage } from "../lib/useLanguage";
import { nieuwsbriefEdities } from "../lib/nieuwsbriefData";

function formatDate(iso: string, lang: "nl" | "en") {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(lang === "nl" ? "nl-NL" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function NieuwsbriefArchiefPage() {
  const { t, lang } = useLanguage();
  const edities = [...nieuwsbriefEdities].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="max-w-[1100px] mx-auto px-6 lg:px-10 pt-8 lg:pt-12 pb-20">
      <Link
        to="/nieuwsbrief"
        className="inline-flex items-center gap-2 text-sm text-[#4C4C4B] hover:text-[#4157FF] transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        {t("Terug naar nieuwsbrief", "Back to newsletter")}
      </Link>

      <Animate>
        <span className="text-xs uppercase tracking-widest text-[#4157FF] mb-2 block font-semibold">
          {t("Archief", "Archive")}
        </span>
        <h1 className="text-[#1E1E1C] font-semibold leading-[1.05] text-[32px] lg:text-[44px] mb-4">
          {t("Alle nieuwsbrieven", "All newsletters")}
        </h1>
        <p className="text-lg text-[#4C4C4B] mb-12 max-w-xl">
          {t(
            "Eerdere edities van onze nieuwsbrief, terug te lezen wanneer je wilt.",
            "Previous editions of our newsletter, to read back whenever you like."
          )}
        </p>
      </Animate>

      {edities.length === 0 ? (
        <p className="text-[#4C4C4B]">
          {t("Er zijn nog geen nieuwsbrieven gepubliceerd.", "No newsletters have been published yet.")}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {edities.map((editie, i) => (
            <Animate key={editie.slug} delay={i * 100}>
              <Link
                to={`/nieuwsbrief/archief/${editie.slug}`}
                className="block h-full bg-[#FCE0AE] rounded-2xl p-7 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <span className="text-[11px] uppercase tracking-widest text-[#1E1E1C]/60 font-semibold mb-3 block">
                  {i === 0 ? t("Meest recent", "Most recent") : formatDate(editie.date, lang)}
                </span>
                <h2 className="text-[#1E1E1C] text-xl font-semibold mb-3 leading-snug">
                  {lang === "nl" ? editie.title.nl : editie.title.en}
                </h2>
                <p className="text-[#4C4C4B] text-sm leading-relaxed mb-4">
                  {lang === "nl" ? editie.excerpt.nl : editie.excerpt.en}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#1E1E1C]">
                  {t("Lees verder", "Read more")}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </Animate>
          ))}
        </div>
      )}

      <Animate delay={100}>
        <div className="mt-16 bg-white rounded-3xl border border-[#EAEAE7] card-soft p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-[#4157FF]" />
            <p className="text-[#4C4C4B]">
              {t(
                "Nog niet aangemeld voor de nieuwsbrief?",
                "Not signed up for the newsletter yet?"
              )}
            </p>
          </div>
          <Link to="/nieuwsbrief" className="btn-primary justify-center whitespace-nowrap">
            {t("Aanmelden", "Sign up")}
            <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
          </Link>
        </div>
      </Animate>
    </div>
  );
}
