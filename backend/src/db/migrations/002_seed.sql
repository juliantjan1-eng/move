-- MOVE — Seed data
-- Run this after 001_initial.sql

-- Beliefs
INSERT INTO beliefs (name, category, acknowledgment_phrase) VALUES
  ('uncertainty_is_danger',   'safety',         'Je hoofd zoekt zekerheid die er nu niet hoeft te zijn.'),
  ('should_have_known',       'responsibility', 'Je blijft teruggaan naar iets wat al voorbij is.'),
  ('must_be_certain',         'safety',         'Je wacht op zekerheid die er niet komt voor je begint.'),
  ('world_is_unsafe',         'safety',         'Je systeem staat aan alsof er gevaar is — ook al is er geen.'),
  ('not_enough',              'worth',          'Je waarde voelt afhankelijk van hoe goed dit wordt.'),
  ('cant_trust_self',         'competence',     'Je vertrouwt je eigen waarneming niet genoeg.'),
  ('must_control',            'safety',         'Je probeert grip te krijgen op iets wat zich niet laat grijpen.'),
  ('not_capable',             'competence',     'Het voelt alsof je het niet aankan.'),
  ('emotions_are_dangerous',  'expression',     'Je houdt iets buiten omdat volledig voelen eng aanvoelt.'),
  ('emotions_are_too_much',   'expression',     'Er is iets wat wil komen maar je houdt het tegen.'),
  ('fundamentally_flawed',    'worth',          'Er is een stemmetje dat zegt dat jij het probleem bent.'),
  ('responsible_for_all',     'responsibility', 'Je draagt iets wat niet alleen van jou is.'),
  ('will_be_abandoned',       'connection',     'Er is een verlies dat ruimte vraagt.'),
  ('helpless',                'competence',     'Het voelt alsof je geen kant op kunt.'),
  ('dont_belong',             'connection',     'Er is een gevoel dat je er niet echt bij hoort.'),
  ('things_wont_improve',     'permanence',     'Het voelt alsof dit zo blijft.'),
  ('will_fail',               'competence',     'Er is een verwachting dat het toch fout gaat.'),
  ('conditional_love',        'connection',     'Je past je aan om geaccepteerd te blijven.'),
  ('if_known_rejected',       'connection',     'Je trekt je terug om jezelf te beschermen.'),
  ('must_earn_worth',         'worth',          'Je waarde voelt afhankelijk van wat je doet.'),
  ('must_be_alert',           'safety',         'Je lichaam staat op scherp alsof het moet beschermen.'),
  ('this_is_who_i_am',        'permanence',     'Je weet niet wie je bent los van wat je doet voor anderen.'),
  ('dont_deserve_better',     'worth',          'Het voelt alsof het er niet toe doet.'),
  ('must_adapt',              'expression',     'Je weet niet wie je bent als je niet aan het aanpassen bent.')
ON CONFLICT (name) DO NOTHING;

