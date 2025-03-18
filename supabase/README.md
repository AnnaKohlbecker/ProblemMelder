# Supabase Migrations

This folder contains all database migration files for the project using Supabase. Migrations help maintain the database schema and ensure consistency across different environments.

## Structure

The migrations folder typically contains SQL files with timestamps in their filenames, such as:

```
/migrations
  ├── 20240318120000_create_users.sql
  ├── 20240318121000_add_index_to_users.sql
  ├── 20240318122000_create_orders.sql
```

Each file represents a database change that should be applied in order. The initial remote_schema migrations contain the basic database schema and were created by supabase.

## Running Migrations

To apply migrations, use the Supabase CLI:

```sh
supabase db push
```

To create a new migration file, run:

```sh
supabase migration new <migration-name>
```

This will generate a new SQL file in the migrations folder, where you can define the necessary database changes.

## Rolling Back a Migration

If you need to revert the last migration:

```sh
supabase db reset
```

**Warning**: This command will reset your database, including all migrations and data.

## Best Practices

- Use descriptive names for migration files to understand their purpose easily.
- Apply migrations in order to avoid inconsistencies.
- Test migrations on a development environment before running them in production.
- Keep backups before performing destructive changes.

## Troubleshooting

If you encounter errors when applying migrations, check:

- The Supabase CLI logs for error messages.
- That your SQL syntax is correct.
- If the migration order causes dependency issues.

For more details, refer to the [Supabase documentation](https://https://supabase.com/docs/reference/cli/supabase-db).
