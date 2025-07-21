drop trigger if exists "clients_after_actions" on "public"."clients";

CREATE TRIGGER clients_after_actions BEFORE INSERT OR DELETE OR UPDATE ON public.clients FOR EACH ROW EXECUTE FUNCTION clients_after_actions();