-- Patterns
INSERT INTO patterns (name, description, category) VALUES
  ('overthinking',          'Blijft ronddraaien in gedachten',                    'cognitive'),
  ('rumination',            'Herhaaldelijk terugkeren naar het verleden',          'cognitive'),
  ('analysis_paralysis',    'Te veel opties, kan niet kiezen of beginnen',         'cognitive'),
  ('catastrophizing',       'Verwacht het ergste scenario',                        'cognitive'),
  ('perfectionism',         'Kan niet beginnen omdat het perfect moet zijn',       'cognitive'),
  ('reassurance_seeking',   'Zoekt constant bevestiging',                          'cognitive'),
  ('mental_loop',           'Dezelfde gedachte herhaalt zich',                     'cognitive'),
  ('future_worry',          'Angst over iets dat nog moet komen',                  'cognitive'),
  ('overwhelm',             'Te veel tegelijk, kan niet prioriteren',              'emotional'),
  ('emotional_numbness',    'Voelt niets, afgesloten van eigen gevoel',            'emotional'),
  ('emotional_block',       'Voelt iets maar kan er niet bij',                     'emotional'),
  ('shame_spiral',          'Schaamte die zichzelf versterkt',                     'emotional'),
  ('guilt',                 'Gevoel van schuld of verantwoordelijkheid',           'emotional'),
  ('grief',                 'Verdriet of verlies, vastzittend',                    'emotional'),
  ('anger_buildup',         'Opgebouwde boosheid die nergens heen kan',            'emotional'),
  ('anxiety',               'Diffuse angst of spanning',                           'emotional'),
  ('loneliness',            'Gevoel van isolatie',                                 'emotional'),
  ('sadness',               'Neerslachtigheid, somberheid',                        'emotional'),
  ('avoidance',             'Vermijdt bewust iets wat aandacht vraagt',            'behavioral'),
  ('procrastination',       'Stelt actie uit',                                     'behavioral'),
  ('compulsive_checking',   'Drang om te checken',                                 'behavioral'),
  ('freeze',                'Compleet stilstaan, geen actie mogelijk',             'behavioral'),
  ('people_pleasing',       'Gedrag aanpassen aan verwachtingen van anderen',      'behavioral'),
  ('withdrawal',            'Trekt zich terug, isoleert zich',                     'behavioral'),
  ('impulsivity',           'Handelt voor hij nadenkt',                            'behavioral'),
  ('busyness_as_avoidance', 'Vult alle tijd om iets niet te hoeven voelen',        'behavioral'),
  ('tension',               'Fysieke spanning in lichaam',                         'somatic'),
  ('restlessness',          'Kan niet stilzitten, innerlijke onrust',              'somatic'),
  ('fatigue',               'Uitputting, laag energieniveau',                      'somatic'),
  ('disconnection',         'Gevoel van niet in het lichaam zitten',               'somatic'),
  ('physical_agitation',    'Lichamelijke activatie zonder uitlaatklep',           'somatic'),
  ('lost',                  'Geen richting, weet niet wat hij wil',                'existential'),
  ('meaninglessness',       'Alles voelt zinloos of leeg',                         'existential'),
  ('identity_confusion',    'Twijfelt aan wie hij is',                             'existential')
ON CONFLICT (name) DO NOTHING;

-- Intervention types
INSERT INTO intervention_types (name, description) VALUES
  ('GROUND',  'Terug naar het heden via de zintuigen'),
  ('BREATHE', 'Zenuwstelsel reguleren via ademhaling'),
  ('MOVE',    'Fysieke activatie'),
  ('START',   'Frictie verlagen voor actie'),
  ('DECIDE',  'Keuzestress doorbreken'),
  ('FEEL',    'Emotie toelaten zonder verhaal'),
  ('RELEASE', 'Fysieke of emotionele ontlading'),
  ('WRITE',   'Gericht schrijven'),
  ('CONNECT', 'Sociale verbinding'),
  ('REST',    'Bewust stoppen'),
  ('SHIFT',   'Omgeving of context veranderen'),
  ('WITNESS', 'Observeren zonder oordeel'),
  ('MEANING', 'Verbinding met richting herstellen')
ON CONFLICT (name) DO NOTHING;

-- Actions (one per intervention type as default)
INSERT INTO actions (intervention_type_id, description)
SELECT id, 'Voel je voeten op de grond. Druk ze stevig aan. Houd 30 seconden vast.'
FROM intervention_types WHERE name = 'GROUND';

INSERT INTO actions (intervention_type_id, description)
SELECT id, 'Noem hardop 5 dingen die je nu ziet, 4 dingen die je voelt, 3 dingen die je hoort.'
FROM intervention_types WHERE name = 'GROUND';

INSERT INTO actions (intervention_type_id, description)
SELECT id, 'Koud water over je handen of gezicht. Blijf er even in.'
FROM intervention_types WHERE name = 'GROUND';

INSERT INTO actions (intervention_type_id, description)
SELECT id, 'Fysiologische zucht: twee keer snel inademen, lang uitblazen. 3 keer herhalen.'
FROM intervention_types WHERE name = 'BREATHE';

INSERT INTO actions (intervention_type_id, description)
SELECT id, 'Box breathing: 4 tellen in, 4 vasthouden, 4 uit, 4 vasthouden. 4 rondes.'
FROM intervention_types WHERE name = 'BREATHE';

INSERT INTO actions (intervention_type_id, description)
SELECT id, 'Verlengde uitademing: in 4 tellen, uit 8 tellen. 5 minuten.'
FROM intervention_types WHERE name = 'BREATHE';

INSERT INTO actions (intervention_type_id, description)
SELECT id, 'Loop 10 minuten buiten, zonder telefoon of muziek.'
FROM intervention_types WHERE name = 'MOVE';

INSERT INTO actions (intervention_type_id, description)
SELECT id, 'Schud je lichaam los — armen, benen, nek, heupen — 2 minuten.'
FROM intervention_types WHERE name = 'MOVE';

