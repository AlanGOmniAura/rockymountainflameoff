-- Seed default content row
INSERT INTO public.app_content (id, live_data, draft_data)
VALUES ('main', '{}', '{}')
ON CONFLICT (id) DO NOTHING;
