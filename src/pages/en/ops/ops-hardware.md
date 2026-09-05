---
layout: ../../../layouts/Layout.astro
eyebrow: Ops
title: Ops Hardware
subtitle: The real computing behind everything
---

The physical machine that runs the software: what a bare-metal server is, what operating system it runs, how to manage it without depending on the installed OS, and how to provision it when new hardware arrives.

## Bare Metal Servers

A **bare metal** server is a dedicated physical machine with no virtualization layer between the hardware and the operating system. Unlike VMs, all the hardware is yours: no "noisy neighbors" competing for CPU or I/O.

### Differences

| Aspecto         | Bare metal             | VM                  | Container            |
| --------------- | ---------------------- | ------------------- | --------------------- |
| **Isolation** | By hardware           | By hypervisor      | By shared kernel |
| **Performance** | Maximum, no overhead   | Small overhead    | Near-native           |
| **Provisioning**  | Slow (physical)         | Fast              | Instant           |
| **Typical use**  | Large databases | Operating systems | Microservices        |

**How to choose:** bare metal when you need all the performance or minimum latency without competition; VMs when you want to consolidate multiple systems onto a single machine; containers when portability and scaling speed matter most.

## Server Operating Systems

- Red Hat Enterprise Linux (RHEL): The paid commercial standard. Offers direct technical support, strict certifications, and maximum corporate stability.

- Rocky Linux: Aims to be a "1:1" clone identical to RHEL. Follows the original code to the letter to ensure that what runs on RHEL works exactly the same on Rocky, without deviating a single millimeter.

- AlmaLinux: More permissive and pragmatic. While maintaining binary compatibility with RHEL, it allows including faster patches, extended support for legacy hardware, or community features without waiting for strict Red Hat approval.

## Out-of-Band (OOB) & IPMI

Managing a machine that cannot boot the operating system — that's why every server has a **BMC** (Baseboard Management Controller): a standalone mini-system with its own management IP.

- **IPMI** — the standard protocol for communicating with the BMC: power on, power off, reboot, view hardware status.
- **Remote console** — view BIOS output and boot the machine as if you had a monitor plugged in.
- **Management network (OOB)** — separate network for administration only, isolated from data traffic.

> Out-of-band access is the last line of control: if the machine doesn't respond over the network, IPMI can power it off and back on.

## Physical Provisioning

The process of bringing up a new machine without installing it manually one by one.

- **Network boot** — boot from the network instead of a physical disk, with predefined answers, to install the OS reproducibly.
- **Post-provisioning** — once the OS is installed, configuration automation (see [ops-iac](../ops-iac/)) takes over: users, packages, hardening, and services.
- **Inventory and labeling** — every machine documented with name, management IP, and role before going into production. See [ops-datacenter](../ops-datacenter/).
