alter table "public"."versions" add column "object_id" uuid not null;

CREATE UNIQUE INDEX versions_object_id_key ON public.versions USING btree (object_id);

alter table "public"."versions" add constraint "versions_object_id_fkey" FOREIGN KEY (object_id) REFERENCES storage.objects(id) not valid;

alter table "public"."versions" validate constraint "versions_object_id_fkey";

alter table "public"."versions" add constraint "versions_object_id_key" UNIQUE using index "versions_object_id_key";


