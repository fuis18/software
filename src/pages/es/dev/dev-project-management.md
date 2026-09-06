---
layout: ../../../layouts/Layout.astro
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

## Metodologías

| Metodología | Uso principal |
| ----------- | ------------- |
| **AGILE**   | Filosofía general: iteraciones cortas, feedback continuo, respuesta al cambio |
| **SCRUM**   | Framework ágil: sprints fijos (1-4 sem), roles (PO, SM, dev team), ceremonias |
| **Kanban**  | Flujo continuo: límite de WIP, tablero visual, sin sprints fijos |
| **XP**      | Prácticas técnicas: TDD, pair programming, continuous integration, refactoring |
| **Lean**    | Eliminar desperdicio: optimizar flujo de valor, reducir inventario |
| **SAFe**    | Escalar ágil a grandes organizaciones: múltiples equipos, portafolios |

### Cuándo usar cada una

- **AGILE** — no es una metodología sino una filosofía: los 4 valores del Manifiesto Ágil y sus 12 principios. Todo lo demás (Scrum, Kanban, XP) son formas de implementarlo.
- **SCRUM** — el framework más usado para construir software complejo: el trabajo se planifica en sprints de 1-4 semanas, con roles definidos (Product Owner, Scrum Master, Development Team) y ceremonias (Sprint Planning, Daily, Review, Retro). Ideal cuando el equipo necesita estructura y entregas frecuentes.
- **Kanban** — flujo continuo sin sprints fijos: se visualiza el trabajo en un tablero, se limita el trabajo en progreso (WIP) y se mide el tiempo de ciclo. Ideal para soporte, mantenimiento o cuando el equipo no puede comprometerse a duración fija de sprints.
- **XP (Extreme Programming)** — enfocado en prácticas técnicas de calidad: TDD, pair programming, continuous integration, refactoring, small releases. Complementa a Scrum cuando se quiere elevar la calidad del código.
- **Lean** — inspirationado en Toyota: eliminar desperdicio, optimizar el flujo de valor, entregar rápido y respetar a las personas. Útil para procesos que no son puramente de desarrollo de software.
- **SAFe (Scaled Agile Framework)** — escalar ágil a organizaciones grandes con múltiples equipos: define cómo alinear portafolios, programas y equipos. Complejo de adoptar, útil cuando hay dependencias fuertes entre equipos.

## Cómo elegir

- **Jira** cuando el equipo vive en tickets y sprints y necesita el vínculo directo con el código (PRs, commits, releases).
- **Asana** cuando se quiere organizar proyectos y objetivos con más flexibilidad que un tablero ágil puro.
- **Monday** cuando la prioridad es una herramienta visual simple que cualquiera en la organización pueda usar.

> La herramienta no define la metodología: primero se define cómo se quiere trabajar (sprints, kanban, flujo continuo) y después se elige la plataforma que mejor lo soporte.