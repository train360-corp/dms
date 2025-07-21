create type "public"."access" as enum ('READ', 'EDIT', 'DELETE', 'ADMIN');

create type "public"."permission" as enum ('CLIENT', 'PROJECT');

create table "public"."permissions" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text),
    "type" permission not null,
    "level" access not null,
    "user_id" uuid,
    "client_id" integer,
    "project_id" uuid
);


alter table "public"."permissions" enable row level security;

CREATE UNIQUE INDEX permissions_pkey ON public.permissions USING btree (id);

CREATE UNIQUE INDEX permissions_user_id_client_id_key ON public.permissions USING btree (user_id, client_id);

CREATE UNIQUE INDEX permissions_user_id_project_id_key ON public.permissions USING btree (user_id, project_id);

alter table "public"."permissions" add constraint "permissions_pkey" PRIMARY KEY using index "permissions_pkey";

alter table "public"."permissions" add constraint "permissions_check" CHECK ((((client_id IS NULL) AND (project_id IS NOT NULL)) OR ((client_id IS NOT NULL) AND (project_id IS NULL)))) not valid;

alter table "public"."permissions" validate constraint "permissions_check";

alter table "public"."permissions" add constraint "permissions_client_id_fkey" FOREIGN KEY (client_id) REFERENCES clients(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."permissions" validate constraint "permissions_client_id_fkey";

alter table "public"."permissions" add constraint "permissions_project_id_fkey" FOREIGN KEY (project_id) REFERENCES projects(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."permissions" validate constraint "permissions_project_id_fkey";

alter table "public"."permissions" add constraint "permissions_user_id_client_id_key" UNIQUE using index "permissions_user_id_client_id_key";

alter table "public"."permissions" add constraint "permissions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."permissions" validate constraint "permissions_user_id_fkey";

alter table "public"."permissions" add constraint "permissions_user_id_project_id_key" UNIQUE using index "permissions_user_id_project_id_key";

grant delete on table "public"."permissions" to "anon";

grant insert on table "public"."permissions" to "anon";

grant references on table "public"."permissions" to "anon";

grant select on table "public"."permissions" to "anon";

grant trigger on table "public"."permissions" to "anon";

grant truncate on table "public"."permissions" to "anon";

grant update on table "public"."permissions" to "anon";

grant delete on table "public"."permissions" to "authenticated";

grant insert on table "public"."permissions" to "authenticated";

grant references on table "public"."permissions" to "authenticated";

grant select on table "public"."permissions" to "authenticated";

grant trigger on table "public"."permissions" to "authenticated";

grant truncate on table "public"."permissions" to "authenticated";

grant update on table "public"."permissions" to "authenticated";

grant delete on table "public"."permissions" to "service_role";

grant insert on table "public"."permissions" to "service_role";

grant references on table "public"."permissions" to "service_role";

grant select on table "public"."permissions" to "service_role";

grant trigger on table "public"."permissions" to "service_role";

grant truncate on table "public"."permissions" to "service_role";

grant update on table "public"."permissions" to "service_role";

create policy "select: own"
on "public"."permissions"
as permissive
for select
to authenticated
using ((auth.uid() = user_id));



