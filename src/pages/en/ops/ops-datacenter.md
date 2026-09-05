---
layout: ../../../layouts/Layout.astro
eyebrow: Ops
title: Ops Datacenter
subtitle: Server room operations and facilities
---

Once hardware is provisioned, it needs to be sustained: where machines live, there are decisions about space, power, cooling, and security that determine whether the infrastructure holds up or fails.

## Rack Management

The rack is the physical unit where hardware is housed.

| Concept                | What it is                                                                      |
| ----------------------- | --------------------------------------------------------------------------- |
| **U (rack unit)**       | Standard height unit (1U ≈ 4.45 cm) for sizing equipment           |
| **Density**            | How loaded the rack is in compute, network, and power                      |
| **Cable management**    | Organization of network and power cables for orderly maintenance |
| **Location & airflow** | Front/rear layout and cold/hot air directions             |

- **Balanced density** — stacking too much compute in a rack demands more power and cooling than the rack can deliver: the bottleneck usually shifts from compute to infrastructure.
- **Consistent labeling** — every switch port, every power outlet, and every device documented, because during a physical change there's no time to guess.

## Environmental & Security

The non-technical that sustains all the technical.

### Power

- **PDU (Power Distribution Unit):** manageable power strips mounted in the rack that distribute power to servers and measure consumption per outlet.
- **UPS (Uninterruptible Power Supply):** online batteries that clean the electrical signal and sustain the load instantly during a power outage, while the generator starts.
- **ATS (Automatic Transfer Switch):** switch that transparently transfers datacenter power from the commercial grid to the generator.
- **Generators:** diesel generators that provide continuous electrical autonomy during prolonged outages.
- **N+1 / 2N redundancy:** duplicating power paths (A and B sources in the server, connected to different UPS units) to maintain the electrical network without shutting down equipment.

### Cooling

- **CRAC / CRAH:** precision air conditioning that continuously regulates temperature and humidity (not designed for human comfort, but for hardware).
- **Hot/cold aisles:** physical design that isolates cold air injection (front of the rack) from hot air extraction (rear of the rack).

### Fire Protection

- **Clean agents (FM-200, Novec 1230, Inergen):** gas suppression systems that suffocate fire by smothering, without using water or damaging electronics.

### Physical Security

- **CCTV and biometric control:** continuous video monitoring and restricted access (RFID cards, fingerprint, iris) with auditable entry logs.

### Environmental Monitoring

- **DCIM (Data Center Infrastructure Management):** temperature, humidity, and water leak detection sensors integrated into the datacenter management system, to alert before a thermal failure. Complements the server monitoring described in [ops-observability](../ops-observability/).

## Operations

The daily work of running the room.

- **Monitoring** — room temperature and humidity along with server status. See [ops-observability](../ops-observability/).
- **Hardware changes** — failing disk, depleting RAM, damaged network card: physical diagnosis, replacement, and verification.
- **Planned maintenance** — documented maintenance windows, with predicted impact and approval, so nothing is touched unexpectedly.
- **Inventory** — every physical asset known: what it is, where it is, what it's connected to, and what runs on it. This anchors the information from [ops-hardware](../ops-hardware/).

> Operating a datacenter is managing finite resources — power, cooling, space — with the same discipline used to manage compute resources.
