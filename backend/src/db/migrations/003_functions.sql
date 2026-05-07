-- Geeft de beste actie terug voor een gebruiker + patroon
-- op basis van feedback geschiedenis
CREATE OR REPLACE FUNCTION best_action_for_user(p_user_id UUID, p_pattern_id UUID)
RETURNS TABLE (action_id UUID, action_description TEXT, success_rate FLOAT) AS $$
  SELECT
    a.id AS action_id,
    a.description AS action_description,
    COALESCE(
      SUM(CASE WHEN f.helpful THEN 1.0 ELSE 0.0 END) / NULLIF(COUNT(f.id), 0),
      0
    ) AS success_rate
  FROM actions a
  JOIN interventions i ON i.action_id = a.id
  LEFT JOIN feedback f ON f.intervention_id = i.id
  WHERE i.user_id = p_user_id
    AND i.pattern_id = p_pattern_id
  GROUP BY a.id, a.description
  HAVING COUNT(f.id) >= 2
  ORDER BY success_rate DESC
  LIMIT 1;
$$ LANGUAGE sql STABLE;
