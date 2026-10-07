---
trigger: model_decision
---

<!-- MODE: on-demand -->

# 05 — Feature Completion Checklist

**Do not apply automatically.** This file runs only when I explicitly say something like "feature complete, run the checklist," "apply completion rules," or "ready to commit." It is a wrap-up gate, not a continuous coding rule.

---

## 1. Git Commit Convention

Use **Conventional Commits** — `type(scope): short description`.

| Type       | When                                                    |
| ---------- | ------------------------------------------------------- |
| `feat`     | A new feature                                           |
| `fix`      | A bug fix                                               |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `chore`    | Tooling, config, deps — no source logic change          |
| `docs`     | Documentation only                                      |
| `style`    | Formatting only, no logic change                        |
| `perf`     | Performance improvement                                 |
| `test`     | Adding or fixing tests                                  |

```
feat(checkout): add promo code validation on the payment step
fix(auth): correct redirect loop after session expiry
refactor(product): extract price calculation into utils
chore(deps): remove unused axios dependency
```

Rules:

- One logical change per commit. Don't bundle an unrelated fix into a feature commit.
- Keep the description under ~72 characters; add a body below a blank line if more context is needed.
- Never commit commented-out code, debug `console.log`s, or `.env` files.
- PRs should be small and scoped to one concern — split a large feature into multiple PRs where sensible.

---

## 2. Security Audit

Run before marking a feature done:

- [ ] Every external input (form data, query params, request body, headers) is validated/sanitized before use — nothing is trusted from the client.
- [ ] Every protected route handler and Server Action checks auth/authorization itself — not relying on middleware alone.
- [ ] No secret, API key, or credential is exposed to the client. Only `NEXT_PUBLIC_*` env vars are used in client code; everything else stays server-only.
- [ ] No `.env*` file is committed. `.env.example` is updated if new env vars were added.
- [ ] No raw SQL/query built via string concatenation with user input (SQL/NoSQL injection risk) — parameterized queries or the ORM's query builder only.
- [ ] Error responses to the client never leak stack traces, internal error messages, or DB details (see `03-nextjs-architecture.md` §3).
- [ ] Rate-sensitive or abuse-prone endpoints (login, signup, contact forms) have basic throttling/rate-limiting if the project has that infrastructure.

---

## 3. Dependency Audit

- [ ] Run `npm audit` (or the project's equivalent) — resolve or explicitly note any high/critical vulnerabilities.
- [ ] No unused dependency was left in `package.json` after this feature.
- [ ] No dependency was added that duplicates a Next.js/React built-in (cross-check against `04-principles-dependencies.md` §2) — if one was, justify it or remove it.
- [ ] Lockfile (`package-lock.json` / `pnpm-lock.yaml`) is committed alongside any dependency change.

---

## 4. Accessibility (a11y)

- [ ] Every image has meaningful `alt` text (`alt=""` only for purely decorative images).
- [ ] All interactive elements (buttons, links, form fields) are reachable and operable via keyboard alone (Tab, Enter, Space).
- [ ] Semantic HTML is used where possible (`<button>` not a `<div onClick>`, `<nav>`, `<main>`, `<label>` tied to inputs) — ARIA attributes only fill gaps semantic HTML can't cover.
- [ ] Sufficient color contrast for text against its background (roughly WCAG AA — 4.5:1 for body text).
- [ ] Focus states are visible — never `outline: none` without a replacement focus style.

---

## 5. Documentation

- [ ] Any non-obvious business logic in `lib/` has a short comment explaining **why**, following the `// <======< >======>` format from `02-typescript-coding-style.md`.
- [ ] Any new API route has its request/response shape documented — either inline (typed request/response) or in a short README if the project keeps API docs.
- [ ] If this feature introduces a new pattern (a new folder convention, a new shared util), note it briefly so it's discoverable next time — don't leave silent tribal knowledge.

---

## 6. Testing (if the project has a test runner configured)

- [ ] New logic in `lib/` or a feature's `logic.ts` has a colocated test (`*.test.ts`) covering the main success path and at least one failure/edge case.
- [ ] Don't introduce a testing setup unprompted on a project that doesn't already have one — follow existing convention only.

---

## 7. Definition of Done — Final Pass

Verify every item before reporting the feature complete:

- [ ] No `any`, `@ts-ignore`, or `@ts-nocheck` anywhere in the new/changed code.
- [ ] No unused imports, variables, functions, or files.
- [ ] No dead code, no duplicated logic.
- [ ] Everything strongly typed; shared types live in `src/types`.
- [ ] Server Components used by default; `"use client"` only where required, pushed to the leaves.
- [ ] Client logic lives in the feature's `logic.ts`; `.tsx` files hold markup only.
- [ ] Server-side business logic lives in `lib/`, not in routes or components.
- [ ] Route handlers validate input and return typed responses with correct status codes.
- [ ] Errors are handled and logged, never swallowed.
- [ ] Comments follow the `// <======< Label >======>` format, used only where they add value.
- [ ] Project structure and naming conventions respected (`01-structure-naming.md`).
- [ ] SRP, DRY, KISS, YAGNI followed; no unjustified new dependency (`04-principles-dependencies.md`).
- [ ] Security audit (§2) and dependency audit (§3) above both pass.
- [ ] Lint and type-check pass with zero errors.
- [ ] The implementation is clean, minimal, maintainable, and production-ready.
