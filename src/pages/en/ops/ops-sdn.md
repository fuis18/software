---
layout: ../../../layouts/Layout.astro
eyebrow: Ops
title: Ops SDN
subtitle: Software-defined networks and overlay layers
---

On top of the physical network, another logical network is built: encrypted tunnels between machines, virtual networks across clouds, and service meshes. These are the overlay layers that create connectivity where it doesn't physically exist.

## Underlay vs. Overlay

- **Underlay** — the physical network of cables, switches, and routers (see [ops-physical-network](../ops-physical-network/)).
- **Overlay** — the virtual network built on top, using the physical as transport: tunnels connecting points that aren't physically connected.

The **tunnel** is the base unit of the overlay: a network packet is encapsulated inside another packet that can travel over the physical network, arriving encrypted end to end.

- **Why this separation exists:** the underlay doesn't know or care what runs on top — it just moves packets between physically connected points. The overlay gives logical shape to the network: it decides which machines "see" each other, even if they're on different physical networks, clouds, or countries.
- **Direct consequence:** everything that follows in this document (VPNs, cloud virtual networks, service mesh) is a variation of the same pattern — overlay on underlay — applied at different levels: between people and machines, between clouds, and between services within a cluster.

## VPNs and Personal Meshes

Tunnels designed to connect machines and people to each other, typically outside the context of a specific cloud or cluster.

- **Why it exists:** connecting two machines on different networks (a laptop in a café, a server at home, a NAS in another city) without exposing them directly to the internet or depending on someone opening ports on a router.

### WireGuard

**Profile:** modern tunnel protocol — minimalistic code (unlike OpenVPN or IPsec, which are much larger and more complex), designed to live inside the kernel.

- **Strengths:** fast (low overhead compared to older solutions), easy to audit due to its small codebase, simple configuration (a pair of public/private keys and done).
- **Use cases:** traditional point-to-point VPNs, site-to-site connections (joining an office network with a datacenter), foundation for building higher-level tools.
- **Weaknesses:** by itself it's just the tunnel — doesn't handle peer discovery, automatic NAT traversal, or identity management; that must be built separately or use something built on top (like Tailscale).
- **Performance:** among the fastest available — living in the kernel avoids the overhead of moving to userspace for every packet.

### Tailscale

**Profile:** personal mesh VPN built on WireGuard, automating everything WireGuard leaves manual.

- **Strengths:** each machine (laptop, NAS, server) joins the private network with a single command, without opening ports or configuring routers — automatically resolves NAT traversal using third-party coordination servers.
- **Use cases:** accessing home or office network from anywhere, connecting personal devices privately, environments where you don't want to/can't touch router configuration.
- **Weaknesses:** depends on Tailscale's coordination infrastructure (though the data traffic itself travels peer-to-peer when possible); it's a convenience layer, not a replacement for corporate VPNs with more granular policies.
- **Relationship with WireGuard:** Tailscale doesn't reinvent the tunnel — it uses WireGuard underneath for encryption and transport, and adds the coordination, identity, and NAT traversal layer on top.

### ZTNA (Zero Trust Network Access)

**What it is:** the identity-based, not location-based access model — being inside the network no longer guarantees access; each connection is verified by session and policy, regardless of whether it comes from the office LAN or the internet.

- **Why it exists:** the traditional model (perimeter + VPN = total trust inside) fails when someone compromises a single machine inside the network and moves laterally without further friction. ZTNA eliminates that implicit trust: every request is evaluated as if it came from outside.
- **Relies on the same tunnel and mesh infrastructure** described above: the authorized person reaches the specific resource without the rest of the network being exposed. The complete definition lives in [ops-netsecurity](../ops-netsecurity/).

| Platform    | Profile                            | Typical use                                                  |
| ------------- | --------------------------------- | ----------------------------------------------------------- |
| **WireGuard** | Modern, simple, efficient tunnel | Traditional VPNs, site-to-site                            |
| **Tailscale** | Personal mesh over WireGuard    | Access your network from anywhere without configuring routers |

## Virtual Network in the Cloud

The same overlay pattern, applied inside a cloud provider: isolating and controlling which resources communicate with each other.

- **Why it exists:** in the cloud, resources don't have their own physical network that can be wired by hand — the VPC is how the provider gives each customer a logically isolated network, even though the underlying hardware is shared with other customers.

### VPC / Virtual Network

**What it is:** the isolated, controllable network space where cloud resources (VMs, databases, load balancers) live — defines private IP ranges, subnets, and its own traffic rules.

