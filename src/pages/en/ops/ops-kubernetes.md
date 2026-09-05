---
layout: ../../../layouts/Layout.astro
eyebrow: Ops
title: Ops Kubernetes
subtitle: Container orchestration at scale
---

When containers number in the tens or hundreds, you need something to organize them: which image runs where, how they're discovered, how networking and storage are provided, how they're exposed to the world, and how the system is maintained. That's orchestration.

## Core concepts

### Pod

**What it is:** the minimum deployment unit in Kubernetes — one or more containers that share a network (same IP, same `localhost`) and storage (shared volumes).

- **Why it exists:** Kubernetes doesn't orchestrate standalone containers, it orchestrates pods. When a pod has more than one container, it's because there's a strong dependency between them (e.g., a sidecar that proxies or logs for the main container) and they need to live and die together.
- **Ephemeral by design:** the pod has no persistent identity that the system respects — if it dies (from failure, update, rescheduling), it's not "revived": it's replaced by a new pod with a new IP. This is intentional, not a bug: it forces nothing to depend on the identity of an individual pod.
- **Direct consequence:** if nothing can depend on a pod's IP, something must provide a stable address toward a group of interchangeable pods. That something is the Service.

### Service

**What it is:** a stable name and virtual IP that groups a set of pods (typically selected by labels) and load balances traffic among them.

- **Why it exists:** it decouples consumers (other pods, other services) from the lifecycle of actual pods. A consumer talks to the Service, never directly to a pod — so pods can die and be replaced without anyone "noticing."
- **Scope:** by default the Service is internal to the cluster (`ClusterIP`) — it solves discovery _inside_ Kubernetes, but doesn't open anything to the outside.
- **Direct consequence:** if the Service only resolves internal traffic, a separate piece is needed to decide what enters from the internet and which Service it's routed to. That piece is the Ingress.

### Ingress

**What it is:** the entry point for external traffic to internal Services — defines routing rules (by domain, by path) for which Service each request should reach.

- **Why it exists:** without Ingress, exposing a Service to the outside requires more rudimentary solutions (`NodePort`, `LoadBalancer` per service). Ingress centralizes HTTP/HTTPS routing for the entire cluster in a single entry point, with declarative rules.
- **Requires an Ingress Controller:** the Ingress resource itself is just the rule — it needs a running controller (nginx, traefik, etc.) that actually implements the routing.

> This completes the traffic path: **Ingress** receives from outside → routes to a **Service** → which load balances among live **Pods** at that moment.

### Secrets

**What it is:** sensitive data (tokens, passwords, API keys, certificates) injected into pods as environment variables or mounted files, without being hardcoded in the image or manifest.

- **Why it exists:** separates sensitive configuration from the image artifact — the same image can run in different environments (dev, prod) receiving different secrets, without rebuilding anything.
- **Security note:** by default Secrets are only base64-encoded, not encrypted at rest — real protection depends on RBAC (who can read them) and, if more is needed, encryption in `etcd` or an external manager (Vault, sealed-secrets).

### Namespaces

**What it is:** a logical partition of the cluster — divides a single physical cluster into isolated compartments by environment (dev/staging/prod), by team, or by project.

- **Why it exists:** pods, Services, and Secrets with the same name can coexist in different namespaces without colliding. It's the unit on which resource quotas are applied and, above all, on which it's defined who is allowed to do what.
- **Direct consequence:** a namespace alone doesn't prevent someone with cluster access from touching resources in another namespace — the separation is organizational, not security, until combined with RBAC.

### RBAC

**What it is:** Role-Based Access Control — the mechanism that defines what identity (user, service account) can perform what action (get, create, delete) on what resource (pods, secrets, services), typically scoped to a namespace.

- **Why it exists:** it's the piece that turns the logical partitioning of namespaces into real isolation. Without RBAC, namespaces are just organization; with RBAC, they become permission boundaries.
- **Where else it applies:** it's also the mechanism that controls, for example, who can read a Secret — closing the loop between the two concepts.

## Control plane vs. nodes

- **Control plane** — the brain: API, scheduler, controllers, and desired-state storage. Decides and monitors that the system matches what's declared.
- **Nodes / workers** — the muscle: run the pods, the container runtime, and the agents that communicate the actual state to the control plane.

The system works **declaratively**: the desired state is declared and controllers reconcile the current state toward that goal — the same principle found in [ops-iac](../ops-iac/) and [ops-cd](../ops-cd/).

