alter table "public"."symlinks" drop constraint "symlinks_unique_location";

drop index if exists "public"."symlinks_unique_location";

alter table "public"."symlinks" drop column "name";


