---
layout: ../../../layouts/Layout.astro
eyebrow: Ops
title: Ops Cloud
subtitle: Public cloud, architecture, and FinOps
---

Infrastructure as a third-party service: instead of buying and maintaining hardware, compute, network, and storage are rented from the cloud with pay-as-you-go billing models. This covers cloud architecture concepts and how costs are managed.

## Providers

| Provider      | Profile                         | Stands out in                                            |
| -------------- | ------------------------------ | ----------------------------------------------------- |
| **AWS**        | The largest and most mature         | Massive catalog, industry, certifications           |
| **Azure**      | Microsoft integration          | Enterprise environments, Active Directory, O365         |
| **GCP**        | Data and machine learning       | BigQuery, managed Kubernetes, global network           |

**How to choose:** there is no "winning pyramid"; choose based on the nearby ecosystem (does the company already use the provider's products?), the maturity of the specific service needed, and the team that will operate it.

## Cloud Architecture

Concepts that repeat in any cloud, with names that change slightly between providers.

| Concept        | What it is                                                               |
| --------------- | -------------------------------------------------------------------- |
| **Region**      | Geographic zone where resources physically reside                 |
| **Availability zone** | Independent datacenter within a region (isolated from failures) |
| **Virtual network** | Isolated and controllable network segment where resources are placed    |
| **Access control** | Who can do what to each resource (roles and policies)  |
| **Object storage** | Buckets/object storage services          |

- **Regions and zones** — the high availability pattern in the cloud: replicating workloads across zones to survive the failure of an entire datacenter.
- **VPC / virtual network** — the secure cloud resembles an on-premise network: subnets, network firewalls, peering. See [ops-sdn](../ops-sdn/).
- **IAM (Identity and Access Management)** — granular access control: without minimum permissions and without rotation, the cloud is an open door. See [ops-netsecurity](../ops-netsecurity/).

## PaaS, BaaS, and local development

Between cloud IaaS (provisioning VMs) and operating everything manually, there is the PaaS model: the platform manages the runtime, scaling, and deployments, and the team only brings the code.

| Platform   | Profile                              | Stands out in                                             |
| ------------ | ----------------------------------- | ------------------------------------------------------ |
| **Heroku**   | The classic PaaS                     | Deploy via `git push`, addons, maturity                |
| **Render**   | Simple modern PaaS                 | Web services, static sites, managed databases |
| **Railway**  | Fast deployment PaaS           | Templates, simple scaling, developer experience      |
| **Fly.io**   | PaaS distributed at the edge         | Apps close to the user, VMs per region                 |

- **The difference with IaaS** — the provider manages the operating system, runtime, and scaling: you deploy by connecting the repo or with a `git push`, without provisioning or patching servers.
- **BaaS (Backend as a Service)** goes a step further: beyond hosting, it provides ready-made backend services — database, auth, storage, and APIs. **Supabase** is the reference open-source BaaS (PostgreSQL, Auth, Realtime, Storage), self-hostable or managed.
- **LocalStack** emulates the AWS API locally: allows developing and testing against S3, Lambda, DynamoDB, and other services without paying or touching the real cloud, before deploying against AWS.

## FinOps

The discipline of managing cloud costs, because unlike owned hardware, in the cloud every running resource is billed consumption.

- **Right-sizing** — paying for the capacity the workload actually uses, not the excess.
- **Commitment discounts** — sustained and predictable consumption is paid cheaper by committing usage in advance.
- **Tagging and attribution** — each resource tagged (project, team, environment) to know who consumes what.
- **Storage optimization** — moving data to lower-cost tiers based on access frequency. See [ops-storage](../ops-storage/).

> FinOps is not one-time savings: it is a continuous cycle of inform → optimize → operate, aligning the business with the real cost of infrastructure.
