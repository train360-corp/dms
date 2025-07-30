set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public."storage.objects.get_object_by_id"(object_id uuid)
 RETURNS storage.objects
 LANGUAGE sql
AS $function$
  select *
  from storage.objects
  where id = object_id
  limit 1;
$function$
;

CREATE OR REPLACE FUNCTION public."storage.objects_before_actions"()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$begin

  if tg_op = 'UPDATE' then
    new.id = old.id;
    new.name = old.name;
  end if;

  return coalesce(new, old);

end;$function$
;


