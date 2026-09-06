---
layout: ../../../layouts/Layout.astro
eyebrow: Dev
title: Front Hooks
subtitle: React hooks and common patterns
---

## React Hooks

| Hook          | Main use                                                                 |
| ------------- | ------------------------------------------------------------------------ |
| **useState**    | Manage local component state, trigger re-renders on change               |
| **useId**       | Generate unique IDs for forms (labels, inputs, aria attributes)          |
| **useRef**      | Store a persistent value between renders without causing re-renders      |
| **useContext**  | Read data from a Context Provider without props drilling                 |
| **useMemo**     | Memoize expensive calculation results to avoid recalculating on every render |
| **useCallback** | Memoize a function to avoid recreating it on every render               |

### useState

- Manages local state of a component
- Each `setState` call triggers a re-render

```tsx
const [count, setCount] = useState(0);
```

### useId

- Generates a unique ID per component instance
- Useful for linking `<label>` with `<input>` in forms
- Avoids ID collisions in apps with multiple instances of the same component

```tsx
const id = useId();
// <label htmlFor={id}>Email</label>
// <input id={id} type="email" />
```

### useRef

- Store a value that persists between renders
- Read and write that value at any time
- Without causing re-renders when it changes

```tsx
const inputRef = useRef<HTMLInputElement>(null);
// <input ref={inputRef} />
// inputRef.current.focus();
```

### Context (useContext)

- Provides global data to the entire app without passing props through every level
- Ideal for UI configuration, i18n, themes

```tsx
const theme = useContext(ThemeContext);
```

> Context for global data that almost never changes (configuration, i18n). For dynamic state, see [Zustand](../web-lib-stack/).

### useMemo

- Memoizes the result of an expensive calculation
- Only recalculates when dependencies change
- Useful for costly filtering, sorting, or transformations

```tsx
const sortedItems = useMemo(() => {
  return items.sort((a, b) => a.name.localeCompare(b.name));
}, [items]);
```

### useCallback

- Memoizes a function to avoid recreating it on every render
- Prevents unnecessary re-renders in children that receive the function as a prop
- Use when passing a function to a memoized component or as a useEffect dependency

```tsx
const handleSubmit = useCallback((data: FormData) => {
  sendToAPI(data);
}, []);
```

## Common Patterns

### Debounce

Generate search input after a set time has passed, avoiding a request on every keystroke.

```tsx
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
```

### Custom Hooks

Reusable functions that encapsulate logic with hooks. Use the `use` prefix so React validates correct usage.

```tsx
function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
```

### Lazy Loading

Load components only when needed, not in the initial bundle. Reduces the app's load time.

```tsx
const Dashboard = React.lazy(() => import('./Dashboard'));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Dashboard />
    </Suspense>
  );
}
```

### Code Splitting

Split the bundle into smaller chunks that load on demand. React.lazy and dynamic import are the standard way to do it.

```tsx
// Each route generates its own chunk
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
```

> Lazy Loading and Code Splitting work together: the split creates the chunks and the lazy decides when to load them.
