create table "public"."files" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text)
);


alter table "public"."files" enable row level security;

create table "public"."versions" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text),
    "document_id" uuid not null
);


alter table "public"."versions" enable row level security;

CREATE UNIQUE INDEX files_pkey ON public.files USING btree (id);

CREATE UNIQUE INDEX versions_pkey ON public.versions USING btree (id);

alter table "public"."files" add constraint "files_pkey" PRIMARY KEY using index "files_pkey";

alter table "public"."versions" add constraint "versions_pkey" PRIMARY KEY using index "versions_pkey";

alter table "public"."versions" add constraint "versions_document_id_fkey" FOREIGN KEY (document_id) REFERENCES files(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."versions" validate constraint "versions_document_id_fkey";

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

grant delete on table "public"."versions" to "anon";

grant insert on table "public"."versions" to "anon";

grant references on table "public"."versions" to "anon";

grant select on table "public"."versions" to "anon";

grant trigger on table "public"."versions" to "anon";

grant truncate on table "public"."versions" to "anon";

grant update on table "public"."versions" to "anon";

grant delete on table "public"."versions" to "authenticated";

grant insert on table "public"."versions" to "authenticated";

grant references on table "public"."versions" to "authenticated";

grant select on table "public"."versions" to "authenticated";

grant trigger on table "public"."versions" to "authenticated";

grant truncate on table "public"."versions" to "authenticated";

grant update on table "public"."versions" to "authenticated";

grant delete on table "public"."versions" to "service_role";

grant insert on table "public"."versions" to "service_role";

grant references on table "public"."versions" to "service_role";

grant select on table "public"."versions" to "service_role";

grant trigger on table "public"."versions" to "service_role";

grant truncate on table "public"."versions" to "service_role";

grant update on table "public"."versions" to "service_role";


