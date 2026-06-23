# api/institution Security Rules

`api/institution` manages institutional trust material.

## Key Rules

- Institution private keys never leave the server.
- Never log private keys, derived keys, encryption secrets, certificate private material, or S3 object secrets.
- `INSTITUTION_ENCRYPTION_SECRET` must stay server-only.
- Changing key derivation requires coordinated changes in `api/stamp`.

## Authority Rules

- Only authorized institution owners/admins can grant or revoke stamp authority.
- Authority checks must always respect revocation state.
- Authority is security state, not UI metadata.

## S3 Rules

- Stamp images are private assets.
- Return presigned URLs or controlled render paths, not raw bucket secrets.
- Validate upload MIME type and size before storage.

## Environment Rules

- Use only runtime `DATABASE_URL` credentials here; `DATABASE_MIGRATION_URL` belongs only in `api/database`.
