# api/institution Git Rules

Codex must never run git commands automatically.

Use paths relative to `api/institution`.

```bash
git add "src/modules/authority/authority.service.ts"
git commit -m "feat(institution): add authority revoke audit"
```

Rules:

- One file per `git add`.
- Never use `git add .` or `git add -A`.
- Never include `cd api/institution`.
- Never run `git push`.
- Use Conventional Commits.
