CREATE UNIQUE INDEX versions_file_id_version_key ON public.versions USING btree (file_id, version);

alter table "public"."versions" add constraint "versions_file_id_version_key" UNIQUE using index "versions_file_id_version_key";


