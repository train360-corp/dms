create table public.clients (
  id serial primary key not null,
  name text not null,
  created_at timestamptz not null default now()
);

alter table public.clients enable row level security;

create or replace function clients_before_actions()
returns trigger as $$
begin
  if tg_op = 'UPDATE' and new.id <> old.id then
    raise exception 'Cannot change client ID once set';
  end if;
  return coalesce(new, old);
end;
$$ language plpgsql;

create trigger clients_before_actions
before insert or update or delete on clients
for each row
execute function clients_before_actions();

create or replace function clients_after_actions()
returns trigger 
security definer
as $$
begin
  
  if tg_op = 'INSERT' THEN
    insert into storage.buckets (id, name, public) values
    (new.id::text, new.id::text, false);
  end if;

  return coalesce(new, old);
end;
$$ language plpgsql;

create trigger clients_after_actions
before insert or update or delete on clients
for each row
execute function clients_after_actions();