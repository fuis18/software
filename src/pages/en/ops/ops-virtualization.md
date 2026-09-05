---
layout: ../../../layouts/Layout.astro
eyebrow: Ops
title: Ops Virtualization
subtitle: Virtual machines and hypervisors
---

Virtualization allows running many operating systems on the same physical machine, isolating each one from the rest. It is the technology that made modern hardware cost-effective and the midpoint between bare metal and containers.

## Hypervisors

The **hypervisor** (or VMM) is the software that creates, isolates, and manages virtual machines on the hardware.

| Type       | Where it runs                              | Typical use                                  |
| ---------- | ---------------------------------------- | ------------------------------------------- |
| **Type 1** | Directly on the hardware (`bare-metal`) | Datacenters, production, maximum performance |
| **Type 2** | On a host operating system     | Laboratories, dev on laptop                 |

Type 1 hypervisors are the datacenter standard: by not depending on an intermediate OS, they waste fewer resources and are more secure.

| Platform         | Profile                                    | Stands out in                                     |
| ------------------ | ----------------------------------------- | ---------------------------------------------- |
| **KVM**            | Open-source virtualization on Linux | De facto standard, foundation of many clouds        |
| **vSphere / ESXi** | VMware enterprise hypervisor           | Enterprises, mature clustering features       |
| **Proxmox VE**     | All-in-one platform on KVM          | Homelab and SMBs, simple web panel              |
| **Nutanix AHV**    | Included in hyperconverged platforms | HCI consolidation                              |
| **OpenStack**      | Private cloud platform                | Providers wanting their own internal cloud |

## VM vs. Bare Metal vs. Containers

| Criterion        | Bare metal             | VM                   | Container              |
| --------------- | ---------------------- | -------------------- | ----------------------- |
| **Isolation** | Total physical           | By hypervisor       | By shared kernel   |
| **Overhead**    | None                | One OS per VM         | Minimal                  |
| **Boot time**    | Minutes                | Seconds to minutes   | Milliseconds            |
| **Density**    | One workload per server | Dozens per server | Hundreds per server    |
| **Model**      | Total dedication       | Consolidation        | Scaling and portability |

**How to choose:**

- **Bare metal** — when the workload needs the entire machine (high performance, minimum latency).
- **VM** — when you want to consolidate or run different OSes on the same hardware; the hypervisor is the limit.
- **Containers** — when portability and horizontal scaling matter most; they run on top of VMs or bare metal. See [ops-containers](../ops-containers/).

> Virtualization and containers don't compete: the common practice is to have the hypervisor as the base layer and run containers inside VMs.