INSERT INTO actions (intervention_type_id, description)
SELECT id, 'Doe 20 jumping jacks of push-ups nu.'
FROM intervention_types WHERE name = 'MOVE';

INSERT INTO actions (intervention_type_id, description)
SELECT id, 'Open het document. Schrijf één zin. Meer hoeft niet.'
FROM intervention_types WHERE name = 'START';

INSERT INTO actions (intervention_type_id, description)
SELECT id, 'Zet een timer op 5 minuten. Begin. Als de timer afgaat mag je stoppen.'
FROM intervention_types WHERE name = 'START';

INSERT INTO actions (intervention_type_id, description)
SELECT id, 'Stuur het bericht nu. Niet herschrijven. Verzenden.'
FROM intervention_types WHERE name = 'START';

INSERT INTO actions (intervention_type_id, description)
SELECT id, 'Kies optie A. Niet nadenken. Doe het voor 24 uur.'
FROM intervention_types WHERE name = 'DECIDE';

INSERT INTO actions (intervention_type_id, description)
SELECT id, 'Schrijf de twee opties op. Kies degene die voelt als minder erg.'
FROM intervention_types WHERE name = 'DECIDE';

INSERT INTO actions (intervention_type_id, description)
SELECT id, 'Zet een timer op 2 minuten. Kies voor de timer afgaat.'
FROM intervention_types WHERE name = 'DECIDE';

INSERT INTO actions (intervention_type_id, description)
SELECT id, 'Zit 3 minuten met het gevoel. Geen oplossing zoeken. Alleen voelen waar het zit.'
FROM intervention_types WHERE name = 'FEEL';

INSERT INTO actions (intervention_type_id, description)
SELECT id, 'Leg je hand op je borst of buik. Adem. Voel wat er is zonder het te benoemen.'
FROM intervention_types WHERE name = 'FEEL';

INSERT INTO actions (intervention_type_id, description)
SELECT id, 'Ga liggen. Voel het gewicht van je lichaam. Laat alles zakken.'
FROM intervention_types WHERE name = 'FEEL';

INSERT INTO actions (intervention_type_id, description)
SELECT id, 'Schreeuw in een kussen. Hard. Zo lang als nodig.'
FROM intervention_types WHERE name = 'RELEASE';

INSERT INTO actions (intervention_type_id, description)
SELECT id, 'Stamp hard met je voeten op de grond, 20 keer.'
FROM intervention_types WHERE name = 'RELEASE';

INSERT INTO actions (intervention_type_id, description)
SELECT id, 'Ren zo hard je kan voor 2 minuten.'
FROM intervention_types WHERE name = 'RELEASE';

INSERT INTO actions (intervention_type_id, description)
SELECT id, 'Schrijf 5 minuten alles op wat in je hoofd zit. Stop daarna. Lees het niet terug.'
FROM intervention_types WHERE name = 'WRITE';

INSERT INTO actions (intervention_type_id, description)
SELECT id, 'Schrijf een brief die je nooit verstuurt. Zeg alles.'
FROM intervention_types WHERE name = 'WRITE';

INSERT INTO actions (intervention_type_id, description)
SELECT id, 'Schrijf op: "Het enige wat ik nu kan doen is ___."'
FROM intervention_types WHERE name = 'WRITE';

INSERT INTO actions (intervention_type_id, description)
SELECT id, 'Bel iemand. Niet om het op te lossen. Gewoon om te horen.'
FROM intervention_types WHERE name = 'CONNECT';

INSERT INTO actions (intervention_type_id, description)
SELECT id, 'Stuur een bericht aan iemand: "Ik denk aan je."'
FROM intervention_types WHERE name = 'CONNECT';

INSERT INTO actions (intervention_type_id, description)
SELECT id, 'Ga 20 minuten liggen zonder telefoon, muziek of podcast. Doe niets.'
FROM intervention_types WHERE name = 'REST';

INSERT INTO actions (intervention_type_id, description)
SELECT id, 'Sluit alle tabs. Zet je scherm op zwart. Wacht 10 minuten.'
FROM intervention_types WHERE name = 'REST';

INSERT INTO actions (intervention_type_id, description)
SELECT id, 'Ga naar een andere kamer of ga naar buiten.'
FROM intervention_types WHERE name = 'SHIFT';

INSERT INTO actions (intervention_type_id, description)
SELECT id, 'Ruim je bureau of de ruimte om je heen op.'
FROM intervention_types WHERE name = 'SHIFT';

