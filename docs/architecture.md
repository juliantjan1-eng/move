# Architectuur — MOVE

## Overzicht

```
Frontend (Next.js)
        ↓ HTTP requests
Backend API (Node.js + Express)
        ↓
   ┌────┴────────────┐
Pattern           Belief
Service           Service
   └────┬────────────┘
        ↓
   Action Service
        ↓
   Response Builder
        ↓
   Database (PostgreSQL / Supabase)
```

## Frontend

**Stack:** Next.js (React)

**Pagina's:**
- `/` — startscherm met input
- `/response` — drie-delige respons (erkenning + interventie + exit)
- `/feedback` — feedback na sessie

---

## Backend

**Stack:** Node.js + Express

**Mappenstructuur:**
```
backend/
└── src/
    ├── index.js
    ├── routes/
    │   ├── chat.js           # POST /chat
    │   └── feedback.js       # POST /feedback
    ├── controllers/
    │   ├── chatController.js
    │   └── feedbackController.js
    ├── services/
    │   ├── patternService.js    # Patroondetectie
    │   ├── beliefService.js     # Belief mapping + erkenningszin
    │   └── actionService.js     # Interventieselectie
    └── db/
        └── db.js
```

---

## Services

### patternService.js
Detecteert het patroon op basis van de gebruikersinput.

V1: keyword-based matching.
V2: Claude API voor nauwkeurigere classificatie.

```javascript
function detectPattern(message) {
  const text = message.toLowerCase();
  if (text.match(/blijf.*denk|nadenk|loop.*hoofd/)) return 'overthinking';
  if (text.match(/weet niet|vast|niet.*verder/)) return 'stuck';
  if (text.match(/uittel|stel.*uit|niet.*beginnen/)) return 'procrastination';
  if (text.match(/check|controleer|bevestig/)) return 'compulsive_checking';
  if (text.match(/overweldigd|te veel|alles tegelijk/)) return 'overwhelm';
  if (text.match(/schaam|schaamte/)) return 'shame_spiral';
  if (text.match(/schuld|mijn fout/)) return 'guilt';
  if (text.match(/mis|verlies|weg.*is/)) return 'grief';
  if (text.match(/boos|gefrustreerd|woedend/)) return 'anger_buildup';
  if (text.match(/bang|angst|gespannen/)) return 'anxiety';
  if (text.match(/alleen|niemand.*begrijpt/)) return 'loneliness';
  if (text.match(/niks.*voelen|leeg|voel.*niet/)) return 'emotional_numbness';
  if (text.match(/zinloos|wat.*zin|maakt.*uit/)) return 'meaninglessness';
  if (text.match(/verloren|geen.*richting|weet.*wie/)) return 'lost';
  return 'overthinking'; // default
}
```

---

### beliefService.js
Mapt het patroon naar de onderliggende belief en geeft de bijbehorende erkenningszin terug.

