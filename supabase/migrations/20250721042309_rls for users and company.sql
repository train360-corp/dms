drop policy "select: self" on "public"."users";

create policy "select: authenticated users"
on "public"."company"
as permissive
for select
to authenticated
using (true);


create policy "select: authenticated users"
on "public"."users"
as permissive
for select
to authenticated
using (true);



