# Hooks?

Hooks allow us to "hook" into React features such as state and lifecycle methods.

There are 3 rules for hooks:

- Hooks can only be called inside React function components.  
- Hooks can only be called at the top level of a component.  
- Hooks cannot be conditional.  


## 🔹 useState

### 🧩 Problem  
Function components had no way to store state.

### ✅ Solution  
Adds local state to function components.

### 📌 Initialization Syntax  
```js
const [state, setState] = useState(initialValue);
```

- `state`: current value.
- `setState`: function to update it.

### 🧪 Examples  
```js
const [count, setCount] = useState(0);
setCount(count + 1); // updates state
```

---

## 🔹 useEffect

### 🧩 Problem  
Function components couldn't run side effects (e.g., fetch, subscriptions).

### ✅ Solution  
Runs side effects after rendering.

### 📌 Initialization Syntax  
```js
useEffect(() => {
  // side effect
  return () => {
    // cleanup (optional)
  };
}, [dependencies]);
```

### 🧪 Examples  

1. No dependency (runs on every render):
```js
useEffect(() => {
  // Runs after every render
});
```

2. Empty array (runs once on mount):
```js
useEffect(() => {
  // Runs once on first render
}, []);
```

3. With dependencies (runs on changes):
```js
useEffect(() => {
  // Runs on first render and when 'value' changes
}, [value]);
```

---

## 🔹 useContext

### 🧩 Problem  
Prop drilling was tedious for deeply nested components.

### ✅ Solution  
Access context value directly inside components.

### 📌 Initialization Syntax  
```js
const value = useContext(MyContext);
```

### 🧪 Example  
```js
const theme = useContext(ThemeContext);
```

---

## 🔹 useReducer

`useReducer lets you store and update all related state values in one central place — through a single reducer function.`

### 🧩 Problem  
Managing complex or multiple related states with `useState` was messy.

### ✅ Solution  
Provides reducer-based state handling like Redux.

### 📌 Initialization Syntax  
```js
const [state, dispatch] = useReducer(reducerFn, initialState);
```


### 🔁 Without `useReducer` (using multiple `useState`):
```js
const [count, setCount] = useState(0);
const [name, setName] = useState('');
const [isActive, setIsActive] = useState(false);
```

---

### ✅ With `useReducer` (centralized state):

```const [state, dispatch] = useReducer(reducer, { count: 0 });
dispatch({ type: 'increment' });
```

---

## 🔹 useRef

`useRef is used when we need to store a value (like counter, timer, DOM reference) that should persist across renders but should not trigger a re-render when it changes.`
### 🧩 Problem  
Needed to persist values without causing re-renders.

### ✅ Solution  
Stores mutable values or element references.

### 📌 Initialization Syntax  
```js
const ref = useRef(initialValue);
```

### 🧪 Examples  
```js
const countRef = useRef(0);
countRef.current++; // persists across renders

const inputRef = useRef(null);
<input ref={inputRef} />;
```

---

## 🔹 useMemo

`It is used to cache (memoize) the result of a computation — like filtering, mapping, or sorting — to avoid redoing it on every render.`

### 🧩 Problem  
Expensive calculations re-ran on every render.

### ✅ Solution  
Memoizes a value until dependencies change.

### 📌 Initialization Syntax  
```js
const memoizedValue = useMemo(() => computeFn(), [dependencies]);
```

### 🧪 Example  
```js
const expensive = useMemo(() => heavyCalc(data), [data]);
```

---

## 🔹 useCallback

### 🧩 Problem  
Functions were recreated on every render, causing re-renders in children.

### ✅ Solution  
Memoizes a function.

### 📌 Initialization Syntax  
```js
const memoizedFn = useCallback(() => { ... }, [dependencies]);
```

### 🧪 Example  
```js
const handleClick = useCallback(() => {
  console.log('clicked');
}, []);
```
---

## ✅ Summary Table

| Hook | Solves |
|------|--------|
| `useState` | Add state to function components |
| `useEffect` | Handle side effects |
| `useContext` | Consume context directly |
| `useReducer` | Complex state management |
| `useRef` | Persistent values or element refs |
| `useMemo` | Avoid expensive recalculations |
| `useCallback` | Prevent unnecessary function re-creation |

---
