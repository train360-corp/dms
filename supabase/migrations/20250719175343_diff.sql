alter table "public"."symlinks" drop constraint "symlinks_document_id_fkey";

alter table "public"."versions" drop constraint "versions_document_id_fkey";

alter table "public"."symlinks" drop constraint "symlinks_document_id_directory_id_key";

drop index if exists "public"."symlinks_document_id_directory_id_key";

alter table "public"."symlinks" drop column "document_id";

alter table "public"."symlinks" add column "file_id" uuid;

alter table "public"."versions" drop column "document_id";

alter table "public"."versions" add column "file_id" uuid not null;

CREATE UNIQUE INDEX symlinks_document_id_directory_id_key ON public.symlinks USING btree (file_id, directory_id);

alter table "public"."symlinks" add constraint "symlinks_file_id_fkey" FOREIGN KEY (file_id) REFERENCES files(id) ON DELETE CASCADE not valid;

alter table "public"."symlinks" validate constraint "symlinks_file_id_fkey";

alter table "public"."versions" add constraint "versions_file_id_fkey" FOREIGN KEY (file_id) REFERENCES files(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."versions" validate constraint "versions_file_id_fkey";

alter table "public"."symlinks" add constraint "symlinks_document_id_directory_id_key" UNIQUE using index "symlinks_document_id_directory_id_key";


