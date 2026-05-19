# Engineering Backlog: LGPD Compliance & Security Remediation

This backlog tracks the technical tasks required to mitigate security vulnerabilities and privacy non-compliance issues identified within the application.

---

## 🟡 Priority 3: Medium (Structural Risks & Technical Debt)

_Architecture-level security tasks that require coordination with backend development to safeguard sessions._

### [P3-02] Secure OAuth Callback Flow (Remove Token from Query String)

- **Files Affected:** `src/app/auth/callback/page.tsx` (Requires Backend alignment)
- **Context:** The authentication flow exposes the session token in the URL query string (`/auth/callback?token=...`). This leaves tokens visible in server logs, CDN/proxy logs, and browser history (Violation of secure transmission responsibilities, LGPD Art. 46).
- **Action Required:**
  1. **Backend Action:** Refactor the OAuth callback redirect to either issue a secure cookie directly before redirecting, or pass the token using a URL hash fragment (`#token=...`), which is not transmitted to servers.
  2. **Frontend Action:** Adapt the token parsing logic in Next.js to read from the hash fragment or rely entirely on the cookie.
- **Definition of Done (DoD):** Authenticating via OAuth logs the user into the application without ever printing the active session token inside the browser's URL query parameter.
