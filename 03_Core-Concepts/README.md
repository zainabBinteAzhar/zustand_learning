# Zustand Overview

Zustand is a lightweight, scalable state-management library for React and React Native. It provides a minimal API and encourages a simple, centralized architecture using stores.

---

## 🧠 General Workflow Diagram

```
       ┌─────────────────────────────┐
       │     Create a Store          │
       │  (State + Actions using     │
       │   create((set) => {...}))   │
       └────────────┬────────────────┘
                    │
                    ▼
       ┌─────────────────────────────┐
       │    Use Selectors to         │
       │   Subscribe to State        │
       │  (e.g. useStore(s => s.x))  │
       └────────────┬────────────────┘
                    │
                    ▼
       ┌─────────────────────────────┐
       │    Update State via         │
       │     Store Actions           │
       │   (e.g. set(...) inside fn) │
       └────────────┬────────────────┘
                    │
                    ▼
       ┌─────────────────────────────┐
       │  Components Re-render only  │
       │  if Subscribed State Changes│
       └────────────┬────────────────┘
                    │
                    ▼
       ┌─────────────────────────────┐
       │  (Optional) Persist Store   │
       │  or Add Middleware          │
       └─────────────────────────────┘
```

---

## 🔄 State Update Flow (Request to Render)

```
[1] User Interacts (e.g., clicks "Add to Cart")
          │
          ▼
[2] Component calls an Action from the Store
    e.g., useCartStore.getState().addItem(product)
          │
          ▼
[3] Action uses Zustand's `set()` to update state
    (state mutation logic lives in the store)
          │
          ▼
[4] Zustand detects which parts of the state changed
          │
          ▼
[5] Components subscribed via selectors re-render
    (only if their selected state actually changed)
          │
          ▼
[6] UI updates with new state (e.g., cart count increases)
```

---

## ✅ Summary

- Zustand uses a central **store** to define both **state and actions**.
- Components **subscribe** to specific state values using **selectors**.
- State is **mutated via actions**, internally using the `set` function.
- Only subscribed components **re-render** on state change.
- Zustand supports **middleware** like persistence and devtools for enhanced functionality.

---

## 🔗 Related Topics

Each topic below has its own dedicated file:

- [`creating-store.md`](./3.1_Creating-store/Document.md)
- [`selectors.md`](./selectors.md)
- [`actions.md`](./actions.md)
- [`render-optimization.md`](./render-optimization.md)
- [`lifecycle.md`](./lifecycle.md)

