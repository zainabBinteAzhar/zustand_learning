# Zustand Persist Middleware Guide

This document explains how to use Zustand's `persist` middleware like a professional developer. It covers concepts, setup, advanced use cases, and practical patterns to persist state across app reloads in web or React Native environments.

---

## 🔧 What is `persist`?

`persist` is a middleware that enables your Zustand store to **save state to persistent storage** (like `localStorage`, `AsyncStorage`, or custom storages) and **restore it automatically** on app reload.

---

## 🧩 Signature

```ts
persist<T, U>(
  stateCreator: StateCreator<T, [], []>,
  options?: PersistOptions<T, U>
): StateCreator<T, [['zustand/persist', U]], []>
```

- `T`: The shape of your store state
- `U`: Optional metadata (like `version`, etc.)
- Returns a wrapped `StateCreator` with persistence behavior

---

## 🧠 How It Works (Flow)

```
App starts ─▶ Zustand store is created ─▶ persist reads from storage ─▶ 
hydrated state is merged ─▶ state is live and reactive
```

---

## ✅ Basic Example

```ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((s) => ({ count: s.count + 1 })),
    }),
    {
      name: 'counter-storage', // key in storage
    }
  )
)
```

---

## ⚙️ Options Reference

| Option                 | Type                                 | Description                                                                                   |
|------------------------|--------------------------------------|-----------------------------------------------------------------------------------------------|
| `name`                | `string`                             | Required. Key used in storage (e.g., `localStorage['name']`)                                 |
| `storage`             | `Storage` or `createJSONStorage()`   | Optional. Where to persist the data. Defaults to `localStorage`. Use `AsyncStorage` in RN    |
| `partialize`          | `(state) => Partial<T>`              | Optional. Persist only part of the state                                                     |
| `version`             | `number`                             | Optional. Helps version your store for migrations                                            |
| `migrate`             | `(persistedState, version) => T`     | Optional. Migrate older persisted state to new format                                        |
| `merge`               | `(persistedState, currentState) => T`| Optional. Merge logic when rehydrating; defaults to shallow merge                            |
| `skipHydration`       | `boolean`                            | Optional. Skip auto-hydration on startup (manual call required)                             |
| `onRehydrateStorage`  | `() => void \| () => (state) => void`| Optional. Hook before/after hydration logic                                                   |

---

## 📦 React Native Setup (with AsyncStorage)

```ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
```

---

## 🧩 Partial Persistence

```ts
partialize: (state) => ({ token: state.token })
```

Use this when you only want to save part of the state (e.g., exclude UI flags, cache, etc.)

---

## 🔁 Versioning + Migration

```ts
version: 2,
migrate: (persistedState, version) => {
  if (version === 1) {
    return {
      ...persistedState,
      newField: 'defaultValue',
    }
  }
  return persistedState
}
```

Use `version` and `migrate` to evolve your persisted schema over time.

---

## 🔄 Custom Merge (e.g., deepMerge)

```ts
import createDeepMerge from '@fastify/deepmerge'

const deepMerge = createDeepMerge({ all: true })

merge: (persisted, current) => deepMerge(current, persisted)
```

---

## ✋ Manual Hydration (skipHydration)

```ts
skipHydration: true
```

In your component:

```ts
useEffect(() => {
  store.persist.rehydrate()
}, [])
```

Use this in SSR apps or when hydration needs to be deferred.

---

## 🔐 Custom Storage (Example: URL search params)

```ts
const searchParamStorage = {
  getItem: (key) => new URL(location.href).searchParams.get(key),
  setItem: (key, value) => {
    const params = new URLSearchParams(location.search)
    params.set(key, value)
    window.history.replaceState({}, '', `?${params}`)
  },
  removeItem: (key) => {
    const params = new URLSearchParams(location.search)
    params.delete(key)
    window.history.replaceState({}, '', `?${params}`)
  },
}

storage: createJSONStorage(() => searchParamStorage)
```

---

## 🧪 Full Example with Everything

```ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

const useStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
    }),
    {
      name: 'user-auth',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ token: state.token }), // only persist token
      version: 1,
      migrate: (state, version) => {
        if (version === 0) {
          return {
            ...state,
            token: state?.accessToken || null,
          }
        }
        return state
      },
      merge: (persisted, current) => ({
        ...current,
        ...persisted,
      }),
      onRehydrateStorage: () => {
        console.log('Rehydrating...')
        return (state) => console.log('Rehydrated state:', state)
      },
    }
  )
)
```

---

## 🧠 Pro Tips

- Use `partialize` to avoid persisting unnecessary fields like UI state or cache.
- Always set a unique `name` to avoid key clashes in localStorage/AsyncStorage.
- Use `skipHydration` in SSR or hydration-sensitive environments.
- Use `migrate` with `version` when evolving your store schema.
- For deeply nested state, prefer a `merge` function with `deepMerge`.

---

## 🔚 Conclusion

Zustand's `persist` middleware is a powerful tool for building offline-ready and reload-safe applications. Mastering its options and behavior will make your state management robust and production-grade.

---
