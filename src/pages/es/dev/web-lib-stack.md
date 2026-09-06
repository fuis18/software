---
layout: ../../../layouts/Layout.astro
eyebrow: Dev
title: Front Libs
subtitle: Librerías de apoyo para construir la interfaz
---

## Librerías de apoyo

| Categoría        | Librería             | Uso                                                               |
| ---------------- | -------------------- | ----------------------------------------------------------------- |
| Estado global    | **Zustand**          | Estado global simple, sin el boilerplate de Context/useReducer    |
| Estado global    | **Redux Toolkit**    | Estado global con slices, thunks y devtools, estándar en apps grandes |
| Data fetching    | **Tanstack Query**   | Cache, invalidación, refetch y estado async de datos del servidor |
| Tablas           | **Tanstack Table**   | Tablas headless: ordenamiento, filtrado y paginación              |
| Listas virtuales | **Tanstack Virtual** | Renderizado eficiente de listas y grillas muy largas              |
| Formularios      | **RHF**              | Manejo de formularios, validación y estado de campos              |
| Formularios      | **TanStack Form**    | Manejo de formularios, validación y estado de campos              |
| Drag & drop      | **DnDKit**           | Interacciones de drag & drop accesibles                           |
| Gráficos         | **Recharts**         | Visualización de datos y gráficos                                 |
| actions history  | **travels**          | Funcionalidad de hacer & deshacer (undo/redo)                     |
| Office           | **libpdf**           | CRUD de PDF: crear, leer, editar y manipular archivos PDF         |

### Cuándo usar Context vs. Zustand

- **Context** para datos globales que casi nunca cambian (configuración de la interfaz, i18n).
- **Zustand** para estado dinámico, cuando se quiere evitar la lógica de `useReducer` o simplemente una experiencia de desarrollo más limpia.

> No hace falta elegir uno solo: es común usar Context para el tema de la app y Zustand para la lógica de negocio pesada.
