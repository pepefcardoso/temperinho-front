# Engineering Backlog: LGPD Compliance & Security Remediation

This backlog tracks the technical tasks required to mitigate security vulnerabilities and privacy non-compliance issues identified within the application.

---

## 🟠 Priority 2: High (Transparency & Compliance Gaps)

_Tasks focused on user interface and privacy documentation alignment to ensure transparent data processing._

### [P2-02] Align Privacy Policy Documentation with Codebase Reality

- **Files Affected:** `src/app/privacidade/page.tsx`
- **Context:** The current policy contains inaccuracies: Section 1a fails to list mandatory registration fields (`birthday` and `phone`), and Section 5 references Google Analytics which does not exist in the codebase, while failing to mention Google AdSense which is active (Violation of the principle of transparency, LGPD Art. 9 IV).
- **Action Required:**
  1. Update Section 1a to explicitly list `date of birth` (birthday) and `phone number` as collected personal data.
  2. Remove all references to "Google Analytics".
  3. Add an explicit clause detailing the use of "Google AdSense" for behavioral advertising and monetization.
  4. If Session Replay is kept under [P1-03], add a disclosure regarding behavioral replay for debugging purposes.
- **Definition of Done (DoD):** The published Privacy Policy completely and accurately reflects the exact data schemas and third-party scripts present in the repository.

---

## 🟡 Priority 3: Medium (Structural Risks & Technical Debt)

_Architecture-level security tasks that require coordination with backend development to safeguard sessions._

### [P3-01] Migrate Session Token (`AUTH_TOKEN`) from localStorage to HttpOnly Cookies

- **Files Affected:** `src/context/AuthContext.tsx` (Requires Backend alignment)
- **Context:** Storing the session token in `localStorage` makes it vulnerable to exfiltration via Cross-Site Scripting (XSS) attacks from any compromised third-party scripts (Violation of technical security safeguards, LGPD Art. 46).
- **Action Required:**
  1. Refactor `AuthContext.tsx` to stop reading/writing tokens to `localStorage`.
  2. **Backend Action:** Update the authentication architecture to issue session tokens via an `HttpOnly; Secure; SameSite=Strict` cookie.
  3. **Frontend Action:** Adjust API client configurations (e.g., fetch, axios) to automatically include credentials across requests (`credentials: 'include'`).
- **Definition of Done (DoD):** Running `localStorage.getItem('AUTH_TOKEN')` in the browser console returns `null`, and user sessions are fully maintained securely via HTTP cookies.

### [P3-02] Secure OAuth Callback Flow (Remove Token from Query String)

- **Files Affected:** `src/app/auth/callback/page.tsx` (Requires Backend alignment)
- **Context:** The authentication flow exposes the session token in the URL query string (`/auth/callback?token=...`). This leaves tokens visible in server logs, CDN/proxy logs, and browser history (Violation of secure transmission responsibilities, LGPD Art. 46).
- **Action Required:**
  1. **Backend Action:** Refactor the OAuth callback redirect to either issue a secure cookie directly before redirecting, or pass the token using a URL hash fragment (`#token=...`), which is not transmitted to servers.
  2. **Frontend Action:** Adapt the token parsing logic in Next.js to read from the hash fragment or rely entirely on the cookie.
- **Definition of Done (DoD):** Authenticating via OAuth logs the user into the application without ever printing the active session token inside the browser's URL query parameter.
