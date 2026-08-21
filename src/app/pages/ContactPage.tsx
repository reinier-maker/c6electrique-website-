import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, ArrowRight, Send } from "lucide-react";
import { Animate } from "../components/Animate";
import { useLanguage, useSite } from "../lib/useLanguage";

export function ContactPage() {
  const { t, tk } = useLanguage();
  const { email: siteEmail, mailto, phone, tel } = useSite();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    const subject = encodeURIComponent(`Bericht van ${name} via C6électrique website`);
    const body = encodeURIComponent(
      `Naam: ${name}\nE-mail: ${email}\n\n${message}`
    );
    window.location.href = `${mailto}?subject=${subject}&body=${body}`;
  };

  return (
    <div>
      <section className="relative overflow-hidden bg-white min-h-[calc(100svh-81px)] flex items-start">
        <div className="relative w-full max-w-[900px] mx-auto px-6 lg:px-10 pt-6 lg:pt-10 pb-16">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-[#4C4C4B] hover:text-[#4157FF] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("Terug naar home", "Back to home")}
          </Link>

          <Animate>
            <span className="inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.2em] text-[#989896] mb-5 font-medium">
              <span className="w-5 h-[1.5px] bg-[#4157FF] rounded-full" />
              Contact
            </span>
            <h1 className="text-[#1E1E1C] font-medium leading-[1.05] text-[36px] lg:text-[52px] mb-4">
              {tk("contact.hero.title", "Neem contact op", "Get in touch")}
            </h1>
            <p className="text-lg text-[#4C4C4B] max-w-lg mb-10">
              {tk("contact.hero.subtitle", "Vragen over de C6électrique? Stuur ons een bericht.", "Questions about the C6électrique? Send us a message.")}
            </p>
          </Animate>

          <Animate delay={150}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[11px] uppercase tracking-[0.15em] text-[#989896] font-medium mb-2">
                  {t("Naam", "Name")}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("Uw naam", "Your name")}
                  className="w-full bg-[#FAFAF9] border border-[#EAEAE7] rounded-xl px-5 py-3.5 text-[15px] text-[#1E1E1C] placeholder:text-[#B2B2B0] focus:outline-none focus:border-[#4157FF] focus:ring-1 focus:ring-[#4157FF] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.15em] text-[#989896] font-medium mb-2">
                  {t("E-mail", "Email")}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("uw@emailadres.nl", "your@email.com")}
                  className="w-full bg-[#FAFAF9] border border-[#EAEAE7] rounded-xl px-5 py-3.5 text-[15px] text-[#1E1E1C] placeholder:text-[#B2B2B0] focus:outline-none focus:border-[#4157FF] focus:ring-1 focus:ring-[#4157FF] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.15em] text-[#989896] font-medium mb-2">
                  {t("Bericht", "Message")}
                </label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t("Uw bericht...", "Your message...")}
                  rows={5}
                  className="w-full bg-[#FAFAF9] border border-[#EAEAE7] rounded-xl px-5 py-3.5 text-[15px] text-[#1E1E1C] placeholder:text-[#B2B2B0] focus:outline-none focus:border-[#4157FF] focus:ring-1 focus:ring-[#4157FF] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full justify-center py-4 text-[15px]"
              >
                <Send className="w-4 h-4" strokeWidth={2} />
                {t("Verstuur bericht", "Send message")}
              </button>
            </form>
          </Animate>

          <Animate delay={300}>
            <div className="mt-8 pt-8 border-t border-[#EAEAE7] flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-[#989896]">
              <span>{t("Of direct:", "Or directly:")}</span>
              <a href={tel} className="text-[#1E1E1C] font-medium hover:text-[#4157FF] transition-colors">
                {phone}
              </a>
              <a href={mailto} className="text-[#1E1E1C] font-medium hover:text-[#4157FF] transition-colors">
                {siteEmail}
              </a>
            </div>
          </Animate>
        </div>
      </section>
    </div>
  );
}
