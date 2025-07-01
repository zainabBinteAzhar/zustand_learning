# ReactJS Functional Components

In **ReactJS**, functional components are a **core part** of building user interfaces. They are simple, lightweight, and powerful tools for rendering UI and handling logic.

---

## What Are React Functional Components?

React Functional Components are **JavaScript functions** that return **JSX**. JSX is a syntax extension that looks like HTML but compiles to JavaScript.

### Example:
```jsx
const MyComp = (props) => {
  return <div>Hello, {props.name}!</div>;
};
```

---

## Key Concepts

### ✅ 1. Definition
- Just **functions**.
- Take **props** (inputs).
- Return **JSX**.

### ✅ 2. Before Hooks (Stateless)
Functional components could not manage state or lifecycle methods. They were only used for **presentational UI**.

### ✅ 3. With Hooks (Stateful)
React Hooks (`useState`, `useEffect`, etc.) allow functional components to:
- Manage state
- Handle side effects
- Replace most class components

---

## Example Using `useState`

```jsx
import React, { useState } from 'react';

function App() {
  const [message, setMessage] = useState("Hello World!");

  const changeMessage = () => {
    setMessage("Welcome to React!");
  };

  return (
    <div>
      <h1>{message}</h1>
      <button onClick={changeMessage}>Click Me!</button>
    </div>
  );
}
```

---

## How Functional Components Work

| Step              | What Happens                                                                 |
|-------------------|------------------------------------------------------------------------------|
| **Receive Props** | Data passed from parent                                                      |
| **Return JSX**    | UI template rendered by the component                                        |
| **Virtual DOM**   | React creates a virtual DOM for diffing and efficient updates                |
| **Re-rendering**  | Triggered when props or state change                                         |

---

## Why Use Functional Components?

### ✅ Advantages
- Simpler syntax
- Faster performance
- Easier to read/test
- Supports Hooks

### ❌ Disadvantages
- Hooks can be confusing for beginners
- Complex state logic may require extra abstraction

---

## Passing Props

Props are used to pass data from a parent component to a child.

### Example:
```jsx
function Greeting({ message }) {
  return <h1>{message}</h1>;
}

function App() {
  return <Greeting message="Hello World!" />;
}
```

---

## 🆚 Functional vs Class Components

| Feature              | Functional Components                   | Class Components                         |
|----------------------|------------------------------------------|------------------------------------------|
| Syntax               | JS Function + Hooks                      | ES6 Class with `extends React.Component` |
| State Management     | `useState`, `useReducer`                 | `this.state`, `this.setState`            |
| Lifecycle Methods    | `useEffect`, `useLayoutEffect`           | `componentDidMount`, etc.                |
| Performance          | Slightly faster                          | Slightly slower                          |
| `this` Keyword       | ❌ Not needed                             | ✅ Required                               |

---

## When to Use Functional Components

Use functional components:
- By default for all modern React apps
- When you want simpler, more reusable components
- With hooks for state/effect logic

---