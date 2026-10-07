<!-- MODE: always-on -->

# 02 — TypeScript & Coding Style

Applies continuously, on every line of code you write or edit. Mandatory unless I explicitly say otherwise in a task.

---

## 1. Type Safety — Absolute, No Exceptions

**Never use:**

| Forbidden                                         | Why                             | Instead                                                          |
| ------------------------------------------------- | ------------------------------- | ---------------------------------------------------------------- |
| `any`                                             | Kills type safety silently      | Define a proper `interface`/`type`, or use `unknown` + narrowing |
| `@ts-ignore` / `@ts-nocheck`                      | Hides real errors               | Fix the underlying type error                                    |
| `as unknown as X`                                 | Forces a false type             | Fix the source type, or write a proper type guard                |
| Non-null assertion `!` to silence the compiler    | Hides potential runtime crashes | Narrow with an `if`, or handle the `undefined` case explicitly   |
| Weakening `tsconfig.json` (`strict: false`, etc.) | Masks errors project-wide       | Fix the code, not the config                                     |

If you're tempted to use any of the above to make code compile faster, that's the signal the type itself is wrong — fix the type.

---

## 2. Creating & Placing Types

- If a type doesn't exist, create it — don't inline a loose shape.
- Shared/domain types → `src/types/<domain>.ts`, re-exported from `src/types/index.ts`.
- Colocate a type in its own component/module **only** when exactly one module uses it and it will never be reused.
- Never redeclare an existing type — search `src/types/` first.

```ts
// src/types/product.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  category: ProductCategory;
}

export type ProductCategory = "electronics" | "clothing" | "home";
```

```ts
// src/types/index.ts
export * from "./product";
export * from "./user";
export * from "./common";
```

---

## 3. `interface` vs `type`

- **`interface`** — for object shapes (props, API response shapes, DB models). Prefer this by default for anything that could be extended.
- **`type`** — for unions, intersections, mapped types, and utility-type compositions.
- **String literal unions over `enum`** — enums add runtime overhead and awkward interop; a union is simpler and tree-shakes cleanly.

```ts
// Prefer
type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled";

// Avoid
enum OrderStatus {
  Pending,
  Shipped,
  Delivered,
  Cancelled,
}
```

- **Generics** — only when they genuinely improve type safety or remove real duplication. Don't add a generic parameter "for future flexibility" that isn't needed yet.

---

## 4. Type Every Boundary

Every place data crosses a boundary must be explicitly typed — never inferred as `any` implicitly:

- Component props
- Route handler request bodies and responses
- Server Action parameters and return values
- External API responses (fetch results, third-party SDKs)
- Form input values before validation

```ts
interface ProductCardProps {
  product: Product;
  onSelect?: (id: string) => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  // ...
}
```

---

## 5. Comment Format

Only write comments when they add real value. **Never comment obvious code** (`// increment i` above `i++`).

Use this **exact** format for section markers — nothing else, no other style, no JSDoc unless a shared public utility genuinely needs it:

```ts
// <======< Authentication >======>
// <======< Validation >======>
// <======< Cache >======>
// <======< Database >======>
// <======< GET /api/users - Fetch all users >======>
```

A comment should explain **why**, not **what** — the code already says what it does.

```ts
// Bad — states the obvious
// loop through users
for (const user of users) { ... }

// Good — explains non-obvious reasoning
// Skip soft-deleted users; they're kept for audit history only
for (const user of users.filter(u => !u.deletedAt)) { ... }
```

---

## 6. Component Style

- Single responsibility — one component does one thing.
- Small and reusable — if a component's JSX exceeds ~150 lines or mixes multiple concerns, split it.
- No duplicated logic — extract a shared component or hook instead of copy-pasting JSX.
- Explicitly typed props — no untyped destructuring, no `props: any`.
- Prefer composition over deep nesting — pass `children` instead of building a 5-level-deep conditional tree.
- Avoid unnecessary wrapper elements/components — don't wrap a single child in a `<div>` just out of habit.

```tsx
// Bad — logic and markup mixed, untyped
export function ProductCard(props: any) {
  const [liked, setLiked] = useState(false);
  return <div>...</div>;
}

// Good — markup only, typed, state lives in logic.ts
interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { liked, toggleLike } = useProductCard(product.id); // from logic.ts
  return <div>...</div>;
}
```

---

## 7. General Style

- Prefer early returns over deep nesting.

```ts
// Bad
function getDiscount(user: User) {
  if (user.isActive) {
    if (user.isPremium) {
      return 0.2;
    } else {
      return 0.1;
    }
  } else {
    return 0;
  }
}

// Good
function getDiscount(user: User) {
  if (!user.isActive) return 0;
  if (user.isPremium) return 0.2;
  return 0.1;
}
```

- Keep functions short — one clear purpose each.
- Avoid unnecessary intermediate variables that don't add clarity.
- Keep formatting consistent with the surrounding file — don't introduce a different style mid-file.
- Import using the `@/*` alias — never deep relative chains (`../../../`).
