alter table "public"."users" add column "first_name" text not null default ''::text;

alter table "public"."users" add column "last_name" text not null default ''::text;

alter table "public"."users" add column "full_name" text not null generated always as (((first_name || ' '::text) || last_name)) stored;
