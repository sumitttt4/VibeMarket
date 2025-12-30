ALTER TABLE vibes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Access"
ON vibes FOR SELECT
USING (true);

CREATE POLICY "Authenticated Insert Access"
ON vibes FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Admin Update Access"
ON vibes FOR UPDATE
USING (true); 

DELETE FROM vibes;

SELECT '✅ Policies Fixed & Data Cleared' as status;
