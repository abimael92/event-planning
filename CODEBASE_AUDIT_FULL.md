# Planora Event Planning App — Full Codebase Audit

**Date:** January 29, 2026  
**Version:** 1.2.12  
**Scope:** Technology-agnostic analysis; no code modified.  
**Purpose:** Production-grade audit for architecture, security, quality, and maintainability.

---

## 1. Application Overview

### 1.1 Purpose and Target Users

**Planora** is a luxury event-planning marketplace that connects:

- **Clients (event planners):** Create and manage events, discover vendors, track budget, bookings, payments, and messages.
- **Vendors (service providers):** Manage portfolio, events, bookings, payments, and analytics.

The app is a **front-end prototype/demo**: no backend, no database, no real auth. All data is mock or stored in `localStorage`.

### 1.2 Core Business Logic and User Flows

**Client flow:**  
Landing → Login/Register → Dashboard → Events list (mock) → Create event (stub) → Vendors/Providers (UI) → Bookings, Payments, Messages (mock UI).

**Vendor flow:**  
Login (same auth) → Vendor dashboard → Events, Payments (mock), Portfolio/Analytics (minimal).

**Auth:** Client-side only. Two hardcoded users (`client@client.com`, `vendor@vendor.com`, password `123456`). Session restored from `localStorage` key `planora_user`. No server validation, no tokens, no expiry.

### 1.3 Key Features and Responsibilities by Module

| Module / Area | Responsibility | Current State |
|---------------|----------------|---------------|
| **Landing** (`app/page.tsx`, `components/landing/hero-section.tsx`) | Hero, CTA, redirect if authenticated | Implemented |
| **Auth** (`app/contexts/auth-context.tsx`, `app/login/`, `components/auth/*`) | Login, register (client/vendor), forgot password UI | UI + client-only auth with hardcoded users |
| **Dashboard (client)** (`app/dashboard/*`, `components/layout/dashboard-layout.tsx`) | Events, providers, bookings, payments, messages, agenda, tasks | Events/providers/payments/messages use mock data; agenda/tasks/create-event stubbed or placeholder |
| **Vendor** (`app/vendor/*`, `components/layout/vendor-layout.tsx`) | Vendor dashboard, events, payments, portfolio, analytics | Implemented with mock data |
| **Shared** (`app/shared/lib/*`, `app/shared/types/*`) | Errors, logger, feature flags, global error handler, utils, booking type | Implemented; used inconsistently |
| **Data** (`data/mock-data.ts`) | Events, users, vendors, bookings, payments, messages, etc. | Single source of mock data; some pages duplicate local arrays |

---

## 2. Technology & Stack Breakdown

### 2.1 Languages, Frameworks, Libraries, Tooling

| Category | Technology | Version | Notes |
|----------|------------|---------|-------|
| Runtime | Node.js | 20 (CI) | — |
| Framework | Next.js | 16.0.10 | App Router |
| UI | React | ^18.2.0 (locked by pnpm overrides) | Types @19 |
| Language | TypeScript | ^5 | strict; build can ignore errors |
| Styling | Tailwind CSS | ^3.4.0 | Utility-first |
| Components | Radix UI | Multiple packages | Headless primitives |
| Forms | React Hook Form | ^7.52.0 | — |
| Validation | Zod | ^3.23.8 | Used with resolvers |
| Animations | Framer Motion | ^11.15.0 | Heavy use on auth/landing |
| Icons | Lucide React | ^0.454.0 | — |
| Charts | Recharts | ^2.15.4 | — |
| Date | date-fns | ^3.6.0 | — |
| Testing | Vitest, Testing Library, jsdom | ^1.1.0, ^14.x | Limited coverage |
| Lint | ESLint | ^9.39.1 | next/core-web-vitals, next/typescript |
| Package manager | pnpm | 8 (CI) | Workspace present |
| Hosting | Vercel | — | vercel.json, 12GB heap for build |

