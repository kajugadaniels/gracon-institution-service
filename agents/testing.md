# api/institution Testing Rules

Add tests when changing:

- key generation, encryption, or derivation helpers
- certificate issuance or active certificate behavior
- authority grant/revoke logic
- stamp-image upload validation
- institution membership permissions

Validation commands:

```bash
npm run build
npm run test
```

Docs-only changes do not require a build.
