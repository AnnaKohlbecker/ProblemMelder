-- This file contains SQL queries for managing the database operations related to the 'users' table.
-- It includes queries for creating, reading, updating, and deleting user records.
-- The queries are designed to ensure data integrity and optimize performance.

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
