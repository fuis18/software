---
layout: ../../../layouts/Layout.astro
eyebrow: Ops
title: Ops IaC
subtitle: Infrastructure and configuration as code
---

Infrastructure is treated as code: versioned, reviewed in PRs, reproducible, and auditable. Two distinct problems are separated — **provisioning** resources and **configuring** servers — and there are tools for each.

## Provisioning vs. Configuration Management

| Approach           | What it resolves                                                                    | Method                             |
| ----------------- | ------------------------------------------------------------------------------- | ---------------------------------- |
| **Provisioning**  | Create/destroy resources (VMs, networks, cloud)                                      | Resource declaration            |
| **Configuration** | An existing server reaches the desired state (packages, services, files) | State declaration, idempotent |

The distinction matters because they're two layers with different lifecycles: **provisioning** decides if a resource _exists_ (creating a VM, a network, a bucket); **configuration** decides what runs _inside_ an existing resource (installing packages, leaving a service running, writing a config file). Confusing the two layers is a common error — using a provisioning tool to manage a server's internal state (or vice versa) ends up forcing the tool's mental model onto a problem that isn't its own.

### Provisioning

**Why it exists:** cloud resources (VMs, networks, disks, load balancers) are created and destroyed via API — provisioning is the layer that declares what resources should exist and in what configuration, instead of creating them manually click by click in a console.

#### Terraform / OpenTofu

**Profile:** the de facto standard — a proprietary declarative language (HCL) to describe resources from any cloud provider, with the `terraform plan` cycle (shows what will change) → `terraform apply` (executes the changes).

- **Strengths:** the _providers_ ecosystem is massive (practically any service from any cloud has one), `plan` gives prior visibility of each change before execution (reduces surprises), and the _state file_ allows it to know exactly what resources it manages and detect drift.
- **Use cases:** multi-cloud or single cloud, any team needing reproducible infrastructure versioned in git.
- **Weaknesses:** HCL is a domain-specific language — it's not a real programming language, so complex conditional logic or advanced reuse becomes awkward; the _state file_ is a critical and delicate piece (it must be protected, shared among the team, and a corrupted or desynchronized state is a real headache).
- **OpenTofu:** the open-source fork of Terraform (same language, compatible with the existing ecosystem), born when Terraform changed its license to a less permissive one — the option for those who want to stay on an open license without losing the ecosystem.

#### Pulumi

**Profile:** the same problem as Terraform, but declared with real programming languages (Python, TypeScript, Go, etc.) instead of a proprietary DSL.

- **Strengths:** by using a real language, you get access to all its tooling — loops, conditionals, functions, unit tests, IDE autocomplete — without the limitations of a DSL; makes it easy to share logic with the rest of the organization's code if it's already in that language.
- **Use cases:** teams with a strong software culture (not just ops) that prefer maintaining infrastructure in the same language as their applications, or that need genuinely complex resource generation logic.
- **Weaknesses:** smaller ecosystem and community than Terraform, the power of a real language is also a risk — it's easier to introduce side effects or non-idempotent behavior without discipline.

#### Crossplane

**Profile:** a declarative control plane over the cloud, with the same mental model as Kubernetes — infrastructure is defined as custom resources (CRDs) that a controller reconciles against the real state.

- **Strengths:** if you already operate Kubernetes, cloud infrastructure is managed with the same tools and the same flow (`kubectl apply`, continuous reconciliation) instead of a separate tool; allows building _compositions_ — higher-level custom APIs that abstract complex cloud resources behind a simple interface for other teams.
- **Use cases:** organizations already deeply invested in Kubernetes wanting to extend that same model (GitOps, reconciliation, k8s RBAC) to cloud infrastructure management.
- **Weaknesses:** brings Kubernetes operational complexity as a prerequisite — it doesn't make sense to adopt it just for provisioning if you don't already operate a cluster; higher learning curve than Terraform for those not coming from the k8s world.

### Configuration Management

**Why it exists:** once a server exists, someone needs to ensure it has the correct packages installed, the correct services running, and the correct configuration files written — and that this remains true over time, no matter how many times the tool is re-run.

#### Ansible

**Profile:** agentless idempotent configuration — connects via SSH to each server and executes the necessary changes, without needing to install anything beforehand on the target.

