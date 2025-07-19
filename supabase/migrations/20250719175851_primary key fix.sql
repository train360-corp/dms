CREATE UNIQUE INDEX versions_pkey ON public.versions USING btree (id);

alter table "public"."versions" add constraint "versions_pkey" PRIMARY KEY using index "versions_pkey";