### 2.2 Frontend / Backend / Infra

- **Frontend only.** All logic runs in the browser or at build/SSR time (Next.js).
- **No backend:** No `app/api/` routes, no server-side data layer, no database client.
- **Infra:** Vercel (build, serverless); GitHub Actions for build-check (lint, type-check, tests, build).

### 2.3 Build, Runtime, Hosting

- **Build:** `next build` with `NODE_OPTIONS='--max-old-space-size=12288'` (script and vercel.json).
- **Bundler:** Next.js (Webpack/Turbopack).
- **Runtime:** Next.js server + browser.
- **Dev:** `next dev -p 5050`.
- **Config:** `next.config.ts` only (no `next.config.mjs` in repo). TypeScript and image optimizations relaxed for memory/build reasons.

---

## 3. Architecture Analysis

### 3.1 Overall Style

- **UI-centric, feature-folders under routes.** App Router drives structure (`app/dashboard/*`, `app/vendor/*`, `app/login`). Shared logic in `app/shared/`, reusable UI in `components/`.
- **Layered only by convention:** no formal DDD/hexagonal boundaries. “Backend” is mock data and `localStorage`; no API or service abstraction.

### 3.2 Component / Module Relationships

- **Root:** `app/layout.tsx` wraps with `GlobalErrorHandler` → `ErrorBoundary` → `AuthProvider` → `Suspense` → children.
- **Routes:** Most pages are `"use client"`. Protected routes use `<ProtectedRoute>` + layout (e.g. `DashboardLayout`, `VendorLayout`).
- **Auth:** `AuthProvider` holds user state and login/logout; reads/writes `localStorage`; no API.
- **Data:** Pages and components import from `@/data/mock-data` or define local arrays (duplication in `app/dashboard/events/page.tsx`).
- **Shared lib:** `errors`, `logger`, `feature-flags`, `global-error-handler`, `utils` live under `app/shared/lib/`. Used by error boundary, global handler, and some hooks; not consistently used for form/API errors.

### 3.3 Data Flow and State Management

- **State:** React Context (auth only). No Redux/Zustand/etc.
- **Data flow:** Top-down props and direct imports of mock data. No central data layer or cache (e.g. no React Query/SWR).
- **Persistence:** `localStorage` for user session and language preference only.

### 3.4 Client/Server Boundaries

- **Server:** Next.js serves HTML and assets; no custom API or server-side data fetching for app data.
- **Client:** All interactive pages are client components. No Server Components used for data loading; no streaming or RSC data patterns.

### 3.5 Runtime vs Build-Time

- **Build:** Next.js pre-renders where possible; TypeScript can be skipped (`ignoreBuildErrors: true`). ESLint not wired into build.
- **Runtime:** Auth and theme/language run in browser; global error handlers (window + process) registered by `GlobalErrorHandler` on mount.

---

## 4. Code Quality & Design Review

### 4.1 Anti-patterns and Code Smells

- **Hardcoded secrets:** Passwords and user records in source (`app/contexts/auth-context.tsx`).
- **Duplicate data:** `app/dashboard/events/page.tsx` defines a local `events` array and imports `mockEvents` but uses the local one; structure diverges (e.g. `cover` only local).
- **Stub/placeholder pages:** Create-event is a stub; agenda/tasks minimal; some “Ver detalles” buttons link to non-existent dynamic routes (e.g. `/dashboard/events/${event.id}` with no `[id]` route).
- **Typo in JSX:** `app/login/page.tsx` has `< AuthSection />` (space before component name).
- **Unused dependency:** `hooks/use-error-handler.ts` includes `log` from `useLogger` in the dependency array but never uses it in the callback.
- **`any` usage:** e.g. `error: any` in `components/auth/login-form.tsx`; `value: any` in `use-translation.ts` for nested translation object.

### 4.2 Tight Coupling / Low Cohesion

