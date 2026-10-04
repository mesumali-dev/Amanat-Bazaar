<!-- MODE: always-on -->

# 04 — Core Principles, Dependencies & Performance

Applies continuously — every time you write a function, add a package, or make a performance decision. Mandatory unless I explicitly say otherwise in a task.

---

## 1. Core Principles

Always follow: **SRP, DRY, KISS, YAGNI**, reusability, readability, separation of concerns.

### SRP — Single Responsibility Principle

One function, one component, one service = one reason to change.

```ts
// Bad — one function does validation + DB write + email
async function createUser(data: unknown) {
  if (!data) throw new Error("invalid");
  const user = await db.user.create({ data });
  await sendEmail(user.email, "Welcome!");
  return user;
}

// Good — each concern is its own function
function validateUserInput(data: unknown): UserInput {
  /* ... */
}
async function saveUser(input: UserInput) {
  return db.user.create({ data: input });
}
async function sendWelcomeEmail(email: string) {
  /* ... */
}

async function createUser(data: unknown) {
  const input = validateUserInput(data);
  const user = await saveUser(input);
  await sendWelcomeEmail(user.email);
  return user;
}
```

### DRY — Don't Repeat Yourself

If the same logic appears twice, extract it — into a `utils/` helper, a `lib/` service function, or a shared hook in `logic.ts`. Never copy-paste a block and tweak one line.

### KISS — Keep It Simple

Write the simplest implementation that correctly solves the actual problem. No clever abstractions, no unnecessary layers of indirection, no premature generalization.

### YAGNI — You Aren't Gonna Need It

Don't build config options, extra parameters, or abstraction layers for hypothetical future requirements. Solve today's requirement only.

```ts
// Bad — YAGNI violation: options nobody asked for
function formatPrice(amount: number, options?: { currency?: string; locale?: string; showCents?: boolean; roundingMode?: string }) { ... }

// Good — solve what's actually needed right now
function formatPrice(amount: number) {
  return `$${amount.toFixed(2)}`;
}
```

**No large files.** Break logic into reusable modules split by responsibility, not by arbitrary line count. If a file is doing more than one job, split it along that boundary — not just because it's "long."

---

## 2. Dependency Discipline — Use What's Already Built In

**Before adding any new npm package, ask: "Does Next.js/React already do this?"** Adding a dependency is not free — it's extra bundle weight, extra attack surface, extra maintenance burden, and one more thing to keep updated.

**Concrete rule — never add these when the built-in already covers it:**

| Don't add                                         | Why not                                                                                                                                    | Use instead                                                                       |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| `axios`                                           | Next.js's extended `fetch` already has built-in caching, revalidation (`next: { revalidate }`), and works identically on server and client | Native `fetch()`                                                                  |
| `moment` / `dayjs` for simple formatting          | Adds significant bundle weight for basic date math                                                                                         | `Intl.DateTimeFormat`, native `Date`, or a tiny purpose-built util in `utils/`    |
| `lodash` for one or two functions                 | Most of it is reimplementable in a few lines                                                                                               | Native `Array`/`Object` methods (`.map`, `.filter`, `.reduce`, `structuredClone`) |
| `uuid` when a simpler option exists               | Node/browser already expose `crypto.randomUUID()`                                                                                          | `crypto.randomUUID()`                                                             |
| A state-management library for local/simple state | Server Components + `useState`/`useReducer` already cover most cases                                                                       | React's built-in state, lifted where needed                                       |

```ts
// Bad — unnecessary dependency + extra bundle weight
import axios from "axios";
const res = await axios.get("/api/products");

// Good — built into Next.js, supports caching/revalidation natively
const res = await fetch("/api/products", { next: { revalidate: 60 } });
const data = await res.json();
```

**If a package genuinely is necessary** (e.g. a rich text editor, a charting library, a payment SDK), that's fine — the rule isn't "zero dependencies," it's **"justify it before installing it."** Before running `npm install <package>`, state in one line why the built-in/native option doesn't cover the need.

---

## 3. Performance

Optimize deliberately. **Never optimize prematurely** — don't add caching, memoization, or micro-optimizations before there's an actual reason to.

**Prefer, in order of impact:**

1. Server rendering over client rendering wherever possible (see `03-nextjs-architecture.md`).
2. Correct caching and revalidation (`fetch`'s `next: { revalidate }`, route segment config) over manual cache logic.
3. `next/image` for every image — never a raw `<img>` tag unless there's a specific documented reason.
4. Lazy loading (`next/dynamic`) for heavy, client-only widgets that aren't needed on initial paint.
5. Code splitting — keep route-level bundles lean; don't import a whole library when only one function is needed.
6. Optimized imports — import only what you use (`import { debounce } from "lodash-es"`, not the whole library) when a library import is genuinely justified.

**Memoization rule:**

- **If React Compiler is enabled** (`reactCompiler: true` in `next.config.ts`): **never** manually add `useMemo`, `useCallback`, or `React.memo`. The compiler handles this automatically — manual memoization is redundant code that adds noise.
- **If React Compiler is not enabled:** only memoize when there's a measured, stated reason (e.g. a profiled re-render bottleneck on an expensive computation or a large list) — not by default, not "just in case."

```tsx
// Bad — memoizing without a measured reason, adds noise
const total = useMemo(() => price * quantity, [price, quantity]);

// Good — this is cheap; no memoization needed at all
const total = price * quantity;
```

---

## 4. Style That Follows From These Principles

- Prefer early returns over deep nesting (avoids unnecessary complexity — KISS).
- Keep functions short — one clear purpose (SRP).
- Avoid unnecessary intermediate variables that don't add clarity.
- Avoid unnecessary wrapper elements/components (YAGNI — don't add structure you don't need yet).

---

## 5. Decision Checklist Before Writing Any Code

Ask, in order:

1. Can this stay server-side?
2. Can I reuse existing code, or remove code instead of adding it?
3. Is there already a utility, service, or type for this? (Check `utils/`, `lib/`, `types/` first.)
4. Does this need a new dependency — or does Next.js/React/the browser already provide it?
5. Is this the simplest implementation that actually works?
6. Is it fully typed?
7. Does it follow SRP — does this function/component do exactly one thing?

If any answer points to unnecessary complexity or an avoidable dependency, simplify before writing a single line.
