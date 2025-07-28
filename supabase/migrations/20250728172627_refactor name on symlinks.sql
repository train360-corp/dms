alter table "public"."symlinks" alter column "name" drop default;

alter table "public"."symlinks" alter column "name" drop not null;


