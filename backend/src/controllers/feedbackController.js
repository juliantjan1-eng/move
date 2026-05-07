async function handleFeedback(req, res) {
  const { interventionId, helpful } = req.body;

  if (!interventionId || helpful === undefined) {
    return res.status(400).json({ error: 'interventionId en helpful zijn verplicht.' });
  }

  // Fase 4: opslaan in database
  // Voorlopig: bevestig ontvangst
  res.json({ success: true });
}

module.exports = { handleFeedback };
