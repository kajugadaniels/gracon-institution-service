# api/institution Agent Guide

This directory contains project-local execution rules for AI agents working in `api/institution`.

## Reading Order

1. Read `../../AGENTS.md`.
2. Read `../README.md`.
3. Read this file.
4. Read the topic file that matches the task.
5. Inspect the source code before editing.

## Topic Files

- [folder-structure.md](./folder-structure.md) — where institution modules, DTOs, helpers, and tests belong.
- [file-structure.md](./file-structure.md) — naming, comments, TypeScript style, and exported API rules.
- [security.md](./security.md) — institution private keys, authority, S3, and trust-material rules.
- [api-contracts.md](./api-contracts.md) — controller, DTO, Swagger, validation, and response rules.
- [database-prisma.md](./database-prisma.md) — shared-schema and Prisma generation rules.
- [institution-trust.md](./institution-trust.md) — institution authority, certificates, keys, and stamp-image lifecycle.
- [testing.md](./testing.md) — test expectations and validation commands.
- [git.md](./git.md) — copy-paste commit command format for this project.
- [documentation.md](./documentation.md) — README, `.env.example`, Swagger, and root-guide update rules.

## Scope

These rules apply only inside `api/institution`. If key-derivation or stamp trust changes touch `api/stamp`, read that guide too.

## Conflict Rule

If a local rule conflicts with `../../AGENTS.md`, the root guide wins.
