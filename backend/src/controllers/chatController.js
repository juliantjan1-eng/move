const { detectPattern } = require('../services/patternService');
const { getBelief } = require('../services/beliefService');
const { getAction } = require('../services/actionService');
const supabase = require('../db/db');

async function handleChat(req, res) {
  const { userId, message } = req.body;

  if (!message || !userId) {
    return res.status(400).json({ error: 'userId en message zijn verplicht.' });
  }

  const patternName = detectPattern(message);
  const { belief: beliefName, acknowledgment } = getBelief(patternName);
  const { interventionType, action: actionDescription } = getAction(patternName);

  const fullMessage = `${acknowledgment} ${actionDescription} Sluit de app en doe dit nu.`;

  try {
    // Zorg dat user bestaat
    await supabase.from('users').upsert({ id: userId }, { onConflict: 'id' });

    // Sla bericht op
    const { data: messageRow, error: msgErr } = await supabase
      .from('messages')
      .insert({ user_id: userId, content: message })
      .select('id')
      .single();
    if (msgErr) throw msgErr;

    // Haal pattern id op
    const { data: pattern } = await supabase
      .from('patterns')
      .select('id')
      .eq('name', patternName)
      .single();

    // Haal belief id op
    const { data: belief } = await supabase
      .from('beliefs')
      .select('id')
      .eq('name', beliefName)
      .single();

    // Zoek beste actie op basis van feedback geschiedenis
    let actionId = null;
    let finalAction = actionDescription;

    if (pattern && belief) {
      const { data: learnedAction } = await supabase.rpc('best_action_for_user', {
        p_user_id: userId,
        p_pattern_id: pattern.id,
      });

      if (learnedAction && learnedAction.length > 0) {
        actionId = learnedAction[0].action_id;
        finalAction = learnedAction[0].action_description;
      }
    }

    // Fallback: pak standaard actie uit database
    if (!actionId) {
      const { data: defaultAction } = await supabase
        .from('actions')
        .select('id, description')
        .eq('description', actionDescription)
        .single();
      if (defaultAction) {
        actionId = defaultAction.id;
        finalAction = defaultAction.description;
      }
    }

    // Sla interventie op
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
      message: `${acknowledgment} ${finalAction} Sluit de app en doe dit nu.`,
      interventionId: intervention.id,
    });

  } catch (err) {
    console.error('DB error:', err.message);
    // Fallback zonder database
    return res.json({
      pattern: patternName,
      belief: beliefName,
      acknowledgment,
      action: actionDescription,
      message: fullMessage,
      interventionId: crypto.randomUUID(),
    });
  }
}

module.exports = { handleChat };
