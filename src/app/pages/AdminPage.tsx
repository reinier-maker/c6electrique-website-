import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, LogOut, Save, CheckCircle2, AlertCircle, Lock, KeyRound, X, Image as ImageIcon } from "lucide-react";
import { supabase, type SiteText } from "../lib/supabase";
import { useLanguage } from "../lib/useLanguage";
import logoDefault from "../../assets/c6electrique-logo-new.png";

export function AdminPage() {
  const { refreshTexts } = useLanguage();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check session + admin status
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);
      if (data.session?.user?.email) {
        const { data: admin } = await supabase
          .from("c6e_admins")
          .select("email")
          .eq("email", data.session.user.email)
          .maybeSingle();
        setIsAdmin(!!admin);
      }
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession);
      if (newSession?.user?.email) {
        const { data: admin } = await supabase
          .from("c6e_admins")
          .select("email")
          .eq("email", newSession.user.email)
          .maybeSingle();
        setIsAdmin(!!admin);
      } else {
        setIsAdmin(false);
      }
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[calc(100svh-81px)] flex items-center justify-center">
        <div className="text-sm text-[#989896]">Laden…</div>
      </div>
    );
  }

  if (!session) return <LoginForm />;
  if (!isAdmin) return <NotAuthorized email={session.user.email} />;

  return <Editor onSaved={refreshTexts} />;
}

// Convert simple username -> internal email for Supabase
function usernameToEmail(input: string): string {
  const trimmed = input.trim().toLowerCase();
  if (trimmed.includes("@")) return trimmed; // already an email
  return `${trimmed}@c6electrique.nl`;
}

