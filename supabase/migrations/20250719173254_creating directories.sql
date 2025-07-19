create sequence "public"."directories_id_seq";

create table "public"."directories" (
    "id" integer not null default nextval('directories_id_seq'::regclass),
    "name" text not null,
    "parent_id" integer,
    "created_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text),
    "updated_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text)
);


alter sequence "public"."directories_id_seq" owned by "public"."directories"."id";

CREATE UNIQUE INDEX directories_parent_id_name_key ON public.directories USING btree (parent_id, name);

CREATE UNIQUE INDEX directories_pkey ON public.directories USING btree (id);

alter table "public"."directories" add constraint "directories_pkey" PRIMARY KEY using index "directories_pkey";

alter table "public"."directories" add constraint "directories_parent_id_fkey" FOREIGN KEY (parent_id) REFERENCES directories(id) ON DELETE CASCADE not valid;

alter table "public"."directories" validate constraint "directories_parent_id_fkey";

alter table "public"."directories" add constraint "directories_parent_id_name_key" UNIQUE using index "directories_parent_id_name_key";

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


