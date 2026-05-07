const { analyze } = require('../services/groqService');
const { getBelief } = require('../services/beliefService');
const supabase = require('../db/db');

async function handleChat(req, res) {
  const { userId, message } = req.body;

  if (!message || !userId) {
    return res.status(400).json({ error: 'userId en message zijn verplicht.' });
  }

  const { pattern: patternName, acknowledgment, action } = await analyze(message);
  const { belief: beliefName } = getBelief(patternName);

  try {
    await supabase.from('users').upsert({ id: userId }, { onConflict: 'id' });

    const { data: messageRow, error: msgErr } = await supabase
      .from('messages')
      .insert({ user_id: userId, content: message })
      .select('id')
      .single();
    if (msgErr) throw msgErr;

    const { data: pattern } = await supabase
      .from('patterns').select('id').eq('name', patternName).single();

    const { data: belief } = await supabase
      .from('beliefs').select('id').eq('name', beliefName).single();

    const { data: intervention, error: intErr } = await supabase
      .from('interventions')
      .insert({
        user_id: userId,
        message_id: messageRow.id,
        pattern_id: pattern?.id || null,
        belief_id: belief?.id || null,
        action_id: null,
        acknowledgment,
      })
      .select('id')
      .single();
    if (intErr) throw intErr;

    return res.json({ pattern: patternName, belief: beliefName, acknowledgment, action, interventionId: intervention.id });

  } catch (err) {
    console.error('DB error:', err.message);
    return res.json({
      pattern: patternName,
      belief: beliefName,
      acknowledgment,
      action,
      interventionId: crypto.randomUUID(),
    });
  }
}

module.exports = { handleChat };
