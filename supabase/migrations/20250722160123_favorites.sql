create table public.favorites (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null,
  client_id int,
  project_id uuid,

  unique(user_id, client_id, project_id),

  constraint fk_user foreign key (user_id)
    references public.users(id)
    on update cascade on delete cascade,

  constraint fk_client foreign key (client_id)
    references public.clients(id)
    on update cascade on delete cascade,

  constraint fk_project foreign key (project_id)
    references public.projects(id)
    on update cascade on delete cascade,

  -- Only one of client_id or project_id must be non-null (XOR logic)
  constraint xor_client_or_project check (
    (client_id is null and project_id is not null)
    or (client_id is not null and project_id is null)
  )
);

-- Enable RLS on the table
alter table public.favorites enable row level security;

-- SELECT policy
create policy "select: own rows only"
on public.favorites
for select
to authenticated
using (
  user_id = (select auth.uid() as uid)
);

-- INSERT policy
create policy "insert: only for self"
on public.favorites
for insert
to authenticated
with check (
  user_id = (select auth.uid() as uid)
);

-- UPDATE policy
create policy "update: own rows only"
on public.favorites
for update
to authenticated
using (
  user_id = (select auth.uid() as uid)
)
with check (
  user_id = (select auth.uid() as uid)
);

-- DELETE policy
create policy "delete: own rows only"
on public.favorites
for delete
to authenticated
using (
  user_id = (select auth.uid() as uid)
);