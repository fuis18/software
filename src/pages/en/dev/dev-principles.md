---
layout: ../../../layouts/Layout.astro
eyebrow: Dev
title: Dev Principles
subtitle: Fundamental software development principles
---

## Principles

| Principle | Main use |
| --------- | -------- |
| **KISS**  | Keep it simple |
| **YAGNI** | Don't anticipate features that aren't requested yet |
| **DRY**   | Don't repeat logic |

### KISS (Keep It Simple, Stupid)

The simplest solution that works is almost always the best. Unnecessary complexity leads to more bugs, harder maintenance, and more development time.

```tsx
// ❌ Complex
const isEmpty = arr => arr.length === 0 ? true : false;

// ✅ Simple
const isEmpty = arr => arr.length === 0;
```

### YAGNI (You Aren't Gonna Need No)

Don't implement features "just in case." Every feature added without being requested is code that must be maintained, tested, and can introduce bugs.

```tsx
// ❌ "Just in case" — nobody asked for PDF export
function generatePDF(data) { /* ... */ }

// ✅ Only what's needed now
function saveReport(data) { /* ... */ }
```

### DRY (Don't Repeat Yourself)

If the same logic appears in two places, extract it to a shared function or module. But be careful: don't confuse code duplication with concept duplication — sometimes two things look the same but evolve differently.

```tsx
// ❌ Duplicated logic
function getUserName(user) { return user.firstName + ' ' + user.lastName; }
function getFullUser(user) { return user.firstName + ' ' + user.lastName + ' (' + user.email + ')'; }

// ✅ Reuse
function getUserName(user) { return user.firstName + ' ' + user.lastName; }
function getFullUser(user) { return getUserName(user) + ' (' + user.email + ')'; }
```

> These principles apply cross-cutting: in frontend ([web-roadmap](../web-roadmap/)), backend ([back-roadmap](../back-roadmap/)), and any other development context.
