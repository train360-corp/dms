set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.files_before_actions()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$begin

  if tg_op = 'UPDATE' then
    select fv.id into new.current_version_id
    from files_versions fv
    where fv.file_id = new.id
    order by fv.version desc;

    if new.id <> old.id or new.number <> old.number then
      raise exception 'locked columns cannot be changed';
    end if;
  end if;

  return coalesce (new, old);

end;$function$
;


