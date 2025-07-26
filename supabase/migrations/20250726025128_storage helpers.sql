set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public."storage.objects_before_actions"()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$begin

  if tg_op = 'INSERT' then
    new.id := new.name;
  end if;

  return coalesce(new, old);

end;$function$
;

CREATE TRIGGER "storage.objects_before_actions" BEFORE INSERT OR DELETE OR UPDATE ON storage.objects FOR EACH ROW EXECUTE FUNCTION "storage.objects_before_actions"();



-- CREATE OR REPLACE FUNCTION public."storage.objects_after_actions"()
--  RETURNS trigger
--  LANGUAGE plpgsql
--  SECURITY DEFINER
-- AS $function$begin

--   if tg_op = 'INSERT' then
--     insert into public.files (id) values (new.id);
--   end if;

--   return coalesce(new, old);

-- end;$function$
-- ;

-- CREATE TRIGGER "storage.objects_after_actions" BEFORE INSERT OR DELETE OR UPDATE ON storage.objects FOR EACH ROW EXECUTE FUNCTION "storage.objects_after_actions"();
