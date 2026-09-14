CREATE TABLE IF NOT EXISTS public.qr_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    target_url TEXT NOT NULL,
    click_count INTEGER DEFAULT 0 NOT NULL
);

-- Enable RLS
ALTER TABLE public.qr_codes ENABLE ROW LEVEL SECURITY;

-- Allow all for now (Admin should be the only one accessing the API route)
CREATE POLICY "Enable all for all" ON public.qr_codes FOR ALL USING (true);
