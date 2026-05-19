# Engineering Backlog: LGPD Compliance & Security Remediation

This backlog tracks the technical tasks required to mitigate security vulnerabilities and privacy non-compliance issues identified within the application.

---

## 🔴 Priority 1: Critical (Immediate Legal & Security Risk)

_Tasks involving unauthorized collection/transmission of Personally Identifiable Information (PII) or direct violation of user consent._

### [P1-01] Conditionally Load Google AdSense Based on CookieYes Consent

- **Files Affected:** `src/app/layout.tsx`
- **Context:** The Google AdSense script is currently configured with `strategy="afterInteractive"`. This causes it to execute and deposit tracking/advertising cookies during hydration (~200ms) before the user interacts with or accepts the CookieYes consent banner (Violation of LGPD Art. 7 I and Art. 11).
- **Action Required:**
  1. Remove the unconditional loading of the AdSense script from the main layout.
  2. Implement an event listener for the CookieYes API consent update (`window.addEventListener('CookieYes-consent-update', ...)`).
  3. Dynamically inject the AdSense script into the DOM only if the user gives explicit consent for the "advertisement" category.
- **Definition of Done (DoD):** The browser's network/storage panel confirms that no requests to `pagead2.googlesyndication.com` occur and no advertising cookies are set during a clean anonymous session before clicking "Accept" on the banner.

### [P1-02] Disable Automatic PII Transmission in Sentry

- **Files Affected:** `sentry.server.config.ts`, `sentry.edge.config.ts`
- **Context:** The current configuration sets `sendDefaultPii: true`, which automatically transmits user IPs, session cookies, and full HTTP headers to international servers (Sentry Inc., USA) without explicit legal basis or a user-visible Data Processing Agreement (DPA) safeguard (Violation of LGPD Art. 33).
- **Action Required:**
  1. Change the value of `sendDefaultPii` to `false` across all Sentry configuration files.
- **Definition of Done (DoD):** Verify in the Sentry issue dashboard that newly generated error logs no longer include sensitive client IPs, session tokens, or Authorization headers.

### [P1-03] Restrict or Refactor Sentry Session Replay

- **Files Affected:** `instrumentation-client.ts`
- **Context:** Sentry Session Replay is active (`replaysSessionSampleRate: 0.1`, `replaysOnErrorSampleRate: 1.0`). Although `maskAllText: true` is configured, user behavior, navigation flows, clicks, and scrolls are recorded without disclosure in the privacy policy and without explicit consent (Violation of LGPD Art. 9 regarding transparency of form and duration of processing).
- **Action Required:**
  1. Either fully remove the `Sentry.replayIntegration()` and its sample rates, OR
  2. Dynamically initialize the Replay integration only after the user consents to performance/analytical cookies via the CookieYes callback.
- **Definition of Done (DoD):** Replay data is not recorded or transmitted for users who have either rejected or not yet interacted with the cookie consent banner.

---

## 🟠 Priority 2: High (Transparency & Compliance Gaps)

_Tasks focused on user interface and privacy documentation alignment to ensure transparent data processing._

### [P2-01] Add Privacy Disclaimers and Opt-ins to Data Collection Points

- **Files Affected:** `NewsletterSection.tsx`, `Footer.tsx`, `ContactForm.tsx`
- **Context:** These components capture personal data (emails, names, phone numbers) without any privacy disclaimer at the point of collection, missing links to the Privacy Policy, and without granular consent checkboxes (Violation of LGPD Art. 9).
- **Action Required:**
  1. Add a clear informational notice below/adjacent to the input forms (e.g., "By submitting this form, you agree to our Privacy Policy").
  2. Hyperlink the text to the `/privacidade` route.
  3. For the contact form, introduce an optional/mandatory checkbox for explicit processing consent depending on the exact business use case.
- **Definition of Done (DoD):** Every data collection form contains a visible, accessible link to the application's Privacy Policy before a user can submit information.

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