- **Auth context** embeds “database” (REAL_USERS) and persistence (localStorage); no abstraction for auth or storage.
- **Dashboard layout** encodes nav links and labels; some links point to “providers” while another route is “vendors” (both exist; naming inconsistent).
- **Pages** import layout, auth, and mock data directly with little indirection.

### 4.3 SOLID / Clean Architecture

- **SRP:** Auth context does identity, storage, and “DB”; global error handler both subscribes and mutates `console.error`.
- **OCP/DIP:** No abstractions for auth, data source, or API; swapping to a real backend would touch many files.
- **No clear domain layer:** Types live in `data/mock-data.ts` and `app/shared/types/`; no unified domain or use-case layer.

### 4.4 Reusability and Abstraction Gaps

- **Path aliases:** `tsconfig.json` maps `@/*` to `./src/*` but there is no `src/` directory; `@/components/*` and others point to real paths. Risk of broken imports if code uses `@/` for non-component paths. `@/lib/*` → `./lib/*` but project has `app/shared/lib/`; `components.json` expects `@/lib` (e.g. for shadcn). One component works around missing `@/lib/utils` with a local `cn`.
- **No shared data/API layer:** No repository or service abstraction; replacing mock data requires edits across many components.

---

## 5. Security & Stability Audit

### 5.1 XSS, Injection, Unsafe DOM, Deserialization

- **XSS:** React escapes by default. One use of `dangerouslySetInnerHTML` in `components/ui/chart.tsx` (lines 83–101): injects CSS from theme/color config (build-time/config-driven), not user input — low risk but still a code pattern to restrict.
- **Injection:** No server-side queries or API; injection risk is limited to future backend work. Client-side validation exists (e.g. react-hook-form + patterns) but no server-side validation.
- **Deserialization:** `localStorage.getItem("planora_user")` is parsed with `JSON.parse(storedUser)` without schema validation. If storage is tampered or XSS occurs, this can lead to unexpected behavior or prototype pollution.

### 5.2 Auth / Session / Token

- **Critical:** Plaintext passwords and user list in source (`app/contexts/auth-context.tsx` lines 27–48, 36 and 46).
- **Critical:** Session stored in `localStorage` (same file, ~75). Vulnerable to XSS; no httpOnly, no secure token, no expiry or refresh.
- **No authorization model:** `userType` is present but there is no route-level or resource-level check (e.g. client vs vendor); protected route only checks “authenticated.”

### 5.3 Environment Variables and Secrets

- **No `.env` or `.env.example` in repo.** Feature flags and `NODE_ENV` are used; no documented env vars for future API keys or secrets. `.env*` is gitignored.

### 5.4 Error Handling and Crash Risks

- **Positive:** Root `ErrorBoundary` and `GlobalErrorHandler` (window + unhandledRejection + console.error override on client; uncaughtException/unhandledRejection on process). Shared `AppError`, `normalizeError`, `getUserFriendlyMessage` used in boundary and handler.
- **Gap:** `cleanupGlobalErrorHandlers` does not remove listeners or restore `console.error`, so tests or remounts may leave duplicate handlers or wrong console behavior.
- **Missing Progress import:** `app/dashboard/events/page.tsx` uses `<Progress>` (line 264) but does not import it — runtime error when that block renders.

### 5.5 Memory / Resource Leaks

- **GlobalErrorHandler:** Registers listeners and overrides `console.error`; cleanup does not reverse them.
- **Auth:** No long-lived timers or subscriptions. Framer Motion and particles are React-driven; no obvious leaks identified in short review.

---

## 6. Performance & Scalability

### 6.1 Rendering and Execution

- **Heavy client-side:** Most pages are client components; no RSC or streaming for data.
- **Large UI components:** e.g. `auth-section.tsx`, `dashboard-layout.tsx`; could be split for code-splitting and maintainability.
- **Animations:** Framer Motion and particle-style effects on landing/auth; may cost on low-end devices.

