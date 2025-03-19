CREATE OR REPLACE FUNCTION "public"."insert_user_data"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$BEGIN
    INSERT INTO "public"."UserData" ("userId", role, points, name, email, authorityId)
    VALUES (
        NEW.id,
        CAST(NULLIF(NEW.raw_user_meta_data->>'role', '') AS INTEGER),
        0,
        NEW.raw_user_meta_data->>'name',
        NEW.email,
        NEW.raw_user_meta_data->>'authorityId'
    );
    RETURN NEW;
END;$$;
