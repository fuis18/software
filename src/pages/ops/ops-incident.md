---
layout: ../../layouts/Layout.astro
eyebrow: Ops
title: Ops Incident
subtitle: Gestión de incidentes y alertas
---

Los incidentes son parte del trabajo en ops. La diferencia entre un caos y un proceso está en la preparación previa: definir objetivos de fiabilidad medibles, alertar a la persona correcta y aprender de cada caída.

## SLO / SLI / SLA

El vocabulario de "¿qué tan confiable prometemos ser?".

| Concepto | Término                 | ¿Qué es?                                                                                 | Se pregunta                                      | Ejemplo                                                                          |
| -------- | ----------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------- |
| SLI      | Service Level Indicator | La medida real del rendimiento del servicio en tiempo real.                              | ¿Cómo está funcionando el servicio ahora mismo?  | La latencia actual del servicio es de 45 ms en el 99% de las peticiones.         |
| SLO      | Service Level Objective | La meta interna de rendimiento que el equipo técnico busca mantener.                     | ¿Qué nivel de rendimiento queremos alcanzar?     | El 99% de las peticiones deben responder en menos de 100 ms cada mes.            |
| SLA      | Service Level Agreement | El acuerdo legal o comercial firmado con el cliente (con penalizaciones si se incumple). | ¿Qué pasa si el servicio no cumple lo prometido? | Si la disponibilidad cae por debajo del 99%, se reembolsa el 10% de la factura." |

Los tres términos son el mismo dato mirado desde tres ángulos distintos, y existe una relación de dependencia entre ellos: el **SLI** es la medición cruda; el **SLO** es el umbral que el equipo se propone sobre esa medición; el **SLA** es la promesa comercial que se firma _encima_ del SLO, casi siempre con un margen de seguridad — el SLA nunca debería ser más estricto que el SLO interno, porque si el SLO falla antes que el SLA, el equipo pierde el margen de reacción que necesita para corregir antes de que haya consecuencias contractuales.

- El **SLO** es la referencia: la alerta debe sonar _antes_ de que el SLO corra peligro, no cuando ya se perdió.
- La fiabilidad no se "asegura": se define un objetivo, se mide y se acepta el **error budget** que eso implica — si el SLO es 99.9% de disponibilidad, el 0.1% restante es presupuesto de error que el sistema tiene permitido gastar (en fallas, en despliegues riesgosos, en mantenimiento) sin que eso sea, en sí mismo, un fracaso.
- **Por qué esto importa más allá de ops:** un SLO bien definido le da al equipo un lenguaje objetivo para decidir cuándo frenar features nuevas y enfocarse en estabilidad (cuando el error budget se agota) y cuándo hay margen para moverse rápido y asumir riesgo (cuando sobra presupuesto).

## Alerting

La capa que convierte una métrica fuera de rango en una notificación a un humano que puede actuar.

### PagerDuty

**Perfil:** la plataforma de referencia en on-call y escalado — gestiona calendarios de guardia, políticas de escalado y la integración con las herramientas de monitoreo que disparan las alertas.

- **Fortalezas:** políticas de escalado muy configurables (si la persona de guardia no responde en X minutos, escala al siguiente), integraciones maduras con casi cualquier fuente de alertas (Prometheus, Datadog, etc.), buen soporte para postmortems y análisis de incidentes integrado al mismo flujo.
- **Casos de uso:** organizaciones con rotaciones de guardia formales y necesidad de escalado estricto, equipos grandes con múltiples servicios y políticas de alerta distintas por equipo.
- **Debilidades:** el costo por usuario puede pesar en equipos grandes; la configuración de políticas de escalado complejas tiene una curva de aprendizaje real.

### Opsgenie

**Perfil:** perfil similar a PagerDuty — alerting y on-call, con fuerte integración al ecosistema Atlassian (Jira, Confluence).

- **Fortalezas:** integración natural si el resto del stack ya vive en Atlassian, buen soporte de calendarios de guardia rotativos y reglas de notificación multicanal (push, SMS, llamada).
- **Casos de uso:** equipos que ya usan Jira/Confluence para el resto de su flujo y quieren que las alertas se conecten naturalmente a esos tickets.
- **Debilidades:** fuera del ecosistema Atlassian, ofrece un valor menos diferenciado frente a PagerDuty.

