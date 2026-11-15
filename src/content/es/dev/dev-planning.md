---
eyebrow: Dev
title: Dev Planning
subtitle: Lo que se hace antes de programar
group: Project Management
order: 20
summary: "Antes de programar: requerimientos, documentos, diagramas (graphos) y ADR — qué escribir y cuándo, antes de tocar el código."
---

Toda feature empieza mucho antes del primer commit: entender qué se quiere, decidir cómo será y dejarlo escrito donde el equipo lo encuentre. Lo que cambia más barato es lo que aún no existe en código — y un problema escrito se resuelve en una reunión; el mismo problema descubierto en producción, en varias.

## Requerimientos

El requerimiento responde una sola pregunta: ¿qué debe hacer el sistema y cómo sabremos que lo hace? Escribirlo obliga a resolver las ambigüedades antes de que las resuelva el código — el código siempre las resuelve a su manera.

- **Funcionales** — qué debe hacer: comportamientos observables desde fuera («el usuario puede restablecer su contraseña»). Se escriben como historias de usuario con criterios de aceptación (Given/When/Then) para que «está listo» sea verificable y no una opinión.
- **No funcionales** — cómo debe hacerlo: rendimiento, seguridad, disponibilidad, límites («99,9% de disponibilidad», «respuesta < 200 ms»). No son opcionales: suelen ser los que rompen el proyecto en producción cuando nadie los escribió.
- **El mínimo que haga falta** — no todo merece documento: para una tarea chica basta un bullet en la issue; el formato completo merece la pena cuando participa más de una persona o cuando lo de «listo» se empieza a discutir.

## Documentos

El documento correcto es el que se lee sin que nadie lo recuerde. Regla práctica: si vive en el repo, vive junto al código que describe.

- **One-pager** — una página que resume el qué y el porqué de una feature: contexto, objetivo, alcance y fuera de alcance. El formato barato, que cabe en la descripción de la issue o en `docs/`.
- **Spec completa** — cuando hay varios equipos, interfaces o dinero de por medio: comportamientos, casos borde y métricas de éxito. Se revisa en PR como cualquier otro código ([dev-vcs](../dev-vcs/)).
- **Dónde vive** — en el repo (`docs/` o junto a la feature), versionada y revisada en PR. Las herramientas donde el equipo mantiene el resto de su documentación (wikis, docs-as-code) están en [dev-project-management](../dev-project-management/).

## Diagramas (graphos)

Dibujar es para comunicar, no para archivar: un diagrama se entiende en una reunión y se obsoleta en tres meses si nadie lo actualiza. Úsalo mientras resuelva una conversación; si solo documenta, casi siempre sobra.

- **Mermaid** — diagramas como código dentro del markdown: flujos, secuencias y grafos (nodos + aristas) que viven en el repo y se revisan en PR, sin herramienta de dibujo. El grafo más barato de mantener.
- **UML** — el vocabulario común: casos de uso (quién usa qué), secuencia (qué pasa en el tiempo) y clases (estructura). Suficiente para la mayoría de equipos, sin ceremonia de «modelado».
- **C4** — arquitectura en cuatro niveles (contexto, contenedores, componentes, código) para explicar el sistema a distintas audiencias; el complemento natural de los patrones de [dev-architectures](../dev-architectures/).

## ADR

Un _Architecture Decision Record_ es la nota que responde «¿por qué decidimos esto?» seis meses después, cuando el chat ya no existe. Uno por decisión cara de revertir — no por cada elección técnica.

```adr
# ADR-001: Postgres en vez de MongoDB

## Contexto
Qué estaba pasando y qué presiones había (volumen de datos, equipo, plazos).

## Decisión
Elegimos X porque... (y qué opción se descarta).

## Consecuencias
Qué ganamos, qué cedemos y qué hay que vigilar.
```

- **Formato** — contexto / decisión / consecuencias; cabe en media página. Sin él la decisión se pierde; con demasiado texto, nadie lo escribe.
- **Cuándo escribir uno** — cuando la opción descartada también era razonable (cambio de framework, elección de base de datos, sync vs. async). Si solo había una opción viable, no hay decisión que registrar.
- **Dónde vive** — en `docs/adr/` con un número correlativo, creado en PR; desde ahí se enlazan los patrones de [dev-architectures](../dev-architectures/) y los principios de [dev-principles](../dev-principles/).