### 6.2 Bundle and Load Time

- **next.config.ts:** `optimizePackageImports` for `lucide-react` and `framer-motion` to reduce bundle size.
- **Images:** `images.unoptimized: true` — no Next.js image optimization; possible slower loads and larger payloads.
- **No bundle analyzer or size gates** in repo.

### 6.3 Caching

- **No application-level cache:** No SWR/React Query; mock data re-imported per page. No CDN or cache headers configuration visible for app routes.

### 6.4 Scalability and Concurrency

- **No backend:** Horizontal scaling of “app” is limited to static/SSR and serverless; business logic and data do not scale beyond client and mock.
- **localStorage:** Not shared across devices/tabs; size limits; not suitable for real app state at scale.

---

## 7. SEO & Production Readiness

### 7.1 SEO

- **Root metadata:** `app/layout.tsx` sets title, description, manifest, icons. No page-level metadata, no Open Graph, no JSON-LD, no sitemap or robots.txt.
- **Lang:** `lang="en"` fixed in root; no i18n or alternate languages in markup.

### 7.2 Accessibility

- **No systematic a11y review.** Some forms have labels; no aria attributes or keyboard/focus strategy documented. Chart and custom controls would need review.

### 7.3 Production Config

- **TypeScript:** `ignoreBuildErrors: true` — type errors do not fail build.
- **Source maps:** `productionBrowserSourceMaps: false`.
- **Powered-by header:** `poweredByHeader: false`.
- **No CSP or security headers** in next.config.

---

## 8. Maintainability & DX

### 8.1 File and Folder Structure

- **App Router:** Clear route tree under `app/`. Shared code under `app/shared/`. Components in `components/` (ui, auth, layout, feature-specific).
- **Inconsistencies:** Dashboard has both `providers` and `vendors` routes; one re-exports a component from `components/dashboard/vendors/page`, the other uses vendor dashboard UI; naming is confusing.
- **Path aliases:** `@/*` → `./src/*` with no `src/`; `@/lib/*` → `./lib/*` with no top-level `lib/` (only `app/shared/lib/`). Potential for broken or inconsistent imports.

### 8.2 Naming

- **Mixed Spanish/English** in UI and code (e.g. “Mis Eventos”, “Nuevo Evento”, “Ver detalles”). No stated policy.
- **Route vs feature:** “providers” vs “vendors” and “VendorsPage” vs “VendorDashboard” can confuse.

### 8.3 Documentation and Comments

- **README:** Default Next.js template; no project-specific setup or env.
- **docs/:** Some files under `docs/architecture/` and `docs/components/` are empty (e.g. folder-structure, feature-organization, component-guidelines). Existing docs (e.g. auth-system, event-creation, vendor-marketplace) not verified in this audit.
- **Code:** Few JSDoc or inline comments; some TODOs and “TEMPORARY” notes in config.

### 8.4 Testing

- **Vitest + Testing Library** configured. Tests under `app/shared/lib/__tests__/` (errors, feature-flags, logger) and `hooks/__tests__/` (use-logger). No route or integration tests; no E2E. CI runs `pnpm test:run`.

### 8.5 CI/CD and Deployment

- **GitHub Actions:** `.github/workflows/vercel-build-check.yml` on push/PR to main/master: checkout, pnpm 8, Node 20, install, lint, `tsc --noEmit`, `pnpm test:run`, `pnpm build`. All steps `continue-on-error: false`.
- **Husky:** Pre-commit only runs on `main` and bumps patch version (or minor if patch ≥ 99); no lint or test on commit.
- **Vercel:** Build command uses 12GB heap; 30s max duration for app routes.

---

## 9. Explicit Issue List (by Severity)

### Critical

