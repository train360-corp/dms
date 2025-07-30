set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public."storage.objects_before_actions"()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$begin

  if tg_op = 'INSERT' then
    new.id := new.name;
  end if;

  if tg_op = 'UPDATE' then
    new.id = old.id;
    new.name = old.name;
  end if;

  return coalesce(new, old);

end;$function$
;


