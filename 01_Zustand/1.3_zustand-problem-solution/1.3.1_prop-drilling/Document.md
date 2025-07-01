# Prop-Drilling

Alternative Names: Componenet-chaining, threading props

`Passing the data from parent to the deep nested child using the prop. That data will get passed through all intermediary childs even though they don't need it`

![Prop-Drilling](/00-Assets/prop-drilling.png)

### Issue:

Instead of passing data directly to the component that needs it, the data gets passed through intermediary components until it reaches the desired component. This causes several issues, including:

- **Complexity and Boilerplate Code**: In a large component tree, this can lead to more complex and boilerplate-heavy code. Managing the data flow also becomes more difficult.
- **Coupled Components**: Since the data flows through intermediary components, changes in one component can affect others. This reduces maintainability and flexibility.
- **Performance Overhead**: Passing data through components that don't even need it can lead to unnecessary renders and decreased performance.

### Solutions:

There are alot of solutions including
> contextAPI, third-party libraries.  
> Higher Order Components: Functions that takes a component and return ana enhanced components.  
> Render prop: A function prop that return a JSX e.g: define a function with prop and wrapp it around any component u need to use that prop in.

✅ Zustand solves this by providing a global store that any component can access directly—without needing to pass props manually.

#### Key Benefits

> 🔹 **Global State Access**  
> Any component can access or update state directly via a custom hook (e.g., `useBookStore`), no matter where it sits in the tree.

> 🔹 **No Context Provider Needed**  
> Zustand doesn't rely on React Context, so you don’t need to wrap components in a provider or lift state up.

> 🔹 **Clean and Decoupled Components**  
> Since components get only the state they care about, they stay independent and easy to manage.



###### Without Zustand:

```jsx
<Parent data={data}>
  <Child data={data}>
    <GrandChild data={data}>
      <TargetComponent data={data} />
    </GrandChild>
  </Child>
</Parent>
```

##### With Zustand:

```jsx
const data = useStore(state => state.data); // Direct access from anywhere
```
