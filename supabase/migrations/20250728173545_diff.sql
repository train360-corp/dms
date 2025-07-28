set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.files_versions_after_actions()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$begin

  if tg_op = 'INSERT' then
    update public.files
      set current_version_id = new.id
      where files.id = new.file_id;
  end if;

  return coalesce (new, old);
end;$function$
;

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

  return coalesce (new, old);
end;$function$
;


