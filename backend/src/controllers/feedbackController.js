const supabase = require('../db/db');

async function handleFeedback(req, res) {
  const { interventionId, helpful } = req.body;

  if (!interventionId || helpful === undefined) {
    return res.status(400).json({ error: 'interventionId en helpful zijn verplicht.' });
  }

  try {
    const { error } = await supabase
      .from('feedback')
      .insert({ intervention_id: interventionId, helpful });

    if (error) throw error;

    return res.json({ success: true });
  } catch (err) {
    console.error('DB error:', err.message);
    return res.json({ success: true });
  }
}

module.exports = { handleFeedback };
