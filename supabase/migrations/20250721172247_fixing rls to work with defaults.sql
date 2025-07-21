drop policy "delete: permitted clients" on "public"."clients";

drop policy "select: permitted clients" on "public"."clients";

drop policy "update: permitted clients" on "public"."clients";

drop policy "delete: permitted projects" on "public"."projects";

drop policy "select: permitted projects" on "public"."projects";

drop policy "update: permitted projects" on "public"."projects";

create policy "delete: permitted clients"
on "public"."clients"
as permissive
for delete
to authenticated
using (((access = ANY (ARRAY['DELETE'::access, 'ADMIN'::access])) OR (EXISTS ( SELECT 1
   FROM permissions p
  WHERE ((p.user_id = auth.uid()) AND (p.client_id = clients.id) AND (p.level = ANY (ARRAY['DELETE'::access, 'ADMIN'::access])))))));


create policy "select: permitted clients"
on "public"."clients"
as permissive
for select
to authenticated
using (((access = ANY (ARRAY['READ'::access, 'EDIT'::access, 'DELETE'::access, 'ADMIN'::access])) OR (EXISTS ( SELECT 1
   FROM permissions p
  WHERE ((p.user_id = auth.uid()) AND (p.client_id = clients.id) AND (p.level = ANY (ARRAY['READ'::access, 'EDIT'::access, 'DELETE'::access, 'ADMIN'::access])))))));


create policy "update: permitted clients"
on "public"."clients"
as permissive
for update
to authenticated
using (((access = ANY (ARRAY['EDIT'::access, 'DELETE'::access, 'ADMIN'::access])) OR (EXISTS ( SELECT 1
   FROM permissions p
  WHERE ((p.user_id = auth.uid()) AND (p.client_id = clients.id) AND (p.level = ANY (ARRAY['EDIT'::access, 'DELETE'::access, 'ADMIN'::access])))))));


create policy "delete: permitted projects"
on "public"."projects"
as permissive
for delete
to authenticated
using (((access = ANY (ARRAY['DELETE'::access, 'ADMIN'::access])) OR (EXISTS ( SELECT 1
   FROM permissions p
  WHERE ((p.user_id = auth.uid()) AND (p.project_id = projects.id) AND (p.level = ANY (ARRAY['DELETE'::access, 'ADMIN'::access])))))));


create policy "select: permitted projects"
on "public"."projects"
as permissive
for select
to authenticated
using (((access = ANY (ARRAY['READ'::access, 'EDIT'::access, 'DELETE'::access, 'ADMIN'::access])) OR (EXISTS ( SELECT 1
   FROM permissions p
  WHERE ((p.user_id = auth.uid()) AND (p.project_id = projects.id) AND (p.level = ANY (ARRAY['READ'::access, 'EDIT'::access, 'DELETE'::access, 'ADMIN'::access])))))));


create policy "update: permitted projects"
on "public"."projects"
as permissive
for update
to authenticated
using (((access = ANY (ARRAY['EDIT'::access, 'DELETE'::access, 'ADMIN'::access])) OR (EXISTS ( SELECT 1
   FROM permissions p
  WHERE ((p.user_id = auth.uid()) AND (p.project_id = projects.id) AND (p.level = ANY (ARRAY['EDIT'::access, 'DELETE'::access, 'ADMIN'::access])))))));



