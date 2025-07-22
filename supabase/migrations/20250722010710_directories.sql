CREATE TABLE public.directories (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  project_id uuid NOT NULL,
  parent_id uuid REFERENCES public.directories(id) ON DELETE CASCADE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT directories_project_id_name_key UNIQUE (project_id, name, parent_id),
  CONSTRAINT directories_project_id_fkey FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  CONSTRAINT directories_pkey PRIMARY KEY (id)
);
