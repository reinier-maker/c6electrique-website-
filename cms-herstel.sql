-- ============================================================================
--  C6electrique - herstel van het tekst-beheersysteem (CMS)
-- ============================================================================
--  Dit bestand bouwt de database van de website opnieuw op in een leeg
--  Supabase-project. Het maakt twee tabellen aan (de teksten van de site en de
--  lijst met beheerders), zet de beveiliging goed, en vult alle bewerkbare
--  teksten alvast met de teksten die nu op de site staan. Het dashboard kan
--  namelijk alleen bestaande teksten aanpassen, geen nieuwe aanmaken.
--
--  Het script mag zonder problemen twee keer gedraaid worden.
--
--  STAPPENPLAN
--  -----------
--   1. Maak een nieuw project aan op supabase.com (regio Europa, bewaar het
--      database-wachtwoord).
--   2. Open in dat project de SQL Editor, plak dit hele bestand en klik Run.
--   3. Ga naar Authentication > Users > Add user, en maak de inlog van de
--      beheerder aan (e-mailadres + wachtwoord, "Auto Confirm User" aanzetten).
--      Let op: de inlogpagina van de site plakt achter een gebruikersnaam
--      zonder @ automatisch "@c6electrique.nl". Wil de eigenaar inloggen met
--      alleen "rene", maak de gebruiker dan aan als rene@c6electrique.nl.
--   4. Zet datzelfde e-mailadres in de tabel c6e_admins (Table Editor >
--      c6e_admins > Insert row, of het voorbeeld onderaan dit bestand).
--      Zonder die regel krijgt niemand toegang tot het dashboard.
--   5. Ga in Supabase naar Project Settings > API en neem over:
--        - de Project URL
--        - de publishable key (anon key)
--      Vervang daarmee de twee regels bovenaan in het bestand
--      src/app/lib/supabase.ts van de website:
--        const SUPABASE_URL = "https://<nieuw-project>.supabase.co";
--        const SUPABASE_ANON_KEY = "<nieuwe publishable/anon key>";
--   6. Publiceer de website opnieuw (nieuwe build/deploy) en test:
--      /admin openen, inloggen, een tekst wijzigen en opslaan.
-- ============================================================================


-- ── 1. Tabellen ─────────────────────────────────────────────────────────────