- **Core strength:** everything running inside a VPC is isolated by default from other VPCs and the internet, unless an exit (gateway) or connection (peering) is explicitly opened.
- **Direct consequence:** it's the foundation on which the rest of the cloud security model is applied — without a well-segmented VPC, IAM and firewalls end up compensating for a weak network design. See [ops-cloud](../ops-cloud/) and [ops-netsecurity](../ops-netsecurity/).

### VPC Peering

**What it is:** joining two virtual networks so they communicate privately, as if they were a single network, without going through the internet.

- **Strength:** private traffic between VPCs (yours or from another account/organization), generally without the transfer costs that public traffic would have, and with lower latency.
- **Weakness:** peering is not transitive — if A is peered with B, and B with C, A can't talk to C automatically; each relationship must be created explicitly. In architectures with many VPCs this can become a mesh hard to maintain (that's where _transit gateway_ solutions come in).

### Gateway

**What it is:** the exit/entry point of the virtual network to the rest — internet, another VPC, or an on-premise network.

- **Different types based on traffic direction:** an _internet gateway_ allows public exit/entry, a _NAT gateway_ allows exit without exposing private IPs, a _VPN/transit gateway_ connects with networks outside the cloud. Each solves a different case of "what can enter or exit and through where."

| Piece                 | What it is                                                        |
| --------------------- | ------------------------------------------------------------- |
| **VPC / virtual network** | Isolated, controllable network where cloud resources live |
| **VPC Peering**       | Join two virtual networks for private communication  |
| **Gateway**           | Exit/entry point of the virtual network to the rest            |

## Service Mesh

The same overlay pattern, applied one level deeper: not between networks or between machines, but between services of the same distributed application.

- **Why it exists:** when an app goes from being a monolith to dozens of microservices, communication between them (which used to be a simple function call) becomes network traffic — with all the problems that brings: latency, partial failures, need for encryption, and lack of visibility into who talks to whom. The mesh centralizes the solution to these problems in an infrastructure layer, instead of each service solving it on its own.
- **What it specifically solves:** automatic retries and timeouts for transient failures, mutual encryption (mTLS) between services without each implementing it, traffic observability (who calls whom, with what latency, with what error rate), and access policies (which service can talk to which).
- **The cost:** the mesh adds its own infrastructure — an extra proxy per service, another control plane to operate. It makes sense in large systems where centralized traffic control justifies that cost; in small systems, it's usually extra complexity. See [ops-kubernetes](../ops-kubernetes/).

### Cilium

**Profile:** eBPF-based cluster networking — programs the Linux kernel directly to handle traffic, instead of depending on userspace proxies.

- **Strengths:** much lower overhead than sidecar/proxy-based solutions, because filtering and routing happens at kernel level; provides very detailed network visibility (who talks to whom at packet level) almost for free, thanks to eBPF.
- **Use cases:** Kubernetes CNI (network plugin) focused on performance and low-level network security; clusters where the overhead of a sidecar per pod is not acceptable.
- **Weaknesses:** eBPF and the Linux kernel are the foundation — doesn't apply equally outside Linux; the eBPF learning curve is real if you need to go beyond standard configuration.
- **Performance:** the best profile of the two — operating at kernel level avoids the extra jump to userspace that Istio/Envoy proxies have.

### Istio

**Profile:** classic application mesh — a proxy (Envoy) per pod/service (sidecar pattern), with a centralized control plane that configures all those proxies.

- **Strengths:** very granular application-level control (routing by version, canary releases, circuit breaking, per-endpoint retry policies), mature ecosystem widely used in production.
- **Use cases:** large systems with many microservices where fine-grained control of HTTP/gRPC traffic between them is needed — canary deployments, infrastructure-level A/B testing, mandatory mTLS between all services.
- **Weaknesses:** the sidecar pattern means an extra proxy running alongside each pod — more memory/CPU consumption per service, and more latency from the extra jump to userspace on each request.
- **Performance:** heavier than Cilium by design (userspace proxy vs. kernel), but in exchange provides application-level control (HTTP/gRPC) that eBPF alone can't see.

> Cilium and Istio don't always compete — many clusters use Cilium as the base CNI (L3/L4 networking and security) and Istio (or another mesh) on top for application-layer (L7) needs. Cilium even offers its own sidecar-less mesh mode, using eBPF to cover part of what a traditional sidecar did.

| Piece            | What it is                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------- |
| **Service Mesh** | Layer managing service-to-service communication (retries, TLS, observability, policy) |
| **Cilium**       | Cluster networking with eBPF: security and observability at the network/kernel level           |
| **Istio**        | Application mesh: per-app proxy with centralized control                                    |
