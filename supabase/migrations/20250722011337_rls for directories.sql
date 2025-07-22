ALTER TABLE public.directories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Select directories based on project access"
ON public.directories
FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.projects
    WHERE projects.id = directories.project_id
      AND (
        projects.access = ANY (ARRAY['READ'::access, 'EDIT'::access, 'DELETE'::access, 'ADMIN'::access])
        OR EXISTS (
          SELECT 1 FROM public.permissions p
          WHERE p.user_id = auth.uid()
            AND p.project_id = projects.id
        )
      )
  )
);

CREATE POLICY "Insert directories based on project access"
ON public.directories
FOR INSERT TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.projects
    WHERE projects.id = directories.project_id
      AND (
        projects.access = ANY (ARRAY['EDIT'::access, 'ADMIN'::access])
        OR EXISTS (
          SELECT 1 FROM public.permissions p
          WHERE p.user_id = auth.uid()
            AND p.project_id = projects.id
        )
      )
  )
);

CREATE POLICY "Update directories based on project access"
ON public.directories
FOR UPDATE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.projects
    WHERE projects.id = directories.project_id
      AND (
        projects.access = ANY (ARRAY['EDIT'::access, 'ADMIN'::access])
        OR EXISTS (
          SELECT 1 FROM public.permissions p
          WHERE p.user_id = auth.uid()
            AND p.project_id = projects.id
        )
      )
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.projects
    WHERE projects.id = directories.project_id
      AND (
        projects.access = ANY (ARRAY['EDIT'::access, 'ADMIN'::access])
        OR EXISTS (
          SELECT 1 FROM public.permissions p
          WHERE p.user_id = auth.uid()
            AND p.project_id = projects.id
        )
      )
  )
);

CREATE POLICY "Delete directories based on project access"
ON public.directories
FOR DELETE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.projects
    WHERE projects.id = directories.project_id
      AND (
        projects.access = ANY (ARRAY['DELETE'::access, 'ADMIN'::access])
        OR EXISTS (
          SELECT 1 FROM public.permissions p
          WHERE p.user_id = auth.uid()
            AND p.project_id = projects.id
        )
      )
  )
);
