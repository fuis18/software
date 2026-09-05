---
layout: ../../../layouts/Layout.astro
eyebrow: Ops
title: Ops Traffic
subtitle: How traffic is routed and accelerated toward services
---

Between the user and the service there's an entire network infrastructure layer: resolving the name, accelerating delivery, load balancing, and encrypting the connection. Each piece is chosen based on the traffic's objective.

## Name Resolution (DNS)

| Piece                | What it does                                              |
| -------------------- | ----------------------------------------------------- |
| **DNS**              | Translates the human-readable name to the service address |
| **CoreDNS**          | Internal resolution within the cluster                 |
| **External resolver** | Authoritative and edge-cached DNS                 |

- DNS is the column connecting name to service: without correct resolution, nothing is found.
- In the cluster, internal service name resolution is what allows apps to communicate without knowing IPs. See [ops-kubernetes](../ops-kubernetes/).

## Delivery Edge (CDN / Edge)

| Piece          | What it is                                                                                     |
| -------------- | ------------------------------------------------------------------------------------------ |
| **CDN / Edge** | Distributed server network that serves content from the point closest to the user |
| **Anycast**    | Same IP address announced from many points; the router takes you to the closest           |
| **WAF**        | Web application firewall at the edge: filters traffic toward apps                 |

- **CDN** accelerates delivery of static content and video, and also absorbs attack traffic (DDoS), relieving the origin. See [ops-netsecurity](../ops-netsecurity/).
- **Anycast** is the mechanism enabling that proximity: many nodes with the same IP and the network chooses the shortest path.
- **WAF** is placed at the edge, in front of web apps, to filter malicious traffic before it reaches the backend. See [ops-netsecurity](../ops-netsecurity/).
- **Cloudflare** is the reference managed CDN/edge: absorbs DDoS on its network, serves content from the closest node, and adds DNS, WAF, and proxy on the same plane — the managed alternative to running your own NGINX or HAProxy at the edge.

## Reverse Proxy

The service's front-end: receives traffic and reroutes it to the correct backend, while adding network capabilities.

| Platform  | Profile                   | Stands out in                                                                |
| ----------- | ------------------------ | ------------------------------------------------------------------------- |
| **NGINX**   | Classic all-in-one      | Proxy, caching, TLS, load balancing, web server                               |
| **HAProxy** | Load balancing specialist | High availability, health checks, gRPC/websocket                          |
| **Traefik** | Native for containers | Auto-discovery, automatic Let's Encrypt, Docker/K8s integration |

| Capability           | What it does                                                 |
| ------------------- | -------------------------------------------------------- |
| **Reverse proxy**   | Receives on a domain/route and forwards to the internal service |
| **TLS termination** | Encrypts at the edge and decrypts for the backend              |
| **Caching**         | Responds from cache without touching the backend                   |
| **Web server**      | Serves static content directly                         |

## Load Balancers

Distributing traffic across multiple instances of the same service to avoid saturating any single one.

| Type                | Where it lives           | Use                                                     |
| ------------------- | -------------------- | ------------------------------------------------------- |
| **Software (L4)**   | Own hosts / cloud | Distribution by IP and port, high speed            |
| **Hardware (L7)**   | Dedicated appliance   | Enterprise load balancer (F5, etc.), advanced features |
| **Cloud LB**        | Cloud provider    | Managed load balancing without operating anything                     |
| **Cluster ingress** | Kubernetes           | Internal load balancing toward services                    |

**How to choose:**

- **Reverse proxy** when you need to resolve domains/routes to services, caching, or centralized TLS.
- **Load balancer** when there are multiple instances of a service and you want to distribute and detect failures.
- **Cluster ingress** when traffic enters Kubernetes. See [ops-kubernetes](../ops-kubernetes/).

## SSL/TLS Certificates

Encrypting traffic in transit is mandatory today, not optional.

- **Issuance** — legitimate domain certificates via HTTP-01/DNS-01 (or v2), with automatic renewal.
- **Trust chain** — the client verifies that the certificate was signed by a trusted authority.
- **Edge termination** — certificates live on the proxy/edge, and the internal connection can remain encrypted (mTLS).

> Simple rule: external traffic always encrypted with valid, automatically renewed certificates; internal traffic with mTLS if the risk is critical.
