# api/institution API Contract Rules

- Every controller must use `@ApiTags`.
- Every endpoint must use `@ApiOperation`.
- Every endpoint must document success and important failure cases with `@ApiResponse`.
- Every DTO property must have Swagger metadata and class-validator rules.
- Protected endpoints must use the auth guard that validates `api/auth` JWTs.
- Do not expose private keys, encrypted fields, or internal storage keys in responses.
- Select only fields needed by frontend and downstream services.