INSERT INTO actions (intervention_type_id, description)
SELECT id, 'Zeg tegen jezelf: "Ik heb een gedachte dat ___." Het is een gedachte, geen feit.'
FROM intervention_types WHERE name = 'WITNESS';

INSERT INTO actions (intervention_type_id, description)
SELECT id, 'Vraag jezelf: "Als een vriend dit voelde, wat zou ik hem zeggen?"'
FROM intervention_types WHERE name = 'WITNESS';

INSERT INTO actions (intervention_type_id, description)
SELECT id, 'Schrijf één zin: "Dit doet ertoe voor mij omdat ___."'
FROM intervention_types WHERE name = 'MEANING';

INSERT INTO actions (intervention_type_id, description)
SELECT id, 'Doe één kleine handeling die je trots op zou maken.'
FROM intervention_types WHERE name = 'MEANING';

-- Pattern belief map
INSERT INTO pattern_belief_map (pattern_id, belief_id, is_primary)
SELECT p.id, b.id, true FROM patterns p, beliefs b
WHERE p.name = 'overthinking'       AND b.name = 'uncertainty_is_danger';

INSERT INTO pattern_belief_map (pattern_id, belief_id, is_primary)
SELECT p.id, b.id, true FROM patterns p, beliefs b
WHERE p.name = 'rumination'         AND b.name = 'should_have_known';

INSERT INTO pattern_belief_map (pattern_id, belief_id, is_primary)
SELECT p.id, b.id, true FROM patterns p, beliefs b
WHERE p.name = 'analysis_paralysis' AND b.name = 'must_be_certain';

INSERT INTO pattern_belief_map (pattern_id, belief_id, is_primary)
SELECT p.id, b.id, true FROM patterns p, beliefs b
WHERE p.name = 'catastrophizing'    AND b.name = 'world_is_unsafe';

INSERT INTO pattern_belief_map (pattern_id, belief_id, is_primary)
SELECT p.id, b.id, true FROM patterns p, beliefs b
WHERE p.name = 'perfectionism'      AND b.name = 'not_enough';

INSERT INTO pattern_belief_map (pattern_id, belief_id, is_primary)
SELECT p.id, b.id, true FROM patterns p, beliefs b
WHERE p.name = 'reassurance_seeking' AND b.name = 'cant_trust_self';

INSERT INTO pattern_belief_map (pattern_id, belief_id, is_primary)
SELECT p.id, b.id, true FROM patterns p, beliefs b
WHERE p.name = 'mental_loop'        AND b.name = 'must_control';

INSERT INTO pattern_belief_map (pattern_id, belief_id, is_primary)
SELECT p.id, b.id, true FROM patterns p, beliefs b
WHERE p.name = 'future_worry'       AND b.name = 'world_is_unsafe';

INSERT INTO pattern_belief_map (pattern_id, belief_id, is_primary)
SELECT p.id, b.id, true FROM patterns p, beliefs b
WHERE p.name = 'overwhelm'          AND b.name = 'not_capable';

INSERT INTO pattern_belief_map (pattern_id, belief_id, is_primary)
SELECT p.id, b.id, true FROM patterns p, beliefs b
WHERE p.name = 'emotional_numbness' AND b.name = 'emotions_are_dangerous';

INSERT INTO pattern_belief_map (pattern_id, belief_id, is_primary)
SELECT p.id, b.id, true FROM patterns p, beliefs b
WHERE p.name = 'emotional_block'    AND b.name = 'emotions_are_too_much';

INSERT INTO pattern_belief_map (pattern_id, belief_id, is_primary)
SELECT p.id, b.id, true FROM patterns p, beliefs b
WHERE p.name = 'shame_spiral'       AND b.name = 'fundamentally_flawed';

INSERT INTO pattern_belief_map (pattern_id, belief_id, is_primary)
SELECT p.id, b.id, true FROM patterns p, beliefs b
WHERE p.name = 'guilt'              AND b.name = 'responsible_for_all';

INSERT INTO pattern_belief_map (pattern_id, belief_id, is_primary)
SELECT p.id, b.id, true FROM patterns p, beliefs b
WHERE p.name = 'grief'              AND b.name = 'will_be_abandoned';

INSERT INTO pattern_belief_map (pattern_id, belief_id, is_primary)
SELECT p.id, b.id, true FROM patterns p, beliefs b
WHERE p.name = 'anger_buildup'      AND b.name = 'helpless';

