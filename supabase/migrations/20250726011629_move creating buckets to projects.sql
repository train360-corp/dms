set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.projects_after_actions()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$begin

  if tg_op = 'INSERT' THEN
    insert into storage.buckets (id, name, public) values
    (new.id::text, new.id::text, false);
  end if;

  return coalesce(new, old);

end;$function$
;

CREATE OR REPLACE FUNCTION public.clients_after_actions()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$begin

  return coalesce(new, old);
end;$function$
;

CREATE TRIGGER projects_after_actions AFTER INSERT OR DELETE OR UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION projects_after_actions();


