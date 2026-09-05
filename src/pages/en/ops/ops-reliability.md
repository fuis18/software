---
layout: ../../../layouts/Layout.astro
eyebrow: Ops
title: Ops Reliability
subtitle: Reliability, chaos engineering, and scaling
---

Reliability isn't a property you buy: it's built by knowing the system's limits, deliberately testing its failures, and giving it the ability to withstand and recover on its own.

## Capacity and Scaling

| Piece                 | What it is                                                                 |
| --------------------- | ---------------------------------------------------------------------- |
| **Capacity planning** | Deciding how much capacity the system needs based on projected demand |
| **Auto-scaling**      | Automatic growing/shrinking of capacity based on real load           |
| **Self-healing**      | The system detects and repairs failures by itself                        |

The three pieces cover different time horizons for the same problem — how much capacity is needed and what happens when something fails: **capacity planning** looks weeks or months ahead (how much compute will be needed next quarter), **auto-scaling** reacts in minutes to the current real load, and **self-healing** reacts in seconds to a specific failure. None replaces the other: a system with perfect auto-scaling can still fall short if capacity planning never reserved enough quota with the cloud provider, and a well-planned system still needs self-healing for the specific failure no projection predicts.

### Capacity planning

- **What it resolves:** deciding in advance how much compute, network, and storage the system will need, so it doesn't fall short at the worst moment (a traffic spike, a campaign, a seasonal event).
- **How it's done:** projected by metrics — current usage, historical peaks, growth trend — not by intuition. See [ops-observability](../ops-observability/) for the signals that feed this projection.
- **The risk of not doing it right:** under-provisioning leaves the system without margin for a real spike; over-provisioning means paying for capacity that's never used — capacity planning is, at its core, an exercise of calibrating that margin with data instead of fear.

### Auto-scaling

- **What it resolves:** within the limit capacity planning established, the infrastructure adapts itself to the real load — more replicas when traffic rises, fewer when it drops. See [ops-kubernetes](../ops-kubernetes/) and [ops-cloud](../ops-cloud/).
- **Why it matters:** without auto-scaling, someone has to be watching metrics and scaling manually — which isn't just slow, it's directly unviable at 3am during an unexpected spike.
- **The nuance:** auto-scaling reacts to the _current_ load, not anticipating it — if the spike is so sudden that the infrastructure can't scale in time (for example, starting a new VM takes minutes), capacity planning that leaves a base cushion is still needed.

### Self-healing

- **What it resolves:** the system detects that something failed and acts without waiting for a human to notice — aligned with orchestration: detects a pod died and replaces it, a node failed and redistributes its load to healthy nodes.
- **Why it matters:** it's the fastest layer of the three because it doesn't depend on a human decision cycle — the time between failure and recovery is measured in seconds, not in the time it takes someone to see an alert and act.
- **The limit:** self-healing resolves known infrastructure failures (a process that died, a node that doesn't respond) — it doesn't resolve a logical bug in the application or a design failure; for that, what's learned in [ops-incident](../ops-incident/) and in chaos engineering is needed.

## Redundancy and Multi-AZ

- **Single point of failure (SPOF) free design** — every critical piece must exist at least twice: servers, networks, power sources, datacenters. A system with a single component whose failure takes down the entire system has, by definition, an availability ceiling that no other practice on this page can compensate for.
- **Multi-zone** — replicate across availability zones or different datacenters so a physical failure (power outage, fire, network failure) in a single location doesn't take down the entire system. See [ops-cloud](../ops-cloud/) for how regions and zones are organized in cloud providers.
- **Automatic failover** — the system redirects traffic to the healthy replica without manual intervention. It's the piece that turns redundancy (having a copy) into real availability (that copy actually taking the load when the primary fails) — redundancy without automatic failover just means someone has to notice the failure and move traffic manually, reintroducing the same speed problem that self-healing solves in the previous section.

## Chaos Engineering

**Breaking deliberately, under control, to discover how what's believed to be robust actually fails.** Instead of waiting for the real incident, failures are deliberately injected in chosen environments or windows and the system's reaction is observed.

- **Why it exists:** capacity planning, auto-scaling, self-healing, and redundancy are all bets on how the system _should_ behave in the face of a failure — but that expectation was never truly tested until a real incident occurs. Chaos engineering brings that test forward to a controlled moment, with people watching and room to intervene, instead of discovering it for the first time in production at 3am.
- **The difference from a real incident:** chaos is deliberate, bounded, and reversible — you choose what breaks, when, and you can stop the experiment at any time; a real incident doesn't warn, doesn't have a chosen window, and can't be paused.

### ChaosMesh

**Profile:** Kubernetes-native fault injection tool — defines chaos experiments as declarative resources (like any other k8s object) that act directly on pods, network, or cluster nodes.

- **Strengths:** integrates naturally into the workflow of anyone already operating Kubernetes (same manifests, same `kubectl`), allows very specific cluster-level experiments (killing a pod, injecting network latency between two services, simulating disk failure).
- **Use cases:** teams already operating Kubernetes wanting to validate the resilience of their own orchestration — does self-healing really replace the pod in time? Does the service keep load balancing well if a pod hangs instead of dying cleanly?
- **Weaknesses:** limited to the Kubernetes world — not suitable for validating infrastructure resilience outside the cluster (a bare-metal VM, a managed cloud service).

### Gremlin

**Profile:** broader chaos engineering platform, designed for experiments at scale in both cloud and on-premise, not limited to Kubernetes.

- **Strengths:** broader coverage of fault types (network, host resources, external dependencies, even cloud region-level failures), designed as a platform with access control, experiment scheduling, and a "panic button" to abort immediately.
- **Use cases:** organizations with heterogeneous infrastructure (not just Kubernetes) wanting a formal chaos engineering program, with governance over who can run what experiment and when.
- **Weaknesses:** as a broader commercial platform, it has a cost and an organizational adoption curve greater than a native tool like ChaosMesh for those who only need to cover Kubernetes.

| Platform    | Profile                            | Use                                       |
| ------------- | --------------------------------- | ----------------------------------------- |
| **ChaosMesh** | Fault injection on Kubernetes | Controlled chaos on the cluster          |
| **Gremlin**   | Chaos platform               | Experiments at scale, in cloud and on-prem |

### Experiment cycle

1. **Hypothesis** — formulate what you expect to happen: _"the system withstands a node failure without losing requests."_ Without a clear, falsifiable hypothesis upfront, the experiment has nothing to compare against afterward.
2. **Injection** — the real failure is provoked in the chosen safe window (outside peak hours, with the team attentive, with an abort plan if something goes out of control).
3. **Observation** — it's measured against the hypothesis using observability signals: did the error rate rise? Did latency degrade more than expected? Did self-healing react within the assumed time?
4. **Learn** — if the hypothesis failed (the system didn't hold as expected), there's a real finding to fix — and that finding is, in essence, an incident that was discovered without a real user suffering it first.

> Chaos isn't vandalism: it's failing in controlled doses, with the explicit objective of discovering weak points before a real incident does it for us. The improvement that comes from it feeds the same learning culture that sustains [ops-incident](../ops-incident/) post-mortems — the difference is that here the learning arrives before the pain, not after.
