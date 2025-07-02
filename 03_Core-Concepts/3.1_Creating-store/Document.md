# Creating a Store in Zustand

Zustand stores are created using the `create` function from the `zustand` package. The store holds both **state** and **actions** (functions to update the state).

---

## 🔹 Basic Store (Default)

```ts
import { create } from 'zustand';

type BearState = {
  bears: number;
  increase: () => void;
};

const useBearStore = create<BearState>((set) => ({
  bears: 0,
  increase: () => set((state) => ({ bears: state.bears + 1 })),
}));
```

> ✅ **Use when you don’t need middleware or persistence.**  
> ✅ **Simplest and most common form.**

---

## 🔹 Store with Middleware (e.g., persist, devtools)

```ts
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

type BearState = {
  bears: number;
  increase: () => void;
};

const useBearStore = create<BearState>()(
  devtools(
    persist(
      (set) => ({
        bears: 0,
        increase: () => set((state) => ({ bears: state.bears + 1 })),
      }),
      { name: 'bear-storage' }
    )
  )
);
```

> ✅ **Use this pattern when you need middleware.**  
> ⚠️ **More verbose. Required when chaining `persist`, `devtools`, etc.**

---

## 🔹 Store with Immer (immutable updates)

```ts
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type BearState = {
  bears: number;
  increase: () => void;
};

const useBearStore = create<BearState>()(
  immer((set) => ({
    bears: 0,
    increase: () =>
      set((state) => {
        state.bears += 1;
      }),
  }))
);
```

> ✅ **Use when you want to write mutable logic with immutability.**  
> ⚠️ Slight overhead due to Immer usage.

---

## 🔹 Store Without TypeScript (JS only)

```js
import { create } from 'zustand';

const useBearStore = create((set) => ({
  bears: 0,
  increase: () => set((state) => ({ bears: state.bears + 1 })),
}));
```

> ✅ Use in plain JS projects.  
> ❌ No type safety.

---

## 🔁 Summary of Store Creation Methods

| Method                        | Use Case                        | Key Point                                  |
|------------------------------|----------------------------------|--------------------------------------------|
| `create((set) => {...})`     | Default, simple stores           | Most common, no middleware                 |
| `create()(...middleware)`    | Persistence, devtools, immer     | Needed when using middleware               |
| `immer` middleware           | Mutable logic with safety        | Write logic with direct mutation syntax    |
| Plain JS (no types)          | Quick setup in JS                | No TypeScript support                      |

---

## ✅ What You Always Need

- Import `create` from `zustand`
- Call `create()` with a function that receives `set`
- Define initial state and actions
- Export and use the hook (e.g., `useBearStore`)

```ts
const useStore = create((set) => ({
  state,
  actions
}));
```

