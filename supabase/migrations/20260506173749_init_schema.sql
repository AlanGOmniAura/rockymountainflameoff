CREATE TABLE IF NOT EXISTS public.app_content (
    id text primary key,
    live_data jsonb,
    draft_data jsonb,
    updated_at timestamp with time zone default now()
);
