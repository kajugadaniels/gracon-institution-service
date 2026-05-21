# api/institution Database and Prisma Rules

`api/institution` uses a shared schema but does not own migrations.

## Rules

- Do not run migrations from this project.
- Shared schema changes start in `api/auth`.
- Run Prisma generate here after schema mirrors change.
- Use `select` for response queries.
- Keep active-key and active-certificate assumptions explicit in queries.
- Add indexes in `api/auth` first when new query patterns require them.
