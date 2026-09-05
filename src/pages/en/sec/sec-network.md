---
layout: ../../../layouts/Layout.astro
eyebrow: Sec
title: Sec Network
subtitle: Networking fundamentals and automation
---

The network is the substrate of every attack and every defense: without understanding how data travels, you can't understand what's being protected or how it breaks. Here are the fundamentals and their automation.

## Fundamentals

| Concept     | What it is                                                      |
| ----------- | --------------------------------------------------------------- |
| **TCP/IP**  | The protocol model that makes the internet possible             |
| **Switching** | Connecting devices within the same network (layer 2)          |
| **Routing** | Connecting networks to each other (layer 3)                     |
| **Firewall**| Controls which communications are allowed and which are blocked  |
| **VPN**     | Encrypted tunnel between separate networks or machines           |
| **DNS**     | Translates human-readable names to IP addresses                  |
| **HTTP**    | The web protocol: requests and responses                         |
| **SSL/TLS** | Encryption in transit: what makes HTTP secure                    |
| **SSH**     | Encrypted remote access to a server                              |
| **FTP/SFTP**| File transfer, with SFTP as the encrypted variant               |

- The physical anatomy (switches, routers, cabling, VLANs) and physical-layer protocols are covered in [ops-physical-network](../../ops/ops-physical-network/); perimeter and host defense in [ops-netsecurity](../../ops/ops-netsecurity/); DNS, certificates, and the edge in [ops-traffic](../../ops/ops-traffic/). This page is the security and automation perspective.

## Analysis with Wireshark

The reference packet analyzer: captures real traffic from an interface and lets you inspect every packet at the protocol level.

- **Capture and filters** — capture what passes through an interface and filter by protocol, IP, port, or content: `tcp.port == 443`, `http.request`, `dns.qry.name`.
- **Stream following** — reconstruct a complete conversation (an HTTP login, a DNS session) to see exactly what was sent.
- **Security use** — verify that traffic is encrypted, detect unexpected traffic, or understand what an offensive tool from [sec-tools](../sec-tools/) does before using it.

## Flow Analysis (NetFlow)

The aggregated counterpart to packet capture: instead of inspecting each packet, **flows** are recorded — a summary of each conversation (who talked to whom, when, how much) in NetFlow/IPFIX/sFlow formats.

| Tool          | What it does                                                     |
| ------------- | ---------------------------------------------------------------- |
| **softflowd** | Exports interface traffic as flow records                       |
| **nfdump**    | Collects (nfcapd) and queries flows via command line             |
| **SiLK**      | CERT suite for large-scale forensic flow analysis                |
| **Akvorado**  | Modern collector: enriches flows and visualizes them             |

- **Flow vs. packet** — a flow doesn't store content, it stores metadata (IPs, ports, bytes, duration): orders of magnitude lighter than capturing everything, and enough to answer "what happened on the network?" without storing full traffic.
- **The pipeline** — softflowd generates records → nfcapd/nfdump or SiLK collect and query them → Akvorado adds enrichment (GeoIP, ASN, interface names) and dashboards on ClickHouse.
- **Which and when** — nfdump for homelab/small businesses, SiLK when volume is high and the focus is forensic, Akvorado for continuous monitoring with visualization.
- **Security use** — detect exfiltration, scanning, and beaconing: flows are the classic raw material for network detection and feed the IDS/SIEM of [ops-netsecurity](../../ops/ops-netsecurity/).

## Network Automation

Configuring network equipment by hand doesn't scale: configuration is treated as code.

| Tool        | What it does                                                 |
| ----------- | ------------------------------------------------------------ |
| **Netmiko** | SSH automation for network devices (Cisco, Juniper, etc.)    |
| **NAPALM**  | Abstraction layer that unifies vendors and platforms         |

- **Netmiko** — connects via SSH to devices and runs commands or configuration: the equivalent of Ansible for switches and routers, with broad vendor support.
- **NAPALM** — abstracts the vendor: the same code reads state and applies config on devices from different manufacturers, without rewriting the logic for each one.

## CCNA and DevNet Path

Cisco's certification paths, the reference manufacturer in networking.

- **CCNA** — the standard for understanding networking end-to-end: switching, routing, VLANs, ACLs, and network security basics. Covers the same as [ops-physical-network](../../ops/ops-physical-network/) but with certification depth.
- **DevNet** — the automation path: device APIs, programmability, model-driven configuration, and the **DevNet sandbox**, a practice environment where you can test automation with real hardware without owning any.

## Cisco Platforms

| Platform       | What it is                                            |
| -------------- | ----------------------------------------------------- |
| **Meraki**     | Cloud-managed networking (switches, APs, firewalls)   |
| **DNA Center** | Enterprise network management and automation center   |

- **Meraki** — networking as SaaS: devices are configured from a central web dashboard, ideal for organizations without a large network team.
- **DNA Center** — enterprise network management: inventory, automation, and analytics for an organization's Cisco infrastructure.

> Networking is the intersection where security and infrastructure meet: that's why this page is the gateway between [ops-physical-network](../../ops/ops-physical-network/) and the rest of the sec section.
