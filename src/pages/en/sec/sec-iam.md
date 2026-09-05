---
layout: ../../../layouts/Layout.astro
eyebrow: Sec
title: Sec IAM
subtitle: Identity and access management
---

All infrastructure security converges on one question: who can do what? IAM is the discipline of answering that precisely — and the path toward the AWS Security Specialty certification.

## What is IAM

**Identity and Access Management** is the system that decides who (identity) can do what (action) on what resource, on any platform — cloud, servers, or applications.

- **Identities** — users, groups, service accounts/roles, and also federated identities (those who log in with their corporate SSO).
- **Policies** — the link between identity and permission: what actions are allowed (or denied) on what resources. In the cloud, they're defined as policy documents.
- **Principles** — least privilege (only what the task needs, nothing by default), credential rotation, MFA on critical paths, and auditing who used what.
- The practical application on the ops side is in [ops-netsecurity](../../ops/ops-netsecurity/) (Access Controls) and in the cloud at [ops-cloud](../../ops/ops-cloud/) (provider IAM).

## IAM in the Cloud

Each cloud provider implements the same model with its own names: AWS (IAM), Azure (Entra ID/RBAC), GCP (Cloud IAM).

- **Roles vs. users** — the cloud pattern is that applications don't use long-lived user credentials but **assumable roles** with temporary credentials: the identity is assumed for a task and rotates on its own.
- **Policies as code** — permissions are versioned in the repo alongside infrastructure, via IaC. See [ops-iac](../../ops/ops-iac/).
- **The real risk** — a user with excessive permissions is an open door to everything else: without strict IAM, the rest of the controls end up compensating for the access policy.

## Path to the AWS Security Specialty Certification

The **AWS Certified Security – Specialty** certification validates secure design and operation on AWS: the practical realization of IAM and cloud security in general.

| Area                  | What it covers                                       |
| --------------------- | ---------------------------------------------------- |
| **IAM**               | Identities, roles, federation, policies              |
| **Detective controls**| CloudTrail, GuardDuty, Config: how activity is seen  |
| **Infra security**    | VPCs, Security Groups, firewalls, endpoints          |
| **Data protection**   | Encryption at rest and in transit, KMS               |
| **Incident response** | Preparation and containment for cloud incidents      |

- **The preparation order** — fundamentals from [sec-network](../sec-network/) and cloud from [ops-cloud](../../ops/ops-cloud/), then the AWS IAM model, and finally the certification's specific areas.
- **In practice** — the certification combines conceptual IAM knowledge with concrete AWS tools: the same terrain that LocalStack covers when developing against the AWS API locally (see [ops-cloud](../../ops/ops-cloud/)).

> IAM is the cross-cutting piece: the firewall protects the network, but access is what decides who can reach what's behind it. Without access management, no perimeter defense is worth anything.
