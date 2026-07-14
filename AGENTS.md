# AGENTS.md

## Project Overview

<!-- Your Project description here-->

---

## Tech Stack

- Runtime: Bun
- Language: TypeScript
- Framework: Express
- Database: PostgreSQL
- Package Manager: Bun
- Documentation: TypeDoc

---

## Coding Standards

### General

- Always use TypeScript.
- Avoid using `any`.
- Prefer explicit types.
- Use ES modules.
- Keep functions small and focused.
- Write self-explanatory code instead of excessive comments.

### Naming

- Variables: camelCase
- Functions: camelCase
- Classes: PascalCase
- Interfaces: PascalCase
- Types: PascalCase
- Constants: UPPER_SNAKE_CASE
- Files: kebab-case

Example:

```
user-service.ts
leave-request.ts
```

---

## API Guidelines

- Follow REST principles.
- Use plural resource names.

Good:

```
GET    /users
POST   /users
GET    /users/:id
PATCH  /users/:id
DELETE /users/:id
```

Return consistent JSON responses.

Success:

```json
{
  "success": true,
  "data": {}
}
```

Failure:

```json
{
  "success": false,
  "message": "Validation failed"
}
```

---

## Error Handling

- Never swallow errors.
- Throw typed errors where appropriate.
- Handle all errors through centralized error middleware.
- Return meaningful HTTP status codes.

---

## Validation

- Validate every incoming request.
- Never trust client input.
- Return descriptive validation errors.

---

## Database

- Never concatenate SQL strings.
- Always use parameterized queries.
- Keep SQL in repository/data-access layer.
- Use transactions when modifying multiple related tables.

---

## Authentication

- Never log passwords or secrets.
- Store secrets only in environment variables.

---

## Environment Variables

Never hardcode:

- Database credentials
- API keys
- SMTP credentials

Always read them from `.env`.

---

## Documentation

- Every exported function, class, interface, and type should have TSDoc comments.
- Keep TypeDoc documentation up to date.

Example:

```ts
/**
 * Creates a new employee.
 *
 * @param input Employee creation payload.
 * @returns Newly created employee.
 */
```

---

## Testing

When adding features:

- Test happy paths.
- Test invalid input.
- Test authorization.
- Test edge cases.

---

## Performance

Prefer:

- Async/await
- Efficient SQL queries
- Pagination for large datasets
- Batch database operations
- Reusing existing utilities

Avoid:

- N+1 database queries
- Blocking operations
- Duplicate code

---

## Before Creating New Code

Search the codebase for existing:

- utilities
- middleware
- services
- helpers
- types

Reuse existing implementations whenever possible.

---

## Pull Request Checklist

Before considering work complete:

- Project builds successfully
- TypeScript passes
- No lint errors
- Documentation updated
- No unused imports
- No dead code
- No commented-out code

---

## Commands

Development

```bash
bun run dev
```

Build

```bash
bun run build
```

Type Check

```bash
bun run typecheck
```

Generate Documentation

```bash
bun run docs
```

---

## Agent Instructions

When making changes:

1. Preserve the existing project architecture.
2. Prefer modifying existing files over creating new ones.
3. Do not introduce unnecessary dependencies.
4. Keep solutions simple and maintainable.
5. Follow SOLID principles where applicable.
6. Maintain strict TypeScript typing.
7. Add TSDoc comments for all exported APIs.
8. If requirements are ambiguous, ask for clarification instead of guessing.
9. Do not change public API behavior unless explicitly requested.
10. Keep responses concise and explain reasoning when making significant architectural changes.