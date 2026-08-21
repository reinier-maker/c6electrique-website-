import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "./supabase";

export type Lang = "nl" | "en";

type TextMap = Record<string, { nl: string; en: string }>;

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (nl: string, en: string) => string;
  tk: (key: string, fallbackNl: string, fallbackEn: string) => string;
  /** Custom logo (data-URI) uit het dashboard; leeg = gebruik standaard bundled logo. */
  logo: string;
  refreshTexts: () => Promise<void>;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "nl";
    const saved = localStorage.getItem("c6e-lang");
    return saved === "en" ? "en" : "nl";
  });

  const [texts, setTexts] = useState<TextMap>({});

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const fetchTexts = async () => {
    const { data, error } = await supabase
      .from("c6e_site_texts")
      .select("key, value_nl, value_en");
    if (error || !data) return;
    const map: TextMap = {};
    for (const row of data as Array<{ key: string; value_nl: string; value_en: string }>) {
      map[row.key] = { nl: row.value_nl, en: row.value_en };
    }
    setTexts(map);
  };

  useEffect(() => {
    fetchTexts();
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("c6e-lang", l);
  };

  // t = static translation (for strings we don't want editable)
  const t = (nl: string, en: string) => (lang === "nl" ? nl : en);

  // tk = keyed translation (editable via admin portal, falls back to defaults)
  const tk = (key: string, fallbackNl: string, fallbackEn: string) => {
    const entry = texts[key];
    if (!entry) return lang === "nl" ? fallbackNl : fallbackEn;
    return lang === "nl" ? (entry.nl || fallbackNl) : (entry.en || fallbackEn);
  };

  const logo = texts["logo.url"]?.nl || "";

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, tk, logo, refreshTexts: fetchTexts }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}

// Centrale contactgegevens — bewerkbaar via het dashboard (sectie "Algemeen — Contact").
// Eén bron: wijzig e-mail/telefoon/URL in de admin en het werkt overal door.
export function useSite() {
  const { tk } = useLanguage();
  const email = tk("site.email", "Rene@ec6.eu", "Rene@ec6.eu");
  const phone = tk("site.phone", "+31 6 22938536", "+31 6 22938536");
  const url = tk("site.url", "www.c6electrique.nl", "www.c6electrique.nl");
  const company = tk("site.company", "C6électrique B.V.", "C6électrique B.V.");
  return {
    email,
    phone,
    url,
    company,
    mailto: `mailto:${email}`,
    tel: `tel:${phone.replace(/[^+0-9]/g, "")}`,
    urlHref: `https://${url.replace(/^https?:\/\//, "")}`,
  };
}
