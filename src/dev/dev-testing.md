---
layout: base.njk
eyebrow: Dev
title: Dev Testing
subtitle: Testing, transversal a todo el stack
---

## Niveles

| Nivel           | Tool            | Uso                  |
| --------------- | --------------- | -------------------- |
| **Unit**        | Vitest / Jest   | Lógica, hooks, utils |
| **Integration** | Testing Library | Componentes y UI     |
| **E2E**         | Playwright      | Flujos de usuario    |
| **Automation**  | Stagehand       | Browser automation   |

### Prioridad de selectores

Vale tanto para Testing Library como para Playwright, en orden de preferencia:

1. **Roles (ARIA)** — lo más estable.
2. **Texto / labels / placeholders**.
3. **data-testid** — cuando no queda otra.
4. **Selectores CSS** — último recurso, se rompen fácil.
