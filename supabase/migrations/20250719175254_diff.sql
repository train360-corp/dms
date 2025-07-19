alter table "public"."versions" drop constraint "versions_uid_key";

alter table "public"."versions" drop constraint "versions_pkey";

drop index if exists "public"."versions_pkey";

drop index if exists "public"."versions_uid_key";

alter table "public"."versions" drop column "uid";