| # | Description | Impact | File(s) and line(s) |
|---|-------------|--------|----------------------|
| 1 | Plaintext passwords and user records in source | Credential leak; anyone with repo access sees credentials | `app/contexts/auth-context.tsx` (e.g. 27–48, 36, 46) |
| 2 | Session stored in localStorage; no httpOnly/secure token | XSS can steal session; no expiry/refresh | `app/contexts/auth-context.tsx` (e.g. 55–57, 75, 81) |
| 3 | TypeScript build errors ignored | Type bugs can reach production | `next.config.ts` (e.g. 7–9) |
| 4 | Missing `Progress` import | Runtime error when events list with progress is rendered | `app/dashboard/events/page.tsx` (use at ~264; no import) |

### High

| # | Description | Impact | File(s) and line(s) |
|---|-------------|--------|----------------------|
| 5 | Unsafe JSON parse of localStorage user; no schema | Tampered/XSS storage can break app or introduce bad data | `app/contexts/auth-context.tsx` (55–57) |
| 6 | No route for event detail | “Ver detalles” links to `/dashboard/events/${event.id}` but no `[id]` route | `app/dashboard/page.tsx` (e.g. 233); no `app/dashboard/events/[id]/page.tsx` |
| 7 | Duplicate/local events data | Inconsistent data and extra maintenance | `app/dashboard/events/page.tsx` (imports mockEvents, defines local `events`, uses local) |
| 8 | Path alias `@/*` points to non-existent `./src/*` | Imports using `@/` for non-component paths can break | `tsconfig.json` (22) |
| 9 | `@/lib/*` points to `./lib/*`; no top-level `lib/` | shadcn/utils and any `@/lib` usage may fail or be inconsistent | `tsconfig.json` (28); `components.json`; `components/ui/card.tsx` workaround |
| 10 | Images unoptimized | Larger payloads, slower LCP | `next.config.ts` (26–28) |

### Medium

| # | Description | Impact | File(s) and line(s) |
|---|-------------|--------|----------------------|
| 11 | `dangerouslySetInnerHTML` for chart CSS | Low XSS risk (config-only) but weakens security posture | `components/ui/chart.tsx` (83–101) |
| 12 | Global error handler cleanup does not remove listeners or restore console | Duplicate handlers or wrong console in tests/re-mounts | `app/shared/lib/global-error-handler.ts` (102–106) |
| 13 | Login form uses `error: any` | Weak typing, hides follow-up errors | `components/auth/login-form.tsx` (53) |
| 14 | useTranslation `t()` can return non-string (value is `any`) | Runtime or type issues if key path is wrong | `hooks/use-translation.ts` (32–40) |
| 15 | Unused `log` in useErrorHandler | Dead dependency; misleading hook API | `hooks/use-error-handler.ts` (29–31, 63) |
| 16 | Typo in JSX: space in component tag | Style/minor parsing | `app/login/page.tsx` (37): `< AuthSection />` |
| 17 | No authorization by role | Client could navigate to vendor routes and vice versa with same auth | Layouts and ProtectedRoute only check “authenticated” |
| 18 | No .env.example or documented env vars | Hard for new devs to know what to configure | Repo root |

### Low

| # | Description | Impact | File(s) and line(s) |
|---|-------------|--------|----------------------|
| 19 | Root `lang` fixed to "en" | SEO/i18n not aligned with ES/EN UI | `app/layout.tsx` (57) |
| 20 | Empty or minimal docs | Onboarding and consistency | e.g. `docs/architecture/folder-structure.md`, `feature-organization.md`, `component-guidelines.md` |
| 21 | Pre-commit only version bump on main | No lint/test on commit | `.husky/pre-commit` |
| 22 | Dashboard nav: “providers” vs “vendors” routes and naming | Confusion for devs and possibly users | `components/layout/dashboard-layout.tsx` (e.g. 43–44); `app/dashboard/providers/page.tsx`, `app/dashboard/vendors/page.tsx` |
| 23 | Create-event page is stub | Incomplete feature | `app/dashboard/create-event/page.tsx` |
| 24 | Duplicate postcss config files | Unclear which is used | `postcss.config.js`, `postcss.config.mjs` |

