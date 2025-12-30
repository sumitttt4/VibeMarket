-- ═══════════════════════════════════════════════════════════════
-- ═══════════════════════════════════════════════════════════════

ALTER TABLE vibes 
ADD COLUMN IF NOT EXISTS plan TEXT DEFAULT 'free',
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'approved'; 

CREATE INDEX IF NOT EXISTS idx_vibes_plan ON vibes(plan);
CREATE INDEX IF NOT EXISTS idx_vibes_status ON vibes(status);

UPDATE vibes SET plan = 'free' WHERE plan IS NULL;
UPDATE vibes SET status = 'approved' WHERE status IS NULL;

--
SELECT 
  '✅ Database updated successfully!' as status,
  count(*) as total_vibes 
FROM vibes;
