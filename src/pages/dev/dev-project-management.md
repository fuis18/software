---
layout: ../../layouts/Layout.astro
eyebrow: Dev
title: Dev Project Management
subtitle: Herramientas de gestión de proyectos de software
---

El desarrollo de software es también coordinación: quién hace qué, en qué orden y cuándo está listo. Las herramientas de gestión de proyectos organizan el trabajo en tareas, sprints y seguimiento, sin importar la metodología que el equipo use (Scrum, Kanban, o algo propio).

## Plataformas

| Plataforma | Perfil                            | Destaca en                                                 |
| ---------- | --------------------------------- | ---------------------------------------------------------- |
| **Asana**  | Gestión de proyectos flexible     | Tareas, timelines, flujos personalizados, equipos grandes |
| **Jira**   | El estándar de los equipos dev    | Issues, sprints Scrum/Kanban, integración con desarrollo  |
| **Monday** | Work management visual            | Paneles visuales, no-code, adaptación a cualquier equipo  |

- **Asana** — pensada para organizar el trabajo por proyectos y objetivos: listas, tableros, líneas de tiempo y automatizaciones. Muy flexible para distintos tipos de equipo, no solo software.
- **Jira** — la herramienta de referencia en desarrollo: _issues_ con estados, tableros de sprint, backlog y reportes, integrada al flujo de CI/CD y a los repos (cada PR puede referenciar un ticket). Es la más pesada de configurar y la más potente cuando el equipo ya trabaja con metodología ágil. En el flujo de operaciones aparece como el integrador natural de las alertas de [ops-incident](../../ops/ops-incident/).
- **Monday** — trabajo en tableros visuales muy accesibles, con automatizaciones y vistas sin escribir código. Rápida de adoptar para equipos no-técnicos que conviven con el equipo de desarrollo.

## Cómo elegir

- **Jira** cuando el equipo vive en tickets y sprints y necesita el vínculo directo con el código (PRs, commits, releases).
- **Asana** cuando se quiere organizar proyectos y objetivos con más flexibilidad que un tablero ágil puro.
- **Monday** cuando la prioridad es una herramienta visual simple que cualquiera en la organización pueda usar.

> La herramienta no define la metodología: primero se define cómo se quiere trabajar (sprints, kanban, flujo continuo) y después se elige la plataforma que mejor lo soporte.