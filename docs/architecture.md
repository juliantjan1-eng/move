# Architectuur — MOVE

## Overzicht

```
Frontend (Next.js)
        ↓ HTTP requests
Backend API (Node.js + Express)
        ↓
   ┌────┴────┐
Pattern    Action
Service    Service
        ↓
   Database (PostgreSQL / Supabase)
```

## Frontend

**Stack:** Next.js (React)

**Verantwoordelijkheid:**
- Gebruikersinput ophalen
- Respons tonen
- Feedback verzamelen
- App-state beheren (minimaal)

**Pagina's:**
- `/` — startscherm met input
- `/response` — interventierespons
- `/feedback` — feedback na sessie

## Backend

**Stack:** Node.js + Express

**Verantwoordelijkheid:**
- Input ontvangen
- Patroon detecteren
- Interventie selecteren
- Respons formatteren
- Data opslaan
- Feedback verwerken

**Mappenstructuur:**
```
backend/
└── src/
    ├── index.js              # Server entry point
    ├── routes/
    │   ├── chat.js           # POST /chat
    │   └── feedback.js       # POST /feedback
    ├── controllers/
    │   ├── chatController.js
    │   └── feedbackController.js
    ├── services/
    │   ├── patternService.js # Patroondetectie
    │   └── actionService.js  # Interventieselectie
    └── db/
        └── db.js             # Database connectie
```

## API Endpoints

### POST /chat

Input:
```json
{
  "userId": "string",
  "message": "string"
}
```

Output:
```json
{
  "pattern": "overthinking",
  "interventionType": "MOVE",
  "action": "Loop 10 minuten zonder telefoon.",
  "message": "Je zit vast in denken. Loop 10 minuten zonder telefoon. Sluit de app en ga nu.",
  "interventionId": "string"
}
```

### POST /feedback

Input:
```json
{
  "interventionId": "string",
  "helpful": true
}
```

Output:
```json
{
  "success": true
}
```

## Patroondetectie (v1)

Eerste versie: rule-based keyword matching.

```javascript
function detectPattern(message) {
  const text = message.toLowerCase();
  if (text.match(/blijf.*denk|nadenk|loop.*hoofd/)) return 'overthinking';
  if (text.match(/weet niet|vast|niet.*verder/)) return 'stuck';
  if (text.match(/uittel|stel.*uit|niet.*beginnen/)) return 'avoidance';
  if (text.match(/check|controleer|bevestig/)) return 'checking';
  if (text.match(/overweldigd|te veel|alles tegelijk/)) return 'overwhelm';
  if (text.match(/voel|gevoel|emotie/)) return 'emotional_block';
  return 'overthinking'; // default
}
```

Latere versie: Claude API voor nauwkeurigere classificatie.

## Hosting

| Component | Platform |
|-----------|----------|
| Frontend | Vercel |
| Backend | Railway of Render |
| Database | Supabase |

## Beveiliging

- Geen gevoelige data in URL parameters
- JWT authenticatie voor gebruikerssessies
- Alle API calls via HTTPS
- Geen wachtwoorden opgeslagen in plain text
- Environment variabelen voor secrets (nooit in code)