create table if not exists public.c6e_site_texts (
  key        text primary key,
  section    text,
  label      text,
  value_nl   text not null default '',
  value_en   text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists public.c6e_admins (
  email text primary key
);


-- ── 2. Rechten ──────────────────────────────────────────────────────────────
-- Supabase zet deze rechten normaal automatisch, maar expliciet is veiliger.

grant usage on schema public to anon, authenticated;
grant select                 on public.c6e_site_texts to anon, authenticated;
grant insert, update         on public.c6e_site_texts to authenticated;
grant select                 on public.c6e_admins     to authenticated;


-- ── 3. Beveiliging (Row Level Security) ─────────────────────────────────────
-- Iedereen mag de teksten LEZEN (de website zelf leest ze uit).
-- Alleen ingelogde gebruikers die in c6e_admins staan mogen ze WIJZIGEN.

alter table public.c6e_site_texts enable row level security;
alter table public.c6e_admins     enable row level security;

drop policy if exists "c6e_site_texts_select_public" on public.c6e_site_texts;
create policy "c6e_site_texts_select_public"
  on public.c6e_site_texts
  for select
  to anon, authenticated
  using (true);

drop policy if exists "c6e_site_texts_insert_admin" on public.c6e_site_texts;
create policy "c6e_site_texts_insert_admin"
  on public.c6e_site_texts
  for insert
  to authenticated
  with check (
    exists (
      select 1 from public.c6e_admins a
      where lower(a.email) = lower(auth.jwt() ->> 'email')
    )
  );

drop policy if exists "c6e_site_texts_update_admin" on public.c6e_site_texts;
create policy "c6e_site_texts_update_admin"
  on public.c6e_site_texts
  for update
  to authenticated
  using (
    exists (
      select 1 from public.c6e_admins a
      where lower(a.email) = lower(auth.jwt() ->> 'email')
    )
  )
  with check (
    exists (
      select 1 from public.c6e_admins a
      where lower(a.email) = lower(auth.jwt() ->> 'email')
    )
  );

-- Een ingelogde gebruiker mag alleen zijn eigen regel in c6e_admins zien.
-- Toevoegen/verwijderen van beheerders doet de eigenaar via de Table Editor.
drop policy if exists "c6e_admins_select_self" on public.c6e_admins;
create policy "c6e_admins_select_self"
  on public.c6e_admins
  for select
  to authenticated
  using (lower(email) = lower(auth.jwt() ->> 'email'));


-- ── 4. updated_at automatisch bijwerken ─────────────────────────────────────

create or replace function public.c6e_touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists c6e_site_texts_touch on public.c6e_site_texts;
create trigger c6e_site_texts_touch
  before update on public.c6e_site_texts
  for each row execute function public.c6e_touch_updated_at();


-- ── 5. Alle bewerkbare teksten ──────────────────────────────────────────────
-- Deze regels zijn de teksten zoals ze nu op de site staan. Bestaat een regel
-- al, dan blijft de bestaande (mogelijk aangepaste) tekst staan.

insert into public.c6e_site_texts (key, section, label, value_nl, value_en) values
  ('site.email', 'Algemeen - Contact', 'E-mailadres (overal op de site)', 'Rene@ec6.eu', 'Rene@ec6.eu'),
  ('site.phone', 'Algemeen - Contact', 'Telefoonnummer (overal op de site)', '+31 6 22938536', '+31 6 22938536'),
  ('site.url', 'Algemeen - Contact', 'Webadres in de footer', 'www.c6electrique.nl', 'www.c6electrique.nl'),
  ('site.company', 'Algemeen - Contact', 'Bedrijfsnaam (footer en hero)', 'C6électrique B.V.', 'C6électrique B.V.'),
  ('nav.ec6', 'Menu', 'Menu link naar de auto', 'De C6électrique', 'The C6électrique'),
  ('nav.verhaal', 'Menu', 'Menu link naar Ons verhaal', 'Ons verhaal', 'Our story'),
  ('nav.nieuwsbrief', 'Menu', 'Menu link naar Nieuwsbrief', 'Nieuwsbrief', 'Newsletter'),
  ('nav.contact', 'Menu', 'Contactknop rechts in het menu', 'Contact', 'Contact'),
  ('home.hero.eyebrow', 'Home', 'Klein label boven de hoofdtitel', 'C6electrique B.V. presenteert', 'C6electrique B.V. presents'),
  ('home.hero.title', 'Home', 'Hoofdtitel bovenaan (regelafbreking = Enter)', E'Elektrisch rijden\nnu een Tesla\neigenlijk niet meer kan.', E'Electric driving\nnow that a Tesla\nno longer really cuts it.'),
  ('home.hero.subtitle', 'Home', 'Tekst onder de hoofdtitel', 'De Citroën C6 100% elektrisch: C6électrique, de juiste manier om een impact te maken.', 'The Citroën C6, 100% electric: C6électrique, the right way to make an impact.'),
  ('home.hero.cta_primary', 'Home', 'Tekst op de blauwe knop', 'Ontdek de C6électrique', 'Discover the C6électrique'),
  ('home.hero.cta_secondary', 'Home', 'Tekst op de tweede knop', 'Blijf op de hoogte', 'Stay updated'),
  ('home.hero.feature1', 'Home', 'Eerste kernpunt onder de knoppen', 'Authentiek design', 'Authentic design'),
  ('home.hero.feature2', 'Home', 'Tweede kernpunt onder de knoppen', '100% elektrisch', '100% electric'),
  ('home.hero.feature3', 'Home', 'Derde kernpunt onder de knoppen', 'Geen compromissen', 'No compromises'),
  ('home.widget.title', 'Home', 'Titel van het nieuwsbriefblokje rechtsboven', 'Wil je op de hoogte blijven?', 'Want to stay updated?'),
  ('home.widget.cta', 'Home', 'Linktekst in het nieuwsbriefblokje rechtsboven', 'Schrijf je in', 'Sign up'),
  ('home.story.eyebrow', 'Home', 'Klein label boven het verhaalblok', 'Ons verhaal', 'Our story'),
  ('home.story.title', 'Home', 'Titel van het verhaalblok', 'Een klassieker, aangedreven door de toekomst', 'A classic, powered by the future'),
  ('home.story.subtitle', 'Home', 'Tekst in het verhaalblok', 'Hoe onze passie voor circulariteit en elektrisch rijden leidde tot de C6électrique, stil, snel en volledig elektrisch.', 'How our passion for circularity and electric driving led to the C6électrique, silent, fast and fully electric.'),
  ('home.story.cta', 'Home', 'Linktekst van het verhaalblok', 'Lees ons verhaal', 'Read our story'),
  ('home.contact.title', 'Home', 'Titel boven het contactgedeelte', 'Neem contact op', 'Get in touch'),
  ('home.contact.button', 'Home', 'Tekst op de knop onder de contactgegevens', 'Stuur een bericht', 'Send a message'),
  ('verhaal.hero.eyebrow', 'Verhaal', 'Klein label boven de hoofdtitel', 'Ons verhaal', 'Our story'),
  ('verhaal.hero.title', 'Verhaal', 'Hoofdtitel bovenaan (regelafbreking = Enter, laatste regel wordt blauw)', E'Een klassieker,\naangedreven door\nde toekomst', E'A classic,\npowered by\nthe future'),
  ('verhaal.hero.subtitle', 'Verhaal', 'Tekst onder de hoofdtitel', 'De Citroën C6 behoudt zijn tijdloze uitstraling, maar krijgt een hart dat klopt op de cadans van morgen.', 'The Citroën C6 keeps its timeless look, but gets a heart that beats to the rhythm of tomorrow.'),
  ('verhaal.opener.section_label', 'Verhaal', 'Klein label boven de eerste quotes', 'Hoe het begon', 'How it began'),
  ('verhaal.opener.quote1', 'Verhaal', 'Eerste quote, grote tekst', 'Niets rijdt beter dan elektrisch — maar dit moest anders dan alles wat er al was.', 'Nothing drives better than electric — but this had to be different from everything that came before.'),
  ('verhaal.opener.quote2', 'Verhaal', 'Tweede quote', 'Geen Chinees, geen Koreaan, geen gewone Europeaan. Een C6.', 'No Chinese, no Korean, no ordinary European. A C6.'),
  ('verhaal.opener.quote3', 'Verhaal', 'Derde quote', 'Lease afgekocht, blanco blad — en toen begon het avontuur.', 'Lease bought out, blank slate — and then the adventure began.'),
  ('verhaal.block1.label', 'Verhaal', 'Bijschrift op de foto van de werkplaats', 'In de werkplaats', 'In the workshop'),
  ('verhaal.block1.quote1', 'Verhaal', 'Eerste quote bij de werkplaatsfoto', 'Het enige uiterlijke verschil tussen die twee C6''s is de uitlaat.', 'The only visible difference between those two C6s is the exhaust.'),
  ('verhaal.block1.quote2', 'Verhaal', 'Tweede quote bij de werkplaatsfoto', 'De C6 blijft ook elektrisch een C6 — want daar begint het.', 'The C6 remains a C6, even electric — because that''s where it begins.'),
  ('verhaal.block2.label', 'Verhaal', 'Bijschrift op de Mission-E foto', 'Mission-E', 'Mission-E'),
  ('verhaal.block2.quote1', 'Verhaal', 'Eerste quote bij de Mission-E foto', 'Geen one-off. Een verkoopbare propositie — dat was de lat.', 'No one-off. A marketable proposition — that was the bar.'),
  ('verhaal.block2.quote2', 'Verhaal', 'Tweede quote bij de Mission-E foto', 'Gebruik wat er op de markt is, en maak er iets bijzonders van.', 'Use what''s available on the market, and turn it into something remarkable.'),
  ('verhaal.block2.quote3', 'Verhaal', 'Derde quote bij de Mission-E foto', 'Specificaties gelijkwaardig aan een Model 3 of Y — in een auto uit 2006.', 'Specifications equivalent to a Model 3 or Y — in a car from 2006.'),
  ('verhaal.block3.label', 'Verhaal', 'Bijschrift op de interieurfoto', 'In het interieur', 'In the interior'),
  ('verhaal.block3.quote1', 'Verhaal', 'Eerste quote bij de interieurfoto', 'Dit project is niet alleen een vervanging van een aandrijving, maar een integratie met de ziel van de auto.', 'This project isn''t just a drivetrain replacement — it''s an integration with the soul of the car.'),
  ('verhaal.block3.quote2', 'Verhaal', 'Tweede quote bij de interieurfoto', 'Sensoren, software en computers in overvloed — herbouwen is geen sinecure.', 'Sensors, software and computers in abundance — rebuilding is no small feat.'),
  ('verhaal.tech.eyebrow', 'Verhaal', 'Klein label boven de technische fotos', 'Techniek in beeld', 'Engineering in view'),
  ('verhaal.tech.title', 'Verhaal', 'Titel boven de technische fotos', 'Onder de huid van de C6électrique', 'Under the skin of the C6électrique'),
  ('verhaal.highlights.eyebrow', 'Verhaal', 'Klein label boven de drie voordelen', 'Waarom de C6électrique', 'Why the C6électrique'),
  ('verhaal.highlights.title', 'Verhaal', 'Titel boven de drie voordelen', 'Drie redenen, geen compromissen', 'Three reasons, no compromises'),
  ('verhaal.highlights.h1_title', 'Verhaal', 'Eerste voordeel: titel', 'Authentiek design', 'Authentic design'),
  ('verhaal.highlights.h1_text', 'Verhaal', 'Eerste voordeel: tekst', 'De tijdloze uitstraling van de Citroën C6 blijft volledig behouden.', 'The timeless look of the Citroën C6 is fully preserved.'),
  ('verhaal.highlights.h2_title', 'Verhaal', 'Tweede voordeel: titel', 'Elektrische aandrijving', 'Electric drivetrain'),
  ('verhaal.highlights.h2_text', 'Verhaal', 'Tweede voordeel: tekst', 'Krachtig & duurzaam. Direct koppel, soepel vermogen, stil rijden.', 'Powerful & sustainable. Instant torque, smooth power, silent driving.'),
  ('verhaal.highlights.h3_title', 'Verhaal', 'Derde voordeel: titel', 'Geen uitstoot', 'Zero emissions'),
  ('verhaal.highlights.h3_text', 'Verhaal', 'Derde voordeel: tekst', 'Lokaal emissievrij rijden, zonder compromissen op comfort of luxe.', 'Locally emission-free driving, without compromise on comfort or luxury.'),
  ('verhaal.closer.quote', 'Verhaal', 'Grote slotquote onderaan', 'Uit liefde voor een iconische auto — opnieuw geboren.', 'Out of love for an iconic car — reborn.'),
  ('verhaal.cta.title', 'Verhaal', 'Titel van het zwarte blok onderaan', 'Wil je als eerste de C6électrique zien?', 'Want to be the first to see the C6électrique?'),
  ('verhaal.cta.subtitle', 'Verhaal', 'Tekst in het zwarte blok onderaan', 'Meld je aan voor de nieuwsbrief of neem direct contact op.', 'Sign up for the newsletter or get in touch directly.'),
  ('verhaal.cta.btn_primary', 'Verhaal', 'Eerste knop in het zwarte blok', 'Blijf op de hoogte', 'Stay updated'),
  ('verhaal.cta.btn_secondary', 'Verhaal', 'Tweede knop in het zwarte blok', 'Neem contact op', 'Get in touch'),
  ('nieuwsbrief.hero.eyebrow', 'Nieuwsbrief', 'Blauw labeltje bovenaan', 'Blijf op de hoogte!', 'Stay updated!'),
  ('nieuwsbrief.hero.title', 'Nieuwsbrief', 'Hoofdtitel bovenaan (regelafbreking = Enter, laatste regel wordt blauw)', E'Wil jij als eerste\nalles weten over\nde lancering?', E'Want to be the first\nto know everything\nabout the launch?'),
  ('nieuwsbrief.hero.subtitle', 'Nieuwsbrief', 'Tekst onder de hoofdtitel', 'Meld je aan voor onze nieuwsbrief en ontvang updates over de moderne elektrische klassieker direct in je inbox.', 'Sign up for our newsletter and get updates about the modern electric classic straight to your inbox.'),
  ('nieuwsbrief.benefit1.title', 'Nieuwsbrief', 'Eerste voordeel: titel', 'Als eerste nieuws', 'News first'),
  ('nieuwsbrief.benefit1.text', 'Nieuwsbrief', 'Eerste voordeel: tekst', 'Primeurs over de lancering, openbare testritten en events — rechtstreeks in je inbox.', 'Scoops about the launch, public test drives and events — straight to your inbox.'),
  ('nieuwsbrief.benefit2.title', 'Nieuwsbrief', 'Tweede voordeel: titel', 'Exclusieve uitnodigingen', 'Exclusive invitations'),
  ('nieuwsbrief.benefit2.text', 'Nieuwsbrief', 'Tweede voordeel: tekst', 'Toegang tot besloten previews en ontmoet het team achter de C6électrique.', 'Access to private previews and meet the team behind the C6électrique.'),
  ('nieuwsbrief.benefit3.title', 'Nieuwsbrief', 'Derde voordeel: titel', 'Geen spam', 'No spam'),
  ('nieuwsbrief.benefit3.text', 'Nieuwsbrief', 'Derde voordeel: tekst', 'Alleen relevante updates over de C6électrique. Je kunt op ieder moment uitschrijven.', 'Only relevant updates about the C6électrique. You can unsubscribe at any time.'),
  ('contact.hero.title', 'Contact', 'Hoofdtitel van de contactpagina', 'Neem contact op', 'Get in touch'),
  ('contact.hero.subtitle', 'Contact', 'Tekst onder de hoofdtitel', 'Vragen over de C6électrique? Stuur ons een bericht.', 'Questions about the C6électrique? Send us a message.'),
  ('logo.url', 'Logo', 'Logo afbeelding', '', '')
on conflict (key) do nothing;

-- ── 6. Beheerder toevoegen ──────────────────────────────────────────────────
-- Maak de gebruiker eerst aan onder Authentication > Users, en zet daarna
-- hetzelfde e-mailadres hieronder. Haal de twee streepjes weg om de regel uit
-- te voeren.

-- insert into c6e_admins (email) values ('naam@voorbeeld.nl');