// ── Login form ──
function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<{ type: "error" | "info"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    const email = usernameToEmail(username);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMsg({ type: "error", text: "Onjuiste gebruikersnaam of wachtwoord" });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100svh-81px)] bg-[#FAFAF9] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-[#4C4C4B] hover:text-[#4157FF] mb-8">
          <ArrowLeft className="w-4 h-4" />
          Terug naar home
        </Link>

        <div className="bg-white rounded-2xl border border-[#EAEAE7] p-8 card-soft">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#4157FF]/10 flex items-center justify-center">
              <Lock className="w-4 h-4 text-[#4157FF]" strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-[22px] font-semibold text-[#1E1E1C] leading-none">Admin portal</h1>
              <div className="text-xs text-[#989896] mt-1">C6électrique tekst editor</div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-[0.15em] text-[#989896] font-medium mb-2">
                Gebruikersnaam
              </label>
              <input
                type="text"
                required
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#FAFAF9] border border-[#EAEAE7] rounded-xl px-4 py-3 text-[15px] text-[#1E1E1C] focus:outline-none focus:border-[#4157FF]"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-[0.15em] text-[#989896] font-medium mb-2">
                Wachtwoord
              </label>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#FAFAF9] border border-[#EAEAE7] rounded-xl px-4 py-3 text-[15px] text-[#1E1E1C] focus:outline-none focus:border-[#4157FF]"
              />
            </div>

            {msg && (
              <div className={`flex items-start gap-2 text-[13px] p-3 rounded-lg ${msg.type === "error" ? "bg-red-50 text-red-700" : "bg-blue-50 text-blue-700"}`}>
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{msg.text}</span>
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 disabled:opacity-50">
              {loading ? "Bezig…" : "Inloggen"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ── Not authorized ──
function NotAuthorized({ email }: { email: string }) {
  return (
    <div className="min-h-[calc(100svh-81px)] bg-[#FAFAF9] flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
          <Lock className="w-5 h-5 text-red-600" strokeWidth={2} />
        </div>
        <h1 className="text-2xl font-semibold text-[#1E1E1C] mb-2">Geen toegang</h1>
        <p className="text-[#4C4C4B] mb-6">
          Het account <strong>{email}</strong> heeft geen admin-rechten.
        </p>
        <button
          onClick={() => supabase.auth.signOut()}
          className="btn-outline"
        >
          Uitloggen
        </button>
      </div>
    </div>
  );
}

// ── Change password modal ──
function ChangePasswordModal({ onClose }: { onClose: () => void }) {
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: "error" | "success"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    if (pw.length < 6) {
      setMsg({ type: "error", text: "Wachtwoord moet minstens 6 tekens zijn" });
      return;
    }
    if (pw !== pw2) {
      setMsg({ type: "error", text: "Wachtwoorden komen niet overeen" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: pw });
    setLoading(false);
    if (error) {
      setMsg({ type: "error", text: error.message });
    } else {
      setMsg({ type: "success", text: "Wachtwoord gewijzigd!" });
      setTimeout(onClose, 1500);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-6" onClick={onClose}>
      <div className="bg-white rounded-2xl border border-[#EAEAE7] p-8 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#4157FF]/10 flex items-center justify-center">
              <KeyRound className="w-4 h-4 text-[#4157FF]" strokeWidth={2} />
            </div>
            <h2 className="text-[18px] font-semibold text-[#1E1E1C]">Wachtwoord wijzigen</h2>
          </div>
          <button onClick={onClose} className="text-[#989896] hover:text-[#1E1E1C]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] uppercase tracking-[0.15em] text-[#989896] font-medium mb-2">
              Nieuw wachtwoord
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="w-full bg-[#FAFAF9] border border-[#EAEAE7] rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:border-[#4157FF]"
            />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-[0.15em] text-[#989896] font-medium mb-2">
              Herhaal nieuw wachtwoord
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={pw2}
              onChange={(e) => setPw2(e.target.value)}
              className="w-full bg-[#FAFAF9] border border-[#EAEAE7] rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:border-[#4157FF]"
            />
          </div>

          {msg && (
            <div className={`flex items-start gap-2 text-[13px] p-3 rounded-lg ${msg.type === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
              {msg.type === "error" ? <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /> : <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />}
              <span>{msg.text}</span>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="btn-outline flex-1 justify-center py-3">
              Annuleren
            </button>
            <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center py-3 disabled:opacity-50">
              {loading ? "Bezig…" : "Opslaan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Editor ──
function Editor({ onSaved }: { onSaved: () => Promise<void> }) {
  const [rows, setRows] = useState<SiteText[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [edits, setEdits] = useState<Record<string, { nl: string; en: string }>>({});
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    loadTexts();
  }, []);

  const loadTexts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("c6e_site_texts")
      .select("*")
      .order("section", { ascending: true })
      .order("key", { ascending: true });
    if (!error && data) {
      setRows(data as SiteText[]);
      if (data.length > 0 && !activeSection) {
        setActiveSection((data[0] as SiteText).section);
      }
    }
    setLoading(false);
  };

  const sections = useMemo(() => {
    const s = new Set<string>();
    rows.forEach((r) => {
      if (r.section && !r.key.startsWith("logo.")) s.add(r.section);
    });
    return Array.from(s);
  }, [rows]);

  const setEdit = (key: string, field: "nl" | "en", value: string) => {
    setEdits((prev) => ({
      ...prev,
      [key]: {
        nl: prev[key]?.nl ?? rows.find((r) => r.key === key)?.value_nl ?? "",
        en: prev[key]?.en ?? rows.find((r) => r.key === key)?.value_en ?? "",
        [field]: value,
      },
    }));
  };

  const saveRow = async (key: string) => {
    const row = rows.find((r) => r.key === key);
    const edit = edits[key];
    if (!row || !edit) return;
    setSaving((s) => ({ ...s, [key]: true }));
    const { error } = await supabase
      .from("c6e_site_texts")
      .update({ value_nl: edit.nl, value_en: edit.en })
      .eq("key", key);
    setSaving((s) => ({ ...s, [key]: false }));
    if (!error) {
      setRows((prev) => prev.map((r) => r.key === key ? { ...r, value_nl: edit.nl, value_en: edit.en } : r));
      setEdits((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
      setSaved((s) => ({ ...s, [key]: true }));
      setTimeout(() => setSaved((s) => ({ ...s, [key]: false })), 2000);
      await onSaved();
    }
  };

  const hasUnsavedChanges = Object.keys(edits).length > 0;

  const filteredRows = activeSection
    ? rows.filter((r) => r.section === activeSection && !r.key.startsWith("logo."))
    : rows.filter((r) => !r.key.startsWith("logo."));

  if (loading) {
    return (
      <div className="min-h-[calc(100svh-81px)] flex items-center justify-center">
        <div className="text-sm text-[#989896]">Teksten laden…</div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100svh-81px)] bg-[#FAFAF9]">
      {showPasswordModal && <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />}
      {/* Sticky admin toolbar */}
      <div className="sticky top-[65px] lg:top-[73px] z-30 bg-white border-b border-[#EAEAE7] backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#4157FF]/10 flex items-center justify-center">
              <Lock className="w-3.5 h-3.5 text-[#4157FF]" strokeWidth={2} />
            </div>
            <div>
              <div className="text-[15px] font-semibold text-[#1E1E1C] leading-none">Admin portal</div>
              <div className="text-[11px] text-[#989896] mt-0.5">
                {rows.length} teksten · {hasUnsavedChanges ? `${Object.keys(edits).length} niet-opgeslagen` : "alles opgeslagen"}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPasswordModal(true)}
              className="inline-flex items-center gap-1.5 text-[13px] text-[#4C4C4B] hover:text-[#1E1E1C] px-3 py-2"
            >
              <KeyRound className="w-3.5 h-3.5" />
              Wachtwoord
            </button>
            <Link to="/" className="btn-outline text-[13px] py-2 px-4">
              Bekijk site
            </Link>
            <button onClick={() => supabase.auth.signOut()} className="inline-flex items-center gap-1.5 text-[13px] text-[#989896] hover:text-[#1E1E1C] px-3 py-2">
              <LogOut className="w-3.5 h-3.5" />
              Uitloggen
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-8 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
        {/* Sidebar — sections */}
        <aside className="lg:sticky lg:top-[160px] lg:self-start">
          <div className="text-[11px] uppercase tracking-[0.15em] text-[#989896] font-medium mb-3">
            Secties
          </div>
          <nav className="flex flex-col gap-1">
            {["Logo", ...sections].map((s) => (
              <button
                key={s}
                onClick={() => setActiveSection(s)}
                className={`text-left text-[14px] px-3 py-2 rounded-lg transition-colors ${
                  activeSection === s
                    ? "bg-[#1E1E1C] text-white"
                    : "text-[#4C4C4B] hover:bg-white"
                }`}
              >
                {s}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content — editable rows */}
        <main>
          <div className="mb-6">
            <h2 className="text-[22px] font-semibold text-[#1E1E1C]">{activeSection}</h2>
            <p className="text-sm text-[#989896] mt-1">
              {activeSection === "Logo"
                ? "Upload hier een eigen logo. Het verschijnt direct in de header en (automatisch wit gemaakt) in de footer."
                : "Wijzigingen zijn direct live na opslaan. Refresh de site in een ander tabblad om ze te zien."}
            </p>
          </div>

          {activeSection === "Logo" ? (
            <LogoManager onSaved={onSaved} />
          ) : (
          <div className="space-y-4">
            {filteredRows.map((row) => {
              const edit = edits[row.key];
              const hasEdit = !!edit && (edit.nl !== row.value_nl || edit.en !== row.value_en);
              const isLong = row.value_nl.length > 80 || row.value_en.length > 80 || row.value_nl.includes("\n");

              return (
                <div key={row.key} className="bg-white rounded-xl border border-[#EAEAE7] p-5">
                  <div className="flex items-start justify-between mb-3 gap-4">
                    <div className="min-w-0">
                      <div className="text-[13px] font-semibold text-[#1E1E1C]">
                        {row.label || row.key}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-[#B2B2B0] mt-0.5 font-mono">
                        {row.key}
                      </div>
                    </div>
                    {hasEdit && (
                      <button
                        onClick={() => saveRow(row.key)}
                        disabled={saving[row.key]}
                        className="btn-primary text-[12px] py-2 px-4 shrink-0"
                      >
                        {saving[row.key] ? (
                          "Opslaan…"
                        ) : (
                          <>
                            <Save className="w-3.5 h-3.5" strokeWidth={2} />
                            Opslaan
                          </>
                        )}
                      </button>
                    )}
                    {saved[row.key] && (
                      <div className="flex items-center gap-1.5 text-[12px] text-green-600 shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                        Opgeslagen
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-[#989896] font-semibold mb-1.5 flex items-center gap-1.5">
                        <span className="w-3 h-[1.5px] bg-[#4157FF] rounded-full" />
                        Nederlands
                      </div>
                      {isLong ? (
                        <textarea
                          value={edit?.nl ?? row.value_nl}
                          onChange={(e) => setEdit(row.key, "nl", e.target.value)}
                          rows={Math.max(2, (edit?.nl ?? row.value_nl).split("\n").length)}
                          className="w-full bg-[#FAFAF9] border border-[#EAEAE7] rounded-lg px-3 py-2 text-[14px] text-[#1E1E1C] focus:outline-none focus:border-[#4157FF] focus:bg-white resize-y font-sans"
                        />
                      ) : (
                        <input
                          type="text"
                          value={edit?.nl ?? row.value_nl}
                          onChange={(e) => setEdit(row.key, "nl", e.target.value)}
                          className="w-full bg-[#FAFAF9] border border-[#EAEAE7] rounded-lg px-3 py-2 text-[14px] text-[#1E1E1C] focus:outline-none focus:border-[#4157FF] focus:bg-white"
                        />
                      )}
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-[#989896] font-semibold mb-1.5 flex items-center gap-1.5">
                        <span className="w-3 h-[1.5px] bg-[#01CEF4] rounded-full" />
                        English
                      </div>
                      {isLong ? (
                        <textarea
                          value={edit?.en ?? row.value_en}
                          onChange={(e) => setEdit(row.key, "en", e.target.value)}
                          rows={Math.max(2, (edit?.en ?? row.value_en).split("\n").length)}
                          className="w-full bg-[#FAFAF9] border border-[#EAEAE7] rounded-lg px-3 py-2 text-[14px] text-[#1E1E1C] focus:outline-none focus:border-[#4157FF] focus:bg-white resize-y font-sans"
                        />
                      ) : (
                        <input
                          type="text"
                          value={edit?.en ?? row.value_en}
                          onChange={(e) => setEdit(row.key, "en", e.target.value)}
                          className="w-full bg-[#FAFAF9] border border-[#EAEAE7] rounded-lg px-3 py-2 text-[14px] text-[#1E1E1C] focus:outline-none focus:border-[#4157FF] focus:bg-white"
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          )}
        </main>
      </div>
    </div>
  );
}

// ── Logo uploader ──
// Verkleint een geüpload logo (max breedte) en geeft een PNG data-URI terug.
// SVG wordt direct gebruikt (vector, geen rasterisatie).
function fileToLogoDataUrl(file: File, maxW: number): Promise<string> {
  if (file.type === "image/svg+xml") {
    return new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(r.result as string);
      r.onerror = () => reject(new Error("Kon SVG niet lezen"));
      r.readAsDataURL(file);
    });
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxW / (img.width || maxW));
        const w = Math.max(1, Math.round(img.width * scale));
        const h = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas niet beschikbaar"));
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = () => reject(new Error("Kon afbeelding niet laden"));
      img.src = reader.result as string;
    };
    reader.onerror = () => reject(new Error("Kon bestand niet lezen"));
    reader.readAsDataURL(file);
  });
}

function LogoManager({ onSaved }: { onSaved: () => Promise<void> }) {
  const { logo } = useLanguage();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const current = logo || logoDefault;
  const hasCustom = !!logo;

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setMsg(null);
    if (!file.type.startsWith("image/")) {
      setMsg({ type: "error", text: "Kies een afbeelding (PNG, SVG of JPG)." });
      return;
    }
    setBusy(true);
    try {
      const dataUrl = await fileToLogoDataUrl(file, 800);
      if (dataUrl.length > 1_500_000) {
        throw new Error("Logo te groot na verwerken. Gebruik een eenvoudiger of kleiner bestand.");
      }
      const { error } = await supabase
        .from("c6e_site_texts")
        .upsert(
          { key: "logo.url", section: "Logo", label: "Logo afbeelding", value_nl: dataUrl, value_en: "" },
          { onConflict: "key" }
        );
      if (error) throw error;
      await onSaved();
      setMsg({ type: "success", text: "Logo bijgewerkt! Ververs de site in een ander tabblad om het te zien." });
    } catch (e: any) {
      setMsg({ type: "error", text: e?.message || "Uploaden mislukt." });
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const removeCustom = async () => {
    setBusy(true);
    setMsg(null);
    const { error } = await supabase
      .from("c6e_site_texts")
      .update({ value_nl: "", value_en: "" })
      .eq("key", "logo.url");
    setBusy(false);
    if (error) {
      setMsg({ type: "error", text: error.message });
    } else {
      await onSaved();
      setMsg({ type: "success", text: "Terug naar het standaardlogo." });
    }
  };

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-xl border border-[#EAEAE7] p-6">
        <div className="text-[13px] font-semibold text-[#1E1E1C] mb-1">Huidig logo</div>
        <div className="text-[12px] text-[#989896] mb-4">
          {hasCustom ? "Eigen logo (via dashboard geüpload)." : "Standaardlogo actief."}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-[#EAEAE7] bg-white p-5 flex items-center justify-center">
            <img src={current} alt="Logo op lichte achtergrond" className="h-12 w-auto" />
          </div>
          <div className="rounded-lg bg-[#1E1E1C] p-5 flex items-center justify-center">
            <img
              src={current}
              alt="Logo op donkere achtergrond"
              className="h-12 w-auto"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#EAEAE7] p-6">
        <div className="flex items-center gap-2 mb-2">
          <ImageIcon className="w-4 h-4 text-[#4157FF]" strokeWidth={2} />
          <span className="text-[13px] font-semibold text-[#1E1E1C]">Nieuw logo uploaden</span>
        </div>
        <p className="text-[12px] text-[#989896] mb-4">
          Gebruik bij voorkeur een <strong>PNG met transparante achtergrond</strong> (of een SVG). De donkere footer
          maakt er automatisch een witte versie van. Maximaal ~2&nbsp;MB.
        </p>
        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/svg+xml,image/jpeg,image/webp"
          onChange={(e) => handleFile(e.target.files?.[0])}
          disabled={busy}
          className="block w-full text-sm text-[#4C4C4B] file:mr-4 file:py-2.5 file:px-5 file:rounded-full file:border-0 file:text-[13px] file:font-semibold file:bg-[#4157FF] file:text-white hover:file:bg-[#3447e0] file:cursor-pointer disabled:opacity-50"
        />

        {busy && <div className="text-[13px] text-[#989896] mt-3">Bezig met verwerken…</div>}
        {msg && (
          <div
            className={`flex items-start gap-2 text-[13px] p-3 rounded-lg mt-3 ${
              msg.type === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
            }`}
          >
            {msg.type === "error" ? (
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            )}
            <span>{msg.text}</span>
          </div>
        )}

        {hasCustom && (
          <button
            onClick={removeCustom}
            disabled={busy}
            className="btn-outline text-[13px] py-2 px-4 mt-4 disabled:opacity-50"
          >
            Terug naar standaardlogo
          </button>
        )}
      </div>
    </div>
  );
}
