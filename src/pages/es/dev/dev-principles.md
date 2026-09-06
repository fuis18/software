---
layout: ../../../layouts/Layout.astro
eyebrow: Dev
title: Dev Principles
subtitle: Principios fundamentales del desarrollo de software
---

## Principios

| Principio | Uso principal |
| --------- | ------------- |
| **KISS**  | Mantenerlo simple |
| **YAGNI** | No anticipar features que aún no se piden |
| **DRY**   | No repetir lógica |

### KISS (Keep It Simple, Stupid)

La solución más simple que funcione es casi siempre la mejor. Complejidad innecesaria genera más bugs, más dificultad para mantener y más tiempo de desarrollo.

```tsx
// ❌ Complejo
const isEmpty = arr => arr.length === 0 ? true : false;

// ✅ Simple
const isEmpty = arr => arr.length === 0;
```

### YAGNI (You Aren't Gonna Need No)

No implementes funcionalidades "por si acaso". Cada feature que se agrega sin que se pida es código que hay que mantener, testear y que puede generar bugs.

```tsx
// ❌ "Por si acaso" — nadie pidió exportar a PDF
function generatePDF(data) { /* ... */ }

// ✅ Solo lo que se necesita ahora
function saveReport(data) { /* ... */ }
```

### DRY (Don't Repeat Yourself)

Si la misma lógica aparece en dos lugares, extraerla a una función o módulo compartido. Pero cuidado: no confundir duplicación de código con duplicación de conceptos — a veces dos cosas parecen iguales pero evolucionan distinto.

```tsx
// ❌ Lógica duplicada
function getUserName(user) { return user.firstName + ' ' + user.lastName; }
function getFullUser(user) { return user.firstName + ' ' + user.lastName + ' (' + user.email + ')'; }

// ✅ Reutilizar
function getUserName(user) { return user.firstName + ' ' + user.lastName; }
function getFullUser(user) { return getUserName(user) + ' (' + user.email + ')'; }
```

> Estos principios se aplican transversalmente: en frontend ([web-roadmap](../web-roadmap/)), backend ([back-roadmap](../back-roadmap/)) y cualquier otro contexto de desarrollo.
