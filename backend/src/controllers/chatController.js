const { detectPattern } = require('../services/patternService');
const { getBelief } = require('../services/beliefService');
const { getAction } = require('../services/actionService');
const { v4: uuidv4 } = require('uuid');

async function handleChat(req, res) {
  const { userId, message } = req.body;

  if (!message || !userId) {
    return res.status(400).json({ error: 'userId en message zijn verplicht.' });
  }

  const pattern = detectPattern(message);
  const { belief, acknowledgment } = getBelief(pattern);
  const { interventionType, action } = getAction(pattern);

  const fullMessage = `${acknowledgment} ${action} Sluit de app en doe dit nu.`;

  res.json({
    pattern,
    belief,
    acknowledgment,
    action,
    message: fullMessage,
    interventionId: uuidv4(),
  });
}

module.exports = { handleChat };
