---
layout: ../../layouts/Layout.astro
eyebrow: Ops
title: Ops Observability
subtitle: Métricas, logs y trazas
---

Cuando se corre software de verdad, lo que importa es poder responder "¿qué está pasando?" sin conjeturas. La observabilidad son las tres señales que lo permiten — métricas, logs y trazas — más los dashboards que las vuelven legibles.

## Las tres señales

| Señal        | Qué es                                                              | Responde a             |
| ------------ | ------------------------------------------------------------------- | ---------------------- |
| **Métricas** | Números agregados en el tiempo (peticiones/s, uso de CPU, latencia) | ¿Rinde? ¿Se degrada?   |
| **Logs**     | Eventos discretos con contexto (errores, requests, cambios)         | ¿Qué pasó exactamente? |
| **Trazas**   | El recorrido de una request por los servicios (spans)               | ¿Dónde tardó?          |

Las tres señales no compiten, se complementan en un flujo natural de investigación — y en ese orden es como normalmente se usan:

- **Métricas** ven el síntoma a nivel conjunto: el pico, la caída, la pendiente. Son baratas de recolectar y evaluar porque ya vienen agregadas — es lo primero que se mira y lo que dispara una alerta.
- **Trazas** conectan el síntoma con la causa: una vez que la métrica dice "la latencia subió", la traza muestra _en qué request específica_, y dentro de esa request, _en qué servicio y en qué llamada_ se fue el tiempo.
- **Logs** dan el detalle de un evento puntual — una vez identificado el servicio y el momento exacto (gracias a la traza), el log cuenta _qué pasó ahí_: el stack trace, el mensaje de error, el payload. Sin ese contexto previo (métrica → traza), buscar en logs a ciegas es buscar una aguja en un pajar; con contexto, se sabe exactamente dónde mirar.

**Por qué hace falta más de una señal:** cada una responde una pregunta que las otras no pueden. Una métrica dice que algo anda mal pero no dice por qué; un log dice exactamente qué pasó pero solo si ya se sabe dónde buscar; una traza conecta ambas mostrando el camino que tomó la request. Un sistema con solo una de las tres tiene un punto ciego estructural.

## Recolección

Cada señal tiene su propio modelo de recolección — y elegir la herramienta correcta depende de entender ese modelo, no solo de comparar features.

### Prometheus

**Perfil:** el estándar de métricas — modela todo como series de tiempo, y en vez de que cada servicio empuje sus datos, Prometheus hace _scraping_: se conecta periódicamente a un endpoint que cada servicio expone y lee los valores actuales.

- **Fortalezas:** el modelo _pull_ simplifica mucho la operación (no hay que preocuparse de que cada servicio sepa a dónde enviar datos, ni de un colector centralizado recibiendo carga de miles de fuentes a la vez); PromQL es un lenguaje de queries muy expresivo para series de tiempo (tasas, percentiles, agregaciones); es el estándar de facto en el mundo Kubernetes, con exporters para prácticamente cualquier sistema.
- **Casos de uso:** monitoreo de infraestructura y aplicaciones en general, la base de alertas de casi cualquier stack moderno, especialmente fuerte en entornos Kubernetes.
- **Debilidades:** el modelo pull no es ideal para trabajos de corta duración (un job de batch que termina antes del próximo scrape puede no quedar registrado, aunque existe _Pushgateway_ como parche para este caso); Prometheus por sí solo no está pensado para retención muy larga de datos (para eso se usan soluciones de _remote storage_ aparte, como Thanos o Mimir).

### OpenTelemetry

**Perfil:** no es un backend de almacenamiento, es un framework de instrumentación y transporte unificado — el "pegamento" que estandariza cómo se generan y envían las tres señales, sin atarlas a un vendor específico.

- **Fortalezas:** se instrumenta la aplicación una sola vez y se puede enviar el resultado a cualquier backend compatible (Prometheus, un SaaS, ELK), lo que evita quedar atado a un proveedor; unifica el vocabulario entre métricas, logs y trazas — algo que antes cada sistema resolvía por su cuenta con formatos distintos.
- **Casos de uso:** cualquier organización que quiera evitar _vendor lock-in_ en su capa de observabilidad, o que necesite correlacionar las tres señales de forma consistente entre servicios escritos en distintos lenguajes.
- **Debilidades:** sigue siendo un estándar relativamente joven — la cobertura y madurez de instrumentación automática varía según lenguaje y framework; agrega una capa de configuración extra (colectores, exporters) que hay que entender.

### ELK / OpenSearch

**Perfil:** una pila de logs — ingesta, indexado, búsqueda y visualización, típicamente Elasticsearch/OpenSearch (almacenamiento + búsqueda), Logstash o Fluentd (ingesta) y Kibana/OpenSearch Dashboards (visualización).

