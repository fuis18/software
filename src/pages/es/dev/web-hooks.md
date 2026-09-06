---
layout: ../../../layouts/Layout.astro
eyebrow: Dev
title: Front Hooks
subtitle: Hooks de React y patrones comunes
---

## Hooks de React

| Hook            | Uso principal                                                              |
| --------------- | -------------------------------------------------------------------------- |
| **useState**    | Manejar estado local de un componente, trigger re-renders al cambiar       |
| **useId**       | Generar IDs únicos para formularios (labels, inputs, aria)                 |
| **useRef**      | Guardar un valor persistente entre renderizados sin provocar re-render     |
| **useContext**  | Leer datos de un Context Provider sin props drilling                       |
| **useMemo**     | Memorizar el resultado de un cálculo pesado para no recalcular en cada render |
| **useCallback** | Memorizar una función para evitar que se recree en cada render             |

### useState

- Maneja el estado local de un componente
- Cada llamada a `setState` provoca un re-render

```tsx
const [count, setCount] = useState(0);
```

### useId

- Genera un ID único por instancia de componente
- Útil para vincular `<label>` con `<input>` en formularios
- Evita colisiones de IDs en apps con múltiples instancias del mismo componente

```tsx
const id = useId();
// <label htmlFor={id}>Email</label>
// <input id={id} type="email" />
```

### useRef

- Guardar un valor que persiste entre renderizados
- Leer y escribir ese valor en cualquier momento
- Sin provocar re-renders cuando cambia

```tsx
const inputRef = useRef<HTMLInputElement>(null);
// <input ref={inputRef} />
// inputRef.current.focus();
```

### Context (useContext)

- Provee datos globales a toda la app sin pasar props por cada nivel
- Ideal para configuración de la interfaz, i18n, temas

```tsx
const theme = useContext(ThemeContext);
```

> Context para datos globales que casi nunca cambian (configuración, i18n). Para estado dinámico, ver [Zustand](../web-lib-stack/).

### useMemo

- Memoriza el resultado de un cálculo pesado
- Solo recalcula cuando cambian las dependencias
- Útil para filtrados, ordenamientos o transformaciones costosas

```tsx
const sortedItems = useMemo(() => {
  return items.sort((a, b) => a.name.localeCompare(b.name));
}, [items]);
```

### useCallback

- Memoriza una función para que no se recree en cada render
- Evita re-renders innecesarios en hijos que reciben la función como prop
- Usar cuando la función se pasa a un componente memoizado o como dependencia de useEffect

```tsx
const handleSubmit = useCallback((data: FormData) => {
  sendToAPI(data);
}, []);
```

## Patrones comunes

### Debounce

Generar la búsqueda siempre que pase un tiempo determinado, evitando hacer una petición por cada tecla.

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

Funciones reutilizables que encapsulan lógica con hooks. Prefijo `use` para que React valide el uso correcto.

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

Cargar componentes solo cuando se necesitan, no en el bundle inicial. Reduce el tiempo de carga de la app.

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

Dividir el bundle en chunks más pequeños que se cargan bajo demanda. React.lazy y dynamic import son la forma estándar de hacerlo.

```tsx
// Cada ruta genera su propio chunk
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
```

> Lazy Loading y Code Splitting trabajan juntos: el split crea los chunks y el lazy decide cuándo cargarlos.
