# 🧠 Think of it like this

### 🔹 `useMemo`

**Caches the return value of a function.**

```js
const filteredList = useMemo(() => {
  return items.filter(item => item.active);
}, [items]);
```

✅ This only re-runs `filter()` when `items` changes.  
❌ Without `useMemo`, `filter()` runs **every render**, even if nothing changed.

> 🗣️ It’s like saying:  
> “Don’t redo this work unless you really have to.”

---

### 🔹 `useCallback`

**Caches the function itself, so React doesn’t create a new one every render.**

Now here’s where your question comes in:

> ❓ “But how is caching a function helpful?”

---

### 📦 Why cache a function with `useCallback`?

Because in React:

```js
const myFn = () => {
  console.log("hello");
};
```

- Every time the component renders, `myFn` is **new**, even if it does the same thing.

⚠️ That causes problems if:
- You pass `myFn` as a prop to a child component
- That child uses `React.memo` to avoid re-rendering

💥 React will re-render the child anyway — because `myFn !== myFn` (different reference)

---

### ✅ `useCallback` fixes that:

```js
const myFn = useCallback(() => {
  console.log("hello");
}, []);
```

- Now `myFn` will be the **same function reference** unless dependencies change.
- So child components **don’t re-render unnecessarily**.`

---

> 🔷 useMemo is like caching the output of a function (e.g. filtering data).  
> 🔷 useCallback is like caching the function itself, so it's not redefined every time. 