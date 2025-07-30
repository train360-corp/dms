drop policy "Delete files based on project access" on "storage"."objects";

drop policy "Insert files based on project access" on "storage"."objects";

drop policy "Select files based on project access" on "storage"."objects";

drop policy "Update files based on project access" on "storage"."objects";

create policy "Delete files based on project access"
on "storage"."objects"
as permissive
for delete
to authenticated
using (((cardinality(storage.foldername(name)) = 0) AND (EXISTS ( SELECT 1
   FROM projects
  WHERE (((projects.id)::text = objects.bucket_id) AND ((projects.access = ANY (ARRAY['DELETE'::access, 'ADMIN'::access])) OR (EXISTS ( SELECT 1
           FROM permissions p
          WHERE ((p.user_id = auth.uid()) AND (p.project_id = projects.id) AND (p.level = ANY (ARRAY['DELETE'::access, 'ADMIN'::access])))))))))));


create policy "Insert files based on project access"
on "storage"."objects"
as permissive
for insert
to authenticated
with check (((cardinality(storage.foldername(name)) = 0) AND (EXISTS ( SELECT 1
   FROM projects
  WHERE (((projects.id)::text = objects.bucket_id) AND ((projects.access = ANY (ARRAY['EDIT'::access, 'ADMIN'::access])) OR (EXISTS ( SELECT 1
           FROM permissions p
          WHERE ((p.user_id = auth.uid()) AND (p.project_id = projects.id) AND (p.level = ANY (ARRAY['EDIT'::access, 'DELETE'::access, 'ADMIN'::access])))))))))));


create policy "Select files based on project access"
on "storage"."objects"
as permissive
for select
to authenticated
using (((cardinality(storage.foldername(name)) = 0) AND (EXISTS ( SELECT 1
   FROM projects
  WHERE (((projects.id)::text = objects.bucket_id) AND ((projects.access = ANY (ARRAY['READ'::access, 'EDIT'::access, 'DELETE'::access, 'ADMIN'::access])) OR (EXISTS ( SELECT 1
           FROM permissions p
          WHERE ((p.user_id = auth.uid()) AND (p.project_id = projects.id) AND (p.level = ANY (ARRAY['READ'::access, 'EDIT'::access, 'DELETE'::access, 'ADMIN'::access])))))))))));


create policy "Update files based on project access"
on "storage"."objects"
as permissive
for update
to authenticated
using (((cardinality(storage.foldername(name)) = 0) AND (EXISTS ( SELECT 1
   FROM projects
  WHERE (((projects.id)::text = objects.bucket_id) AND ((projects.access = ANY (ARRAY['EDIT'::access, 'ADMIN'::access])) OR (EXISTS ( SELECT 1
           FROM permissions p
          WHERE ((p.user_id = auth.uid()) AND (p.project_id = projects.id) AND (p.level = ANY (ARRAY['EDIT'::access, 'DELETE'::access, 'ADMIN'::access])))))))))))
with check (((cardinality(storage.foldername(name)) = 0) AND (EXISTS ( SELECT 1
   FROM projects
  WHERE (((projects.id)::text = objects.bucket_id) AND ((projects.access = ANY (ARRAY['EDIT'::access, 'ADMIN'::access])) OR (EXISTS ( SELECT 1
           FROM permissions p
          WHERE ((p.user_id = auth.uid()) AND (p.project_id = projects.id) AND (p.level = ANY (ARRAY['EDIT'::access, 'DELETE'::access, 'ADMIN'::access])))))))))));