## Kubernetes bare-metal

The cluster can be installed on cloud VMs (managed by the provider) or on your own physical servers. On bare-metal, the node's operating system and installation become part of the problem — and there are distributions designed specifically for that.

| Distribution | Profile                                       | Stands out in                                |
| ------------ | -------------------------------------------- | ----------------------------------------- |
| **Talos**    | Immutable OS designed only for Kubernetes   | Security, API management, no SSH       |
| **RKE2**     | Hardened Kubernetes from Rancher, with containerd | CIS compliance, simple installation      |

- **Talos** is an operating system that exists for nothing other than running Kubernetes: immutable (nothing is installed or modified at runtime), no SSH or interactive shell — managed entirely via API, with certificates. Each node is identical and reproducible, which fits the declarative model.
- **RKE2** is Rancher's distribution: a single binary brings up the cluster with containerd and hardened components, aligned to CIS benchmarks. Less radical than Talos (it's still an OS with services), but simpler to operate than setting up a cluster with `kubeadm` manually.
- The physical installation of these nodes relies on provisioning and out-of-band from [ops-hardware](../ops-hardware/).

## Networking and Storage

Kubernetes doesn't implement networking or storage itself: it defines standard interfaces — **CNI** and **CSI** — and lets a plugin implement them. The cluster declares _what_ it needs; the plugin resolves _how_ to get it against the real infrastructure.

### CNI (Container Network Interface)

**What it is:** the interface that connects the cluster with the network plugin. Kubernetes uses it so each pod gets its own IP and so pods on different nodes can communicate as if they were on the same network.

- **Why it exists:** the cluster network can be resolved in many ways (overlay tunnels, eBPF in the kernel, cloud network integration). Kubernetes doesn't decide which to use: it delegates the decision to the plugin and remains agnostic to the _how_.
- **What the cluster requires:** each pod with its own IP, pod-to-pod communication across nodes and — if the plugin supports it — network policies that say which pods can talk to each other.
- **The plugin is the implementation:** the actual topology of that network (tunnels, encapsulation, speed) lives in the plugin, not in Kubernetes. The overlay layers built on top are covered in [ops-sdn](../ops-sdn/).

> The Service relies on this: it load balances among pods that _have IPs_ thanks to the CNI. Pod networking and Service form the "inside" of the cluster; Ingress opens that inside to the outside.

### CSI (Container Storage Interface)

**What it is:** the interface that connects the cluster with the storage plugin. Kubernetes uses it so the plugin provisions, attaches, and mounts volumes in pods.

- **Why it exists:** a pod's local write layer is ephemeral by design — it dies with the pod. When data must survive (a database, application files), you need a volume that can be mounted, unmounted, and remounted on another node without losing anything.
- **Declarative end to end:** the pod declares how much and what type of storage it needs; the plugin materializes it against the real backend — a cloud disk, a shared filesystem, an object backend.
- **The plugin is the bridge:** the _how_ (which backend, block/file/object) is the plugin's concern, not the cluster's. The storage types behind it are covered in [ops-storage](../ops-storage/).

### Ingress Controller

**What it is:** the plugin that materializes the Ingress resource — the one that actually listens for incoming traffic, applies the declared rules, and forwards it to the correct Service.

- **Why it exists:** the Ingress resource is just the rule (domain → Service). Without a running controller, the rule does nothing: the controller brings up the actual proxy/load balancer that receives requests and routes them.
- **It's where Ingress touches the traffic layer:** controllers are proxies or load balancers running inside the cluster; the mechanics of that traffic — routing, TLS, load balancing — are covered in [ops-traffic](../ops-traffic/).

> In summary: CNI gives pods networking, CSI gives them surviving data, and Ingress Controller opens the cluster to the outside — while Service and Ingress (covered above) are the logical part that organizes traffic.

## Packaging and extensibility

| Piece         | What it is                                                                            |
| ------------- | --------------------------------------------------------------------------------- |
| **Helm**      | Packaging and versioning of complete apps: reusable and updatable charts  |
| **Operators** | Controllers with business logic: manage the app as a self-managed resource |

- **Helm** turns a system of many manifests into an installable package, with configurable values and easy upgrades.
- **Operator pattern** automates the human: instead of someone doing backups, upgrades, and failover manually, the operator does it by rules.
