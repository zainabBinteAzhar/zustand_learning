# What is React Concurrency?

React **Concurrency** (enabled through features like `startTransition`, `Suspense`, `useDeferredValue`, etc.) allows React to:

- Interrupt rendering
- Prioritize urgent updates (like clicks)
- Delay non-urgent UI updates
- Improve responsiveness

This means React can pause, restart, or throw away work-in-progress renders.

---

### ⚠️ Problem: Concurrency Can Break Stateful Logic

When using traditional React state or Context API, concurrency can lead to:

| Issue                             | Description |
|----------------------------------|-------------|
| **Stale state snapshots**        | A component may read an outdated state during a transition. |
| **Race conditions**              | Fast async updates may clash with delayed UI renders. |
| **Unpredictable re-renders**     | Some components re-render when they shouldn’t—or don’t when they should. |
| **Loss of context**              | Context value might not propagate consistently during concurrent renders. |

These issues are hard to debug and can lead to flickering, broken UI, or incorrect state.

---

### ✅ Zustand Solution: External Store Pattern

Zustand is designed to **work safely with React concurrency** because:

- **It stores state outside React**: React doesn't control or schedule Zustand updates, so the state is always consistent and up-to-date.
- **Selective subscriptions**: Components only re-render when the specific slice of state they subscribe to changes.
- **Concurrent-safe updates**: Zustand doesn’t rely on closures from a specific render cycle. It always reads the **latest value** from the store.
- **Avoids context re-evaluation**: Since no `Context.Provider` is involved, concurrency doesn’t cause propagation issues.

---

### 💡 Example Using `startTransition`

```tsx
import { useState, startTransition } from 'react'
import { useUserStore } from './userStore'

function UserUpdater() {
  const setUser = useUserStore((state) => state.setUser)
  const [input, setInput] = useState('')

  const handleUpdate = () => {
    startTransition(() => {
      setUser({ name: input }) // ✅ Always uses the latest value from outside React
    })
  }

  return (
    <>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleUpdate}>Update User</button>
    </>
  )
}
```