-- MOVE — Database migrations
-- Run this in Supabase SQL editor

-- Users
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Beliefs
CREATE TABLE IF NOT EXISTS beliefs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) UNIQUE NOT NULL,
  category VARCHAR(50) NOT NULL,
  acknowledgment_phrase TEXT NOT NULL
);

-- Patterns
CREATE TABLE IF NOT EXISTS patterns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL
);

-- Intervention types
CREATE TABLE IF NOT EXISTS intervention_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) UNIQUE NOT NULL,
  description TEXT
);

-- Actions
CREATE TABLE IF NOT EXISTS actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  intervention_type_id UUID REFERENCES intervention_types(id),
  description TEXT NOT NULL
);

-- Pattern belief map
CREATE TABLE IF NOT EXISTS pattern_belief_map (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pattern_id UUID REFERENCES patterns(id),
  belief_id UUID REFERENCES beliefs(id),
  is_primary BOOLEAN DEFAULT true
);

-- Messages
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Interventions
CREATE TABLE IF NOT EXISTS interventions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  message_id UUID REFERENCES messages(id),
  pattern_id UUID REFERENCES patterns(id),
  belief_id UUID REFERENCES beliefs(id),
  action_id UUID REFERENCES actions(id),
  acknowledgment TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Feedback
CREATE TABLE IF NOT EXISTS feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  intervention_id UUID REFERENCES interventions(id),
  helpful BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
