create policy "select: self"
on "public"."users"
as permissive
for select
to authenticated
using ((auth.uid() = id));



