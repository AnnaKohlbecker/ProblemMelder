CREATE FUNCTION public.insert_user_data()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO "public"."UserData" ("userId", role, points, name)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'role', 0, NEW.raw_user_meta_data->>'name');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;