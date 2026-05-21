# api/institution Institution Trust Rules

This file covers the trust lifecycle this service owns.

## Key Lifecycle

- Generate RSA-4096 keys server-side.
- Encrypt private keys using the established PBKDF2 + AES-GCM contract.
- Preserve compatibility with `api/stamp`.
- Never rotate derivation behavior without migration and dependent-service changes.

## Certificate Lifecycle

- Preserve the one-active-certificate model unless the full platform changes.
- Certificate issuance must reference the correct institution and active key.
- Certificate rollover behavior must be explicit and testable.

## Authority Lifecycle

- Grant and revoke actions should be auditable.
- Revoked authority must never pass stamp-time validation.
- Do not infer authority from membership alone unless the business rule says so.
