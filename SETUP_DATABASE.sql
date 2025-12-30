-- ═══════════════════════════════════════════════════════════════
-- VibeMarket Database Setup
-- ═══════════════════════════════════════════════════════════════
-- 
-- Instructions:
-- 1. Copy this ENTIRE file
-- 2. Go to: https://app.supabase.com/project/jfhkwxqgvnddduyocfvw/sql/new
-- 3. Paste and click "Run"
-- 4. Refresh your app at http://localhost:3000
--
-- ═══════════════════════════════════════════════════════════════

-- Create the vibes table
CREATE TABLE IF NOT EXISTS vibes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  live_url TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  votes INTEGER DEFAULT 0,
  tool TEXT NOT NULL,
  country TEXT,
  creator_name TEXT,
  creator_avatar TEXT,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_vibes_votes ON vibes(votes DESC);
CREATE INDEX IF NOT EXISTS idx_vibes_created_at ON vibes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_vibes_tool ON vibes(tool);
CREATE INDEX IF NOT EXISTS idx_vibes_tags ON vibes USING GIN(tags);

-- Enable Row Level Security
ALTER TABLE vibes ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read vibes
DROP POLICY IF EXISTS "Vibes are viewable by everyone" ON vibes;
CREATE POLICY "Vibes are viewable by everyone"
  ON vibes FOR SELECT
  USING (true);

-- Allow anyone to insert vibes (you can restrict this later)
DROP POLICY IF EXISTS "Anyone can insert vibes" ON vibes;
CREATE POLICY "Anyone can insert vibes"
  ON vibes FOR INSERT
  WITH CHECK (true);

-- Insert sample vibes for testing
INSERT INTO vibes (title, description, live_url, tags, votes, tool, country)
VALUES
  (
    'AI Task Manager Pro',
    'Beautiful task manager built with v0 and Vercel AI SDK. Manage your todos with AI-powered suggestions.',
    'https://v0.dev',
    ARRAY['productivity', 'ai', 'tasks', 'automation'],
    142,
    'v0',
    'United States'
  ),
  (
    'Color Palette Generator',
    'Generate stunning color palettes from any image. Perfect for designers and developers.',
    'https://coolors.co',
    ARRAY['design', 'colors', 'tools', 'creative'],
    98,
    'cursor',
    'United Kingdom'
  ),
  (
    'Invoice Builder',
    'Create professional invoices in seconds with AI-powered templates and automation.',
    'https://invoice.to',
    ARRAY['finance', 'business', 'productivity', 'saas'],
    76,
    'lovable',
    'India'
  ),
  (
    'Social Media Scheduler',
    'Schedule posts across all your social media platforms with AI content optimization.',
    'https://buffer.com',
    ARRAY['marketing', 'social', 'automation', 'analytics'],
    234,
    'bolt',
    'Canada'
  ),
  (
    'Portfolio Generator',
    'Create beautiful developer portfolios in minutes with customizable templates.',
    'https://github.com',
    ARRAY['developer-tools', 'portfolio', 'design', 'showcase'],
    187,
    'replit',
    'Germany'
  )
ON CONFLICT DO NOTHING;

-- Verify setup
SELECT 
  '✅ Database setup complete!' as status,
  COUNT(*) as total_vibes,
  'Refresh your app to see the vibes!' as next_step
FROM vibes;
