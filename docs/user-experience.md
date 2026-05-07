# Gebruikerservaring — MOVE

## Ontwerpprincipe

Een sessie in MOVE duurt maximaal 30–60 seconden. Als een gebruiker langer in de app zit, is er een ontwerpfout.

## Scherm 1 — Startscherm

Minimaal. Geen dashboard, geen geschiedenis, geen statistieken.

Alleen:
- De naam MOVE
- Één prompt: **"Wat speelt er?"**
- Een tekstinvoerveld
- Een verzendknop

De interface straalt rust en directheid uit. Geen afleidingen.

## Scherm 2 — Input

De gebruiker typt vrij. Geen format, geen vragen, geen structuur opgelegd.

Voorbeelden van wat een gebruiker typt:
- "Ik blijf maar nadenken over dat gesprek"
- "Ik weet niet wat ik moet doen"
- "Ik stel alles al de hele dag uit"
- "Ik voel me overweldigd"
- "Ik heb de drang om te checken"

De input hoeft niet volledig of goed geformuleerd te zijn. Het systeem werkt met signalen, niet met perfecte omschrijvingen.

## Scherm 3 — Respons

Het systeem toont één respons. Drie elementen:

1. **Korte erkenning** (max 1 zin)
2. **Één interventie**
3. **Exit-richting**

Voorbeeld:

> "Je zit vast in denken. Loop 10 minuten zonder telefoon. Sluit de app en ga nu."

De tekst is groot en leesbaar. Geen andere elementen op dit scherm behalve de respons en één knop:

**"Ik ga dit doen"**

Als de gebruiker nog een bericht probeert te sturen:

> "Je hebt je actie. Ga het doen. De app kan wachten."

## Scherm 4 — Feedback (later)

Wanneer de gebruiker terugkomt, toont de app één vraag:

**"Heeft dit geholpen?"**

Twee knoppen: **Ja** / **Nee**

Geen tekstveld. Geen uitleg gevraagd. Na de klik:

> "Goed. Kom terug als je het nodig hebt."

De app gaat terug naar het startscherm.

## Gedragsregels van het systeem

| Situatie | Systeemrespons |
|----------|----------------|
| Gebruiker stuurt tweede bericht direct na respons | "Je hebt je actie. Ga." |
| Gebruiker vraagt om uitleg | "Begrip helpt hier niet. De actie wel." |
| Gebruiker zegt dat de actie niet past | Geeft één alternatief, daarna exit |
| Gebruiker blijft typen | "Je bent aan het uitstellen. Sluit de app." |

## Tone of Voice

De app klinkt als een kalme, directe coach.

- Niet therapeutisch
- Niet motivationeel
- Niet robotisch
- Niet empathisch overdreven

Voorbeeldzinnen:
- "Je zit in het patroon. Hier is de uitgang."
- "Je hoeft er niet uit te denken. Beweeg."
- "Eén actie. Geen uitleg nodig."
- "Ga dit doen. De rest kan wachten."

## Wat de gebruiker nooit ziet

- Welk patroon het systeem heeft gedetecteerd
- Waarom deze interventie gekozen is
- Statistieken of grafieken (in v1)
- Geschiedenis van sessies (in v1)

De ervaring blijft altijd: **input → instructie → exit.**
