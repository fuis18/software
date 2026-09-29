---
layout: ../../../layouts/Layout.astro
eyebrow: Ops
title: Ops Server Architecture
subtitle: What a server is and the layers it implies
---

A server is a machine — physical or virtual — dedicated to providing services to other machines on the network. It runs headless, stays on continuously, and is administered remotely, usually over the network. Understanding the layers a server implies is the map of this entire section: each layer below is covered in depth in its own page.

## What Is a Server

A server differs from a personal computer by purpose, not by parts: instead of serving a person at a screen, it serves other machines — resolving names, serving web pages, storing data, or running workloads. Because nobody sits in front of it, the typical server is:

- **Headless** — no monitor or desktop; everything is configured over the network.
- **Always on** — uptime is the job; being down means the services it provides are down.
- **Administrated remotely** — via SSH and the tooling covered in this section ([ops-iac](../ops-iac/)).
- **Specialized** — each server or VM tends to run a focused role rather than many applications at once.

## The Layer Model

From the physical machine to the services delivered, a server is organized in layers. Each layer is one of the topics of this section:

| Layer | What it is | Covered in |
|---|---|---|
| **Physical** | The real hardware that runs everything | [ops-hardware](../ops-hardware/), [ops-physical-network](../ops-physical-network/) |
| **Virtualization** | KVM/QEMU isolating operating systems on the same hardware | [ops-virtualization](../ops-virtualization/) |
| **Containers** | Reproducible units packaging each app and its dependencies | [ops-containers](../ops-containers/) |
| **Ingress & networking** | Reverse proxy, load balancer, WAF at the edge | [ops-traffic](../ops-traffic/) |
| **Applications** | Backend and frontend services | [dev section](../../dev/) |
| **Data** | Databases, caches, and object storage | [ops-dbadmin](../ops-dbadmin/), [ops-storage](../ops-storage/) |
| **Support services** | DNS, authentication, metrics, logs, message queues | [ops-observability](../ops-observability/), [dev-auth](../../dev/dev-auth/) |

Traffic flows down the stack: it enters through the ingress layer, reaches the application, the application persists and reads state from the data layer, and support services sustain all of it.

## Virtualization: KVM/QEMU & Virt-Manager

The most common way to run a "server" today is a Linux host with virtual machines on top. KVM and QEMU together form the standard open-source hypervisor stack:

| Piece | Role |
|---|---|
| **KVM** | The Linux kernel module that turns the kernel itself into a hypervisor: VMs run as normal processes with hardware acceleration (Intel VT-x / AMD-V). The foundation of most public clouds. |
| **QEMU** | The userspace emulator that gives each VM its virtual hardware (CPU, RAM, disks, network). Alone it can fully emulate (slow); combined with KVM it delegates execution to the accelerated module. |
| **libvirt** | The daemon and API that manage the VM lifecycle: domains, start/stop, storage pools, and virtual networks. This is what the tools below talk to. |
| **virt-manager** | The graphical interface (GTK) for QEMU/KVM: create VMs, assign resources, and watch the console from a desktop. |
| **virsh** | The CLI equivalent of virt-manager for scripting and remote administration. |

The hypervisor layer and how to choose between VMs, bare metal, and containers are covered in [ops-virtualization](../ops-virtualization/).

## Containers Hierarchy

Once containers are the unit of deployment, the services running inside follow a consistent hierarchy. Traffic enters from the edge, is routed to applications, applications persist state in the data layer, and support services sustain the whole system.

### Ingress & Networking Layer

Reverse proxy, load balancer, and WAF: receives traffic on a domain or route, terminates TLS, filters attacks, and forwards to the right backend.

| Tool | Profile |
|---|---|
| **nginx** | Classic all-in-one: proxy, caching, TLS, load balancing, and web server |
| **traefik** | Native for containers: auto-discovery of services, automatic Let's Encrypt |
| **haproxy** | Load balancing specialist: high availability, health checks |
| **caddy** | Automatic HTTPS by default, simple configuration, built in Go |

