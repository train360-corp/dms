ALTER TABLE clients ADD COLUMN access public.access NOT NULL DEFAULT 'NONE';
ALTER TABLE projects ADD COLUMN access public.access NOT NULL DEFAULT 'NONE';

ALTER TABLE company ADD COLUMN default_clients_access public.access NOT NULL DEFAULT 'NONE';
ALTER TABLE company ADD COLUMN default_projects_access public.access NOT NULL DEFAULT 'NONE';