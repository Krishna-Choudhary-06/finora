# Authentication & Security Architecture

## Authentication Architecture
Finora uses a credential-based authentication system backed by PostgreSQL. The backend acts as an API gateway that validates JSON payloads (using Zod) against the Prisma database. The system consists of two primary flows: Register and Login.

## Session Architecture & Token Strategy
We use a hybrid Session/JWT strategy:
1. Short-lived Access Token (15 mins): Signed JWT sent securely via `HttpOnly`, `Secure` (in prod), and `SameSite=lax` cookies.
2. Opaque Session ID: Stored in the DB with an expiration date. Used to validate the active state of the token. Allows immediate revocation of sessions.
3. Refresh mechanism: Implicitly managed via session validity windows in future iterations.

## Password Hashing
We utilize `bcryptjs` with a work factor of 12 for hashing all passwords. Plaintext passwords are never logged, nor returned in any API responses.

## RBAC & Permissions
Initial roles implemented: `CUSTOMER`, `FINANCIAL_ADVISOR`, `ADMIN`.
By default, new registrants are assigned the `CUSTOMER` role. Middleware (`requireRole`) restricts access to API endpoints based on the authenticated user's role.

## Security Controls
- **Rate Limiting**: Configured using `express-rate-limit` (100 requests per 15 minutes) to protect against brute-force attacks.
- **Helmet**: Secures HTTP headers.
- **CORS**: Restricted to the frontend URL to prevent cross-site request forgery.
- **Input Validation**: `zod` strictly enforces payload boundaries.

## Audit Events
`AuditEvent` tracking is built into critical actions (`USER_REGISTERED`, `LOGIN_SUCCESS`, `LOGIN_FAILED`, `LOGOUT`). Events log the actor, timestamp, and relevant contextual metadata (without exposing raw passwords).

## Threat Considerations
- **Brute Force**: Mitigated by Rate Limiting and generic error messages ("Invalid credentials").
- **Token Theft/Replay**: Short-lived JWTs (15 min) reduce the attack window. HttpOnly cookies prevent XSS exfiltration.

## Session Revocation
The `/api/auth/logout` endpoint explicitly deletes the session record in the DB and clears the client's cookie.
