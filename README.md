# C6électrique website

Tweetalige website (Nederlands en Engels) voor C6électrique, gebouwd met React, Vite en
TailwindCSS.

**Ben je hier net voor het eerst? Open `START-HIER.md`.**

## Draaien en bouwen

Node.js 20 of hoger.

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # resultaat in dist/
```

Op Vercel: framework preset Vite, elke push naar `main` zet de nieuwe versie online.
`vercel.json` zorgt dat subpagina's als `/verhaal` blijven werken bij verversen.

## Opbouw

| Map of bestand | Inhoud |
|---|---|
| `src/app/pages/` | Home, Verhaal, Contact, Nieuwsbrief, Admin |
| `src/app/components/` | Header, Footer, Logo, animaties |
| `src/app/lib/useLanguage.tsx` | taalwissel en de centrale contactgegevens (`useSite`) |
| `src/app/lib/supabase.ts` | verbinding met de database achter het beheerscherm |
| `src/assets/` | foto's en logo's |
| `cms-herstel.sql` | bouwt de database van het beheerscherm op in een leeg Supabase-project |

Teksten die via `/admin` aanpasbaar zijn staan in de code als
`tk("sleutel", "Nederlandse tekst", "English text")`. Zonder database gebruikt de site
automatisch de tekst uit de code, dus de site werkt ook zonder.

Het contact- en nieuwsbriefformulier slaan niets op; ze openen het mailprogramma van de bezoeker
met een bericht naar het e-mailadres uit `useSite`.
