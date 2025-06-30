# What is Zustand


Zustand is a simple, and clean react state-management library.
- external library.
- re-renders only when state changes.

State: any data/information of component.  
State management: that data/flow needs to be managed across the components when the application grows.

---

## State Management Ways

#### 1: React/React-Native Hooks:  
useState, useEffect, useContext, useRef, useMemo, useCallback, useReducer, useLayoutEffect, useImperativeHandle, useDebugValue, useId, useTransition, useDeferredValue.

#### 2: In-Direct State Managers:
React-query and React-router : not primarily for state management but can handle state when used with hooks.

#### 3: Direct State Managers:
Third-party libraries: Redux, Zustand etc...

---

## Key Concepts

- Zustand store is a hook:
A Zustand store is created using a custom hook (e.g., useBookStore). This hook allows React components to read and update shared state.

> *Since Zustand stores are hooks, you can use them anywhere—no context provider needed (unlike Redux). Just select the state slice with a selector, and your component re-renders only when that slice changes.*

- Create is used to build the store:
The create function from Zustand sets up the state, initial values, and the functions (actions) that modify the state.

- Single source of truth:
The store holds all shared data. Every component that uses the store accesses the same data and updates it consistently.

- SET and GET functions:
set is used to update the state inside the store.
get is used to read the current state (often used inside actions for logic).

## Working

![Zustand Working](/00-Assets/working.png)

Zustand manages state simply:  
- when the UI triggers a change, it's sent to the store, which updates the state directly.
- The UI then re-renders with the new state.  

There are no action creators, reducers, or dispatchers—just direct updates and subscriptions to keep everything in sync.

*Since Zustand stores are hooks, you can use them anywhere—no context provider needed (unlike Redux). Just select the state slice with a selector, and your component re-renders only when that slice changes.*