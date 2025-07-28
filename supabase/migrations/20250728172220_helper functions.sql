set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.files_versions_before_actions()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$begin
  return coalesce (new, old);

  if tg_op = 'INSERT' then
    select coalesce(max(version), 0) + 1 into new.version
    from files_versions
    where file_id = new.file_id;
  end if;

  if tg_op = 'UPDATE' and (
    new.file_id <> old.file_id or
    new.version <> old.version or
    new.object_id <> old.object_id or
    new.created_at <> old.created_at or
    new.id <> old.id
  ) then
    raise exception 'Cannot change locked field';
  end if;
end;$function$
;

CREATE OR REPLACE FUNCTION public.projects_before_actions()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$begin

  if tg_op = 'INSERT' then
    new.access := (select default_projects_access from company limit 1);
  end if;

  if tg_op = 'INSERT' then
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

CREATE TRIGGER files_versions_before_actions BEFORE INSERT OR DELETE OR UPDATE ON public.files_versions FOR EACH ROW EXECUTE FUNCTION files_versions_before_actions();


