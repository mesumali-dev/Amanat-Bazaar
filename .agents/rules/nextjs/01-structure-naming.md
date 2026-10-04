<!-- MODE: always-on -->

# 01 — Project Structure & Naming

Applies continuously, on every file you create or touch. Mandatory unless I explicitly say otherwise in a task.

---

## 1. Full Project Structure

```
project/
├── public/                          images/ icons/ fonts/ svg/ favicon.ico
└── src/
    ├── app/
    │   ├── layout.tsx                root layout (html, body, global providers)
    │   ├── page.tsx                  homepage
    │   ├── globals.css               global styles / Tailwind entry
    │   ├── api/
    │   │   └── <route-name>/route.ts     e.g. api/users/route.ts, api/auth/login/route.ts
    │   ├── <route-name>/
    │   │   ├── page.tsx              route's page (Server Component by default)
    │   │   ├── loading.tsx           route-level Suspense fallback
    │   │   ├── error.tsx             route-level error boundary ("use client")
    │   │   └── not-found.tsx         route-level 404
    │   ├── <route-name>/[slug]/page.tsx      dynamic route, e.g. blog/[slug]/page.tsx
    │   ├── <route-name>/[...slug]/page.tsx   catch-all route (only when genuinely needed)
    │   └── dashboard/
    │       ├── layout.tsx            nested layout scoped to /dashboard/*
    │       ├── page.tsx
    │       └── settings/page.tsx
    ├── components/
    │   ├── ui/                       primitive, unstyled-opinion building blocks: button.tsx, input.tsx, dialog.tsx
    │   ├── common/                   shared but app-specific: navbar.tsx, footer.tsx, page-header.tsx
    │   ├── layout/                   structural wrappers: sidebar.tsx, dashboard-shell.tsx
    │   └── <feature>/
    │       ├── <feature>-container.tsx   thin Server Component: calls the hook via logic.ts's container pattern, passes data down
    │       ├── <feature>-<part>.tsx      markup-only pieces, e.g. product-card.tsx, product-list.tsx, product-filters.tsx
    │       └── logic.ts                  "use client" — all state/handlers for this feature (see 03-nextjs-architecture.md)
    ├── lib/
    │   └── <domain>/
    │       └── <domain>-service.ts       e.g. lib/user/user-service.ts, lib/payment/payment-service.ts
    ├── utils/
    │   └── index.ts                      pure helpers: formatCurrency, slugify, cn() — no side effects, no fetch
    ├── data/
    │   └── <name>.ts                     static content/constants: nav-links.ts, plans.ts, faq-items.ts
    ├── types/
    │   ├── <domain>.ts                   e.g. types/user.ts, types/product.ts
    │   ├── common.ts                     shared cross-domain types (Pagination, ApiResponse<T>)
    │   └── index.ts                      re-exports everything above
    └── proxy.ts / middleware.ts          per installed Next.js version — check before use
```

---

## 2. What Goes Where — Explicit Rules

- **`app/`** — routing, server data fetching, and composition only. No business logic, no inline validation, no direct DB calls here. A page should mostly call a `lib/` service and pass the result to a component.
- **`components/ui/`** — generic, reusable, no feature knowledge (a `Button` doesn't know about "products").
- **`components/common/`** — reusable across features but app-specific (a `Navbar` knows the app's routes).
- **`components/layout/`** — pure structural/shell components (sidebars, shells, grids).
- **`components/<feature>/`** — everything specific to one feature lives together: its markup pieces, its container, its `logic.ts`. Never split a feature's files across other folders.
- **`lib/<domain>/`** — the only place server-side business logic, external API calls, and DB queries live. One service file per domain; split further only when a file grows unreasonably large.
- **`utils/`** — stateless, side-effect-free functions only. If it calls `fetch`, touches a DB, or reads `process.env`, it does not belong here — that's `lib/`.
- **`data/`** — hardcoded, non-fetched content (nav items, plans, static FAQ). Not user data, not API results.
- **`types/`** — one file per domain, always re-exported from `types/index.ts` so imports stay `import { User } from "@/types"`.

---

## 3. Naming Conventions

| Thing                   | Convention                | Example                       |
| ----------------------- | ------------------------- | ----------------------------- |
| Components (identifier) | PascalCase                | `ProductCard`                 |
| Component files         | kebab-case                | `product-card.tsx`            |
| Feature container files | `<feature>-container.tsx` | `checkout-container.tsx`      |
| Route folders           | kebab-case                | `app/shop/product/[slug]/`    |
| Dynamic segment folders | `[param]`                 | `[slug]`, `[id]`, `[...slug]` |
| Variables, functions    | camelCase                 | `calculateSortOrder`          |
| Custom hooks            | camelCase, `use` prefix   | `useProductEditor`            |
| Constants               | UPPER_SNAKE_CASE          | `MAX_UPLOAD_SIZE`             |
| Types, interfaces       | PascalCase                | `ParsedUserForm`              |
| Service files           | `<domain>-service.ts`     | `user-service.ts`             |
| Route handler files     | always `route.ts`         | `api/users/route.ts`          |
| Test files              | `<name>.test.ts`          | `user-service.test.ts`        |

Use meaningful names that explain intent. Avoid abbreviations (`btn`, `usr`, `cfg`) unless the abbreviation is more standard than the full word in this codebase.

---

## 4. Cleanup — No Leftovers

- Never leave dead code, unused files, imports, variables, or functions.
- Never leave `TODO` comments unless I explicitly request them.
- Delete files that become unused after a refactor — don't just stop importing them.
- Before adding a new file, search for existing code that already solves the problem. Reuse beats writing new.
- If a feature is removed, remove its entire `components/<feature>/` folder, its `lib/<domain>/` service if unused elsewhere, and any now-orphaned types.

---

## 5. Changing Existing Code

- Preserve the existing architecture and conventions, even where you'd have chosen differently.
- Avoid unnecessary refactoring. Never change unrelated code.
- Never reformat a file you didn't otherwise need to change.
- Keep diffs as small as possible — modify the minimum required.
- If a change requires touching something outside the task's scope, say so before doing it, don't just do it silently.

---

## 6. Before You Write Code

1. Read `AGENTS.md` if it exists — its project-specific rules take priority unless they conflict with my explicit instructions.
2. Verify the installed Next.js version before using any API (check `node_modules/next/dist/docs/` when unsure); heed deprecation notices — especially for `params`/`searchParams` (async or not) and `middleware.ts` vs `proxy.ts`.
3. Plan the smallest correct change that fits this structure — decide which folder it belongs in before writing a single line.