- **Fortalezas:** búsqueda de texto completo muy potente sobre volúmenes grandes de logs, capacidad de indexar y correlacionar campos estructurados dentro de cada log, dashboards y visualizaciones construidas sobre esos mismos datos.
- **Casos de uso:** centralizar logs de muchos servicios en un solo lugar buscable, investigación forense de incidentes (buscar "todas las líneas con este request ID" a través de todos los servicios).
- **Debilidades:** el volumen de logs puede crecer muy rápido y volverse caro de almacenar e indexar si no hay una política clara de retención/muestreo; sin la disciplina de estructurar los logs (campos consistentes, contexto suficiente) se degrada rápido a texto plano difícil de aprovechar.

### Datadog

**Perfil:** SaaS todo-en-uno — cubre métricas, logs, trazas, dashboards y alertas dentro de una sola plataforma gestionada, sin que el equipo tenga que operar la infraestructura de observabilidad.

- **Fortalezas:** integración muy rápida (agentes e integraciones para prácticamente cualquier sistema), correlación nativa entre las tres señales dentro de la misma UI sin tener que unir piezas de distintas herramientas, cero carga operativa propia (no hay que escalar ni mantener el backend de observabilidad).
- **Casos de uso:** equipos que priorizan velocidad de adopción y no quieren invertir tiempo de ingeniería en operar su propio stack de observabilidad.
- **Debilidades:** costo — factura por host, por volumen de logs, por métricas custom, y puede escalar rápido y de forma poco predecible con el crecimiento del sistema; vendor lock-in, ya que migrar de un SaaS todo-en-uno a otra solución implica reinstrumentar o al menos reconfigurar bastante.

| Plataforma           | Tipo                                    | Uso                                                           |
| -------------------- | --------------------------------------- | ------------------------------------------------------------- |
| **Prometheus**       | Métricas (scraping, series de tiempo)   | El estándar de métricas, con PromQL                           |
| **OpenTelemetry**    | Framework de telemetría unificado       | Generar y transportar las tres señales de forma estandarizada |
| **ELK / OpenSearch** | Logs (ingestión + búsqueda + dashboard) | Centralizar logs y buscarlos                                  |
| **Datadog**          | SaaS todo-en-uno                        | Observabilidad gestionada de punta a punta                    |
| **Grafana**          | Visualización de dashboards             | Dashboards y alertas sobre cualquier fuente                   |

> En la práctica, muchos stacks combinan piezas: OpenTelemetry para instrumentar de forma unificada, Prometheus como backend de métricas, ELK para logs, y un SaaS como Datadog cuando no se quiere operar nada de esto — la elección no siempre es "una sola herramienta para todo".

## Dashboards y Alertas

- **Dashboards** — agrupan las series que importan en una vista: la pantalla que alguien abre cuando "algo está raro". Un buen dashboard no muestra todo lo que se _puede_ medir, sino lo que hace falta para responder la pregunta que alguien va a tener a las 3am.
- **Grafana** es el estándar de visualización del stack abierto: consulta PromQL directo contra Prometheus, arma dashboards sobre métricas, logs y trazas de cualquier fuente, y define alertas — el complemento natural del Prometheus visto arriba.
- **Alertas** — la diferencia entre observar y actuar: reglas sobre las métricas que notifican cuando algo se sale de rango. Una plataforma de observabilidad sin alertas es solo un lugar donde los datos van a morir sin que nadie los mire a tiempo. El "qué se alerta y a quién" se ve en [ops-incident](../ops-incident/).

### Principios

- **Métricas sobre logs para alertar** — los números son estables, baratos de evaluar continuamente y ya vienen agregados; evaluar una condición de alerta sobre logs crudos es más lento y más caro. Los logs son para investigar _después_ de que la métrica ya avisó que algo pasa, no para detectarlo en primer lugar.
- **Baselines** — no hay alerta confiable sin saber el valor normal del sistema: una alerta de "CPU al 80%" no significa nada si no se sabe si ese sistema normalmente corre al 30% o al 75%. Sin baseline, las alertas terminan siendo umbrales arbitrarios que generan ruido (falsos positivos) o silencio peligroso (falsos negativos).
- **Dashboards vivos** — si una vista no se mira, no es un dashboard, es un decorado: un dashboard que nadie abre no está generando valor, solo consumiendo mantenimiento cada vez que cambia una métrica que representa.

> La observabilidad no se agrega al final: se diseña junto al sistema. Una request sin traza y un log sin contexto no ayudan cuando el servicio se cae — y la lectura de definitiva de la salud se completa con las prácticas de [ops-reliability](../ops-reliability/).
