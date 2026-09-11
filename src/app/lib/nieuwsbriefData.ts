// Alle nieuwsbrief-edities voor de archiefpagina (/nieuwsbrief/archief).
//
// Nieuwe editie toevoegen: kopieer een van de blokken hieronder, geef het een
// nieuwe `slug` (gebruikt in de link, alleen kleine letters/streepjes, geen
// spaties), zet de datum, titel, korte samenvatting en de volledige tekst.
// De nieuwste editie bovenaan zetten is niet nodig — de pagina sorteert
// automatisch op datum.

export type NieuwsbriefEditie = {
  slug: string;
  /** Formaat: JJJJ-MM-DD */
  date: string;
  title: { nl: string; en: string };
  excerpt: { nl: string; en: string };
  /** Eén item per alinea */
  content: { nl: string[]; en: string[] };
  pdfUrl?: string;
};

export const nieuwsbriefEdities: NieuwsbriefEditie[] = [
  {
    slug: "welkom",
    date: "2026-08-01",
    title: {
      nl: "Welkom bij de nieuwsbrief",
      en: "Welcome to the newsletter",
    },
    excerpt: {
      nl: "De eerste editie: waarom we de C6électrique bouwen en wat je de komende tijd van ons kunt verwachten.",
      en: "The first edition: why we're building the C6électrique and what to expect from us in the coming months.",
    },
    content: {
      nl: [
        "Fijn dat je erbij bent. Met deze nieuwsbrief houden we je op de hoogte van de ontwikkeling van de C6électrique: de moderne elektrische klassieker waar we hard aan werken.",
        "In de komende edities delen we voortgang uit de werkplaats, momenten met het team en de eerste testritten zodra die er zijn. Heb je vragen of ideeën, laat het gerust weten via de contactpagina.",
      ],
      en: [
        "Glad to have you here. With this newsletter we'll keep you posted on the development of the C6électrique: the modern electric classic we're hard at work on.",
        "In upcoming editions we'll share progress from the workshop, moments with the team, and the first test drives once they happen. Questions or ideas are always welcome via the contact page.",
      ],
    },
  },
];
  {
    slug: "juni-2026",
    date: "2026-06-01",
    title: {
      nl: "Update juni 2026: de eerste C6électrique rijdt bijna de garage uit",
      en: "June 2026 update: the first C6électrique is about to leave the workshop",
    },
    excerpt: {
      nl: "De bouw van de eerste C6électrique is bijna klaar, en de voorbereidingen voor een kleine serieproductie zijn gestart.",
      en: "Construction of the first C6électrique is almost finished, and preparations for a small production run have begun.",
    },
    content: {
      nl: ["Deze nieuwsbrief is gepubliceerd als PDF. Klik op de knop hieronder om hem te bekijken."],
      en: ["This newsletter was published as a PDF. Click the button below to view it."],
    },
    pdfUrl: "/nieuwsbrief-juni-2026.pdf",
  },
