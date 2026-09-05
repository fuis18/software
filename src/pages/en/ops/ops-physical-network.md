---
layout: ../../../layouts/Layout.astro
eyebrow: Ops
title: Ops Physical Network
subtitle: How data travels at the physical layer
---

The foundation of everything: before the cloud, containers, or code, data travels through cables, switches, and routers. This is how traffic moves at the physical level, how the network is segmented, and what passive infrastructure supports it.

## Routing & Switching

The fundamental difference: **switches** connect devices within the same network (layer 2, working with MAC addresses) and **routers** connect networks to each other (layer 3, working with IP addresses).

| Piece           | Layer | What it does                                                        | When to use                                  |
| --------------- | ---- | --------------------------------------------------------------- | ---------------------------------------------- |
| **Switch**      | L2   | Forwards frames between devices on the same subnet            | Internal network, VLAN segmentation            |
| **Router**      | L3   | Routes packets between different networks                           | Internet exit, subnet interconnection   |
| **L3 Switch**   | L2+L3| High-speed switching with routing capabilities     | Network core in datacenters and campuses            |
| **Access Point**| L1/L2| Connects wireless devices to the wired network             | Wi-Fi in offices, homelab                     |

### Key concepts

- **Gateway** — the device through which traffic exits to other networks.
- **Subnet / mask** — how a large network is divided into smaller segments.
- **VLAN** — logical segmentation: divides the network into groups (production, IoT, guests) without needing additional hardware.
- **Trunk** — link that carries multiple VLANs between switches.

## Physical layer protocols

| Protocol        | Layer | Use                                                        |
| ---------------- | ---- | ---------------------------------------------------------- |
| **Ethernet**     | L1/L2| De facto standard for cabling: frames, MAC addresses    |
| **Wi-Fi / WLAN** | L1/L2| Wireless connections within a local area            |
| **Fiber optic** | L1   | Long-distance, high-speed links (datacenter)    |
| **PoE**          | L1   | Power delivery over the same data cable    |

- **Ethernet** defines how data is formatted and sent over the cable; covers the physical and data link layers.
- **Fiber** is used when distance or speed matters more than transceiver cost.
- **PoE** enables powering cameras, access points, and small switches without extra outlets.

## Passive infrastructure

Everything that doesn't process data but makes it possible for data to travel.

- **Structured cabling** — the physical layout of patching, category, and service entrance that connects racks, rooms, and floors.
- **Patch panels** — the point where cabling terminates and each port connects to the switch.
- **Racks and organizers** — the physical support where switches, routers, and servers are mounted, with cable management.
- **VLANs and subnets by use** — the first layer of logical organization: each device group (production, management, guests) in its own isolated segment. See [ops-hardware](../ops-hardware/).

> Physical topology matters for network mapping: which switch port reaches which device and which VLAN each one passes through.
