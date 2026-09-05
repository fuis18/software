---
layout: ../../../layouts/Layout.astro
eyebrow: Dev
title: Back Technologies
subtitle: Communication methods between services
---

## Synchronous APIs (Request-Response)

| Name        | Serialization | Type     | Primary Use                                                                  |
| ----------- | ------------- | -------- | ---------------------------------------------------------------------------- |
| **REST**    | JSON, XML     | Resource | Default option: public APIs, CRUD, maximum compatibility                     |
| **GraphQL** | JSON          | Query    | Client requests exactly the fields it needs, avoids over/under-fetching      |
| **gRPC**    | Protobuf      | RPC      | Internal communication between microservices where performance matters        |

**How to choose:** REST by default unless there's a specific reason for something else. GraphQL when different clients (web, mobile) need different shapes of the same data. gRPC between internal services, not public-facing — the performance gain isn't worth the readability loss for an external consumer.

## Asynchronous APIs (Message-Oriented)

| Name              | Type          | Primary Use        |
| ----------------- | ------------- | ------------------ |
| **RabbitMQ**      | Message Queue | Jobs, tasks, queues |
| **Kafka**         | Event Stream  | Events, analytics  |
| **NATS**          | Pub/Sub       | Low latency         |
| **Redis Pub/Sub** | Pub/Sub       | Cache + messaging   |

**How to choose:** RabbitMQ for classic work queues (process something once, with retries). Kafka when event volume is high and multiple consumers need to read the same stream (analytics, event sourcing). NATS when latency is the top priority over delivery guarantees. Redis Pub/Sub when Redis is already used as cache and it's not worth adding new infrastructure just for simple messaging.

## Webhooks

A **webhook** is an HTTP callback: the service that produces the event makes a request (usually `POST` with a JSON payload) to a URL that the consumer exposed in advance, whenever something happens. Unlike queues and streams, there's no intermediate infrastructure — the producer and consumer talk directly via HTTP.

| Name        | Type          | Primary Use                                               |
| ----------- | ------------- | --------------------------------------------------------- |
| **Webhook** | HTTP callback | Notify a third party (Stripe, GitHub, Slack) without polling |

**How to choose:** webhooks when another service needs to learn about your events in real time (payments, deploys, messages) and you can tolerate retries from the producer. Unlike Kafka/RabbitMQ there's no queue to absorb spikes or guaranteed acknowledgment, so the endpoint must be idempotent and the producer must retry failures.

## Real-time

| Name                         | Protocol | Use                            |
| ---------------------------- | -------- | ------------------------------ |
| **WebSocket**                | WebSocket | Bidirectional full-duplex      |
| **Server-Sent Events (SSE)** | HTTP     | Unidirectional (server→client) |
| **Long Polling**             | HTTP     | Real-time simulation           |

**How to choose:** WebSocket when the client also needs to send data in real time (chat, games, collaboration). SSE when the flow is only from server to client (notifications, log streaming) — simpler than WebSocket and works over plain HTTP. Long Polling as a last resort when infrastructure for WebSocket/SSE cannot be added.