- **Strengths:** no agents to maintain (smaller operational surface), low entry barrier (readable YAML, no need to learn a new language), works equally well for configuring a handful of servers or orchestrating application deployments.
- **Use cases:** small to medium fleets, teams prioritizing operational simplicity over large-scale speed, any case where installing an agent on every machine isn't viable or desirable.
- **Weaknesses:** without agents, execution is slower at large scale (each run opens SSH connections and runs sequentially or with limited parallelism) — with thousands of servers, the model starts showing its limits.

#### SaltStack

**Profile:** configuration at scale, with an agent model (_minions_) that connects to a central node (_master_) via a persistent message bus, instead of per-connection SSH.

- **Strengths:** much faster than Ansible at large scale thanks to the persistent message bus (no need to open a new SSH connection for each run), supports near-real-time execution on thousands of nodes.
- **Use cases:** large fleets (thousands of servers) where speed and real-time execution justify the cost of maintaining agents.
- **Weaknesses:** requires installing and maintaining an agent on each managed machine, and operating the _master_ infrastructure — more moving parts than Ansible's agentless model.

| Platform               | Type          | Profile                                                     |
| ------------------------ | ------------- | ---------------------------------------------------------- |
| **Terraform / OpenTofu** | Provisioning  | The standard: cloud resources declared, change plan  |
| **Pulumi**               | Provisioning  | Same but with real programming languages         |
| **Crossplane**           | Provisioning  | Declarative control plane over the cloud, Kubernetes-style |
| **Ansible**              | Configuration | Idempotent, agentless via SSH                           |
| **SaltStack**            | Configuration | Configuration at scale with agents and master                |

## Idempotency

A step is **idempotent** when running it any number of times always arrives at the same result: if it's already in the desired state, it touches nothing.

- **Why it's the central property of all IaC:** without idempotency, every run is a risk — re-running a script that creates a user, without checking if it already exists, can fail or duplicate effects. With idempotency, running the same automation a thousand times is as safe as running it once.
- Configuration becomes safe to re-apply: applying the same thing on an already-configured server doesn't break anything.
- It's the foundation for automation being able to run at any time (scheduled, triggered by a change, or manual) without fear of "tripling" the effect — and therefore the foundation for CI/CD being able to apply infrastructure automatically without constant human supervision.

## Declarative vs. imperative

- **Declarative** — the _desired state_ is declared and the tool decides how to get there (the native case for Terraform/Ansible). The tool calculates the diff between what exists and what was requested, and executes only what's needed to close that difference.
- **Imperative** — you write _how_ to do it step by step; more fragile and re-running usually duplicates effect, because the script doesn't know if the step was already done before — it simply runs the command sequence again.
- **Why almost all modern IaC is declarative:** declaring the desired result is what enables idempotency — if the tool knows where it needs to get to, it can compare with where it stands and decide if action is needed. An imperative script doesn't have that comparison point by default; you have to build it manually (checks of "does this already exist?" before each step).

> The philosophy is shared with Kubernetes and GitOps: the system compares real state with desired state and reconciles. See [ops-kubernetes](../ops-kubernetes/) and [ops-cd](../ops-cd/).

## The complete GitOps flow

The journey that connects the pieces to a reproducible deploy:

1. **Provision** — the physical/virtual resource is created with infrastructure declaration (provisioning): Terraform/OpenTofu, Pulumi, or Crossplane decide what VMs, networks, or cloud services should exist.
2. **Configure** — on top, the server's idempotent configuration is applied: Ansible or SaltStack ensure that the newly created resource has the correct packages, services, and files.
3. **Define apps** — application services are defined as declared compositions/images (Kubernetes manifests, Compose, whatever corresponds to the target platform).
4. **Git as source** — all of the above lives versioned in the repo; the change is born in git and reconciled in the real world, closing the loop with the [ops-cd](../ops-cd/) model.

Each step of this flow is, in essence, the same idea applied to a different layer: declare the desired state and let a tool reconcile — provisioning reconciles resources, configuration management reconciles a server's state, and GitOps reconciles the entire system against the repo.

> The entire cycle — from infrastructure to the app — is traceable and reproducible from the repo, which is also the entry point for [ops-cd](../ops-cd/) deployment strategies.
