function detectPattern(message) {
  const t = message.toLowerCase();

  if (t.match(/blijf.*denk|nadenk|loop.*hoofd|kan.*stoppen|cirkels/)) return 'overthinking';
  if (t.match(/blijf.*terug|loslaten|steeds.*denken.*aan|waarom.*deed/)) return 'rumination';
  if (t.match(/weet niet.*begin|te veel.*mogelijkheden|niet.*verder.*kom/)) return 'analysis_paralysis';
  if (t.match(/gaat.*fout|stel.*dat|wat.*als|ergste/)) return 'catastrophizing';
  if (t.match(/goed.*genoeg|perfect|durf.*niet.*begin/)) return 'perfectionism';
  if (t.match(/heb.*goed.*gedaan|is.*normaal|klopt.*dit|bevestig/)) return 'reassurance_seeking';
  if (t.match(/hoofd.*stopt.*niet|zelfde.*blijft|blijft.*terugkomen/)) return 'mental_loop';
  if (t.match(/zie.*tegenop|zorgen.*morgen|wat.*gaat.*gebeuren/)) return 'future_worry';
  if (t.match(/te.*veel|alles.*tegelijk|kan.*niet.*meer|overweldigd/)) return 'overwhelm';
  if (t.match(/voel.*niks|leeg|niet.*echt.*bij|weet.*niet.*voel/)) return 'emotional_numbness';
  if (t.match(/voel.*iets.*maar|houd.*tegen|kan.*niet.*huilen/)) return 'emotional_block';
  if (t.match(/schaam|schaamte|had.*niet.*mogen|ben.*stom/)) return 'shame_spiral';
  if (t.match(/mijn.*schuld|had.*beter|teleurgesteld/)) return 'guilt';
  if (t.match(/mis |het.*is.*weg|snap.*niet.*verder|verdrietig/)) return 'grief';
  if (t.match(/gefrustreerd|word.*gek|boos.*maar|klopt.*niet/)) return 'anger_buildup';
  if (t.match(/bang|angst|gespannen|hart.*bonkt|onrustig/)) return 'anxiety';
  if (t.match(/alleen|niemand.*begrijpt|mis.*verbinding/)) return 'loneliness';
  if (t.match(/down|niet.*blij|nergens.*zin|voelt.*zwaar/)) return 'sadness';
  if (t.match(/doe.*steeds.*niet|ga.*uit.*weg|wil.*er.*niet.*aan/)) return 'avoidance';
  if (t.match(/stel.*alweer.*uit|doe.*alles.*behalve|kom.*niet.*beweging/)) return 'procrastination';
  if (t.match(/blijf.*checken|telefoon.*neerleggen|moet.*steeds.*kijken/)) return 'compulsive_checking';
  if (t.match(/kan.*niks|helemaal.*niks|bevroren|zit.*vast/)) return 'freeze';
  if (t.match(/niemand.*teleurstellen|nee.*niet.*zeggen|doe.*voor.*ander/)) return 'people_pleasing';
  if (t.match(/wil.*niemand.*zien|trek.*me.*terug|reageer.*nergens/)) return 'withdrawal';
  if (t.match(/zonder.*nadenken|reageerde.*meteen|had.*niet.*moeten.*doen/)) return 'impulsivity';
  if (t.match(/blijf.*bezig|geen.*moment.*rust|als.*stop.*voel/)) return 'busyness_as_avoidance';
  if (t.match(/stijf|spanning.*lichaam|kaak|druk.*borst/)) return 'tension';
  if (t.match(/rusteloos|kan.*niet.*stilzitten|moet.*bewegen/)) return 'restlessness';
  if (t.match(/moe.*maar.*moet|geen.*energie|kom.*niet.*op.*gang/)) return 'fatigue';
  if (t.match(/er.*niet.*bij|in.*hoofd|voel.*lichaam.*niet/)) return 'disconnection';
  if (t.match(/adrenaline|opgedraaid|tril/)) return 'physical_agitation';
  if (t.match(/weet.*niet.*wil|voel.*verloren|geen.*richting/)) return 'lost';
  if (t.match(/wat.*heeft.*zin|maakt.*niet.*uit|geen.*motivatie/)) return 'meaninglessness';
  if (t.match(/weet.*niet.*wie|doe.*voor.*anderen|wat.*wil.*ik.*zelf/)) return 'identity_confusion';

  return 'overthinking';
}

module.exports = { detectPattern };
