---
layout: ../../../layouts/Layout.astro
eyebrow: Ops
title: Ops NetSecurity
subtitle: Perimeter and host defense
---

The network is the attack surface par excellence: it's how attacks enter and how data leaves. This covers how the edge is defended, how the host is protected, and how access is controlled.

## Dedicated Firewalls

The firewall is the network flow control: which communications are allowed and which are blocked.

| Platform           | Profile                      | Stands out in                             |
| -------------------- | --------------------------- | -------------------------------------- |
| **Palo Alto**        | Enterprise, NGFW            | NGFW, app-level visibility, integration |
| **Fortinet**         | Enterprise/convergent      | Unified hardware + software, cost   |
| **Check Point**      | Classic enterprise          | Maturity, centralized control          |
| **pfSense/opnsense** | Open source, self-hosted | Homelab, SMBs, full control          |

### Definitions

- **Perimeter firewall** — the point between the internal network and the world: central ingress/egress policy.
- **Stateful inspection** — the firewall remembers the state of each connection and only lets through responses to established connections.
- **Deep packet inspection (DPI)** — inspects the application, not just ports: allows/blocks by context, not by port.

## Perimeter Protection

Before traffic touches a service, there are layers that decide what enters and what doesn't. Three concepts cover the perimeter: the one that filters traffic toward apps, the one that absorbs volumetric attacks, and the one that redefines how the network is accessed.

### WAF (Web Application Firewall)

**What it is:** a firewall that operates on web traffic to your applications: instead of deciding by IP and port, it understands the request and blocks what looks like an attack — injections, XSS, exploitation bots.

- **Where it's placed:** in front of web apps, at the ingress edge — another piece of the delivery edge. See [ops-traffic](../ops-traffic/).
- **What it complements (and what it doesn't):** filters what arrives via the network, but doesn't replace the security of the application itself: if the app has a vulnerability, the WAF is a shield, not a cure. The offensive side — the attacks the WAF tries to stop — is studied in [sec](../../sec/).

### DDoS Mitigation

**What it is:** a distributed denial-of-service attack aims to take down service availability by flooding it with traffic — it doesn't steal data, it breaks "being online."

- **Why it's mitigated at the edge:** the weapon is volume; to absorb it requires capacity at scale (CDN/edge, cloud), not a personal firewall that would saturate equally. See [ops-traffic](../ops-traffic/).
- **Absorbing vs. filtering:** withstanding the hit without falling, and distinguishing legitimate from malicious traffic to let only the good through.

### ZTNA (Zero Trust Network Access)

**What it is:** the access model that doesn't trust location: being "inside the network" no longer grants default access — each access is verified by identity, session, and policy, regardless of where it comes from.

- **Why it exists:** the internal network is no longer a trust boundary; access is authorized by session, not by geography.
- **How it materializes:** relies on tunnels and overlay layers that connect the authorized person to the resource, without exposing the network. See [ops-sdn](../ops-sdn/).

### IDS/IPS (Intrusion Detection)

**What it is:** systems that inspect traffic looking for known attack patterns — the IDS detects and alerts, the IPS additionally blocks inline before the packet reaches its destination.

| Tool  | What it does                                                        |
| ------------ | --------------------------------------------------------------- |
| **Snort**    | The classic IDS: signature rules on traffic, open source   |
| **Suricata** | Modern multi-threaded IDS/IPS, faster alternative to Snort       |
| **Zeek**     | Doesn't look for signatures: records and analyzes network behavior |

- **Signatures vs. behavior** — Snort/Suricata compare each packet against thousands of signatures (the Emerging Threats rule base, among others); Zeek generates detailed logs of what happens on the network so another system (or a SIEM) can decide if it's anomalous.
- **Where they live** — at the perimeter inspection point or as a sensor on a mirror/span port; IPS mode requires being inline with traffic, IDS can work on a copy.
- **The link to detection** — IDS alerts are typical SIEM input: they detect the specific event but don't tell the full story of the attack.

### SIEM (Security Information and Event Management)

**What it is:** the system that centralizes logs and events from the entire infrastructure (firewalls, IDS, servers, apps) and correlates them to turn noise into visible incidents.

| Platform        | Profile                                            |
| ----------------- | ------------------------------------------------- |
| **Wazuh**         | Open-source self-hosted SIEM/XDR, per-host agent |
| **Splunk**        | The enterprise standard, high cost             |
| **Security Onion**| Free distribution integrating Suricata + Zeek + ELK |

- **Correlation is the value** — a failed login here, a Snort rule triggered there, and a scan from that IP, individually, mean nothing; together they paint an attack in progress.
- **Lifecycle** — collect → normalize → correlate → alert → investigate: relies on the general stack observability ([ops-observability](../ops-observability/)) but focused on security.
- **Compliance** — log retention and auditable traceability (PCI-DSS, ISO 27001) usually require SIEM by definition.

## Host & OS Security

The last network layer is the operating system itself.

| Mechanism               | What it is                                                |
| ----------------------- | ----------------------------------------------------- |
| **iptables / nftables** | Linux kernel firewall rules on each host      |
| **eBPF**                | Observation and filtering programs inside the kernel |
| **Security Groups**     | Elastic firewall per resource in the cloud              |

- **Local rules** — each host allows/blocks traffic even if the perimeter firewall has already filtered.
- **eBPF** is the evolutionary leap: instead of rewriting the kernel, verifiable programs are injected that observe and filter syscalls and packets in real time.

## Access Control (IAM)

The policy of "who can do what" to the infrastructure.

- **Identities** — users, groups, and service accounts.
- **Policies** — minimum and explicit permissions; nothing by default.
- **Rotation and auditing** — expiring credentials and recorded activity.
- **Multi-factor** — more than one factor to access critical resources.

> IAM spans firewall, cloud, and clusters: without access management, the best perimeter defense ends up being useless — access is managed once and applied everywhere. See [ops-cloud](../ops-cloud/) and [ops-kubernetes](../ops-kubernetes/) (RBAC).
