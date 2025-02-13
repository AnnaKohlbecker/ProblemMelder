CREATE FUNCTION public.insert_user_data()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO "public"."UserData" ("userId", role, points, name, authorityId)
    VALUES (
        NEW.id,
        CAST(NULLIF(NEW.raw_user_meta_data->>'role', '') AS INTEGER),
        0,
        NEW.raw_user_meta_data->>'name'
        NEW.raw_user_meta_data->>'authorityId'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
