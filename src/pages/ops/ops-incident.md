---
layout: ../../layouts/Layout.astro
eyebrow: Ops
title: Ops Incident
subtitle: Gestión de incidentes y alertas
---

Los incidentes son parte del trabajo en ops. La diferencia entre un caos y un proceso está en la preparación previa: definir objetivos de fiabilidad medibles, alertar a la persona correcta y aprender de cada caída.

## SLO / SLI / SLA

El vocabulario de "¿qué tan confiable prometemos ser?".

| Sigla | Qué es                                        | Ejemplo                      |
| ----- | --------------------------------------------- | ---------------------------- |
| **SLI** | Qué se mide realmente (disponibilidad, latencia) | % de requests OK en 5 min |
| **SLO** | El objetivo declarado sobre el SLI            | 99.9% disponibilidad mensual|
| **SLA** | La promesa contractual con el cliente (con penalización) | 99.95% en el contrato |

- El **SLO** es la referencia: la alerta debe sonar *antes* de que el SLO corra peligro, no cuando ya se perdió.
- La fiabilidad no se "asegura": se define un objetivo, se mide y se acepta el error budget que eso implica.

## Alerting

| Plataforma       | Perfil                                  | Uso                                 |
| ---------------- | --------------------------------------- | ----------------------------------- |
| **PagerDuty**    | On-call y escalado                      | Paginar a la persona de guardia     |
| **Opsgenie**     | Alerting y on-call                      | Agenda de guardia y notificaciones  |

### Buen alerting

- **Alerta ≠ ruido** — si una alerta no exige acción, no es una alerta: es ruido que termina ignorado (y las alertas ignoradas son peores que no tenerlas).
- **Rutas correctas** — cada tipo de alerta llega a quien puede actuar: crítico a la guardia, warning al canal del equipo.
- **Escalado** — la alerta no se tranza: si nadie responde, escala a más gente hasta que alguien la tome.
- **El error budget guía la alerta** — las reglas se definen para proteger el SLO, no para compensar la falta de él. Ver [ops-observability](ops-observability/).

## On-Call

Quién está disponible y cómo se garantiza su eficacia.

- **Rota de guardia** — una persona responsable por turno, con horario y relevo claros.
- **Runbooks** — el manual listo de qué hacer ante cada incidente conocido: no se piensa bajo presión, se consulta.
- **Documentación accesible** — dashboards, runbooks y contactos a un clic desde la alerta.

## Post-mortems

El aprendizaje después del incidente — lo que convierte el caos en proceso.

- **Sin culpas** — el buscador de culpables destruye la información que el incidente dejó.
- **Cronología** — qué pasó en qué orden, con el detalle que permite entender el porqué.
- **Acciones** — hallazgos que se convierten en tareas concretas con dueño y fecha.
- **Ampliar el sistema, no solo el síntoma** — el fix del trigger no basta: la pregunta es qué proceso falló para que llegara a pasar.

> Un incidente gestionado bien deja el sistema más fuerte: la historia registrada, el runbook actualizado y las acciones en curso. Es la misma idea de mejora continua que sostiene [ops-reliability](ops-reliability/).