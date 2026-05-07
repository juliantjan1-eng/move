const defaultActions = {
  overthinking:          { interventionType: 'GROUND', action: 'Voel je voeten op de grond. Druk ze stevig aan. Houd 30 seconden vast.' },
  rumination:            { interventionType: 'WRITE',  action: 'Schrijf 5 minuten alles op wat in je hoofd zit. Stop daarna. Lees het niet terug.' },
  analysis_paralysis:    { interventionType: 'DECIDE', action: 'Kies optie A. Niet nadenken. Doe het voor 24 uur.' },
  catastrophizing:       { interventionType: 'WITNESS',action: 'Zeg tegen jezelf: "Ik heb een gedachte dat het fout gaat." Het is een gedachte, geen feit.' },
  perfectionism:         { interventionType: 'START',  action: 'Open het document. Schrijf één zin. Meer hoeft niet.' },
  reassurance_seeking:   { interventionType: 'GROUND', action: 'Noem hardop 5 dingen die je nu ziet.' },
  mental_loop:           { interventionType: 'GROUND', action: 'Pak een object vast. Voel het gewicht, de textuur, de temperatuur.' },
  future_worry:          { interventionType: 'BREATHE',action: 'Fysiologische zucht: twee keer snel inademen, lang uitblazen. 3 keer herhalen.' },
  overwhelm:             { interventionType: 'BREATHE',action: 'Box breathing: 4 tellen in, 4 vasthouden, 4 uit, 4 vasthouden. 4 rondes.' },
  emotional_numbness:    { interventionType: 'FEEL',   action: 'Leg je hand op je borst. Adem. Voel wat er is zonder het te benoemen.' },
  emotional_block:       { interventionType: 'FEEL',   action: 'Zit 3 minuten met het gevoel. Geen oplossing zoeken. Alleen voelen waar het zit.' },
  shame_spiral:          { interventionType: 'WITNESS',action: 'Vraag jezelf: "Als een vriend dit voelde, wat zou ik hem zeggen?"' },
  guilt:                 { interventionType: 'WRITE',  action: 'Schrijf één zin: wat er is gebeurd. Daarna niets meer. Zit met die zin.' },
  grief:                 { interventionType: 'FEEL',   action: 'Ga liggen. Voel het gewicht van je lichaam. Laat alles zakken.' },
  anger_buildup:         { interventionType: 'RELEASE',action: 'Schreeuw in een kussen. Hard. Zo lang als nodig.' },
  anxiety:               { interventionType: 'BREATHE',action: 'Verlengde uitademing: in 4 tellen, uit 8 tellen. 5 minuten.' },
  loneliness:            { interventionType: 'CONNECT',action: 'Bel iemand. Niet om het op te lossen. Gewoon om te horen.' },
  sadness:               { interventionType: 'FEEL',   action: 'Zet muziek op die past bij wat je voelt. Luister volledig, doe niets anders.' },
  avoidance:             { interventionType: 'START',  action: 'Doe het 5 minuten. Zet een timer. Daarna mag je stoppen.' },
  procrastination:       { interventionType: 'START',  action: 'Zet een timer op 5 minuten. Begin. Als de timer afgaat mag je stoppen.' },
  compulsive_checking:   { interventionType: 'GROUND', action: 'Koud water over je handen. Blijf er even in.' },
  freeze:                { interventionType: 'MOVE',   action: 'Sta op en schud je lichaam los — armen, benen, nek — 2 minuten.' },
  people_pleasing:       { interventionType: 'WITNESS',action: 'Schrijf op: "Wat wil ik hier eigenlijk?" Niet wat een ander wil.' },
  withdrawal:            { interventionType: 'CONNECT',action: 'Stuur een bericht aan iemand: "Ik denk aan je."' },
  impulsivity:           { interventionType: 'BREATHE',action: 'Stop. Adem in 4, uit 8. Doe dit 3 keer voor je iets doet.' },
  busyness_as_avoidance: { interventionType: 'REST',   action: 'Ga 20 minuten liggen zonder telefoon of muziek. Doe niets.' },
  tension:               { interventionType: 'BREATHE',action: 'Adem in en span al je spieren tegelijk aan. Houd 5 seconden. Laat los.' },
  restlessness:          { interventionType: 'MOVE',   action: 'Loop 10 minuten buiten, zonder telefoon of muziek.' },
  fatigue:               { interventionType: 'REST',   action: 'Sluit alle tabs. Zet je scherm op zwart. Wacht 10 minuten.' },
  disconnection:         { interventionType: 'GROUND', action: 'Ga staan. Voel hoe je gewicht verdeeld is over je voeten.' },
  physical_agitation:    { interventionType: 'RELEASE',action: 'Ren zo hard je kan voor 2 minuten.' },
  lost:                  { interventionType: 'MEANING',action: 'Schrijf één zin: "Dit doet ertoe voor mij omdat ___."' },
  meaninglessness:       { interventionType: 'MEANING',action: 'Doe één kleine handeling die je trots op zou maken.' },
  identity_confusion:    { interventionType: 'WITNESS',action: 'Schrijf op: "Als niemand keek, wat zou ik dan kiezen?"' },
};

function getAction(pattern) {
  return defaultActions[pattern] || defaultActions['overthinking'];
}

module.exports = { getAction };
