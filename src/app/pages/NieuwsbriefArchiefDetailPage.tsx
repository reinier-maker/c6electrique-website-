import { Link, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
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

export function NieuwsbriefArchiefDetailPage() {
  const { t, lang } = useLanguage();
  const { slug } = useParams();
  const editie = nieuwsbriefEdities.find((e) => e.slug === slug);

  if (!editie) {
    return (
      <div className="max-w-[700px] mx-auto px-6 lg:px-10 pt-12 pb-20">
        <Link
          to="/nieuwsbrief/archief"
          className="inline-flex items-center gap-2 text-sm text-[#4C4C4B] hover:text-[#4157FF] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("Terug naar archief", "Back to archive")}
        </Link>
        <p className="text-[#4C4C4B]">
          {t("Deze nieuwsbrief kon niet gevonden worden.", "This newsletter could not be found.")}
        </p>
      </div>
    );
  }

  const content = lang === "nl" ? editie.content.nl : editie.content.en;

  return (
    <div className="max-w-[700px] mx-auto px-6 lg:px-10 pt-8 lg:pt-12 pb-20">
      <Link
        to="/nieuwsbrief/archief"
        className="inline-flex items-center gap-2 text-sm text-[#4C4C4B] hover:text-[#4157FF] transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        {t("Terug naar archief", "Back to archive")}
      </Link>

      <Animate>
        <span className="text-[11px] uppercase tracking-widest text-[#4157FF] font-semibold mb-3 block">
          {formatDate(editie.date, lang)}
        </span>
        <h1 className="text-[#1E1E1C] font-semibold leading-[1.1] text-[28px] lg:text-[38px] mb-8">
          {lang === "nl" ? editie.title.nl : editie.title.en}
        </h1>
        <div className="space-y-5">
          {content.map((paragraph, i) => (
            <p key={i} className="text-[#4C4C4B] text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </Animate>
    </div>
  );
}
