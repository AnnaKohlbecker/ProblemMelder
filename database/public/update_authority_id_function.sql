CREATE FUNCTION public.update_authority_id()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public."UserData"
        SET "authorityId" = NEW.id
        WHERE SPLIT_PART(email, '@', 2) = NEW.domain;

    ELSIF TG_OP = 'UPDATE' THEN
        IF OLD.domain <> NEW.domain THEN
            -- Remove authorityId (set to NULL) for users that matched the OLD domain but no longer match the new one
            UPDATE public."UserData"
            SET "authorityId" = NULL
            WHERE SPLIT_PART(email, '@', 2) = OLD.domain
            AND SPLIT_PART(email, '@', 2) <> NEW.domain;

            -- Set authorityId for users matching the NEW domain
            UPDATE public."UserData"
            SET "authorityId" = NEW.id
            WHERE SPLIT_PART(email, '@', 2) = NEW.domain;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
