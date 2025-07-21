create table public.users (
  id uuid primary key not null,
  constraint users_id_fkey foreign KEY (id) references auth.users (id),
  created_at timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text),
  first_name text not null default (''),
  last_name text not null default (''),
  full_name text not null generated always as (first_name || ' ' || last_name) stored
);

alter table public.users enable row level security;