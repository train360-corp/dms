create table public.projects (
  id uuid primary key default gen_random_uuid() not null,
  client_id integer not null references clients(id) on delete cascade,
  project_number integer not null,
  name text not null,
  created_at timestamptz not null default now(),
  unique (client_id, project_number)
);

alter table public.projects enable row level security;

create or replace function projects_before_actions()
returns trigger as $$
begin

  if tg_op = 'INSERT' and new.project_number is null then
    select coalesce(max(project_number), 0) + 1 into new.project_number
    from projects
    where client_id = new.client_id;
  end if;

  if tg_op = 'UPDATE' and (
    new.client_id <> old.client_id or
    new.project_number <> old.project_number
  ) then
    raise exception 'Cannot change client_id or project_number once set';
  end if;

  return coalesce(new, old);
end;
$$ language plpgsql;

create trigger projects_before_actions
before insert or update or delete on projects
for each row
execute function projects_before_actions();