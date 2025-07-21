create table public.files_versions (
  id uuid primary key not null default gen_random_uuid (),
  created_at timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text),
  version bigint not null,
  object_id uuid not null unique,
  file_id uuid not null,
  unique (file_id, version),
  constraint versions_object_id_fkey foreign KEY (object_id) references storage.objects (id),
  constraint versions_file_id_fkey foreign KEY (file_id) references files (id) on update CASCADE on delete CASCADE
);

alter table public.files_versions enable row level security;
