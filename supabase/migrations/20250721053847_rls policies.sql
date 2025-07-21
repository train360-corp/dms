set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.has_admin_permission(_user uuid, _client_id integer, _project_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
AS $function$
  select exists (
    select 1 from public.permissions p
    where p.user_id = _user
    and p.level = 'ADMIN'
    and (
      (p.client_id is not null and p.client_id = _client_id)
      or
      (p.project_id is not null and p.project_id = _project_id)
    )
  );
$function$
;

create policy "delete: permitted clients"
on "public"."clients"
as permissive
for delete
to authenticated
using ((EXISTS ( SELECT 1
   FROM permissions p
  WHERE ((p.user_id = auth.uid()) AND (p.client_id = clients.id) AND (p.level = ANY (ARRAY['DELETE'::access, 'ADMIN'::access]))))));


create policy "select: permitted clients"
on "public"."clients"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM permissions p
  WHERE ((p.user_id = auth.uid()) AND (p.client_id = clients.id) AND (p.level = ANY (ARRAY['READ'::access, 'EDIT'::access, 'DELETE'::access, 'ADMIN'::access]))))));


create policy "update: permitted clients"
on "public"."clients"
as permissive
for update
to authenticated
using ((EXISTS ( SELECT 1
   FROM permissions p
  WHERE ((p.user_id = auth.uid()) AND (p.client_id = clients.id) AND (p.level = ANY (ARRAY['EDIT'::access, 'DELETE'::access, 'ADMIN'::access]))))));


create policy "all: admin"
on "public"."permissions"
as permissive
for all
to authenticated
using (has_admin_permission(auth.uid(), client_id, project_id))
with check (has_admin_permission(auth.uid(), client_id, project_id));


create policy "delete: permitted projects"
on "public"."projects"
as permissive
for delete
to authenticated
using ((EXISTS ( SELECT 1
   FROM permissions p
  WHERE ((p.user_id = auth.uid()) AND (p.project_id = projects.id) AND (p.level = ANY (ARRAY['DELETE'::access, 'ADMIN'::access]))))));


create policy "select: permitted projects"
on "public"."projects"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM permissions p
  WHERE ((p.user_id = auth.uid()) AND (p.project_id = projects.id) AND (p.level = ANY (ARRAY['READ'::access, 'EDIT'::access, 'DELETE'::access, 'ADMIN'::access]))))));


create policy "update: permitted projects"
on "public"."projects"
as permissive
for update
to authenticated
using ((EXISTS ( SELECT 1
   FROM permissions p
  WHERE ((p.user_id = auth.uid()) AND (p.project_id = projects.id) AND (p.level = ANY (ARRAY['EDIT'::access, 'DELETE'::access, 'ADMIN'::access]))))));



