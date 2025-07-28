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

  end if;

  return coalesce (new, old);

end;$function$
;

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

end;$function$
;

CREATE TRIGGER files_before_actions BEFORE INSERT OR DELETE OR UPDATE ON public.files FOR EACH ROW EXECUTE FUNCTION files_before_actions();

CREATE TRIGGER files_versions_after_actions AFTER INSERT OR DELETE OR UPDATE ON public.files_versions FOR EACH ROW EXECUTE FUNCTION files_versions_after_actions();


