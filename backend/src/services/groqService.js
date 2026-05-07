const Groq = require('groq-sdk');
const { detectPattern } = require('./patternService');
const { getBelief } = require('./beliefService');
const { getAction } = require('./actionService');

const PATTERNS = [
  'overthinking', 'rumination', 'analysis_paralysis', 'catastrophizing',
  'perfectionism', 'reassurance_seeking', 'mental_loop', 'future_worry',
  'overwhelm', 'emotional_numbness', 'emotional_block', 'shame_spiral',
  'guilt', 'grief', 'anger_buildup', 'anxiety', 'loneliness', 'sadness',
  'avoidance', 'procrastination', 'compulsive_checking', 'freeze',
  'people_pleasing', 'withdrawal', 'impulsivity', 'busyness_as_avoidance',
  'tension', 'restlessness', 'fatigue', 'disconnection', 'physical_agitation',
  'lost', 'meaninglessness', 'identity_confusion',
];

async function analyze(userMessage) {
  if (!process.env.GROQ_API_KEY) {
    return fallback(userMessage);
  }

  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 300,
      temperature: 0.7,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: `Je bent MOVE — een directe interventie-app. Je leest wat iemand schrijft en geeft één respons: erkenning van wat er écht speelt, en één concrete actie.

Beschikbare patronen: ${PATTERNS.join(', ')}

Geef altijd JSON terug in dit exacte formaat:
{
  "pattern": "<patroon uit de lijst>",
  "acknowledgment": "<één zin die laat zien dat je begrijpt wat er speelt — gebruik de woorden en situatie van de gebruiker, spreek de onderliggende angst aan>",
  "action": "<één concrete opdracht die nu uitvoerbaar is, fysiek of schrijvend, max 15 woorden>"
}

Regels:
- acknowledgment: geen "ik begrijp dat" of "het klinkt alsof" — schrijf direct naar de persoon
- acknowledgment: maximaal 20 woorden
- action: maximaal 15 woorden, geen uitleg
- Kies het patroon dat het meest dominant aanwezig is`,
        },
        {
          role: 'user',
          content: userMessage,
        },
      ],
    });

    const parsed = JSON.parse(completion.choices[0].message.content);

    if (!PATTERNS.includes(parsed.pattern)) {
      parsed.pattern = detectPattern(userMessage);
    }

    return {
      pattern: parsed.pattern,
      acknowledgment: parsed.acknowledgment,
      action: parsed.action,
    };
  } catch {
    return fallback(userMessage);
  }
}

function fallback(userMessage) {
  const pattern = detectPattern(userMessage);
  const { acknowledgment } = getBelief(pattern);
  const { action } = getAction(pattern);
  return { pattern, acknowledgment, action };
}

module.exports = { analyze };
