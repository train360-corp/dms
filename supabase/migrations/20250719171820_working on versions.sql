alter table "public"."versions" drop constraint "versions_pkey";

drop index if exists "public"."versions_pkey";

alter table "public"."versions" add column "version" bigint not null;

alter table "public"."versions" add column "uid" text not null generated always as (((document_id || ':'::text) || (version)::text)) stored;

CREATE UNIQUE INDEX versions_uid_key ON public.versions USING btree (uid);

CREATE UNIQUE INDEX versions_pkey ON public.versions USING btree (id, uid);

alter table "public"."versions" add constraint "versions_pkey" PRIMARY KEY using index "versions_pkey";

alter table "public"."versions" add constraint "versions_uid_key" UNIQUE using index "versions_uid_key";


