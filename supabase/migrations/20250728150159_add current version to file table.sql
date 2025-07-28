alter table "public"."files" add column "current_version_id" uuid;

CREATE UNIQUE INDEX files_current_version_id_key ON public.files USING btree (current_version_id);

alter table "public"."files" add constraint "files_current_version_id_fkey" FOREIGN KEY (current_version_id) REFERENCES files_versions(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."files" validate constraint "files_current_version_id_fkey";

alter table "public"."files" add constraint "files_current_version_id_key" UNIQUE using index "files_current_version_id_key";


