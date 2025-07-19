create table "public"."directories" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "parent_id" uuid,
    "created_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text)
);


create table "public"."symlinks" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text),
    "document_id" uuid,
    "directory_id" uuid
);


CREATE UNIQUE INDEX directories_parent_id_name_key ON public.directories USING btree (parent_id, name);

CREATE UNIQUE INDEX directories_pkey ON public.directories USING btree (id);

CREATE UNIQUE INDEX symlinks_document_id_directory_id_key ON public.symlinks USING btree (document_id, directory_id);

CREATE UNIQUE INDEX symlinks_pkey ON public.symlinks USING btree (id);

alter table "public"."directories" add constraint "directories_pkey" PRIMARY KEY using index "directories_pkey";

alter table "public"."symlinks" add constraint "symlinks_pkey" PRIMARY KEY using index "symlinks_pkey";

alter table "public"."directories" add constraint "directories_parent_id_fkey" FOREIGN KEY (parent_id) REFERENCES directories(id) ON DELETE CASCADE not valid;

alter table "public"."directories" validate constraint "directories_parent_id_fkey";

alter table "public"."directories" add constraint "directories_parent_id_name_key" UNIQUE using index "directories_parent_id_name_key";

alter table "public"."symlinks" add constraint "symlinks_directory_id_fkey" FOREIGN KEY (directory_id) REFERENCES directories(id) ON DELETE CASCADE not valid;

alter table "public"."symlinks" validate constraint "symlinks_directory_id_fkey";

alter table "public"."symlinks" add constraint "symlinks_document_id_directory_id_key" UNIQUE using index "symlinks_document_id_directory_id_key";

alter table "public"."symlinks" add constraint "symlinks_document_id_fkey" FOREIGN KEY (document_id) REFERENCES files(id) ON DELETE CASCADE not valid;

alter table "public"."symlinks" validate constraint "symlinks_document_id_fkey";

grant delete on table "public"."directories" to "anon";

grant insert on table "public"."directories" to "anon";

grant references on table "public"."directories" to "anon";

grant select on table "public"."directories" to "anon";

grant trigger on table "public"."directories" to "anon";

grant truncate on table "public"."directories" to "anon";

grant update on table "public"."directories" to "anon";

grant delete on table "public"."directories" to "authenticated";

grant insert on table "public"."directories" to "authenticated";

grant references on table "public"."directories" to "authenticated";

grant select on table "public"."directories" to "authenticated";

grant trigger on table "public"."directories" to "authenticated";

grant truncate on table "public"."directories" to "authenticated";

grant update on table "public"."directories" to "authenticated";

grant delete on table "public"."directories" to "service_role";

grant insert on table "public"."directories" to "service_role";

grant references on table "public"."directories" to "service_role";

grant select on table "public"."directories" to "service_role";

grant trigger on table "public"."directories" to "service_role";

grant truncate on table "public"."directories" to "service_role";

grant update on table "public"."directories" to "service_role";

grant delete on table "public"."symlinks" to "anon";

grant insert on table "public"."symlinks" to "anon";

grant references on table "public"."symlinks" to "anon";

grant select on table "public"."symlinks" to "anon";

grant trigger on table "public"."symlinks" to "anon";

grant truncate on table "public"."symlinks" to "anon";

grant update on table "public"."symlinks" to "anon";

grant delete on table "public"."symlinks" to "authenticated";

grant insert on table "public"."symlinks" to "authenticated";

grant references on table "public"."symlinks" to "authenticated";

grant select on table "public"."symlinks" to "authenticated";

grant trigger on table "public"."symlinks" to "authenticated";

grant truncate on table "public"."symlinks" to "authenticated";

grant update on table "public"."symlinks" to "authenticated";

grant delete on table "public"."symlinks" to "service_role";

grant insert on table "public"."symlinks" to "service_role";

grant references on table "public"."symlinks" to "service_role";

grant select on table "public"."symlinks" to "service_role";

grant trigger on table "public"."symlinks" to "service_role";

grant truncate on table "public"."symlinks" to "service_role";

grant update on table "public"."symlinks" to "service_role";


