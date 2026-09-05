---
layout: ../../../layouts/Layout.astro
title: Ops
subtitle: Infrastructure, automation, and systems
---

The entire infrastructure lifecycle: from physical cabling and datacenter racks to what runs in production and how it's measured. How hardware is provisioned and configured, how workloads are contained and orchestrated, how delivery and deployment are automated, and how the system is sustained over time — with alerts, metrics, and reliability practices.

## Physical Network, Hardware, and Data Center

### [ops-physical-network](ops-physical-network/)

How data travels at the cable and equipment level: routing and switching, physical layer protocols, and passive infrastructure connecting every machine — cabling, patch panels, and VLANs that segment the network.

### [ops-hardware](ops-hardware/)

The actual compute behind everything: bare-metal servers, server operating systems, out-of-band management for managing machines without an OS booted, and physical provisioning.

### [ops-datacenter](ops-datacenter/)

The operations and facilities that sustain hardware: rack management, power, cooling, physical security, and the day-to-day work of operating a server room.

## Compute and Cloud

### [ops-cloud](ops-cloud/)

Third-party infrastructure as a service: public cloud providers, cloud architecture concepts (regions, zones, virtual networks, and access control), and cost management.

### [ops-virtualization](ops-virtualization/)

Virtual machines and hypervisors: what virtualization is, where each hypervisor runs, and when a VM is preferable to bare metal or containers.

### [ops-containers](ops-containers/)

Containers and runtimes: images, registries, container networking, and security scanning of what gets packaged.

### [ops-kubernetes](ops-kubernetes/)

Container orchestration at scale: control plane, cluster networking, storage, traffic ingress, packaging, and operators.

## Storage

### [ops-storage](ops-storage/)

The three ways to persist distributed data — object, block, and file — compared by protocol, latency, and use case.

## NetOps

### [ops-netsecurity](ops-netsecurity/)

Perimeter and host defense: dedicated firewalls, protection against edge-targeted attacks, intrusion detection with Snort/Suricata/Zeek, event correlation with SIEM (Wazuh, Splunk), OS local access rules, and access control.

### [ops-traffic](ops-traffic/)

How traffic is routed and accelerated to services: name resolution, content delivery edge, reverse proxies, load balancers, and certificates.

### [ops-sdn](ops-sdn/)

Software-defined networking and overlay layers: tunnels between machines, cross-cloud connections, and service meshes.

## CI/CD and Release Ops

### [ops-ci](ops-ci/)

Continuous integration: pipelines that build, test, and scan every code change before it reaches production.

### [ops-cd](ops-cd/)

Continuous delivery and deployment: the repository as the source of truth, progressive rollouts, and strategies for shipping changes without breaking users.

### [ops-iac](ops-iac/)

Infrastructure and configuration as code: the difference between provisioning resources and configuring servers, idempotency, and the declarative flow that ties infrastructure to the application.

## SRE and Observability

### [ops-observability](ops-observability/)

The three signals for understanding what happens in production — metrics, logs, and traces — and the dashboards that visualize them.

### [ops-incident](ops-incident/)

Incident and alert management: defining measurable reliability objectives, alerting the right person, and learning from every outage with post-mortems.

### [ops-reliability](ops-reliability/)

Reliability and chaos engineering: capacity sizing, autoscaling, self-healing systems, and intentionally breaking things to discover how what was built fails.

## DataOps / DBRE

### [ops-dbadmin](ops-dbadmin/)

Database administration and scaling: replication, sharding, schema migrations, and the work of operating data engines in production.

### [ops-dataops](ops-dataops/)

Data pipelines and workflows: job orchestration, event streams, and data lake architecture.

### [ops-backup](ops-backup/)

Backup and disaster recovery: defining how much data can be lost and how long it takes to recover, and point-in-time recovery and off-site replication strategies.

## Self-Hosted Services

### [ops-selfhosted](ops-selfhosted/)

Personal services for home or self-hosted infrastructure: media servers, the automation around them, downloaders, and utilities that sustain the home network.
