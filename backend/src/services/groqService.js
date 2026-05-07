const Groq = require('groq-sdk');

async function generateResponse(userMessage, pattern, belief, acknowledgmentFallback, actionFallback) {
  if (!process.env.GROQ_API_KEY) {
    return { acknowledgment: acknowledgmentFallback, action: actionFallback };
  }

  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const prompt = `Je bent MOVE — een directe, warme interventie-app voor mentale patronen. Je taak: schrijf een respons op basis van wat de gebruiker heeft geschreven.

Gedetecteerd patroon: ${pattern}
Onderliggende overtuiging: ${belief}

Wat de gebruiker schreef:
"${userMessage}"

Schrijf precies twee zinnen in het Nederlands:
1. ERKENNING — één zin die laat zien dat je begrijpt wat er speelt. Gebruik de woorden en situatie van de gebruiker. Spreek de onderliggende angst of overtuiging aan, niet alleen het gedrag.
2. ACTIE — één concrete, specifieke opdracht die de gebruiker nu kan uitvoeren. Fysiek, klein, uitvoerbaar binnen 5 minuten.

Regels:
- Geen uitleg, geen analyse, geen vragen
- Geen "ik begrijp dat..." of "het klinkt alsof..."
- Schrijf vanuit verbinding, niet vanuit afstand
- Maximaal 20 woorden per zin

Antwoord alleen als JSON: {"acknowledgment": "...", "action": "..."}`;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 200,
      response_format: { type: 'json_object' },
    });

    const parsed = JSON.parse(completion.choices[0].message.content);
    if (parsed.acknowledgment && parsed.action) {
      return { acknowledgment: parsed.acknowledgment, action: parsed.action };
    }
    return { acknowledgment: acknowledgmentFallback, action: actionFallback };
  } catch {
    return { acknowledgment: acknowledgmentFallback, action: actionFallback };
  }
}

module.exports = { generateResponse };
