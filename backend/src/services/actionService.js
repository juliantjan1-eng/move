const defaultActions = {
  overthinking:          { interventionType: 'GROUND',   action: 'Voel je voeten op de grond. Druk ze stevig aan. Houd 30 seconden vast.' },
  rumination:            { interventionType: 'SHIFT',    action: 'Schrijf de gedachte op en leg je pen neer. Je hoeft er niets mee.' },
  analysis_paralysis:    { interventionType: 'START',    action: 'Kies de kleinste mogelijke eerste stap. Doe alleen die.' },
  catastrophizing:       { interventionType: 'GROUND',   action: 'Noem 5 dingen die je nu ziet. Dan 4 die je hoort.' },
  perfectionism:         { interventionType: 'START',    action: 'Maak het af zoals het nu is. Goed genoeg bestaat.' },
  reassurance_seeking:   { interventionType: 'WITNESS',  action: 'Wat zegt je lichaam? Dat antwoord is betrouwbaarder dan ieder ander.' },
  mental_loop:           { interventionType: 'BREATHE',  action: 'Adem 4 tellen in, 6 tellen uit. Drie keer. Niks anders.' },
  future_worry:          { interventionType: 'GROUND',   action: 'Wat is er nu, dit moment, echt aan de hand? Alleen dat.' },
  overwhelm:             { interventionType: 'REST',     action: 'Stop alles. Ga liggen of zitten. Twee minuten niks.' },
  emotional_numbness:    { interventionType: 'FEEL',     action: 'Leg je hand op je borst. Voel de warmte. Blijf daar.' },
  emotional_block:       { interventionType: 'FEEL',     action: 'Laat het er zijn zonder het te begrijpen. Adem er naartoe.' },
  shame_spiral:          { interventionType: 'WITNESS',  action: 'Spreek jezelf aan bij naam. Zeg: jij deed wat je kon.' },
  guilt:                 { interventionType: 'WRITE',    action: 'Schrijf wat je draagt op. Streep door wat niet van jou is.' },
  grief:                 { interventionType: 'FEEL',     action: 'Geef dit gevoel twee minuten ruimte. Het mag er zijn.' },
  anger_buildup:         { interventionType: 'RELEASE',  action: 'Span je handen aan en laat los. Drie keer. Laat het er uit.' },
  anxiety:               { interventionType: 'BREATHE',  action: 'Adem in voor 4, vast voor 4, uit voor 6. Nu.' },
  loneliness:            { interventionType: 'CONNECT',  action: 'Stuur één persoon een bericht. Niet uitleggen. Gewoon: hoi.' },
  sadness:               { interventionType: 'FEEL',     action: 'Laat de zwaarte er zijn. Zet je hand op je hart.' },
  avoidance:             { interventionType: 'START',    action: 'Doe 5 minuten. Alleen 5 minuten. Dan mag je stoppen.' },
  procrastination:       { interventionType: 'DECIDE',   action: 'Kies nu: doe het of schrap het. Er is geen derde optie.' },
  compulsive_checking:   { interventionType: 'GROUND',   action: 'Leg je telefoon weg. Voel je handen. Blijf daar.' },
  freeze:                { interventionType: 'MOVE',     action: 'Sta op. Loop naar een ander vertrek. Terug. Doe dit twee keer.' },
  people_pleasing:       { interventionType: 'WITNESS',  action: 'Wat wil jij? Schrijf het op voor je antwoordt.' },
  withdrawal:            { interventionType: 'CONNECT',  action: 'Reageer op één bericht. Klein. Geen uitleg nodig.' },
  impulsivity:           { interventionType: 'BREATHE',  action: 'Wacht 90 seconden. Alleen dat. Dan beslissen.' },
  busyness_as_avoidance: { interventionType: 'REST',     action: 'Stop nu. Twee minuten niks doen is ook iets doen.' },
  tension:               { interventionType: 'RELEASE',  action: 'Span je schouders op naar je oren. Laat los. Herhaal.' },
  restlessness:          { interventionType: 'MOVE',     action: 'Loop buiten één blok. Kijk wat je ziet. Kom terug.' },
  fatigue:               { interventionType: 'REST',     action: 'Tien minuten liggen zonder scherm. Zonder doel.' },
  disconnection:         { interventionType: 'GROUND',   action: 'Voel je gewicht op de stoel. Dan je handen. Dan je ademhaling.' },
  physical_agitation:    { interventionType: 'RELEASE',  action: 'Schud je handen los. Dan armen. Dan je hele lijf. 30 seconden.' },
  lost:                  { interventionType: 'MEANING',  action: 'Schrijf één ding op dat je deze week deed voor jezelf.' },
  meaninglessness:       { interventionType: 'MEANING',  action: 'Wat deed jij vandaag dat alleen jij kon doen?' },
  identity_confusion:    { interventionType: 'WRITE',    action: 'Schrijf drie dingen die waar zijn over jou als niemand kijkt.' },
};

function getAction(pattern) {
  return defaultActions[pattern] || defaultActions['overthinking'];
}

module.exports = { getAction };
