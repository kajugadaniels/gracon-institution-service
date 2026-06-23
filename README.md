# API Institution

Institution-management backend for the Gracon platform.

This service manages institutions, institutional membership, stamp-authority assignment, institution key material, certificates, and stamp-image uploads. It supplies the institutional trust material consumed later by the stamping service.

## Overview

- Runtime: NestJS + TypeScript
- Default port: `3004`
- Database: shared Neon/Postgres via Prisma
- Storage: AWS S3 for stamp images
- Primary domain: institution trust and authority lifecycle

First clone database setup:
[docs/database-setup.md](./docs/database-setup.md)

## What This Service Owns

- Institution CRUD
- Member add/remove flows
- Institution RSA key generation and encrypted storage
- Institution certificate lifecycle
- Stamp-authority grant and revoke logic
- Institution stamp-image upload and retrieval

## Core Skills Needed

- NestJS and Prisma service design
- Public/private key lifecycle management
- PBKDF2 + AES-GCM private-key protection
- Role-based institutional authority modeling
- S3-based asset handling

## Techniques Used

- RSA-4096 key generation
- PBKDF2-derived encryption keys from `INSTITUTION_ENCRYPTION_SECRET`
- Server-side-only private-key handling
- Single active institutional key/certificate model
- Revocable stamp-authority records
- Shared trust contract with `api/stamp`

## Main Modules

```text
src/
  common/
    decorators/
    prisma/
    s3/
  modules/
    auth/
    authority/
    institution/
    institution-certificates/
    institution-keys/
    stamp-image/
```

## Folder Structure

```text
api/institution/
  agents/
  src/
    common/
    modules/
  test/
  package.json
  nest-cli.json
```

## AI Agent Rules

Project-specific AI execution rules live in [`agents/README.md`](./agents/README.md).
Read that guide before changing institution trust, authority grants, key
material, certificates, stamp images, Prisma read models, or cross-service
stamp compatibility. These local rules supplement the monorepo root
`AGENTS.md`; they do not override platform-wide security, service-boundary, or
git-command rules.

## Local Commands

```bash
npm install
npm run start:dev
npm run build
npm run test
npm run lint
```

## Environment Notes

Key variables:

```env
APP_PORT=3004
DATABASE_URL=
JWT_SECRET=
INSTITUTION_ENCRYPTION_SECRET=
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET_NAME=
```

## Integration Boundaries

- Accepts user JWTs issued by `api/auth` for identity
- Must stay cryptographically aligned with `api/stamp`
- Should not leak institution private keys or derived secrets under any condition

## Important Rules

- Private keys never leave the server
- Changing key-derivation logic requires coordinated changes in `api/stamp`
- Only institution owners/admins can grant authority
- Authority validation must always respect revocation state

## Contribution Checklist

- Confirm any key-material change against the stamp service contract
- Keep certificate rollover and active-key assumptions explicit
- Treat institutional authority as auditable security state, not convenience metadata

## Testing Rule

- If code is pure logic or can be mocked cleanly, add a unit test.
- If code depends on Nest bootstrapping, DB wiring, or HTTP flow, prefer e2e or integration tests.