```javascript
const beliefMap = {
  overthinking:          { belief: 'uncertainty_is_danger',   acknowledgment: "Je hoofd zoekt zekerheid die er nu niet hoeft te zijn." },
  rumination:            { belief: 'should_have_known',       acknowledgment: "Je blijft teruggaan naar iets wat al voorbij is." },
  analysis_paralysis:    { belief: 'must_be_certain',         acknowledgment: "Je wacht op zekerheid die er niet komt voor je begint." },
  catastrophizing:       { belief: 'world_is_unsafe',         acknowledgment: "Je systeem staat aan alsof er gevaar is — ook al is er geen." },
  perfectionism:         { belief: 'not_enough',              acknowledgment: "Je waarde voelt afhankelijk van hoe goed dit wordt." },
  reassurance_seeking:   { belief: 'cant_trust_self',         acknowledgment: "Je vertrouwt je eigen waarneming niet genoeg." },
  mental_loop:           { belief: 'must_control',            acknowledgment: "Je probeert grip te krijgen op iets wat zich niet laat grijpen." },
  future_worry:          { belief: 'world_is_unsafe',         acknowledgment: "Je bereidt je voor op een gevaar dat er misschien nooit komt." },
  overwhelm:             { belief: 'not_capable',             acknowledgment: "Het voelt alsof je het niet aankan." },
  emotional_numbness:    { belief: 'emotions_are_dangerous',  acknowledgment: "Je houdt iets buiten omdat volledig voelen eng aanvoelt." },
  emotional_block:       { belief: 'emotions_are_too_much',   acknowledgment: "Er is iets wat wil komen maar je houdt het tegen." },
  shame_spiral:          { belief: 'fundamentally_flawed',    acknowledgment: "Er is een stemmetje dat zegt dat jij het probleem bent." },
  guilt:                 { belief: 'responsible_for_all',     acknowledgment: "Je draagt iets wat niet alleen van jou is." },
  grief:                 { belief: 'will_be_abandoned',       acknowledgment: "Er is een verlies dat ruimte vraagt." },
  anger_buildup:         { belief: 'helpless',                acknowledgment: "Je voelt iets wat nergens heen kan." },
  anxiety:               { belief: 'world_is_unsafe',         acknowledgment: "Je systeem staat aan alsof er gevaar is — ook al is er geen." },
  loneliness:            { belief: 'dont_belong',             acknowledgment: "Er is een gevoel dat je er niet echt bij hoort." },
  sadness:               { belief: 'things_wont_improve',     acknowledgment: "Het voelt alsof dit zo blijft." },
  avoidance:             { belief: 'will_fail',               acknowledgment: "Er is een verwachting dat het toch fout gaat." },
  procrastination:       { belief: 'must_be_certain',         acknowledgment: "Je wacht op het goede moment dat niet vanzelf komt." },
  compulsive_checking:   { belief: 'must_control',            acknowledgment: "Je probeert grip te krijgen via controle." },
  freeze:                { belief: 'helpless',                acknowledgment: "Het voelt alsof je geen kant op kunt." },
  people_pleasing:       { belief: 'conditional_love',        acknowledgment: "Je past je aan om geaccepteerd te blijven." },
  withdrawal:            { belief: 'if_known_rejected',       acknowledgment: "Je trekt je terug om jezelf te beschermen." },
  impulsivity:           { belief: 'emotions_are_dangerous',  acknowledgment: "Er was iets wat te groot voelde om bij te blijven." },
  busyness_as_avoidance: { belief: 'emotions_are_dangerous',  acknowledgment: "Je blijft bezig zodat je niet hoeft te voelen." },
  tension:               { belief: 'must_be_alert',           acknowledgment: "Je lichaam staat op scherp alsof het moet beschermen." },
  restlessness:          { belief: 'must_control',            acknowledgment: "Er is onrust die nergens heen kan." },
  fatigue:               { belief: 'must_earn_worth',         acknowledgment: "Je waarde voelt afhankelijk van wat je doet." },
  disconnection:         { belief: 'emotions_are_dangerous',  acknowledgment: "Je bent in je hoofd om niet te hoeven voelen." },
  physical_agitation:    { belief: 'world_is_unsafe',         acknowledgment: "Je lichaam reageert op een gevaar dat er niet is." },
  lost:                  { belief: 'this_is_who_i_am',        acknowledgment: "Je weet niet wie je bent los van wat je doet voor anderen." },
  meaninglessness:       { belief: 'dont_deserve_better',     acknowledgment: "Het voelt alsof het er niet toe doet." },
  identity_confusion:    { belief: 'must_adapt',              acknowledgment: "Je weet niet wie je bent als je niet aan het aanpassen bent." },
};

function getBelief(pattern) {
  return beliefMap[pattern] || beliefMap['overthinking'];
}
```

---

### actionService.js
Selecteert de interventie op basis van patroon + feedback-geschiedenis.

```javascript
async function getAction(userId, patternId) {
  // Probeer geleerde actie op basis van feedback
  const learned = await db.query(`
    SELECT a.id, a.description, a.intervention_type
    FROM actions a
    JOIN interventions i ON i.action_id = a.id
    LEFT JOIN feedback f ON f.intervention_id = i.id
    WHERE i.user_id = $1 AND i.pattern_id = $2
    GROUP BY a.id
    ORDER BY (SUM(CASE WHEN f.helpful THEN 1 ELSE 0 END)::float / NULLIF(COUNT(f.id), 0)) DESC NULLS LAST
    LIMIT 1
  `, [userId, patternId]);

  if (learned.rows.length > 0) return learned.rows[0];

  // Fallback naar standaard mapping
  return getDefaultAction(patternId);
}
```

---

### Response Builder
Assembleert de drie-delige respons:

```javascript
function buildResponse(acknowledgment, action) {
  return `${acknowledgment} ${action.description} Sluit de app en doe dit nu.`;
}
```

---

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
  "belief": "uncertainty_is_danger",
  "acknowledgment": "Je hoofd zoekt zekerheid die er nu niet hoeft te zijn.",
  "action": "Loop 10 minuten buiten.",
  "message": "Je hoofd zoekt zekerheid die er nu niet hoeft te zijn. Loop 10 minuten buiten. Sluit de app en doe dit nu.",
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

---

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
- Environment variabelen voor secrets — nooit in code
