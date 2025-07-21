create table public.files (
  id uuid primary key not null default gen_random_uuid (),
  created_at timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text)
);

alter table public.files enable row level security;