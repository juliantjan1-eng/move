const supabase = require('../db/db');

async function handleStats(req, res) {
  const { password } = req.query;
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Ongeldig wachtwoord.' });
  }

  const [messages, interventions, feedback, patterns] = await Promise.all([
    supabase
      .from('messages')
      .select('id, content, created_at, user_id')
      .order('created_at', { ascending: false })
      .limit(50),

    supabase
      .from('interventions')
      .select('id, acknowledgment, created_at, user_id, patterns(name), beliefs(name)')
      .order('created_at', { ascending: false })
      .limit(50),

    supabase
      .from('feedback')
      .select('id, helpful, created_at, intervention_id')
      .order('created_at', { ascending: false })
      .limit(100),

    supabase
      .from('interventions')
      .select('patterns(name)'),
  ]);

  // Patroon statistieken
  const patternCounts = {};
  (patterns.data || []).forEach(({ patterns: p }) => {
    if (p?.name) patternCounts[p.name] = (patternCounts[p.name] || 0) + 1;
  });
  const patternStats = Object.entries(patternCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));

  // Feedback stats
  const feedbackData = feedback.data || [];
  const helpfulCount = feedbackData.filter(f => f.helpful).length;
  const notHelpfulCount = feedbackData.filter(f => !f.helpful).length;

  return res.json({
    overview: {
      totalMessages: messages.data?.length || 0,
      totalInterventions: interventions.data?.length || 0,
      totalFeedback: feedbackData.length,
      helpfulRate: feedbackData.length > 0
        ? Math.round((helpfulCount / feedbackData.length) * 100)
        : null,
    },
    patternStats,
    recentActivity: (interventions.data || []).map(i => ({
      id: i.id,
      userId: i.user_id,
      pattern: i.patterns?.name || '—',
      belief: i.beliefs?.name || '—',
      acknowledgment: i.acknowledgment,
      createdAt: i.created_at,
    })),
    recentMessages: messages.data || [],
    feedback: {
      helpful: helpfulCount,
      notHelpful: notHelpfulCount,
      recent: feedbackData.slice(0, 20),
    },
  });
}

module.exports = { handleStats };
