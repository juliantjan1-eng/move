const { detectPattern } = require('../services/patternService');
const { getBelief } = require('../services/beliefService');
const { getAction } = require('../services/actionService');
const { generateResponse } = require('../services/groqService');
const supabase = require('../db/db');

async function handleChat(req, res) {
  const { userId, message } = req.body;

  if (!message || !userId) {
    return res.status(400).json({ error: 'userId en message zijn verplicht.' });
  }

  const patternName = detectPattern(message);
  const { belief: beliefName, acknowledgment: fallbackAcknowledgment } = getBelief(patternName);
  const { interventionType, action: fallbackAction } = getAction(patternName);

  // Genereer gepersonaliseerde respons via Groq (of fallback naar statisch)
  const { acknowledgment, action: actionDescription } = await generateResponse(
    message,
    patternName,
    beliefName,
    fallbackAcknowledgment,
    fallbackAction
  );

  try {
    await supabase.from('users').upsert({ id: userId }, { onConflict: 'id' });

    const { data: messageRow, error: msgErr } = await supabase
      .from('messages')
      .insert({ user_id: userId, content: message })
      .select('id')
      .single();
    if (msgErr) throw msgErr;

    const { data: pattern } = await supabase
      .from('patterns')
      .select('id')
      .eq('name', patternName)
      .single();

    const { data: belief } = await supabase
      .from('beliefs')
      .select('id')
      .eq('name', beliefName)
      .single();

    let actionId = null;
    let finalAction = actionDescription;

    if (pattern) {
      const { data: learnedAction } = await supabase.rpc('best_action_for_user', {
        p_user_id: userId,
        p_pattern_id: pattern.id,
      });
      if (learnedAction && learnedAction.length > 0) {
        actionId = learnedAction[0].action_id;
        finalAction = learnedAction[0].action_description;
      }
    }

    if (!actionId) {
      const { data: defaultAction } = await supabase
        .from('actions')
        .select('id, description')
        .eq('description', fallbackAction)
        .single();
      if (defaultAction) {
        actionId = defaultAction.id;
      }
    }

    const { data: intervention, error: intErr } = await supabase
      .from('interventions')
      .insert({
        user_id: userId,
        message_id: messageRow.id,
        pattern_id: pattern?.id || null,
        belief_id: belief?.id || null,
        action_id: actionId,
        acknowledgment,
      })
      .select('id')
      .single();
    if (intErr) throw intErr;

    return res.json({
      pattern: patternName,
      belief: beliefName,
      acknowledgment,
      action: finalAction,
      interventionId: intervention.id,
    });

  } catch (err) {
    console.error('DB error:', err.message);
    return res.json({
      pattern: patternName,
      belief: beliefName,
      acknowledgment,
      action: actionDescription,
      interventionId: crypto.randomUUID(),
    });
  }
}

module.exports = { handleChat };
