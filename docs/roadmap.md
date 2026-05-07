# Roadmap — MOVE

## Werkwijze

Elke fase heeft een GitHub issue. Per issue: één branch, één PR.

Volgorde is strikt. Geen fase overslaan.

---

## Fase 1 — Projectopzet

**Doel:** werkende omgeving, geen logica.

- [ ] GitHub repo aangemaakt
- [ ] Mappenstructuur backend en frontend
- [ ] Express server draait lokaal op poort 3001
- [ ] Next.js app draait lokaal op poort 3000
- [ ] README en CLAUDE.md aanwezig

---

## Fase 2 — Backend basis (zonder database)

**Doel:** systeem reageert op input met een interventie. Alles hardcoded.

- [ ] `POST /chat` endpoint werkt
- [ ] Patroondetectie (keyword-based)
- [ ] Acties hardcoded per patroon
- [ ] Respons in correct format: erkenning + actie + exit

**Acceptatiecriteria:**
- Stuur "ik blijf nadenken" → ontvang interventie
- Stuur "ik stel alles uit" → ontvang andere interventie
- Respons is maximaal 2–3 zinnen

---

## Fase 3 — Frontend basis

**Doel:** werkende UI die de backend aanroept.

- [ ] Startscherm met inputveld
- [ ] Respons wordt getoond
- [ ] "Ik ga dit doen" knop aanwezig
- [ ] Minimaal design, geen afleidingen

**Acceptatiecriteria:**
- Gebruiker kan tekst invoeren en respons ontvangen
- Respons is duidelijk leesbaar
- Geen onnodige UI-elementen

---

## Fase 4 — Database koppeling

**Doel:** sessies worden opgeslagen.

- [ ] Supabase project aangemaakt
- [ ] Tabellen aangemaakt (zie database.md)
- [ ] Messages worden opgeslagen
- [ ] Interventions worden opgeslagen
- [ ] `interventionId` wordt teruggegeven aan frontend

---

## Fase 5 — Feedback systeem

**Doel:** gebruiker kan aangeven of het heeft geholpen.

- [ ] `POST /feedback` endpoint werkt
- [ ] Frontend toont feedbackscherm na terugkeer
- [ ] Feedback wordt opgeslagen in database

**Acceptatiecriteria:**
- Gebruiker ziet "Heeft dit geholpen?" na terugkeer
- Ja/Nee wordt opgeslagen
- Geen tekstveld, geen uitleg gevraagd

---

## Fase 6 — Adaptieve interventieselectie

**Doel:** systeem kiest interventies op basis van wat eerder werkte.

- [ ] Query geïmplementeerd (zie database.md)
- [ ] Fallback naar standaard mapping als geen data
- [ ] Getest met meerdere sessies

---

## Fase 7 — Patroondetectie verbeteren

**Doel:** nauwkeurigere classificatie via Claude API.

- [ ] Claude API geïntegreerd
- [ ] Patroondetectie via LLM in plaats van keywords
- [ ] Fallback naar keyword-matching bij API-fout

---

## Fase 8 — Gedragsregels afdwingen

**Doel:** systeem voorkomt dat gebruiker in de app blijft.

- [ ] Blokkeer tweede bericht direct na respons
- [ ] Respons op pogingen tot analyse of uitleg
- [ ] Sessielimiet: max 2–3 berichten per sessie

---

## Niet bouwen in v1

- Gebruikersdashboard met statistieken
- Notificaties of reminders
- Meerdere gebruikers / teams
- Diepe persoonlijkheidsanalyse
- Integratie met wearables
- Betaalsysteem
