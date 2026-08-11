---
layout: ../../layouts/Layout.astro
eyebrow: Dev
title: Back Technologies
subtitle: Formas de comunicación entre servicios
---

## APIs síncronas (Request-Response)

| Name        | Serialización | Tipo     | Uso Principal                                                                  |
| ----------- | ------------- | -------- | ------------------------------------------------------------------------------ |
| **REST**    | JSON, XML     | Resource | Opción por defecto: APIs públicas, CRUD, máxima compatibilidad                 |
| **GraphQL** | JSON          | Query    | El cliente pide exactamente los campos que necesita, evita over/under-fetching |
| **gRPC**    | Protobuf      | RPC      | Comunicación interna entre microservicios donde importa la performance         |

**Cómo elegir:** REST por defecto si no hay una razón específica para otra cosa. GraphQL cuando distintos clientes (web, mobile) necesitan formas distintas de los mismos datos. gRPC entre servicios internos propios, no de cara al público — la ganancia de performance no vale la pérdida de legibilidad para un consumidor externo.

## APIs asíncronas (Message-Oriented)

| Name              | Tipo          | Uso Principal       |
| ----------------- | ------------- | ------------------- |
| **RabbitMQ**      | Message Queue | Jobs, tareas, colas |
| **Kafka**         | Event Stream  | Eventos, analytics  |
| **NATS**          | Pub/Sub       | Baja latencia       |
| **Redis Pub/Sub** | Pub/Sub       | Cache + mensajería  |

**Cómo elegir:** RabbitMQ para colas de trabajo clásicas (procesar algo una vez, con reintentos). Kafka cuando el volumen de eventos es alto y varios consumidores necesitan leer el mismo stream (analytics, event sourcing). NATS cuando la prioridad es latencia mínima por sobre garantías de entrega. Redis Pub/Sub cuando ya hay Redis como cache y no se justifica sumar infraestructura nueva solo para mensajería simple.

## Webhooks

Un **webhook** es un callback por HTTP: el servicio que produce el evento le hace una request (normalmente `POST` con un payload JSON) a una URL que el consumidor expuso de antemano, cada vez que algo ocurre. A diferencia de las colas y los streams, no hay infraestructura intermedia — el productor y el consumidor se hablan por HTTP directo.

| Name        | Tipo          | Uso principal                                              |
| ----------- | ------------- | ---------------------------------------------------------- |
| **Webhook** | HTTP callback | Notificar a un tercero (Stripe, GitHub, Slack) sin polling |

**Cómo elegir:** webhooks cuando otro servicio necesita enterarse de tus eventos en el momento (pagos, deploys, mensajes) y podés tolerar reintentos por parte del productor. A diferencia de Kafka/RabbitMQ no hay cola que amortigüe picos ni acuse de recibo garantizado, así que el endpoint debe ser idempotente y el productor debe reintentar los fallos.

## Tiempo real

| Name                         | Protocolo | Uso                            |
| ---------------------------- | --------- | ------------------------------ |
| **WebSocket**                | WebSocket | Bidireccional full-duplex      |
| **Server-Sent Events (SSE)** | HTTP      | Unidireccional (server→client) |
| **Long Polling**             | HTTP      | Simulación de tiempo real      |

**Cómo elegir:** WebSocket cuando el cliente también necesita enviar datos en tiempo real (chat, juegos, colaboración). SSE cuando el flujo es solo del servidor hacia el cliente (notificaciones, streaming de logs) — más simple que WebSocket y funciona sobre HTTP normal. Long Polling como último recurso, cuando no se puede sumar infraestructura para WebSocket/SSE.