| Plataforma    | Perfil             | Uso                                |
| ------------- | ------------------ | ---------------------------------- |
| **PagerDuty** | On-call y escalado | Paginar a la persona de guardia    |
| **Opsgenie**  | Alerting y on-call | Agenda de guardia y notificaciones |

### Buen alerting

- **Alerta ≠ ruido** — si una alerta no exige acción, no es una alerta: es ruido que termina ignorado (y las alertas ignoradas son peores que no tenerlas, porque entrenan al equipo a desconfiar de todas). Toda alerta debería poder responder "¿qué tengo que hacer ahora mismo si esto suena?" — si la respuesta es "nada, solo mirar", probablemente debería ser un dashboard, no una alerta.
- **Rutas correctas** — cada tipo de alerta llega a quien puede actuar: crítico a la guardia (interrumpe, sea la hora que sea), warning al canal del equipo (se revisa en horario laboral, no despierta a nadie). Mandar todo al mismo canal con la misma urgencia es la forma más rápida de generar fatiga de alertas.
- **Escalado** — la alerta no se tranza: si nadie responde, escala a más gente hasta que alguien la tome. Esto protege contra el caso en que la persona de guardia esté literalmente incapacitada de responder (sin señal, dormida, con el teléfono en silencio) — el sistema no puede depender de que una sola persona siempre esté disponible.
- **El error budget guía la alerta** — las reglas se definen para proteger el SLO, no para compensar la falta de él: una alerta sin un SLO detrás es solo un umbral arbitrario elegido a ojo, sin manera objetiva de saber si está bien calibrado. Ver [ops-observability](../ops-observability/).

## On-Call

Quién está disponible y cómo se garantiza su eficacia — la guardia sin las otras dos piezas (runbooks, documentación accesible) es solo una persona con ansiedad y sin herramientas.

- **Rota de guardia** — una persona responsable por turno, con horario y relevo claros. La claridad del relevo importa tanto como la del turno: si no está claro cuándo termina la responsabilidad de alguien, dos personas pueden asumir que el otro está cubriendo, y nadie responde.
- **Runbooks** — el manual listo de qué hacer ante cada incidente conocido: no se piensa bajo presión, se consulta. Un buen runbook asume que quien lo lee está con el pulso acelerado a las 3am y no tiene margen para interpretar ambigüedad — pasos concretos, no teoría general del sistema.
- **Documentación accesible** — dashboards, runbooks y contactos a un clic desde la alerta. Cada segundo que la persona de guardia pasa buscando dónde está el dashboard correcto es tiempo que el incidente sigue activo; la alerta misma debería traer los links, no obligar a ir a buscarlos.

## Post-mortems

El aprendizaje después del incidente — lo que convierte el caos en proceso.

- **Sin culpas** — el buscador de culpables destruye la información que el incidente dejó: si contar honestamente lo que hiciste durante el incidente puede usarse en tu contra, la próxima vez la historia que se cuenta es más defensiva y menos precisa, y el equipo pierde exactamente la información que necesitaba para prevenir que se repita.
- **Cronología** — qué pasó en qué orden, con el detalle que permite entender el porqué: no solo "a las 14:32 cayó el servicio", sino la secuencia completa de señales, decisiones y acciones que llevaron hasta ahí y hasta la resolución.
- **Acciones** — hallazgos que se convierten en tareas concretas con dueño y fecha: un post-mortem que termina en una lista de "deberíamos mejorar X" sin dueño ni fecha es, en la práctica, un post-mortem que no generó ningún cambio real.
- **Ampliar el sistema, no solo el síntoma** — el fix del trigger no basta: la pregunta es qué proceso falló para que llegara a pasar. Arreglar el bug puntual previene _ese_ incidente; entender por qué el sistema permitió que un solo bug llegara a producción sin detección previene la próxima categoría entera de incidentes.

> Un incidente gestionado bien deja el sistema más fuerte: la historia registrada, el runbook actualizado y las acciones en curso. Es la misma idea de mejora continua que sostiene [ops-reliability](../ops-reliability/).
