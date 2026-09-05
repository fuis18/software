---
layout: ../../../layouts/Layout.astro
eyebrow: Ops
title: Ops CD
subtitle: Continuous delivery and deployment
---

If CI ends with the validated artifact, **continuous delivery** handles bringing it to production with methods that minimize the damage of an error: progressive deployments, GitOps, and release automation.

## Delivery vs. Deployment

- **Continuous delivery (CD)** — every validated commit is ready to be published; the move to production is a decision, almost always automatic.
- **Continuous deployment** — the validated artifact goes directly to production without human approval.

The difference between the two isn't technical, it's about **where the human gate is**: in continuous delivery it exists (even if it's a button someone pushes); in continuous deployment, there's no gate — the entire pipeline, from commit to production, runs without intervention. Choosing one or the other depends on how reliable the test suite is and how cheap it is to revert an error.

## GitOps

The model where the **git repo is the source of truth** for infrastructure: changes are made in the repo and an agent applies them to the cluster.

- **Declarative + reconciliation** — the desired state is in git; an agent running inside the cluster (not an external pipeline pushing) continuously observes that the real system matches, and if not, corrects it. The same principle from [ops-kubernetes](../ops-kubernetes/).
- **Why the pull direction matters:** in traditional CI/CD, an external pipeline has credentials to _push_ changes to the cluster (push). In GitOps, the agent lives _inside_ the cluster and _pulls_ changes from git — no one external needs write credentials to production, only read access to the repo.
- **Auditability** — every artifact and every environment have a trail in the repo: what was changed, when, and by whom, with git history as an immutable record.
- **Natural rollback** — reverting means pointing the repo back to a previous commit; the agent handles reconciling the cluster to that state.

### ArgoCD

**Profile:** Kubernetes-native GitOps, with a strong focus on visibility — its UI shows in real time how synchronized the cluster is relative to the repo.

- **Strengths:** very clear UI for seeing drift (differences between declared and actual) resource by resource, manual or automatic sync configurable per application, supports multi-cluster from a single instance.
- **Use cases:** teams wanting immediate visibility of sync state and granular control of when to apply changes (useful if you don't yet trust continuous deployment 100%).
- **Weaknesses:** the "Application" model (its central unit) can become verbose in clusters with many microservices; templating logic stays outside ArgoCD (delegates to Helm/Kustomize).

### Flux

**Profile:** also Kubernetes-native GitOps, but more like a set of composable controllers than a platform with a central UI — designed to integrate deeply with the existing ecosystem.

- **Strengths:** very strong integration with Git (webhooks, multiple sources) and with Helm (can manage Helm releases directly as part of the GitOps flow); lighter and more "Lego-like" than ArgoCD — built with the controllers you need.
- **Use cases:** teams already heavily invested in Helm wanting that flow to become GitOps without changing packaging tools; setups where composition is preferred over an all-in-one UI.
- **Weaknesses:** its UI (Weave GitOps) is less mature than ArgoCD's; the learning curve of understanding what controller does what is a bit higher since it's not a single monolithic product.

### Spinnaker

**Profile:** enterprise release platform — not born as pure GitOps but as a deploy pipeline orchestrator, with GitOps as one of the ways to feed it.

- **Strengths:** multicloud deploy pipelines (not just Kubernetes — also VMs, serverless functions, different cloud providers in the same pipeline), manual approvals integrated as a native part of the flow, strong out-of-the-box support for progressive delivery strategies (canary, blue/green).
- **Use cases:** large organizations with heterogeneous infrastructure (not just k8s) needing a single place to orchestrate releases with formal approvals between stages.
- **Weaknesses:** much heavier to operate than ArgoCD/Flux — requires more infrastructure and more people dedicated to maintaining it; for a team running only Kubernetes, it's usually more than needed.

| Platform    | Profile                      | Stands out in                                |
| ------------- | --------------------------- | ----------------------------------------- |
| **ArgoCD**    | GitOps for Kubernetes      | Clear UI, cluster-to-repo sync        |
| **Flux**      | GitOps in the k8s ecosystem | Integration with Git and Helm                |
| **Spinnaker** | Enterprise release platform | Multicloud deploy pipelines, approvals |

## Progressive Delivery

Publishing changes in portions instead of all at once, measuring impact before expanding.

- **Why it exists:** a traditional deploy (all or nothing) bets all traffic on the change working. Progressive delivery reduces that bet: exposes the change to a controlled portion of traffic or users, measures, and only then decides whether to expand or revert — the error impact radius is bounded from the start.

### Canary

**What it does:** the new rollout receives a small percentage of real traffic; if metrics (errors, latency) stay healthy, it gradually expands to 100%.

- **Strengths:** compares the new version against the old with real traffic simultaneously — the signal is as close to real production as possible, not to a staging environment.
- **Weaknesses:** requires good observability to make the expand-or-not decision (if you can't measure the difference between canary and stable well, the strategy loses its value); slower than a direct switch, because the advance is gradual.
- **When to choose it:** when you prefer comparing new against old with real traffic before committing fully, and you have reliable metrics to decide.

### Blue/Green

**What it does:** two identical environments (blue = current, green = new) run in parallel; traffic is switched from one to the other all at once, and going back means re-pointing the switch.

- **Strengths:** instant rollback — no need to "undo" a gradual deployment, just point traffic back to the previous environment, which is still running intact.
- **Weaknesses:** doubles infrastructure cost while both environments coexist (even briefly); doesn't work well for changes touching shared state (a database migration, for example, can't be "switched" as cleanly as HTTP traffic).
- **When to choose it:** when the full traffic switch is simple, the cloned environment is viable to maintain, and rollback speed is prioritized over the cost of duplicating infrastructure.

### Feature Flags

**What it does:** new code is deployed off behind a remote switch — deploy and activation become two completely separate events.

- **Strengths:** reverting a problematic feature is turning off a flag (seconds), not doing a deploy rollback; allows activating features for specific user segments (beta testers, a single customer) without touching infrastructure.
- **Weaknesses:** code with old flags that were never cleaned up accumulates as technical debt (_flag debt_); the combinatorics of simultaneously active/inactive flags can make it hard to reason about what behavior the system has at a given time.
- **When to choose it:** to decouple code from its activation and be able to revert behavior without a release — especially useful when the risk is in the feature's _logic_, not in the deployment itself.

| Strategy        | What it does                                                                             |
| ----------------- | ------------------------------------------------------------------------------------ |
| **Canary**        | New rollout to a small %, then expands based on metrics                        |
| **Blue/Green**    | Two identical environments; traffic is switched to the new one and can revert instantly |
| **Feature flags** | Features hidden behind a switch, activatable without deploy                         |

> The three strategies are not mutually exclusive: it's common to deploy with blue/green or canary, and control feature exposure within that rollout with feature flags — deploy and activation solve different problems.

> The perfect deployment doesn't exist: what exists is the deployment you know how to measure and revert. That's why CD works hand in hand with observability — see [ops-observability](../ops-observability/).
