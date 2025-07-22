drop policy "delete: permitted clients" on "public"."clients";

drop policy "select: permitted clients" on "public"."clients";

drop policy "update: permitted clients" on "public"."clients";

drop policy "Delete directories based on project access" on "public"."directories";

drop policy "Insert directories based on project access" on "public"."directories";

drop policy "Select directories based on project access" on "public"."directories";

drop policy "Update directories based on project access" on "public"."directories";

drop policy "all: admin" on "public"."permissions";

drop policy "select: own" on "public"."permissions";

drop policy "delete: permitted projects" on "public"."projects";

drop policy "select: permitted projects" on "public"."projects";

drop policy "update: permitted projects" on "public"."projects";

alter table "public"."permissions" add constraint "permissions_user_id_fkey1" FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."permissions" validate constraint "permissions_user_id_fkey1";

create policy "delete: permitted clients"
on "public"."clients"
as permissive
for delete
to authenticated
using (((access = ANY (ARRAY['DELETE'::access, 'ADMIN'::access])) OR (EXISTS ( SELECT 1
   FROM permissions p
  WHERE ((p.user_id = ( SELECT auth.uid() AS uid)) AND (p.client_id = clients.id) AND (p.level = ANY (ARRAY['DELETE'::access, 'ADMIN'::access])))))));


create policy "select: permitted clients"
on "public"."clients"
as permissive
for select
to authenticated
using (((access = ANY (ARRAY['READ'::access, 'EDIT'::access, 'DELETE'::access, 'ADMIN'::access])) OR (EXISTS ( SELECT 1
   FROM permissions p
  WHERE ((p.user_id = ( SELECT auth.uid() AS uid)) AND (p.client_id = clients.id) AND (p.level = ANY (ARRAY['READ'::access, 'EDIT'::access, 'DELETE'::access, 'ADMIN'::access])))))));


create policy "update: permitted clients"
on "public"."clients"
as permissive
for update
to authenticated
using (((access = ANY (ARRAY['EDIT'::access, 'DELETE'::access, 'ADMIN'::access])) OR (EXISTS ( SELECT 1
   FROM permissions p
  WHERE ((p.user_id = ( SELECT auth.uid() AS uid)) AND (p.client_id = clients.id) AND (p.level = ANY (ARRAY['EDIT'::access, 'DELETE'::access, 'ADMIN'::access])))))));


create policy "Delete directories based on project access"
on "public"."directories"
as permissive
for delete
to authenticated
using ((EXISTS ( SELECT 1
   FROM projects
  WHERE ((projects.id = directories.project_id) AND ((projects.access = ANY (ARRAY['DELETE'::access, 'ADMIN'::access])) OR (EXISTS ( SELECT 1
           FROM permissions p
          WHERE ((p.user_id = ( SELECT auth.uid() AS uid)) AND (p.project_id = projects.id)))))))));


create policy "Insert directories based on project access"
on "public"."directories"
as permissive
for insert
to authenticated
with check ((EXISTS ( SELECT 1
   FROM projects
  WHERE ((projects.id = directories.project_id) AND ((projects.access = ANY (ARRAY['EDIT'::access, 'ADMIN'::access])) OR (EXISTS ( SELECT 1
           FROM permissions p
          WHERE ((p.user_id = ( SELECT auth.uid() AS uid)) AND (p.project_id = projects.id)))))))));


create policy "Select directories based on project access"
on "public"."directories"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM projects
  WHERE ((projects.id = directories.project_id) AND ((projects.access = ANY (ARRAY['READ'::access, 'EDIT'::access, 'DELETE'::access, 'ADMIN'::access])) OR (EXISTS ( SELECT 1
           FROM permissions p
          WHERE ((p.user_id = ( SELECT auth.uid() AS uid)) AND (p.project_id = projects.id)))))))));


create policy "Update directories based on project access"
on "public"."directories"
as permissive
for update
to authenticated
using ((EXISTS ( SELECT 1
   FROM projects
  WHERE ((projects.id = directories.project_id) AND ((projects.access = ANY (ARRAY['EDIT'::access, 'ADMIN'::access])) OR (EXISTS ( SELECT 1
           FROM permissions p
          WHERE ((p.user_id = ( SELECT auth.uid() AS uid)) AND (p.project_id = projects.id)))))))))
with check ((EXISTS ( SELECT 1
   FROM projects
  WHERE ((projects.id = directories.project_id) AND ((projects.access = ANY (ARRAY['EDIT'::access, 'ADMIN'::access])) OR (EXISTS ( SELECT 1
           FROM permissions p
          WHERE ((p.user_id = ( SELECT auth.uid() AS uid)) AND (p.project_id = projects.id)))))))));


create policy "all: admin"
on "public"."permissions"
as permissive
for all
to authenticated
using (has_admin_permission(( SELECT auth.uid() AS uid), client_id, project_id))
with check (has_admin_permission(( SELECT auth.uid() AS uid), client_id, project_id));


create policy "select: own"
on "public"."permissions"
as permissive
for select
to authenticated
using ((user_id = ( SELECT auth.uid() AS uid)));


create policy "delete: permitted projects"
on "public"."projects"
as permissive
for delete
to authenticated
using (((access = ANY (ARRAY['DELETE'::access, 'ADMIN'::access])) OR (EXISTS ( SELECT 1
   FROM permissions p
  WHERE ((p.user_id = ( SELECT auth.uid() AS uid)) AND (p.project_id = projects.id) AND (p.level = ANY (ARRAY['DELETE'::access, 'ADMIN'::access])))))));


create policy "select: permitted projects"
on "public"."projects"
as permissive
for select
to authenticated
using (((access = ANY (ARRAY['READ'::access, 'EDIT'::access, 'DELETE'::access, 'ADMIN'::access])) OR (EXISTS ( SELECT 1
   FROM permissions p
  WHERE ((p.user_id = ( SELECT auth.uid() AS uid)) AND (p.project_id = projects.id) AND (p.level = ANY (ARRAY['READ'::access, 'EDIT'::access, 'DELETE'::access, 'ADMIN'::access])))))));


create policy "update: permitted projects"
on "public"."projects"
as permissive
for update
to authenticated
using (((access = ANY (ARRAY['EDIT'::access, 'DELETE'::access, 'ADMIN'::access])) OR (EXISTS ( SELECT 1
   FROM permissions p
  WHERE ((p.user_id = ( SELECT auth.uid() AS uid)) AND (p.project_id = projects.id) AND (p.level = ANY (ARRAY['EDIT'::access, 'DELETE'::access, 'ADMIN'::access])))))));



