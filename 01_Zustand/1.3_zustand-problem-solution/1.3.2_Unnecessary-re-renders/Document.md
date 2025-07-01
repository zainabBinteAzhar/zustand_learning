# Un-necessary Re-renders

In React, a **re-render** occurs when a component's state or props change.  
An **unnecessary re-render** happens when:

- A component re-renders even though the data it uses hasn’t changed
- It re-renders because a parent did, even if its own output remains the same

These extra renders slow down performance and are often avoidable.

---

### ❗ Common Causes of Unnecessary Re-renders

1. **Using React Context carelessly**  
   All components consuming a context re-render whenever the provider's value changes, even if they don't use the changed part.

2. **Prop Drilling**  
   Passing props through multiple layers means any change in the parent triggers re-renders in all children.

3. **New Object/Array References**  
   React compares by reference, not value. `{} !== {}` and `[] !== []`, so even "same" data causes re-renders.

4. **Lack of Memoization**  
   Without `React.memo`, `useMemo`, or `useCallback`, React re-renders components and functions even if logic hasn't changed.

---

### ✅ How Zustand Avoids Unnecessary Re-renders

Zustand is optimized to avoid these issues:

- **Per-slice subscriptions**  
  Components subscribe to only the specific part of state they need. They won’t re-render unless that part changes.

- **No dependency on React Context**  
  Zustand doesn't use Context by default, so global state changes don’t trigger app-wide re-renders.

- **Efficient state updates**  
  Zustand updates state immutably and only when necessary, preventing React from re-rendering unchanged components.

---

### Example

**With Context (bad):**
```jsx
const count = useContext(MyContext); 
// This will re-render on every context change, even unrelated ones
```

**With Zustand (good):**
```js
const count = useStore(state => state.count); 
// Re-renders only when `count` changes, not the whole store
```

---
