CREATE VIEW public.SanitizedProblemReviews WITH (security_invoker = on) AS
SELECT "ProblemReviews".id,
    "ProblemReviews"."problemId",
    "ProblemReviews".stars,
    "ProblemReviews".importance,
    "ProblemReviews".helpful
FROM "ProblemReviews";


GRANT SELECT ON your_table_sanitized TO PUBLIC;
