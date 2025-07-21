create sequence "public"."clients_id_seq";

create table "public"."clients" (
    "id" integer not null default nextval('clients_id_seq'::regclass),
    "name" text not null,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."clients" enable row level security;

create table "public"."files" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text)
);


alter table "public"."files" enable row level security;

create table "public"."files_versions" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text),
    "version" bigint not null,
    "object_id" uuid not null,
    "file_id" uuid not null
);


alter table "public"."files_versions" enable row level security;

create table "public"."projects" (
    "id" uuid not null default gen_random_uuid(),
    "client_id" integer not null,
    "project_number" integer not null,
    "name" text not null,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."projects" enable row level security;

alter sequence "public"."clients_id_seq" owned by "public"."clients"."id";

CREATE UNIQUE INDEX clients_pkey ON public.clients USING btree (id);

CREATE UNIQUE INDEX files_pkey ON public.files USING btree (id);

CREATE UNIQUE INDEX files_versions_file_id_version_key ON public.files_versions USING btree (file_id, version);

CREATE UNIQUE INDEX files_versions_object_id_key ON public.files_versions USING btree (object_id);

CREATE UNIQUE INDEX files_versions_pkey ON public.files_versions USING btree (id);

CREATE UNIQUE INDEX projects_client_id_project_number_key ON public.projects USING btree (client_id, project_number);

CREATE UNIQUE INDEX projects_pkey ON public.projects USING btree (id);

alter table "public"."clients" add constraint "clients_pkey" PRIMARY KEY using index "clients_pkey";

alter table "public"."files" add constraint "files_pkey" PRIMARY KEY using index "files_pkey";

alter table "public"."files_versions" add constraint "files_versions_pkey" PRIMARY KEY using index "files_versions_pkey";

alter table "public"."projects" add constraint "projects_pkey" PRIMARY KEY using index "projects_pkey";

alter table "public"."files_versions" add constraint "files_versions_file_id_version_key" UNIQUE using index "files_versions_file_id_version_key";

alter table "public"."files_versions" add constraint "files_versions_object_id_key" UNIQUE using index "files_versions_object_id_key";

alter table "public"."files_versions" add constraint "versions_file_id_fkey" FOREIGN KEY (file_id) REFERENCES files(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."files_versions" validate constraint "versions_file_id_fkey";

alter table "public"."files_versions" add constraint "versions_object_id_fkey" FOREIGN KEY (object_id) REFERENCES storage.objects(id) not valid;

alter table "public"."files_versions" validate constraint "versions_object_id_fkey";

alter table "public"."projects" add constraint "projects_client_id_fkey" FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE not valid;

alter table "public"."projects" validate constraint "projects_client_id_fkey";

alter table "public"."projects" add constraint "projects_client_id_project_number_key" UNIQUE using index "projects_client_id_project_number_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.clients_before_actions()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  if tg_op = 'UPDATE' and new.id <> old.id then
    raise exception 'Cannot change client ID once set';
  end if;
  return coalesce(new, old);
end;
$function$
;

CREATE OR REPLACE FUNCTION public.projects_before_actions()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin

  if tg_op = 'INSERT' and new.project_number is null then
    select coalesce(max(project_number), 0) + 1 into new.project_number
    from projects
    where client_id = new.client_id;
  end if;

  if tg_op = 'UPDATE' and (
    new.client_id <> old.client_id or
    new.project_number <> old.project_number
  ) then
    raise exception 'Cannot change client_id or project_number once set';
  end if;

  return coalesce(new, old);
end;
$function$
;

grant delete on table "public"."clients" to "anon";

grant insert on table "public"."clients" to "anon";

grant references on table "public"."clients" to "anon";

grant select on table "public"."clients" to "anon";

grant trigger on table "public"."clients" to "anon";

grant truncate on table "public"."clients" to "anon";

grant update on table "public"."clients" to "anon";

grant delete on table "public"."clients" to "authenticated";

grant insert on table "public"."clients" to "authenticated";

grant references on table "public"."clients" to "authenticated";

grant select on table "public"."clients" to "authenticated";

grant trigger on table "public"."clients" to "authenticated";

grant truncate on table "public"."clients" to "authenticated";

grant update on table "public"."clients" to "authenticated";

grant delete on table "public"."clients" to "service_role";

grant insert on table "public"."clients" to "service_role";

grant references on table "public"."clients" to "service_role";

grant select on table "public"."clients" to "service_role";

grant trigger on table "public"."clients" to "service_role";

grant truncate on table "public"."clients" to "service_role";

grant update on table "public"."clients" to "service_role";

grant delete on table "public"."files" to "anon";

grant insert on table "public"."files" to "anon";

grant references on table "public"."files" to "anon";

grant select on table "public"."files" to "anon";

grant trigger on table "public"."files" to "anon";

grant truncate on table "public"."files" to "anon";

grant update on table "public"."files" to "anon";

grant delete on table "public"."files" to "authenticated";

grant insert on table "public"."files" to "authenticated";

grant references on table "public"."files" to "authenticated";

grant select on table "public"."files" to "authenticated";

grant trigger on table "public"."files" to "authenticated";

grant truncate on table "public"."files" to "authenticated";

grant update on table "public"."files" to "authenticated";

grant delete on table "public"."files" to "service_role";

grant insert on table "public"."files" to "service_role";

grant references on table "public"."files" to "service_role";

grant select on table "public"."files" to "service_role";

grant trigger on table "public"."files" to "service_role";

grant truncate on table "public"."files" to "service_role";

grant update on table "public"."files" to "service_role";

grant delete on table "public"."files_versions" to "anon";

grant insert on table "public"."files_versions" to "anon";

grant references on table "public"."files_versions" to "anon";

grant select on table "public"."files_versions" to "anon";

grant trigger on table "public"."files_versions" to "anon";

grant truncate on table "public"."files_versions" to "anon";

grant update on table "public"."files_versions" to "anon";

grant delete on table "public"."files_versions" to "authenticated";

grant insert on table "public"."files_versions" to "authenticated";

grant references on table "public"."files_versions" to "authenticated";

grant select on table "public"."files_versions" to "authenticated";

grant trigger on table "public"."files_versions" to "authenticated";

grant truncate on table "public"."files_versions" to "authenticated";

grant update on table "public"."files_versions" to "authenticated";

grant delete on table "public"."files_versions" to "service_role";

grant insert on table "public"."files_versions" to "service_role";

grant references on table "public"."files_versions" to "service_role";

grant select on table "public"."files_versions" to "service_role";

grant trigger on table "public"."files_versions" to "service_role";

grant truncate on table "public"."files_versions" to "service_role";

grant update on table "public"."files_versions" to "service_role";

grant delete on table "public"."projects" to "anon";

grant insert on table "public"."projects" to "anon";

grant references on table "public"."projects" to "anon";

grant select on table "public"."projects" to "anon";

grant trigger on table "public"."projects" to "anon";

grant truncate on table "public"."projects" to "anon";

grant update on table "public"."projects" to "anon";

grant delete on table "public"."projects" to "authenticated";

grant insert on table "public"."projects" to "authenticated";

grant references on table "public"."projects" to "authenticated";

grant select on table "public"."projects" to "authenticated";

grant trigger on table "public"."projects" to "authenticated";

grant truncate on table "public"."projects" to "authenticated";

grant update on table "public"."projects" to "authenticated";

grant delete on table "public"."projects" to "service_role";

grant insert on table "public"."projects" to "service_role";

grant references on table "public"."projects" to "service_role";

grant select on table "public"."projects" to "service_role";

grant trigger on table "public"."projects" to "service_role";

grant truncate on table "public"."projects" to "service_role";

grant update on table "public"."projects" to "service_role";

CREATE TRIGGER clients_before_actions BEFORE INSERT OR DELETE OR UPDATE ON public.clients FOR EACH ROW EXECUTE FUNCTION clients_before_actions();

CREATE TRIGGER projects_before_actions BEFORE INSERT OR DELETE OR UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION projects_before_actions();


