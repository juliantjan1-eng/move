# CLAUDE.md — Projectregels voor MOVE

## Wat is MOVE

Een minimale interventie-app. Gebruiker komt binnen met een mentaal patroon, krijgt één gerichte actie, verlaat de app.

## Kernregel

Bij elke feature stel je de vraag:
> "Helpt dit de gebruiker sneller bewegen en de app verlaten?"

Als het antwoord nee is, bouwen we het niet.

## Wat je NIET bouwt (tenzij expliciet gevraagd)

- Lange gespreksflows
- Diepe analyse of uitleg aan de gebruiker
- Dashboards met statistieken in v1
- Notificatiesystemen in v1
- Gebruikersprofielen met persoonlijkheidsanalyse
- Alles wat de gebruiker langer in de app houdt

## Stack

- Frontend: Next.js (React)
- Backend: Node.js + Express
- Database: PostgreSQL via Supabase
- AI: Claude API voor patroonherkenning
- Hosting: Vercel (frontend) + Railway of Render (backend)

## Projectstructuur

```
move/
├── frontend/          # Next.js app
├── backend/           # Express API
│   ├── src/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── controllers/
│   │   └── db/
├── docs/              # Projectdocumentatie
└── CLAUDE.md
```

## Commands

```bash
# Backend starten
cd backend && npm run dev

# Frontend starten
cd frontend && npm run dev

# Tests draaien
npm test

# Database migraties
npm run migrate
```

## Commitstijl

```
feat: voeg patroondetectie toe
fix: herstel feedback opslag
docs: update interventie documentatie
```

## Werkwijze

1. Lees het GitHub issue volledig
2. Maak een implementatieplan — code nog niet
3. Wacht op bevestiging
4. Bouw in kleine commits
5. Draai tests voor je klaar bent

## Response format van het systeem

Altijd:
1. Korte erkenning (max 1 zin)
2. Één actie
3. Exit-richting ("sluit de app en doe dit")

Nooit:
- Uitleg waarom
- Meerdere opties
- Vervolgvragen
