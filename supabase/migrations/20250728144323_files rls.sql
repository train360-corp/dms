create policy "Enable insert for authenticated users only"
on "public"."files"
as permissive
for insert
to authenticated
with check (true);

create policy "Enable select for authenticated users only"
on "public"."files"
as permissive
for select
to authenticated
using (true);

