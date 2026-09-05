---
layout: ../../../layouts/Layout.astro
eyebrow: Ops
title: Ops Storage
subtitle: Persisting distributed data — object, block, and file
---

Storage has three fundamental forms that differ by access model and latency: **block** (by blocks, at disk level), **file** (by files and folders, network protocol), and **object** (by objects with metadata, HTTP). Choosing each type well is an architectural decision.

This hierarchy (block → file → object) is also a hierarchy of **how far you can scale**: block is usually tied to a host or a very close network; file already assumes shared network between multiple machines; object was designed from day one to scale to planetary level, at the cost of giving up low latency and filesystem-type operations (you can't "open and modify" an object, you replace it entirely).

## Object Storage

The cloud world model: each piece of data is an object with a unique identifier and metadata, stored via HTTP API without hierarchical structure.

- **Why it exists:** traditional filesystems don't scale well to billions of files or multiple datacenters — object storage solves this by flattening everything into a key-value namespace, without real directories (the "folders" you see in an S3 bucket are just prefixes in the key name).
- **Ideal for:** media, backups, data lakes, immutable data — data that's written once and read many times (WORM pattern: _write once, read many_).
- **Structural weakness:** not suitable for data that changes frequently in partial ways (you can't edit a byte in the middle of an object, you have to rewrite it entirely) or for workloads that need consistent millisecond latency.
- **The S3 API became the common language:** almost every self-hosted object backend implements the same API as S3, which allows choosing a compatible backend and migrating without rewriting application code.

### Platforms

- **S3 (AWS):** the de facto standard and the one that defines the protocol everyone else replicates. Main strength: extreme durability (11 nines) and native integration with the rest of the AWS ecosystem. Weakness: egress cost if a lot of traffic goes outside AWS, and vendor dependency.
- **MinIO:** self-hosted object storage, compatible with the S3 API. Strength: running the same S3 mental model on-premise or in any cloud, focused on high performance (designed for your own clusters, not just as a "home S3"). Typical use case: private data lakes, internal backups without going to the public cloud.
- **Ceph RGW (RADOS Gateway):** the object interface on an existing Ceph cluster. Strength: if you already have Ceph running (for block or file), enabling RGW gives object storage without additional infrastructure. Weakness: inherits the operational complexity of managing Ceph.

## Block Storage

Sector-level storage, as seen by an operating system: the disk that gets formatted and mounted.

- **Why it exists:** it's the lowest and fastest level of storage abstraction — the OS (or hypervisor) treats it exactly like a physical disk, making it the only type suitable for latency-sensitive workloads like transactional databases or a VM's root filesystem.
- **Ideal for:** classic workloads — databases, VM/container filesystems. See [ops-dbadmin](../ops-dbadmin/) for details on how databases depend on this low latency.
- **Structural weakness:** not designed to be shared between multiple hosts simultaneously (a block volume is typically mounted by a single consumer); sharing it requires a layer on top (that's where file storage comes in).
- **In Kubernetes** it arrives via CSI (Container Storage Interface), the standard that allows a cluster to request block volumes declaratively without coupling to the provider. See [ops-kubernetes](../ops-kubernetes/).

### Platforms

- **EBS (AWS):** the disks attached to VMs (EC2) in the cloud. Strength: built-in snapshots, different performance tiers (gp3, io2) depending on how many IOPS the workload needs. Use case: instance roots, managed database disks.
- **Longhorn:** distributed block storage designed for Kubernetes — each volume is replicated across cluster nodes. Strength: native to k8s, simpler to operate than Ceph. Use case: on-prem or bare-metal clusters needing PersistentVolumes without depending on a cloud provider.
- **Ceph RBD (RADOS Block Device):** distributed block on a Ceph cluster. Strength: scalability and maturity — the most proven self-hosted option for large-scale block. Weakness: higher operational curve than Longhorn.
- **iSCSI:** not a platform but the protocol that allows exporting a block volume over the network to another host, as if it were a local disk. It's the piece many of the above platforms use underneath to "deliver" the volume.

## File Storage

Sharing files over the network between multiple machines as if they were local folders.

- **Why it exists:** covers the case block can't — multiple machines needing to read and write on the same folder hierarchy simultaneously, with normal filesystem semantics (permissions, locks, paths).
- **Ideal for:** shared configuration, home directories, any case where multiple processes on different hosts need to see exactly the same files, with the same paths.
- **Structural weakness:** slower than block (there's a network and protocol layer in between) and less scalable than object for massive volumes — not the choice for petabytes of immutable data.

### Platforms / Protocols

- **NFS (Network File System):** the standard protocol in the Linux/Unix world. Strength: simple, universally supported by VMs and containers. Use case: sharing configuration or data between Linux pods/hosts.
- **EFS (AWS):** the managed version of shared file storage in AWS, designed for many VMs to mount the same elastic filesystem. Strength: scales automatically, no need to manage your own NFS servers. Weakness: higher latency than EBS, cost per usage can increase with high traffic.
- **CephFS:** file storage on a Ceph cluster. Strength: if you already have Ceph for block or object, adding CephFS gives the third leg without new infrastructure. Use case: self-hosted environments wanting all three types (block, file, object) from a single cluster.
- **SMB:** protocol equivalent to NFS but for the Windows world — also what most home/enterprise NAS devices understand. Use case: sharing with Windows workstations or NAS devices.
- **NAS (Network Attached Storage):** the dedicated device that exposes file storage via SMB/NFS to the entire network — the typical form of shared storage in homes and SMBs. A multi-bay NAS usually runs its own system (TrueNAS, OpenMediaVault) with its own volumes and snapshots; what it stores is backed up like anything else, see [ops-backup](../ops-backup/).

## How to choose

The question isn't "which is better?" but **what does the workload really need**: latency, whether it's shared between hosts, and whether the data changes or is immutable.

| If the workload needs...                                       | Choose                 |
| ------------------------------------------------------------- | ---------------------- |
| Low-latency disk for a host or a database                  | **Block**              |
| Multiple machines sharing a filesystem                   | **File**               |
| Huge, immutable, cheap volumes (backup, media, lake) | **Object**             |
| Starting with open source and not depending on the cloud           | **Ceph / MinIO / NFS** |

> The same infrastructure usually uses all three types at once: block for databases, file for sharing config, object for history.
> Redundancy and recovery strategy for each type are covered in [ops-backup](../ops-backup/).