INSERT INTO pattern_belief_map (pattern_id, belief_id, is_primary)
SELECT p.id, b.id, true FROM patterns p, beliefs b
WHERE p.name = 'anxiety'            AND b.name = 'world_is_unsafe';

INSERT INTO pattern_belief_map (pattern_id, belief_id, is_primary)
SELECT p.id, b.id, true FROM patterns p, beliefs b
WHERE p.name = 'loneliness'         AND b.name = 'dont_belong';

INSERT INTO pattern_belief_map (pattern_id, belief_id, is_primary)
SELECT p.id, b.id, true FROM patterns p, beliefs b
WHERE p.name = 'sadness'            AND b.name = 'things_wont_improve';

INSERT INTO pattern_belief_map (pattern_id, belief_id, is_primary)
SELECT p.id, b.id, true FROM patterns p, beliefs b
WHERE p.name = 'avoidance'          AND b.name = 'will_fail';

INSERT INTO pattern_belief_map (pattern_id, belief_id, is_primary)
SELECT p.id, b.id, true FROM patterns p, beliefs b
WHERE p.name = 'procrastination'    AND b.name = 'must_be_certain';

INSERT INTO pattern_belief_map (pattern_id, belief_id, is_primary)
SELECT p.id, b.id, true FROM patterns p, beliefs b
WHERE p.name = 'compulsive_checking' AND b.name = 'must_control';

INSERT INTO pattern_belief_map (pattern_id, belief_id, is_primary)
SELECT p.id, b.id, true FROM patterns p, beliefs b
WHERE p.name = 'freeze'             AND b.name = 'helpless';

INSERT INTO pattern_belief_map (pattern_id, belief_id, is_primary)
SELECT p.id, b.id, true FROM patterns p, beliefs b
WHERE p.name = 'people_pleasing'    AND b.name = 'conditional_love';

INSERT INTO pattern_belief_map (pattern_id, belief_id, is_primary)
SELECT p.id, b.id, true FROM patterns p, beliefs b
WHERE p.name = 'withdrawal'         AND b.name = 'if_known_rejected';

INSERT INTO pattern_belief_map (pattern_id, belief_id, is_primary)
SELECT p.id, b.id, true FROM patterns p, beliefs b
WHERE p.name = 'impulsivity'        AND b.name = 'emotions_are_dangerous';

INSERT INTO pattern_belief_map (pattern_id, belief_id, is_primary)
SELECT p.id, b.id, true FROM patterns p, beliefs b
WHERE p.name = 'busyness_as_avoidance' AND b.name = 'emotions_are_dangerous';

INSERT INTO pattern_belief_map (pattern_id, belief_id, is_primary)
SELECT p.id, b.id, true FROM patterns p, beliefs b
WHERE p.name = 'tension'            AND b.name = 'must_be_alert';

INSERT INTO pattern_belief_map (pattern_id, belief_id, is_primary)
SELECT p.id, b.id, true FROM patterns p, beliefs b
WHERE p.name = 'restlessness'       AND b.name = 'must_control';

INSERT INTO pattern_belief_map (pattern_id, belief_id, is_primary)
SELECT p.id, b.id, true FROM patterns p, beliefs b
WHERE p.name = 'fatigue'            AND b.name = 'must_earn_worth';

INSERT INTO pattern_belief_map (pattern_id, belief_id, is_primary)
SELECT p.id, b.id, true FROM patterns p, beliefs b
WHERE p.name = 'disconnection'      AND b.name = 'emotions_are_dangerous';

INSERT INTO pattern_belief_map (pattern_id, belief_id, is_primary)
SELECT p.id, b.id, true FROM patterns p, beliefs b
WHERE p.name = 'physical_agitation' AND b.name = 'world_is_unsafe';

INSERT INTO pattern_belief_map (pattern_id, belief_id, is_primary)
SELECT p.id, b.id, true FROM patterns p, beliefs b
WHERE p.name = 'lost'               AND b.name = 'this_is_who_i_am';

INSERT INTO pattern_belief_map (pattern_id, belief_id, is_primary)
SELECT p.id, b.id, true FROM patterns p, beliefs b
WHERE p.name = 'meaninglessness'    AND b.name = 'dont_deserve_better';

INSERT INTO pattern_belief_map (pattern_id, belief_id, is_primary)
SELECT p.id, b.id, true FROM patterns p, beliefs b
WHERE p.name = 'identity_confusion' AND b.name = 'must_adapt';
