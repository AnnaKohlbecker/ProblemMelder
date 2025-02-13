CREATE TRIGGER "insert_user_data"
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.insert_user_data();
