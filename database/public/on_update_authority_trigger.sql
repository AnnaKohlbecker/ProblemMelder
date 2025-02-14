CREATE TRIGGER "on_update_authority"
AFTER INSERT OR UPDATE ON public.authorities
FOR EACH ROW
EXECUTE FUNCTION public.update_authority_id();
