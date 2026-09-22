---
layout: ../../../layouts/Layout.astro
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

| Name                         | Protocolo | Funcionalidad                                                                                                                                                                                  | Ejemplos típicos                                                               |
| ---------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **WebSocket**                | WebSocket | Canal bidireccional full-duplex persistente sobre una única conexión TCP: ambas partes intercambian mensajes en tiempo real con latencia de milisegundos                                       | Chat, datos de mercado en vivo, videojuegos multijugador, edición colaborativa |
| **Server-Sent Events (SSE)** | HTTP      | Flujo unidireccional server→client sobre HTTP normal: el cliente se suscribe con una request de larga duración y recibe los eventos a medida que llegan; más simple y compatible que WebSocket | Notificaciones, feeds en vivo, streaming de logs                               |
| **Long Polling**             | HTTP      | Simula el tiempo real: el cliente mantiene la request HTTP abierta y el servidor responde apenas hay datos nuevos, luego el cliente se reconecta de inmediato                                  | Último recurso cuando no se puede sumar infraestructura WebSocket/SSE          |

**Cómo elegir:** WebSocket cuando el cliente también necesita enviar datos en tiempo real (chat, juegos, colaboración). SSE cuando el flujo es solo del servidor hacia el cliente (notificaciones, streaming de logs) — más simple que WebSocket y funciona sobre HTTP normal. Long Polling como último recurso, cuando no se puede sumar infraestructura para WebSocket/SSE.

### Cuando el tiempo real es el núcleo de la experiencia

La comunicación en tiempo real importa cuando la **baja latencia** (milisegundos) y las **actualizaciones instantáneas** son el núcleo de la experiencia, no solo un añadido: el usuario debe percibir los eventos a medida que ocurren, sin refrescar ni hacer polling explícito. El mecanismo depende entonces de la dirección del flujo y de la infraestructura disponible — WebSocket para comunicación bidireccional, SSE para unidireccional y Long Polling como último recurso.

### Escalar el tiempo real más allá de un solo servidor

A gran escala, la infraestructura de tiempo real va mucho más allá de un simple servidor Node.js: requiere distribuir las conexiones de larga duración entre muchos servidores, un motor de mensajería (Pub/Sub) para retransmitir eventos al receptor correcto en cualquier servidor, gestión de sesión y estado para el escalado horizontal y persistencia asíncrona en bases de datos para no bloquear los hilos de red.


