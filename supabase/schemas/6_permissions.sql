create type access as enum ('READ', 'EDIT', 'DELETE', 'ADMIN');

create table public.permissions (
  id uuid primary key not null default gen_random_uuid (),
  created_at timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text),
  level access not null,
  user_id uuid not null references auth.users(id) on update cascade on delete cascade,
  client_id integer references public.clients(id) on update cascade on delete cascade,
  project_id uuid references public.projects(id) on update cascade on delete cascade,
  check (
    (client_id is null and project_id is not null) or
    (client_id is not null and project_id is null)
  ),
  unique (user_id, client_id),
  unique (user_id, project_id)
);

create or replace function has_admin_permission(_user uuid, _client_id int, _project_id uuid)
returns boolean
security definer
set search_path = public
language sql
stable
as $$
  select exists (
    select 1 from public.permissions p
    where p.user_id = _user
    and p.level = 'ADMIN'
    and (
      (p.client_id is not null and p.client_id = _client_id)
      or
      (p.project_id is not null and p.project_id = _project_id)
    )
  );
$$;

alter table public.permissions enable row level security;

create policy "select: own" on "public"."permissions" as PERMISSIVE for SELECT to authenticated using (
    auth.uid() = user_id
);

create policy "all: admin" on public.permissions
  for all to authenticated
  using (
    has_admin_permission(auth.uid(), client_id, project_id)
  )
  with check (
    has_admin_permission(auth.uid(), client_id, project_id)
  );

-- Policy: select clients if permission level is READ or higher
create policy "select: permitted clients" on public.clients
  for select to authenticated
  using (
    exists (
      select 1 from public.permissions p
      where p.user_id = auth.uid()
      and p.client_id = clients.id
      and p.level in ('READ', 'EDIT', 'DELETE', 'ADMIN')
    )
  );

-- Policy: update clients if permission level is EDIT or higher
create policy "update: permitted clients" on public.clients
  for update to authenticated
  using (
    exists (
      select 1 from public.permissions p
      where p.user_id = auth.uid()
      and p.client_id = clients.id
      and p.level in ('EDIT', 'DELETE', 'ADMIN')
    )
  );

-- Policy: delete clients if permission level is DELETE or ADMIN
create policy "delete: permitted clients" on public.clients
  for delete to authenticated
  using (
    exists (
      select 1 from public.permissions p
      where p.user_id = auth.uid()
      and p.client_id = clients.id
      and p.level in ('DELETE', 'ADMIN')
    )
  );


-- Policy: select projects if permission level is READ or higher
create policy "select: permitted projects" on public.projects
  for select to authenticated
  using (
    exists (
      select 1 from public.permissions p
      where p.user_id = auth.uid()
      and p.project_id = projects.id
      and p.level in ('READ', 'EDIT', 'DELETE', 'ADMIN')
    )
  );

-- Policy: update projects if permission level is EDIT or higher
create policy "update: permitted projects" on public.projects
  for update to authenticated
  using (
    exists (
      select 1 from public.permissions p
      where p.user_id = auth.uid()
      and p.project_id = projects.id
      and p.level in ('EDIT', 'DELETE', 'ADMIN')
    )
  );

-- Policy: delete projects if permission level is DELETE or ADMIN
create policy "delete: permitted projects" on public.projects
  for delete to authenticated
  using (
    exists (
      select 1 from public.permissions p
      where p.user_id = auth.uid()
      and p.project_id = projects.id
      and p.level in ('DELETE', 'ADMIN')
    )
  );