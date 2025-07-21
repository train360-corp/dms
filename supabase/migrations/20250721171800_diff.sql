set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.clients_before_actions()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$begin
  if tg_op = 'INSERT' then
    new.access := (select default_clients_access from company limit 1);
  end if;
  if tg_op = 'UPDATE' and new.id <> old.id then
    raise exception 'Cannot change client ID once set';
  end if;
  return coalesce(new, old);
end;$function$
;

CREATE OR REPLACE FUNCTION public.projects_before_actions()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$begin

  if tg_op = 'INSERT' then
    new.access := (select default_projects_access from company limit 1);
  end if;

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
end;$function$
;


