-- Add style column to qr_codes table
ALTER TABLE qr_codes ADD COLUMN style TEXT DEFAULT 'classic';
