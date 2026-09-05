---
layout: ../../../layouts/Layout.astro
eyebrow: Dev
title: Front Libs
subtitle: Supporting libraries for building the interface
---

## Supporting Libraries

| Category         | Library            | Use                                                                  |
| ---------------- | ------------------ | -------------------------------------------------------------------- |
| Global state     | **Zustand**        | Simple global state, without the Context/useReducer boilerplate      |
| Data fetching    | **Tanstack Query** | Caching, invalidation, refetch, and async server data state          |
| Tables           | **Tanstack Table** | Headless tables: sorting, filtering, and pagination                  |
| Virtual lists    | **Tanstack Virtual** | Efficient rendering of very long lists and grids                  |
| Forms            | **RHF**            | Form handling, validation, and field state                           |
| Forms            | **TanStack Form**  | Form handling, validation, and field state                           |
| Drag & drop      | **DnDKit**         | Accessible drag & drop interactions                                  |
| Charts           | **Recharts**       | Data visualization and charts                                        |
| Actions history  | **travels**        | Undo/redo functionality                                              |
| Office           | **libpdf**         | PDF CRUD: create, read, edit, and manipulate PDF files               |

### When to use Context vs. Zustand

- **Context** for global data that almost never changes (UI configuration, i18n).
- **Zustand** for dynamic state, when you want to avoid `useReducer` logic or simply want a cleaner development experience.

> You don't need to pick just one: it's common to use Context for the app theme and Zustand for heavy business logic.