How this layer works — resolution, delivery edge, reverse proxies, and certificates — is covered in [ops-traffic](../ops-traffic/).

### Applications Layer

The actual products: backend APIs and frontend interfaces, each running in its own container. This is the reason the infrastructure exists — see the [dev section](../../dev/) for how applications are built, and [ops-containers](../ops-containers/) for how they are packaged and networked.

### Data Layer

The persistent services that store and serve state: relational databases, caches, document stores, and object storage, each in its own container.

The decision of which database to use — SQL, document, key-value, vector — belongs to [back-databases](../../dev/back-databases/); the operational side (replication, sharding, migrations) to [ops-dbadmin](../ops-dbadmin/); and the storage fundamentals (block, file, object — including self-hosted S3 like MinIO) to [ops-storage](../ops-storage/).

### Support Services Layer

Everything the other layers need to function: name resolution, identity, metrics, log storage, and message queues.

| Tool | Role |
|---|---|
| **unbound** | Lightweight recursive DNS resolver |
| **keycloak** | Identity provider: SSO with OIDC/OAuth2 |
| **prometheus** | Metrics collection and alerting |
| **elasticsearch** | Log search and analytics |
| **rabbitmq** | Message queue / broker between services |

The three observability signals are covered in [ops-observability](../ops-observability/), identity in [dev-auth](../../dev/dev-auth/), and messaging patterns in [back-technologies](../../dev/back-technologies/).

### Workstation Side — Distrobox

The four service layers above are the **server** side of containers. On the **workstation**, containers have a different role: giving the developer reproducible environments without leaving the host. **Distrobox** wraps Podman or Docker to create a container of any Linux distribution tightly integrated with the host — it shares the user's `$HOME`, external storage, and USB devices, and can export GUI apps to the desktop so they run as if they were native. Same container backends (podman/docker) as the server layers, different purpose.

## Network Infrastructure Services

Beyond the services running in containers, some servers provide capabilities to the entire network rather than to a single application: a shared identity directory, dynamic address assignment, and name resolution.

### Directory Services — OpenLDAP

Centralized users and groups in a directory tree over the **LDAP** protocol: the single source of identity that the rest of the services query for authentication and authorization. Keycloak (from the support layer) often sits on top of the same directory, adding SSO and modern protocols to it.

### DHCP — Kea

Dynamic Host Configuration Protocol: assigns IP addresses, gateways, and DNS servers automatically to devices on the network. **Kea** is the modern open-source DHCP server (successor to [ISC DHCP]) — high performance, API-driven configuration, and per-subnet policies. It's the natural partner of the address and network design covered in [ops-physical-network](../ops-physical-network/).

[ISC DHCP]: https://www.isc.org/dhcp/

### DNS

Name resolution is the column connecting a name to a service. In a self-hosted environment there are two roles: the **authoritative** server that answers for your own domains, and the **recursive resolver** that finds answers for anything else.

| Tool | Profile |
|---|---|
| **BIND9** | The reference DNS server: authoritative and recursive, battle-tested for decades |
| **knot-resolver** | High-performance recursive resolver (CZ.NIC), designed for scale |
| **NextDNS** | Managed filtering DNS (SaaS, not self-hosted): per-device policies and blocking |

DNS as part of traffic routing is covered in [ops-traffic](../ops-traffic/). For network-wide ad blocking at the DNS level, Pi-hole lives in [ops-selfhosted](../ops-selfhosted/).

## Related

- [ops-physical-network](../ops-physical-network/) — how the machines are connected at the cable level.
- [ops-virtualization](../ops-virtualization/) — hypervisors and the VM vs. bare metal vs. container decision.
- [ops-containers](../ops-containers/) — images, runtimes, and container networking.
- [ops-traffic](../ops-traffic/) — how traffic is routed and accelerated toward services.
- [ops-storage](../ops-storage/) / [ops-dbadmin](../ops-dbadmin/) — persisting and operating data.
- [ops-observability](../ops-observability/) — metrics, logs, and traces.
- [ops-selfhosted](../ops-selfhosted/) — the practical home case for everything in this section.