---

## 10. Next Steps & Recommendations

### 10.1 Immediate Fixes (No Redesign)

1. **Security:** Remove hardcoded users and passwords from source; replace with demo-only env or clearly separated demo mode (e.g. env flag + placeholder credentials only in dev).
2. **Runtime bug:** Add missing `Progress` import in `app/dashboard/events/page.tsx` (or remove Progress usage until import is added).
3. **Fix broken “Ver detalles”:** Either add `app/dashboard/events/[id]/page.tsx` or change the button to a safe target (e.g. `#` or current events list).
4. **Consolidate events data:** Use `mockEvents` (or one source) in `app/dashboard/events/page.tsx` and remove the local `events` array.
5. **Path aliases:** Point `@/*` to an existing root (e.g. `./*` or create `src/` and move app/components into it). Align `@/lib` with `app/shared/lib` or add a thin `lib/` at root that re-exports from `app/shared/lib`.
6. **Typo:** Fix `< AuthSection />` to `<AuthSection />` in `app/login/page.tsx`.
7. **TypeScript:** Re-enable build-time type checking once memory/build allows; remove `ignoreBuildErrors: true`.
8. **localStorage user:** Validate/sanitize after `JSON.parse` (e.g. Zod or minimal shape check) before using in state.

### 10.2 Short-Term Improvements

1. **Auth:** Introduce a proper auth mechanism (e.g. NextAuth or custom JWT) and server-side session validation; stop storing sensitive session in localStorage.
2. **Env:** Add `.env.example` and document all env vars (including future API keys and feature flags).
3. **Error handler cleanup:** Implement proper cleanup (remove listeners, restore `console.error`) in `cleanupGlobalErrorHandlers` and use it in tests.
4. **Lint/type on commit:** Add lint and type-check (and optionally tests) to pre-commit or pre-push (e.g. husky + lint-staged).
5. **Use error handling layer:** Use `useErrorHandler` / `normalizeError` / `getUserFriendlyMessage` in login and other async flows instead of ad-hoc `error?.message`.
6. **Tighten types:** Replace `any` in login form and use-translation; ensure `t()` return type reflects string-or-fallback.
7. **Metadata and SEO:** Add per-route metadata, lang from i18n, and basic Open Graph where useful.
8. **Images:** Re-enable Next.js image optimization when build/memory allows and use `next/image` where applicable.

### 10.3 Long-Term Architectural Improvements

1. **Backend and API:** Add a real backend (e.g. Next.js API routes or separate service), database, and auth (tokens, httpOnly cookies, refresh).
2. **Data layer:** Introduce a single data/API layer (repositories or services) and replace direct mock-data imports with that layer so backend can be swapped in.
3. **Authorization:** Enforce role-based access (client vs vendor) on routes and on any future API.
4. **Testing:** Add integration tests for critical flows and E2E for login and main navigation; aim for meaningful coverage.
5. **Docs:** Fill `docs/` (architecture, folder structure, component guidelines, env, deployment) and keep README in sync with setup and scripts.
6. **Bundle and perf:** Re-enable image optimization; add bundle analysis and size budgets; consider Server Components and streaming for heavy or static pages.

### 10.4 Features Aligned with Current App Intent

- **Event detail page:** Implement `/dashboard/events/[id]` (and optionally vendor-side event detail) with mock then real data.
- **Create-event flow:** Replace stub with the existing event-creation component or a minimal multi-step flow.
- **Agenda and tasks:** Implement minimal agenda and task list using shared types and mock (or future) data.
- **Vendor portfolio/analytics:** Flesh out portfolio and analytics pages with clear structure and data contracts for when backend exists.
- **Search and filters:** Centralize and reuse filter/search logic for events and vendors to avoid duplication and prepare for API-backed search.

---

**End of audit.** No code was modified. Findings are based solely on the repository state at the time of review.
