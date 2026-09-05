---
layout: ../../../layouts/Layout.astro
eyebrow: Ops
title: Ops Backup
subtitle: Backup and disaster recovery
---

No system deserves to be run without an answer to one question: if this disappears today, how much do we lose and when are we back? Backup and disaster recovery turn that question into numbers and real procedures.

## RPO and RTO

The two numbers that define any backup strategy.

| Acronym | What it is                                        | Question it answers                      |
| ----- | --------------------------------------------- | ------------------------------------------ |
| **RPO** | Maximum acceptable data loss           | How old can the latest backup be? |
| **RTO** | Maximum acceptable time to be operational again | How long does it take to recover the service? |

- **Small RPO** (minutes) → near-continuous backups/streaming, more expensive.
- **Small RTO** → rehearsed and fast recovery, more robotic.
- The entire strategy is negotiated between these two numbers and cost.

## Backup strategies

| Strategy            | What it does                                        | When                      |
| --------------------- | ----------------------------------------------- | --------------------------- |
| **Full backup**   | Copy of the entire dataset                        | Schema foundation, milestones     |
| **Incremental**       | Only what changed since the last backup       | Daily wind, space savings |
| **Point-in-Time Recovery** | Return to an exact moment (second/minute) | Fix specific error, undo a bad action |

- **PITR** combines periodic backups + continuous log/record: allows "rewinding" state to an instant before the disaster.
- **Backup ≠ replica** — the replica protects against node failure (see [ops-dbadmin](../ops-dbadmin/)); the backup protects against accidental deletion and corruption. Replicating an error is just more copies of the error.

## Off-site replication

- **Cross-region / off-site** — copies in another physical location: a DC fire shouldn't take the backup with it.
- **Off-site rule 3-2-1** — 3 copies, 2 different media, 1 off-site.
- **Regions** — in the cloud, replicate to another region / zone. See [ops-cloud](../ops-cloud/).

## Backup in Kubernetes

| Platform | Profile                    | Use                                   |
| ---------- | ------------------------- | ------------------------------------- |
| **Velero** | Cluster backup/restore | Backup of k8s resources and volumes  |

- **Velero** backs up the cluster's declarative resources and volumes, with restore targeted to a specific moment/environment.
- Like everything in Kubernetes: backup is also declarative and automatable. See [ops-kubernetes](../ops-kubernetes/).

## Restoration testing

A backup that was never recovered isn't a backup: it's a hope.

- **Regular rehearsed restore** — recover in a test environment periodically, not on the day of the fire.
- **DR runbooks** — written and validated steps to rebuild from scratch: data, apps, and infrastructure. See [ops-iac](../ops-iac/) for the reproducible part.
- **Automation** — backup doesn't depend on a human remembering: it's scheduled, alerted, and verified. See [ops-observability](../ops-observability/).

> The good news about backup: the strategies are known and proven. The bad: you learn them the day you postpone them.
