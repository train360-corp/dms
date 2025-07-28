create table public.symlinks (
  id uuid not null default gen_random_uuid (),
  file_id uuid not null,
  directory_id uuid not null,
  name text not null,
  created_at timestamptz not null default (now() at time zone 'utc'),
  constraint symlinks_pkey primary key (id),
  constraint symlinks_file_id_fkey foreign key (file_id) references files(id) on delete cascade,
  constraint symlinks_directory_id_fkey foreign key (directory_id) references directories(id) on delete cascade,
  constraint symlinks_unique_location unique (directory_id, name),
  constraint symlinks_file_once_per_directory unique (file_id, directory_id)
);

alter table public.symlinks enable row level security;

CREATE POLICY "Select symlinks based on project access"
ON public.symlinks
FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.directories d
    JOIN public.projects p ON p.id = d.project_id
    LEFT JOIN public.permissions perms ON perms.project_id = p.id AND perms.user_id = auth.uid()
    WHERE d.id = symlinks.directory_id
      AND (
        p.access = ANY (ARRAY['READ'::access, 'EDIT'::access, 'DELETE'::access, 'ADMIN'::access])
        OR perms.id IS NOT NULL
      )
  )
);

CREATE POLICY "Insert symlinks based on project access"
ON public.symlinks
FOR INSERT TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.directories d
    JOIN public.projects p ON p.id = d.project_id
    LEFT JOIN public.permissions perms ON perms.project_id = p.id AND perms.user_id = auth.uid()
    WHERE d.id = symlinks.directory_id
      AND (
        p.access = ANY (ARRAY['EDIT'::access, 'ADMIN'::access])
        OR perms.id IS NOT NULL
      )
  )
);

CREATE POLICY "Update symlinks based on project access"
ON public.symlinks
FOR UPDATE TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.directories d
    JOIN public.projects p ON p.id = d.project_id
    LEFT JOIN public.permissions perms ON perms.project_id = p.id AND perms.user_id = auth.uid()
    WHERE d.id = symlinks.directory_id
      AND (
        p.access = ANY (ARRAY['EDIT'::access, 'ADMIN'::access])
        OR perms.id IS NOT NULL
      )
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.directories d
    JOIN public.projects p ON p.id = d.project_id
    LEFT JOIN public.permissions perms ON perms.project_id = p.id AND perms.user_id = auth.uid()
    WHERE d.id = symlinks.directory_id
      AND (
        p.access = ANY (ARRAY['EDIT'::access, 'ADMIN'::access])
        OR perms.id IS NOT NULL
      )
  )
);

CREATE POLICY "Delete symlinks based on project access"
ON public.symlinks
FOR DELETE TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.directories d
    JOIN public.projects p ON p.id = d.project_id
    LEFT JOIN public.permissions perms ON perms.project_id = p.id AND perms.user_id = auth.uid()
    WHERE d.id = symlinks.directory_id
      AND (
        p.access = ANY (ARRAY['DELETE'::access, 'ADMIN'::access])
        OR perms.id IS NOT NULL
      )
  )
);