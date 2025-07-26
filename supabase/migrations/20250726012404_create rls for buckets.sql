-- ================================================
-- READ POLICY: Select files based on project access
-- ================================================
create policy "Select files based on project access"
on storage.objects
as permissive
for select
to authenticated
using (
  exists (
    select 1
    from projects
    where projects.id::text = objects.bucket_id
      and (
        projects.access = any (array['READ', 'EDIT', 'DELETE', 'ADMIN']::access[])
        or exists (
          select 1
          from permissions p
          where p.user_id = auth.uid()
            and p.project_id = projects.id
            and p.level in ('READ', 'EDIT', 'DELETE', 'ADMIN')
        )
      )
  )
);

-- ================================================
-- INSERT POLICY: Insert files based on project access
-- ================================================
create policy "Insert files based on project access"
on storage.objects
as permissive
for insert
to authenticated
with check (
  exists (
    select 1
    from projects
    where projects.id::text = objects.bucket_id
      and (
        projects.access = any (array['EDIT', 'ADMIN']::access[])
        or exists (
          select 1
          from permissions p
          where p.user_id = auth.uid()
            and p.project_id = projects.id
            and p.level in ('EDIT', 'DELETE', 'ADMIN')
        )
      )
  )
);

-- ================================================
-- UPDATE POLICY: Update files based on project access
-- ================================================
create policy "Update files based on project access"
on storage.objects
as permissive
for update
to authenticated
using (
  exists (
    select 1
    from projects
    where projects.id::text = objects.bucket_id
      and (
        projects.access = any (array['EDIT', 'ADMIN']::access[])
        or exists (
          select 1
          from permissions p
          where p.user_id = auth.uid()
            and p.project_id = projects.id
            and p.level in ('EDIT', 'DELETE', 'ADMIN')
        )
      )
  )
)
with check (
  exists (
    select 1
    from projects
    where projects.id::text = objects.bucket_id
      and (
        projects.access = any (array['EDIT', 'ADMIN']::access[])
        or exists (
          select 1
          from permissions p
          where p.user_id = auth.uid()
            and p.project_id = projects.id
            and p.level in ('EDIT', 'DELETE', 'ADMIN')
        )
      )
  )
);

-- ================================================
-- DELETE POLICY: Delete files based on project access
-- ================================================
create policy "Delete files based on project access"
on storage.objects
as permissive
for delete
to authenticated
using (
  exists (
    select 1
    from projects
    where projects.id::text = objects.bucket_id
      and (
        projects.access = any (array['DELETE', 'ADMIN']::access[])
        or exists (
          select 1
          from permissions p
          where p.user_id = auth.uid()
            and p.project_id = projects.id
            and p.level in ('DELETE', 'ADMIN')
        )
      )
  )
);