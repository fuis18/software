---
layout: ../../../layouts/Layout.astro
eyebrow: Sec
title: Sec Runtime
subtitle: Runtime security and Kubernetes policies
---

Scanning protects the artifact before it runs; runtime security protects **while it runs**. The second area that few study: detecting a container that starts behaving oddly, and enforcing policies that the infrastructure applies on its own.

## Runtime Monitoring

A container or process can start misbehaving at any time: calling an unexpected syscall, contacting a suspicious IP, writing where it shouldn't. The defense is observing that behavior.

| Tool        | What it does                                                        |
| ----------- | ------------------------------------------------------------------- |
| **Falco**   | Real-time anomalous behavior detection (in the kernel)              |
| **Sysdig**  | Captures and analyzes syscalls, processes, and containers           |

- **Falco** — the open source runtime security standard: installs rules in the kernel (via eBPF or modules) and alerts when a process does something it shouldn't — a strange syscall, a shell spawn inside a container, access to a sensitive file. It originated within Sysdig.
- **Sysdig** — the platform behind it: kernel-level syscall capture with visibility into processes, containers, and their traffic, used for both debugging and detection.
- **What they monitor** — syscalls (kernel calls), processes (which ones spawn, which ones escalate), and suspicious access (to files, to the network). A behavior change is the signal that something was compromised at runtime.

## Kubernetes Policies

Many run Kubernetes, few secure it properly. **Admission policies** are the way to enforce rules that apply automatically before a resource enters the cluster.

| Tool             | What it does                                            |
| ---------------- | ------------------------------------------------------- |
| **Kyverno**      | Declarative, native Kubernetes policies                 |
| **OPA Gatekeeper** | Policies with a rule language (Rego), OPA standard    |

- **Kyverno** — defines policies as regular Kubernetes resources: "every pod must run without root," "every image must be signed," "all containers must declare resource limits." It's declarative and integrates with `kubectl`.
- **OPA Gatekeeper** — the industry standard for policy-as-code: rules are written in Rego and the cluster evaluates them during admission of each resource. More powerful and more complex than Kyverno.

### Policies That Enforce Themselves

| Policy                   | What it prevents                                            |
| ------------------------ | ----------------------------------------------------------- |
| **No-root containers**  | Prevents a compromised process from running with privileges |
| **Signed images**        | Only deploys verified artifacts (see [sec-supplychain](../sec-supplychain/)) |
| **Resource limits**      | Contains the impact of a container running out of control   |

- Controlling who can do what within the cluster (RBAC) is the other half of Kubernetes hardening and lives at [ops-kubernetes](../../ops/ops-kubernetes/).

> Runtime security closes the gap that scanning leaves open: scanning says "this image was clean when uploaded"; Falco and admission policies say "and if something changes, we detect and block it while it runs."
