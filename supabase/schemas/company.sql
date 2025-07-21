create table public.company (
  id boolean primary key default true check (id = true),
  name text not null default (''),
  logo_url text,
  created_at timestamptz not null default (now() AT TIME ZONE 'utc'::text)
);

alter table public.company enable row level security;