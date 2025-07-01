# Zombie Child Problem

**Problem:**  
In React, components that unmount (e.g. due to navigation or conditional rendering) and later remount may hold onto **stale closures** of state or actions. If they try to update state after being unmounted, it can lead to:

- Memory leaks
- Inconsistent state
- Unintended side effects (especially in async operations)

This issue is commonly referred to as the **"Zombie Child" problem**.

**Example Scenario:**
- A component starts a fetch and unmounts before the fetch completes.
- When the promise resolves, it calls `setState()` using old references.
- If using React state or Context, this may cause errors or update stale data.

**Zustand Solution:**  
Zustand avoids this problem by:
> Storing state in a persistent, centralized store **outside** React's lifecycle.  
> Returning the latest state and actions from the store at all times, regardless of component mounting/unmounting.  
> Ensuring that even if a component unmounts and remounts, it always reads from the up-to-date store.  

This makes Zustand **safe for async operations and concurrency**, even in cases where React components mount/unmount rapidly.

**Another Sceneio:**

- You open a ProductDetailModal.
- It triggers an API call to fetch product data.
- Before the data returns, the user closes the modal (i.e., the component unmounts).
- But the fetch still resolves and tries to update state in the unmounted component.

**⚠️ What goes wrong:**

> If the modal unmounts before setProduct is called, React throws a warning:    
> “Can't perform a React state update on an unmounted component.”    
> You’d need to manually cancel or guard the fetch, which adds boilerplate.  

---
