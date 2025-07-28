create policy "Enable select for authenticated users only"
on "public"."files_versions"
as permissive
for select
to authenticated
using (true);

create policy "Enable insert for authenticated users only"
on "public"."files_versions"
as permissive
for insert
to authenticated
with check (true);


