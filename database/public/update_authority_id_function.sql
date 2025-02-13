CREATE FUNCTION public.update_authority_id()
RETURNS TRIGGER AS $$
    BEGIN
        IF TG_OP = 'INSERT' THEN
            -- Directly assign the authorityId based on the email domain
            NEW.authorityId := (
                SELECT id
                FROM public."Authorities"
                WHERE "domain" = SPLIT_PART(NEW.email, '@', 2)
            );
        ELSE IF TG_OP = 'UPDATE' THEN
            -- If the email has changed, update the authorityId
            IF OLD.email <> NEW.email THEN
                NEW.authorityId := (
                    SELECT id
                    FROM public."Authorities"
                    WHERE "domain" = SPLIT_PART(NEW.email, '@', 2)
                );
            END IF;
        END IF;

        RETURN NEW;
    END;
$$ LANGUAGE plpgsql SECURITY DEFINER;