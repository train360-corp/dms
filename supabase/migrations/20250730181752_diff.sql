set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public."storage.objects_after_actions"()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$declare
  _id uuid := gen_random_uuid();
begin

  SET CONSTRAINTS versions_object_id_fkey DEFERRED;

  if (tg_op = 'INSERT' OR tg_op = 'UPDATE') then

    if ((new.user_metadata ->> 'directory_id') IS NOT NULL AND
       EXISTS (
         SELECT 1 FROM public.directories
         WHERE id = (new.user_metadata ->> 'directory_id')::uuid
       ))
  AND (
    (new.user_metadata -> 'file_id') = 'null' OR
    ((new.user_metadata ->> 'file_id') ~* '^[0-9a-f-]{36}$' AND
     EXISTS (
       SELECT 1 FROM public.files
       WHERE id = (new.user_metadata ->> 'file_id')::uuid
     ))
  ) then

      -- create the file
      if (new.user_metadata -> 'file_id') IS NOT NULL then
        insert into public.files (id) values (_id);
      else
        _id := (new.user_metadata ->> 'file_id')::uuid;
      end if;

      insert into public.files_versions (object_id, file_id, version, name) values (new.id, _id, 0, new.name);
      insert into public.symlinks (directory_id, file_id, name) values ((new.user_metadata ->> 'directory_id')::uuid, _id, new.name);

    end if;

  end if;

  return coalesce(new, old);

end;$function$
;


