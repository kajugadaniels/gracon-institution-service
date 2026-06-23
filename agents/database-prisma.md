# api/institution Database and Prisma Rules

`api/institution` uses a shared schema but does not own migrations.

## Rules

- Do not run migrations from this project.
- Shared schema changes start in `api/database`.
- Regenerate the shared Prisma client in `api/database` after shared schema changes.
- Use `select` for response queries.
- Keep active-key and active-certificate assumptions explicit in queries.
- Add indexes in `api/database` first when new query patterns require them.
