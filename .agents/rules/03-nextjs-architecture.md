<!-- MODE: always-on -->

# 03 — Next.js Architecture (Server-First, logic.ts, Route Handlers)

Applies continuously, whenever you create a page, component, route handler, or feature. Mandatory unless I explicitly say otherwise in a task.

---

## 1. Server-First — Default to the Server

> **Default assumption for every new file: it is a Server Component.** `"use client"` is the exception, never the norm. Do not add it preemptively, "to be safe," or because a similar component elsewhere has it — only add it when one of the specific triggers in this section applies. If in doubt, start server-side and only add `"use client"` when the compiler/runtime actually forces you to.

**Always prefer, in this order:** Server Components → Server Actions → Route Handlers → static rendering → streaming/`Suspense`.

Only reach for a Client Component when there is no server-side way to do it.

**Add `"use client"` only when the component genuinely needs:**

- A client hook: `useState`, `useEffect`, `useContext`, `useReducer`, etc.
- Event handlers: `onClick`, `onChange`, `onSubmit`.
- Browser-only APIs: `window`, `localStorage`, `IntersectionObserver`, etc.
- A client-only third-party library (a chart lib, a rich text editor, etc.).

**Push `"use client"` to the leaves.** If a page needs one interactive widget (say, a "like" button), only that button becomes a Client Component — never the whole page or layout.

```tsx
// Bad — whole page is client just for one button
"use client";
export default function ProductPage() {
  const [liked, setLiked] = useState(false);
  return (
    <div>
      <ProductDetails /* server-fetched content */ />
      <button onClick={() => setLiked(!liked)}>Like</button>
    </div>
  );
}

// Good — page stays server, only the button is client
export default async function ProductPage() {
  const product = await getProduct(); // server-side fetch
  return (
    <div>
      <ProductDetails product={product} />
      <LikeButton productId={product.id} /> {/* "use client", isolated */}
    </div>
  );
}
```

**React Compiler enabled** (`reactCompiler: true` in `next.config.ts`): do **not** add `useMemo`, `useCallback`, or `React.memo` — the compiler handles memoization automatically. Add them only with a measured, explicitly stated reason (e.g. a profiled bottleneck).

**Check version-sensitive APIs before use** — whether `params`/`searchParams` are async in the installed Next.js version, and whether middleware belongs in `middleware.ts` or `proxy.ts`.

---

## 2. The `logic.ts` Convention

Every feature folder keeps **all** of its client-side logic in one `logic.ts` file beside its components. `.tsx` files hold markup only — `logic.ts` holds state and behaviour. Never mix the two.

```
components/product/
├── product-container.tsx   Server Component — fetches data, passes to children
├── product-card.tsx        markup only
├── product-filters.tsx     markup only
└── logic.ts                "use client" — all hooks, handlers, state for this feature
```

**Goes in `logic.ts`:**

- `"use client"` as the very first line.
- Custom hooks that own the feature's state — one hook per concern (`useProductEditor`, `useProductFilters`).
- Event handlers and submit logic.
- Client-side validation and derived state.
- `fetch` calls to your own route handlers.
- Client-only helper functions (e.g. `logoutAdmin`).
- Interfaces used only by that feature's client logic.

**Stays out of `logic.ts`:**

- JSX — it's a `.ts` file, not `.tsx`.
- Server-only code, secrets, or direct database/CMS writes.
- Anything reusable across unrelated features — that belongs in `utils/` or `lib/`.

**Shape — one hook per feature concern:**

```ts
// components/product/logic.ts
"use client";

import { useState } from "react";
import type { Product } from "@/types";

// <======< Custom Hook for Product Editor Logic & State >======>
export function useProductEditor(initialProduct?: Product | null) {
  const [productName, setProductName] = useState(initialProduct?.name ?? "");
  const [isSaving, setIsSaving] = useState(false);

  // <======< Submit >======>
  async function handleSubmit() {
    setIsSaving(true);
    try {
      await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify({ name: productName }),
      });
    } finally {
      setIsSaving(false);
    }
  }

  return { productName, setProductName, isSaving, handleSubmit };
}
```

**Importing:**

- Same feature → `import { useProductEditor } from "./logic";`
- Another feature → `import { logoutAdmin } from "@/components/auth/logic";`
- A page normally imports the **component**, not the hook directly. A page may import from `logic.ts` only when it genuinely needs the hook itself — but then the page becomes a Client Component. Prefer a thin `<feature>-container.tsx` Server Component instead, so the page stays server-rendered.

```tsx
// components/product/product-container.tsx — thin container, stays server
export async function ProductContainer({ id }: { id: string }) {
  const product = await getProduct(id); // lib/ service call
  return <ProductEditorClient product={product} />; // client boundary starts here
}
```

---

## 3. Route Handlers — Thin by Design

A route handler does exactly four things and nothing more:

1. Parse input.
2. Delegate to a service in `lib/`.
3. Map the result to a status code.
4. Catch and log errors.

```ts
// app/api/products/route.ts
import { createProduct } from "@/lib/product/product-service";

// <======< POST /api/products - Create a product >======>
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await createProduct(body); // all logic lives in lib/

    if (!result.success) {
      return Response.json({ success: false, message: result.message }, { status: 400 });
    }
    return Response.json({ success: true, data: result.data }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/products]", error);
    return Response.json({ success: false, message: "Something went wrong" }, { status: 500 });
  }
}
```

**Requirements:**

- Validate every input before use — never trust the request body directly.
- Return correct HTTP status codes: `200`, `201`, `400`, `401`, `404`, `409`, `500`.
- Return typed responses with a consistent envelope: `{ success: boolean; message?: string; ...data }`.
- Wrap in `try/catch`, log with a labelled prefix (`[POST /api/products]`), return a **generic** message to the client — never leak internal error details (stack traces, DB errors) to the response.
- Business logic never lives in the handler — it lives in `lib/<domain>/<domain>-service.ts`.

---

## 4. Error Handling

- Always handle: async errors, API/fetch failures, invalid input.
- Never silently ignore an error. Never leave an empty `catch {}`.
- Use `error.tsx` (must be a Client Component) for route-level error boundaries, and `not-found.tsx` for route-level 404s.
- Return meaningful, actionable error messages to the caller — not raw exception text.
- Validate at the boundary (route handler, form submit), then trust your types for everything inward from there.

```tsx
// app/dashboard/error.tsx
"use client";

export default function DashboardError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <p>Something went wrong loading the dashboard.</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```
