revoke delete on table "public"."directories" from "anon";

revoke insert on table "public"."directories" from "anon";

revoke references on table "public"."directories" from "anon";

revoke select on table "public"."directories" from "anon";

revoke trigger on table "public"."directories" from "anon";

revoke truncate on table "public"."directories" from "anon";

revoke update on table "public"."directories" from "anon";

revoke delete on table "public"."directories" from "authenticated";

revoke insert on table "public"."directories" from "authenticated";

revoke references on table "public"."directories" from "authenticated";

revoke select on table "public"."directories" from "authenticated";

revoke trigger on table "public"."directories" from "authenticated";

revoke truncate on table "public"."directories" from "authenticated";

revoke update on table "public"."directories" from "authenticated";

revoke delete on table "public"."directories" from "service_role";

revoke insert on table "public"."directories" from "service_role";

revoke references on table "public"."directories" from "service_role";

revoke select on table "public"."directories" from "service_role";

revoke trigger on table "public"."directories" from "service_role";

revoke truncate on table "public"."directories" from "service_role";

revoke update on table "public"."directories" from "service_role";

alter table "public"."directories" drop constraint "directories_parent_id_fkey";

alter table "public"."directories" drop constraint "directories_parent_id_name_key";

alter table "public"."directories" drop constraint "directories_pkey";

drop index if exists "public"."directories_parent_id_name_key";

drop index if exists "public"."directories_pkey";

drop table "public"."directories";

drop sequence if exists "public"."directories_id_seq";


