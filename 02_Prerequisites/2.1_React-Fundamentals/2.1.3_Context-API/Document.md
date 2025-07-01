## React Context API

The Context API allows you to **share state globally** across the component tree without prop drilling.

---

### Problem: Prop Drilling

**Definition**: Prop drilling means passing data (props) from a parent component to deeply nested children—even when intermediate components don’t need the data.

**Why it's a problem**:
- Makes the codebase messy.
- Hard to maintain in large apps.
- Breaks separation of concerns.

**Example**:
```tsx
<Parent count={count} setCount={setCount}>
  <Child count={count} setCount={setCount}>
    <GrandChild count={count} setCount={setCount} />
  </Child>
</Parent>
```

Here, `Child` is just a middleman—it doesn’t even use `count` or `setCount`.

---

✅ **Solution: Context API**

React introduced the **Context API** in 2018 to fix this. It allows **global state sharing** without manual prop passing.

---

### ⚙️ How Context API Works

#### 1. `createContext()`

```js
const MyContext = createContext(defaultValue);
```

#### 2. `<MyContext.Provider>`

Wrap your component tree:

```tsx
<MyContext.Provider value={{ count, setCount }}>
  <App />
</MyContext.Provider>
```

#### 3. `useContext()`

Consume the context:

```js
const { count, setCount } = useContext(MyContext);
```

---

### 🛠️ Setup Example

#### ✅ Create Context

```js
// counterContext.js
import { createContext, useState } from 'react';

const CounterContext = createContext({
  count: 0,
  setCount: () => {},
});

const CounterProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  return (
    <CounterContext.Provider value={{ count, setCount }}>
      {children}
    </CounterContext.Provider>
  );
};

export { CounterContext, CounterProvider };
```

#### ✅ Wrap in Layout

```tsx
import { CounterProvider } from '@/context/counterContext';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <CounterProvider>{children}</CounterProvider>
      </body>
    </html>
  );
}
```

#### ✅ Use in Grandchild

```tsx
import { useContext } from 'react';
import { CounterContext } from '@/context/counterContext';

const GrandChild = () => {
  const { count, setCount } = useContext(CounterContext);
  return (
    <>
      <h3>Count: {count}</h3>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </>
  );
};
```

---

### 🌍 Common Use Cases

- Global state (cart, app settings)
- Auth management
- Theme switching (dark/light)
- Modals, localization, progress steps

---

### ⚖️ Context vs. Other Tools

| Tool         | Best For             | Notes                      |
|--------------|----------------------|-----------------------------|
| Context API  | Global/shared state  | Native, simple              |
| Redux        | Large apps           | Powerful, but boilerplate  |
| Redux Toolkit| Redux simplified     | Recommended over raw Redux |
| Zustand      | Small/med apps       | Lightweight + fast         |
| MobX         | Reactive state       | Easy, but less common now  |

---

### 🧑‍🏫 Best Practices

- **Default Values** in `createContext()`
- **Split Contexts** by concern (Auth, Theme, etc.)
- Use **`useMemo`** to avoid re-renders:
  ```js
  const value = useMemo(() => ({ user, setUser }), [user]);
  ```
- Avoid putting **frequently changing data** in context
- Create **custom hooks**:
  ```js
  const useUser = () => useContext(UserContext);
  ```

---

### ✅ Summary

- Avoids prop drilling
- Share state across components
- Simple API: `createContext`, `Provider`, `useContext`
- Best for: Auth, Theme, UI States, Global Data

---

### 🔗 Resource

📖 [Read Full Article on freeCodeCamp](https://www.freecodecamp.org/news/react-context-api-explained-with-examples/)
