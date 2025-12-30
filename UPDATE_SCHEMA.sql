-- Add new columns for Rich Submissions and Dashboard
ALTER TABLE vibes 
ADD COLUMN IF NOT EXISTS logo_url text,
ADD COLUMN IF NOT EXISTS key_features text[],
ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id);

-- Verify
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'vibes';
