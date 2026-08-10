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

## Tiempo real

| Name                         | Protocolo | Uso                            |
| ---------------------------- | --------- | ------------------------------ |
| **WebSocket**                | WebSocket | Bidireccional full-duplex      |
| **Server-Sent Events (SSE)** | HTTP      | Unidireccional (server→client) |
| **Long Polling**             | HTTP      | Simulación de tiempo real      |

**Cómo elegir:** WebSocket cuando el cliente también necesita enviar datos en tiempo real (chat, juegos, colaboración). SSE cuando el flujo es solo del servidor hacia el cliente (notificaciones, streaming de logs) — más simple que WebSocket y funciona sobre HTTP normal. Long Polling como último recurso, cuando no se puede sumar infraestructura para WebSocket/SSE.
