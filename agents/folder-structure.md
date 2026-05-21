# api/institution Folder Structure Rules

## Source Layout

```text
src/
  common/           auth decorators, Prisma, S3, config, filters, security
  modules/          institution business domains
prisma/             shared-schema mirror for Prisma client generation
test/               tests
agents/             AI execution rules
```

## Module Ownership

- `institution/` owns institution CRUD.
- `authority/` owns stamp-authority grant and revoke behavior.
- `institution-keys/` owns institution key generation and encrypted storage.
- `institution-certificates/` owns certificate lifecycle.
- `stamp-image/` owns stamp image upload and retrieval.

## Placement Rules

- Put DTOs inside the owning module `dto/` directory.
- Put crypto/key helpers beside the module that owns the key lifecycle.
- Put shared S3 and Prisma infrastructure under `src/common/`.
- Do not put stamp application logic here; `api/stamp` owns stamping.
